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
- [ ] Pre-session checklist (fill in ritual clock starting value, army clock, focus status)
- [ ] Physical ritual clock tracker (d10 or tokens, 0-8)
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

**Fill in the checklist from `session-prep/checkliste.md`:**

Ritual Clock Starting Value:
- [ ] Council of Waterdeep defensive tactics? → Clock +2
- [ ] Fast march? → Clock +1
- [ ] Thay alliance intact? → Clock –1
- [ ] Draakhorn sabotaged? → Clock –1
- [ ] Leosin/Harpers delivered map? → Clock –1
- [ ] Naergoth delayed group? → Clock +1
- [ ] Long time in Thay? → Clock +1

**Starting Clock: _____ (write on physical tracker)**

Foci Status (from Level 2):
- [ ] Black (Acid): Intact / Destroyed
- [ ] Blue (Lightning): Intact / Destroyed
- [ ] Green (Mist): Intact / Destroyed
- [ ] Red (Ember): Intact / Destroyed
- [ ] White (Frost): Intact / Destroyed

**→ Each intact focus at transition to Level 3 = +1 clock**

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

**For each NPC in the round:**
1. Read their entry from the breakdown
2. Resolve their actions (use Foundry for NPC rolls)
3. Update ritual clock if Severin's Ritual Action succeeds
4. Describe environmental changes (Tiamat's manifestation, hazards)

**Key mechanics each round:**
- **Ritual Clock:** Track advancement (Severin uses Ritual Action if ritual continues)
- **Head Emergence:** Announce when each head appears (Round 4-8, one per round)
- **Environment:** Announce hazards (cold, acid, poison, lightning as heads emerge)

---

### ROUNDS 1–3: Blue Chapel Entry & Disruption Window

**The party's best chance to disrupt the ritual.**

**Key facts:**
- Party enters Area 1 (Blue Chapel)
- Magus Azuri immediately fights
- Ritual FAILS if fewer than 5 wizards chant (currently 9 total)
- If Azuri dies, ritual drops to 4 wizards → STALLED
- Flying wizards don't engage until party reaches main cathedral

**DM Focus:**
- Track whether Azuri survives
- If killed → ritual stalls; party wins Round 1-3 window
- If flees to main cathedral → ritual resumes; party must decide to pursue
- Make sure flying wizards don't attack until party is in open apse

**Clock advancement:**
- Round 1: FAILS (only 4 wizards if Azuri fights) → Clock stays 0
- Round 2: Depends on Scenario A (Azuri dead) or B (Azuri retreats)
- Round 3: If Azuri survived and returned, Clock advances

---

### ROUNDS 4–8: Tiamat Manifestation

**One head emerges per round. Ritual becomes unstoppable.**

**Schedule:**
- **Round 4:** White head emerges
- **Round 5:** Black head emerges (Severin gains +2 to saves/attacks)
- **Round 6:** Green head emerges (all three heads bite)
- **Round 7:** Blue head emerges (Severin becomes unkillable, min 3 HP)
- **Round 8:** Red head emerges (Tiamat fully manifest, full initiative)

**Each round:**
1. Announce head emergence
2. All previous heads attack (bite + potential breath)
3. All 9 Red Wizards cast offensive spells
4. Rath Modar/Severin use spells and legendary actions
5. Party's turn
6. Environmental hazard damage (cold, acid, poison, lightning zones)

**DM duties:**
- Call out ritual clock value at start of round
- Track Tiamat's head HP (5 heads at 30 HP each)
- Call out environmental hazards (DCs, damage)
- Track party HP and healing
- Update physical ritual clock visibly for players

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

| Round | Ritual Clock | Rath Modar | Severin | Red Wizards | Tiamat |
|---|---|---|---|---|---|
| 1 | STALLS (0) | Ready defense | Ritual fails | 4 chanting | Dormant |
| 2 | Depends | Fireball/Counterspell | Attempts +1 | Scenario A/B | Dormant |
| 3 | 2-3 | Wall of Fire | Chants | All attacking | Portal tears |
| 4 | 4 | Fireball | Ritual +1 | Offensive spells | White bite |
| 5 | 5 | Wall of Fire | +2 saves/attacks | Higher-level spells | White+Black bites |
| 6 | 6 | Confusion | Hellish Chains | Heavy spell barrage | All 3 heads bite |
| 7 | 7 | Mislead (hidden) | Dominate/Control | Peak spell offense | All 4 heads bite |
| 8 | 8 | Hidden, watches | Free to attack | Full offense | Red head emerges |
| 9 | 8 | Hidden, observing | Full combat | Coordinated spells | All 5 heads, breath |
| 10 | 8 | Hidden, contingency | Fight to death | Full offense | Relentless assault |

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
- **Emphasize ritual clock value** each round ("The ritual advances to Clock 6. You can FEEL Tiamat pushing through")
- **Use demeanor quotes** from NPCs (Azuri: "INTRUDERS!", Severin: "THE QUEEN CANNOT BE STOPPED")
- **Describe environmental changes** (cold zones forming, acid pooling, lightning arcing)
- **Track healings and resources** visibly so party knows what's available

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
