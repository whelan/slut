"""Load image URLs from image-urls.json mapping file."""

import json
from pathlib import Path
from typing import Dict, Optional


def load_url_mapping(output_dir: str) -> Optional[Dict[str, Dict[str, str]]]:
    """Load image URL mapping from image-urls.json if it exists.

    Args:
        output_dir: Directory to check for image-urls.json

    Returns:
        Dict mapping actor names to {portrait, token} URLs, or None if file doesn't exist
    """
    url_file = Path(output_dir) / "image-urls.json"

    if not url_file.exists():
        return None

    try:
        with open(url_file, "r", encoding="utf-8") as f:
            mapping = json.load(f)

        # Remove metadata keys
        mapping.pop("_comment", None)
        mapping.pop("_instructions", None)
        mapping.pop("_example", None)

        return mapping
    except (json.JSONDecodeError, IOError) as e:
        print(f"Warning: Failed to load image-urls.json: {e}")
        return None


def apply_url_mapping(actors: list, url_mapping: Optional[Dict]) -> list:
    """Apply portrait and token URLs from mapping to actor data.

    Args:
        actors: List of actor dictionaries
        url_mapping: Dict mapping actor keys to {portrait, token} URLs

    Returns:
        Updated actors list with URLs applied
    """
    if not url_mapping:
        return actors

    for actor in actors:
        # Try to find matching URL entry
        actor_name = actor.get("name", "")

        # Try exact key match (lowercase with hyphens)
        actor_key = actor_name.lower().replace(" ", "-").replace("'", "")

        if actor_key in url_mapping:
            mapping = url_mapping[actor_key]

            # Apply portrait URL
            if mapping.get("portrait") and mapping["portrait"].startswith("https://"):
                actor["img"] = mapping["portrait"]
                print(f"  ✓ {actor_name}: Portrait URL applied")

            # Apply token URL
            if mapping.get("token") and mapping["token"].startswith("https://"):
                if "prototypeToken" not in actor:
                    actor["prototypeToken"] = {}
                if "texture" not in actor["prototypeToken"]:
                    actor["prototypeToken"]["texture"] = {}

                actor["prototypeToken"]["texture"]["src"] = mapping["token"]
                print(f"  ✓ {actor_name}: Token URL applied")

    return actors
