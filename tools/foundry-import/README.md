# Foundry Adventure Builder

Convert this campaign's markdown files into a **single Foundry Adventure JSON file**
that imports into your forgevtt world in one click via the [Adventure Importer / Exporter](https://foundryvtt.com/packages/adventure-import-export) module.

**Target:** Foundry v13, dnd5e system v5.2.x

---

## What gets imported

| Source | → Foundry | Notes |
|---|---|---|
| `spillere/*.md` (4 PCs) | Character actors | Skip with `--skip-pcs` if PCs already exist |
| `npcs/severin.md`, `naergoth-bladelord.md` | NPC actors + linked journals | Stat blocks are placeholders — fill in Foundry |
| `npcs/council-of-waterdeep.md` | 12 individual NPC actors + combined journal | Auto-split on `## Name` sections |
| `tyranny-of-dragons-kampagne.md` | Journal: Campaign Overview | Full lore |
| `session-prep/*.md` | Journals (one per file) | DM-only notes, encounter plans |
| (generated) | Journal: Ritual Clock Tracker | Clock + manifestation stages |
| (generated) | 3 Scenes: Temple Levels 1–3 | Grid set to 5 ft/150 px; **backgrounds added manually in Foundry** |

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
StatBlockExtractor      → dnd5e v5.2.x NPC actor JSON
PartyCharacterBuilder   → dnd5e v5.2.x character actor JSON
        ↓
adventure_builder       → JournalEntry, Scene, Adventure documents
        ↓
adventure.json          (single file, ready to import)
```

---

## Known limitations

- **NPC stat blocks are placeholders.** The source markdown is narrative, not stat-block format
  (`**AC** 18 / **HP** 142 / ...`). Actors come through with HP 0 / AC 10 / CR 1; fill in inside Foundry,
  or supply real stat blocks in the markdown and the extractor will pick them up.
- **Scene backgrounds are empty.** Upload battlemap images (e.g. from `art/finale/output/`) in Foundry
  after import.
- **Spells/items are not linked** to the dnd5e compendium. Markdown lists drop in as plain text in
  biographies; recreate as proper items inside the Foundry sheet if you need rollable spells.

---

## Files

```
tools/foundry-import/
├── main.py                  CLI entry point
├── converter.py             orchestrates the full conversion
├── markdown_parser.py       markdown → structured data
├── stat_extractor.py        dnd5e v5.2.x actor JSON builder
├── adventure_builder.py     JournalEntry, Scene, Adventure documents
├── requirements.txt         Python dependencies
├── QUICKSTART.md            5-minute path
└── README.md                this file
```
