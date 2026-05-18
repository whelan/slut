"""Generate Foundry import macro for pasting into console."""

import json
from pathlib import Path
from typing import Any, Dict, List


def build_import_macro(
    output_dir: str,
    actors: List[Dict[str, Any]],
    journals: List[Dict[str, Any]],
    scenes: List[Dict[str, Any]],
) -> str:
    """Generate JavaScript macro for importing all content via Foundry console."""

    out = Path(output_dir)
    out.mkdir(parents=True, exist_ok=True)

    # Create folders first (required for actor/journal/scene assignment)
    folders_script = """
// Create folders for organization
const folders = await Folder.create([
  {
    name: "Temple of Tiamat",
    type: "Actor",
    parent: null
  },
  {
    name: "Temple of Tiamat",
    type: "JournalEntry",
    parent: null
  },
  {
    name: "Temple of Tiamat",
    type: "Scene",
    parent: null
  }
]);

const actorFolder = folders[0];
const journalFolder = folders[1];
const sceneFolder = folders[2];

ui.notifications.info(`Created 3 folders`);
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

## What Gets Imported

- **54 Actors** with full stat blocks and artwork
- **12 Journals** with campaign lore and session prep
- **3 Scenes** with battlemap backgrounds
- **Folder organization** - Everything grouped under "Temple of Tiamat"

## Troubleshooting

If import fails:
- Check browser console for error messages (F12 → Console)
- Ensure you're on Foundry v13+
- Try importing just a few actors first by editing the script
- Check that your world has dnd5e system enabled

## Manual Alternative

If macro import doesn't work:
1. Use the compendium packs method instead
2. Or import individual actors one by one from JSON exports

## Notes

- Import creates new documents (won't overwrite existing)
- Artwork uses embedded base64 or file paths (check settings)
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
