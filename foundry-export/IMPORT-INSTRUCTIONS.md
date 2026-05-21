# Tyranny of Dragons - Import Macro

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
