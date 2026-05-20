#!/usr/bin/env python3
"""Generate image-urls.json from Forge VTT asset folder URL.

Usage:
  python3 generate-image-urls.py --forge-url "https://assets.forge-vtt.com/YOUR_ID/temple-of-tiamat/"

This will:
1. Map all tokens and portraits to the Forge URLs
2. Create image-urls.json ready for the macro
"""

import argparse
import json
import sys
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(
        description='Generate image-urls.json from Forge VTT asset folder',
    )
    parser.add_argument(
        '--forge-url',
        required=True,
        help='Base URL to your Forge VTT assets folder (must end with /)',
    )
    parser.add_argument(
        '--output',
        default='./out/image-urls.json',
        help='Output file for URLs (default: ./out/image-urls.json) - must match macro output dir',
    )

    args = parser.parse_args()

    # Validate URL
    base_url = args.forge_url.rstrip('/')
    if not base_url.startswith('https://'):
        print("Error: URL must start with https://")
        sys.exit(1)

    # Get all portrait/token files from both art directories
    portraits_output = Path("../../art/finale/output")
    portraits_parent = Path("../../art/finale")

    portrait_files = []
    if portraits_output.exists():
        portrait_files.extend(sorted(portraits_output.glob("*-token*.png")))
    if portraits_parent.exists():
        portrait_files.extend(sorted(portraits_parent.glob("*-token*.png")))

    portrait_files = sorted(set(portrait_files))

    if not portrait_files:
        print("Error: No portrait files found in art/finale/ or art/finale/output/")
        sys.exit(1)

    print(f"Found {len(portrait_files)} portrait/token images\n")

    # Build URL mapping: actor name -> {portrait, token}
    url_mapping = {}

    for portrait_path in portrait_files:
        filename = portrait_path.name

        # Extract base name (e.g., "dragonclaw-rogue" from "dragonclaw-rogue-token_20260516_170911_1.png")
        # Format is usually: name-token_TIMESTAMP_NUMBER.png or name_TIMESTAMP_NUMBER.png
        base_name = filename.split('_')[0]  # Get part before first underscore (timestamp)

        # Normalize: "dragonclaw-rogue" -> "dragonclaw-rogue"
        actor_key = base_name.replace('_token', '').lower()

        # Generate URLs
        portrait_filename = filename
        token_filename = base_name + '_token.png' if '-token' not in base_name else filename

        portrait_url = f"{base_url}/{portrait_filename}"
        token_url = f"{base_url}/{token_filename}"

        # For the config, use actor key
        if actor_key not in url_mapping:
            url_mapping[actor_key] = {
                "portrait": portrait_url,
                "token": token_url,
            }
            print(f"  ✓ {actor_key}")
            print(f"      Portrait: {portrait_url}")
            print(f"      Token:    {token_url}")

    print(f"\nWrote {len(url_mapping)} entries to {args.output}\n")

    # Write image-urls.json
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(url_mapping, f, indent=2)

    print(f"Next steps:")
    print(f"  1. python3 main.py --input-dir ../.. --output ./out --test --macro")
    print(f"  2. In Foundry: F12 → Console tab")
    print(f"  3. Paste test-import-macro.js and run")
    print(f"  4. Check if Severin appears with portrait + token images from Forge")


if __name__ == "__main__":
    main()
