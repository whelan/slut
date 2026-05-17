# Foundry VTT Campaign Import Tool

This tool converts your D&D 5e campaign markdown files into Foundry VTT JSON format and optionally uploads them directly to your forgevtt world via API.

## Features

✅ **Markdown → JSON Conversion**
- Player characters (`spillere/*.md`) → Actor sheets
- NPCs (`npcs/*.md`) → NPC actors + journals
- Campaign lore → Journal entries
- Session prep → DM notes journals
- Temple levels → Scene stubs with grid + dimensions

✅ **Foundry API Integration**
- Batch create actors, journals, scenes
- Automatic duplicate detection
- Rate limiting and retry logic
- Dry-run mode (preview before committing)

✅ **Flexible Workflow**
- JSON-only export (manual import to Foundry)
- Full API import (automated)
- Environment variables or command-line args

## Setup

### 1. Install Dependencies

```bash
cd tools/foundry-import
pip install -r requirements.txt
```

### 2. Get Your Foundry API Key

1. Log in to [forgevtt.com](https://forgevtt.com)
2. Go to **Account Settings** → **API Keys**
3. Generate a new API key
4. Copy your **World ID** (visible in world settings)

### 3. Configure Credentials

Create a `.env.local` file in this directory:

```bash
cat > .env.local << EOF
FOUNDRY_API_KEY=your_api_key_here
FOUNDRY_WORLD_ID=your_world_id_here
EOF
```

**Or** pass credentials via command-line:

```bash
python3 main.py --api-key YOUR_KEY --world YOUR_WORLD_ID
```

## Usage

### Option A: JSON Export Only

Convert markdown to JSON files (for manual import):

```bash
python3 main.py --input-dir /path/to/campaign --output json-export/
```

This outputs:
- `json-export/actors.json` — All actors (PCs, NPCs, enemies)
- `json-export/journals.json` — All journal entries (lore, session prep)
- `json-export/scenes.json` — Temple scenes (grid, dimensions)

You can then manually import these JSON files into Foundry.

### Option B: Full API Import (Dry-Run First)

Preview all changes without committing:

```bash
python3 main.py --dry-run
```

Output:
```
🔄 Converting campaign content...
📋 Converting party characters...
  ✓ Axar Runes
  ✓ Daxx Drake
  ✓ Frygtløs
  ✓ Twilight Ventress
...
[DRY RUN] Would create actor: Axar Runes
[DRY RUN] Would create actor: Daxx Drake
...
✅ Dry-run complete. No changes made to Foundry.
   Run again without --dry-run to commit.
```

### Option C: Full API Import (Live)

Upload to your Foundry world:

```bash
python3 main.py
```

This will:
1. Convert all markdown files
2. Check for duplicate actors/journals (skip if they exist)
3. Create new entities in your Foundry world
4. Log results and any errors

## Command-Line Options

```
--input-dir PATH         Root directory of campaign (default: .)
--output PATH            Output directory for JSON files (default: json-export/)
--foundry-url URL        Foundry base URL (default: https://forgevtt.com)
--api-key KEY            Foundry API key (or use FOUNDRY_API_KEY env var)
--world ID               Foundry world ID (or use FOUNDRY_WORLD_ID env var)
--dry-run                Preview changes without sending to API
--json-only              Export JSON only (skip API upload)
--env-file PATH          Path to .env file (default: .env.local)
```

## Examples

```bash
# Convert campaign to JSON only
python3 main.py --input-dir ~/Documents/campaigns/tiamat --output ~/Downloads/foundry-export/

# Full import with dry-run
python3 main.py --api-key abc123 --world world-xyz --dry-run

# Full import (live)
python3 main.py --api-key abc123 --world world-xyz

# Using .env file
python3 main.py
```

## What Gets Imported

### Actors

| Source | Type | Count | Example |
|--------|------|-------|---------|
| `spillere/*.md` | character | 4 | Axar Runes, Daxx Drake, Frygtløs, Twilight Ventress |
| `npcs/*.md` | npc | 10+ | Severin, Naergoth, Council members |
| `temple-of-tiamat/*` | creature | 20+ | Temple guards, dragons, Red Wizards |

**Details imported:**
- Ability scores (STR, DEX, CON, INT, WIS, CHA)
- AC, HP, speed, skills
- Equipment, spells, magic items
- Portrait image link

### Journals

| Source | Title | Pages |
|--------|-------|-------|
| `tyranny-of-dragons-kampagne.md` | Campaign Overview | Lore, NPCs, Current Phase |
| `npcs/*.md` | [NPC Name] – Profile | Personality, Motivations, Dialogue |
| `session-prep/*.md` | [File Name] | Multiple pages from markdown sections |
| (Generated) | Ritual Clock Tracker | Clock status, manifestation stages |

### Scenes

| Name | Dimensions | Grid |
|------|-----------|------|
| Temple – Level 1: The Maw | 1536×1536 | 150px (5ft squares) |
| Temple – Level 2: The Fivefold Sanctum | 2048×2048 | 150px |
| Temple – Level 3: The Crown | 1536×1536 | 150px |

**Note:** Scene backgrounds (battlemap images) must be added manually in Foundry after import.

## Post-Import Steps (Manual)

After a successful import, set up your Foundry world:

1. **Verify Actors**
   - Check party characters in Actors sidebar
   - Verify ability scores, skills, spells match source

2. **Link Journal Resources**
   - Open NPC actors; click biography to view linked journal
   - Check Campaign Overview journal for cross-references

3. **Configure Scenes**
   - Load each temple scene
   - Add background image:
     - Use artwork from `art/finale/output/`
     - Upload to Foundry and set as scene background
   - Set grid visibility and scale (already configured to 150px/5ft)
   - Add lighting if desired
   - Place walls if using dynamic lighting

4. **Prepare Encounters**
   - For each scene, place enemy actor tokens at start positions
   - Save token positions

5. **Configure Party**
   - In World Settings, assign PC actors to player users
   - Players can now see and control their characters

6. **Test Combat**
   - Load a scene, place tokens, run 1–2 test rounds
   - Verify initiative, AC, attacks, spell save DCs work

## Troubleshooting

### Connection Failed
- Check API key is correct (no extra spaces)
- Check world ID is correct
- Verify Foundry URL is reachable

### Duplicate Actors
- The tool automatically skips existing actors with same name
- To reimport, delete the actor in Foundry first
- Or use a different world

### Missing Spell/Item Links
- Compendium links require exact spell/item names
- If not found, items are created as custom (editable in Foundry)

### Stat Block Parse Errors
- If markdown format is non-standard, extraction may fail
- Check `json-export/` to see what was extracted
- Manually edit JSON and re-import, or edit in Foundry UI after import

## File Structure

```
tools/foundry-import/
├── main.py                 # CLI entry point
├── converter.py            # High-level conversion orchestration
├── markdown_parser.py      # Parse markdown → structured data
├── stat_extractor.py       # Extract & convert D&D stat blocks
├── foundry_api.py          # Foundry API client
├── requirements.txt        # Python dependencies
├── .env.local              # [USER-CREATED] API credentials
└── README.md               # This file
```

## Architecture

```
Markdown Files (campaign)
    ↓
MarkdownParser (extract sections, tables, stat blocks)
    ↓
ContentExtractor (high-level mapping: PCs → actors, NPCs → actors+journals)
    ↓
StatBlockExtractor (parse D&D stats → Foundry JSON schema)
    ↓
CampaignConverter (orchestrate conversion, call extractors)
    ↓
JSON Objects (actors, journals, scenes)
    ↓
[Save to JSON files] OR [FoundryAPIClient (upload via API)]
    ↓
Foundry World
```

## Notes

- **Rate limiting:** API calls are throttled to prevent overload (0.1s between requests)
- **Retries:** Failed requests automatically retry up to 3 times
- **Markdown format:** Parser assumes standard D&D markdown (tables, bold stats, sections)
- **Images:** Token portraits and scene backgrounds must be linked after import
- **Danish content:** Dialogue and room descriptions in Danish are preserved in journals

## License

Part of the Tyranny of Dragons campaign project.
