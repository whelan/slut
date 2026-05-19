# Foundry VTT Import Workflow

Complete workflow for importing the Temple of Tiamat campaign into Foundry VTT on Forge.

---

## Overview

The import happens in three stages:

1. **Generate**: Create token artwork and import macro
2. **Upload**: Push tokens to Forge VTT asset manager
3. **Import**: Run macro in Foundry console

---

## Stage 1: Generate Locally

### Step 1.1: Generate Token Artwork

```bash
cd tools/foundry-import
python3 token_generator.py ../../art/finale/output ./export
```

This creates:
- `export/tokens/` — Circular tokens with D&D brown border (11 tokens)
- `export/token-mapping.json` — Maps portrait filenames to token filenames
- `export/TOKENS-INSTRUCTIONS.md` — Instructions for uploading tokens

**Output:** 11 circular PNG tokens ready for Forge VTT asset manager

### Step 1.2: Generate Import Macro (Initial)

```bash
cd tools/foundry-import
python3 main.py --input-dir ../../ --output ./export --macro
```

This creates:
- `export/import-macro.js` — Main import script (without URLs)
- `export/test-import-macro.js` — Test macro (single NPC)
- `export/IMPORT-INSTRUCTIONS.md` — Import instructions
- `export/image-urls.json.template` — URL mapping template for you to fill

**Output:** Macros ready for console import

---

## Stage 2: Upload Assets to Forge VTT

### Step 2.1: Prepare Assets

Gather files to upload:

```
From export/tokens/:
  - All PNG files (11 circular tokens with brown borders)

From art/finale/output/:
  - All portrait files referenced in image-urls.json.template
```

### Step 2.2: Upload to Forge Asset Manager

1. **Log in to Forge VTT** (forge-vtt.com)
2. **Go to Game > Assets**
3. **Create folder** `tiamat-campaign/portraits` (for portrait artwork)
4. **Create folder** `tiamat-campaign/tokens` (for circular tokens)
5. **Upload files:**
   - Upload all PNG files from `export/tokens/` → `tiamat-campaign/tokens/`
   - Upload all portrait artwork → `tiamat-campaign/portraits/`
6. **Copy URLs** from Forge asset manager for each file

### Step 2.3: Fill Image URL Mapping

Edit `export/image-urls.json`:

```json
{
  "severin": {
    "portrait": "https://forge-vtt.com/bazaar/assets/...",
    "token": "https://forge-vtt.com/bazaar/assets/..."
  },
  "rath-modar": {
    "portrait": "https://forge-vtt.com/bazaar/assets/...",
    "token": "https://forge-vtt.com/bazaar/assets/..."
  },
  ...
}
```

For each NPC:
1. Find the portrait URL in Forge assets
2. Find the corresponding token URL
3. Paste both into the JSON mapping

**Note:** URLs must start with `https://` (not `http://`)

---

## Stage 3: Import into Foundry

### Step 3.1: Regenerate Macro with URLs

After filling `image-urls.json`, regenerate the macro to embed the URLs:

```bash
cd tools/foundry-import
python3 main.py --input-dir ../../ --output ./export --macro
```

The tool now:
- Reads `image-urls.json` from the output directory
- Applies Forge VTT URLs to each actor
- Regenerates `import-macro.js` with URLs embedded

**Output:** `export/import-macro.js` now contains all URLs

### Step 3.2: Test with Single NPC (Optional)

Before importing all 54 actors, test with a single NPC:

1. **Open Foundry** and login to your world
2. **Press F12** to open Developer Console
3. **Click "Console" tab**
4. **Copy entire contents** of `export/test-import-macro.js`
5. **Paste into console** and press **Enter**
6. **Check Actors sidebar** — Severin should appear in "NPCs" folder

If successful, proceed to full import. If it fails, check:
- Browser console for error messages (F12 → Console tab)
- Ensure dnd5e system is enabled in your world
- Try refreshing and retrying

### Step 3.3: Full Import

1. **Open Foundry** and login to your world
2. **Press F12** to open Developer Console
3. **Click "Console" tab**
4. **Copy entire contents** of `export/import-macro.js`
5. **Paste into console** and press **Enter**
6. **Wait for notifications:**
   - "Starting campaign import..."
   - "Created 3 folders: NPCs, Journals, Scenes"
   - "Importing 54 actors..."
   - "✓ 54 actors imported"
   - "Importing X journals..."
   - "Importing 3 scenes..."
   - "✓ Campaign import complete!"
7. **Check sidebars:**
   - Actors → "NPCs" folder with all 54 actors + portraits/tokens
   - Journals → "Journals" folder with all lore/session prep
   - Scenes → "Scenes" folder with Temple battlemaps

**Done!** All content imported with Forge VTT artwork linked.

---

## Troubleshooting

### Macro won't paste in console

- Make sure you're in the **"Console"** tab, not "Elements" or "Network"
- Copy **the entire contents** of the macro file (not just part of it)
- Try clearing the console and pasting again

### Artwork not showing after import

- Check that URLs in `image-urls.json` start with `https://`
- Verify URLs are valid by opening them in a browser
- If URLs are broken, re-upload to Forge and update `image-urls.json`
- Regenerate the macro and reimport

### Only some actors imported

- Check browser console (F12) for specific error messages
- Some actors may fail silently if they have malformed data
- Try importing test macro first to verify system works
- Check that dnd5e system v5.2.3+ is enabled

### Console shows errors but import continues

- Some non-critical errors are expected (e.g., missing spell compendium links)
- Check the final "Campaign import complete!" notification
- If you see it, the import succeeded; ignore earlier warnings

---

## File Structure After Generation

```
tools/foundry-import/
├── export/
│   ├── import-macro.js                 ← Main import script (paste in console)
│   ├── test-import-macro.js            ← Test with single NPC first
│   ├── image-urls.json                 ← Your filled URL mapping
│   ├── image-urls.json.template        ← Template (copy & fill)
│   ├── IMPORT-INSTRUCTIONS.md          ← Instructions (shown above)
│   ├── tokens/                         ← Circular token PNGs
│   │   ├── severin_token.png
│   │   ├── rath-modar_token.png
│   │   └── ... (11 total)
│   └── token-mapping.json              ← Maps portraits to tokens
└── main.py                             ← CLI entry point
```

---

## Quick Reference Commands

**Generate everything:**
```bash
cd tools/foundry-import
python3 main.py --input-dir ../../ --output ./export --macro --test
python3 token_generator.py ../../art/finale/output ./export
```

**Regenerate macro with URLs (after filling image-urls.json):**
```bash
cd tools/foundry-import
python3 main.py --input-dir ../../ --output ./export --macro
```

**Test single NPC:**
- Copy contents of `export/test-import-macro.js`
- Paste in Foundry console (F12 → Console tab)
- Press Enter

**Full import:**
- Copy contents of `export/import-macro.js`
- Paste in Foundry console (F12 → Console tab)
- Press Enter

---

## What Gets Imported

| Entity | Count | Location | Notes |
|--------|-------|----------|-------|
| **Actors** | 54 | NPCs folder | Full stat blocks, artwork, spells |
| **Journals** | 12+ | Journals folder | Campaign lore, session prep, NPC profiles |
| **Scenes** | 3 | Scenes folder | Temple levels with artwork backgrounds |
| **Folders** | 3 | Root | NPCs, Journals, Scenes |

---

## Advanced: Manual URL Application

If `image-urls.json` doesn't work, you can manually add URLs to actors:

1. After import, select an actor in Foundry
2. Click **Avatar** → **Choose Image** → **Forge URL**
3. Paste the portrait URL from your Forge asset manager
4. Click **Token** → **Portrait** → **Forge URL** for token image

This is slower but works as a fallback.

---

## Notes

- **File size:** With URLs, macro is ~1 MB. Without URLs (embedded images), ~128 MB.
- **Artwork hosting:** URLs keep files small; Forge VTT handles image delivery.
- **Reusability:** Once imported, you can delete the macro and tokens; Foundry keeps the content.
- **Editing:** All imported content is editable in Foundry UI after import.
- **Rollback:** To re-import, delete actors/journals/scenes and run macro again.

---

## Support

If something goes wrong:

1. **Check browser console** (F12 → Console tab) for error messages
2. **Review** `IMPORT-INSTRUCTIONS.md` in the export folder
3. **Test with** `test-import-macro.js` first
4. **Verify** `image-urls.json` has valid URLs (start with `https://`)
5. **Ensure** dnd5e system v5.2.3+ is enabled in Foundry world

Good luck!
