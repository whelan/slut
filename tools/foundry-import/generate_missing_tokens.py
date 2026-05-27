#!/usr/bin/env python3
"""Generate placeholder token images for all actors missing artwork.

This script creates simple colored circular tokens with initials/names for:
- Party PCs (Axar, Daxx, Frygtlos, Twilight)
- Naergoth Bladelord
- SRD creatures (Cultist, Mage, etc.)

Saves tokens to art/finale/output/ and updates image-urls.json.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json
from datetime import datetime

# Actor info: (name, color_rgb, text_label)
MISSING_ACTORS = {
    'Axar Runes': {
        'color': (70, 130, 180),  # Steel blue for wizard
        'text': 'AR',
        'category': 'pc',
    },
    'Daxx Drake': {
        'color': (34, 139, 34),  # Forest green for ranger
        'text': 'DD',
        'category': 'pc',
    },
    'Frygtløs': {
        'color': (139, 35, 69),  # Dark red for barbarian
        'text': 'FR',
        'category': 'pc',
    },
    'Twilight Ventress': {
        'color': (75, 0, 130),  # Indigo for bard
        'text': 'TV',
        'category': 'pc',
    },
    'Naergoth Bladelord': {
        'color': (105, 105, 105),  # Dim gray for undead
        'text': 'NB',
        'category': 'npc',
    },
    'Cultist': {
        'color': (139, 0, 0),  # Dark red for cult
        'text': 'C',
        'category': 'srd',
    },
    'Cult Fanatic': {
        'color': (178, 34, 34),  # Fire brick for cult leader
        'text': 'CF',
        'category': 'srd',
    },
    'Commoner': {
        'color': (160, 82, 45),  # Sienna for commoner
        'text': 'CO',
        'category': 'srd',
    },
    'Black Dragon Wyrmling': {
        'color': (25, 25, 112),  # Midnight blue for black dragon
        'text': 'BDW',
        'category': 'srd',
    },
    'Air Elemental': {
        'color': (176, 224, 230),  # Powder blue for air
        'text': 'AE',
        'category': 'srd',
    },
    'Stone Golem': {
        'color': (128, 128, 128),  # Gray for stone
        'text': 'SG',
        'category': 'srd',
    },
    'Flesh Golem': {
        'color': (205, 133, 63),  # Peru for flesh
        'text': 'FG',
        'category': 'srd',
    },
    'Green Hag': {
        'color': (46, 139, 87),  # Sea green for hag
        'text': 'GH',
        'category': 'srd',
    },
    'Wight': {
        'color': (47, 79, 79),  # Dark slate gray for undead
        'text': 'W',
        'category': 'srd',
    },
    'Mage': {
        'color': (186, 85, 211),  # Medium orchid for mage
        'text': 'M',
        'category': 'srd',
    },
    'Barbed Devil': {
        'color': (220, 20, 60),  # Crimson for devil
        'text': 'BD',
        'category': 'srd',
    },
    'Naergoth Bladelord (Wight)': {
        'color': (105, 105, 105),  # Dim gray for undead
        'text': 'NBW',
        'category': 'npc',
    },
}

def create_placeholder_token(actor_name: str, color_rgb, text: str, output_dir: str) -> str:
    """Create a simple colored circular token with text label.

    Args:
        actor_name: Name of the actor
        color_rgb: RGB tuple for background color
        text: Text to display on token (initials or abbreviation)
        output_dir: Directory to save token

    Returns:
        Filename of created token
    """
    size = 512

    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Draw colored circle
    draw.ellipse([0, 0, size-1, size-1], fill=color_rgb, outline=(255, 255, 255, 255), width=3)

    # Try to use a decent font, fallback to default
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 80)
    except:
        font = ImageFont.load_default()

    # Draw text in center
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    draw.text((x, y), text, font=font, fill=(255, 255, 255, 255))

    # Generate filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    actor_key = actor_name.lower().replace(' ', '-').replace('(', '').replace(')', '')
    actor_key = '-'.join(word for word in actor_key.split('-') if word)
    filename = f"{actor_key}-placeholder-token_{timestamp}_1.png"

    # Save token
    output_path = Path(output_dir) / filename
    output_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(output_path)

    return filename

def main():
    output_dir = "art/finale/output"
    print(f"Generating placeholder tokens in {output_dir}...")
    print()

    generated = {}

    for actor_name, info in MISSING_ACTORS.items():
        filename = create_placeholder_token(
            actor_name,
            info['color'],
            info['text'],
            output_dir
        )
        generated[actor_name] = filename
        print(f"✓ {actor_name:30s} → {filename}")

    print()
    print(f"✓ Generated {len(generated)} placeholder tokens")

    # Update image-urls.json
    urls_path = Path("foundry-export/image-urls.json")
    with open(urls_path, 'r') as f:
        urls = json.load(f)

    base_url = "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/"

    for actor_name, filename in generated.items():
        actor_key = actor_name.lower()
        actor_key = ''.join(c if c.isalnum() else '-' if c.isspace() or c in '-' else '' for c in actor_key)
        actor_key = '-'.join(word for word in actor_key.split('-') if word)

        if actor_key in urls:
            urls[actor_key]['portrait'] = f"{base_url}{filename}"
            urls[actor_key]['token'] = f"{base_url}{filename}"
            print(f"✓ Updated URL mapping: {actor_key}")

    with open(urls_path, 'w') as f:
        json.dump(urls, f, indent=2)

    print()
    print(f"✓ Updated image-urls.json with {len(generated)} new tokens")
    print()
    print("Next steps:")
    print("1. Upload all PNG files from art/finale/output/ to Forge VTT asset manager")
    print("2. Run: python3 tools/foundry-import/main.py --input-dir . --output foundry-export --macro")
    print("3. Import the macro into Foundry")

if __name__ == '__main__':
    try:
        from PIL import Image
        main()
    except ImportError:
        print("Error: Pillow is required")
        print("Install with: pip install Pillow")
        exit(1)
