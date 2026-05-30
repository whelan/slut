# Foundry VTT - Red Wizards & Ritual Masters

**Complete antagonist system for Temple of Tiamat finale**

---

## 🎯 What This Does

Single unified script that automatically:

1. **Searches all compendia** for official **Rath Modar** → updates to 2024 rules if found
2. **Searches all compendia** for official **Severin** → updates to 2024 rules if found
3. **Deletes** 10 old generic Red Wizards (if they exist)
4. **Creates 9 location-based Red Wizards** with character portraits:
   - 4 grounded chapel wizards
   - 5 flying spire wizards
   - Each with location-specific traits
   - All with images and 2024 stats

---

## 🚀 How to Use

1. **Open Foundry** at forgevtt.com
2. **Press F12** → Console tab
3. **Open:** `CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js`
4. **Copy** entire script
5. **Paste** in Foundry console
6. **Press Enter**
7. **Wait** for completion (2-3 minutes)

---

## 📊 Expected Output

```
🔴 COMPLETE TEMPLE ANTAGONIST CREATION SYSTEM

PHASE 1: Searching for official Rath Modar...
  ✓ Found Rath Modar [compendium name]
  ✓ Applied 3 2024 rule updates
  ✓ Created: Rath Modar (Red Chapel Master)

PHASE 2: Searching for official Severin...
  ✓ Found Severin [compendium name]
  ✓ Applied 4 2024 rule updates
  ✓ Created: Severin (Sanctuary Master)

PHASE 3: Deleting old generic Red Wizards...
  ✓ Deleted: 10 old Red Wizards

PHASE 4: Searching for official 2024 Mage...
  ✓ Found official 2024 Mage

PHASE 5: Creating 9 location-based Red Wizards...
  ✓ Magus Azuri (Blue Chapel)
  ✓ Magus Alabaster (White Chapel)
  ✓ Magus Verdian (Green Chapel)
  ✓ Magus Obsidian (Black Chapel)
  ✓ Magus Cerulean (Blue Spire)
  ✓ Magus Platinum (White Spire)
  ✓ Magus Viridian (Green Spire)
  ✓ Magus Obsidian II (Black Spire)
  ✓ Magus Vermillion (Red Spire)

✅ COMPLETE! Successfully created 9 location-based Red Wizards!
```

---

## 📋 What You Get

### Ritual Masters (2)
- **Rath Modar** (Red Chapel Master)
  - CR 6 or from compendium
  - 2024 rules compliant
  - Master of the ritual

- **Severin** (Sanctuary Master)
  - CR 11 or from compendium
  - 2024 rules compliant
  - Final boss wearing Mask of the Dragon Queen

### Red Wizards (9) - Location-Based

**Grounded (4):**
1. Magus Azuri (Blue Chapel - entrance guardian)
2. Magus Alabaster (White Chapel - cold anchor)
3. Magus Verdian (Green Chapel - poison anchor)
4. Magus Obsidian (Black Chapel - exit guardian)

**Flying (5):**
1. Magus Cerulean (Blue Spire - lightning support)
2. Magus Platinum (White Spire - ice support)
3. Magus Viridian (Green Spire - poison support)
4. Magus Obsidian II (Black Spire - acid support)
5. Magus Vermillion (Red Spire - fire support)

**Each wizard has:**
- ✓ CR 4-5 (appropriately scaled)
- ✓ AC 14-15
- ✓ Full spell list from 2024 Mage
- ✓ 2 location-specific traits
- ✓ Character portrait (Forge asset)
- ✓ Token image
- ✓ Biography explaining ritual role
- ✓ 2024 D&D 5e stats

---

## ✨ Features

### Automatic Compendium Search
- Searches ALL Foundry packs for official Rath Modar
- Searches ALL Foundry packs for official Severin
- Updates to 2024 rules if found
- Falls back to STEP3 manual creation if not found

### 2024 D&D 5e Compliance
- Spell DC: 8 + ability mod + proficiency
- Proficiency bonuses correct by CR
- All ability modifiers recalculated
- No 2014 terminology

### Clean Deletion
- Removes 10 old generic Red Wizards (if they exist)
- Safe - only deletes by name matching
- Can run multiple times without duplication

### Location-Based Design
- Each wizard tied to specific ritual location
- Traits explain their ritual function
- Strategic depth for encounters
- Different tactical challenges (grounded vs flying)

---

## 🎮 Using in Your Campaign

**Encounter Design:**
- Place 4 grounded wizards at chapel locations
- Place 5 flying wizards at spire positions
- Rath Modar at Red Chapel (command center)
- Severin at Sanctuary (final boss)

**Ritual Mechanics:**
- Each wizard death increases ritual DC +1
- Flying formation disruption affects aerial ritual
- Ground wizard removal opens escape routes
- Total 9 disruption points = 9 tactical choices

**Combat:**
- Grounded wizards use chapel terrain
- Flying wizards rain spells from above
- Rath Modar coordinates overall ritual
- Severin emerges when ritual completes or party forces his hand

---

## 📁 Files

```
foundry-import-antagonists/
├── README.md (this file)
└── CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js
```

---

## ✅ Verification

After running the script:

1. Open Foundry Actors folder
2. Look for `temple-of-tiamat` folder
3. Should contain:
   - [ ] Rath Modar
   - [ ] Severin
   - [ ] 9 Red Wizards (Azuri, Alabaster, Verdian, Obsidian, Cerulean, Platinum, Viridian, Obsidian II, Vermillion)

4. Click any Red Wizard:
   - [ ] Has character portrait
   - [ ] Has token image
   - [ ] Has 2 location-specific traits
   - [ ] Shows CR 4-5
   - [ ] Shows AC 14-15

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Nothing happened" | Make sure Console tab is active (F12), code pasted completely, scroll down in console |
| "Rath Modar not found" | Normal! Script will show "Missing (use STEP3)" if not in your compendia. Still creates other wizards. |
| "Severin not found" | Normal! Script will show "Missing (use STEP3)" if not in your compendia. Still creates other wizards. |
| "Images not loading (404)" | Forge asset URLs may not match your world ID. Actors still work - add images manually later. |
| "Only partial wizards created" | Check console for error messages. Retry script. |

---

## 📝 Notes

- Script is safe to run multiple times (won't create duplicates if run again)
- All 9 Red Wizards use official 2024 Mage as base template
- Rath Modar & Severin use compendium versions with 2024 updates
- Location-based system tied to temple ritual structure
- All traits explain their mechanical & narrative function

---

## 🎯 Ready to Deploy

Just one script. Copy → Paste → Done.

Takes 2-3 minutes. Creates 11 complete antagonists with full stats and 2024 rules compliance.

---

**Ready?** Copy the entire script and paste into Foundry console! 🐉
