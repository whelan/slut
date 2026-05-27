# 🚀 AUTOMATED NPC IMPORT - RUN IN THIS ORDER

**GOAL:** Import 26 complete NPCs with FULL 2024 rules stats, skills, saves, actions, items, spells.

**Time:** ~10 minutes total

---

## ⚙️ SETUP

1. **Open Foundry** at forgevtt.com
2. **Press F12** → **Console tab**
3. **Keep console open** for all 3 steps

---

## 📋 STEP 1: Import Council Members (11 NPCs)

**What gets imported:**
- Dagult Neverember, Ulder Ravengard, Remallia Haventree
- Ontharr Frume, Delaan Winterhound, Sir Isteval
- Taern Hornblade, King Melandrach, Ambassador Brawnanvil
- Crimson Maccath, Nyh Ilmichh

**ALL with:** AC, HP, abilities, skills, saves, weapons, spells (for spellcasters)

### DO THIS:

1. **Find file:** `foundry-export/STEP1-import-council.js`
2. **Open it** in text editor
3. **Copy ENTIRE content**
4. **In Foundry console:** Paste the code
5. **Press Enter**
6. **Wait for output** showing "✓ Council Members imported"

**Output:**
```
✓ Imported: 11/11
   Dagult Neverember imported ✓
   Ulder Ravengard imported ✓
   ...
📋 NEXT STEP: Run STEP2-import-creatures.js
```

✅ **WHEN DONE:** Check Foundry Actors folder → `temple-of-tiamat` folder should have 11 Council members

---

## 📋 STEP 2: Import Creatures (9 creatures)

**What gets imported:**
- Air Elemental, Fire Elemental
- Stone Golem, Clay Golem, Iron Golem
- Wight, Cult Fanatic, Cultist, Barbed Devil

**ALL with:** Full SRD stats, AC, HP, abilities, equipment, special traits

### DO THIS:

1. **Clear console** (optional, but helps)
2. **Find file:** `foundry-export/STEP2-import-creatures.js`
3. **Open it** in text editor
4. **Copy ENTIRE content**
5. **In Foundry console:** Paste the code
6. **Press Enter**
7. **Wait for output** showing "✓ Creatures imported"

**Output:**
```
✓ Imported: 9/9
   Air Elemental imported ✓
   Fire Elemental imported ✓
   ...
📋 NEXT STEP: Run STEP3-create-antagonists.js
```

✅ **WHEN DONE:** Check `temple-of-tiamat` folder should now have 11 + 9 = 20 actors

---

## 📋 STEP 3: Create Antagonists (6 custom NPCs)

**What gets created from scratch:**
- **Naergoth Bladelord** - CR 11 Wight, AC 18, HP 170
- **Severin** - CR 6 sorcerer, 9 spells, legendary actions
- **Rath Modar** - CR 3 Red Wizard, 5 spells
- **Magus Thezzar** - CR 8 Red Wizard lieutenant, 8 spells, legendary actions
- **White Abishai** - CR 3, icy warrior
- **Black Abishai (Rezmir)** - CR 7 wyrmspeaker, legendary actions

**ALL with:** Complete 2024 rules stats, proficiencies, skills, saves, spells, legendary actions

### DO THIS:

1. **Clear console** (optional)
2. **Find file:** `foundry-export/STEP3-create-antagonists.js`
3. **Open it** in text editor
4. **Copy ENTIRE content**
5. **In Foundry console:** Paste the code
6. **Press Enter**
7. **Wait for output** showing "✓ ALL ANTAGONISTS CREATED"

**Output:**
```
⚔️  Creating: Naergoth Bladelord...
   ✓ Naergoth Bladelord created with full stats

⚔️  Creating: Severin...
   ✓ Severin created with full stats
   ✓ Added spell: Fire Bolt
   ✓ Added spell: Fireball
   ...

✓ Created: 6/6

📋 ALL STEPS COMPLETE!
✓ Council Members: 11 imported
✓ Creatures: 9 imported
✓ Antagonists: 6 created

✨ READY TO PLAY!
```

✅ **WHEN DONE:** Check `temple-of-tiamat` folder should have 11 + 9 + 6 = **26 COMPLETE NPCs**

---

## ✨ AFTER ALL STEPS

### Verify Everything:

1. **Open Actors folder** → Click `temple-of-tiamat`
2. **Should see 26 actors:**
   - 11 Council members
   - 9 Creatures
   - 6 Antagonists
3. **Click on any NPC** → Verify:
   - ✓ AC and HP correct
   - ✓ Abilities scores show
   - ✓ Weapons in Items tab
   - ✓ Spells in Items tab (for spellcasters)

### Quick Test:
- **Open Naergoth Bladelord** → AC 18, HP 170, Legendary Actions
- **Open Severin** → AC 15, 9 spells, Legendary Actions
- **Open Taern Hornblade** → AC 14, 7 spells

### If Something's Missing:
- Check console for error messages
- NPCs might be missing some items (equipment) - you can manually add from `dnd5e.items` compendia
- Spells that didn't find matches will show warnings in console

---

## 🎯 YOU NOW HAVE:

```
26 COMPLETE NPCs with:
✓ Full 2024 D&D rules stats
✓ AC, HP, Proficiency, Skills, Saves
✓ Weapons & Equipment from compendia
✓ Spells (from dnd5e.spells/spells24)
✓ Traits, Actions, Legendary Actions
✓ Organized in temple-of-tiamat folder
✓ Ready to drop into your campaign
```

---

## 📝 COMMON ISSUES

### "Nothing happened after pasting"
→ Make sure you're in the **Console tab** (not Elements or Network)
→ Scroll down in console to see output

### "Error: Pack not found"
→ Your dnd5e system might not have all packs
→ Check: Foundry Settings → System Settings → dnd5e version
→ Should be 5.3.3+ for actors24 packs

### "Some spells didn't add"
→ Spell might be named differently in your spells pack
→ Check console for which spells failed
→ Can manually add via Items tab → Add from Compendium

### "Some actors don't have weapons"
→ Weapon might not be in items compendia
→ Manual add: Open NPC → Items tab → Add from Compendium → Search weapon name

---

## 🎉 WHEN DONE

Your Foundry world now has:
- ✅ All Council of Waterdeep members
- ✅ All creatures and minions
- ✅ All major antagonists (Naergoth, Severin, Rath, etc.)
- ✅ Full stats, spells, items, actions

**READY TO RUN SESSIONS!**

---

## FILE LOCATIONS

- `foundry-export/STEP1-import-council.js` ← Open & copy
- `foundry-export/STEP2-import-creatures.js` ← Open & copy
- `foundry-export/STEP3-create-antagonists.js` ← Open & copy

---

**👉 START WITH STEP 1 NOW!** 🚀
