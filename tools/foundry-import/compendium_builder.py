"""Generate Foundry v13 compendium packs from campaign data."""

import json
from pathlib import Path
from typing import Any, Dict, List


def build_compendium_packs(
    output_dir: str,
    actors: List[Dict[str, Any]],
    journals: List[Dict[str, Any]],
    scenes: List[Dict[str, Any]],
) -> None:
    """Generate compendium pack directories for Foundry v13."""
    out = Path(output_dir)
    packs_dir = out / "packs"
    packs_dir.mkdir(parents=True, exist_ok=True)

    # Create actor compendium
    _create_compendium(
        packs_dir / "actors",
        name="Temple of Tiamat - Actors",
        label="Actors",
        type="Actor",
        documents=actors,
    )

    # Create journal compendium
    _create_compendium(
        packs_dir / "journals",
        name="Temple of Tiamat - Journals",
        label="Journals",
        type="JournalEntry",
        documents=journals,
    )

    # Create scene compendium
    _create_compendium(
        packs_dir / "scenes",
        name="Temple of Tiamat - Scenes",
        label="Scenes",
        type="Scene",
        documents=scenes,
    )

    print(f"✓ Compendium packs generated in: {packs_dir}")
    print(f"  - actors/ ({len(actors)} actors)")
    print(f"  - journals/ ({len(journals)} journals)")
    print(f"  - scenes/ ({len(scenes)} scenes)")


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
        # Use doc type if available, otherwise infer from metadata type
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
