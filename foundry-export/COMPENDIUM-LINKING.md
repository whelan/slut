# Compendium-Linked Import – Spell and Item Management

## Overview

The updated import macro uses your **existing Foundry compendia** instead of embedding spell and item data. This approach:

✓ Avoids duplication of spells and items  
✓ Lets you use the official dnd5e system compendia  
✓ Keeps the macro file smaller (1.1 MB instead of larger)  
✓ Allows you to update spells/items centrally in Foundry  

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

## Adding Spells Post-Import

After running the import macro:

### Method 1: Add from Compendium (Recommended)

1. Open an actor's sheet (e.g., Severin)
2. Go to **Items** tab
3. Click **Add Item** → **Item from Compendium**
4. Search for spell name (e.g., "Fireball", "Hold Monster")
5. Select from dnd5e spells compendium and click **Create Item**
6. Repeat for each spell

### Method 2: Copy Spells from Another Actor

1. If you have an actor with the spell already (e.g., another wizard):
2. Open that actor's **Items** tab
3. Drag the spell item to the target actor
4. Or: Right-click spell → **Copy ID** → paste in target actor

### Method 3: Batch Add (For DMs)

If many actors need the same spells:
1. Create a "Spell Template" actor with all common spells
2. Use Foundry's actor duplication features or manually copy items

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

### Previous Approach ❌
- Embedded 28 spell items in the macro
- Duplicated spells already in your compendia
- Made file larger
- Spells couldn't be updated centrally

### New Approach ✓
- 0 spell items embedded
- Links to your official dnd5e compendia
- Smaller file size (1.1 MB vs. larger)
- Spells update with your Foundry system
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
