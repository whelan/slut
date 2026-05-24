# Tyranny of Dragons - Import Macro

## Quick Import (Paste & Run)

1. **Open Foundry console** (F12 on keyboard)
2. **Click the "Console" tab** (if not already visible)
3. **Copy entire contents of `import-macro.js`**
4. **Paste into console** and press Enter
5. **Wait for notifications** - "Campaign import complete!"

Done! All 58 actors (with spells automatically added from compendia), 12 journals, and 3 scenes appear in your world.

## What Happens Automatically

1. **Actors created** – All 58 actors with full stat blocks and trait/action items
2. **Spells added** – The macro searches your dnd5e spells compendium and adds spells to spellcasters:
   - Severin (16 spells)
   - Taern Hornblade (6 spells)
   - Crimson Maccath (5 spells)
   - Nyh Ilmichh (5 spells)
   - Other NPCs with spells
3. **Journals created** – 12 campaign lore and session prep journals
4. **Scenes created** – 3 temple levels with battlemaps

No manual spell addition needed!

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

- **58 Actors** with full stat blocks, traits, and artwork
- **Spells** automatically added to spellcasters from your dnd5e spells compendium:
  - Severin: 16 spells (cantrips to 9th-level Wish)
  - Taern Hornblade: 6 spells
  - Crimson Maccath: 5 spells
  - Nyh Ilmichh: 5 spells
  - Other NPCs: various spells as appropriate
- **12 Journals** with campaign lore and session prep
- **3 Scenes** with battlemap backgrounds
- **Folder organization** - Everything organized in "NPCs", "Journals", "Scenes" folders

## How Spell Addition Works

The macro automatically:

1. **Searches** your dnd5e spells compendium for each spell name
2. **Copies** matching spells from the compendium into each actor's Items
3. **Links** to your existing spells (no duplication)

If a spell is not found in your compendia, a warning is logged but import continues.

## Manual Spell Addition (If Needed)

If the automatic addition doesn't find all spells:

1. Open the actor's sheet
2. In the **Items** tab, click **Add Item** → **Item from Compendium**
3. Search for spell name and add it manually

Most spells are in the official dnd5e.spells compendium and should be added automatically.

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
- Spells are NOT embedded; add them from your compendia post-import
- Traits, actions, and legendary actions are included as feat items
- You can edit actors/journals/scenes after import in Foundry UI
