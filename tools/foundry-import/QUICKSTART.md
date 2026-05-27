# Quick Start (5 minutes)

## 1. Install (1 min)

**From the campaign root (where .agents/ and spillere/ exist):**

```bash
cd tools/foundry-import

# Create a virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**On macOS with "externally-managed-environment" error:**

This is normal on modern macOS. Just follow the steps above to use a virtual environment.

**On macOS with Xcode license error:**
```bash
sudo xcodebuild -license accept
# Then run the venv steps above
```

## 2. Prepare Assets for Forge VTT (Optional - for URL-based images)

If you want to use Forge VTT asset URLs instead of local files:

```bash
cd tools/foundry-import
source venv/bin/activate

# Generate tokens and gather assets
python3 prepare-assets.py ./assets-for-forge

# Upload all files in ./assets-for-forge to Forge VTT asset manager
# Then copy the Forge base URL (e.g., https://assets.forge-vtt.com/YOUR_ID/temple-of-tiamat/)

# Generate image-urls.json with Forge URLs
python3 generate-image-urls.py --forge-url "https://assets.forge-vtt.com/YOUR_ID/temple-of-tiamat/"
```

This creates `out/image-urls.json` that will be used by the macros.

**Skip this section if you want to use local file paths** (default behavior).

---

## 3. Generate the macro (30 sec)

**Make sure the virtual environment is activated:**
```bash
cd tools/foundry-import
source venv/bin/activate
```

**Then from the campaign root:**
```bash
cd ../..  # Return to campaign root
python3 tools/foundry-import/main.py --input-dir . --output ./tools/foundry-import/out --macro --test
```

Or from anywhere, specify the full path:
```bash
python3 main.py --input-dir /Users/you/slut --output ./out --macro
```

**Options:**
- `--test` - Generate test macro for single NPC (verify it works first)
- `--macro` - Generate full import macro (easiest for Forge VTT)
- `--skip-pcs` - Skip player characters if they already exist

This writes JavaScript macros that you paste directly into Foundry's console (F12).

## 4. Test Import (1 min)

Test with a single NPC first to verify it works:

```bash
python3 main.py --input-dir . --output ./out --test
```

Then in Foundry:
1. Press **F12** to open Developer Console
2. Click the **Console** tab (not Elements or Network)
3. Open `out/test-import-macro.js` and copy ALL contents
4. Paste into the console and press **Enter**
5. Check Actors sidebar — Severin should appear in "NPCs" folder

If this works, proceed to step 4.

## 5. Full Import (30 sec)

Generate the full import macro:
```bash
python3 main.py --input-dir . --output ./out --macro
```

In Foundry:
1. Press **F12** to open Developer Console
2. Click **Console** tab
3. Open `out/import-macro.js` and copy ALL contents
4. Paste and press **Enter**
5. Wait for **"Campaign import complete!"** notification

Done. All 54 actors, 12 journals, and 3 scenes appear automatically in your world with folder organization.

## 5. Verify (2 min)

- **Actors sidebar**: 54 actors total
  - 14 named campaign NPCs (12 Council members, Severin, Naergoth)
  - 11 SRD creatures (Cultist, Cult Fanatic, Wight, Air Elemental, Stone Golem, ...)
  - 22 homebrew enemies tuned for level 15 (Dragonclaw, Abishai variants, Severin Phase 1+2, 5× Tiamat heads, ...)
  - 7 named prisoners (Stirleng, Kess, Thorne, Marta, Fen, Stirling, Banner Bearer)
- **Journal sidebar**: ~12 entries (Campaign Overview, session prep, profiles, Ritual Clock Tracker)
- **Scenes sidebar**: 3 temple scenes (backgrounds auto-linked)

---

## Optional flags

```bash
# Include player characters (if they don't already exist in Foundry)
python3 main.py --input-dir /path/to/campaign

# Custom adventure name
python3 main.py --input-dir /path/to/campaign --name "My Campaign Name"

# Embed all images in the JSON (self-contained ~128 MB file, no file uploads needed)
python3 main.py --input-dir /path/to/campaign --embed-images

# Combine options
python3 main.py --input-dir /path/to/campaign --embed-images --name "My Campaign"
```

## Image options

- **Default (local paths):** Images linked by local file path (~1 MB file). Artwork auto-matched from `art/finale/output/`. Works offline but paths are system-specific.
- **With Forge VTT URLs:** Use `generate-image-urls.py` to create `image-urls.json` with Forge asset URLs. Works across devices and is the recommended approach for Forge VTT.
- **With `--embed-images`:** All images embedded as base64 in JSON (~128 MB file). Fully self-contained, no separate image files needed. Slow to import.

**Recommended workflow:** Use Forge VTT asset URLs (step 2 above).
