# Foundry VTT Campaign Importer

Python tools to convert the Temple of Tiamat campaign from markdown into a Foundry VTT import macro.

**Target:** Foundry v13 on Forge VTT (forgevtt.com)  
**System:** dnd5e v5.2.3+  
**Content:** 54 actors, 12+ journals, 3 scenes with artwork

---

## Quick Start

```bash
# 1. Generate import macro + test macro
python3 main.py --input-dir ../../ --output ./export --macro --test

# 2. Generate token artwork
python3 token_generator.py ../../art/finale/output ./export

# 3. Upload tokens to Forge VTT asset manager
# (see WORKFLOW.md for detailed steps)

# 4. Fill image-urls.json with Forge URLs

# 5. Regenerate macro with URLs embedded
python3 main.py --input-dir ../../ --output ./export --macro

# 6. In Foundry console: paste export/import-macro.js and run
```

**Full workflow:** See [WORKFLOW.md](WORKFLOW.md)

---

## Installation

```bash
pip install -r requirements.txt
```

---

## What Gets Imported

| Entity | Count | Location | Notes |
|--------|-------|----------|-------|
| **Actors** | 54 | NPCs folder | Full stat blocks, artwork, spells |
| **Journals** | 12+ | Journals folder | Campaign lore, session prep, NPC profiles |
| **Scenes** | 3 | Scenes folder | Temple levels with artwork backgrounds |
| **Folders** | 3 | Root | NPCs, Journals, Scenes |

### Content Breakdown

| Source | → Foundry | Count |
|--------|-----------|-------|
| `spillere/*.md` (4 PCs) | Character actors | 4 (or skip with `--skip-pcs`) |
| `npcs/severin.md`, `naergoth-bladelord.md` | NPC actors + journals | 2 |
| `npcs/council-of-waterdeep.md` | Individual NPC actors + registry journal | 12 |
| `enemy_roster.py` SRD creatures | Full stat blocks from local SRD | 11 |
| `enemy_roster.py` homebrew enemies | Level-15-tuned creatures | 22 |
| `enemy_roster.py` prisoners | Named NPCs (optional allies) | 7 |
| `tyranny-of-dragons-kampagne.md` | Campaign Overview journal | 1 |
| `session-prep/*.md` | DM notes + encounter plans | 5+ |
| (generated) | Ritual Clock Tracker journal | 1 |
| (generated) | Temple Levels 1–3 scenes | 3 |

---

## Tools

### `main.py` – Main CLI

Convert campaign markdown into Foundry import format.

**Usage:**

```bash
python3 main.py [OPTIONS]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--input-dir DIR` | Campaign markdown root (default: `.`) |
| `--output DIR` | Output directory (default: `out/`) |
| `--macro` | Generate JavaScript import macro (recommended) |
| `--test` | Also generate single-NPC test macro |
| `--skip-pcs` | Skip player characters |
| `--compendium` | Generate compendium packs (v13 alternative) |
| `--module` | Generate Foundry module package |

**Examples:**

```bash
# Generate import macro (recommended for Forge)
python3 main.py --input-dir ../../ --output ./export --macro

# Also generate test macro
python3 main.py --input-dir ../../ --output ./export --macro --test

# Skip PCs (if already in Foundry)
python3 main.py --input-dir ../../ --output ./export --macro --skip-pcs
```

### `token_generator.py` – Circular Token Maker

Generate circular tokens from portraits with D&D brown border.

**Usage:**

```bash
python3 token_generator.py <art_directory> [output_directory]
```

**Example:**

```bash
python3 token_generator.py ../../art/finale/output ./export
```

**Output:**

- Circular PNG tokens with transparent background
- D&D brown border (RGB 139,69,19)
- Saved to `export/tokens/`

---

## Workflow: Import with Forge VTT URLs

### Step 1: Generate Files Locally

```bash
# Generate macro + test macro
python3 main.py --input-dir ../../ --output ./export --macro --test

# Generate tokens
python3 token_generator.py ../../art/finale/output ./export
```

### Step 2: Upload to Forge VTT Asset Manager

1. Log in to forge-vtt.com
2. Go to **Game > Assets**
3. Upload all files from `export/tokens/` + portrait artwork
4. Copy URLs from Forge for each file

### Step 3: Fill image-urls.json

Edit `export/image-urls.json`:

```json
{
  "severin": {
    "portrait": "https://forge-vtt.com/bazaar/assets/...",
    "token": "https://forge-vtt.com/bazaar/assets/..."
  },
  "rath-modar": {
    "portrait": "https://forge-vtt.com/bazaar/assets/...",
    "token": "https://forge-vtt.com/bazaar/assets/..."
  },
  ...
}
```

### Step 4: Regenerate Macro with URLs

```bash
python3 main.py --input-dir ../../ --output ./export --macro
```

This updates `import-macro.js` with your Forge VTT URLs.

### Step 5: Import in Foundry

1. Open Foundry world
2. Press F12 → "Console" tab
3. Copy entire contents of `export/import-macro.js`
4. Paste into console and press Enter
5. Wait for "Campaign import complete!" notification
6. Check Actors, Journals, Scenes sidebars

**Done!** All content imported with artwork linked.

---

## Image Handling

### With Forge VTT URLs (Recommended)

- Small file (~1 MB)
- Artwork hosted on Forge VTT
- Images auto-linked in Foundry
- Best for Forge VTT

**Setup:** Fill `image-urls.json` with Forge asset manager URLs (see WORKFLOW.md)

### Without URLs (Self-Contained)

- Large file (~128 MB)
- Images embedded as base64
- No need to manage files separately
- Slower to generate/paste

**Setup:** Just run `main.py --macro` without filling URLs

---

## Architecture

```
markdown files (campaign content)
        ↓
MarkdownParser          → sections, tables, raw content
StatBlockExtractor      → dnd5e v5.2.x actor JSON
        ↓
EnemyBuilder            → 54 total actors (SRD + homebrew + prisoners)
AssetLinker             → auto-link artwork + extract spells
        ↓
URLLoader               → apply Forge VTT URLs (if provided)
        ↓
macro_builder           → generate JavaScript import macro
        ↓
import-macro.js         (paste in Foundry console)
```

---

## Files

```
tools/foundry-import/
├── main.py                      CLI entry point
├── converter.py                 orchestration
├── markdown_parser.py           markdown → structured data
├── stat_extractor.py            dnd5e v5.2.x actor JSON
├── enemy_builder.py             actor generation
├── enemy_roster.py              enemy data tables
├── asset_linker.py              artwork + spell linking
├── url_loader.py                image URL mapping
├── macro_builder.py             JavaScript import macro
├── test_macro_builder.py        single-NPC test macro
├── token_generator.py           circular token creation
├── image-urls.json.template     URL mapping template
├── requirements.txt             Python dependencies
├── WORKFLOW.md                  step-by-step guide
└── README.md                    this file
```

---

## Troubleshooting

### Macro won't paste in console

- Ensure you're in the **"Console"** tab (not "Elements")
- Copy **entire contents** of macro file
- Try refreshing page before pasting

### Artwork not showing

- Verify URLs in `image-urls.json` start with `https://`
- Test URLs in browser to ensure they're valid
- Regenerate macro with `python3 main.py --macro`

### Tokens fail to generate

- Install Pillow: `pip install Pillow`
- Ensure portrait files exist in `art/finale/output/`

### ModuleNotFoundError

```bash
pip install -r requirements.txt
```

---

## Notes

- **File size:** With URLs ~1 MB, without URLs ~128 MB
- **Foundry v13:** JavaScript macro required (Adventure Importer not supported)
- **Automation:** No manual Foundry UI steps — fully automated
- **Editing:** All content editable in Foundry after import

---

See [WORKFLOW.md](WORKFLOW.md) for detailed step-by-step instructions.
