# Foundry VTT Import Checklist

## Pre-Import Setup
- [ ] Foundry opened at forgevtt.com
- [ ] F12 → Console tab ready
- [ ] `foundry-import-final` folder open with scripts

---

## Import Execution

### STEP 1: Council Members
- [ ] Open `STEP1-import-council.js`
- [ ] Copy entire script
- [ ] Paste in Foundry console
- [ ] Press Enter
- [ ] Wait for: "✓ Imported: 11/11 Council Members"
- [ ] Verify: 11 actors in `temple-of-tiamat` folder

**Expected Actors:**
Dagult Neverember, Ulder Ravengard, Remallia Haventree, Ontharr Frume, 
Delaan Winterhound, Sir Isteval, Taern Hornblade, King Melandrach, 
Ambassador Brawnanvil, Crimson Maccath, Nyh Ilmichh

---

### STEP 2: Creatures
- [ ] Open `STEP2-import-creatures-FIXED.js`
- [ ] Copy entire script
- [ ] Paste in Foundry console
- [ ] Press Enter
- [ ] Wait for: "✓ Imported: 9/9 Creatures"
- [ ] Verify: 20 total actors (11 + 9)

**Expected Creatures:**
Air Elemental, Fire Elemental, Stone Golem, Clay Golem, Iron Golem, 
Wight, Cult Fanatic, Cultist, Barbed Devil

---

### STEP 3: Antagonists
- [ ] Open `STEP3-create-antagonists.js`
- [ ] Copy entire script
- [ ] Paste in Foundry console
- [ ] Press Enter
- [ ] Wait for: "✓ Created: 6/6 antagonists"
- [ ] Verify: 26 total actors (20 + 6)

**Expected Antagonists:**
Naergoth Bladelord (CR11), Severin (CR11), Rath Modar (CR6), 
Magus Thezzar (CR5), White Abishai (CR5), Black Abishai (CR7)

---

### STEP 4: Tiamat Heads
- [ ] Open `STEP4-create-tiamat-heads.js`
- [ ] Copy entire script
- [ ] Paste in Foundry console
- [ ] Press Enter
- [ ] Wait for: "✓ All 5 heads created"
- [ ] Verify: 31 total actors (26 + 5)

**Expected Heads:**
White Head (CR20), Black Head (CR20), Green Head (CR21), 
Blue Head (CR20), Red Head (CR21)

---

### STEP 5: Full Tiamat
- [ ] Open `STEP5-create-tiamat-final.js`
- [ ] Copy entire script
- [ ] Paste in Foundry console
- [ ] Press Enter
- [ ] Wait for: "✓ Final boss ready!"
- [ ] Verify: 32 total actors (31 + 1)

**Expected:**
Tiamat (CR30, AC25, HP615)

---

### STEP 6: Update Images
- [ ] Open `UPDATE-IMAGES.js`
- [ ] Copy entire script
- [ ] Paste in Foundry console
- [ ] Press Enter
- [ ] Wait for: "✓ All 32 NPCs have portraits"
- [ ] Verify: Click any NPC → character portrait visible

---

### STEP 7: Update Icons
- [ ] Open `UPDATE-ALL-NPC-ICONS.js`
- [ ] Copy entire script
- [ ] Paste in Foundry console
- [ ] Press Enter
- [ ] Wait for: "✓ All actors have proper ability icons"
- [ ] Verify: Open Naergoth → Abilities tab → icons visible (not white circles)

---

### STEP 8: Create Red Wizards (Most Important!)
- [ ] Open `CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js`
- [ ] Copy entire script
- [ ] Paste in Foundry console
- [ ] Press Enter
- [ ] Wait for all 5 phases:
  - [ ] Phase 1: Search for Rath Modar (✓ Found & Updated or ℹ Not found)
  - [ ] Phase 2: Search for Severin (✓ Found & Updated or ℹ Not found)
  - [ ] Phase 3: Delete old wizards (✓ Deleted X old Red Wizards)
  - [ ] Phase 4: Find official Mage (✓ Found official 2024 Mage)
  - [ ] Phase 5: Create 9 location-based wizards (✓ All 9 created)
- [ ] Verify: 9 new Red Wizards in folder
  - [ ] Magus Azuri (Blue Chapel)
  - [ ] Magus Alabaster (White Chapel)
  - [ ] Magus Verdian (Green Chapel)
  - [ ] Magus Obsidian (Black Chapel)
  - [ ] Magus Cerulean (Blue Spire)
  - [ ] Magus Platinum (White Spire)
  - [ ] Magus Viridian (Green Spire)
  - [ ] Magus Obsidian II (Black Spire)
  - [ ] Magus Vermillion (Red Spire)

**Total should now be:** 43+ actors

---

### STEP 9: Create Ritual Clock Macro
- [ ] Open `RITUAL-TRACKER-MACRO.js`
- [ ] Copy entire script
- [ ] In Foundry:
  - [ ] Left sidebar → Macros icon
  - [ ] Click "Create Macro"
  - [ ] Set Type: "Script"
  - [ ] Set Name: "Ritual Clock Tracker"
  - [ ] Paste code into text area
  - [ ] Click "Save"
- [ ] Verify: Macro appears in Macros list
- [ ] Drag macro to hotbar for easy access during combat

---

## Post-Import Verification

### Actor Count
- [ ] Open Actors folder → `temple-of-tiamat`
- [ ] Count total actors
- [ ] Should show: **43+ total**
  - [ ] 11 Council members
  - [ ] 9 Creatures
  - [ ] 6 Antagonists
  - [ ] 5 Tiamat Heads
  - [ ] 1 Full Tiamat
  - [ ] 9 Red Wizards
  - [ ] +2 Ritual Masters (Rath Modar, Severin - if from compendium search)

### Character Portraits
- [ ] Click any actor → portrait visible in character sheet
- [ ] Token image shows in "Prototype Token" section
- [ ] Images from Forge asset URLs (https://assets.forge-vtt.com/...)

### Ability Icons
- [ ] Open Naergoth Bladelord
- [ ] Click "Abilities" tab
- [ ] Verify icons visible (not white circles)
- [ ] Examples: Legendary Resistance, Spellcasting, etc.

### Red Wizard Check
- [ ] Open Magus Azuri
- [ ] Verify:
  - [ ] Has 2 traits ("Blue Chapel Guardian", "Counterspell Mastery")
  - [ ] Has portrait image
  - [ ] Has biography
  - [ ] CR shows as 4
  - [ ] AC shows as 14-15
- [ ] Repeat for any other Red Wizard

### Macro Check
- [ ] Macros list contains "Ritual Clock Tracker"
- [ ] Can drag macro to hotbar
- [ ] Macro shows on hotbar

### Spell/Item Linking
- [ ] Open any actor with spells
- [ ] Click a spell name (should link to compendium)
- [ ] Verify spell details show correctly

---

## Issues & Resolution

| Issue | Solution |
|-------|----------|
| "Nothing happened" | Make sure Console tab is active (F12), code pasted completely, scroll down in console |
| "Pack not found" | Normal! Script uses embedded fallback data. Check console for which creatures were created. |
| "Missing images (404)" | Forge asset URLs may not match your world ID. Actors still work - add images manually later. |
| "Spells didn't add" | May be named differently in your pack. Add manually via Items > Add from Compendium. |
| "Macro won't save" | Check that Type is "Script" (not "Chat Command" or other type). |
| "Only partial actors created" | Check console for error messages. Some might have failed mid-process. |

---

## Ready to Use?

Once all checkboxes are complete:

✅ **You have:**
- 43+ complete actors
- Full 2024 D&D 5e stats
- Character portraits and tokens
- Proper ability icons
- Location-based Red Wizard system
- Automated ritual tracking
- All compendia links working

✅ **You can now:**
- Load Temple of Tiamat scenes
- Place actors on battlemap
- Run encounters with full automation
- Track ritual progression with macro
- Use Red Wizards in location-specific encounters

---

## Session Prep

Before running the finale:

1. **Load a Temple scene** (if available)
2. **Place Red Wizards** at their ritual locations (9 positions)
3. **Place Rath Modar** at Red Chapel
4. **Place Severin** at Sanctuary
5. **Add Tiamat Heads** to initiative when ritual reaches round 4+
6. **Click Ritual Clock Tracker macro** each round to auto-advance ritual

---

**You're ready!** 🐉

Start with STEP 1 and work through all 9 steps in order.

Total time: 15-20 minutes

---

**Completion Date:** ________________  
**Foundry Ready:** YES ☐  NO ☐
