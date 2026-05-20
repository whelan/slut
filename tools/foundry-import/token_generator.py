"""Generate circular token images from portrait artwork."""

import json
from pathlib import Path
from typing import Optional, Tuple

try:
    from PIL import Image, ImageDraw, ImageOps
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False


def generate_tokens(
    art_dir: str,
    output_dir: str,
    border_color: Tuple[int, int, int] = (139, 69, 19),  # Brown border
    border_width: int = 8,
) -> dict:
    """Generate circular tokens from portrait artwork.

    Args:
        art_dir: Directory containing portrait PNGs
        output_dir: Directory to save tokens
        border_color: RGB tuple for border color (default: brown for D&D style)
        border_width: Width of border in pixels

    Returns:
        Dict mapping portrait filename to token filename
    """

    if not PIL_AVAILABLE:
        raise ImportError(
            "PIL/Pillow is required for token generation.\n"
            "Install with: pip install Pillow"
        )

    art_path = Path(art_dir)
    out_path = Path(output_dir)
    tokens_dir = out_path / "tokens"
    tokens_dir.mkdir(parents=True, exist_ok=True)

    mapping = {}
    processed = 0
    skipped = 0

    # Find all portrait PNGs
    for portrait_file in sorted(art_path.glob("*-token*.png")):
        try:
            # Open portrait
            img = Image.open(portrait_file)

            # Make square (for circular token)
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

            # Apply circular mask
            output = ImageOps.fit(img_square, (size, size), centering=(0.5, 0.5))
            output.putalpha(mask)

            # Add border
            bordered = Image.new("RGBA", (size + border_width * 2, size + border_width * 2), border_color + (255,))
            bordered.paste(output, (border_width, border_width), output)

            # Save token
            token_name = portrait_file.stem + "_token.png"
            token_path = tokens_dir / token_name
            bordered.save(token_path, "PNG")

            mapping[portrait_file.name] = token_name
            processed += 1
            print(f"  ✓ {portrait_file.name} → {token_name}")

        except Exception as e:
            skipped += 1
            print(f"  ✗ {portrait_file.name}: {e}")

    print()
    print(f"Token generation complete:")
    print(f"  - Generated: {processed} tokens")
    print(f"  - Skipped: {skipped}")
    print(f"  - Output: {tokens_dir}")
    print()
    print("Token URLs (add to image-urls.json):")
    for portrait, token in sorted(mapping.items()):
        base_name = portrait.split("_")[0]
        print(f'  "{base_name}-token": {{"portrait": "url-to-{portrait}", "token": "url-to-{token}"}}')

    # Save mapping
    mapping_path = out_path / "token-mapping.json"
    with open(mapping_path, "w", encoding="utf-8") as f:
        json.dump(mapping, f, indent=2)
    print(f"\nMapping saved to: {mapping_path}")

    return mapping


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python3 token_generator.py <art_directory> [output_directory]")
        print("Example: python3 token_generator.py ../art/finale/output ./tokens")
        sys.exit(1)

    art_dir = sys.argv[1]
    out_dir = sys.argv[2] if len(sys.argv) > 2 else "./tokens"

    try:
        generate_tokens(art_dir, out_dir)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
