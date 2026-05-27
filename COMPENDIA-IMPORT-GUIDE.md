# Compendia Search & Import Guide

**Status:** Ready to execute  
**Goal:** Find and import NPCs from Foundry compendia instead of creating them manually

---

## STEP 1: Search Your Compendia (5 min)

1. **Open Foundry** → Press **F12** → **Console tab**
2. **Open file:** `foundry-export/search-compendia-macro.js`
3. **Copy entire content** into Foundry console
4. **Press Enter**

This will:
- ✅ List all your available Actor packs (dnd5e.creatures, etc.)
- ✅ Search for Council NPCs (Dagult, Ulder, etc.)
- ✅ Search for Antagonists (Naergoth, Severin, etc.)
- ✅ Report what's found vs what's missing
- ✅ Show available base stat blocks (Noble, Knight, Mage, etc.)

**Output Example:**
```
✓ Dagult Neverember → "Noble" (dnd5e.creatures)
✓ Ulder Ravengard → "Knight" (dnd5e.creatures)
✗ Remallia Haventree (NOT FOUND) - CREATE MANUALLY
```

---

## STEP 2: Review Results

The search will show you:

### What Will Be Imported
```
Council NPCs Found: 9/11
Antagonists Found: 3/4
Base Stat Blocks: 7/10
```

### What Needs Manual Creation
```
Missing Council: Remallia Haventree, King Melandrach
Missing Antagonist: Magus Thezzar
```

---

## STEP 3: Import Found NPCs (2 min)

1. **Open file:** `foundry-export/import-from-compendia-macro.js`
2. **Copy entire content** into Foundry console
3. **Press Enter**

This will:
- ✅ Automatically import found NPCs to `temple-of-tiamat` folder
- ✅ Rename them correctly (e.g., "Noble" → "Dagult Neverember")
- ✅ Show import status for each

**Output Example:**
```
✓ Dagult Neverember (imported from "Noble")
✓ Ulder Ravengard (imported from "Knight")
✓ Taern Hornblade (imported from "Mage")
✗ Magus Thezzar (NOT FOUND) - CREATE MANUALLY
```

---

## STEP 4: Create Missing NPCs Manually

For NPCs not found in compendia:

1. **Open:** FOUNDRY-NPC-UPGRADE-GUIDE.md
2. **Find the stat block** for the missing NPC
3. **Create manually** in Foundry using the template

### Missing Council Example: King Melandrach

If "King Melandrach" is not found:
1. **New Actor** → Name: "King Melandrach"
2. **Type:** NPC
3. **Copy stat block from guide:**
   ```
   AC: 15 (from Mage)
   HP: 66 (12d8+24)
   STR: 10, DEX: 12, CON: 15, INT: 18, WIS: 13, CHA: 15
   ```
4. **Add to:** temple-of-tiamat folder

---

## STEP 5: Add Weapons & Spells to All NPCs

For **each imported NPC:**

1. **Open actor sheet**
2. **Items tab** → Click "+"
3. **Item from Compendium** → Search `dnd5e.items`
4. Add appropriate weapons:
   - **Warriors:** Longsword, Shield
   - **Wizards:** Quarterstaff, Dagger
   - **Priests:** Mace, Holy Symbol

For **spellcasters** (Taern, Crimson, Nyh, Severin):
1. **Items tab** → Click "+"
2. **Item from Compendium** → Search `dnd5e.spells`
3. Add spells (exact list in FOUNDRY-NPC-UPGRADE-GUIDE.md)

---

## Expected Results After Import

### Council of Waterdeep (11 NPCs)
```
✓ Dagult Neverember (from Noble)
✓ Ulder Ravengard (from Knight)
? Remallia Haventree (check if found)
✓ Ontharr Frume (from Priest)
✓ Delaan Winterhound (from Veteran)
✓ Sir Isteval (from Knight)
✓ Taern Hornblade (from Mage) + 7 spells
? King Melandrach (check if found)
✓ Ambassador Brawnanvil (from Noble)
✓ Crimson Maccath (from Mage) + 5 spells
✓ Nyh Ilmichh (from Mage) + 5 spells
```

### Antagonists (4 NPCs)
```
? Naergoth Bladelord (check if found in Rise of Tiamat pack)
? Severin (check if found)
? Rath Modar (check if found)
✗ Magus Thezzar (CREATE MANUALLY - custom NPC)
```

---

## Troubleshooting

### "Some NPCs not found"
→ They exist in compendia under a different name
→ Manually search Actors pack for similar names
→ Or create using templates from FOUNDRY-NPC-UPGRADE-GUIDE.md

### "Import macro didn't create anything"
→ Rerun search-compendia-macro first
→ Check that pack IDs are correct in your world
→ Verify dnd5e system is installed

### "NPC created but has no equipment"
→ This is normal - add manually:
→ Open NPC → Items tab → Add from Compendium

### "Can't find dnd5e.spells pack"
→ Check Foundry system settings
→ Make sure dnd5e system 5.3.3+ is installed
→ Search manually for spells in packs

---

## Compendia Pack IDs (Common)

- `dnd5e.creatures` - SRD creatures and NPCs
- `dnd5e.npc` - Named NPCs
- `dnd5e.items` - Weapons, armor, equipment
- `dnd5e.spells` - All spells

Other packs (if installed):
- `dnd5e.class-features` - Class abilities
- Rise of Tiamat module packs (if you have module)
- Tyranny of Dragons packs (if you have module)

---

## Timeline

```
5 min   → Run search macro, see what's found
2 min   → Run import macro, import found NPCs
15 min  → Add weapons/spells to imported NPCs
20 min  → Create missing NPCs manually (if needed)
────────────────────────────────────
~45 min → Complete NPC setup!
```

---

## Next After Compendia Import

1. ✅ All NPCs in temple-of-tiamat folder
2. ✅ All NPCs have weapons/armor
3. ✅ All spellcasters have spells
4. ❌ Legendary Actions on bosses (manual)
5. ❌ Skill/save customizations (if needed)

Then: **Ready to run sessions!**

---

## Files Used

- `foundry-export/search-compendia-macro.js` - Search macro
- `foundry-export/import-from-compendia-macro.js` - Import macro
- `FOUNDRY-NPC-UPGRADE-GUIDE.md` - Manual creation templates
- `NPC-CLEANUP-PLAN.md` - Strategy overview

---

**Start with search-compendia-macro.js to see what you have!** 🔍
