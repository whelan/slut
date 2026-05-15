# dndig-openai

OpenAI-backed image generator with [`dndig`](../../.agents/skills/dndtale/modules/dndig-reference.md)-compatible prompt files.
Reads the same Markdown + YAML-frontmatter format as `dndig` (Gemini), but calls
OpenAI's `gpt-image-1` model so you can use an existing OpenAI license instead
of provisioning a Gemini billing account.

## Install

```bash
cd tools/dndig-openai
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export OPENAI_API_KEY="sk-..."
```

Your OpenAI organization must be **verified** to call `gpt-image-1`.

## Usage

```bash
# Single prompt
python3 dndig_openai.py path/to/prompt.md -o art/ -v

# Batch (parallel workers per file)
python3 dndig_openai.py art/*.md -o art/ -w 4 -v

# Validate prompts without spending tokens
python3 dndig_openai.py art/*.md --dry-run
```

### CLI options

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output-dir DIR` | Output directory | `artwork` |
| `-w, --workers N` | Concurrent prompt files | `4` |
| `-v, --verbose` | Info-level logging | off |
| `--debug` | Debug-level logging | off |
| `--api-key KEY` | Override `OPENAI_API_KEY` | env |
| `--model MODEL` | OpenAI image model | `gpt-image-1` |
| `--dry-run` | Parse only, no API calls | off |
| `--version` | Print version and exit | — |

## Prompt file format

Identical to `dndig` — see `.agents/skills/dndtale/modules/dndig-reference.md`.
Frontmatter fields are translated as follows:

| dndig field | OpenAI mapping |
|---|---|
| `title` | Filename prefix (same as dndig) |
| `aspect_ratio` | Mapped to nearest `size` — see below |
| `resolution` | Mapped to `quality` (1K→medium, 2K/4K→high, 512px→low) |
| `batch` | `n` parameter (1–10) |
| `instructions` | File contents prepended to the prompt |
| `references` | Sent to `images.edit` endpoint (max 16) |
| `temperature` | **Ignored** — gpt-image-1 has no temperature knob (warning logged) |

### Aspect ratio mapping

`gpt-image-1` only supports three output sizes. dndig's ratios are mapped to the
nearest one:

| dndig | OpenAI `size` |
|---|---|
| `1:1`, `4:5`, `5:4` | `1024x1024` |
| `3:2`, `4:3`, `16:9`, `21:9` | `1536x1024` |
| `2:3`, `3:4`, `9:16` | `1024x1536` |

If you need true 4K battlemaps, upscale the 1536px output afterwards
(e.g. Real-ESRGAN, Topaz Gigapixel) — the OpenAI API caps output at 1536px.

## Example prompt file

```markdown
---
title: axar-runes-portrait
aspect_ratio: "2:3"
resolution: 2K
batch: 2
instructions: campaign-style.md
---

A dwarven wizard with deep iron-grey beard braided with brass rings, wearing
weathered traveling robes embroidered with arcane sigils. He holds a focus
of polished obsidian. Pale evocation light flickers around his fingertips.
Half-portrait, three-quarter angle, dramatic side lighting.
```

## Output

- Images: `{title}_{YYYYMMDD_HHMMSS}_{i}.png`
- Metadata: `{title}_{YYYYMMDD_HHMMSS}_metadata.json`

Identical naming convention to `dndig`, so existing campaign tooling keeps working.

## Known differences vs Gemini `dndig`

- No `temperature` (silently ignored).
- Output capped at 1536px — no native 2K/4K.
- Aspect ratios snap to one of three sizes.
- Reference handling uses the `images.edit` endpoint; very different prompts
  with references may behave more like an edit than a fresh composition.
