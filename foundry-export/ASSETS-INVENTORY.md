# Asset Inventory – Ready for Forge VTT

**Status:** All 28 files ready to upload to Forge VTT Asset Manager

---

## Files by Category

### NPC Tokens (Existing Artwork)

| Filename | NPC | Type | Size |
|---|---|---|---|
| `severin-masked-token_20260516_164450_1.png` | Severin (Final Boss) | High-res token | 1.7 MB |
| `rath-modar-token_20260516_164527_1.png` | Rath Modar (Red Wizard) | High-res token | 1.8 MB |
| `elia-bronze-dragon-token_20260516_170825_1.png` | Elia (Metallic Dragon) | High-res token | 2.1 MB |
| `neronvain-green-abishai-token_20260516_164522_1.png` | Neronvain (Green Abishai) | High-res token | 2.1 MB |
| `rezmir-black-abishai-token_20260516_164509_1.png` | Rezmir (Black Abishai) | High-res token | 1.8 MB |
| `galvan-blue-abishai-token_20260516_164513_1.png` | Galvan (Blue Abishai) | High-res token | 2.4 MB |
| `veksin-young-red-wizard-token_20260516_164551_1.png` | Veksin (Red Wizard) | High-res token | 2.0 MB |
| `magus-thezzar-red-wizard-token_20260517_113119_1.png` | Magus Thezzar | High-res token | 1.8 MB |
| `dragonclaw-rogue-token_20260516_170911_1.png` | Dragonclaw (Rogue) | High-res token | 1.6 MB |
| `dragonfang-fighter-token_20260516_170907_1.png` | Dragonfang (Fighter) | High-res token | 1.8 MB |
| `red-wizard-generic-token_20260516_170916_1.png` | Red Wizard (Generic) | High-res token | 1.8 MB |

**Subtotal: 11 existing artwork files (~19.6 MB)**

---

### Council NPC Placeholders

| Filename | NPC | Type | Size |
|---|---|---|---|
| `dagult-neverember-placeholder-token.png` | Dagult Neverember | Placeholder | 2.6 KB |
| `ulder-ravengard-placeholder-token.png` | Ulder Ravengard | Placeholder | 2.5 KB |
| `remallia-haventree-placeholder-token.png` | Remallia Haventree | Placeholder | 2.6 KB |
| `ontharr-frume-placeholder-token.png` | Ontharr Frume | Placeholder | 2.6 KB |
| `delaan-winterhound-placeholder-token.png` | Delaan Winterhound | Placeholder | 2.6 KB |
| `sir-isteval-placeholder-token.png` | Sir Isteval | Placeholder | 2.7 KB |
| `taern-hornblade-placeholder-token.png` | Taern Hornblade | Placeholder | 2.5 KB |
| `king-melandrach-placeholder-token.png` | King Melandrach | Placeholder | 2.6 KB |
| `ambassador-brawnanvil-placeholder-token.png` | Ambassador Brawnanvil | Placeholder | 2.6 KB |
| `crimson-maccath-placeholder-token.png` | Crimson Maccath | Placeholder | 2.6 KB |
| `nyh-ilmichh-placeholder-token.png` | Nyh Ilmichh | Placeholder | 2.5 KB |

**Subtotal: 11 placeholder tokens (~28.4 KB)**

---

### Battlemaps & Scene Art

| Filename | Scene | Type | Size |
|---|---|---|---|
| `level-2-fivefold-sanctum-battlemap_20260516_164442_1.png` | Temple Level 2 | Battlemap | 1.9 MB |
| `level-3-the-crown-battlemap_20260516_164414_1.png` | Temple Level 3 | Battlemap | 1.7 MB |
| `plaza-23-temple-entrance-battlemap_20260516_164430_1.png` | Temple Entrance | Battlemap | 2.8 MB |
| `well-of-dragons-caldera-overview_20260516_164427_1.png` | Well of Dragons | Reference art | 3.2 MB |
| `temple-exterior-cinematic_20260516_164611_1.png` | Temple cinematic | Reference art | 2.6 MB |
| `tiamat-manifestation-portal_20260516_164617_1.png` | Portal cinematic | Reference art | 2.7 MB |

**Subtotal: 6 battlemaps & art (~14.9 MB)**

---

## Summary

| Category | Count | Size |
|---|---|---|
| Existing artwork tokens | 11 | 19.6 MB |
| Council placeholder tokens | 11 | 28.4 KB |
| Battlemaps & scene art | 6 | 14.9 MB |
| **Total** | **28** | **~34.5 MB** |

---

## Upload Instructions

1. Go to Forge VTT → **Asset Library** → **Upload Files**
2. Select all 28 files from `foundry-export/assets/`
3. Wait for upload (may take 2–3 minutes for large files)
4. Copy the Forge asset base URL (e.g., `https://assets.forge-vtt.com/USERNAME/WORLD/`)

---

## Optional: Replace Placeholders

The 11 placeholder tokens for Council NPCs can be replaced with:
- Official D&D art from D&D Beyond
- Generated images from Stable Diffusion / DALL-E
- Custom artwork

To replace:
1. Generate new artwork
2. Upload to Forge
3. Update `image-urls.json` with new Forge URLs
4. Regenerate macro and re-import

---

## File Naming Convention

All files follow the pattern:
```
[actor-or-scene]-[type]-token_[date]_[time]_[index].png
```

Examples:
- `severin-masked-token_20260516_164450_1.png`
- `level-2-fivefold-sanctum-battlemap_20260516_164442_1.png`
- `dagult-neverember-placeholder-token.png`

This naming is used by the macro's fuzzy matching system to link assets to actors.
