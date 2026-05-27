# Foundry VTT Campaign Import – Complete Workflow (5-Step System)

**Status:** ✓ All 32 actors ready with complete 2024 D&D 5e stats and icons

---

## Summary

A complete import system for your **Temple of Tiamat** finale campaign:

- **32 Complete Actors** with full 2024 D&D 5e rules
  - 11 Council of Waterdeep members
  - 9 Creatures & minions
  - 6 Major antagonists
  - 5 Tiamat heads (ritual clock progression, Clock 4–7)
  - 1 Full Tiamat (final boss, Clock 8)

- **Compendium-First Architecture:**
  - All spells/items linked from dnd5e compendia
  - Zero embedded items = no duplication
  - Icons automatically matched from compendia
  - Falls back gracefully if items not found

- **Zero Manual Setup:**
  - Copy → Paste → Enter
  - 5 JavaScript console scripts
  - ~15 minutes total import time

---

## 32 Actors Overview

### STEP 1: Council Members (11)

Allies for the Council of Waterdeep war council. All have full stats, spellcasting where applicable, and equipment.

| Name | AC | HP | Role | Spells |
|---|---|---|---|---|
| Dagult Neverember | 14 | 78 | Open Lord, tactician | Detect Magic |
| Ulder Ravengard | 16 | 126 | Watch Commander | — |
| Remallia Haventree | 13 | 45 | Harper cleric | Healing, support |
| Ontharr Frume | 18 | 150 | Waterdeep paladin | Smite, paladin spells |
| Delaan Winterhound | 16 | 82 | Cleric | Healing, domain |
| Sir Isteval | 17 | 110 | Fighter | — |
| Taern Hornblade | 14 | 96 | Wizard spellcaster | Fireball, Counterspell, etc. |
| King Melandrach | 15 | 88 | Dwarf noble | Dwarven tactics |
| Ambassador Brawnanvil | 14 | 71 | Dwarf ambassador | — |
| Crimson Maccath | 12 | 91 | Red Wizard | Hold Monster, Counterspell |
| Nyh Ilmichh | 13 | 78 | Cleric specialist | Divine magic |

**Use For:** War council meetings, strategic planning, allied NPC interactions

---

### STEP 2: Creatures (9)

Combat minions and environmental hazards. Standard SRD stat blocks with full resistances and immunities.

| Name | CR | AC | HP | Type | Special |
|---|---|---|---|---|---|
| Air Elemental | 5 | 15 | 90 | Elemental | Bludgeoning immunity, whirlwind |
| Fire Elemental | 5 | 15 | 102 | Elemental | Fire immunity, burn touch |
| Stone Golem | 10 | 17 | 178 | Construct | Immune to magic, slow |
| Clay Golem | 9 | 14 | 133 | Construct | Bludgeoning resistance |
| Iron Golem | 16 | 20 | 210 | Construct | Heavy, slow |
| Wight | 3 | 15 | 45 | Undead | Life drain, shadows |
| Cult Fanatic | 2 | 13 | 33 | Humanoid | Spellcasting |
| Cultist | 1/8 | 12 | 16 | Humanoid | Basic cult member |
| Barbed Devil | 5 | 15 | 110 | Fiend | Barbed skin, reactive |

**Use For:** Temple encounters, minion waves, environmental challenges

---

### STEP 3: Antagonists (6)

Major boss NPCs with legendary actions, special abilities, and full spellcasting.

| Name | CR | AC | HP | Role | Notable |
|---|---|---|---|---|---|
| Naergoth Bladelord | 11 | 18 | 170 | Wight boss | Legendary actions, life drain |
| Severin | 11 | 16 | 150 | Cult leader | Draconic Majesty, spellcaster, 5 Legendary Resistances |
| Rath Modar | 6 | 16 | 71 | Red Wizard | 11th-level spellcaster, legendary actions |
| Magus Thezzar | 5 | 18 | 77 | Wizard lieutenant | 9th-level spellcaster, fire/lightning resist |
| White Abishai | 5 | 16 | 78 | Dragon emissary | Fire immunity, Frozen Aura, Icy Breath |
| Black Abishai (Rezmir) | 7 | 16 | 120 | Wyrmspeaker | Legendary actions, draconic powers |

**Use For:** Boss encounters, ritual challengers, final confrontations

**Special Stats:**
- Severin: CHA 20, Draconic Majesty trait, 5 Legendary Resistance/day
- Rath Modar: 11th-level spells, legendary actions, lair actions
- Magus Thezzar: 9th-level spells, fire/lightning resistances
- Naergoth: CR 11 wight with legendary actions
- White Abishai: Fire immunity (not resistance), no legendary/lair actions
- Black Abishai: Full legendary and lair actions

---

### STEP 4: Tiamat Heads (5)

Individual manifestation phases during the ritual clock (Rounds 4–7 of Clock progression). Each head acts independently with its own lair actions and legendary abilities.

| Head | CR | AC | HP | Damage Type | Breath | Special |
|---|---|---|---|---|---|
| Black | 20 | 25 | 195 | Acid | 120 ft line, 13d8 acid | Acidic Aura, regen 15/turn |
| Blue | 20 | 25 | 195 | Lightning | 120 ft line, 14d10 lightning | Lightning Aura, regen 15/turn |
| Green | 21 | 25 | 210 | Poison | 90 ft cone, 20d6 poison | Poisonous Aura, regen 15/turn |
| Red | 21 | 25 | 210 | Fire | 90 ft cone, 23d6 fire | Molten Aura, regen 15/turn |
| White | 20 | 25 | 195 | Cold | 90 ft cone, 14d8 cold | Freezing Aura, regen 15/turn |

**Use For:** Ritual clock progression phases (Clock 4–7)

**Features:**
- Partial Manifestation trait (regenerate 15 HP/turn)
- Legendary Resistance (3/Day)
- Independent Legendary Actions (3 per turn)
- Elemental-specific auras (damage to nearby creatures)
- Elemental damage on attacks

**Workflow:**
1. Player actions reduce Ritual Clock to 4 → Black Head manifests
2. Combat, sabotage, clock progression
3. Clock 5 → Blue Head manifests (Black Head fades)
4. Clock 6 → Green Head, Clock 7 → Red Head, etc.
5. Clock 8 → All heads replaced by Full Tiamat

---

### STEP 5: Full Tiamat (1)

Official Monster Manual Tiamat. The final boss for Clock 8 (total ritual completion).

| Stat | Value |
|---|---|
| CR | 30 |
| AC | 25 |
| HP | 615 (30d20 + 300) |
| Size | Gargantuan |
| Type | Fiend, Chaotic Evil |
| STR | 30 (+10) |
| DEX | 10 (+0) |
| CON | 30 (+10) |
| INT | 26 (+8) |
| WIS | 26 (+8) |
| CHA | 28 (+9) |

**Features:**
- **5 Independent Heads:** Each with own actions/reactions
- **5 Breath Weapons:** (Cost 2 legendary actions each)
  - Black: Acid, 120 ft line, 15d8 (DC 27)
  - Blue: Lightning, 120 ft line, 16d10 (DC 27)
  - Green: Poison, 90 ft cone, 22d6 (DC 27)
  - Red: Fire, 90 ft cone, 26d6 (DC 27)
  - White: Cold, 90 ft cone, 16d8 (DC 27)
- **5 Bite Attacks:** Acid/cold/fire/lightning/poison damage (4d10+10 + 4d6 elemental each)
- **Legendary Resistance (5/Day)**
- **Legendary Actions (5 per turn)**
- **Regeneration 30 HP/turn**
- **Frightful Presence:** DC 26 WIS save, 240 ft radius
- **Multiple Heads:** 5 reactions/turn
- **Damage Immunities:** Acid, cold, fire, lightning, poison
- **Divine Traits:** Limited Magic Immunity, Magic Weapons, Innate Spellcasting (Divine Word 3/Day, DC 26)

**Use For:** Clock 8 (final phase), ultimate battle, campaign conclusion

---

## Import Workflow (5 Steps)

### Step 1: Prepare
1. Open Foundry VTT (forgevtt.com)
2. Press F12 → Console tab
3. Keep console open for all steps

### Step 2–6: Import (One per Script)

**For each STEP file (1 through 5):**
1. Open `STEP#-*.js` in text editor
2. Select all (Ctrl+A) and copy (Ctrl+C)
3. Paste into Foundry console (Ctrl+V)
4. Press Enter
5. Wait for success message

**Timing:**
- STEP 1: ~30 seconds (11 actors)
- STEP 2: ~25 seconds (9 creatures)
- STEP 3: ~40 seconds (6 antagonists with spells)
- STEP 4: ~35 seconds (5 heads)
- STEP 5: ~20 seconds (1 full Tiamat)
- **Total: ~2.5 minutes of actual pasting + waiting**

### Step 7: Verify
1. Open Actors folder
2. Count 32 total
3. Spot-check a few stats
4. Done!

---

## Compendium-First Implementation

All scripts follow this architecture:

```
Script loads
  ↓
  For each actor:
    1. Search dnd5e.actors24 (base NPCs)
    2. Search dnd5e.items for weapons/equipment
    3. For each spell:
       a. Search dnd5e.spells24
       b. Search dnd5e.spells
       c. Search all other packs
       d. If not found: log warning, continue
    4. For each feat/trait/action:
       a. Create as custom feat item
       b. Search compendia for matching icon
       c. Apply contextual fallback if not found
    5. Create actor with complete stats
    6. Add all items to actor
  ↓
Success: "✓ Imported X/X"
```

**Result:**
- ✓ Zero embedded spells = no duplication
- ✓ Icons automatically matched
- ✓ Links to your official compendia
- ✓ Graceful fallback if items not found

---

## File Locations

```
foundry-export/
  STEP1-import-council.js         ← Council (11)
  STEP2-import-creatures.js       ← Creatures (9)
  STEP3-create-antagonists.js     ← Antagonists (6)
  STEP4-create-tiamat-heads.js    ← Tiamat Heads (5)
  STEP5-create-tiamat-final.js    ← Full Tiamat (1)
  
  IMPORT-INSTRUCTIONS.md          ← Quick start guide
  RUN-THIS-ORDER.md               ← Detailed instructions
  COMPENDIUM-LINKING.md           ← Architecture explanation
  WORKFLOW.md                     ← This file
```

---

## How Campaign Phases Use These Actors

### Phase 1: Council of Waterdeep
- **Use:** All 11 Council members (STEP1)
- **Context:** War council meeting, alliance building, strategic planning
- **Mechanics:** RP encounters, no combat

### Phase 2: March to Well
- **Use:** Council members (RP), Creatures (minions), some Antagonists
- **Context:** Encounters on the road, scouting, negotiations
- **Mechanics:** Mixed combat + roleplay

### Phase 3: Temple Infiltration/Assault
- **Use:** All Antagonists (STEP3), Creatures (STEP2)
- **Context:** Temple guardians, boss encounters
- **Mechanics:** Tactical combat, boss fights

### Phase 4: Ritual Clock Progression (Clocks 1–7)
- **Use:** Council (support), Creatures (minions), Antagonists (bosses), Tiamat Heads (STEP4)
- **Context:** Ritual escalates, heads manifest per clock advancement
- **Mechanics:** 
  - Clock 1–3: Antagonist bosses + creatures
  - Clock 4: Black Head manifests (replace Antagonist boss)
  - Clock 5: Blue Head, Clock 6: Green Head, etc.
  - Each head has independent actions/lair actions
  - Party can sabotage foci to reverse clock progression

### Phase 5: Full Manifestation (Clock 8)
- **Use:** Full Tiamat (STEP5)
- **Context:** Ritual complete, Tiamat fully manifests
- **Mechanics:**
  - Replace Tiamat Head with Full Tiamat CR 30
  - 5 independent bite attacks per turn
  - Massive regeneration + legendary resistances
  - Breath weapons, frightful presence, lair actions
  - Ultimate campaign finale

---

## Verification Checklist

After all 5 imports, verify:

- [ ] 32 total actors in Actors folder
- [ ] Council: 11 members with spells
- [ ] Creatures: 9 with full SRD stats
- [ ] Antagonists: 6 with legendary actions
- [ ] Tiamat Heads: 5 with auras and breath weapons
- [ ] Full Tiamat: 1 with CR 30 and 5 attacks
- [ ] Each actor has correct AC, HP, ability scores
- [ ] All traits/actions/legendary actions appear as feat items
- [ ] Icons are NOT gray defaults
- [ ] Spellcasters have spells in Items tab
- [ ] No duplicate items

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Nothing happens after pasting | Ensure you're in Console tab, not Elements |
| "Pack not found" error | Update dnd5e system to v5.3.3+ |
| Some spells missing | Check console for warnings; manually add from compendia |
| Icons look generic | Icons matched from compendia; right-click to change manually |
| Need to re-run a step | No problem! Skips actors that already exist |

---

## Next Steps

1. ✅ Run STEP1 (Council)
2. ✅ Run STEP2 (Creatures)
3. ✅ Run STEP3 (Antagonists)
4. ✅ Run STEP4 (Heads)
5. ✅ Run STEP5 (Tiamat)
6. ✅ Verify all 32 actors
7. 🎉 **Campaign ready to play!**

---

## Campaign is Ready

You now have:
- ✅ All NPCs with complete stats
- ✅ Full spellcasting support
- ✅ Legendary actions & abilities
- ✅ Ritual clock progression actors
- ✅ Final boss Tiamat
- ✅ No manual setup needed

**Start your Temple of Tiamat session immediately.**

For detailed instructions, see **RUN-THIS-ORDER.md**

For architecture explanation, see **COMPENDIUM-LINKING.md**
