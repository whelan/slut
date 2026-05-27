# 🚀 FOUNDRY VTT IMPORT – RUN IN THIS ORDER

**GOAL:** Import 32 complete NPCs with FULL 2024 D&D 5e rules, all from Foundry compendia (no duplication).

**What You'll Have:** 11 Council + 9 Creatures + 6 Antagonists + 5 Tiamat Heads + 1 Full Tiamat (32 total)

**Time:** ~15 minutes total

---

## ⚙️ SETUP

1. **Open Foundry VTT** at forgevtt.com
2. **Press F12** on your keyboard
3. **Click the "Console" tab** (not Elements, Sources, or Network)
4. **Keep the console open** for all 5 steps
5. **Have a text editor ready** to copy/paste code

---

## 📋 STEP 1: Import Council Members (11 NPCs)

**What gets imported:**
- Dagult Neverember, Ulder Ravengard, Remallia Haventree
- Ontharr Frume (HP 150), Delaan Winterhound, Sir Isteval
- Taern Hornblade, King Melandrach, Ambassador Brawnanvil
- Crimson Maccath, Nyh Ilmichh

**Stats:** AC, HP, abilities, skills, saves, weapons, spells — all from dnd5e compendia

### DO THIS:

1. **Open file:** `foundry-export/STEP1-import-council.js` in a text editor
2. **Copy ENTIRE content** (Ctrl+A, Ctrl+C)
3. **Switch to Foundry console** (F12)
4. **Paste** the code into the console input
5. **Press Enter**
6. **Wait for success message** showing "✓ Council Members imported"

✅ **WHEN DONE:** Check your Actors folder → you should see 11 Council members

---

## 📋 STEP 2: Import Creatures (9 Creatures)

**What gets imported:**
- Air Elemental, Fire Elemental
- Stone Golem, Clay Golem, Iron Golem
- Wight, Cult Fanatic, Cultist, Barbed Devil

**Stats:** Full 2024 SRD stats (AC, HP, abilities, resistances, immunities, traits)

### DO THIS:

1. **Open file:** `foundry-export/STEP2-import-creatures.js`
2. **Copy ENTIRE content**
3. **In Foundry console:** Paste and press Enter
4. **Wait for success message**

✅ **WHEN DONE:** Actors folder now has 11 + 9 = 20 total

---

## 📋 STEP 3: Create Antagonists (6 Major Bosses)

**What gets created:**
- **Naergoth Bladelord** – CR 11, AC 18, HP 170, legendary actions
- **Severin** – CR 11, AC 16, HP 150, CHA 20, Draconic Majesty, 5 legendary resistances
- **Rath Modar** – CR 6, AC 16 (with mage armor), HP 71, 11th-level spellcaster, legendary actions
- **Magus Thezzar** – CR 5, AC 18 (with mage armor), HP 77, 9th-level spellcaster, legendary actions
- **White Abishai** – CR 5, AC 16, HP 78, Fire immunity, Frozen Aura, Icy Breath
- **Black Abishai (Rezmir)** – CR 7, AC 16, HP 120, legendary actions

**Stats:** 2024 rules, proficiency bonuses, spell DCs, full trait/action items

### DO THIS:

1. **Open file:** `foundry-export/STEP3-create-antagonists.js`
2. **Copy ENTIRE content**
3. **In Foundry console:** Paste and press Enter
4. **Wait for success message** showing "✓ ALL ANTAGONISTS CREATED"

✅ **WHEN DONE:** Actors folder now has 11 + 9 + 6 = 27 total

---

## 📋 STEP 4: Create Tiamat Heads (5 Manifestation Phase)

**What gets created:**
- **Black Head** – CR 20, AC 25, HP 195, Acid damage, Acidic Aura, Acid Breath
- **Blue Head** – CR 20, AC 25, HP 195, Lightning damage, Lightning Aura, Lightning Breath
- **Green Head** – CR 21, AC 25, HP 210, Poison damage, Poisonous Aura, Poison Breath
- **Red Head** – CR 21, AC 25, HP 210, Fire damage, Molten Aura, Fire Breath
- **White Head** – CR 20, AC 25, HP 195, Cold damage, Freezing Aura, Cold Breath

**Purpose:** These 5 heads are used during Clock progression (rounds 4–7). Each head has:
- Partial Manifestation trait (regenerate 15 HP/turn)
- Independent lair/legendary actions
- Elemental-specific auras and breath weapons
- Full legendary resistance (3/Day)

### DO THIS:

1. **Open file:** `foundry-export/STEP4-create-tiamat-heads.js`
2. **Copy ENTIRE content**
3. **In Foundry console:** Paste and press Enter
4. **Wait for success message**

✅ **WHEN DONE:** Actors folder now has 11 + 9 + 6 + 5 = 31 total

---

## 📋 STEP 5: Create Full Tiamat (Clock 8 Final Form)

**What gets created:**
- **Tiamat** – CR 30, AC 25, HP 615
  - Gargantuan fiend, five independent heads
  - 5 breath weapons (one per color: acid, cold, fire, lightning, poison)
  - 5 independent bite attacks with elemental damage
  - Legendary Resistance 5/Day
  - Multiple Heads trait (5 reactions per turn)
  - Regeneration 30 HP/turn
  - Frightful Presence (DC 26 WIS save)
  - Divine traits: Innate Spellcasting (Divine Word 3/Day), Discorporation

**Purpose:** Full Tiamat manifests at Clock 8 (end of ritual). This replaces the 5 individual heads and serves as the final phase boss.

### DO THIS:

1. **Open file:** `foundry-export/STEP5-create-tiamat-final.js`
2. **Copy ENTIRE content**
3. **In Foundry console:** Paste and press Enter
4. **Wait for success message** showing "✓ TIAMAT CREATED"

✅ **WHEN DONE:** Actors folder now has 11 + 9 + 6 + 5 + 1 = **32 COMPLETE NPCs**

---

## ✨ AFTER ALL STEPS – VERIFICATION

### Check Your Actors Folder

1. **Open Foundry → Actors**
2. **Count:** Should see 32 total actors organized as:
   - 11 Council members (Dagult, Ulder, Remallia, etc.)
   - 9 Creatures (Air Elemental, Fire Elemental, golems, wight, cultists, barbed devil)
   - 6 Antagonists (Naergoth, Severin, Rath Modar, Magus Thezzar, White Abishai, Black Abishai)
   - 5 Tiamat Heads (Black, Blue, Green, Red, White)
   - 1 Full Tiamat (CR 30)

### Quick Spot-Check

Open a few actors to verify stats are correct:

- **Severin:** AC 16, HP 150, CHA 20, should have Draconic Majesty + 5 Legendary Resistances
- **Rath Modar:** AC 16 (with mage armor), HP 71, should have legendary actions + spells
- **Black Head:** AC 25, HP 195, should have Partial Manifestation trait + Acid Breath
- **Tiamat:** AC 25, HP 615, should have 5 breath weapons + Regeneration 30

### Check Item Tab for Each Actor

- ✓ AC and HP show correctly
- ✓ Ability scores visible
- ✓ Skills and saves applied
- ✓ Traits, actions, legendary actions, reactions appear as feat items
- ✓ Icons display (not all gray defaults)

---

## 🎯 WHAT YOU NOW HAVE

```
32 COMPLETE NPCs with:
✓ Full 2024 D&D 5e rules compliance
✓ AC, HP, proficiency bonuses, skills, saves
✓ All stats pulled from dnd5e compendia
✓ Spells automatically linked from dnd5e spellcasting compendia
✓ Weapons & equipment from compendia (no duplication)
✓ Traits, actions, reactions, legendary actions as feat items
✓ Custom icons matched from compendia where available
✓ Ready for immediate use in combat

CAMPAIGN READY:
→ Council encounters (11 NPCs)
→ Minion/creature combat (9 creatures)
→ Boss encounters (6 antagonists)
→ Ritual clock progression (5 heads → Clock 4–7)
→ Final Tiamat fight (Clock 8)
```

---

## 📝 TROUBLESHOOTING

### "Nothing happened after pasting"
- ✓ Make sure you're in the **Console tab** (not Elements or Network)
- ✓ Try scrolling down in the console to see output
- ✓ If still nothing, copy/paste again slowly

### "Error: Cannot read property 'name' of undefined"
- This usually means a pack wasn't found
- Check Foundry Settings → System Settings → dnd5e version
- Should be **v5.3.3** or higher for all packs
- Try reloading the world (F5) and re-running the step

### "Some spells/items didn't add"
- The script automatically searches compendia first
- If a spell isn't found, it will log a warning but continue
- You can manually add missing items via Items tab → Add from Compendium

### "Icons look wrong or generic"
- Icons are pulled from compendia automatically
- The script searches for matching icon files for each feature
- Fallbacks use type-based icons (breath weapons → fire/elemental, shields, magic, etc.)
- You can manually update icons by right-clicking feat items → Configure Icon

### "Actors created but stats are incomplete"
- All stats should be complete by design
- Check that you're viewing the correct Attributes tab
- Some stats appear in different places (Traits vs. Items tab)
- Verify console had no error messages during import

---

## 🎉 READY TO PLAY

Your campaign now has:
- ✅ **Council of Waterdeep** – All allied NPCs ready for war council
- ✅ **Creature Encounters** – Golems, elementals, cultists for Temple combat
- ✅ **Major Antagonists** – Naergoth, Severin, Rath Modar, and others with full mechanics
- ✅ **Tiamat Progression** – 5 heads for early phases, full Tiamat for finale
- ✅ **Complete Stats** – All 2024 D&D 5e rules, no manual entry needed

**You can start encounters immediately. No further setup required.**

---

## FILE LOCATIONS

Copy these files in order:

1. `foundry-export/STEP1-import-council.js` ← Council members
2. `foundry-export/STEP2-import-creatures.js` ← Creatures & minions
3. `foundry-export/STEP3-create-antagonists.js` ← Antagonist bosses
4. `foundry-export/STEP4-create-tiamat-heads.js` ← Ritual clock heads
5. `foundry-export/STEP5-create-tiamat-final.js` ← Full Tiamat (Clock 8)

---

## COMPENDIUM-FIRST ARCHITECTURE

All scripts use a **compendium-first approach:**

- ✓ All spells, items, weapons come from existing dnd5e compendia
- ✓ No embedded items → no duplication
- ✓ Icons automatically matched from compendia
- ✓ Falls back gracefully if item not found
- ✓ Searches: `dnd5e.actors24` → `dnd5e.items` → `dnd5e.creatures24` → all other packs

This means:
- Smaller file sizes
- No outdated copies of spells
- Links to your official compendia
- Easy to update if compendia change

---

**👉 START WITH STEP 1 NOW!** 🚀

Paste each script in order. Takes ~15 minutes total. No manual editing required.
