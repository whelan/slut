#!/usr/bin/env python3
"""Clean up duplicate portraits and generate all circular tokens."""

import os
import json
import shutil
from pathlib import Path
from collections import defaultdict
from PIL import Image, ImageDraw
import re

def get_latest_file(files):
    """Get the file with the latest timestamp."""
    if not files:
        return None
    if len(files) == 1:
        return files[0]

    # Files with timestamps: sort by timestamp (latest first)
    timestamped = [(f, f.stem.split('_20260')[-1] if '_20260' in f.stem else '0') for f in files]
    timestamped.sort(key=lambda x: x[1], reverse=True)
    return timestamped[0][0]

def cleanup_portraits():
    """Remove duplicate portrait versions, keeping only the latest."""
    output_dir = Path('art/finale/output')

    # Group files by base name
    grouped = defaultdict(list)
    for f in output_dir.glob('*.png'):
        stem = f.stem
        if '_20260' in stem:
            base = stem.split('_20260')[0]
        else:
            base = stem

        # Skip already processed tokens and placeholders
        if 'token_circular' in base or 'placeholder-token' in base or 'battlemap' in base:
            continue

        grouped[base].append(f)

    removed = 0
    for base, files in grouped.items():
        if len(files) > 1:
            latest = get_latest_file(files)
            for f in files:
                if f != latest:
                    f.unlink()
                    print(f"Removed duplicate: {f.name}")
                    removed += 1

    print(f"\nRemoved {removed} duplicate files")
    return removed

def generate_token_from_portrait(portrait_path: str, output_dir: str) -> str:
    """Create a circular token from a portrait image."""
    portrait_file = Path(portrait_path)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # Open portrait
    img = Image.open(portrait_file).convert("RGBA")

    # Get the smaller dimension to create a square
    width, height = img.size
    min_size = min(width, height)

    # Crop to square from center
    left = (width - min_size) // 2
    top = (height - min_size) // 2
    right = left + min_size
    bottom = top + min_size
    img = img.crop((left, top, right, bottom))

    # Resize to 512x512 for token
    token_size = 512
    img = img.resize((token_size, token_size), Image.Resampling.LANCZOS)

    # Create circular mask
    mask = Image.new("L", (token_size, token_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse([0, 0, token_size-1, token_size-1], fill=255)

    # Apply circular mask
    output = Image.new("RGBA", (token_size, token_size), (0, 0, 0, 0))
    output.paste(img, (0, 0), mask)

    # Add white border
    border_draw = ImageDraw.Draw(output)
    border_draw.ellipse([0, 0, token_size-1, token_size-1], outline=(255, 255, 255, 255), width=3)

    # Generate filename
    portrait_stem = portrait_file.stem
    # Remove timestamp if present
    if '_20260' in portrait_stem:
        base_name = portrait_stem.split('_20260')[0]
    else:
        base_name = portrait_stem

    token_filename = f"{base_name}-token_circular.png"

    # Save token
    token_path = output_path / token_filename
    output.save(token_path)

    return token_filename

def tokenize_all_portraits():
    """Generate circular tokens from all portrait images."""
    output_dir = Path('art/finale/output')

    portrait_files = list(output_dir.glob('*.png'))

    # Filter to actual portraits (not tokens, placeholders, battlemaps)
    portrait_files = [
        f for f in portrait_files
        if 'token_circular' not in f.stem
        and 'placeholder-token' not in f.stem
        and 'battlemap' not in f.stem
        and not f.stem.endswith('_token')
    ]

    print(f"\nGenerating tokens from {len(portrait_files)} portraits...")

    generated = 0
    for portrait_path in sorted(portrait_files):
        token_filename = generate_token_from_portrait(str(portrait_path), str(output_dir))
        base_name = portrait_path.stem
        if '_20260' in base_name:
            base_name = base_name.split('_20260')[0]
        print(f"✓ {base_name:40s} → {token_filename}")
        generated += 1

    return generated

def update_image_urls():
    """Update image-urls.json to reference actual generated files."""
    output_dir = Path('art/finale/output')
    urls_path = Path('foundry-export/image-urls.json')

    # Load current URLs
    with open(urls_path, 'r') as f:
        urls = json.load(f)

    base_url = "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/"

    # Map existing actor keys to what we find on disk
    portrait_map = {}
    for f in output_dir.glob('*.png'):
        stem = f.stem
        # Extract base name
        if '_20260' in stem:
            base = stem.split('_20260')[0]
        else:
            base = stem

        # Skip non-portrait files
        if 'placeholder-token' in base or 'battlemap' in base or '-token_circular' in base:
            continue

        portrait_map[base] = f.name

    # Also map tokens
    token_map = {}
    for f in output_dir.glob('*-token_circular.png'):
        base = f.stem.replace('-token_circular', '')
        token_map[base] = f.name

    # Update URLs
    updated = 0
    for actor_key in urls:
        # Try to find portrait
        portrait_base = actor_key.replace('-wight', '')  # Handle naergoth special case

        found_portrait = None
        found_token = None

        # Try exact match
        if actor_key in portrait_map:
            found_portrait = actor_key
        else:
            # Try to find similar
            for base in portrait_map:
                if base.startswith(actor_key) or actor_key in base:
                    found_portrait = base
                    break

        # Try exact match for token
        if actor_key in token_map:
            found_token = actor_key
        else:
            # Try to find similar
            for base in token_map:
                if base.startswith(actor_key) or actor_key in base:
                    found_token = base
                    break

        # Update if found
        if found_portrait:
            urls[actor_key]['portrait'] = f"{base_url}{portrait_map[found_portrait]}"
            if found_token:
                urls[actor_key]['token'] = f"{base_url}{token_map[found_token]}"
            else:
                # Use portrait as fallback
                urls[actor_key]['token'] = f"{base_url}{portrait_map[found_portrait]}"
            updated += 1
            print(f"✓ Updated: {actor_key}")

    # Save updated URLs
    with open(urls_path, 'w') as f:
        json.dump(urls, f, indent=2)

    print(f"\nUpdated {updated} entries in image-urls.json")

def main():
    print("=" * 60)
    print("PORTRAIT CLEANUP AND TOKEN GENERATION")
    print("=" * 60)

    print("\n1. Removing duplicate portraits...")
    cleanup_portraits()

    print("\n2. Generating circular tokens from portraits...")
    tokenize_all_portraits()

    print("\n3. Updating image-urls.json mapping...")
    update_image_urls()

    print("\n" + "=" * 60)
    print("✓ Cleanup and tokenization complete!")
    print("=" * 60)

if __name__ == '__main__':
    main()
