"""Generate Foundry module package with embedded compendium packs."""

import json
from pathlib import Path
from typing import Any, Dict, List


def build_module(
    output_dir: str,
    actors: List[Dict[str, Any]],
    journals: List[Dict[str, Any]],
    scenes: List[Dict[str, Any]],
) -> str:
    """Generate a Foundry module with embedded compendium packs."""
    out = Path(output_dir)
    module_dir = out / "tyranny-of-dragons-finale"
    module_dir.mkdir(parents=True, exist_ok=True)

    # Create module.json manifest
    manifest = {
        "id": "tyranny-of-dragons-finale",
        "name": "Tyranny of Dragons - Finale",
        "title": "Tyranny of Dragons - Finale (Temple of Tiamat)",
        "description": "Complete campaign import for D&D 5e Tyranny of Dragons finale. Includes 54 actors, 12 journals, 3 scenes with full stat blocks, artwork, and spell items.",
        "version": "1.0.0",
        "authors": [
            {"name": "Campaign Importer", "email": ""}
        ],
        "packs": [
            {
                "name": "actors",
                "label": "Actors",
                "type": "Actor",
                "path": "packs/actors"
            },
            {
                "name": "journals",
                "label": "Journals",
                "type": "JournalEntry",
                "path": "packs/journals"
            },
            {
                "name": "scenes",
                "label": "Scenes",
                "type": "Scene",
                "path": "packs/scenes"
            }
        ],
        "system": ["dnd5e"],
        "compatibility": {
            "minimum": "13.0.0",
            "verified": "13.0.0",
            "maximum": "13"
        },
        "url": "",
        "manifest": "",
        "download": ""
    }

    manifest_path = module_dir / "module.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    # Create packs directory structure
    packs_dir = module_dir / "packs"
    packs_dir.mkdir(exist_ok=True)

    # Create each compendium pack
    _create_compendium(
        packs_dir / "actors",
        name="Temple of Tiamat - Actors",
        label="Actors",
        type="Actor",
        documents=actors,
    )

    _create_compendium(
        packs_dir / "journals",
        name="Temple of Tiamat - Journals",
        label="Journals",
        type="JournalEntry",
        documents=journals,
    )

    _create_compendium(
        packs_dir / "scenes",
        name="Temple of Tiamat - Scenes",
        label="Scenes",
        type="Scene",
        documents=scenes,
    )

    # Create README
    readme_path = module_dir / "README.md"
    readme_path.write_text(
        """# Tyranny of Dragons - Finale

Complete campaign import module for D&D 5e Tyranny of Dragons finale.

## Contents

- **54 Actors**: NPCs, enemies, prisoners with full stat blocks
- **12 Journals**: Campaign lore, session prep, ritual clock
- **3 Scenes**: Temple levels with battlemap backgrounds

## Installation

1. In Foundry, go to **Add-on Modules** → **Install Module**
2. Paste this URL: (module URL)
3. Install and enable in your world

## Usage

1. Open the **Compendiums** sidebar
2. Drag actors, journals, or scenes into your world
3. Edit tokens/descriptions as needed

## Features

- Full dnd5e v5.2.x stat blocks
- 25 actors with token artwork
- 16+ spell items (auto-extracted)
- Scene backgrounds included
- Everything organized in folders

## Support

For issues or customization, see the campaign documentation.
""",
        encoding="utf-8"
    )

    print(f"✓ Module created: {module_dir}")
    print(f"  Module ID: tyranny-of-dragons-finale")
    print(f"  Path: {module_dir}")
    print()
    print("Next steps:")
    print(f"  1. Zip the module directory: zip -r tyranny-of-dragons-finale.zip {module_dir.name}")
    print("  2. Upload to Forge VTT or your module repository")
    print("  3. In Foundry: Add-on Modules → Install Module → paste URL")
    print("  4. Enable module and drag compendium contents into world")

    return str(module_dir)


def _create_compendium(
    pack_dir: Path,
    name: str,
    label: str,
    type: str,
    documents: List[Dict[str, Any]],
) -> None:
    """Create a single compendium pack directory."""
    pack_dir.mkdir(parents=True, exist_ok=True)

    # Create metadata.json
    metadata = {
        "name": name,
        "label": label,
        "type": type,
        "system": "dnd5e",
        "path": f"./index.json",
        "ownership": {"default": 0},
    }

    metadata_path = pack_dir / "metadata.json"
    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)

    # Create index.json with all documents
    index = {}
    for doc in documents:
        doc_type = doc.get("type", type)
        index[doc["_id"]] = {"name": doc["name"], "type": doc_type}

    index_path = pack_dir / "index.json"
    with open(index_path, "w", encoding="utf-8") as f:
        json.dump(index, f, indent=2, ensure_ascii=False)

    # Create individual document files
    for doc in documents:
        doc_path = pack_dir / f"{doc['_id']}.json"
        with open(doc_path, "w", encoding="utf-8") as f:
            json.dump(doc, f, indent=2, ensure_ascii=False)
