# Tyranny of Dragons – Foundry VTT Import (5 Steps)

## Quick Overview

Import **32 complete NPCs** into Foundry VTT using 5 simple console scripts. No Python tools, no asset managers, no manual editing. Just copy → paste → enter.

**All actors use Foundry's built-in dnd5e compendia** — no duplication, no custom items to manage.

---

## What Gets Imported (32 Total)

| Step | Category | Count | Content |
|---|---|---|---|
| 1 | Council Members | 11 | Dagult, Ulder, Remallia, Ontharr, Delaan, Sir Isteval, Taern, Melandrach, Brawnanvil, Crimson, Nyh |
| 2 | Creatures | 9 | Air Elemental, Fire Elemental, Stone Golem, Clay Golem, Iron Golem, Wight, Cult Fanatic, Cultist, Barbed Devil |
| 3 | Antagonists | 6 | Naergoth Bladelord, Severin, Rath Modar, Magus Thezzar, White Abishai, Black Abishai |
| 4 | Tiamat Heads | 5 | Black, Blue, Green, Red, White heads (Clock 4–7 progression) |
| 5 | Full Tiamat | 1 | Official Tiamat CR 30 (Clock 8 finale) |
| | **TOTAL** | **32** | **All 2024 D&D 5e rules-compliant** |

---

## How It Works

Each script (`STEP1.js` through `STEP5.js`) runs in your browser console and:

1. **Searches compendia first** – looks for spells, items, weapons in dnd5e official packs
2. **Creates actors** – full stat blocks (AC, HP, abilities, skills, saves)
3. **Adds features as items** – traits, actions, legendary actions, reactions as feat items
4. **Matches icons** – pulls icons from compendia, falls back to contextual defaults

No manual entry. No duplication. **100% automatic.**

---

## Setup (Takes 1 Minute)

1. **Open Foundry VTT** in your browser (forgevtt.com)
2. **Press F12** on your keyboard
3. **Click the "Console" tab** (top of Developer Tools)
4. **Keep this console open** while running all 5 steps

---

## Step 1: Import Council Members (11 NPCs)

1. Open `foundry-export/STEP1-import-council.js` in a text editor
2. **Select all** (Ctrl+A) and **copy** (Ctrl+C)
3. Click in the Foundry console input box
4. **Paste** (Ctrl+V) and **press Enter**
5. Wait for output: `✓ Imported: 11/11`

**Done!** 11 Council members now appear in your Actors folder.

---

## Step 2: Import Creatures (9 NPCs)

1. Open `foundry-export/STEP2-import-creatures.js` in a text editor
2. **Select all** and **copy**
3. Paste into Foundry console and **press Enter**
4. Wait for output: `✓ Imported: 9/9`

**Done!** Total: 11 + 9 = 20 actors

---

## Step 3: Create Antagonists (6 NPCs)

1. Open `foundry-export/STEP3-create-antagonists.js` in a text editor
2. **Select all** and **copy**
3. Paste into Foundry console and **press Enter**
4. Wait for output: `✓ ALL ANTAGONISTS CREATED`

**Done!** Total: 11 + 9 + 6 = 26 actors

---

## Step 4: Create Tiamat Heads (5 NPCs)

1. Open `foundry-export/STEP4-create-tiamat-heads.js` in a text editor
2. **Select all** and **copy**
3. Paste into Foundry console and **press Enter**
4. Wait for output: `✓ Tiamat Heads created`

**Done!** Total: 11 + 9 + 6 + 5 = 31 actors

These 5 heads are used during the ritual clock (Rounds 4–7). Each has partial manifestation traits and elemental-specific lair actions.

---

## Step 5: Create Full Tiamat (1 NPC)

1. Open `foundry-export/STEP5-create-tiamat-final.js` in a text editor
2. **Select all** and **copy**
3. Paste into Foundry console and **press Enter**
4. Wait for output: `✓ TIAMAT CREATED`

**Done!** Total: 11 + 9 + 6 + 5 + 1 = **32 COMPLETE NPCs**

This is the full CR 30 Tiamat that manifests at Clock 8 (final phase).

---

## Verification

After all 5 steps, check your **Actors folder**:

```
✓ 11 Council members
✓ 9 Creatures  
✓ 6 Antagonists
✓ 5 Tiamat Heads
✓ 1 Full Tiamat
= 32 Total
```

Open a few actors to spot-check:

- **Severin:** AC 16, HP 150, CHA 20, Draconic Majesty trait
- **Rath Modar:** CR 6, has Legendary Actions
- **Black Head:** AC 25, HP 195, Acid Breath
- **Tiamat:** AC 25, HP 615, 5 breath weapons, Regeneration 30

---

## Compendium-First Architecture

These scripts do **NOT** embed spells, items, or weapons. Instead, they:

1. **Search compendia first** for each spell/item
   - `dnd5e.actors24` (base NPCs)
   - `dnd5e.items` (equipment)
   - `dnd5e.spells24` or `dnd5e.spells` (spellcasting)
   - All other available packs
2. **Link to compendia** (no duplication)
3. **Fall back gracefully** if not found

This means:
- ✓ No outdated copies of spells
- ✓ No manual item management
- ✓ Your compendia stay current
- ✓ Smaller file sizes
- ✓ Icons automatically matched

---

## Icon Matching System

Each script automatically:

1. **Looks for icons in compendia** for spells, items, features
2. **Matches contextually:**
   - Breath weapons → elemental fire/acid/ice icons
   - Legendary traits → shield/crown icons
   - Spells → magic/arcane icons
   - Actions → attack/sword icons
3. **Falls back to defaults** if no match found

You can always manually update icons by right-clicking a feat item and selecting **Configure Icon**.

---

## Troubleshooting

### "Nothing happened after pasting"
- Make sure you're in the **Console tab** (not Elements, Sources, or Network)
- Try scrolling down in the console to see output
- Make sure Foundry is fully loaded

### "Error: Pack not found"
- Check Foundry Settings → System Settings
- Verify dnd5e system is **v5.3.3 or higher**
- Try reloading the world (F5) and re-running the step

### "Some actors are missing spells"
- The script automatically searches compendia
- If a spell isn't found, it logs a warning but continues
- You can manually add via Items tab → **Add from Compendium**

### "Icons look generic"
- Icons are pulled from compendia automatically
- Right-click feat items and **Configure Icon** to change them manually
- The contextual fallbacks should cover most cases

### "Need to re-run a step"
- No problem! Re-running a step will skip actors that already exist
- Check console for which actors were skipped

---

## After Import

Your actors are ready to use immediately:

- ✅ All stats are complete (AC, HP, proficiencies, skills, saves)
- ✅ Weapons and equipment linked from compendia
- ✅ Spells linked (automatically searched and added)
- ✅ Traits/actions/legendary actions included as feat items
- ✅ Icons matched from compendia

**No further setup needed.** Drop them into your encounters and play.

---

## File Locations

```
foundry-export/
  STEP1-import-council.js          ← 11 Council members
  STEP2-import-creatures.js        ← 9 Creatures
  STEP3-create-antagonists.js      ← 6 Antagonists
  STEP4-create-tiamat-heads.js     ← 5 Tiamat Heads
  STEP5-create-tiamat-final.js     ← 1 Full Tiamat
  RUN-THIS-ORDER.md                ← Detailed instructions (this document)
```

---

## Next Steps

1. ✅ Import all 5 steps (15 minutes)
2. ✅ Verify all 32 actors in Actors folder
3. ✅ Run your Temple of Tiamat encounters
4. 🎉 Play the campaign!

For detailed instructions with screenshots and common issues, see **RUN-THIS-ORDER.md**.

---

**Ready? Start with STEP 1 now!**
