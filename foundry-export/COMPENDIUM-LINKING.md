# Automatic Compendium-Linked Import

## Overview

The import macro automatically searches your **Foundry compendia** and adds spells to actors. This approach:

✓ **Fully automatic** – spells added during import, no manual work  
✓ Avoids duplication of spells and items  
✓ Uses the official dnd5e system compendia  
✓ Keeps the macro file smaller (1.1 MB)  
✓ Falls back gracefully if spells not found  

---

## What's Included in the Import

### ✓ Imported Automatically
- **58 Actors** with full stat blocks (AC, HP, abilities, saves, skills, CR)
- **88 Feat Items** (traits, special abilities, actions, legendary actions)
- **12 Journals** with campaign lore and session prep
- **3 Scenes** with battlemap backgrounds
- **All artwork** (portraits, tokens, scene backgrounds)

### ✗ NOT Embedded (Add Manually)
- **Spells** – Add from your dnd5e spells compendium
- **Magic Items** – Add from your dnd5e items compendium
- **Standard Weapons/Armor** – Use from compendia or create custom

---

## Automatic Spell Addition

The import macro automatically:

1. **Finds** your dnd5e spells compendium (or any pack labeled "spell")
2. **Searches** for each required spell by name
3. **Copies** matching spells from the compendium into each actor's Items
4. **Logs** any missing spells but continues (won't break import)

Spells are added immediately after actors are created, so when import completes, all spellcasters already have their spells.

---

## Manual Spell Addition (If Needed)

If a spell wasn't found in your compendia:

1. Open the actor's sheet
2. Go to **Items** tab
3. Click **Add Item** → **Item from Compendium**
4. Search for spell name (e.g., "Fireball", "Hold Monster")
5. Select from dnd5e spells compendium and click **Create Item**

---

## Copying Spells Between Actors

If you want to copy spells manually:

1. Open an actor with the spell (e.g., Severin)
2. Open **Items** tab
3. Right-click spell → **Copy** (or drag to target actor)
4. Open target actor → **Items** tab → **Paste**

Or use Foundry's built-in compendium browser to add the same spell to multiple actors.

---

## Spell Lists by Actor

Here are the spells that should be added to each spellcaster:

### **Severin, High Wyrmspeaker** (CR 20)
- **Cantrips:** Detect Magic, Eldritch Blast, Fire Bolt, Mind Sliver, Speak with Animals
- **1st-level:** Shield
- **5th-level:** Counterspell, Dominate Person, Hold Monster, Wall of Fire
- **6th-level:** Eyebite, Globe of Invulnerability
- **7th-level:** Finger of Death, Plane Shift
- **8th-level:** Dominate Monster
- **9th-level:** Wish

### **Taern Hornblade** (CR 6)
- **Cantrips:** Fire Bolt
- **1st-level:** Counterspell, Detect Magic, Shield
- **2nd-level:** Hold Monster, Wall of Fire

### **Crimson Maccath** (CR 6)
- **Cantrips:** Eldritch Blast
- **3rd-level:** Counterspell, Dominate Person, Hold Monster
- **4th-level:** Finger of Death

### **Nyh Ilmichh** (CR 6)
- **Cantrips:** Mind Sliver
- **2nd-level:** Dominate Monster, Globe of Invulnerability, Plane Shift
- **3rd-level:** Wish

### **Other Spellcasters**
- **Blue Abishai** – Counterspell, Plane Shift
- **Rath Modar** – Dominate Person
- **Dagult Neverember** – Detect Magic

---

## Why This Approach?

### Old Approach ❌
- Embedded 28 spell items in the macro
- Duplicated spells already in your compendia
- Made file larger
- Manual spell addition needed post-import

### Current Approach ✓
- **Automatic spell lookup and addition** – no manual work
- 0 spell items embedded (queries compendia instead)
- Links to your official dnd5e compendia
- Smaller file size (1.1 MB)
- Spells are current with your Foundry system
- Graceful fallback if spells not found
- You control which spell version (official SRD vs. custom)

---

## Adding Other Items

### Magic Items
Similar to spells – add from your dnd5e items compendium:
1. Open actor sheet → **Items** tab
2. **Add Item** → **Item from Compendium**
3. Search for item name
4. Add to actor

### Weapons & Armor
- Most NPCs don't need specific weapons in Foundry
- Their stat blocks include attack bonuses and damage
- Add weapons if you want visual flavor or to track specific magic items

### Custom Items
If an item doesn't exist in your compendia:
1. Create it manually in Foundry
2. Or use one of the built-in compendium items as a base
3. Right-click → **Create Item** and customize

---

## Troubleshooting

### Spells not appearing after adding them?
- Refresh the actor sheet (close and reopen)
- Check that the spell was added to the correct compendium
- Verify dnd5e system is up to date (v5.3.3 recommended)

### Can't find a spell in compendia?
- It may not be in the official SRD
- Create a custom spell item in Foundry and add it manually
- Or: Check if a different name variant exists

### Actor stats look wrong?
- Stat blocks are still fully embedded (AC, HP, saves, skills)
- Only spells/items are pulled from compendia
- Check the actor's **Attributes** tab for full stat block

---

## Verification Checklist

After import and adding spells:

- [ ] All 58 actors imported successfully
- [ ] Actors have correct AC, HP, CR, abilities
- [ ] All 88 traits/actions/legendary actions appear in Items tab
- [ ] Spells added from compendia appear in actor sheets
- [ ] Journals and scenes imported correctly
- [ ] Token artwork displays properly
- [ ] No duplicate spells in any actor

---

## Questions?

See the full workflow at: `foundry-export/WORKFLOW.md`

Import instructions: `foundry-export/IMPORT-INSTRUCTIONS.md`
