"""Generate a minimal test macro for importing a single NPC."""

import json
from pathlib import Path
from typing import Any, Dict, List


def build_test_macro(
    output_dir: str,
    actors: List[Dict[str, Any]],
) -> str:
    """Generate a minimal test macro with just one actor."""

    out = Path(output_dir)
    out.mkdir(parents=True, exist_ok=True)

    # Find Severin
    severin = None
    for actor in actors:
        if actor["name"] == "Severin":
            severin = actor
            break

    if not severin:
        # Fallback to first actor
        severin = actors[0] if actors else None

    if not severin:
        raise ValueError("No actors available for test macro")

    # Create minimal test macro
    script = f"""
// ============================================================================
// TEST MACRO: Import Single NPC (Severin)
// ============================================================================
// This is a minimal test to verify the import system works
//
// Steps:
// 1. Open Foundry Developer Console (F12)
// 2. Click the 'Console' tab
// 3. Copy this ENTIRE script
// 4. Paste into console and press Enter
// 5. Check Actors sidebar - Severin should appear
// ============================================================================

async function testImport() {{
  try {{
    ui.notifications.info("Testing import with 1 NPC...");

    // Test data: Just Severin
    const testActor = {json.dumps(severin, indent=2)};

    // Create folder (or use existing "NPCs" folder)
    let folder = game.folders.find(f => f.name === "NPCs" && f.type === "Actor");
    if (!folder) {{
      folder = await Folder.create({{
        name: "NPCs",
        type: "Actor"
      }});
    }}

    // Set folder on actor
    testActor.folder = folder.id;

    // Remove _id to let Foundry generate it
    delete testActor._id;

    // Import the actor
    ui.notifications.info("Creating actor: " + testActor.name);
    const actor = await Actor.create(testActor);

    ui.notifications.success("✓ Test successful! " + actor.name + " imported.");
    console.log("Actor created:", actor);

  }} catch (error) {{
    ui.notifications.error("Test failed: " + error.message);
    console.error("Error details:", error);
  }}
}}

// Run the test
testImport();
"""

    macro_path = out / "test-import-macro.js"
    with open(macro_path, "w", encoding="utf-8") as f:
        f.write(script)

    # Create instructions
    instructions = f"""# Test Import - Single NPC

## Quick Test

This macro imports just **one NPC (Severin)** to test the import system.

### Steps

1. **Open Foundry** and login to your world
2. **Press F12** to open Developer Console
3. **Click the 'Console' tab** (important!)
4. **Open test-import-macro.js** and copy ALL contents
5. **Paste into console** and press Enter
6. **Check Actors sidebar** - Severin should appear in "Test - Temple of Tiamat" folder

### What You Should See

- ✅ Console shows: "Test successful! Severin imported"
- ✅ Severin actor appears in "NPCs" folder with:
  - Full stat block (HP, AC, abilities)
  - Token artwork
  - Biography with spells
  - All 16+ spell items

### If It Works

If this test succeeds, you can:
1. Delete the test actor (Severin)
2. Run the full import macro to get all 54 actors, 12 journals, and 3 scenes (they'll go in the same "NPCs" folder)

### If It Fails

Check console for error messages (F12 → Console tab). Common issues:
- Make sure you're in the 'Console' tab, not 'Elements' or 'Network'
- Ensure dnd5e system is enabled in your world
- Try refreshing the page and trying again

## Full Import

Once the test succeeds, use the main import macro:
```
python3 main.py --input-dir . --output ./export --skip-pcs --macro
```

Then follow the same steps with `import-macro.js` for the complete campaign!
"""

    instructions_path = out / "TEST-INSTRUCTIONS.md"
    with open(instructions_path, "w", encoding="utf-8") as f:
        f.write(instructions)

    print(f"✓ Test macro created: {macro_path}")
    print(f"✓ Instructions: {instructions_path}")
    print()
    print("Next steps:")
    print("  1. Open test-import-macro.js")
    print("  2. Copy ALL contents")
    print("  3. In Foundry: Press F12 → Console tab")
    print("  4. Paste and press Enter")
    print(f"  5. Check Actors sidebar - {severin['name']} should appear")
    print()
    print("If this works, the full import will work too!")

    return str(macro_path)
