# DM Master Guide: Tiamat Ritual Session (10 Rounds)

**Complete runbook for running the Temple of Tiamat finale—from prep through session end.**

---

## 📋 Pre-Session Setup (2 hours before game)

### Step 1: Foundry Setup (5 minutes)

**Create all antagonists in Foundry:**

1. **Open your Foundry world** at forgevtt.com
2. **Run main script** → `foundry-import-antagonists/CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js`
   - Press F12 → Console tab
   - Copy entire script
   - Paste and press Enter
   - Watch for `✅ ALL ANTAGONISTS CREATED AND READY`
3. **(Optional) Verify stats** → `foundry-import-antagonists/UPDATE-RATH-MODAR.js`
   - Repeat steps above if you want 100% stat confirmation
   - Ensures Rath Modar is 2024 compliant

**Verify all 11 NPCs exist in Foundry:**
- [ ] Rath Modar (CR 9, Red Chapel)
- [ ] Severin (CR 9, Sanctuary)
- [ ] 9 Red Wizards (all CR 4):
  - [ ] Azuri (Blue Chapel - entrance)
  - [ ] Alabaster (White Chapel)
  - [ ] Verdian (Green Chapel)
  - [ ] Obsidian (Black Chapel)
  - [ ] Cerulean, Platinum, Viridian, Obsidian II, Vermillion (flying at spires)

---

### Step 2: Physical Prep (15 minutes)

**Print or prepare these materials:**

From `session-prep/checkliste.md`:
- [ ] Pre-session checklist (fill in focus status, army clock)
- [ ] Physical round counter (d10 or tokens, 1-10) — **THIS IS YOUR RITUAL CLOCK**
- [ ] Physical army clock tracker (0-8)
- [ ] Initiative tracker sheet (party + Severin + Tiamat)

From `session-prep/10-ROUND-RITUAL-BREAKDOWN.md`:
- [ ] Print or bookmark the full 10-round breakdown
- [ ] Highlight or tab Rounds 1-3 (party enters Blue Chapel)
- [ ] Have Round 4-8 ready (Tiamat head emergence)
- [ ] Keep Rounds 9-10 visible for final combat

**Atmosphere prep:**
- [ ] Have opening boxed text ready (in `checkliste.md`)
- [ ] Know Tiamat presence escalation text (clock-based)
- [ ] Have NPC dialogue/demeanor notes ready

---

### Step 3: Campaign State (10 minutes)

**Starting Round:**

Round 1 begins with Ritual Clock at 1. Progression continues through Round 10.

**Foci Status (Narrative & Mechanical):**

Check `session-prep/checkliste.md` for focus integrity:
- [ ] Black (Acid): Intact / Destroyed
- [ ] Blue (Lightning): Intact / Destroyed
- [ ] Green (Mist): Intact / Destroyed
- [ ] Red (Ember): Intact / Destroyed
- [ ] White (Frost): Intact / Destroyed

**How they matter:**
- Intact foci provide environmental hazard narrative ("acid pools form", "lightning arcs")
- Destroyed foci remove those hazards from the temple
- Purely narrative—do NOT modify round progression
- Round progression is automatic: Round 1 → Round 10 (unless stalled in Rounds 1-3 by wizard deaths)

---

### Step 4: NPC Preparation (10 minutes)

**Know key NPC stats/abilities:**

| NPC | AC | HP | Key Ability |
|---|---|---|---|
| Rath Modar | 16 | 130 | Spell Save DC 17, Globe of Invulnerability, Counterspell |
| Severin | 15 | 230 | Legendary Actions (3/rnd), Mask of Dragon Queen, Phase 2 at 115 HP |
| Red Wizards (all) | 15 | ~25 | Spell DC 16, Firebolt/Fireball, location-specific traits |

**Pre-combat positions:**
- 4 wizards at ground-level chapels (around central apse)
- 5 wizards at spires 40-50 feet overhead
- Rath Modar in Red Chapel (Area 6)
- Severin at top of central spire (Area 13, 100 feet high)

---

## 🎮 During Session: The 10 Rounds

### General Pacing

**Read aloud the round header** ("ROUND 1: Ambush in the Blue Chapel")

**For each round:**
1. Announce current round number ("Round 4: White Head Emerges")
2. Read key NPC actions from the breakdown
3. Resolve attacks/spells (use Foundry for rolls)
4. Ask "What do you do?" for party turn
5. Describe environmental changes (Tiamat's manifestation, hazards)

**Key mechanics each round:**
- **Round Counter:** Visibly move d10/token (shows progression 1-10)
- **Head Emergence:** One per round Rounds 4-8 (White → Black → Green → Blue → Red)
- **Environment:** Announce hazards (cold, acid, poison, lightning zones as heads emerge)
- **Progression Stalls:** Only Rounds 1-3 can stall if fewer than 5 wizards chanting

---

### ROUNDS 1–3: Blue Chapel Entry & Disruption Window

**The party's ONLY chance to stop round progression.**

**Key facts:**
- Party enters Area 1 (Blue Chapel)
- Magus Azuri immediately fights with Fireball
- Progression STALLS if fewer than 5 wizards are chanting (need 5 of 9 total)
- If Azuri dies → only 4 wizards left → progression BLOCKED until party fixes it
- Flying wizards don't engage until party reaches main cathedral (Area 7)

**DM Focus:**
- Track Azuri's status (alive, fighting, or retreating)
- **If Azuri killed:** Progression stalls at Round 1, 2, or 3 (party wins this window!)
- **If Azuri flees to main cathedral:** Ritual resumes (5+ wizards chanting again)
- Announce "Progression BLOCKED—only 4 of 5 wizards chanting" if Azuri dies
- Make sure flying wizards don't attack until party is visible in open apse

**Round progression:**
- Round 1: BLOCKED if Azuri fights (only 4 wizards) → stays at Round 1
- Round 2: Depends on Scenario A (Azuri dead = blocked) or B (Azuri retreats = advances)
- Round 3: If Azuri survived & returned, progression can advance to Round 4

---

### ROUNDS 4–8: Tiamat Manifestation

**One head emerges per round. Progression is AUTOMATIC—cannot be stopped.**

**Head Schedule (one per round):**
- **Round 4:** White head emerges + bites
- **Round 5:** Black head emerges + Severin gains +2 to saves/attacks
- **Round 6:** Green head emerges + all three heads attack
- **Round 7:** Blue head emerges + Severin becomes immortal (min 3 HP)
- **Round 8:** Red head emerges + **Tiamat FULLY MANIFEST** + joins initiative

**Each round action sequence:**
1. **Start:** Announce round number and head emergence
2. **NPCs:** Red Wizards cast spells, Rath Modar casts (or hides), Severin acts
3. **Tiamat:** All emerged heads attack (bites + potential breath weapons)
4. **Hazards:** Announce environmental damage (cold, acid, poison, lightning)
5. **Party Turn:** Ask "What do you do?"
6. **End:** Update round counter visibly

**DM duties:**
- **Track round progression** (move d10 visibly each round)
- Track Tiamat's head HP (5 heads at 30 HP each for destruction)
- Call out environmental hazards (DCs 15-16, damage 2d6-7d6)
- Track party HP and available healing
- **Do NOT allow progression to stall** (automatic Rounds 4-10)

---

### ROUNDS 9–10: Final Combat

**Tiamat fully manifested and furious. All 11 antagonists engaged.**

**Win conditions (pick one):**
1. **Kill Severin** → Portal closes, Tiamat retreats
2. **Destroy all 5 masks** → Tiamat weakened, battle continues but winnable
3. **Hold until reinforcements** → Metallic dragons + alliance arrive
4. **Creative solutions** → Collapse temple, dispel ritual, etc.

**DM tactics:**
- Tiamat focuses on highest-damage dealers (Barbarian, Wizard)
- Red Wizards target lowest-HP characters
- Rath Modar (if still alive) uses Counterspell to block party disruption
- Severin fights to death (can't be killed while Tiamat manifest, but healing stops at 3 HP)

---

## 📊 Quick Reference: NPC Actions by Round

| Round | Status | Rath Modar | Severin | Red Wizards | Tiamat |
|---|---|---|---|---|---|
| 1 | **BLOCKED** (4 wizards only) | Ready defense | Fails to advance | 4 chanting | Dormant |
| 2 | **Scenario A: Blocked / B: Advances** | Fireball/Counter | Attempts advance | 4-5 chanting | Dormant |
| 3 | **Scenario A: Blocked / B: Advances** | Wall of Fire | Chants harder | All attacking | Portal tears |
| 4 | **PROGRESSES** | Fireball | Combat mode | Offensive spells | ⚪ White head |
| 5 | **PROGRESSES** | Wall of Fire | +2 saves/attacks | Higher spells | ⚪⚫ Black head |
| 6 | **PROGRESSES** | Confusion | Hellish Chains | Barrage | ⚪⚫🟢 Green head |
| 7 | **PROGRESSES** | Mislead (hidden) | Immortal (min 3) | Peak offense | ⚪⚫🟢🔵 Blue head |
| 8 | **COMPLETE** | Hidden, watches | Free to attack | Full offense | ⚪⚫🟢🔵🔴 RED MANIFEST |
| 9 | **SUSTAINED** | Hidden, observing | Full combat | Coordinated | All 5 heads attack |
| 10 | **SUSTAINED** | Hidden, contingency | Fight to death | Full offense | Relentless assault |

---

## 🎯 DMing Style Tips

### Reading Descriptions
- **Bold NPC names** when they act (so players know who's attacking)
- **Bold spell names** so players hear the threat
- **Announce damage amounts** immediately ("Fireball hits for 22 fire damage, DEX save DC 17")
- **Show ritual clock updates** visibly (move your d10 or token on table)

### Pacing
- Don't read every NPC action verbatim—summarize when repetitive
- Example: "The five flying wizards rain spells down: Lightning Bolt, Cone of Cold, Cloudkill, Scorching Burst, and Fireball. Roll saves."
- **Pause for party reactions** between rounds
- **Ask "What do you do?" clearly** so turns are crisp

### Engagement
- **Announce round progression visibly** ("Round 5 begins. The Black head emerges. You can FEEL Tiamat pushing through")
- **Use demeanor quotes** from NPCs (Azuri: "INTRUDERS!", Severin: "THE QUEEN CANNOT BE STOPPED")
- **Describe environmental changes** (cold zones forming, acid pooling, lightning arcing—describe per focus status)
- **Track healings and resources** visibly so party knows what's available
- **Make it clear in Rounds 1-3:** "If you kill this wizard, progression STOPS"
- **Make it clear after Round 4:** "Tiamat's manifestation is unstoppable now—your job is survival"

### Player Agency
- **Rounds 1-3:** Make it clear the party CAN disrupt the ritual
- **Rounds 4-8:** Shift focus to "hold on, reinforcements are coming"
- **Rounds 9-10:** Present clear win conditions (kill Severin, destroy masks, survive)
- **Allow creative solutions** (Earthquake spell, desperate rituals, etc.)

---

## 📝 End of Session Notes

Fill in `checkliste.md` post-session:

- [ ] Clock level when Severin fell: ____
- [ ] Which foci were intact? ____
- [ ] Resources used (spells, potions): ____
- [ ] What surprised players positively? ____
- [ ] What should be adjusted? ____
- [ ] Aftermath events? ____

---

## 🔗 Related Documents

**Before running the session, read these in order:**

1. **`tyranny-of-dragons-kampagne.md`** – Full campaign context (read first)
2. **`session-prep/checkliste.md`** – Pre-session checklist (fill in ritual/army clock)
3. **`session-prep/10-ROUND-RITUAL-BREAKDOWN.md`** – The tactical breakdown (read Rounds 1-3 carefully before session)
4. **`session-prep/TACTICAL-REVIEW-BLUE-CHAPEL-ENTRY.md`** – Deep analysis of Rounds 1-3 entry (for your understanding)

**During session, have open:**

- **`session-prep/10-ROUND-RITUAL-BREAKDOWN.md`** – The master reference
- Physical ritual clock tracker
- Initiative sheet
- NPC stat cards (from Foundry)

---

## ✅ You're Ready!

Two Foundry scripts. Three documents to read. One master breakdown.

Print this guide, fill out the checklist, and the session runs itself.

**10 rounds. Tiamat rising. Your table will remember this night.** 🐉

---

**Questions?** Check the TACTICAL-REVIEW or checkliste docs. Everything you need is in `session-prep/`.
