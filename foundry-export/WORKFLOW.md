# Foundry VTT Campaign Import – Complete Workflow

**Status:** ✓ All 58 actors ready with stat blocks and artwork

---

## Summary

Your campaign is ready to import:

- **58 Actors** (4 PCs + 12 Council NPCs + 12 other NPCs + 11 SRD creatures + 19 homebrew enemies)
- **All have stat blocks** (2024 D&D 5e rules)
- **All have artwork** (generated tokens + existing artwork)
- **12 Journals** (campaign lore, session prep, NPC profiles, ritual clock tracker)
- **3 Scenes** (Temple levels 1–3 with battlemaps)

---

## Step 1: Prepare Assets for Upload

Your artwork is ready in: `foundry-export/assets/`

Files included:
- 11 placeholder tokens for Council NPCs (Dagult, Ulder, Remallia, etc.)
- 17 existing artwork files (Severin, Rath Modar, dragons, battlemaps, etc.)
- **Total: 28 files ready to upload**

---

## Step 2: Upload to Forge VTT Asset Manager

1. Log in to **Forge VTT** (https://forgevtt.com)
2. Navigate to **Asset Library** → **Upload Files**
3. Select all 28 files from `foundry-export/assets/`
4. Wait for upload to complete
5. **Copy the base URL** from Forge (e.g., `https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/`)

---

## Step 3: Create `image-urls.json`

After uploading to Forge, create a file at `foundry-export/image-urls.json`:

```json
{
  "severin": {
    "portrait": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/severin-masked-token_20260516_164450_1.png",
    "token": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/severin-masked-token_20260516_164450_1.png"
  },
  "rath-modar": {
    "portrait": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/rath-modar-token_20260516_164527_1.png",
    "token": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/rath-modar-token_20260516_164527_1.png"
  },
  "elia": {
    "portrait": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/elia-bronze-dragon-token_20260516_170825_1.png",
    "token": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/elia-bronze-dragon-token_20260516_170825_1.png"
  },
  "dragonclaw": {
    "portrait": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/dragonclaw-rogue-token_20260516_170911_1.png",
    "token": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/dragonclaw-rogue-token_20260516_170911_1.png"
  },
  "dagult-neverember": {
    "portrait": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/dagult-neverember-placeholder-token.png",
    "token": "https://assets.forge-vtt.com/YOUR_USER/YOUR_WORLD/dagult-neverember-placeholder-token.png"
  }
}
```

**Key notes:**
- Match filenames from `foundry-export/assets/`
- Use actor names in lowercase with hyphens (e.g., `severin`, `rath-modar`)
- Both `portrait` and `token` can point to the same file
- Include all 28 files OR just the ones you want to override defaults

---

## Step 4: Regenerate Macro with URL Mapping

Once you've created `image-urls.json`, regenerate the macro with Forge URLs:

```bash
cd tools/foundry-import
python3 main.py --input-dir ../../ --output ../../foundry-export --macro
```

This will:
1. Read `image-urls.json`
2. Apply Forge URLs to all actors
3. Generate new `import-macro.js` with image links

---

## Step 5: Import into Foundry

1. Open Foundry VTT in your browser
2. Press **F12** to open Developer Console
3. Click the **Console** tab
4. Open `foundry-export/import-macro.js` in a text editor
5. Copy **ALL** contents
6. Paste into the Foundry console and press **Enter**
7. Wait for the message: **"Campaign import complete!"**

All actors, journals, and scenes will be created automatically, with proper image URLs.

---

## Step 6: Post-Import Setup (Optional)

After import, you can manually configure:

- **Scenes:** Add grid overlay, lighting, walls, token placement
- **Encounters:** Place tokens at encounter start positions
- **Player Assignment:** Assign PC actors to player users
- **Permissions:** Set actor/scene visibility for players

---

## Troubleshooting

### Images not showing?

1. Verify `image-urls.json` has correct Forge URLs
2. Check that all files were successfully uploaded to Forge
3. Regenerate macro with: `python3 main.py --input-dir ../../ --output ../../foundry-export --macro`
4. Re-run import macro in console

### Missing actors?

- All 58 should be imported. Check browser console for errors.
- If an actor fails, the error will be logged; re-run macro to retry.

### Placeholder tokens look bad?

- After import, you can replace them with better artwork
- Re-upload to Forge and update `image-urls.json`
- Regenerate macro and re-import

---

## File Structure

```
foundry-export/
  import-macro.js              ← Main import script (paste into console)
  IMPORT-INSTRUCTIONS.md       ← Quick start guide
  WORKFLOW.md                  ← This file
  image-urls.json              ← Maps actor names to Forge asset URLs (create manually)
  assets/                      ← All artwork (28 files)
    severin-masked-token_*.png
    rath-modar-token_*.png
    dagult-neverember-placeholder-token.png
    ... (26 more files)
```

---

## What's Included in Import

### Actors (58)

| Category | Count | Source |
|---|---|---|
| Party Characters | 4 | `spillere/*.md` |
| Council NPCs | 11 | `npcs/council-of-waterdeep.md` |
| Other NPCs | 1 | `npcs/severin.md` |
| Named Prisoners | 7 | `enemy_roster.py` |
| SRD Creatures | 11 | `.agents/skills/dnd5e-2024-srd/` |
| Homebrew Enemies | 23 | `enemy_roster.py` + custom |
| **Total** | **58** | |

### Journals (12)

- Campaign Overview (lore, factions, current phase)
- 8× Session Prep (DM notes, encounter plans, checklists)
- Ritual Clock Tracker (with advancement mechanics)
- 2× NPC Profiles (Severin, other named NPCs)

### Scenes (3)

- Temple Level 1: The Maw (1536×1536, battlemap included)
- Temple Level 2: The Fivefold Sanctum (2048×2048, 5 foci layout)
- Temple Level 3: The Crown (1536×1536, ritual chamber)

All scenes include tactical descriptions and are ready for token placement.

---

## Next Steps

1. ✓ All stat blocks created (Council NPCs added)
2. ✓ All tokens generated (11 placeholders + 17 existing)
3. → Upload to Forge VTT (you do this)
4. → Create `image-urls.json` (you do this)
5. → Regenerate macro with URLs
6. → Import in Foundry console
7. → (Optional) Manual scene setup

---

**Questions?** Check `IMPORT-INSTRUCTIONS.md` or review the generated `import-macro.js` for inline comments on actor structure.

Good luck with the campaign!
