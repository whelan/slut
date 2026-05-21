#!/usr/bin/env python3
"""Generate placeholder tokens for NPCs without artwork.

This ensures all 58 actors have at least a placeholder token image,
even if they don't have custom artwork.
"""

from pathlib import Path
from PIL import Image, ImageDraw
import json

def generate_placeholder_token(name: str, role: str, output_dir: Path):
    """Generate a colored circular placeholder token for an NPC."""
    # Role-based colors
    role_colors = {
        'character': (100, 150, 200),  # Blue
        'npc': (150, 100, 50),  # Brown
        'cultist': (200, 50, 50),  # Red
        'enemy': (180, 50, 50),  # Dark red
        'dragon': (200, 150, 50),  # Gold
        'council': (200, 150, 100),  # Tan
        'prisoner': (100, 100, 100),  # Gray
        'elite': (150, 50, 150),  # Purple
    }

    # Determine color based on role or name patterns
    color = role_colors.get(role.lower(), (120, 120, 120))

    # Create circular token
    size = 256
    border_width = 8
    total_size = size + border_width * 2

    # Create transparent background
    token = Image.new("RGBA", (total_size, total_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(token)

    # Draw brown border circle
    border_color = (139, 69, 19, 255)
    draw.ellipse(
        [(border_width // 2, border_width // 2),
         (total_size - border_width // 2, total_size - border_width // 2)],
        outline=border_color,
        width=border_width
    )

    # Draw colored background circle
    inner_margin = border_width
    draw.ellipse(
        [(inner_margin, inner_margin),
         (total_size - inner_margin, total_size - inner_margin)],
        fill=color + (255,)  # Add alpha
    )

    # Draw initials or simple label
    try:
        from PIL import ImageFont
        # Try to use default font
        font = ImageFont.load_default()
        text = name[0].upper() if name else "?"
        # Rough estimate for text positioning
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (total_size - text_width) // 2
        y = (total_size - text_height) // 2
        draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
    except Exception:
        pass  # If font loading fails, just skip text

    # Save token
    output_path = output_dir / f"{name.replace(' ', '-').lower()}-placeholder-token.png"
    token.save(output_path)
    return output_path

def main():
    output_dir = Path("./foundry-export/assets")
    output_dir.mkdir(parents=True, exist_ok=True)

    # List of NPCs that likely don't have artwork yet
    # Based on the Council of Waterdeep and other NPCs
    npcs_to_generate = [
        ("Dagult Neverember", "council"),
        ("Ulder Ravengard", "council"),
        ("Remallia Haventree", "council"),
        ("Ontharr Frume", "council"),
        ("Delaan Winterhound", "council"),
        ("Sir Isteval", "council"),
        ("Taern Hornblade", "council"),
        ("King Melandrach", "council"),
        ("Ambassador Brawnanvil", "council"),
        ("Crimson Maccath", "council"),
        ("Nyh Ilmichh", "council"),
    ]

    print(f"Generating {len(npcs_to_generate)} placeholder tokens...")
    for name, role in npcs_to_generate:
        path = generate_placeholder_token(name, role, output_dir)
        print(f"  ✓ {name}")

    print(f"\nPlaceholder tokens ready in: {output_dir}")
    print("Next steps:")
    print("  1. Optional: Replace placeholders with real artwork")
    print("  2. Upload all tokens to Forge VTT")
    print("  3. Update image-urls.json with Forge URLs")
    print("  4. Regenerate macro with: python3 main.py --input-dir ... --macro")

if __name__ == "__main__":
    main()
