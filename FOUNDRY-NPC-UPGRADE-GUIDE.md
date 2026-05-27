# Foundry NPC Upgrade Guide - Complete Step-by-Step

**Goal:** Clean up imported NPCs, find official versions in compendia, create missing ones with 2024 rules + full equipment

---

## STEP 1: Analyze Current State (Run in Foundry Console)

```javascript
// Copy & paste this into Foundry Console (F12 > Console)
// Then open foundry-export/advanced-npc-cleanup-macro.js
```

**This will:**
- ✅ Identify party characters (keep these!)
- ✅ Count imported NPCs (candidates for deletion)
- ✅ Check which compendia are available
- ✅ Report which NPCs can be found in compendia
- ✅ List which NPCs need manual creation

---

## STEP 2: Delete Imported Low-Quality NPCs

### Option A: Manual Deletion in Foundry UI
1. Open **Actors** folder
2. For EACH actor (except Axar, Daxx, Frygtløs, Twilight):
   - Right-click → Delete
   - Confirm deletion
3. Keep only party characters

### Option B: Use Deletion Macro
Copy this into Foundry Console:

```javascript
const KEEP = ["Axar Runes", "Daxx Drake", "Frygtløs", "Twilight Ventress"];
const toDelete = game.actors.filter(a => !KEEP.includes(a.name));
for (const actor of toDelete) {
  actor.delete();
  console.log(`Deleted: ${actor.name}`);
}
console.log(`✓ Deleted ${toDelete.length} actors`);
```

---

## STEP 3: Import Council NPCs from Compendia

For EACH Council member, import the base stat block and rename:

### Method: Import from Compendium (Foundry UI)

1. **Click:** Actors folder → Search icon
2. **Search compendia** for the base stat block
3. **Duplicate** to world
4. **Rename** to correct NPC name
5. **Move** to `temple-of-tiamat` folder

### Council Mapping

| NPC Name | Base Stat Block | Steps |
|---|---|---|
| Dagult Neverember | Noble | Import "Noble", rename, add equipment |
| Ulder Ravengard | Knight | Import "Knight", rename, add equipment |
| Remallia Haventree | Assassin | Import "Assassin", rename, add equipment |
| Ontharr Frume | Priest | Import "Priest", rename, add spells |
| Delaan Winterhound | Veteran | Import "Veteran", rename, add equipment |
| Sir Isteval | Knight | Import "Knight", rename, add equipment |
| Taern Hornblade | Mage | Import "Mage", rename, add 6 spells |
| King Melandrach | Mage | Import "Mage", rename, customize |
| Ambassador Brawnanvil | Noble | Import "Noble", rename, add equipment |
| Crimson Maccath | Mage | Import "Mage", rename, add 5 spells |
| Nyh Ilmichh | Mage | Import "Mage", rename, add 5 spells |

**For each NPC after importing:**
1. Open actor sheet
2. **Items tab** → Add weapon from dnd5e.items
3. **Spell tab** (if applicable) → Add spells
4. Assign to `temple-of-tiamat` folder

---

## STEP 4: Create Major Antagonists (Not in Standard Compendia)

### A. Naergoth Bladelord

**First, try:** Search compendia for "Naergoth" (may be in Rise of Tiamat pack)

**If not found, create manually:**

1. **Create new Actor**
   - Name: Naergoth Bladelord (Wight)
   - Type: NPC
   - Folder: temple-of-tiamat

2. **Edit Sheet → Details**
   ```
   AC: 18
   HP: 170 (20d8+80)
   CR: 11
   Challenge: ⚔️⚔️⚔️
   ```

3. **Edit Sheet → Attributes**
   ```
   STR: 20 (+5)
   DEX: 14 (+2)
   CON: 18 (+4)
   INT: 12 (+1)
   WIS: 13 (+1)
   CHA: 16 (+3)
   ```

4. **Proficiencies**
   - Saves: WIS +4
   - Damage Resistances: Cold, Lightning, Necrotic, Piercing, Slashing
   - Condition Immunities: Charmed, Exhaustion, Frightened, Paralyzed, Poisoned

5. **Add Items**
   - Greatsword
   - Breastplate
   - Ring of Protection

6. **Add to Items Tab → Traits/Actions:**
   - **Multiattack:** Two greatsword attacks
   - **Greatsword:** +9 to hit, 2d6+5 slashing
   - **Legendary Resistance (3/day):** Reroll failed save
   - **Legendary Action (Attack):** +9 to hit, 2d6+5
   - **Legendary Action (Move):** Move up to speed
   - **Legendary Action (Cast Spell):** Cast 1 spell

---

### B. Severin

**First, try:** Search for "Severin" (may be in Rise of Tiamat pack)

**If not found, create from Cult Fanatic template:**

1. **Import "Cult Fanatic"** from dnd5e.creatures
2. **Rename:** Severin
3. **Edit details:**
   ```
   AC: 15
   HP: 66 (12d8+24)
   CR: 6
   ```

4. **Add Spells (16 total):**
   ```
   Cantrips (at will): Fire Bolt, Light, Mage Hand, Shocking Grasp
   1st (4): Burning Hands, Magic Missile, Thunderwave, Witch Bolt
   2nd (3): Fireball, Scorching Ray, Misty Step
   3rd (3): Counterspell, Dispel Magic, Fireball (slot 3)
   4th (2): Dimension Door, Greater Invisibility
   5th (1): Cone of Cold
   ```

5. **Add Items:**
   - Quarterstaff
   - Robes of the Archmagi (or Robe of Power)
   - Ring of Protection

6. **Legendary Actions:**
   - Same as Naergoth

---

### C. Rath Modar

**Try:** Search for "Rath Modar" or "Red Wizard"

**If not found, create from Red Wizard template:**

1. **Import "Red Wizard"** from dnd5e.creatures
2. **Rename:** Rath Modar
3. **Customize as needed (probably already good)**
4. **Add spells if missing:**
   ```
   Fireball, Scorching Ray, Magic Missile, Burning Hands, Lightning Bolt
   ```

---

### D. Magus Thezzar (Custom - 2024 Rules)

Create new NPC:

1. **Basic Info**
   ```
   Name: Magus Thezzar
   Type: NPC
   AC: 14
   HP: 65 (10d8+20)
   CR: 8
   ```

2. **Abilities**
   ```
   STR: 10, DEX: 12, CON: 14, INT: 18, WIS: 13, CHA: 15
   Proficiency: +3
   ```

3. **Skills:**
   - Arcana +6
   - Investigation +6
   - Perception +3

4. **Add Spells (8 total):**
   ```
   Cantrips: Fire Bolt, Light
   1st: Magic Missile, Burning Hands, Mage Armor
   2nd: Scorching Ray, Fireball
   3rd: Counterspell
   ```

5. **Add Items:**
   - Staff of Fire
   - Dagger
   - Robe of the Archmagi
   - Spellbook

---

## STEP 5: Add Weapons & Equipment

### For Each NPC, Add These Items:

**From dnd5e.items compendia:**

1. **Right-click NPC** → Edit
2. **Items tab** → Click "+"
3. **Item from Compendium** → Search for item
4. Select and add

### Common Weapons to Add
- **Warriors:** Longsword, Shield
- **Wizards:** Quarterstaff, Dagger
- **Priests:** Mace, Holy Symbol
- **Assassins:** Short Sword, Dagger

### Common Armor to Add
- **Heavy:** Plate Armor (AC 18)
- **Medium:** Chain Mail (AC 16)
- **Light:** Leather Armor (AC 11)

### Example: Dagult Neverember (Noble)
- Longsword
- Dagger
- Fine Clothing (or Robes)
- Gold signet ring
- Scroll of identify

---

## STEP 6: Add Spells to Spellcasters

### For Taern Hornblade (Mage):
1. **Open actor** → **Items tab**
2. **Add Items from Compendium** → Search `dnd5e.spells`
3. Add these spells:
   ```
   Fire Bolt, Light (cantrips)
   Magic Missile, Shield, Thunderwave (1st)
   Scorching Ray, Mirror Image (2nd)
   ```

### For Crimson Maccath (Mage/Red Wizard):
   ```
   Fire Bolt (cantrip)
   Burning Hands, Magic Missile (1st)
   Fireball, Scorching Ray (2nd)
   ```

### For Nyh Ilmichh (Mage):
   ```
   Acid Splash (cantrip)
   Magic Missile, Cone of Cold (1st)
   Lightning Bolt, Scorching Ray (2nd)
   ```

---

## STEP 7: Configure Legendary Actions (Bosses Only)

For Naergoth, Severin, and other CR 8+ NPCs:

1. **Open NPC sheet** → **Details**
2. **Under Traits → Add custom item**
3. **Create Legendary Action:**
   ```
   Name: Legendary Action (Attack)
   Description: Melee Weapon Attack: +9 to hit, 2d6+5 damage
   
   Name: Legendary Action (Move)
   Description: Move up to walking speed
   
   Name: Legendary Action (Cast Spell)
   Description: Cast a spell (1st-3rd level)
   ```

---

## STEP 8: Organize & Verify

### Final Organization
1. **Create folder:** `temple-of-tiamat` (if not exists)
2. **Move ALL imported/created NPCs** to this folder
3. **Keep party characters** in root Actors folder

### Verification Checklist
- [ ] Party characters untouched (4)
- [ ] No duplicates in Actors
- [ ] Council members: 11 total
- [ ] Antagonists: 4 total (Naergoth, Severin, Rath, Magus)
- [ ] All NPCs have weapons
- [ ] All spellcasters have spells
- [ ] All in `temple-of-tiamat` folder
- [ ] No broken references in scenes

---

## 2024 Rules Quick Reference

### Ability Score Modifiers
```
Score: 8-9 = -1
Score: 10-11 = 0
Score: 12-13 = +1
Score: 14-15 = +2
Score: 16-17 = +3
Score: 18-19 = +4
Score: 20+ = +5
```

### Proficiency Bonus by CR
```
CR 0: +2
CR 1-4: +2
CR 5-8: +3
CR 9-12: +4
CR 13-16: +5
CR 17-20: +6
CR 21+: +7
```

### Legendary Actions
- 3/day for CR 10+
- 2/day for CR 5-9
- Available to CR 5+

---

## Compendia Pack IDs (Foundry 13)

Common pack names:
- `dnd5e.creatures` - SRD monsters
- `dnd5e.npc` - Named NPCs
- `dnd5e.items` - Weapons, armor, equipment
- `dnd5e.spells` - All spells (923 total)

Module packs (if installed):
- Rise of Tiamat module (check for Naergoth, Severin, etc.)
- Tyranny of Dragons

---

## Troubleshooting

### "NPC has no weapons"
→ Open Items tab, click "+" → Add from Compendium

### "Wizard has no spells"
→ Items tab → Click "+" → Item from Compendium → dnd5e.spells

### "NPC not in temple-of-tiamat folder"
→ Right-click → Edit Folder → Select temple-of-tiamat

### "Can't find NPC in compendia"
→ Create manually using templates in Step 4

---

## Final Verification in Scenes

After cleanup:
1. **Open Temple Level 1 scene**
2. **Check:** Are encounter tokens still there?
3. If broken: Re-add tokens from Actors folder
4. **Test:** Run a quick combat to verify mechanics

---

## Success = ✅

- Party characters intact
- No messy duplicate pile
- All NPCs have weapons + equipment
- All spellcasters have spells
- Everything in temple-of-tiamat folder
- Ready to run sessions

---

**Questions?** Check `NPC-CLEANUP-PLAN.md` for detailed reference.

**Next:** Run sessions and enjoy the campaign!
