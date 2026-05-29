# 🚀 COMPLETE FOUNDRY IMPORT WORKFLOW

**GOAL:** Import 32+ complete NPCs + Tiamat heads + full Tiamat + Red Wizards + ritual mechanics with FULL 2024 rules stats.

**Total NPCs created:** 11 Council + 9 Creatures + 6 Antagonists + 5 Tiamat Heads + 1 Full Tiamat + 6 Red Wizards = **38 total actors**

**Time:** ~15-20 minutes total

---

## ⚙️ SETUP

1. **Open Foundry** at forgevtt.com
2. **Press F12** → **Console tab**
3. **Keep console open** for all steps

---

## 📋 STEP 1: Import Council Members (11 NPCs)

**What gets imported:**
- Dagult Neverember, Ulder Ravengard, Remallia Haventree
- Ontharr Frume, Delaan Winterhound, Sir Isteval
- Taern Hornblade, King Melandrach, Ambassador Brawnanvil
- Crimson Maccath, Nyh Ilmichh

**ALL with:** AC, HP, abilities, skills, saves, weapons, spells (2024 compliant)

### DO THIS:

1. **Find file:** `foundry-export/STEP1-import-council.js`
2. **Open in text editor** and **copy entire content**
3. **In Foundry console:** Paste the code
4. **Press Enter** and wait for completion

**Expected output:**
```
✓ Imported: 11/11 Council Members
   Dagult Neverember ✓
   Ulder Ravengard ✓
   ...
📋 NEXT STEP: Run STEP2-import-creatures.js
```

✅ **WHEN DONE:** Check Foundry Actors → `temple-of-tiamat` folder should have 11 Council members

---

## 📋 STEP 2: Import Creatures (9 creatures)

**What gets imported:**
- Air Elemental (CR 5), Fire Elemental (CR 5)
- Stone Golem (CR 10), Clay Golem (CR 9), Iron Golem (CR 16)
- Wight (CR 3), Cult Fanatic (CR 2), Cultist (CR 1/8), Barbed Devil (CR 5)

**ALL with:** Full 2024 stats, AC, HP, abilities, equipment, special traits

### DO THIS:

1. **Find file:** `foundry-export/STEP2-import-creatures-FIXED.js`
2. **Open in text editor** and **copy entire content**
3. **In Foundry console:** Paste the code
4. **Press Enter**

**Expected output:**
```
✓ Imported: 9/9 Creatures
   Air Elemental ✓
   Fire Elemental ✓
   ...
📋 NEXT STEP: Run STEP3-create-antagonists.js
```

✅ **WHEN DONE:** `temple-of-tiamat` folder should have 11 + 9 = 20 actors

---

## 📋 STEP 3: Create Antagonists (6 NPCs)

**What gets created:**
- **Naergoth Bladelord** - CR 11, AC 18, HP 170
- **Severin** - CR 11, AC 15, HP 230 (two-phase boss)
- **Rath Modar** - CR 6, AC 15, HP 71
- **Magus Thezzar** - CR 5, AC 14, HP 77
- **White Abishai** - CR 5, AC 15, HP 110
- **Black Abishai (Rezmir)** - CR 7, AC 16, HP 127

**ALL with:** Complete 2024 stats, spells, legendary actions, proficiencies

### DO THIS:

1. **Find file:** `foundry-export/STEP3-create-antagonists.js`
2. **Copy entire content**
3. **In Foundry console:** Paste and press Enter

**Expected output:**
```
⚔️  Creating antagonists...
   ✓ Naergoth Bladelord created
   ✓ Severin created with spells
   ✓ Rath Modar created
   ...
✓ Created: 6/6 antagonists
```

✅ **WHEN DONE:** `temple-of-tiamat` folder should have 11 + 9 + 6 = 26 actors

---

## 📋 STEP 4: Create Tiamat Head Manifestations (5 heads)

**What gets created:**
- **White Head** - CR 20, AC 22, HP 210 (appears Round 4)
- **Black Head** - CR 20, AC 21, HP 195 (appears Round 5)
- **Green Head** - CR 21, AC 22, HP 210 (appears Round 6)
- **Blue Head** - CR 20, AC 21, HP 195 (appears Round 7)
- **Red Head** - CR 21, AC 23, HP 210 (appears Round 8)

**ALL with:** Independent attacks, elemental auras, breath weapons, Legendary Resistance 3/day

### DO THIS:

1. **Find file:** `foundry-export/STEP4-create-tiamat-heads.js`
2. **Copy entire content**
3. **In Foundry console:** Paste and press Enter

**Expected output:**
```
🐉 Creating Tiamat head manifestations...
   ✓ White Dragon Head created (CR 20)
   ✓ Black Dragon Head created (CR 20)
   ...
✓ All 5 heads created and ready for ritual
```

✅ **WHEN DONE:** `temple-of-tiamat` folder should have 26 + 5 = 31 actors

---

## 📋 STEP 5: Create Full Tiamat (Final Boss)

**What gets created:**
- **Tiamat (Full Manifestation)** - CR 30, AC 25, HP 615 (Gargantuan Fiend)

**With:** 5 independent heads, 5 reactions/turn, Legendary Resistance 3/day, Regeneration, all immunities and legendary actions

### DO THIS:

1. **Find file:** `foundry-export/STEP5-create-tiamat-final.js`
2. **Copy entire content**
3. **In Foundry console:** Paste and press Enter

**Expected output:**
```
👑 Creating Tiamat (full manifestation)...
   ✓ Tiamat created (CR 30, AC 25, HP 615)
   ✓ Portrait: [Forge asset URL]
   ✓ Token: [Forge asset URL]

✓ Final boss ready!
```

✅ **WHEN DONE:** `temple-of-tiamat` folder should have 31 + 1 = 32 actors

---

## 📋 STEP 6: Update NPC Images (Portraits & Tokens)

**What happens:**
- Assigns character portraits (img) to all 32 NPCs
- Assigns token images to all NPCs
- Uses Forge VTT asset URLs

### DO THIS:

1. **Find file:** `foundry-export/UPDATE-IMAGES.js`
2. **Copy entire content**
3. **In Foundry console:** Paste and press Enter

**Expected output:**
```
🖼️  Updating NPC images...
   ✓ Updated: Dagult Neverember portrait + token
   ✓ Updated: Ulder Ravengard portrait + token
   ...
✓ All 32 NPCs have portraits and tokens updated
```

✅ **WHEN DONE:** All NPCs in `temple-of-tiamat` folder should have character artwork

---

## 📋 STEP 7: Update All NPC Icons (Ability/Spell Icons)

**What happens:**
- Searches Foundry core icon library for matching ability icons
- Updates all feat/ability/action items with proper icons
- Uses standard Foundry icon paths (guaranteed to exist)

### DO THIS:

1. **Find file:** `foundry-export/UPDATE-ALL-NPC-ICONS.js`
2. **Copy entire content**
3. **In Foundry console:** Paste and press Enter

**Expected output:**
```
🎨 Updating all NPC ability icons...
   ✓ Naergoth Bladelord: Updated 8 abilities
   ✓ Severin: Updated 12 abilities
   ...
✓ All 32 NPCs have proper ability icons
```

✅ **WHEN DONE:** All NPC abilities should have proper Foundry core icons

---

## 📋 STEP 8: Create Red Wizard NPCs (6 unique wizards)

**What gets created:**
- **Magus Thallid**, **Magus Szass**, **Magus Zalathorm**
- **Magus Valrax**, **Magus Thyrmog**, **Magus Yarthraax**

**ALL with:** 
- CR 1/8, AC 12, HP 22
- Spell Save DC 13 (2024 compliant)
- 9 spells (Fire Bolt, Magic Missile, Burning Hands, Fireball, Counterspell, etc.)
- Dagger weapon
- Character artwork + token

### DO THIS:

1. **Find file:** `foundry-export/RED-WIZARD-CREATOR-2024.js`
2. **Copy entire content**
3. **In Foundry console:** Paste and press Enter

**Expected output:**
```
🧙 Creating individual Red Wizard NPCs (2024 compliant)

Creating 6 unique Red Wizard NPCs...

✓ Created: Magus Thallid (AC 12, HP 22, Spell DC 13)
   ✓ Added spell: Fire Bolt
   ✓ Added spell: Magic Missile
   ...
✓ Created: Magus Szass (AC 12, HP 22, Spell DC 13)
   ...
✓ All 6 Red Wizards created successfully!
  They are ready for deployment in the Temple of Tiamat encounter.
  Each has full stats, spells, and equipment already configured.
```

✅ **WHEN DONE:** `temple-of-tiamat` folder should have 32 + 6 = 38 total actors

---

## 📋 STEP 9: Create Ritual Clock Tracker Macro

**What gets created:**
- **Script Macro** that tracks ritual progression
- Auto-spawns Tiamat heads when ritual rounds advance
- Posts public chat cards showing ritual state

### DO THIS:

1. **Find file:** `foundry-export/RITUAL-TRACKER-MACRO.js`
2. **Copy entire content**
3. **In Foundry:**
   - Navigate to: Macros (macro icon in left toolbar)
   - Click **Create Macro**
   - Type: **Script**
   - Name: **Ritual Clock Tracker**
   - Paste the code in the text field
   - Click **Save**

**Using the macro during play:**
- Add the macro to your hotbar (drag it)
- At end of each combat round, click the macro
- Choose: **Advance** (ritual not disrupted) or **Hold** (party disrupted) or **Reset** (portal collapsed)
- Macro auto-spawns the head and posts the ritual state in chat

✅ **WHEN DONE:** Macro available in hotbar for use during Temple combat

---

## ✨ VERIFICATION CHECKLIST

After all 9 steps, verify:

1. **Actor Count:**
   - [ ] Open Actors folder → `temple-of-tiamat`
   - [ ] Should show **38 total actors**

2. **Council Members (11):**
   - [ ] Dagult Neverember
   - [ ] Ulder Ravengard
   - [ ] (etc., all 11)

3. **Creatures (9):**
   - [ ] Air Elemental, Fire Elemental
   - [ ] Stone Golem, Clay Golem, Iron Golem
   - [ ] Wight, Cult Fanatic, Cultist, Barbed Devil

4. **Antagonists (6):**
   - [ ] Naergoth Bladelord (AC 18, HP 170)
   - [ ] Severin (AC 15, HP 230, spells)
   - [ ] Rath Modar, Magus Thezzar, White Abishai, Black Abishai

5. **Tiamat Heads (5):**
   - [ ] White Head (CR 20, HP 210)
   - [ ] Black Head (CR 20, HP 195)
   - [ ] Green Head (CR 21, HP 210)
   - [ ] Blue Head (CR 20, HP 195)
   - [ ] Red Head (CR 21, HP 210)

6. **Full Tiamat (1):**
   - [ ] Tiamat (CR 30, AC 25, HP 615)

7. **Red Wizards (6):**
   - [ ] Magus Thallid, Szass, Zalathorm, Valrax, Thyrmog, Yarthraax
   - [ ] Each: AC 12, HP 22, Spell DC 13

8. **Imagery:**
   - [ ] Open any NPC
   - [ ] Should have character portrait visible
   - [ ] Token image should show in Prototype Token

9. **Icons:**
   - [ ] Open Naergoth Bladelord → Click Abilities tab
   - [ ] Abilities should have proper icons (not just white circles)

10. **Macro:**
    - [ ] Check Macros list
    - [ ] Should see "Ritual Clock Tracker"
    - [ ] Can drag to hotbar

---

## 🎯 YOU NOW HAVE:

```
38 COMPLETE ACTORS with:
✓ Full 2024 D&D rules stats
✓ AC, HP, Proficiency, Skills, Saves
✓ Weapons & Equipment from compendia
✓ Spells (from dnd5e.spells/spells24)
✓ Traits, Actions, Legendary Actions
✓ Character portraits + token images
✓ Proper ability icons from Foundry library
✓ Organized in temple-of-tiamat folder
✓ Ritual Clock automation macro

✨ READY TO RUN THE TEMPLE OF TIAMAT FINALE! ✨
```

---

## 📝 TROUBLESHOOTING

### "Nothing happened after pasting"
→ Make sure you're in the **Console tab** (not Elements or Network)
→ Check that code pasted completely
→ Scroll down in console to see output

### "Error: Pack not found: dnd5e.creatures24"
→ Normal! Script has fallback logic
→ It will search other packs and create from embedded data if needed
→ Check console for which creatures were created

### "Some spells didn't add"
→ Spell might be named differently in your spells pack
→ Check console for warnings about missing spells
→ Can manually add via Items tab → Add from Compendium

### "Image URLs showing 404"
→ Forge asset URLs might not match your world ID
→ If images don't show, they're optional - actors work without them
→ Can manually add artwork later via actor portrait field

### "Macro not appearing in Macros list"
→ Make sure you clicked **Create Macro** and **Save**
→ Check Foundry Settings → Macro permissions if needed

---

## 📁 FILE LOCATIONS

```
foundry-export/
├── STEP1-import-council.js
├── STEP2-import-creatures-FIXED.js
├── STEP3-create-antagonists.js
├── STEP4-create-tiamat-heads.js
├── STEP5-create-tiamat-final.js
├── UPDATE-IMAGES.js
├── UPDATE-ALL-NPC-ICONS.js
├── RED-WIZARD-CREATOR-2024.js
├── RITUAL-TRACKER-MACRO.js
└── RUN-THIS-ORDER.md (this file)
```

---

**👉 START WITH STEP 1 NOW!** 🚀

Copy → Paste → Enter → Wait for completion → Move to next step
