# NPC Cleanup & Improvement Plan

**Status:** Ready to execute  
**Target:** Foundry v13, dnd5e system 5.3.3  
**Date:** 2026-05-27

---

## Phase 1: Delete Imported Low-Quality NPCs

### KEEP (Do Not Touch)
- ✅ Axar Runes (Wizard, party)
- ✅ Daxx Drake (Ranger, party)
- ✅ Frygtløs (Barbarian, party)
- ✅ Twilight Ventress (Bard, party)

### DELETE (Imported, low quality)
Delete all other imported actors in Actors folder EXCEPT the party PCs.

---

## Phase 2: Council of Waterdeep (11 NPCs)

These are likely in official compendia or can be based on standard stat blocks.

### Mapping to Compendia

| NPC | Official Stat Block | Compendia Pack | Notes |
|---|---|---|---|
| Dagult Neverember | Noble | dnd5e.creatures | City leader |
| Ulder Ravengard | Knight | dnd5e.creatures | Military commander |
| Remallia Haventree | Spy/Assassin | dnd5e.creatures | Harper master |
| Ontharr Frume | Priest | dnd5e.creatures | Religious leader |
| Delaan Winterhound | Veteran | dnd5e.creatures | Dwarf warrior |
| Sir Isteval | Knight | dnd5e.creatures | Knight commander |
| Taern Hornblade | Mage | dnd5e.creatures | Wizard battle mage |
| King Melandrach | Mage/Noble | dnd5e.creatures | Elf king |
| Ambassador Brawnanvil | Noble | dnd5e.creatures | Dwarf diplomat |
| Crimson Maccath | Mage | dnd5e.creatures | Red Wizard |
| Nyh Ilmichh | Mage | dnd5e.creatures | Magic user |

**Action:** Import from `dnd5e.creatures` then customize with:
- Correct names
- Appropriate weapons and equipment
- Updated spells (from dnd5e.spells compendia)
- Customized abilities based on campaign role

---

## Phase 3: Major Antagonists (4 NPCs)

### Naergoth Bladelord
- **Status:** Likely in Rise of Tiamat module pack
- **Fallback:** Custom 2024-rules Wight, CR 11, AC 18, HP 170
- **Items:** Greatsword, ornate armor, Legendary Actions
- **Spells:** None (undead)

### Severin
- **Status:** Likely in Rise of Tiamat module pack
- **Fallback:** Custom 2024-rules Cult Fanatic with spells, CR 5-6
- **Items:** Weapons, Robes of the Archmagi (or equivalent)
- **Spells:** 16 spells (from dnd5e.spells)

### Rath Modar
- **Status:** Check Rise of Tiamat or SRD Red Wizard
- **Fallback:** Custom 2024-rules Red Wizard, CR 3
- **Items:** Staff, dagger, robe
- **Spells:** 6 spells

### Magus Thezzar
- **Status:** Custom NPC (Rath's lieutenant)
- **Create:** 2024-rules Red Wizard, CR 8, AC 14, HP 65
- **Items:** Staff of Fire, robes, dagger
- **Spells:** 8 spells

---

## Phase 4: Standard Creatures

### From SRD (dnd5e.creatures) - Use These
- ✅ Cultist
- ✅ Cult Fanatic
- ✅ Priest
- ✅ Mage
- ✅ Red Wizard
- ✅ Knight
- ✅ Veteran
- ✅ Assassin/Spy
- ✅ Elementals (Air, Fire, Water, Earth)
- ✅ Golems (Clay, Stone, Iron)
- ✅ Dragons (Young/Adult variants)

### Custom/Module-Specific
- 🔍 Tiamat (5 heads) - Check module pack
- 🔍 Abishai (White, Black, Green, Blue, Red) - Check module pack
- 🔍 Draconic creatures - Check module pack
- 🔍 Prisoners/NPCs - Use SRD stat blocks or improve

---

## Phase 5: Execution Steps

### Step 1: Manual Deletion in Foundry
1. Open **Actors** folder
2. **Delete ALL actors EXCEPT party characters**
3. (Or use cleanup macro below)

### Step 2: Import Council Members from Compendia
For each Council NPC:
1. Search Actors compendia for base stat block (Noble, Knight, etc.)
2. Duplicate/import to your world
3. Rename to correct name
4. Add to `temple-of-tiamat` folder
5. Customize: weapons, equipment, spells as needed

### Step 3: Antagonists
1. **Naergoth, Severin, Rath:** Check Rise of Tiamat module pack first
2. If not found: Create from 2024-rules templates (see below)
3. **Magus Thezzar:** Create from custom 2024-rules stat block

### Step 4: Standard Creatures
1. Import from `dnd5e.creatures` as needed
2. No customization usually needed (they're official)
3. Place in `temple-of-tiamat` folder

### Step 5: Add Items & Weapons
For all NPCs:
1. Add weapons from `dnd5e.items` compendia
2. Add armor/equipment as appropriate
3. Add spells from `dnd5e.spells` for spellcasters
4. Configure Legendary Actions for bosses

---

## 2024-Rules Templates

### Council Member Base (for NPCs not in compendia)
```
AC: 12-16 (depends on armor)
HP: 22-55 (2d8+4 to 10d8+20)
Abilities: STR 10, DEX 11, CON 12, INT 13, WIS 14, CHA 15
Proficiency: +2 or +3
Saves: WIS +4
Skills: Perception +2, Insight +4
Condition Immunities: None
```

### Red Wizard Base (CR 3)
```
AC: 12
HP: 33 (6d8+6)
Abilities: STR 9, DEX 12, CON 12, INT 16, WIS 11, CHA 12
Proficiency: +2
Spells: 3 cantrips, 5 1st-level, 3 2nd-level
Items: Quarterstaff, Dagger
```

### Naergoth Bladelord (2024 Wight, CR 11)
```
AC: 18
HP: 170 (20d8+80)
Abilities: STR 20, DEX 14, CON 18, INT 12, WIS 13, CHA 16
Proficiency: +4
Legendary Resistance: 3/day
Legendary Actions: Attack, Move, Cast Spell
Items: Greatsword +1, Ornate Armor, Crown
```

---

## Compendia to Check

### Primary Compendia
- `dnd5e.creatures` - SRD monsters (best for standard stat blocks)
- `dnd5e.npc` - Named NPCs from modules
- `dnd5e.items` - Weapons, armor, equipment
- `dnd5e.spells` - All spells (923 total)

### Module Packs (if installed)
- Rise of Tiamat module pack (check for Naergoth, Severin, Rath Modar)
- Tyranny of Dragons complete module

---

## Execution Order

1. ✅ Create folder structure: `temple-of-tiamat`
2. ✅ Delete all imported NPCs (keep party)
3. ✅ Import Council from compendia (11 actors)
4. ✅ Create/import Antagonists (4 actors)
5. ✅ Import standard creatures as needed
6. ✅ Add weapons/equipment to all NPCs
7. ✅ Add spells to spellcasters
8. ✅ Verify folder organization

---

## Script: Auto-Cleanup Macro

**See:** `foundry-export/cleanup-npc-macro.js`

Run in Foundry console (F12 > Console):
```javascript
// Paste entire cleanup-npc-macro.js into console and press Enter
```

This will:
- Delete low-quality imports
- Import from compendia where available
- Organize into temple-of-tiamat folder

---

## Items to Add to All NPCs

### Weapons (from dnd5e.items)
- Longsword, Shortsword, Dagger
- Quarterstaff, Mace, Morning Star
- Longbow, Light Crossbow
- Spear, Javelin

### Armor (from dnd5e.items)
- Plate Armor (AC 18)
- Chain Mail (AC 16)
- Leather Armor (AC 11)
- Light armor, Medium armor

### Equipment
- Backpack
- Rope (50 ft)
- Torch
- Rations
- Potion of Healing (as appropriate)

---

## Spells for Council/Antagonists

### Taern Hornblade (Mage, 6 spells)
- Cantrips: Fire Bolt, Light
- 1st: Magic Missile, Shield, Thunderwave
- 2nd: Scorching Ray, Mirror Image

### Crimson Maccath (Red Wizard, 5 spells)
- Cantrips: Fire Bolt
- 1st: Burning Hands, Magic Missile
- 2nd: Fireball, Scorching Ray

### Nyh Ilmichh (Mage, 5 spells)
- Cantrips: Acid Splash
- 1st: Magic Missile, Cone of Cold
- 2nd: Scorching Ray, Lightning Bolt

---

## Success Criteria

✅ All party characters intact and unmodified  
✅ All imported NPCs deleted (messy pile gone)  
✅ All Council members in compendia-based versions  
✅ All antagonists with proper 2024 stat blocks  
✅ All NPCs in `temple-of-tiamat` folder  
✅ All NPCs have weapons/armor/equipment  
✅ All spellcasters have spells from compendia  
✅ All Legendary Actions configured on bosses  

---

## Verification Checklist

- [ ] Open Actors folder - organized, clean, no duplicates
- [ ] Party characters present and unmodified
- [ ] 11 Council NPCs with correct equipment
- [ ] 4 Antagonists with full stat blocks + Legendary Actions
- [ ] All spellcasters have spells
- [ ] No "Axar Runes" in imports (only as party member)
- [ ] All in `temple-of-tiamat` folder or appropriately organized
- [ ] Scenes still have actors (not broken references)

---

Generated: 2026-05-27  
Branch: claude/foundry-import-plan-ey7Sf
