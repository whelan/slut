# Elite Red Wizards from Official 2024 Mage

## What This Does

Instead of recreating stat blocks manually, this script:

1. **Finds the official 2024 Mage** in your Foundry compendia
2. **Clones it** (preserves all official spells, actions, abilities)
3. **Customizes the clone** with:
   - Elite Red Wizard names
   - Character artwork (portraits + tokens)
   - Thayan alignment & biography
   - Thayan-specific traits
4. **Creates 3 complete NPCs** ready to use in combat

## Key Advantage

✅ **All spells and actions come from official Foundry compendium**
- No manual spell entry needed
- Updates automatically if Foundry patches spells
- Guaranteed 2024-compliant stat blocks
- Full mechanics (damage, save DCs, etc.)

## The Three Elite Red Wizards

| Name | Base | Role | Special Trait |
|---|---|---|---|
| **Magus Thallid** | Official Mage | Evocation Specialist | Evocation Mastery (allies resist spell damage) |
| **Magus Szass** | Official Mage | Ritual Master | Ritual Mastery (duration +1 min, ritual defense) |
| **Magus Zalathorm** | Official Mage | Divination Expert | Draconic Insight (free divination 1/day) |

## How to Use

### Step 1: Run the Script

```
1. Copy: ELITE-RED-WIZARDS-FROM-OFFICIAL-MAGE.js
2. Paste in Foundry console (F12 > Console)
3. Press Enter
4. Wait for: "Successfully created 3 elite Red Wizards!"
```

### Step 2: Update Icons (Optional)

If you want proper Foundry icons:
```
1. Copy: UPDATE-ELITE-RED-WIZARD-ICONS.js
2. Paste in Foundry console
3. Press Enter
```

### Step 3: Ready to Play!

All three elite Red Wizards now exist in `temple-of-tiamat` folder with:
- ✅ Official 2024 Mage stat block as base
- ✅ All spells linked to compendia
- ✅ All actions from official source
- ✅ Custom names and artwork
- ✅ Thayan traits added on top

## What If Official Mage Isn't Found?

The script will search:
1. `dnd5e.creatures24` (2024 official creatures)
2. `dnd5e.creatures` (fallback creatures pack)
3. `dnd5e.actors24` (2024 official actors)
4. `dnd5e.actors` (fallback actors)

If none contain "Mage", check:
- Is dnd5e system installed?
- Are packs enabled in your world?
- What is your dnd5e system version?

## Script Output Example

```
🧙 Creating elite Red Wizards from official 2024 Mage...

Step 1: Finding official 2024 Mage...

Searching in dnd5e.creatures24...
✓ Found official Mage in dnd5e.creatures24

Step 2: Creating elite Red Wizards from official Mage base...

✓ Created: Magus Thallid the Shadowborn (base: official Mage)
  ✓ Added 3 Thayan traits
  ✓ All spells and actions from official Mage preserved

✓ Created: Magus Szass the Defiler (base: official Mage)
  ✓ Added 3 Thayan traits
  ✓ All spells and actions from official Mage preserved

✓ Created: Magus Zalathorm the Draconic (base: official Mage)
  ✓ Added 3 Thayan traits
  ✓ All spells and actions from official Mage preserved

✅ Successfully created 3 elite Red Wizards!
   All based on official 2024 Mage stat block
   All spells and actions from official compendium
   Added Thayan customization traits
   Ready for combat in Temple of Tiamat
```

## Differences from Other Approaches

| Feature | Manual | From Official Mage |
|---|---|---|
| **Source** | Recreated stats | Official compendium |
| **Spells** | Manually added | From compendium |
| **Actions** | Manually created | Official entries |
| **Updates** | Manual if changed | Auto via Foundry |
| **Accuracy** | Manual entry risk | 100% official |
| **Setup time** | 5-10 min | 1 minute |

## In Temple of Tiamat Combat

Use these as:
- **Ritual support:** 1 elite wizard + 4-5 minions
- **Solo encounter:** CR 6 Szass as boss
- **Supporting allies:** 1-2 elite wizards with Rath Modar/Severin

All maintain **official 2024 Mage mechanics** while being **customized for Thay**.

---

## Troubleshooting

**"Official 2024 Mage not found in any compendium!"**
→ Check your dnd5e system version and ensure packs are enabled

**Script runs but no actors appear**
→ Check Foundry actors folder → look for `temple-of-tiamat` folder
→ Check browser console for error messages

**Spells showing as "unlinked" after creation**
→ Normal - Foundry compendium linking sometimes needs a refresh
→ Save actor and reload, they should relink
