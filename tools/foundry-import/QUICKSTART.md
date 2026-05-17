# Quick Start (5 minutes)

## 1. Install (1 min)

```bash
cd tools/foundry-import
pip install -r requirements.txt
```

## 2. Generate the adventure file (30 sec)

```bash
python3 main.py --input-dir .. --output ./out --skip-pcs
```

This writes `./out/adventure.json`.

## 3. Install the importer module in Foundry (1 min)

In your forgevtt world:

- **Add-on Modules** → **Install Module**
- Search: `Adventure Importer / Exporter`
- Install and enable in your world

Module page: <https://foundryvtt.com/packages/adventure-import-export>

## 4. Import (30 sec)

- Open the module's import dialog (button in the sidebar or Settings menu, depending on the module version)
- Select `./out/adventure.json`
- Click **Import Adventure**

Done. All actors, journals, and scenes appear in your world.

## 5. Verify (2 min)

- **Actors sidebar**: 14 NPCs (12 Council members, Severin, Naergoth)
- **Journal sidebar**: ~12 entries (Campaign Overview, session prep, profiles, Ritual Clock Tracker)
- **Scenes sidebar**: 3 temple scenes (backgrounds empty — upload battlemap PNGs in scene settings)

---

## Optional flags

```bash
# Include player characters too (if they don't already exist in your world)
python3 main.py --input-dir ..

# Custom adventure name
python3 main.py --input-dir .. --name "Well of Dragons Finale"
```

## Where to put the artwork

Battlemap PNGs in `art/finale/output/` can be uploaded as scene backgrounds:

1. Open the scene
2. Scene Settings → Background → upload or browse to the PNG
3. Set grid scale (already 5 ft / 150 px)

Token portraits work the same way: open an NPC actor → set token image.
