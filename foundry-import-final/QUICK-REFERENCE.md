# Quick Reference Card

## Run These 9 Steps In Order

| Step | File | Creates | Count | Time |
|------|------|---------|-------|------|
| 1 | STEP1-import-council.js | Council members | 11 | 1 min |
| 2 | STEP2-import-creatures-FIXED.js | Combat creatures | 9 | 1 min |
| 3 | STEP3-create-antagonists.js | Boss antagonists | 6 | 1 min |
| 4 | STEP4-create-tiamat-heads.js | Tiamat heads | 5 | 1 min |
| 5 | STEP5-create-tiamat-final.js | Full Tiamat | 1 | 1 min |
| 6 | UPDATE-IMAGES.js | Assign portraits | 32 NPCs | 1 min |
| 7 | UPDATE-ALL-NPC-ICONS.js | Update icons | 32 NPCs | 2 min |
| 8 | CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js | Red Wizards + search | 9 wizards + search | 2 min |
| 9 | RITUAL-TRACKER-MACRO.js | Create macro | 1 macro | 1 min |

**Total Time:** 15-20 minutes  
**Total Actors:** 43+ complete antagonists

---

## Each Step

### STEP 1: Council Members
```
1. Open: STEP1-import-council.js
2. Copy all text
3. Foundry: F12 → Console tab
4. Paste → Enter
5. Result: 11 Council members in temple-of-tiamat folder
```

### STEP 2: Creatures
```
1. Open: STEP2-import-creatures-FIXED.js
2. Copy all text
3. Foundry: Paste in Console → Enter
4. Result: 9 creatures (Elemental, Golems, Wight, etc.)
```

### STEP 3: Antagonists
```
1. Open: STEP3-create-antagonists.js
2. Copy all text
3. Foundry: Paste in Console → Enter
4. Result: 6 boss-level antagonists (Naergoth, Thezzar, Abishai)
```

### STEP 4: Tiamat Heads
```
1. Open: STEP4-create-tiamat-heads.js
2. Copy all text
3. Foundry: Paste in Console → Enter
4. Result: 5 head manifestations (appear rounds 4-8)
```

### STEP 5: Full Tiamat
```
1. Open: STEP5-create-tiamat-final.js
2. Copy all text
3. Foundry: Paste in Console → Enter
4. Result: Complete Tiamat (CR30, HP615)
```

### STEP 6: Update Images
```
1. Open: UPDATE-IMAGES.js
2. Copy all text
3. Foundry: Paste in Console → Enter
4. Result: All 32+ NPCs have portraits and token images
```

### STEP 7: Update Icons
```
1. Open: UPDATE-ALL-NPC-ICONS.js
2. Copy all text
3. Foundry: Paste in Console → Enter
4. Result: All abilities have proper icons
```

### STEP 8: Red Wizards (Most Important)
```
1. Open: CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js
2. Copy all text
3. Foundry: Paste in Console → Enter
4. Watches: 
   • Searches for official Rath Modar (updates to 2024 if found)
   • Searches for official Severin (updates to 2024 if found)
   • Deletes 10 old Red Wizards
   • Creates 9 location-based Red Wizards with images
5. Result: Complete Red Wizard system (9 wizards + ritual masters)
```

### STEP 9: Ritual Clock Macro
```
1. Open: RITUAL-TRACKER-MACRO.js
2. Copy all text
3. Foundry: 
   • Left sidebar → Macros icon
   • Create Macro
   • Type: Script
   • Name: "Ritual Clock Tracker"
   • Paste code → Save
4. Result: Macro in hotbar for ritual automation
```

---

## What Each File Does

### STEP Files (STEP1-5)
- Search Foundry compendia for official content
- Create actors with full 2024 stats
- Add all spells, items, equipment from compendia
- Organize into temple-of-tiamat folder
- Error handling if packs unavailable (creates embedded data)

### UPDATE Files (6-7)
- Add character portraits (Forge asset URLs)
- Add token images
- Update ability/spell icons from Foundry library
- Safe to run multiple times

### CREATE-COMPLETE-TEMPLE-ANTAGONISTS (8)
- **Phase 1:** Search compendia for Rath Modar → update to 2024 rules if found
- **Phase 2:** Search compendia for Severin → update to 2024 rules if found
- **Phase 3:** Delete 10 old generic Red Wizards
- **Phase 4:** Find official 2024 Mage template
- **Phase 5:** Create 9 new location-based Red Wizards with images

### RITUAL-TRACKER-MACRO (9)
- Tracks ritual progression round by round
- Auto-spawns Tiamat heads when ritual advances
- Posts chat notifications
- Interactive buttons: Advance / Hold / Reset

---

## 2024 D&D 5e Rules

All actors follow 2024 rules:

**Spell DC Formula:**
```
Spell DC = 8 + Ability Modifier + Proficiency Bonus
```

**Proficiency Bonus by CR:**
```
CR 0-4:   +2
CR 5-8:   +3
CR 9-12:  +4
CR 13-16: +5
CR 17-20: +6
```

**No 2014 Terminology:**
- ✓ NO "ki points" (now Focus Points in 2024)
- ✓ NO "true strike" (now action cantrip)
- ✓ NO "silvery barbs" (not in 2024 SRD)
- ✓ All spellcasting uses 2024 mechanics

---

## Red Wizards: 9 Location-Based

**Grounded (Chapels) - 4:**
1. Magus Azuri (Blue Chapel - entrance) ← Image 1
2. Magus Alabaster (White Chapel) ← Image 2
3. Magus Verdian (Green Chapel) ← Image 4
4. Magus Obsidian (Black Chapel - exit) ← Image 1

**Flying (Spires) - 5:**
1. Magus Cerulean (Blue Spire) ← Image 3
2. Magus Platinum (White Spire) ← Image 2
3. Magus Viridian (Green Spire) ← Image 3
4. Magus Obsidian II (Black Spire) ← Image 4
5. Magus Vermillion (Red Spire) ← Image 5

**Plus:**
- Rath Modar (Red Chapel) - searched from compendia
- Severin (Sanctuary) - searched from compendia

---

## Expected Output Per Step

### STEP 1
```
✓ Imported: 11/11 Council Members
  Dagult Neverember ✓
  Ulder Ravengard ✓
  ...
```

### STEP 2
```
✓ Imported: 9/9 Creatures
  Air Elemental ✓
  Fire Elemental ✓
  ...
```

### STEP 3
```
⚔️  Creating antagonists...
   ✓ Naergoth Bladelord created
   ✓ Severin created
   ✓ Rath Modar created
   ...
```

### STEP 4
```
🐉 Creating Tiamat head manifestations...
   ✓ White Dragon Head created
   ✓ Black Dragon Head created
   ...
```

### STEP 5
```
👑 Creating Tiamat (full manifestation)...
   ✓ Tiamat created (CR 30, AC 25, HP 615)
   ✓ Portrait: [Forge asset URL]
   ✓ Token: [Forge asset URL]
```

### STEP 6
```
🖼️  Updating NPC images...
   ✓ Updated: Dagult Neverember portrait + token
   ✓ Updated: Ulder Ravengard portrait + token
   ...
   ✓ All 32+ NPCs have portraits and tokens
```

### STEP 7
```
🎨 Updating all NPC ability icons...
   ✓ Naergoth Bladelord: Updated 8 abilities
   ✓ Severin: Updated 12 abilities
   ...
   ✓ All actors have proper ability icons
```

### STEP 8
```
🔴 COMPLETE TEMPLE ANTAGONIST CREATION SYSTEM

PHASE 1: Searching for official Rath Modar...
  ✓ Found Rath Modar [packId]
  ✓ Applied 3 2024 rule updates

PHASE 2: Searching for official Severin...
  ✓ Found Severin [packId]
  ✓ Applied 4 2024 rule updates

PHASE 3: Deleting old generic Red Wizards...
  ✓ Deleted: 10 old Red Wizards

PHASE 4: Searching for official 2024 Mage...
  ✓ Found official 2024 Mage

PHASE 5: Creating 9 location-based Red Wizards...
  ✓ Magus Azuri (Blue Chapel)
  ✓ Magus Alabaster (White Chapel)
  ...
  ✓ Magus Vermillion (Red Spire)

✅ COMPLETE! Successfully created 9 location-based Red Wizards!
```

### STEP 9
```
Create new macro in Foundry (see README for instructions)
✓ Macro named "Ritual Clock Tracker"
✓ Can drag to hotbar
✓ Ready for session use
```

---

## Final Check

```
Open Foundry Actors → temple-of-tiamat folder

You should see:
✓ 11 Council members (Dagult, Ulder, Remallia, etc.)
✓ 9 Creatures (Elementals, Golems, Wight, etc.)
✓ 6 Antagonists (Naergoth, Thezzar, Abishai)
✓ 5 Tiamat Heads (White, Black, Green, Blue, Red)
✓ 1 Full Tiamat (CR 30)
✓ 2 Ritual Masters (Rath Modar, Severin - from compendium search)
✓ 9 Red Wizards (Azuri, Alabaster, Verdian, Obsidian, Cerulean, Platinum, Viridian, Obsidian II, Vermillion)

Total: 43+ actors with full artwork, icons, and 2024 rules
```

---

**You're ready to run the Temple of Tiamat finale!** 🐉
