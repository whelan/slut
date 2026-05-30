# Foundry VTT Complete Import System
## Temple of Tiamat - Final Campaign

**Status:** ✅ Ready to Deploy  
**Total Actors:** 43+ (Council 11 + Creatures 9 + Antagonists 4 + Ritual Masters 2 + Red Wizards 9 + Tiamat Heads 5 + Full Tiamat 1)  
**Time to Complete:** 15-20 minutes  

---

## 🚀 Quick Start

Copy each script below in order, paste into Foundry Console (F12 > Console), and press Enter.

### STEP 1: Import Council (11 NPCs)
📄 **File:** `STEP1-import-council.js`  
**What:** Waterdeep Council members (Dagult, Ulder, Remallia, Ontharr, etc.)  
**Result:** 11 actors with full stats

### STEP 2: Import Creatures (9 creatures)
📄 **File:** `STEP2-import-creatures-FIXED.js`  
**What:** Elementals, Golems, Wight, Fanatics, Devil  
**Result:** 9 creatures with combat stats

### STEP 3: Create Antagonists (6 NPCs)
📄 **File:** `STEP3-create-antagonists.js`  
**What:** Naergoth, Thezzar, Abishai variants  
**Result:** 6 boss-level antagonists

### STEP 4: Create Tiamat Heads (5 heads)
📄 **File:** `STEP4-create-tiamat-heads.js`  
**What:** 5 progressive Tiamat head manifestations (CR20-21)  
**Result:** Heads appear in ritual rounds 4-8

### STEP 5: Create Full Tiamat (1 boss)
📄 **File:** `STEP5-create-tiamat-final.js`  
**What:** Complete Tiamat (CR30, AC25, HP615)  
**Result:** Final boss with all mechanics

### STEP 6: Update Images
📄 **File:** `UPDATE-IMAGES.js`  
**What:** Assign portraits and tokens to all NPCs  
**Result:** All actors have character artwork

### STEP 7: Update Icons
📄 **File:** `UPDATE-ALL-NPC-ICONS.js`  
**What:** Assign proper Foundry icons to abilities  
**Result:** All abilities have proper visual icons

### STEP 8: Create Red Wizards (Location-Based)
📄 **File:** `CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js`  
**What:** 9 location-based Red Wizards + Rath Modar + Severin search  
**Result:** 
- 4 grounded chapel wizards
- 5 flying spire wizards  
- Search for official Rath Modar (if compendium available)
- Search for official Severin (if compendium available)
- All with character portraits and location traits

### STEP 9: Ritual Clock Macro
📄 **File:** `RITUAL-TRACKER-MACRO.js`  
**What:** Automated ritual progression tracker  
**How:** Create new macro in Foundry, paste script  
**Result:** Macro in hotbar for ritual automation

---

## 📋 Verification Checklist

After all 9 steps, verify:

- [ ] Actors folder `temple-of-tiamat` exists
- [ ] All 43+ actors created (Actors tab → temple-of-tiamat)
- [ ] All actors have character portraits
- [ ] All actors have proper icons on abilities
- [ ] Ritual Clock Tracker macro in Macros list
- [ ] Can drag macro to hotbar
- [ ] Test one actor sheet opens with full stats

---

## 📁 File List

```
foundry-import-final/
├── README.md (this file)
├── STEP1-import-council.js
├── STEP2-import-creatures-FIXED.js
├── STEP3-create-antagonists.js
├── STEP4-create-tiamat-heads.js
├── STEP5-create-tiamat-final.js
├── UPDATE-IMAGES.js
├── UPDATE-ALL-NPC-ICONS.js
├── CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js
├── RITUAL-TRACKER-MACRO.js
└── QUICK-REFERENCE.md
```

---

## 🎯 What You'll Get

```
COUNCIL (11):
✓ Waterdeep leaders & allies
✓ Full 2024 stats, spells, equipment

CREATURES (9):
✓ Combat minions
✓ Elementals, Golems, Undead, Devils

ANTAGONISTS (6):
✓ Boss-level threats
✓ Naergoth, Thezzar, Abishai

RITUAL MASTERS (2):
✓ Rath Modar (Red Chapel master)
✓ Severin (final boss) [compendium search]

RED WIZARDS (9):
✓ 4 grounded chapel anchors
✓ 5 flying spire supports
✓ Location-specific traits & images
✓ Ritual mechanics tied to positions

TIAMAT MANIFESTATIONS (6):
✓ 5 progressive heads (CR20-21)
✓ 1 final form (CR30)
✓ Independent mechanics per head

AUTOMATION:
✓ Ritual Clock Tracker macro
✓ Auto-spawn heads when ritual advances
✓ Public chat notifications
```

---

## ⚠️ Important Notes

1. **All scripts are 2024 D&D 5e compliant**
2. **Spell DCs use correct formula:** 8 + ability mod + proficiency
3. **Proficiency bonuses by CR:** CR5→+3, CR9→+4, CR13→+5, CR17→+6
4. **No manual edits needed** - everything automated
5. **Severin & Rath Modar:** Script searches compendia first, uses fallback if not found
6. **Images:** 5 Red Wizard portraits cycled across 9 wizards

---

## 🔧 Troubleshooting

### "Nothing happened after pasting"
→ Make sure you're in **Console tab** (not Elements/Network)  
→ Check code pasted completely  
→ Scroll console to see output

### "Pack not found: dnd5e.creatures24"
→ Normal! Script has fallback logic  
→ Will create embedded stat blocks if packs unavailable

### "Some spells didn't add"
→ Spell might be named differently in your pack  
→ Check console for warnings  
→ Can manually add via Items → Add from Compendium

### "Image URLs showing 404"
→ Forge asset URLs depend on your world ID  
→ If images don't load, actors still work fine  
→ Can manually add artwork later

---

## 📞 Support

All scripts have comprehensive error handling and logging. Check console output for detailed feedback on what succeeded/failed.

**Ready to begin?** Start with STEP1-import-council.js!

---

**Last Updated:** May 30, 2026  
**Branch:** claude/foundry-import-plan-ey7Sf  
**Status:** Production Ready ✅
