# TEMPLE OF TIAMAT – FOUNDRY VTT LIVE PLAY GUIDE

**For running online on Forge with full round-by-round breakdown.**

---

## CURRENT STATE

- Party just entered Level 1 (Gate of Bone)
- About to face **Encounter A: Gate of Bone** (8 enemies)
- Ritual Clock: Starting value (likely 2-3 after Plaza)
- No encounter started yet

---

# LEVEL 1 – GATE OF BONE SETUP

## Scene Entry (Before Combat)

**Read in chat or voice:**

> Indenfor er luften ikke længere caldera-luft. Den er noget helt tredje.
> 
> Den er tør. Den er for varm. Den lugter af røgelse og noget under røgelsen.
> 
> I passerer gennem en bue af knogler – ribben fra noget så stort, at I kunne stå oprejst inde i brystkassen. Gulvet under jer er sort sten, men ridset af kanaler. I kanalerne strømmer lys. Fem.
> 
> Rød. Grøn. Blå. Sort. Hvid.
> 
> **What do you do?**

---

## Foundry Map Setup

### What You Need to Place

1. **Scene name:** "Level 1 – The Maw – Gate of Bone"
2. **Battlemap:** Use 70×60 ft. grid (typical Foundry default)
3. **Terrain:**
   - Two ritual channels (5 ft. wide lines down the middle) – mark as difficult terrain or hazard
   - Bone barricades (half cover, 3 per side)
   - Five staircases (at top of map, leading to Level 2)
   - Entrance (bottom of map)

### Terrain Hazards in Foundry

**Ritual Channels:**
- Mark as dynamic lighting or difficult terrain
- **Crossing costs:** DC 14 DEX save or 2d6 necrotic
- Create as a "hazard zone" if Foundry version supports it

**Bone Barricades:**
- Place 3 on left, 3 on right
- Set as half-cover (players need to note +2 AC when behind)
- Can be destroyed (DC 15 Athletics)

---

## Enemy Placement

```
            [STAIRS UP - Level 2]
  
[ Barricade ]  [ABISHAI]  [ Barricade ]
[DRAGONCLAW] [DRAGONFANG] [DRAGONCLAW]
[DRAGONCLAW]              [DRAGONCLAW]
     [DRAGONWING x2 - flying above]        

[RITUAL CHANNEL]  [RITUAL CHANNEL]

[ENTRANCE - party arrives]
```

### Foundry: Add Actors to Scene

**Step 1 – Create or Search Packs**

If you have the STEP2/STEP3 scripts run, these actors should already exist in "temple-of-tiamat" folder:
- Dragonfang Officer (1)
- Dragonwing Elite (2)
- Dragonclaw Fanatic (4)
- White Abishai (1)

**If NOT created yet:** You'll need to create them manually or use stat blocks from core dnd5e compendia.

**Step 2 – Place on Map**

In Foundry Scene, drag actors from the Actor sidebar onto the map:

| Enemy | Position | Notes |
|---|---|---|
| **Dragonfang** | Center, behind Draganclaws | Leader, doesn't move initially |
| **Dragonwing #1** | 30 ft. above center-left | Will fly immediately |
| **Dragonwing #2** | 30 ft. above center-right | Will fly immediately |
| **Dragonclaw #1** | Left front | Forms line |
| **Dragonclaw #2** | Center-left front | Forms line |
| **Dragonclaw #3** | Center-right front | Forms line |
| **Dragonclaw #4** | Right front | Forms line |
| **White Abishai** | Behind right barricade | Will use Longbow, stays behind cover |

---

## Initiative & Combat Starts

**When PCs reach the enemy formation:**

> The cultists see you and raise their weapons. The officer—a scarred man in crimson robes—steps forward.
> 
> Roll initiative.

### How Initiative Works Online

1. **In Foundry:** Combat Tracker will auto-roll for all placed tokens
2. **Dex modifier:** Dragonfang +2, Dragonwing +5, Dragonclaw +2, Abishai +2 (or as stat blocks)
3. **PC bonuses:** Apply per-PC (Daxx likely has +initiative from Insight check)

---

# ROUND-BY-ROUND PLAY (Encounter A)

## ROUND 1

### DM Actions (You Control)

**Order of operations:**

1. **Dragonwing #1 & #2 take their turn:**
   - Both **fly 30 ft. forward and upward**
   - Move to flank Axar and Twilight (highest magical threat)
   - **Hold their attack** until they can get behind party (out of melee range)
   - End positions: 40 ft. back, 15 ft. up

2. **Dragonfang Officer takes his turn:**
   - **Moves 20 ft. forward** (stay behind Draganclaws)
   - **Uses Hold Person** on **Frygtløs** (lowest CON save, likely)
   - **Target:** Frygtløs
   - **Save:** WIS DC 13
   - **Result if failed:** Frygtløs is paralyzed until end of his next turn
   - **Narrate:** *"The officer points at the giant and speaks a word of power. Golden chains of magic snap around him."*

3. **Dragonclaw line (all 4) take their turn:**
   - **Move 15 ft. forward** (stay in line formation)
   - **Ready action:** "If a PC moves adjacent, I attack with Scimitar"
   - Do NOT attack yet – waiting for party to engage
   - **Purpose:** Create a barrier

4. **White Abishai takes her turn:**
   - **Does NOT move** (stays behind barricade)
   - **Uses Longbow** vs. **Axar**
   - **Attack roll:** +3 to hit (Abishai has +2 DEX, Longbow is +1, she's AC 15 but behind half-cover)
   - **Target:** Axar Runes
   - **Damage if hit:** 1d8+1 piercing + 2d6 cold

### What Party Can Do (Round 1)

**Party's turns:** They respond to the cultist positions.

**Options:**

| PC | Action | Effect |
|---|---|---|
| **Axar** | Fireball (30 ft. cone) | Hits 3-4 Draganclaws + maybe Dragonfang. DC 15 DEX save or 8d6 fire |
| **Axar** | Hold Person on Dragonfang | DC 16 INT save; if fails, Dragonfang paralyzed |
| **Daxx** | Favored Enemy Abishai | Attack Abishai with advantage (she's dragon, he's ranger) |
| **Daxx** | Stealth to flank Dragonfang | DC 15 Stealth, get advantage on next attack |
| **Frygtløs** | If NOT paralyzed: Charge Dragonfang | Move 30 ft., use Great Axe multiattack |
| **Frygtløs** | If paralyzed: Strength save DC 13 | Try to break free |
| **Twilight** | Bardic Inspiration on Frygtløs | +1d8 to save vs. Hold Person |
| **Twilight** | Dissonant Whispers on Dragonfang | WIS DC 16 save; if fails, takes 3d6 psychic + moves 5 ft. away |

---

### Foundry: How to Track This

**In Combat Tracker:**

1. **Drag each token** to new position on map
2. **Right-click on token** → "Attack" → select target → roll
3. **Show dice rolls** in chat (everyone sees attack/save rolls)
4. **Update token HP** as damage comes in
5. **Mark tokens** with condition effects:
   - Paralyzed (Hold Person)
   - Frightened (if Twilight uses it)

**Chat messages:**

> **Dragonfang Officer** casts *Hold Person* on **Frygtløs**.
> Hold Person Save: WIS DC 13
> 
> Frygtløs, make a WIS save with your +3 modifier (total: roll + 3).

---

## ROUND 2

### By Now:

- **If Frygtløs failed Hold Person:** He's paralyzed. Dragonclaw focuses attacks on him (he can't defend well)
- **If Axar cast Fireball:** 3-4 Draganclaws likely dead or badly hurt
- **If Daxx attacked Abishai:** She's taken 1d8+cold damage
- **If Twilight used Dissonant Whispers:** Dragonfang took psychic + moved away

### DM Actions (Round 2)

**Dragonwing #1 takes turn:**
- **Flies 20 ft.** to get behind Twilight or Axar
- **Attacks with Shortsword multiattack:** +5 to hit, 1d6+3 slashing × 2
- If any hit: Twilight takes ~8 damage per hit
- **Purpose:** Break concentration on spells

**Dragonwing #2 takes turn:**
- Same as Dragonwing #1 (different target if possible)
- Attacks Axar instead (to diversify threat)

**Dragonfang Officer takes turn:**
- If Hold Person didn't work on Frygtløs: **Uses 2nd Hold Person** (he has 2/day) on **Twilight**
  - **WIS DC 13 save**
  - If fails: Twilight paralyzed
- If Hold Person worked on Frygtløs: **Moves 15 ft. forward, attacks Axar with Scimitar multiattack**
  - **Scimitar +6 to hit:** 1d6+3 slashing × 2 attacks
  - ~8 damage if both hit

**Dragonclaw survivors:**
- **Attack whoever is closest** (likely Frygtløs if paralyzed, or Axar if he cast Fireball)
- **Scimitar +4:** 1d6+2 slashing
- **Use Pack Tactics:** If 2 Draganclaws attack same target, both get advantage

**White Abishai:**
- **Uses Longbow again** vs. whoever hurt her most (if Daxx attacked, target Daxx)
- **Attack roll +3:** vs. AC

### Party's Turn (Round 2)

**Frygtløs if paralyzed:**
- Strength save DC 13 to break free

**Axar:**
- Uses spell to hit multiple enemies (Fireball again if slots available)
- Or Counterspell if Dragonfang casts something

**Daxx:**
- Attack Dragonwing (they're airborne, he can shoot up)
- Use Volley feature if available (multiple attacks)

**Twilight:**
- If paralyzed: CON save DC 13 to break free
- If free: Attack with weapon or cast spell

---

## ROUND 3+

### Momentum Shift

By now, the encounter has a clear direction:

**If party is winning (3+ enemies down):**
- Remaining Draganclaws attempt to **flee** (they're not suicidal)
- Dragonfang fights to death (he won't flee)
- Abishai **dives out from barricade** and goes melee against lowest HP PC

**If party is losing (1+ PC unconscious):**
- Double down on attacks
- Dragonfang: Scimitar + Hold Person
- Dragonwing: Keep flying, keep attacking spellcasters
- Abishai: Switch to melee (Bite + Claw combo)

### Foundry: Combat Tracker Management

**Keep updating:**
- Token positions (drag on map)
- HP values (click token, adjust in character sheet)
- Conditions (add "Paralyzed" tag to tokens that are held)
- Round counter (shows in Combat Tracker header)

---

## ENDING ENCOUNTER A

### Victory Conditions

**Party wins when:**
- All 8 enemies are unconscious, dead, or fled
- OR party reaches the stairs (enemies don't pursue)

### Clock Update

**After Encounter A resolves:**

- **Combat lasted 3+ rounds?** Clock +1
- **Combat lasted <3 rounds?** Clock +0

**In Foundry chat:**

> Combat ended. Encounter A: Gate of Bone is complete.
> 
> **Ritual Clock: ** [Update value. Show it visibly]
> 
> You've defeated the guardian force. The staircases up to Level 2 are now open.

---

# TRANSITION: ENCOUNTER B (Optional in Round Order)

**Before they go upstairs, they can encounter The Procession.**

This can happen:
- **In this location** (they see cultists marching toward ritual)
- **As they climb stairs** (hear chanting above)
- **OR skip it** if you want to keep pace

**If running it NOW (in same session):**

> As you catch your breath, a sound cuts through the temple's drone.
> 
> Singing. Not the cultists' battle cries. Something else.
> 
> From a side passage, they emerge: 20-30 people in robes, marching in perfect unison. They move like they're underwater. Their eyes are closed. Their lips move with words none of you understand.
> 
> They're walking toward the ritual.
> 
> As one, without breaking formation, **do you stop them?**

**Party choices:**
1. **Let them pass** → Clock +1, Severin advantage
2. **Combat** → 20 cultists, AC 10, HP 9 each, 0 attacks → lasts 2+ rounds → Clock +1 anyway
3. **Persuasion DC 15** → 1d6 cultists stop, Clock –1, Twilight advantage
4. **Daxx Insight DC 13** → Find one cultist to pull aside for L2 intel

**Keep it SHORT (5 minutes max). No right answer.**

---

# LEVEL 2 – THE FIVEFOLD SANCTUM (Setup)

## Scene: The Hub

Once they climb to Level 2:

> Mellemniveauet er ikke ét rum. Det er fem.
> 
> Fem platforme stråler ud fra et centralt knudepunkt som fingrene på en klo. Broerne imellem dem er smalle – ti fod brede – med intet under dem undtagen et langt fald til Niveau 1. Hver platform lyser i sin egen farve.

### Foundry: Multi-map setup

**Option 1 – Single Map with All Platforms:**
- Create a 120×120 ft. map
- Central hub: 30 ft. diameter circle
- Five platforms radiating out, 40 ft. away each
- Bridges connecting them (10 ft. wide)

**Option 2 – Separate Scenes (Easier for Online):**
- Scene: "Level 2 Hub" (central platform)
- Scenes: "Level 2 Green Foci", "Level 2 Red Foci", etc.
- Use Foundry's "Navigate to Scene" buttons for travel

**Recommendation for Forge:** Use **Option 2** (separate scenes). Easier to manage, less lag, players click to travel between platforms.

---

## The Hub (Neutral Ground)

**No enemies.** No hazards. Strategic decision point.

**Party can:**
1. **Choose which foci to sabotage first** (recommend: Green → Red → Black → White → Blue)
2. **Rest/heal** (they're safe in the hub)
3. **Scout** (send one PC to peek at a platform)

**In Foundry:**
- Create **5 buttons/doors** (one per platform)
- Label them: Green, Red, Black, White, Blue
- When PC clicks, navigate to that Scene

---

## FOCUS C – GREEN: POISON MIST GARDEN (Easiest)

### Foundry Scene Setup

**Map:** 50×50 ft. (tight platform)
- Central crystal (glowing green) in middle
- Mist effects (use fog/particle effects if available)
- Tangle of vines/terrain (half cover spots)

### Encounter

**Enemies:**
- **Green Hag** (AC 17, HP 82)
- **Yuan-Ti Mind Whisperer** (AC 14, HP 71)

### Hazard

**WIS save DC 14 (first round on platform):**
- Fail = convinced one ally is enemy for 1 round
- **Twilight immune** (Mark of Shadow)
- **Daxx advantage** (Favored Enemy)

---

### Round-by-Round: Green Foci Combat

**Round 1 (Hazard activates):**

1. **DM (you):** "As you step onto the Green platform, the mist closes around you. Make a WIS save, DC 14."
   - Axar, Daxx, Frygtløs, Twilight all roll (Twilight is immune)
   - Anyone who fails: "You see one of your allies move wrong, speak wrong. For just a moment, you're sure they're an enemy."
   - If Axar fails: He might attack Daxx or Twilight by mistake
   - If Frygtløs fails: He might attack Twilight or Axar

2. **Green Hag's turn:**
   - **Uses Illusory Appearance** to look like whoever just failed the WIS save
   - If Axar failed, Hag looks like Daxx
   - **Position:** 20 ft. away, half-hidden in mist
   - **Action:** Ready attack "when someone attacks this 'fake ally'"
   - **Narrate:** *"You see Daxx stumble forward, hand clutching at his chest. He's been hit. He's going down."*

3. **Yuan-Ti Mind Whisperer's turn:**
   - **Uses Suggestion** (DC 13 WIS save) on **Twilight** (lowest HP)
   - **Suggestion:** "Help me protect the foci. We share the same goddess."
   - **If fails:** Twilight is charmed, won't attack Yuan-Ti, might actually defend it
   - **Narrate:** *"The snake-creature's eyes lock onto you, and suddenly its concerns seem reasonable. Familiar. Almost sacred."*

### Party's Turn

**Axar:**
- Likely attacks whoever he thought was an enemy
- Once illusion breaks (2nd round), uses Dispel Magic (DC 13) to remove mist instantly
- OR uses Gust of Wind to clear it

**Daxx:**
- Not fooled (Insight check). Identifies Hag's position.
- Attacks Hag with advantage (she's his favored enemy)
- Or helps Twilight break charm

**Frygtløs:**
- If fooled: Attacks the wrong person (brief moment of party conflict – let it happen, it's dramatic)
- If not fooled: Goes straight for Hag with Great Axe

**Twilight:**
- If charmed: Doesn't attack Yuan-Ti, might defend it
- If not charmed: Uses Bard spells (Tasha's Hideous Laughter, Command, Hold Person) against Yuan-Ti
- One of her goals: **Keep party focused** (Bardic Inspiration on whoever was hit)

---

### Sabotage (End Combat)

Once enemies are dead/fled, party has 3 sabotage options:

| Option | Action | Time | DC |
|---|---|---|---|
| **Dispel Magic** | 1 action | 1 round | 13 |
| **Find crystal + crush** | Investigation check | 2 actions | 16 |
| **Twilight auto-find** | Bonus action | 1 action | AUTOMATIC |

**Narrate sabotage:**

> The mist swirls one final time. At its center, a green crystal the size of your fist pulses with sickly light. It cracks. Green light floods out, consuming the illusions, the mist, the garden that never was.
> 
> The platform goes silent.
> 
> One foci, extinguished.

### Clock Update

- **No sabotage:** Clock +1 (foci intact, will cost at Level 3)
- **Sabotage complete:** Clock +0 (foci removed, no penalty at Level 3)

---

## FOCUS D – RED: EMBER ALTAR (Moderate)

### Scene Setup

**Map:** 50×50 ft.
- Central altar with flames
- Magma tiles (5×5 ft. squares marked as hazard)
- Half a dozen cultists in red/gold robes standing around, chanting

### Encounter

**Enemies:**
- **Half-Dragon Red** (AC 14, HP 65)
- **Cult Fanatic** × 2 (AC 13, HP 33 each)

### Hazard

**Magma tiles:** DC 13 DEX save or 3d6 fire (half damage on success).

---

### Round-by-Round: Red Foci Combat

**Round 1:**

1. **Half-Dragon's turn:**
   - **Uses Frightful Presence** (DC 13 WIS save, 60 ft.)
   - Any PC who fails: **Frightened for 1 round** (disadvantage on attacks against Half-Dragon)
   - Frygtløs is most likely target (low WIS save)
   - **Narrate:** *"The red dragon-kin rears back, wings spreading. A low rumble echoes from its throat—not a sound, but a feeling. Dread."*

2. **Half-Dragon's second action (if multiattack):**
   - **Grapples the nearest PC** (likely Frygtløs or Twilight)
   - **Grapple check:** Athletics DC 19 (Half-Dragon is STR 19)
   - **If succeeds:** Grappled PC is stuck. Half-Dragon will drag toward magma tiles next round.
   - **Narrate:** *"Its claws lock around your leg. You feel the heat radiating off its scales."*

3. **Cult Fanatic × 2 turn:**
   - **Do NOT engage in combat**
   - **Bonus actions:** Both move toward the altar
   - **Primary action:** Both use **Hold the Line** or **Guard Altar** (they want to keep it lit, not fight)
   - If anyone approaches altar: **Inflict Wounds** (3d10 necrotic, +4 to hit)
   - **Narrate:** *"The priests of the red god turn to face you, chanting louder. Their hands glow with necrotic power."*

### Party's Turn

**Axar:**
- **Uses Cone of Cold** (25 ft. cone, 5d8 cold, DC 15 DEX save)
- If Half-Dragon fails save: Takes 5d8 cold (even in magma, cold is cold)
- **If 20+ damage dealt to altar in one action:** Altar extinguishes immediately
- OR uses **Fireball** (but that's suboptimal—Half-Dragon is fire-resistant)

**Daxx:**
- **Attacks grappled target** to break free them
- OR attacks Half-Dragon with advantage (dragon, ranger favored enemy)

**Frygtløs:**
- **If grappled:** Uses Strength save to break free (DC 19, he likely fails)
- **If not grappled:** Attacks Half-Dragon with Great Axe (multiattack)
- OR knocks a Cult Fanatic away from the altar

**Twilight:**
- **If grappled:** Healing Word or Misty Step to escape
- **If free:** Uses Command on Half-Dragon ("Drop!") or Tasha's Hideous Laughter (WIS DC 16) to make it harmless 1 round

---

### Sabotage

**One of three methods:**

| Method | Who | Time | Check |
|---|---|---|---|
| **Cone of Cold** | Axar | 1 action | 20+ cold damage, instant |
| **Destroy altar** | Anyone | 1 action | DC 17 Athletics |
| **Twilight Countersong** | Twilight | 1 action | DC 14 Performance, permanent |

---

### Clock Update

- **No sabotage:** +1 at Level 3
- **Sabotage:** Clock +0

---

# CONTINUING: Other Foci (Brief Guidance)

## BLACK FOCI (Acid Basin)
- **Hazard:** CON DC 13, 1d8 acid per round
- **Enemy:** Black Dragon Wyrmling (flies, hides in water)
- **Sabotage:** Dispel Magic DC 15 OR kill Wyrmling OR Athletics DC 18 (Frygtløs advantage)

## WHITE FOCI (Frost Fang Dais)
- **Hazard:** CON DC 12, –10 ft. speed cumulative
- **Enemy:** Frost Giant Skeleton (CR 9, high HP, legendary actions)
- **Sabotage:** Frygtløs crushes claw (2 rounds, DC 17 ×2, EPIC) OR Axar Fireball (25+ fire) OR Daxx finds weakness

## BLUE FOCI (Lightning Spire – HARDEST)
- **Enemy:** Blue Abishai CR 17 (AC 19, HP 195)
- **Mechanic:** Lightning Absorption (heals instead of taking damage)
- **Sabotage:** Axar Arcana DC 20 (1 round concentration, Daxx helps) OR crush crystal (AC 15, HP 60, no lightning) OR combat

---

# LEVEL 3 – THE CROWN (Final Boss)

## Scene Entry

Once they ascend from Level 2:

> Trappen op til The Crown er fyrre trin lang.
> 
> ...
> 
> På trin fyrre træder I ud.
> 
> Niveau 3 er åbent for himlen – men himlen er ikke rigtig.

### Foundry Scene

**Map:** Circular 60 ft. diameter dais
- **Portal** at back (20 ft. wide arch, red, pulsing)
- **Severin** center-front (arms raised, five masks floating above him)
- **Five dragon-skull columns** (half cover, scattered around)
- **Five dragon-head openings** (at compass points, for lair actions/Tiamat presence)
- Nothing below = 80 ft. fall

---

## Pre-Combat Scene (NO INITIATIVE YET)

Severin does NOT attack immediately. He monologues and allows social interactions.

**Read aloud:**

> Han bliver stående med ryggen til jer i tre lange sekunder.
> 
> Så snur han sig.
> 
> "I kom helt herop..."

[See TEMPLE-RUNBOOK for full dialogue.]

### Social Interactions (Before Initiative)

**Each PC gets ONE action before combat starts.**

| PC | Check | DC | Effect |
|---|---|---|---|
| **Twilight** | Persuasion/Performance | 20 | Severin spends 1 round disproving. Party gets 1 **free action round** before initiative. |
| **Axar** | Arcana | 17 | Sees ritual structure. **Advantage on 1st mask attack**. Learns: Severin is channel, not master. |
| **Daxx** | Insight | 15 | Severin is afraid. **+2 to party initiative**. |
| **Frygtløs** | Intimidation | 18 | Severin hesitates. **Disadvantage on 1st attack vs. Frygtløs**. |

**In Foundry chat:**

> Severin speaks to you. You have a moment to respond.
> 
> **Twilight:** What do you say to him?
> **[Awaiting player input]**

---

## Initiative Roll

After social actions (or if party attacks), **roll initiative.**

**Order likely:**
- Daxx (high DEX, +2 from Insight)
- Twilight (DEX 16)
- Axar (DEX 13)
- Severin (DEX 14, +2 from being broken = +2 init)
- Frygtløs (DEX 10)

---

## SEVERIN COMBAT (Rounds 1–3)

### Severin's Turn

**Round 1 action:**

- **Uses Eldritch Blast** on **Axar** (most threat)
  - **2 beams, +12 to hit**
  - Hit: 2d10+6 force damage per beam (~18 damage total)
  - Miss: No effect
- **Bonus action:** **Ritual Action**
  - Clock +1
  - **Narrate:** *"The masks above him burn brighter. The ritual advances."*
- **Legendary action (end of someone's turn):** Move back 10 ft.

### Party's Turn (Round 1)

**Axar:**
- **Cast Fireball** (30 ft. radius around Severin)
  - **DC 15 DEX save:** 8d6 fire damage
  - Severin takes half damage (failed save = 4d6, successful = 2d6)
  - **Narrate:** *"Fire blooms around him. The masks scream."*
- OR **Counterspell** if Severin cast something

**Daxx:**
- **Attack Severin** with longsword or shortbow
  - Advantage from earlier Insight check
  - **Hit:** 1d8+4 piercing (rapier) or 1d10+4 (longsword)
  - **Narrate:** *"Your arrow pierces his shoulder. He doesn't flinch."*

**Frygtløs:**
- **Attacks with Great Axe multiattack**
  - **2 attacks, +9 to hit**
  - Each hit: 1d12+5 slashing
  - **If both hit:** ~20 damage total
  - **Narrate:** *"You swing. The axe bites deep. Blood sprays across the stone."*

**Twilight:**
- **Casts Dissonant Whispers** on Severin
  - **WIS DC 16 save**
  - Fail: 3d6 psychic damage + Severin must use reaction to move 5 ft. away
  - Success: Half damage, no movement
  - **Narrate:** *"You sing a note that shouldn't exist. His ears bleed."*

---

### Rounds 2–3

**Severin's action each round:**

- **Round 2:** Uses **Hold Monster** on **Frygtløs** (DC 20 WIS save)
  - If fails: Frygtløs paralyzed (can't move/attack, loses turn)
  - If succeeds: No effect, Frygtløs laughs
  - **Ritual Action bonus:** Clock +1 again

- **Round 3:** Uses **Mask Resonance** (Recharge 5-6, likely activates)
  - **60 ft. burst, DC 18 DEX save**
  - **8d8 damage:** 1d8 each (acid, cold, fire, lightning, poison)
  - Half damage on successful save
  - Affects all PCs if they stay bunched
  - **Narrate:** *"The masks explode outward in a wave of pure elemental power."*

---

## TIAMAT INTERFERENCE (By Clock)

**Track clock visibly throughout combat.**

**Every time you update clock, announce it:**

> Ritual Clock: 3 → 4
> 
> One of the dragon heads in the portal shifts. It opens wider. You feel her attention focus on you.

| Clock | Effect | Mechanical |
|---|---|---|
| 3 | Her voice at combat start | DC 14 WIS save or Frightened 1 round |
| 4 | One head halfway through | 15 ft. zone at portal: 3d6 fire+cold per round |
| 5 | **Champion of Tiamat** | Severin +2 saves and attacks |
| 6 | One head attacks | Bite +14, 4d6+8 piercing, 1/round on lowest HP |
| 7 | **Severin protected** | Cannot die (min 3 HP) without closing portal |

**At clock 4 specifically:**

> The portal widens. Inside, you see scales. Teeth. Eyes opening.
> 
> A 15-foot zone appears around the portal—inside it, 3d6 fire and cold damage per round to anyone standing there.

---

## PHASE 2 (Severin Below 115 HP)

> Blod løber ned ad Severins ansigt. Han tørrer det af.
> 
> "Tiamat... Nu."

**Changes:**
- Drops Globe of Invulnerability (if he was using it)
- **Uses Dominate Monster** on **Frygtløs** (DC 20 WIS save)
  - If fails: Frygtløs is charmed. You (DM) control his actions.
  - If succeeds: No effect
- Mask Resonance now recharges on 4-6 instead of 5-6
- **No more Shield reaction** (relies on Tiamat instead)

**If Frygtløs is dominated:**

> The giant's eyes flood with color—red, green, blue, black, white. He turns to face his allies.
> 
> "I'm sorry," he whispers. "I can't fight it."
> 
> He attacks whoever is closest.

**How to play this in Foundry:**
- Lock Frygtløs's token to your control
- Move him toward Axar or Twilight
- Roll his attacks (you control damage rolls too)
- On his next turn (if Dominance persists), attack again
- After that turn, ask if he wants to make a DC 20 WIS save to break free

---

## VICTORY PATHS (Party's Choice)

### PATH A – KILL SEVERIN

**When Severin reaches 0 HP:**

> Den sidste klinge går ind.
> 
> Severin ser ned på sit bryst. Hans øjne møder dine.
> 
> "... det her var ikke meningen."
> 
> Maskerne slukner i rækkefølge: hvid, sort, grøn, blå, rød.
> 
> Hvert lys der slipper hans krop gør ham mindre. Hans ansigt bliver helt menneskeligt igen.
> 
> "Hun lovede..." hvisker han.
> 
> Så falder han forover, og portalen lukker som et lys der blæses ud.

**Portal closes. Temple collapses. → Escape sequence starts.**

---

### PATH B – DESTROY THE FIVE MASKS

**Masks float 5 ft. above Severin.**

**Mask stats:**
- **AC 15** | **HP 30 each** | **Immunities:** Acid, Cold, Fire, Lightning, Poison | **Vulnerabilities:** Force, Radiant

**Severin defends:**
- **Shield reaction on masks** (not himself)
- **Legendary action:** Move masks 5 ft. away
- **Eldritch Blast** on attackers

**Each destroyed mask = Severin –1 to all saves and attacks.**

**When all 5 destroyed:**

> Blot and light scatter. The five masks fall.
> 
> Severin collapses to his knees. You see what's underneath: a man. Just a man.
> 
> The portal closes behind him, and he falls.

**→ Escape sequence starts.**

---

### PATH C – BREAK THE RITUAL CIRCLE (AXAR'S SCENE)

**Axar can sense it (Arcana DC 17):** The ritual line running from portal through Severin.

**To break it:**
- **Counterspell + Dispel Magic** (2 actions, 2 rounds)
- **DC 18 + number of intact foci** (max DC 23)
- Requires **2 rounds of full concentration** without interruption

**Daxx helps (Round 1):**
- Volley or multiattack vs. Severin
- Gives Axar **distraction** → Severin's attention divided

**Frygtløs helps:**
- Stands **in front of Axar**
- Takes all damage/attacks meant for Axar
- Uses Reaction to block Counterspells

**Twilight helps:**
- **Bardic Inspiration** on Axar's Arcana check (+1d12)
- **Cutting Words** on Severin's attacks

**Success (after 2 rounds):**

> Axar's voice echoes through the temple. Words in a language dead for millennia. The line shatters.
> 
> The ritual breaks. The portal collapses inward.
> 
> Severin loses his magic. The masks fall. He's just a man now.

**Severin becomes CR 12 (effectively harmless in combat).**

---

## TEMPLE COLLAPSE (15-round escape)

### Trigger

After Severin falls or portal closes:

> Maskerne slukner. Én efter én.
> 
> ...
> 
> Og portalen lukker.
> 
> Og templet begynder at falde.

---

### Escape Sequence (In Foundry)

**You can run this as:**
1. **Skill challenge** (3 successes before 3 failures on each level)
2. **Chase scene** (combat tracker with "distance to exit")
3. **Narrative** (describe hazards, ask for saves periodically)

**Recommended for online:** Narrative + periodic saves. Faster.

---

**Rounds 1–3 (L3 → L2):**

> The dais cracks beneath you. Stone tumbles into darkness.
> 
> DC 14 DEX save or 3d6 bludgeoning. Move down the stairs.

**Rounds 4–8 (L2 – The Foci):**

> The foci explode one by one, each detonating in its own color.
> 
> DC 15 DEX save (4d8 damage per foci color, cumulative if you fail multiple).
> 
> **Daxx:** Bonus action to guide group. +2 to AC against falling debris next round.

**Rounds 9–15 (L1 → Out):**

> Cultists panic. They fill the corridors, trying to escape.
> 
> DC 12 Athletics or Acrobatics to push through the crowd.
> 
> **Frygtløs:** Can clear path for **everyone** (1 action, clears corridor, all PCs pass automatically).

**Round 15 – Final Exit:**

> You stumble out onto the ash plain.
> 
> Behind you, the temple implodes. The roar is so loud you can't hear anything else.
> 
> In front of you: the caldera. The armies. The sky.

---

# AFTERMATH – HOW TO LAND IT

### Major Success (Clock 0–4 at Severin's death)

> The dragons in the sky stop. They break formation. They leave.
> 
> The allied armies begin to cheer—not war cries. Hope.

---

### Partial Success (Clock 5–7)

> Two of Tiamat's heads reached through before the portal closed.
> 
> They burned the northern flank. They killed dragons.
> 
> You've won. But victory tastes like ash today.

---

### Failure Forward (Clock 8)

Tiamat fully manifests. Campaign continues in catastrophe mode. Party stays active. World changes.

---

# FOUNDRY QUICK SETUP CHECKLIST

Before running **in Foundry:**

- [ ] Create scenes for L1, L2 (hub + each foci), L3
- [ ] Add enemy actors to scenes (from compendia or manual creation)
- [ ] Create a **ritual clock tracker** (journal entry updated each round)
- [ ] Mark hazards (ritual channels, magma tiles, magma zone, frost dais)
- [ ] Set up **combat tracker** (will auto-initialize in Foundry when you roll init)
- [ ] Have stat blocks open in **second window** for quick reference
- [ ] Use **fog of war** if you want to hide enemy positions
- [ ] Enable **grid** and **grid snapping** for combat

---

# RUNNING TIPS (ONLINE)

1. **Track everything visibly:** Clock, round counter, enemy HP, PC conditions
2. **Describe terrain:** "You see the ritual channels glow as you step near them"
3. **Use Foundry chat:** Keep mechanics out of voice—announce saves/checks there
4. **Pause between rounds:** Give PCs time to discuss their action
5. **Let silence happen:** After dramatic moments, stop talking for 10 seconds
6. **Track spells/resources:** Spell slots, Bardic Inspiration dice, Legendary Resistance
7. **Show dice rolls:** Everyone should see attack rolls, saves, damage rolls (Foundry shows by default)

---

**You're ready. Run this temple. Make it legendary.**

