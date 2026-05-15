#!/usr/bin/env python3
"""Søgeværktøj til D&D 5e 2024 SRD markdown-filer."""

import argparse
import os
import re
import sys

REFS_DIR = os.path.join(os.path.dirname(__file__), "..", "references")

FILE_ORDER = [
    "playing-the-game.md",
    "rules-glossary.md",
    "classes.md",
    "spells.md",
    "monsters.md",
    "monsters-A-Z.md",
    "animals.md",
    "magic-items.md",
    "equipment.md",
    "feats.md",
    "character-creation.md",
    "character-origins.md",
    "gameplay-toolbox.md",
]


def search_file(filepath, pattern, context_lines=15, case_sensitive=False):
    flags = 0 if case_sensitive else re.IGNORECASE
    results = []
    try:
        with open(filepath, encoding="utf-8") as f:
            lines = f.readlines()
    except (OSError, UnicodeDecodeError):
        return results

    for i, line in enumerate(lines):
        if re.search(pattern, line, flags):
            start = max(0, i - 2)
            end = min(len(lines), i + context_lines + 1)
            snippet = "".join(lines[start:end]).rstrip()
            results.append({
                "file": os.path.basename(filepath),
                "line": i + 1,
                "snippet": snippet,
            })
    return results


def main():
    parser = argparse.ArgumentParser(description="Søg i D&D 5e 2024 SRD")
    parser.add_argument("term", help="Søgeterm (regex understøttes)")
    parser.add_argument("--file", help="Søg kun i denne fil (f.eks. spells.md)")
    parser.add_argument("--context", type=int, default=15, help="Linjer kontekst efter match (standard: 15)")
    parser.add_argument("--case-sensitive", action="store_true")
    parser.add_argument("--max-results", type=int, default=10)
    args = parser.parse_args()

    if args.file:
        files = [os.path.join(REFS_DIR, args.file)]
    else:
        files = [os.path.join(REFS_DIR, f) for f in FILE_ORDER
                 if os.path.exists(os.path.join(REFS_DIR, f))]

    all_results = []
    for filepath in files:
        results = search_file(filepath, args.term, args.context, args.case_sensitive)
        all_results.extend(results)
        if len(all_results) >= args.max_results:
            break

    if not all_results:
        print(f"Ingen resultater for: {args.term!r}")
        sys.exit(1)

    for i, r in enumerate(all_results[:args.max_results], 1):
        print(f"\n{'='*60}")
        print(f"Resultat {i} – [{r['file']}, linje {r['line']}]")
        print(f"{'='*60}")
        print(r["snippet"])

    print(f"\n{len(all_results[:args.max_results])} resultat(er) fundet.")


if __name__ == "__main__":
    main()
