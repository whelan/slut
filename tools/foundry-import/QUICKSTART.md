# Foundry Import – Quick Start (5 Minutes)

## The Shortest Path to Playing in Foundry

### Prerequisites

- Python 3.8+
- Foundry account at forgevtt.com
- Forgevtt API key (from Account Settings → API Keys)
- Your world ID (visible in world settings)

### Installation (1 min)

```bash
cd tools/foundry-import
pip install -r requirements.txt
```

### Configuration (1 min)

**Option A: Environment Variables**
```bash
export FOUNDRY_API_KEY=your_api_key
export FOUNDRY_WORLD_ID=your_world_id
```

**Option B: .env File**
```bash
echo 'FOUNDRY_API_KEY=your_api_key' > .env.local
echo 'FOUNDRY_WORLD_ID=your_world_id' >> .env.local
```

### Import (2 min)

```bash
# Preview (no changes yet)
python3 main.py --dry-run

# Full import (creates actors, journals, scenes)
python3 main.py
```

**Output:**
```
✓ Connected to Foundry
📤 Creating actors...
  Created 7 actors
📤 Creating journals...
  Created 14 journals
📤 Creating scenes...
  Created 3 scenes
✅ Import complete!
```

### Post-Import (1 min)

1. **Log in to forgevtt.com**
2. **Actors tab** → Verify 4 PCs + 3 NPCs exist
3. **Scenes tab** → Verify 3 temple scenes exist
4. **Journals tab** → Verify lore, session prep, ritual clock

**That's it!** You can now:
- Assign PCs to players
- Load a scene and place tokens
- Run combat

## Next Steps

For detailed post-import setup (grid, lighting, token placement):
→ See **POST-IMPORT-SETUP.md**

For troubleshooting and advanced options:
→ See **README.md**

---

**Tip:** If you want to preview without API upload:
```bash
python3 main.py --json-only
```
This exports JSON to `json-export/` for manual import.
