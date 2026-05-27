#!/usr/bin/env python3
"""Generate complete image-urls.json for all 57 actors."""

import json
from pathlib import Path

BASE_URL = "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/"

# All 57 actors that will be created by the import, with their URL filenames
ACTORS_WITH_URLS = {
    # Party PCs (4)
    "Axar Runes": ("", ""),
    "Daxx Drake": ("", ""),
    "Frygtlos": ("", ""),
    "Twilight Ventress": ("", ""),

    # Council of Waterdeep NPCs (11)
    "Dagult Neverember": ("dagult-neverember-placeholder-token.png", "dagult-neverember-placeholder-token.png"),
    "Ulder Ravengard": ("ulder-ravengard-placeholder-token.png", "ulder-ravengard-placeholder-token.png"),
    "Remallia Haventree": ("remallia-haventree-placeholder-token.png", "remallia-haventree-placeholder-token.png"),
    "Ontharr Frume": ("ontharr-frume-placeholder-token.png", "ontharr-frume-placeholder-token.png"),
    "Delaan Winterhound": ("delaan-winterhound-placeholder-token.png", "delaan-winterhound-placeholder-token.png"),
    "Sir Isteval": ("sir-isteval-placeholder-token.png", "sir-isteval-placeholder-token.png"),
    "Taern Hornblade": ("taern-hornblade-placeholder-token.png", "taern-hornblade-placeholder-token.png"),
    "King Melandrach": ("king-melandrach-placeholder-token.png", "king-melandrach-placeholder-token.png"),
    "Ambassador Brawnanvil": ("ambassador-brawnanvil-placeholder-token.png", "ambassador-brawnanvil-placeholder-token.png"),
    "Crimson Maccath": ("crimson-maccath-placeholder-token.png", "crimson-maccath-placeholder-token.png"),
    "Nyh Ilmichh": ("nyh-ilmichh-placeholder-token.png", "nyh-ilmichh-placeholder-token.png"),

    # Allied NPCs (2)
    "Elia": ("elia-bronze-dragon-token_20260516_170825_1.png", "elia-bronze-dragon-token_20260516_170825_1.png"),
    "Naergoth Bladelord": ("", ""),

    # Final Boss & Ritual Coordinators (4)
    "Severin": ("severin-masked-token_20260516_164450_1.png", "severin-masked-token_20260516_164450_1.png"),
    "Rath Modar": ("rath-modar-token_20260516_164527_1.png", "rath-modar-token_20260516_164527_1.png"),
    "Magus Thezzar": ("magus-thezzar-red-wizard-token_20260517_113119_1.png", "magus-thezzar-red-wizard-token_20260517_113119_1.png"),
    "Red Wizard (Veksin)": ("veksin-young-red-wizard-token_20260516_164551_1.png", "veksin-young-red-wizard-token_20260516_164551_1.png"),

    # SRD Creatures (11)
    "Cultist": ("", ""),
    "Cult Fanatic": ("", ""),
    "Commoner": ("", ""),
    "Black Dragon Wyrmling": ("", ""),
    "Air Elemental": ("", ""),
    "Stone Golem": ("", ""),
    "Flesh Golem": ("", ""),
    "Green Hag": ("", ""),
    "Wight": ("", ""),
    "Mage": ("", ""),
    "Barbed Devil": ("", ""),

    # Dragon Cult Mooks (4)
    "Dragonclaw": ("dragonclaw-rogue-token_20260516_170911_1.png", "dragonclaw-rogue-token_20260516_170911_1.png"),
    "Dragonfang": ("dragonfang-fighter-token_20260516_170907_1.png", "dragonfang-fighter-token_20260516_170907_1.png"),
    "Dragonwing": ("dragonwing-placeholder-token.png", "dragonwing-placeholder-token.png"),
    "Dragonsoul": ("dragonsoul-placeholder-token.png", "dragonsoul-placeholder-token.png"),

    # Abishai - Resurrected Wyrmspeakers (4)
    "White Abishai": ("white-abishai-placeholder-token.png", "white-abishai-placeholder-token.png"),
    "Black Abishai": ("rezmir-black-abishai-token_20260516_164509_1.png", "rezmir-black-abishai-token_20260516_164509_1.png"),
    "Green Abishai": ("neronvain-green-abishai-token_20260516_164522_1.png", "neronvain-green-abishai-token_20260516_164522_1.png"),
    "Blue Abishai": ("galvan-blue-abishai-token_20260516_164513_1.png", "galvan-blue-abishai-token_20260516_164513_1.png"),

    # Other Homebrew (5)
    "Frost Giant Skeleton": ("frost-giant-skeleton-placeholder-token.png", "frost-giant-skeleton-placeholder-token.png"),
    "Dragonbone Crawler": ("dragonbone-crawler-placeholder-token.png", "dragonbone-crawler-placeholder-token.png"),
    "Half-Dragon Red": ("half-dragon-red-placeholder-token.png", "half-dragon-red-placeholder-token.png"),
    "Yuan-Ti Mind Whisperer": ("yuan-ti-mind-whisperer-placeholder-token.png", "yuan-ti-mind-whisperer-placeholder-token.png"),
    "Naergoth Bladelord (Wight)": ("", ""),

    # Tiamat Manifestation (5 Heads)
    "Tiamat - White Head": ("tiamat-white-head-placeholder-token.png", "tiamat-white-head-placeholder-token.png"),
    "Tiamat - Black Head": ("tiamat-black-head-placeholder-token.png", "tiamat-black-head-placeholder-token.png"),
    "Tiamat - Green Head": ("tiamat-green-head-placeholder-token.png", "tiamat-green-head-placeholder-token.png"),
    "Tiamat - Blue Head": ("tiamat-blue-head-placeholder-token.png", "tiamat-blue-head-placeholder-token.png"),
    "Tiamat - Red Head": ("tiamat-red-head-placeholder-token.png", "tiamat-red-head-placeholder-token.png"),

    # Prisoners / Rescuables (7)
    "Stirleng": ("stirleng-placeholder-token.png", "stirleng-placeholder-token.png"),
    "Stirling": ("stirling-placeholder-token.png", "stirling-placeholder-token.png"),
    "Kess": ("kess-placeholder-token.png", "kess-placeholder-token.png"),
    "Thorne": ("thorne-placeholder-token.png", "thorne-placeholder-token.png"),
    "Marta": ("marta-placeholder-token.png", "marta-placeholder-token.png"),
    "Fen": ("fen-placeholder-token.png", "fen-placeholder-token.png"),
    "Older Woman (Banner Bearer)": ("older-woman-placeholder-token.png", "older-woman-placeholder-token.png"),
}

# Build the final JSON with full URLs
url_map = {}
for actor_name, (portrait_file, token_file) in ACTORS_WITH_URLS.items():
    # Convert actor name to key format: lowercase, replace spaces with hyphens, remove parentheses
    actor_key = actor_name.lower()
    actor_key = ''.join(c if c.isalnum() else '-' if c.isspace() or c in '-' else '' for c in actor_key)
    actor_key = '-'.join(word for word in actor_key.split('-') if word)  # Remove empty parts from multiple hyphens

    url_map[actor_key] = {
        "portrait": f"{BASE_URL}{portrait_file}" if portrait_file else "",
        "token": f"{BASE_URL}{token_file}" if token_file else "",
    }

# Write to file
output_path = Path("foundry-export/image-urls.json")
with open(output_path, "w") as f:
    json.dump(url_map, f, indent=2)

print(f"✓ Generated image-urls.json with {len(url_map)} actors")
print(f"  - Actors with existing artwork: {sum(1 for v in url_map.values() if v['portrait'] and 'token_' in v['portrait'])}")
print(f"  - Actors with placeholders: {sum(1 for v in url_map.values() if 'placeholder' in v['portrait'])}")
print(f"  - Actors without images: {sum(1 for v in url_map.values() if not v['portrait'])}")

# Print all keys for verification
print("\n✓ Actor keys for reference:")
for key in sorted(url_map.keys()):
    url_map[key]['portrait'] and url_map[key]['token']
    has_asset = "✓" if url_map[key]['portrait'] else "–"
    print(f"  {has_asset} {key}")
