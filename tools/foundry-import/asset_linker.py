"""Link artwork and generate spell items for actors and scenes."""

import os
import re
import base64
from pathlib import Path
from difflib import SequenceMatcher
from typing import Any, Dict, Optional, List


class AssetLinker:
    """Match campaign artwork to actors and scenes by fuzzy name matching."""

    def __init__(self, art_dir: str, embed_images: bool = False):
        self.art_dir = Path(art_dir)
        self.embed_images = embed_images
        self.tokens = self._scan_assets("token")
        self.battlemaps = self._scan_assets("battlemap")

    def _scan_assets(self, asset_type: str) -> Dict[str, str]:
        """Scan art directory for PNG files of given type."""
        assets = {}
        pattern = f"*{asset_type}*.png"
        for file_path in sorted(self.art_dir.glob(pattern)):
            # Extract base name (without timestamp and suffix)
            name = file_path.stem.split('_')[0]
            assets[name] = str(file_path)
        return assets

    def _file_to_dataurl(self, file_path: str) -> Optional[str]:
        """Convert PNG file to base64 DataURL."""
        try:
            with open(file_path, 'rb') as f:
                data = f.read()
            b64 = base64.b64encode(data).decode('utf-8')
            return f"data:image/png;base64,{b64}"
        except Exception as e:
            print(f"  WARN: Could not encode {file_path}: {e}")
            return None

    def find_actor_art(self, actor_name: str) -> Optional[str]:
        """Find matching token art for an actor."""
        # Normalize: lowercase, remove parentheticals, hyphens, extra spaces
        normalized = actor_name.lower()
        normalized = re.sub(r'\([^)]*\)', '', normalized)  # Remove (Phase 1), (Wight), etc.
        normalized = re.sub(r'\s+', ' ', normalized).strip()

        # Exact match first
        for art_name, art_path in self.tokens.items():
            if art_name.lower() == normalized or art_name.lower() == normalized.replace(" ", "-"):
                return self._process_image(art_path)

        # Fuzzy match: find best matching token by checking if key words appear
        best_match = None
        best_score = 0.45
        normalized_parts = normalized.split()

        for art_name, art_path in self.tokens.items():
            art_lower = art_name.lower()

            # Bonus: check if any normalized word appears in art name
            matched_parts = sum(1 for part in normalized_parts if part in art_lower)
            if matched_parts > 0:
                # If key words match, use lower fuzzy threshold
                score = matched_parts / max(len(normalized_parts), 1) + 0.3
            else:
                score = SequenceMatcher(None, normalized.replace(" ", "-"), art_lower).ratio()

            if score > best_score:
                best_score = score
                best_match = art_path

        if best_match:
            return self._process_image(best_match)
        return None

    def find_scene_art(self, scene_name: str) -> Optional[str]:
        """Find matching battlemap art for a scene."""
        # Map scene names to battlemap identifiers
        name_lower = scene_name.lower()

        battlemap_path = None
        if "level 1" in name_lower or "the maw" in name_lower:
            # Level 1 doesn't have explicit artwork yet, use plaza as fallback
            battlemap_path = self.battlemaps.get("plaza-23-temple-entrance-battlemap")
        elif "level 2" in name_lower or "fivefold" in name_lower:
            battlemap_path = self.battlemaps.get("level-2-fivefold-sanctum-battlemap")
        elif "level 3" in name_lower or "the crown" in name_lower:
            battlemap_path = self.battlemaps.get("level-3-the-crown-battlemap")

        if battlemap_path:
            return self._process_image(battlemap_path)
        return None

    def _process_image(self, file_path: str) -> Optional[str]:
        """Return image as DataURL or file path based on embed_images setting."""
        if self.embed_images:
            return self._file_to_dataurl(file_path)
        else:
            return file_path


class SpellItemGenerator:
    """Extract spells from actor biographies and generate Foundry spell items."""

    # Canonical spell names from 2024 SRD (lowercase mapping)
    SRD_SPELLS = {
        "detect magic": {"level": 0, "school": "divination"},
        "speak with animals": {"level": 1, "school": "divination"},
        "eldritch blast": {"level": 0, "school": "evocation"},
        "fire bolt": {"level": 0, "school": "evocation"},
        "mind sliver": {"level": 0, "school": "enchantment"},
        "dominate person": {"level": 5, "school": "enchantment"},
        "hold monster": {"level": 5, "school": "enchantment"},
        "wall of fire": {"level": 5, "school": "evocation"},
        "eyebite": {"level": 6, "school": "necromancy"},
        "globe of invulnerability": {"level": 6, "school": "abjuration"},
        "finger of death": {"level": 7, "school": "necromancy"},
        "plane shift": {"level": 7, "school": "conjuration"},
        "dominate monster": {"level": 8, "school": "enchantment"},
        "wish": {"level": 9, "school": "conjuration"},
        "protection from good and evil": {"level": 1, "school": "abjuration"},
        "cure wounds": {"level": 1, "school": "evocation"},
        "healing word": {"level": 1, "school": "evocation"},
        "magic missile": {"level": 1, "school": "evocation"},
        "shield": {"level": 1, "school": "abjuration"},
        "scorching ray": {"level": 2, "school": "evocation"},
        "counterspell": {"level": 3, "school": "abjuration"},
        "fireball": {"level": 3, "school": "evocation"},
        "lightning bolt": {"level": 3, "school": "evocation"},
        "cone of cold": {"level": 5, "school": "evocation"},
        "disintegrate": {"level": 6, "school": "evocation"},
        "contingency": {"level": 6, "school": "evocation"},
        "telekinesis": {"level": 5, "school": "transmutation"},
    }

    @classmethod
    def extract_spells_from_biography(cls, biography_html: str) -> List[str]:
        """Extract spell names from actor biography text."""
        spells = set()

        # Convert HTML to plain text (rough)
        text = re.sub(r"<[^>]+>", " ", biography_html)
        text = text.lower()

        # Look for spell names in text
        for spell_name in cls.SRD_SPELLS.keys():
            # Word-boundary match to avoid partial matches
            pattern = r"\b" + re.escape(spell_name) + r"\b"
            if re.search(pattern, text):
                spells.add(spell_name)

        return sorted(list(spells))

    @classmethod
    def make_spell_item(cls, spell_name: str) -> Optional[Dict[str, Any]]:
        """Generate Foundry spell item JSON."""
        spell_lower = spell_name.lower()

        if spell_lower not in cls.SRD_SPELLS:
            return None

        spell_info = cls.SRD_SPELLS[spell_lower]

        # Proper case spell name
        proper_name = " ".join(w.capitalize() for w in spell_name.split())

        return {
            "type": "spell",
            "name": proper_name,
            "img": "icons/svg/item-bag.svg",
            "system": {
                "description": {"value": f"<p>{proper_name}</p>"},
                "source": {"custom": "SRD 2024"},
                "activation": {"type": "action", "cost": 1},
                "level": spell_info["level"],
                "school": spell_info["school"],
                "components": {"verbal": True, "somatic": True, "material": False, "ritual": False, "concentration": False},
                "materials": {"value": "", "consumed": False, "cost": 0, "supply": False},
                "preparation": {"mode": "prepared", "prepared": True},
                "scaling": {"mode": "none", "formula": ""},
                "properties": {"value": []},
            },
            "effects": [],
            "flags": {},
        }
