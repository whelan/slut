#!/usr/bin/env python3
"""Gather all character portraits and generated tokens into a single folder.

Usage:
  python3 prepare-assets.py [output_folder]

Example:
  python3 prepare-assets.py ./assets-for-forge
"""

import shutil
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageOps
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False


def generate_token(portrait_path: Path, output_path: Path, border_width: int = 8):
    """Generate a single circular token from a portrait."""
    img = Image.open(portrait_path)

    # Make square
    min_size = min(img.size)
    left = (img.size[0] - min_size) // 2
    top = (img.size[1] - min_size) // 2
    right = left + min_size
    bottom = top + min_size
    img_square = img.crop((left, top, right, bottom))

    # Create circular mask
    size = img_square.size[0]
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size - 1, size - 1), fill=255)

    # Apply mask
    output = ImageOps.fit(img_square, (size, size), centering=(0.5, 0.5))
    output.putalpha(mask)

    # Add brown D&D border
    border_color = (139, 69, 19)
    bordered = Image.new("RGBA", (size + border_width * 2, size + border_width * 2), border_color + (255,))
    bordered.paste(output, (border_width, border_width), output)

    # Save
    bordered.save(output_path, "PNG")


def main():
    if not PIL_AVAILABLE:
        print("Error: PIL/Pillow required. Install with: pip install Pillow")
        sys.exit(1)

    output_dir = sys.argv[1] if len(sys.argv) > 1 else "./assets-for-forge"
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # Source directories
    portraits_dir = Path("../../art/finale/output")
    portraits_dir = portraits_dir.resolve()

    if not portraits_dir.exists():
        print(f"Error: Portraits directory not found: {portraits_dir}")
        sys.exit(1)

    print(f"Gathering assets into: {output_path.resolve()}\n")

    # Find all portrait images (*-token.png files)
    portrait_files = sorted(portraits_dir.glob("*-token*.png"))
    if not portrait_files:
        print(f"No portraits found in {portraits_dir}")
        sys.exit(1)

    copied = 0
    generated = 0

    print("Copying portraits and generating tokens:")
    for portrait_file in portrait_files:
        try:
            # Copy portrait as-is
            portrait_dest = output_path / portrait_file.name
            shutil.copy2(portrait_file, portrait_dest)
            copied += 1

            # Generate token (circular with border)
            token_name = portrait_file.stem + "_token.png"
            token_dest = output_path / token_name
            generate_token(portrait_file, token_dest)
            generated += 1

            print(f"  ✓ {portrait_file.name}")
            print(f"      → {token_name}")

        except Exception as e:
            print(f"  ✗ {portrait_file.name}: {e}")

    print()
    print(f"Complete:")
    print(f"  - Copied: {copied} portraits")
    print(f"  - Generated: {generated} tokens")
    print(f"  - Total files: {copied + generated}")
    print()
    print(f"All files ready in: {output_path.resolve()}")
    print()
    print("Next steps:")
    print("  1. Upload all files to Forge VTT asset manager")
    print("  2. Copy URLs from Forge")
    print("  3. Fill image-urls.json with the URLs")
    print("  4. Run: python3 main.py --input-dir ../.. --output ./out --macro")


if __name__ == "__main__":
    main()
