#!/usr/bin/env python3
"""
dndig-openai — OpenAI-backed image generator with dndig-compatible prompt files.

Reads the same Markdown + YAML-frontmatter format as dndig (Gemini), but calls
OpenAI's gpt-image-1 model. Designed for D&D campaign artwork: portraits,
scenes, tokens, battle-style illustrations.

Usage:
    dndig-openai <prompt_file> [options]

See README.md for prompt file format and frontmatter fields.
"""
from __future__ import annotations

import argparse
import base64
import concurrent.futures as cf
import json
import logging
import os
import sys
import time
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any

import yaml

__version__ = "0.1.0"
DEFAULT_MODEL = "gpt-image-1"

# gpt-image-1 only supports three fixed output sizes plus "auto".
# Map dndig aspect ratios to the nearest supported size.
ASPECT_TO_SIZE: dict[str, str] = {
    "1:1": "1024x1024",
    "4:5": "1024x1024",
    "5:4": "1024x1024",
    "3:2": "1536x1024",
    "4:3": "1536x1024",
    "16:9": "1536x1024",
    "21:9": "1536x1024",
    "2:3": "1024x1536",
    "3:4": "1024x1536",
    "9:16": "1024x1536",
}

# dndig resolution → OpenAI quality. gpt-image-1 caps at 1536px regardless.
RESOLUTION_TO_QUALITY: dict[str, str] = {
    "512px": "low",
    "1K": "medium",
    "2K": "high",
    "4K": "high",
}


@dataclass
class PromptSpec:
    title: str
    body: str
    size: str
    quality: str
    n: int
    instructions: str | None
    references: list[Path] = field(default_factory=list)
    source_path: Path | None = None


def parse_frontmatter(text: str) -> tuple[dict[str, Any], str]:
    """Split a Markdown file into (frontmatter_dict, body)."""
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    fm_raw = text[3:end].lstrip("\n")
    body_start = end + 4
    if body_start < len(text) and text[body_start] == "\n":
        body_start += 1
    body = text[body_start:]
    meta = yaml.safe_load(fm_raw) or {}
    if not isinstance(meta, dict):
        raise ValueError("Frontmatter must be a YAML mapping")
    return meta, body


def load_prompt(path: Path) -> PromptSpec:
    text = path.read_text(encoding="utf-8")
    meta, body = parse_frontmatter(text)

    title = str(meta.get("title", "generated_image")).strip() or "generated_image"

    aspect = str(meta.get("aspect_ratio", "1:1"))
    if aspect not in ASPECT_TO_SIZE:
        raise ValueError(
            f"Unsupported aspect_ratio {aspect!r}. "
            f"Allowed: {sorted(ASPECT_TO_SIZE)}"
        )
    size = ASPECT_TO_SIZE[aspect]

    resolution = str(meta.get("resolution", "1K"))
    quality = RESOLUTION_TO_QUALITY.get(resolution, "medium")

    n = int(meta.get("batch", 1))
    if not 1 <= n <= 10:
        raise ValueError(f"batch must be 1-10, got {n}")

    instructions = meta.get("instructions")
    instructions_text: str | None = None
    if instructions:
        inst_path = (path.parent / instructions).resolve()
        instructions_text = inst_path.read_text(encoding="utf-8").strip()

    refs_raw = meta.get("references") or []
    if not isinstance(refs_raw, list):
        raise ValueError("references must be a list")
    references = [(path.parent / r).resolve() for r in refs_raw]
    for r in references:
        if not r.is_file():
            raise FileNotFoundError(f"Reference image not found: {r}")
    if len(references) > 16:
        raise ValueError("OpenAI image edit accepts at most 16 reference images")

    if "temperature" in meta:
        logging.warning(
            "temperature is ignored — gpt-image-1 does not expose a temperature knob"
        )

    return PromptSpec(
        title=title,
        body=body.strip(),
        size=size,
        quality=quality,
        n=n,
        instructions=instructions_text,
        references=references,
        source_path=path,
    )


def build_prompt(spec: PromptSpec) -> str:
    if spec.instructions:
        return f"{spec.instructions}\n\n---\n\n{spec.body}"
    return spec.body


def generate(spec: PromptSpec, client, model: str) -> list[bytes]:
    """Call OpenAI image API and return a list of PNG byte-strings."""
    prompt = build_prompt(spec)
    kwargs: dict[str, Any] = {
        "model": model,
        "prompt": prompt,
        "size": spec.size,
        "quality": spec.quality,
        "n": spec.n,
    }
    if spec.references:
        files = [open(p, "rb") for p in spec.references]
        try:
            resp = client.images.edit(image=files, **kwargs)
        finally:
            for f in files:
                f.close()
    else:
        resp = client.images.generate(**kwargs)

    images: list[bytes] = []
    for item in resp.data:
        if getattr(item, "b64_json", None):
            images.append(base64.b64decode(item.b64_json))
        else:
            raise RuntimeError(
                "OpenAI response did not include b64_json — check API tier/model"
            )
    return images


def write_outputs(
    spec: PromptSpec, images: list[bytes], output_dir: Path
) -> tuple[list[Path], Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    paths: list[Path] = []
    for i, data in enumerate(images, start=1):
        name = f"{spec.title}_{timestamp}_{i}.png"
        p = output_dir / name
        p.write_bytes(data)
        paths.append(p)

    metadata = {
        "title": spec.title,
        "timestamp": timestamp,
        "size": spec.size,
        "quality": spec.quality,
        "n": spec.n,
        "has_instructions": spec.instructions is not None,
        "references": [str(r) for r in spec.references],
        "source": str(spec.source_path) if spec.source_path else None,
        "outputs": [str(p) for p in paths],
    }
    meta_path = output_dir / f"{spec.title}_{timestamp}_metadata.json"
    meta_path.write_text(json.dumps(metadata, indent=2), encoding="utf-8")
    return paths, meta_path


def run_one(
    prompt_file: Path,
    output_dir: Path,
    client,
    model: str,
) -> tuple[Path, list[Path]]:
    spec = load_prompt(prompt_file)
    logging.info(
        "Generating %s (%s, quality=%s, n=%d, refs=%d)",
        spec.title,
        spec.size,
        spec.quality,
        spec.n,
        len(spec.references),
    )
    images = generate(spec, client, model)
    paths, meta_path = write_outputs(spec, images, output_dir)
    logging.info("Wrote %d image(s) and %s", len(paths), meta_path.name)
    return prompt_file, paths


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="dndig-openai",
        description="Generate images from dndig-format prompt files using OpenAI.",
    )
    parser.add_argument("prompt_files", nargs="+", type=Path, help="Prompt .md files")
    parser.add_argument(
        "-o", "--output-dir", type=Path, default=Path("artwork"),
        help="Output directory (default: artwork)",
    )
    parser.add_argument(
        "-w", "--workers", type=int, default=4,
        help="Concurrent workers for multiple prompt files (default: 4)",
    )
    parser.add_argument("-v", "--verbose", action="store_true")
    parser.add_argument("--debug", action="store_true")
    parser.add_argument(
        "--api-key", help="Override OPENAI_API_KEY env var",
    )
    parser.add_argument(
        "--model", default=DEFAULT_MODEL,
        help=f"OpenAI image model (default: {DEFAULT_MODEL})",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Parse and validate prompt files without calling the API",
    )
    parser.add_argument("--version", action="version", version=__version__)
    args = parser.parse_args(argv)

    level = logging.DEBUG if args.debug else (logging.INFO if args.verbose else logging.WARNING)
    logging.basicConfig(level=level, format="%(levelname)s: %(message)s")

    if args.dry_run:
        for f in args.prompt_files:
            spec = load_prompt(f)
            print(
                f"{f}: title={spec.title} size={spec.size} quality={spec.quality} "
                f"n={spec.n} refs={len(spec.references)}"
            )
        return 0

    api_key = args.api_key or os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print(
            "ERROR: OPENAI_API_KEY is not set and --api-key was not provided.",
            file=sys.stderr,
        )
        return 2

    try:
        from openai import OpenAI
    except ImportError:
        print(
            "ERROR: the 'openai' package is not installed. "
            "Run: pip install -r requirements.txt",
            file=sys.stderr,
        )
        return 2

    client = OpenAI(api_key=api_key)

    failed = 0
    if len(args.prompt_files) == 1:
        try:
            run_one(args.prompt_files[0], args.output_dir, client, args.model)
        except Exception as e:
            logging.error("Failed: %s", e)
            failed = 1
    else:
        with cf.ThreadPoolExecutor(max_workers=args.workers) as ex:
            futures = {
                ex.submit(run_one, f, args.output_dir, client, args.model): f
                for f in args.prompt_files
            }
            for fut in cf.as_completed(futures):
                f = futures[fut]
                try:
                    fut.result()
                except Exception as e:
                    logging.error("Failed for %s: %s", f, e)
                    failed += 1

    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
