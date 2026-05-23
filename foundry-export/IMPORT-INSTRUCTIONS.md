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

- **54 Actors** with full stat blocks, traits, and artwork (spells added from your compendia)
- **12 Journals** with campaign lore and session prep
- **3 Scenes** with battlemap backgrounds
- **Folder organization** - Everything organized in "NPCs", "Journals", "Scenes" folders

## About Spells and Items

**Spells and standard attack items are NOT embedded in the import.** Instead, you should add them from your existing Foundry compendia:

1. **For spell-casters (Severin, etc.):** After import, open the actor's sheet and add spells from your dnd5e spells compendium
2. **For items:** Use Foundry's compendium browser to add magic items, weapons, etc. as needed
3. **For traits/actions:** The import includes all special abilities, actions, and legendary actions as feat items

This approach ensures you're using the official/configured items from your Foundry instance, avoiding duplicates.

## Adding Spells to Actors (Post-Import)

After the macro completes:

1. Open each actor's sheet
2. In the **Items** tab, click **Add Item** → **Item from Compendium**
3. Search for spells in your dnd5e spells compendium (e.g., "Fireball", "Hold Monster")
4. Add them to the actor

For NPCs with many spells, you can also manually copy spell items from another actor or create a quick reference in the actor's biography.

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
