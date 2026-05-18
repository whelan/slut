# Foundry Adventure Builder

Convert this campaign's markdown files into a **single Foundry Adventure JSON file**
that imports into your forgevtt world in one click via the [Adventure Importer / Exporter](https://foundryvtt.com/packages/adventure-import-export) module.

**Target:** Foundry v13, dnd5e system v5.2.x

---

## What gets imported

| Source | → Foundry | Notes |
|---|---|---|
| `spillere/*.md` (4 PCs) | Character actors | Skip with `--skip-pcs` if PCs already exist |
| `npcs/severin.md`, `naergoth-bladelord.md` | NPC actors + linked journals | Narrative profiles |
| `npcs/council-of-waterdeep.md` | 12 individual NPC actors + combined journal | Auto-split on `## Name` sections |
| `enemy_roster.py` SRD list | 11 SRD creatures with full stats | Cultist, Cult Fanatic, Commoner, Black Dragon Wyrmling, Air Elemental, Stone Golem, Flesh Golem, Green Hag, Wight, Mage, Barbed Devil |
| `enemy_roster.py` homebrew list | 22 level-15-tuned enemies | Dragonclaw, Dragonwing, Dragonfang, Dragonsoul, 4× Abishai (W/B/G/Blue), Frost Giant Skeleton, Dragonbone Crawler, Half-Dragon Red, Yuan-Ti, Severin Phase 1+2, Rath Modar, Veksin, 5× Tiamat heads, Naergoth wight |
| `enemy_roster.py` prisoners | 7 named NPCs | Stirleng, Stirling, Kess, Thorne, Marta, Fen, Banner Bearer |
| `tyranny-of-dragons-kampagne.md` | Journal: Campaign Overview | Full lore |
| `session-prep/*.md` | Journals (one per file) | DM-only notes, encounter plans |
| (generated) | Journal: Ritual Clock Tracker | Clock + manifestation stages |
| (generated) | 3 Scenes: Temple Levels 1–3 | Grid set to 5 ft/150 px; **backgrounds added manually in Foundry** |

**Total output:** 54 actors (or 58 with PCs), 12 journals, 3 scenes — single `adventure.json`.

---

## Quick start

```bash
cd tools/foundry-import
pip install -r requirements.txt
python3 main.py --input-dir .. --output ./out --skip-pcs
```

Output: `./out/adventure.json`

Then in Foundry:

1. Install the [Adventure Importer / Exporter](https://foundryvtt.com/packages/adventure-import-export) module in your world.
2. Open the module's import dialog.
3. Select `adventure.json`.
4. Click **Import Adventure**.

All actors, journals, and scenes appear in your world at once.

---

## CLI options

```
--input-dir PATH    Campaign root (default: .)
--output PATH       Output directory for adventure.json (default: out/)
--name STR          Adventure name shown in Foundry (default: "Tyranny of Dragons - Finale")
--skip-pcs          Skip player character actors (use when PCs already exist in Foundry)
```

---

## Architecture

```
markdown files (campaign content)
        ↓
MarkdownParser          → sections, tables, raw content
ContentExtractor        → high-level grouping (PCs, NPCs, registries, journals)
        ↓
StatBlockExtractor      → dnd5e v5.2.x NPC actor JSON (from npcs/*.md)
PartyCharacterBuilder   → dnd5e v5.2.x character actor JSON

enemy_roster.py         → SRD lookups + homebrew + prisoner data tables
SRDLoader               → parse local SRD monsters-A-Z.md → actor JSON
EnemyBuilder            → combine: 11 SRD + 22 homebrew + 7 prisoner actors
        ↓
adventure_builder       → JournalEntry, Scene, Adventure documents
        ↓
adventure.json          (single file, ready to import)
```

## Enemy stats — design notes

All homebrew enemies are tuned for **4 PCs at level 15** (Hard encounter ≈ 21,000 XP, Deadly ≈ 32,000 XP):

| Role | CR range | Examples |
|---|---|---|
| Mooks | 4-6 | Dragonclaw, White Abishai, Dragonbone Crawler |
| Skirmishers | 8-10 | Dragonwing, Black Abishai, Yuan-Ti, Half-Dragon Red, Frost Giant Skeleton |
| Officers/lieutenants | 11-14 | Dragonfang, Green Abishai, Rath Modar, Dragonsoul |
| Mini-bosses | 17 | Blue Abishai (Galvan) |
| Tiamat heads | 18 each | 5 chromatic heads, shared HP pool concept |
| Final boss | 20 / 22 | Severin Phase 1 / Phase 2 |

Stats source priority for each enemy: **local SRD** (`monsters-A-Z.md`) > **session-prep custom blocks** > **fresh homebrew tuned for level 15**. Edit `enemy_roster.py` to tweak any stat block.

---

## Automation Features

- **Artwork linking:** Token images and scene backgrounds are automatically matched from `art/finale/output/` by name
- **Spell items:** Spells listed in actor stat blocks are automatically extracted and embedded as Foundry items
- **No manual steps:** Complete import workflow is fully automated. No manual Foundry UI steps required.

## Known limitations

- **NPC stat blocks are placeholders** (except those with detailed markdown stat blocks like Severin, Rath Modar).
  The source markdown is narrative, not always stat-block format (`**AC** 18 / **HP** 142 / ...`).
  Actors with custom stat blocks pick up full stats; others come through with HP 0 / AC 10 / CR 1.
  Fill in inside Foundry, or supply real stat blocks in the markdown and the extractor will pick them up.
- **Artwork is matched by name.** If token PNG files don't exist in `art/finale/output/`, actors use default icon.
  Add artwork to that directory and re-run the converter to link.
- **Spells are extracted from markdown only.** Spell descriptions and mechanics are not linked to dnd5e compendium items.
  Extracted spell items are bare entries; link to compendium or enhance in Foundry if you need full mechanics.

---

## Files

```
tools/foundry-import/
├── main.py                  CLI entry point
├── converter.py             orchestrates the full conversion
├── markdown_parser.py       markdown → structured data
├── stat_extractor.py        dnd5e v5.2.x actor JSON builder (PCs + named NPCs)
├── adventure_builder.py     JournalEntry, Scene, Adventure documents
├── srd_loader.py            parse local SRD monsters-A-Z.md
├── enemy_roster.py          SRD list + homebrew stat blocks + prisoners
├── enemy_builder.py         build Foundry actors from the roster
├── requirements.txt         Python dependencies
├── QUICKSTART.md            5-minute path
└── README.md                this file
```
