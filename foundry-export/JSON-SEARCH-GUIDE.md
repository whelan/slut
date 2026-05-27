# JSON Compendia Search Guide

## What This Macro Does

The `search-all-compendia-json.js` macro:

1. ✅ **Searches ALL compendia** (Actor, Item, Spell, Feature, etc.)
2. ✅ **Finds exact matches** (Council NPCs, Antagonists, Creatures)
3. ✅ **Searches base stat blocks** (Noble, Knight, Mage, Priest, etc.)
4. ✅ **Outputs results as JSON** (easy to analyze)
5. ✅ **Prints human-readable summary** (what's found/missing)

---

## How to Run

### Step 1: Open Foundry Console
- Press **F12**
- Click **Console** tab

### Step 2: Run the Macro
1. Open: `foundry-export/search-all-compendia-json.js`
2. **Copy entire content**
3. **Paste into console**
4. **Press Enter**

### Step 3: Wait for Output
The macro will:
- Scan all packs
- Print JSON results
- Show summary
- Save results to `window.COMPENDIA_SEARCH_JSON`

---

## Understanding the JSON Output

### Structure
```json
{
  "timestamp": "2026-05-27T10:30:00Z",
  "council": {
    "Dagult Neverember": [
      {
        "name": "Noble",
        "pack": "dnd5e.creatures",
        "packName": "D&D 5e SRD Creatures",
        "type": "Actor",
        "id": "xyz123"
      }
    ],
    "Remallia Haventree": []  // Empty = not found
  },
  "antagonists": { ... },
  "baseStatBlocks": { ... },
  "creatures": { ... },
  "spells": { ... },
  "summary": {
    "councilFound": 9,
    "councilTotal": 11,
    ...
  }
}
```

### Key Fields

- **name**: What was found (e.g., "Noble")
- **pack**: Pack ID (e.g., "dnd5e.creatures")
- **type**: Document type (Actor, Item, Spell, etc.)
- **id**: Internal ID (used for importing)

---

## Reading the Summary

After the macro runs, you'll see:

```
📋 SUMMARY:

  Council NPCs Found: 9/11
  Antagonists Found: 3/4
  Base Stat Blocks Found: 7/10
  Creatures Found: 5/10
  Spells Found: 6/8
```

### What This Means

**Found = 9/11** → 9 Council NPCs exist in your compendia, 2 don't

**Not Found Examples:**
```
✗ NOT FOUND:

  Council: King Melandrach
  Council: Remallia Haventree
  Antagonist: Magus Thezzar
```

These need to be **created manually** using templates from FOUNDRY-NPC-UPGRADE-GUIDE.md

---

## Example Output

### Council NPC Found
```json
"Dagult Neverember": [
  {
    "name": "Noble",
    "pack": "dnd5e.creatures",
    "packName": "D&D 5e SRD Creatures",
    "type": "Actor",
    "id": "y3sAqd7m1HXUxKD0"
  }
]
```

**Means:** Import "Noble" from dnd5e.creatures and rename to "Dagult Neverember"

### NPC Not Found
```json
"King Melandrach": []
```

**Means:** Not in any compendia - create manually

---

## Next Steps After Search

### 1. Analyze Results
Review the JSON output. Note:
- Which NPCs are found
- Which packs they come from
- Which NPCs need manual creation

### 2. Import Found NPCs
Use `import-from-compendia-macro.js` to automatically import found NPCs

### 3. Create Missing NPCs
For NPCs not found:
- Open FOUNDRY-NPC-UPGRADE-GUIDE.md
- Find 2024-stat block for the NPC
- Create manually in Foundry

---

## Copying JSON for External Analysis

If you want to analyze the JSON outside Foundry:

1. After macro runs, right-click in console
2. Select "Copy object"
3. Paste into a text editor
4. Save as `search-results.json`
5. Use JSON analyzer/formatter

**Or** use browser DevTools → Application → Console → Look for `window.COMPENDIA_SEARCH_JSON`

---

## Troubleshooting

### "Macro runs but no output"
- Check browser console (F12 → Console tab should have output)
- Make sure JavaScript is enabled
- Refresh page and try again

### "All results are empty arrays"
- Your compendia might not be loaded
- Reload Foundry world
- Check that dnd5e system is installed

### "Only gets some NPCs"
- This is normal - not all NPCs are in official compendia
- Create missing ones manually using guides

---

## What Each Pack Contains

### Actor Packs (dnd5e.creatures, etc.)
- Monsters, NPCs, creatures
- Examples: Noble, Knight, Mage, Cultist, Wight

### Item Packs (dnd5e.items)
- Weapons, armor, equipment, magic items
- Examples: Longsword, Plate Armor, Ring of Protection

### Spell Packs (dnd5e.spells)
- All playable spells
- Examples: Fire Bolt, Fireball, Magic Missile

### Feature Packs (dnd5e.class-features, etc.)
- Class abilities, traits, actions
- Examples: Action Surge, Spellcasting, Legendary Action

---

## Expected Results for D&D 5e 2024

### Should Be Found
```json
"Council": {
  "Dagult Neverember": "Noble",
  "Ulder Ravengard": "Knight",
  "Ontharr Frume": "Priest",
  "Taern Hornblade": "Mage",
  "Sir Isteval": "Knight"
}
```

### Might Not Be Found
```json
"Council": {
  "King Melandrach": [],
  "Remallia Haventree": [],
  "Crimson Maccath": [],
  "Nyh Ilmichh": []
}
```

These are often regional NPCs or specialized roles not in official SRD.

### Antagonists
```json
"Antagonists": {
  "Naergoth Bladelord": ["Wight"] or [],
  "Severin": ["Cult Fanatic"] or [],
  "Rath Modar": ["Red Wizard"] or []
}
```

Depends on whether Rise of Tiamat module is installed.

---

## Workflow Summary

```
1. Run search-all-compendia-json.js
   ↓
2. Review JSON output
   ↓
3. Note what's found vs missing
   ↓
4. Run import-from-compendia-macro.js (for found NPCs)
   ↓
5. Create missing NPCs manually (use templates)
   ↓
6. Add weapons/spells to all NPCs
   ↓
7. Done! Ready to play
```

---

**Ready? Run the macro in Foundry console!** 🔍
