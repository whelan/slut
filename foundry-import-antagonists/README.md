# Foundry VTT: Temple of Tiamat Antagonist Setup

**Complete antagonist system for the 10-round ritual finale.** Two simple scripts set up all 11 NPCs with correct 2024 D&D 5e stats.

---

## 🎯 What These Scripts Do

### CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js (MAIN)

Creates all 11 antagonists in one go:

1. **Searches compendia** for official Rath Modar & Severin → updates to 2024 rules
2. **Auto-cleans** old NPCs (safe to re-run)
3. **Creates 9 location-based Red Wizards:**
   - 4 grounded (Azuri, Alabaster, Verdian, Obsidian)
   - 5 flying (Cerulean, Platinum, Viridian, Obsidian II, Vermillion)
4. **Applies** epic portraits, 2024 stats, location-specific traits

### UPDATE-RATH-MODAR.js (OPTIONAL)

Re-updates Rath Modar with full 2024 compliance (HP, AC, ability scores, spell DC). Use if you want to be absolutely certain Rath Modar has the correct stats.

### UPDATE-TIAMAT-HEADS-FROM-COMPENDIA.js (OPTIONAL)

Searches ALL Foundry compendia for official chromatic dragon creatures and updates the five Tiamat head actors with compendium data. Does NOT delete the heads—only adds/updates them with official abilities, traits, and mechanics.

**What it does:**
- Searches for Adult White/Black/Green/Blue/Red Dragons in all packs
- Updates existing head actors with compendium stat blocks
- Preserves existing head actor names and custom fields
- Copies items (spells, abilities, traits) from official dragons
- Keeps heads in place (no deletion)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Run the Main Script

1. **Open Foundry** at forgevtt.com
2. **Press F12** → **Console** tab
3. **Open file:** `CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js`
4. **Copy** entire content
5. **Paste** in console
6. **Press Enter**
7. **Watch** console for `✅ ALL ANTAGONISTS CREATED` message

### Step 2 (Optional): Update Rath Modar

If you want extra 2024 compliance verification:

1. **Open file:** `UPDATE-RATH-MODAR.js`
2. **Copy** and paste into console (same as above)
3. **Press Enter**
4. **Verify** console shows Rath Modar stats (HP 130, AC 16, DC 17)

### Step 3 (Optional): Update Tiamat Heads from Compendia

To populate the five Tiamat head creatures with official compendium data:

1. **Open file:** `UPDATE-TIAMAT-HEADS-FROM-COMPENDIA.js`
2. **Copy** and paste into console (same as above)
3. **Press Enter**
4. **Watch** console for search results—it will find Adult White/Black/Green/Blue/Red Dragons and update each head
5. **Verify** each head now has abilities, traits, and stat blocks from official sources

---

## 📊 Expected Output

You'll see in console:

```
🔴 COMPLETE TEMPLE ANTAGONIST CREATION SYSTEM
= (70 characters) =

PHASE 1: Searching for official Rath Modar...
  ✓ Found official Rath Modar (CR 9)
  ✓ Applied 2024 statblock (HP 130, AC 16)
  ✓ Portrait: Rath-modar.PNG

PHASE 2: Searching for official Severin...
  ✓ Found official Severin (CR 9)
  ✓ Applied 2024 statblock (HP 230)
  ✓ Portrait: severin-masked-token.png

PHASE 3: Cleaning old NPCs...
  ✓ Deleted old duplicates

PHASE 4-5: Creating 9 location-based Red Wizards...
  ✓ Magus Azuri (Blue Chapel)
  ✓ Magus Alabaster (White Chapel)
  ✓ Magus Verdian (Green Chapel)
  ✓ Magus Obsidian (Black Chapel)
  ✓ Magus Cerulean (Blue Spire - flying)
  ✓ Magus Platinum (White Spire - flying)
  ✓ Magus Viridian (Green Spire - flying)
  ✓ Magus Obsidian II (Black Spire - flying)
  ✓ Magus Vermillion (Red Spire - flying)

✅ ALL ANTAGONISTS CREATED AND READY
```

---

## 📋 What You Get (11 Antagonists)

### Ritual Masters (2)

| NPC | CR | HP | AC | Role |
|---|---|---|---|---|
| **Rath Modar** | 9 | 130 | 16 | Ritual coordinator, Red Chapel (Area 6) |
| **Severin** | 9 | 230 | 15 | Final boss, Sanctuary (Area 13) |

**2024 Stats:**
- Rath Modar: Spell Save DC 17, INT 20
- Severin: Legendary Resistance (3), Legendary Actions (3/round)

### Red Wizards (9) - Location-Based

**Grounded Chapel Wizards (4):**
1. **Magus Azuri** (Blue Chapel - Area 1) - Entrance guardian, first threat
2. **Magus Alabaster** (White Chapel - Area 3) - Cold anchor
3. **Magus Verdian** (Green Chapel - Area 4) - Poison anchor  
4. **Magus Obsidian** (Black Chapel - Area 5) - Exit guardian

**Flying Spire Wizards (5):**
5. **Magus Cerulean** (Blue Spire - 40 ft high) - Lightning support
6. **Magus Platinum** (White Spire - 40 ft high) - Ice support
7. **Magus Viridian** (Green Spire - 40 ft high) - Poison support
8. **Magus Obsidian II** (Black Spire - 40 ft high) - Acid support
9. **Magus Vermillion** (Red Spire - 40 ft high) - Fire support (heaviest hitter)

**Each Red Wizard has:**
- ✓ CR 4 (mid-tier wizard)
- ✓ AC 15 (Mage Armor + DEX 14)
- ✓ Full 2024 spell list (Firebolt, Fireball, Cone of Cold, etc.)
- ✓ 2 location-specific traits (mechanics tied to ritual role)
- ✓ Epic character portrait
- ✓ Token image
- ✓ Biography (explains their ritual function)
- ✓ 2024 D&D 5e compliant stats

---

## ✨ Key Features

### ✅ Automatic Compendium Search
- Searches ALL Foundry packs for official Rath Modar
- Searches ALL Foundry packs for official Severin  
- Auto-updates to 2024 rules if found
- No manual setup needed

### ✅ 2024 D&D 5e Compliance
- Spell Save DC: 8 + ability mod + proficiency
- Proficiency bonuses correct by CR
- All ability scores and modifiers correct
- Accurate saving throw bonuses
- No 2014 terminology

### ✅ Safe & Idempotent
- Auto-deletes old NPCs before creating new ones
- Safe to run multiple times (no duplicates)
- Exact-name matching prevents accidental deletions
- Cleanup runs FIRST before any creation

### ✅ Location-Based Design
- Each wizard tied to specific ritual location
- Traits explain their mechanical role in the ritual
- 4 grounded (chapel-based) vs 5 flying (aerial)
- Different tactical challenges for each group

---

## 📝 Optional: UPDATE-RATH-MODAR.js

**What it does:** Re-updates Rath Modar with guaranteed 2024 compliance.

**When to use:**
- After running CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js
- If you want extra verification that Rath Modar has correct stats
- Can be run multiple times (idempotent)

**Stats it applies:**
- HP: 130 (17d8 + 54)
- AC: 16
- CR: 9, Proficiency: +4
- Spell Save DC: 17 (8 + INT 20 + prof 4 + 5... wait, that's 8+5=13, INT mod is +5, so 8+5+5=18? Let me recalculate: INT 20 = +5 mod, proficiency +4, so DC should be 8+5+4=17. Yes.)
- Abilities: STR 9, DEX 14, CON 16, INT 20, WIS 13, CHA 14
- Proficient saves: CON, INT, WIS

---

## 🎮 Using These NPCs: The 10-Round Ritual

See **`session-prep/10-ROUND-RITUAL-BREAKDOWN.md`** for the complete tactical sequence showing how these NPCs act each round.

### Quick Reference:

**Rounds 1–3 (Disruption Window):**
- Party enters from Blue Chapel (Area 1)
- **Magus Azuri** engages immediately with Fireball
- Ritual can be disrupted if Azuri is killed
- Flying wizards don't engage until party reaches main cathedral

**Rounds 4–8 (Tiamat Manifestation):**
- Tiamat's heads emerge one per round (white→black→green→blue→red)
- **Rath Modar** and **Severin** shift to combat
- All 5 flying wizards rain spells from above
- Ritual clock advances toward completion

**Rounds 9–10 (Final Combat):**
- Tiamat fully manifested and acting
- All 11 antagonists engaged in full combat
- Party fights for survival or tries to kill Severin
- Victory conditions: Kill Severin, destroy masks, or hold until reinforcements

### Encounter Balance (Level 15 party, 4 PCs):
- CR 9 bosses + 9 CR 4 wizards = Hard encounter
- Flying wizards provide aerial cover and spell support
- Ritual clock creates time pressure
- Multiple objectives beyond "kill all"

---

## ✅ Post-Script Verification

After running `CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js`:

**In Foundry Actors sidebar:**
- [ ] `temple-of-tiamat` folder exists
- [ ] Contains 11 NPCs total:
  - [ ] Rath Modar (CR 9, HP 130)
  - [ ] Severin (CR 9, HP 230)
  - [ ] 9 Red Wizards (all CR 4):
    - [ ] Magus Azuri (Blue Chapel)
    - [ ] Magus Alabaster (White Chapel)
    - [ ] Magus Verdian (Green Chapel)
    - [ ] Magus Obsidian (Black Chapel)
    - [ ] Magus Cerulean (Blue Spire)
    - [ ] Magus Platinum (White Spire)
    - [ ] Magus Viridian (Green Spire)
    - [ ] Magus Obsidian II (Black Spire)
    - [ ] Magus Vermillion (Red Spire)

**Click on any Red Wizard to verify:**
- [ ] Has epic character portrait
- [ ] Has token image
- [ ] Shows 2 location-specific traits in description
- [ ] CR 4, AC 15, HP ~25

**Click on Rath Modar:**
- [ ] CR 9, AC 16, HP 130
- [ ] Portrait: Rath-modar.PNG
- [ ] Spell Save DC 17

**Click on Severin:**
- [ ] CR 9, AC 15, HP 230
- [ ] Has Legendary Resistance and Legendary Actions
- [ ] Portrait: severin-masked-token.png

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Console shows nothing** | Make sure F12 opened the **Console** tab (not Elements/Sources). Script may be running silently. |
| **"ReferenceError: game is not defined"** | You're in the browser console, not Foundry's. Close (Esc), open Foundry window, press F12 again, go to Console tab. |
| **Rath Modar/Severin not found** | Normal! Script searches compendia and creates from official base if found. If not found in your compendia, script still creates 9 Red Wizards successfully. |
| **Images show as broken (404)** | Forge asset URLs may need updating. Actors still work - you can manually add images from your Forge library later. |
| **Only some wizards created** | Check console for error messages. Try running the script again (idempotent, so safe to re-run). |
| **Duplicates created** | Shouldn't happen (script deletes old ones first), but if it does, manually delete duplicates from `temple-of-tiamat` folder and re-run script. |

---

## 📝 DM Preparation Checklist

Before running the ritual session:

- [ ] Run `CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js`
- [ ] Verify all 11 antagonists created (see verification section above)
- [ ] (Optional) Run `UPDATE-RATH-MODAR.js` for extra 2024 compliance check
- [ ] Open `session-prep/10-ROUND-RITUAL-BREAKDOWN.md` and read through the 10 rounds
- [ ] Prepare token placements for Area 1 (Blue Chapel entrance)
- [ ] Print or bookmark `session-prep/checkliste.md` (pre-session checklist)
- [ ] Have ritual clock tracker ready (see checklist for format)
- [ ] Read through Rounds 1–3 carefully (party enters here)

---

## 📚 Related Documents

- **`session-prep/10-ROUND-RITUAL-BREAKDOWN.md`** – Tactical sequence for all 10 rounds with explicit NPC actions
- **`session-prep/TACTICAL-REVIEW-BLUE-CHAPEL-ENTRY.md`** – Analysis of Rounds 1–3 when party enters from Blue Chapel
- **`session-prep/checkliste.md`** – Pre-session DM checklist (ritual clock, foci status, NPC prep)
- **`tyranny-of-dragons-kampagne.md`** – Full campaign context and mechanics

---

## 🚀 You're Ready!

Two simple scripts. 5 minutes of setup. All 11 antagonists ready to go.

Just copy the scripts and paste into Foundry console. The rest is table time. 🐉
