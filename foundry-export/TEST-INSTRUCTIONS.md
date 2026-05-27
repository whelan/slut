# Test Import - Single NPC

## Quick Test

This macro imports just **one NPC (Severin)** to test the import system.

### Steps

1. **Open Foundry** and login to your world
2. **Press F12** to open Developer Console
3. **Click the 'Console' tab** (important!)
4. **Open test-import-macro.js** and copy ALL contents
5. **Paste into console** and press Enter
6. **Check Actors sidebar** - Severin should appear in "temple-of-tiamat" → "NPCs" folder

### What You Should See

- ✅ Console shows: "Test successful! Severin imported"
- ✅ Severin actor appears in "temple-of-tiamat" → "NPCs" folder with:
  - Full stat block (HP, AC, abilities)
  - Token artwork
  - Biography with spells
  - All 16+ spell items

### If It Works

If this test succeeds, you can:
1. Delete the test actor (Severin)
2. Delete the "temple-of-tiamat" folder
3. Run the full import macro to get all 54 actors, 12 journals, and 3 scenes (organized under "temple-of-tiamat")

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
