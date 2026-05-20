# Quick Start (5 minutes)

## 1. Install (1 min)

```bash
# From the campaign root directory (where .agents/ and spillere/ exist):
cd tools/foundry-import
pip install -r requirements.txt
```

**On macOS with Xcode error:**
```bash
sudo xcodebuild -license accept
pip install -r requirements.txt
```

**If `pip` not found, try:**
```bash
pip3 install -r requirements.txt  # or: python3 -m pip install -r requirements.txt
```

## 2. Generate the adventure file (30 sec)

**From the campaign root (where .agents/ and spillere/ exist):**
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

## 3. Test Import (1 min)

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

## 4. Full Import (30 sec)

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

- **Default:** Images linked by file path (~1 MB file). Artwork is auto-matched from `art/finale/output/`.
- **With `--embed-images`:** All images embedded as base64 in JSON (~128 MB file). Fully self-contained, no separate image files needed.
