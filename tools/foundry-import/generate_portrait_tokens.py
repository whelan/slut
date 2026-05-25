#!/usr/bin/env python3
"""Convert portrait artwork into circular tokens with transparent backgrounds."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
import json

def create_circular_token(portrait_path: str, output_dir: str) -> str:
    """Create a circular token from a portrait image.

    Args:
        portrait_path: Path to portrait PNG
        output_dir: Directory to save token

    Returns:
        Filename of created token
    """
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
    # Extract the base name (before the timestamp)
    parts = portrait_stem.split("_")
    base_name = "_".join(parts[:-3]) if len(parts) > 3 else portrait_stem

    token_filename = f"{base_name}-token_circular.png"

    # Save token
    token_path = output_path / token_filename
    output.save(token_path)

    return token_filename

def main():
    portrait_dir = "art/finale/output"
    output_dir = "art/finale/output"

    # Find all portrait files
    portrait_patterns = [
        "*wizard-portrait*.png",
        "*ranger-portrait*.png",
        "*barbarian-portrait*.png",
        "*bard-portrait*.png",
        "*wight-portrait*.png",
    ]

    generated = {}
    print("Converting portrait artwork to circular tokens...")
    print()

    for pattern in portrait_patterns:
        for portrait_path in sorted(Path(portrait_dir).glob(pattern)):
            if "metadata" in str(portrait_path):
                continue

            token_filename = create_circular_token(str(portrait_path), output_dir)
            portrait_name = portrait_path.stem.split("_")[0]
            generated[portrait_name] = token_filename
            print(f"✓ {portrait_name:30s} → {token_filename}")

    print()
    print(f"✓ Generated {len(generated)} portrait tokens")

    # Update image-urls.json with both portrait and token URLs
    urls_path = Path("foundry-export/image-urls.json")
    with open(urls_path, 'r') as f:
        urls = json.load(f)

    base_url = "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/"

    # Mapping of portrait base names to actor keys
    actor_mappings = {
        'axar-runes-wizard-portrait': 'axar-runes',
        'daxx-drake-ranger-portrait': 'daxx-drake',
        'frygtlos-barbarian-portrait': 'frygtlos',
        'twilight-ventress-bard-portrait': 'twilight-ventress',
        'naergoth-bladelord-wight-portrait': 'naergoth-bladelord',
    }

    updated = 0
    for portrait_name, token_filename in generated.items():
        actor_key = actor_mappings.get(portrait_name)
        if actor_key and actor_key in urls:
            # Get the actual portrait filename (with timestamp)
            portrait_files = list(Path(portrait_dir).glob(f"{portrait_name}_*_1.png"))
            if portrait_files:
                portrait_filename = portrait_files[0].name
                urls[actor_key]['portrait'] = f"{base_url}{portrait_filename}"
                urls[actor_key]['token'] = f"{base_url}{token_filename}"
                print(f"✓ Updated URLs: {actor_key}")
                updated += 1

    with open(urls_path, 'w') as f:
        json.dump(urls, f, indent=2)

    print()
    print(f"✓ Updated image-urls.json with {updated} portrait/token pairs")
    print()
    print("Next steps:")
    print("1. Upload PNG files from art/finale/output/ to Forge VTT")
    print("2. Run: python3 tools/foundry-import/main.py --input-dir . --output foundry-export --macro")
    print("3. Import macro into Foundry")

if __name__ == '__main__':
    try:
        from PIL import Image
        main()
    except ImportError:
        print("Error: Pillow is required")
        print("Install with: pip install Pillow")
        exit(1)
