"""Generate Foundry import macro for pasting into console."""

import json
from pathlib import Path
from typing import Any, Dict, List, Optional

from url_loader import apply_url_mapping


def build_import_macro(
    output_dir: str,
    actors: List[Dict[str, Any]],
    journals: List[Dict[str, Any]],
    scenes: List[Dict[str, Any]],
    url_mapping: Optional[Dict[str, Dict[str, str]]] = None,
) -> str:
    """Generate JavaScript macro for importing all content via Foundry console.

    Args:
        output_dir: Directory to write macro to
        actors: List of actor dictionaries
        journals: List of journal dictionaries
        scenes: List of scene dictionaries
        url_mapping: Optional dict mapping actor names to {portrait, token} URLs
    """

    out = Path(output_dir)
    out.mkdir(parents=True, exist_ok=True)

    # Apply URL mapping if provided
    if url_mapping:
        print("\nApplying artwork URLs from image-urls.json:")
        actors = apply_url_mapping(actors, url_mapping)

    # Create folders first (required for actor/journal/scene assignment)
    folders_script = """
// Create folders for organization
const folders = await Folder.create([
  {
    name: "NPCs",
    type: "Actor",
    parent: null
  },
  {
    name: "Journals",
    type: "JournalEntry",
    parent: null
  },
  {
    name: "Scenes",
    type: "Scene",
    parent: null
  }
]);

const actorFolder = folders[0];
const journalFolder = folders[1];
const sceneFolder = folders[2];

ui.notifications.info(`Created 3 folders: NPCs, Journals, Scenes`);
"""

    # Create import script
    script = f"""
// ============================================================================
// TYRANNY OF DRAGONS - COMPLETE IMPORT MACRO
// ============================================================================
// Paste this entire script into Foundry console (F12) and run
// This will import all 54 actors, 12 journals, and 3 scenes
// ============================================================================

async function importCampaign() {{
  ui.notifications.info("Starting campaign import...");

{folders_script}

  // Actor data
  const actorData = {json.dumps(actors, indent=2)};

  // Journal data
  const journalData = {json.dumps(journals, indent=2)};

  // Scene data
  const sceneData = {json.dumps(scenes, indent=2)};

  // Import actors
  ui.notifications.info(`Importing ${{actorData.length}} actors...`);
  for (const actor of actorData) {{
    actor.folder = actorFolder.id;
    try {{
      await Actor.create(actor);
    }} catch (e) {{
      console.warn(`Failed to create actor ${{actor.name}}:`, e);
    }}
  }}
  ui.notifications.info(`✓ ${{actorData.length}} actors imported`);

  // Import journals
  ui.notifications.info(`Importing ${{journalData.length}} journals...`);
  for (const journal of journalData) {{
    journal.folder = journalFolder.id;
    try {{
      await JournalEntry.create(journal);
    }} catch (e) {{
      console.warn(`Failed to create journal ${{journal.name}}:`, e);
    }}
  }}
  ui.notifications.info(`✓ ${{journalData.length}} journals imported`);

  // Import scenes
  ui.notifications.info(`Importing ${{sceneData.length}} scenes...`);
  for (const scene of sceneData) {{
    scene.folder = sceneFolder.id;
    try {{
      await Scene.create(scene);
    }} catch (e) {{
      console.warn(`Failed to create scene ${{scene.name}}:`, e);
    }}
  }}
  ui.notifications.info(`✓ ${{sceneData.length}} scenes imported`);

  ui.notifications.info("✓ Campaign import complete!");
  console.log("Import finished. Check actors, journals, and scenes sidebars.");
}}

// Run the import
importCampaign().catch(e => {{
  ui.notifications.error("Import failed: " + e.message);
  console.error(e);
}});
"""

    macro_path = out / "import-macro.js"
    with open(macro_path, "w", encoding="utf-8") as f:
        f.write(script)

    # Create instructions
    instructions = f"""# Tyranny of Dragons - Import Macro

## Quick Import (Paste & Run)

1. **Open Foundry console** (F12 on keyboard)
2. **Click the "Console" tab** (if not already visible)
3. **Copy entire contents of `import-macro.js`**
4. **Paste into console** and press Enter
5. **Wait for notifications** - "Campaign import complete!"

Done! All 54 actors, 12 journals, and 3 scenes appear in your world.

## Using Forge VTT Asset Manager URLs (Recommended)

For best results with Forge VTT:

1. **Generate tokens** locally: `python3 token_generator.py art/finale/output ./export`
2. **Upload to Forge VTT asset manager:**
   - Upload all files from `./export/tokens/`
   - Upload portrait artwork from `art/finale/output/`
3. **Fill `image-urls.json`:**
   - Copy URLs from Forge for each actor's portrait and token
   - Template provided in `image-urls.json.template`
4. **Regenerate macro with URLs:**
   - Run: `python3 main.py --input-dir . --output ./export --macro`
   - This updates `import-macro.js` with your Forge VTT URLs
5. **Paste and run** the updated macro in Foundry console

This approach keeps files small and artwork hosted on Forge VTT.

## What Gets Imported

- **54 Actors** with full stat blocks and artwork
- **12 Journals** with campaign lore and session prep
- **3 Scenes** with battlemap backgrounds
- **Folder organization** - Everything organized in "NPCs", "Journals", "Scenes" folders

## Troubleshooting

If import fails:
- Check browser console for error messages (F12 → Console)
- Ensure you're on Foundry v13+
- Verify dnd5e system is enabled in your world
- Check that image-urls.json was properly filled (URLs must start with https://)

## Manual Alternative

If macro import doesn't work:
1. Use the compendium packs method instead
2. Or import individual actors one by one from JSON exports

## Notes

- Import creates new documents (won't overwrite existing)
- Artwork uses URLs from Forge VTT (or embedded base64 if image-urls.json not provided)
- Spells are extracted but not linked to compendium
- You can edit actors/journals/scenes after import in Foundry UI
"""

    instructions_path = out / "IMPORT-INSTRUCTIONS.md"
    with open(instructions_path, "w", encoding="utf-8") as f:
        f.write(instructions)

    print(f"✓ Import macro generated: {macro_path}")
    print(f"✓ Instructions: {instructions_path}")
    print()
    print("Next steps:")
    print("  1. Open import-macro.js")
    print("  2. Copy all contents")
    print("  3. In Foundry: Press F12 → Console tab")
    print("  4. Paste and press Enter")
    print("  5. Wait for 'Campaign import complete!' notification")

    return str(macro_path)
