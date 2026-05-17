# Post-Import Foundry Setup Guide

After running the foundry-import tool and uploading content to your forgevtt world, follow these steps to complete the setup and prepare for your session.

## Step 1: Verify Actors Were Created

1. **Log in to your forgevtt world**
2. **Open the Actors tab** (left sidebar)
3. **Verify the following exist:**
   - ✓ 4 Player Characters: Axar Runes, Daxx Drake, Frygtløs, Twilight Ventress
   - ✓ 3 NPCs: Severin, Naergoth Bladelord, Council of Waterdeep
4. **Click on a PC actor** (e.g., Axar Runes)
   - Check that abilities, AC, HP are populated
   - Review the Biography section for character details

## Step 2: Assign PCs to Players

1. **Go to World Settings** (gear icon, bottom left)
2. **Under "Actors," for each PC:**
   - Click the actor name
   - Under "Permissions," set ownership to the corresponding player user
   - Example: Assign "Axar Runes" actor to player "axar"
3. **Players can now control their characters** during sessions

## Step 3: Verify Journals Were Created

1. **Open the Journals tab** (left sidebar)
2. **Verify the following exist:**
   - ✓ Campaign Overview — Lore, faction info, current phase
   - ✓ Ritual Clock Tracker — Clock status and manifestation stages
   - ✓ DM Playbook (from tiamat-finale-plan.md) — Encounter sequences, boss stats
   - ✓ [NPC Name] – Profile — NPC personality, motivations, dialogue (3 NPCs)
   - ✓ Session prep journals — DM notes for encounters, scene context

**Click journals to view content.** All markdown has been converted to HTML for readability.

## Step 4: Set Up Temple Scenes

### 4.1: Load Scene 1 (The Maw)

1. **Click "Scenes" tab** (left sidebar)
2. **Click "Temple – Level 1: The Maw"** to open the scene
3. **Scene Configuration:**
   - **Width / Height:** Already set to 1536×1536
   - **Grid:** Already set to 150px per square (5ft squares)
   - **Background:** Empty. To add:
     - Go to **Scene Settings** (right-click scene name or settings icon)
     - Under "Scene Properties," find **Background**
     - Click file browser → navigate to `art/finale/output/`
     - Select `01-level-3-the-crown-battlemap.png` (or appropriate image)
     - Click "Update Scene"

### 4.2: Configure Grid & Lighting (Optional)

1. **In the scene, click the grid icon** (top toolbar)
2. **Set visibility:**
   - Check "Show Grid" for players
   - Uncheck "Show Grid" if you prefer to hide grid from players
3. **To add lighting:**
   - Use "Light Creation Tool" (torch icon, top left)
   - Click on scene to place light sources
   - Example: Torches (bright radius 40ft, dim 80ft)
   - Example: Magical light (bright 60ft, dim 120ft)

### 4.3: Add Walls (Optional, for Lighting/Blocking)

1. **In the scene, use the Wall Creation Tool** (wall icon, top left)
2. **Click to draw walls** between terrain features
3. **Walls serve:**
   - **Sight blocking:** Tokens can't see through
   - **Movement blocking:** Tokens can't pass through
   - **Door blocking:** Can open/close (if configured)

**Note:** If not using dynamic lighting, you can skip walls.

### 4.4: Place Starting Tokens (Recommended)

1. **For the first encounter in this scene:**
   - Click on actor (from left sidebar actors list) and drag to scene
   - Or: Use "Token Creation Tool" (person icon) and select actor
2. **Place enemy tokens** at encounter start positions
   - Example: 3 Dragonwing guards at the temple gates
3. **Right-click token → "Save as Scene Token"** to persist position

### 4.5: Repeat for Scenes 2 & 3

Follow the same process for:
- **Temple – Level 2: The Fivefold Sanctum** (2048×2048, 5 foci zones)
- **Temple – Level 3: The Crown** (1536×1536, ritual circle + boss arena)

## Step 5: Test Party Setup

1. **Assign a test player** (or log in as a player)
2. **Open your assigned PC actor**
3. **Verify you can:**
   - ✓ View character sheet (abilities, skills, spells)
   - ✓ Open biography (click book icon)
   - ✓ Click journal links from biography

## Step 6: Test Combat (Optional Dry-Run)

1. **Load Scene 1 (The Maw)**
2. **Place 1–2 enemy tokens** (e.g., guards)
3. **Have players control their PC tokens**
4. **Run 1–2 rounds of combat:**
   - Roll initiative (press 'R' on token)
   - Use attack actions (see character sheet)
   - Check that AC matches source markdown (11 for Axar, 17 for others)
5. **Verify spell/attack saves work** (right-click spell → roll save DC)

## Step 7: Configure Ritual Clock Macro (Optional)

The tool auto-generated a "Ritual Clock Tracker" journal with clock status.

To automate clock advancement:

1. **Create a new Macro** (Macros tab, right sidebar)
2. **Name:** "Advance Ritual Clock"
3. **Type:** Script
4. **Content:**
   ```javascript
   // Advance ritual clock by 1
   const tracker = game.journal.getName("Ritual Clock Tracker");
   if (!tracker) {
     ui.notifications.error("Ritual Clock Tracker journal not found");
     return;
   }
   
   const currentClock = tracker.pages[0]?.text.match(/Current: (\d+)/)?.[1] || 0;
   const newClock = Math.min(8, parseInt(currentClock) + 1);
   
   ui.notifications.info(`Ritual Clock advanced: ${currentClock} → ${newClock}`);
   ```
4. **Click the macro to run it** (clock advances and notifies all players)

## Step 8: Import Ritual Clock Roller (Advanced)

For real-time clock mechanics, create a rollable table:

1. **Create Rollable Table** (Tables tab)
2. **Name:** "Clock Advancement"
3. **Add entries:**
   - 1-2: Clock +1 (ritual surge)
   - 3-4: Clock +0 (no change)
   - 5-6: Clock -1 (foci sabotage)
4. **In scenes, roll the table** when triggers occur

## Step 9: Test DM Notes

1. **Open "Ritual Clock Tracker" journal**
2. **Verify clock status and manifestation stages** are readable
3. **Open "DM Playbook" journal**
4. **Navigate between pages** (encounter plans, boss stats, etc.)
5. **Right-click journal → "Show to Players"** if you want shared context

## Step 10: Final Checklist

Before your session, verify:

- [ ] All 4 PCs assigned to player users
- [ ] 3 temple scenes loaded and configured with backgrounds
- [ ] Grid visible at 150px (5ft squares)
- [ ] Lighting/walls optional but configured if using dynamic lighting
- [ ] Ritual Clock Tracker journal accessible to DM
- [ ] DM Playbook journal open and bookmarked
- [ ] Test combat round passed (initiative, attacks, spells)
- [ ] Players can see their character sheet and bio
- [ ] All NPCs visible in Actors list

## Quick Reference: Key Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Roll initiative | R (on token) |
| Move token | Drag (left mouse) |
| Measure distance | Ctrl + Drag |
| Create token | T (then select actor) |
| Create wall | W |
| Create light | L |
| Pan camera | Spacebar + Drag |
| Zoom | Scroll wheel |
| Open actor sheet | Double-click token |

## Troubleshooting

### "Actor not found"
- Verify import completed successfully (check import log)
- Check Actors tab for the actor
- If missing, run import again or manually add actor

### "Can't control PC token"
- Verify PC actor is assigned to your user (World Settings)
- Right-click token → "Control" to take control
- Check permissions (user must have "Owner" access to actor)

### "Journal pages not showing"
- Click journal entry name to expand pages
- Check that pages were created (should see multiple pages listed)
- Edit page content to fix formatting if needed

### "Scene background not appearing"
- Verify image file exists at path
- Try re-uploading image and updating scene background
- Check image format (should be PNG, JPG, or WebP)

### "Grid doesn't align"
- Right-click grid → "Grid Configuration"
- Set grid size to 150px (for 5ft squares)
- Adjust image scale if map is larger/smaller than expected

## Next Steps

After completing this setup:

1. **Run Session 1** using Temple – Level 1 scene
2. **Track ritual clock** in Ritual Clock Tracker journal as party progresses
3. **Update session log** after each session (in Session Log journal)
4. **Edit encounter notes** in DM Playbook as needed

## Reference: Generated Content Map

| Item | Type | Location | Notes |
|------|------|----------|-------|
| Axar Runes, Daxx Drake, etc. | Actors (PCs) | Actors tab | Assign to players |
| Severin, Council, Naergoth | Actors (NPCs) | Actors tab | Referenced in encounters |
| Campaign Overview | Journal | Journals tab | Campaign lore, faction info |
| Ritual Clock Tracker | Journal | Journals tab | Clock status + manifestation stages |
| DM Playbook | Journal | Journals tab | Encounter sequences, boss stats |
| [NPC] – Profile | Journal | Journals tab | Personality, motivations, dialogue |
| Session Prep docs | Journal | Journals tab | DM notes per encounter |
| Temple – Level 1 | Scene | Scenes tab | 1536×1536, 5ft grid |
| Temple – Level 2 | Scene | Scenes tab | 2048×2048, 5ft grid (5 foci) |
| Temple – Level 3 | Scene | Scenes tab | 1536×1536, ritual circle + boss |

**Artwork:** Download from `art/finale/output/` and upload to Foundry as needed.

---

**Ready to run!** Load your first scene, place tokens, and begin the Tyranny of Dragons finale.
