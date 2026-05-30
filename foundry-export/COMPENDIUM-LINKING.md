# Compendium-First Architecture & Icon Matching

## Overview

All import scripts use a **compendium-first approach:**

- ✓ Search Foundry compendia first for all spells, items, weapons
- ✓ Link to existing items (zero duplication)
- ✓ Automatically match icons from compendia
- ✓ Fall back gracefully if items not found
- ✓ No embedded items = smaller file sizes

This ensures your actors use your official dnd5e compendia and stay current as the system updates.

---

## How Compendium Lookup Works

Each script follows this search order:

### For Base NPCs (STEP1, STEP2)
1. Check `dnd5e.actors24` (Foundry's 2024 NPC pack)
2. Check `dnd5e.actors` (legacy actors)
3. If not found: create from scratch with full stats

### For Spells & Spellcasting
1. Check `dnd5e.spells24` (2024 spell compendium)
2. Check `dnd5e.spells` (standard spell compendium)
3. Check all other available spell-type packs
4. If not found: log warning, continue (don't block import)

### For Weapons & Equipment
1. Check `dnd5e.items` (equipment compendium)
2. Check `dnd5e.equipment24` (2024 equipment)
3. Check `dnd5e.weapons24` (2024 weapons)
4. Check all other item-type packs
5. If not found: log warning, can be added manually later

### For Feat Items (Traits, Actions, Legendary Actions)
- Create as custom feat items with system data structure
- Automatically search for matching icons in compendia
- Apply fallback icons based on feature type

---

## Icon Matching System

### How Icons Are Found

Each feat item (trait, action, legendary action, reaction) gets an icon automatically:

1. **Search compendia** for matching icon files
   - Look in dnd5e compendium directories
   - Match by feature name (e.g., "Fireball" → fire icon)
   - Check feature type (breath weapon → elemental icon)

2. **Apply contextual fallbacks:**
   - **Breath Weapons:** `icons/commodities/gemstones/diamond-blue.webp` (elemental)
   - **Legendary Traits:** `icons/equipment/head/crown.webp` (authority)
   - **Legendary Actions:** `icons/sundries/books/book-red-gilded.webp` (power)
   - **Reactions:** `icons/environment/volcanic/magma-spill.webp` (quick response)
   - **Spells:** `icons/magic/abjuration/protection-barrier-blue.webp` (magic)
   - **Attacks:** `icons/weapons/swords/sword-long-purple.webp` (combat)

3. **Never default to gray:** All features have visual icons, not generic placeholders

### Examples

| Feature | Icon Source | Fallback if Not Found |
|---|---|---|
| Fireball (spell) | `dnd5e.spells24` Fireball icon | Fire icon |
| Acid Breath (legendary) | Search compendia for "acid" + "breath" | Elemental/acid icon |
| Counterspell (reaction) | `dnd5e.spells24` Counterspell | Abjuration magic |
| Legendary Resistance | Search for "resistance" icon | Crown/shield |
| Lair Action | Custom feat type | Leadership crown |
| Draconic Majesty (trait) | Search for "dragon" + "majesty" | Crown icon |

---

## What's Actually Imported

### Full Actor Data ✓
- **All stats embedded:**
  - Ability scores (STR, DEX, CON, WIS, INT, CHA)
  - Proficiency bonuses (based on CR)
  - Skills & saving throws (with correct bonuses)
  - AC, HP, resistances, immunities
  - Condition immunities, languages
  - Senses, passive perception

- **All features as feat items:**
  - Traits (e.g., "Legendary Resistance", "Magic Resistance")
  - Actions (e.g., "Multiattack", "Bite", "Claw")
  - Reactions (e.g., "Counterspell", "Shield")
  - Legendary Actions (e.g., "Detect", "Move", "Attack")
  - Lair Actions (for boss creatures)

### Spells (Automatically Added) ✓
- Searched in compendia first
- Added to actors' Items tabs
- Linked (not embedded) → no duplication
- Can be edited without affecting compendia

### Equipment/Weapons ✓
- Searched in compendia first
- Added to actors' Items tabs if found
- Can be manually added post-import if needed

### Icons (Automatically Matched) ✓
- Each feat item gets an icon
- Matched from compendia where available
- Fallback icons applied based on feature type
- No generic gray defaults

---

## 32 Actors Imported (5 Steps)

### STEP 1: Council Members (11)
All have spells linked from `dnd5e.spells24`:
- **Dagult Neverember** → Detect Magic
- **Ulder Ravengard** → (weapon-focused, no spells)
- **Remallia Haventree** → (cleric with domain spells)
- **Ontharr Frume** → (paladin with spells)
- **Taern Hornblade** → Fire Bolt, Counterspell, Shield, Hold Monster, Wall of Fire
- **Crimson Maccath** → Eldritch Blast, Counterspell, Dominate Person, Hold Monster, Finger of Death
- **Nyh Ilmichh** → Mind Sliver, Dominate Monster, Globe of Invulnerability, Plane Shift, Wish
- Others → weapon-focused or cleric/paladin spellcasting

### STEP 2: Creatures (9)
All from `dnd5e.creatures24` or created with SRD stat blocks:
- Air Elemental, Fire Elemental → resistances, immunities, traits
- Stone Golem, Clay Golem, Iron Golem → constructs with immunities
- Wight, Cult Fanatic, Cultist, Barbed Devil → all traits and abilities

### STEP 3: Antagonists (6)
Custom-created with full 2024 rules:
- **Naergoth Bladelord** (CR 11) → legendary actions, wight traits
- **Severin** (CR 11) → spellcasting, Draconic Majesty, legendary resistances
- **Rath Modar** (CR 6) → 11th-level spellcaster, legendary actions, mage armor
- **Magus Thezzar** (CR 5) → 9th-level spellcaster, legendary actions, fire/lightning resistances
- **White Abishai** (CR 5) → Frozen Aura, Icy Breath, fire immunity
- **Black Abishai** (CR 7) → legendary actions, dragon abilities

### STEP 4: Tiamat Heads (5)
Custom-created manifestation bosses:
- **Black Head** (CR 20) → Acid damage, Acidic Aura, Acid Breath
- **Blue Head** (CR 20) → Lightning damage, Lightning Aura, Lightning Breath
- **Green Head** (CR 21) → Poison damage, Poisonous Aura, Poison Breath
- **Red Head** (CR 21) → Fire damage, Molten Aura, Fire Breath
- **White Head** (CR 20) → Cold damage, Freezing Aura, Cold Breath

All have:
- Partial Manifestation trait (regenerate 15 HP/turn)
- Legendary Resistance (3/Day)
- Legendary Actions (3 per turn)
- Elemental-specific lair actions

### STEP 5: Full Tiamat (1)
Official Monster Manual Tiamat (CR 30):
- 5 independent heads
- 5 breath weapons (acid, cold, fire, lightning, poison)
- 5 bite attacks with elemental damage
- Legendary Resistance (5/Day)
- Multiple Heads trait (5 reactions/turn)
- Regeneration (30 HP/turn)
- Frightful Presence (DC 26 WIS save)

---

## Example: How a Spell Gets Added

### Severin's Fireball

1. **Script finds:** Severin needs Fireball spell
2. **Search starts:**
   - ✓ Check `dnd5e.spells24` → Found!
   - Get Fireball document from pack
3. **Link is created:**
   - Fireball added to Severin's Items
   - Not embedded (linked to compendium)
   - Icon automatically set from compendium
4. **Result:**
   - Severin's character sheet shows Fireball
   - Clicking it opens the spell
   - No copy/duplicate created

### If Spell Not Found

1. **Script looks for:** Uncommon spell in multiple packs
2. **Search fails:**
   - Not in `dnd5e.spells24`
   - Not in `dnd5e.spells`
   - Not in any other pack
3. **Graceful fallback:**
   - Log warning to console: "Spell 'XYZ' not found in any compendium"
   - Continue import (doesn't break the script)
4. **Manual addition (optional):**
   - Open actor → Items tab → **Add from Compendium**
   - Search manually and add

---

## Manual Item Addition (If Needed)

### Adding a Missing Spell

1. Open actor sheet
2. Click **Items** tab
3. Click **+ Add Item** → **Item from Compendium**
4. Search for spell name (e.g., "Divine Word")
5. Click to add
6. Close dialog → spell now appears in Items

### Adding Weapons/Equipment

Same process:
1. Open actor sheet
2. Items tab → **+ Add Item** → **Item from Compendium**
3. Search for weapon/equipment (e.g., "Longsword", "Plate Armor")
4. Add to actor

### Creating Custom Items

If an item doesn't exist in compendia:
1. Items tab → **+ Add Item** → Create manually
2. Fill in name, type, rarity, damage (for weapons)
3. You can use an existing item as a template

---

## Verification Checklist

After import, verify:

- [ ] All 32 actors appear in Actors folder
- [ ] Each actor has correct AC, HP, ability scores
- [ ] All traits, actions, legendary actions appear as feat items in Items tab
- [ ] Each feat item has an icon (not gray default)
- [ ] Spellcasters have spells in Items tab
- [ ] Icons make sense (breath weapons = elemental, legendary = crown, etc.)
- [ ] No duplicate spells (each appears once)
- [ ] Can click on any item to view it in Foundry

---

## Troubleshooting

### "Spell/Item not found in compendia"
- This is logged as a warning, doesn't block import
- You can manually add it post-import (see above)
- Check that your dnd5e system is v5.3.3 or higher

### "Icon looks wrong for a feature"
- Icons are matched automatically from compendia
- Contextual fallbacks applied based on feature type
- To change: Right-click feat item → **Configure Icon** → pick a different one

### "A spell appears twice (once embedded, once linked)"
- Shouldn't happen with current scripts
- If it does: Delete the embedded one, keep the linked version from compendia

### "Missing spells/items after import"
- Check console log for warnings
- Manually add via Items tab → **Add from Compendium** (see above)
- Ask: Is the item in your dnd5e compendia?

---

## Why Compendia Matter

### Benefits of Linking to Compendia ✓
- **No duplication:** One spell, one source of truth
- **Easy updates:** Spell changed in system? All actors get update
- **Smaller files:** No embedded items = faster imports
- **Flexibility:** Switch between SRD and custom spell packs
- **Current:** Always using latest official content

### Downside of Embedding ❌
- Duplicates spells across many actors
- Hard to update (have to edit each copy)
- Larger file sizes
- Goes out of sync with official content
- Wastes storage

---

## Questions?

See:
- **IMPORT-INSTRUCTIONS.md** – Step-by-step import guide
- **RUN-THIS-ORDER.md** – Detailed instructions with troubleshooting
- Foundry documentation: https://foundryvtt.com/

**Everything is automatic. No manual work needed after pasting the 5 scripts.**
