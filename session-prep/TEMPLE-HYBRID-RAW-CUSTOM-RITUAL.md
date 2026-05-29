# TEMPLE OF TIAMAT – HYBRID APPROACH (RAW LAYOUT + CUSTOM RITUAL)

**Foundry VTT Live Play Guide**

---

## CORE MECHANIC: RITUAL ROUNDS (4-10)

**Instead of:** 10 rounds to manifest Tiamat fully  
**You use:** Tiamat's heads appear progressively, starting **Round 4**

### Ritual Round Progression

| Ritual Round | Tiamat Heads | Effect | Party Can Do |
|---|---|---|---|
| **1-3** | None visible | Ritual building. Red Wizards chanting. | Interrupt ritual. Stop sacrifices. Enter sanctuary. |
| **4** | White head appears | 15 ft. zone: 2d6 cold damage/round | One head visible, biting/breath attacks begin |
| **5** | Black head appears | Poison aura expands | Two heads. Damage increases. |
| **6** | Green head appears | Illusions + poison cloud | Three heads active |
| **7** | Blue head appears | Lightning arcs from portal | Four heads. Ritual nearly complete. |
| **8** | Red head appears | **TIAMAT FULLY MANIFEST** | Five heads. Full initiative. Severin no longer in control. |
| **9-10** | Tiamat attacks | (If you get this far) | Tiamat turns on cult members, then party. |

---

## HOW RITUAL ADVANCES

**At the END of each combat round:**

1. **Roll "Ritual Check"** (DM roll, public)
   - **DC 12** to disrupt this round
   - Each PC/NPC action that disrupts ritual = +2 DC

2. **What counts as disruption:**
   - Killing a Red Wizard (DC 12 –1 per wizard killed)
   - Destroying the Mask of the Dragon Queen (DC = 25, auto-completes if successful)
   - Stopping prisoner sacrifice at temple entrance (DC 12)
   - Destroying critical temple structures (DC 15 per structure)

3. **If disruption succeeds:** Ritual is delayed 1 round (next round is still same ritual round)
4. **If disruption fails:** Ritual advances 1 round

**Example:**
- Round 1 of combat: Red Wizard alive, prisoners marching in, Mask on Severin
- At end of Round 1: "Ritual check DC 12." No one disrupted anything. Ritual advances → Ritual Round 4 starts → White head appears
- Round 2 of combat: Axar kills a Red Wizard. "Ritual check DC 14 to advance." Roll 16 = success → Ritual still at Round 4, White head still visible

---

## TEMPLE LAYOUT (Raw Module)

### Single Open Space with 13 Zones

```
                    [13 - SANCTUARY]
                    (Severin, Mask)
                          |
        [11]          [12]   [14]         [10]
       (Black)      (Red)   (Blue)     (Green)
         Spire      Spire    Spire       Spire
           |           |       |           |
           [5]------[7]-----[6]------[9]
        (Black)   (Great      (Red)   (White)
        Chapel    Apse)     Chapel    Chapel
                 (Portal)
           |           |       |           |
        [4]        [Lesser]   [3]       [1]
       (Green)      Apse    (White)   (Blue)
       Chapel               Chapel    Chapel/Entrance
```

### Key Areas

| Area | Name | Purpose | Enemies |
|---|---|---|---|
| **1** | Blue Chapel (Entrance) | Entry point | Red Wizard + cultists |
| **3** | White Chapel | Ritual support | Red Wizard + Dragonfang guard |
| **4** | Green Chapel | Ritual support | Red Wizard + Yuan-Ti allies |
| **5** | Black Chapel (Alt entrance) | From warrens | Red Wizard + undead |
| **6** | Red Chapel | Rath Modar's position | Rath Modar + Red Wizards |
| **7** | Great Apse | Portal chamber | No enemies (central ritual focus) |
| **8-12** | Spires | Flying Red Wizards | Red Wizards (hard to reach) |
| **13** | Sanctuary | Severin's levitation | Severin + Mask of Dragon Queen |

---

## STREAMLINED COMBAT FLOW (For Hybrid)

### Party enters at Area 1 (Blue Chapel)

**Combat Encounter 1: Entrance Guard**

- **1× Red Wizard** (Mage stats: AC 12, HP 22, cantrips + 1st level spells)
- **2-3× Dragonclaw Cultists** (AC 14, HP 22, Scimitar +4)
- **Objective:** Reach deeper into temple

**When party reaches Area 1:**

> Dentro, cultistas entonando cantos. En el centro, una bruja en túnica roja levanta las manos. Cinco voces se unen en un solo sonido.
> 
> Ritual Round 1 begins.

---

### Party fights toward Areas 3-5 (Side Chapels)

**Option 1 – Attack side chapels first (disrupt ritual):**
- Area 3 (White Chapel): 1 Red Wizard + guards
- Area 4 (Green Chapel): 1 Red Wizard + Yuan-Ti
- Area 5 (Black Chapel): 1 Red Wizard + undead

**Each Red Wizard killed = –1 DC on ritual disruption check.**

**Objective:** Kill 3+ Red Wizards to make disruption easier later.

---

### Party moves toward Area 6 (Red Chapel, Rath Modar)

**Combat Encounter 2: Rath Modar**

- **Rath Modar** (AC 13, HP 71, Red Wizard spellcaster, CR 6)
- **2× Red Wizard allies** (AC 12, HP 22 each)
- **Objective:** Stop Rath (he coordinates the ritual)

**If party kills Rath:** Ritual disruption becomes DC 10 (easy to maintain disruption).

---

### Party reaches Area 7 (Great Apse – Portal Chamber)

**No direct combat here**, but this is where they can see:

> El portal en el ápside central se abre. Dentro, cinco cabezas de dragón rasguñan y muerden.
> 
> Ritual Round 4: Cabeza Blanca aparece.

---

### Party ascends to Area 13 (Sanctuary – Severin's Chamber)

**Combat Encounter 3: Severin Boss Fight**

- **Severin** (levitating, wearing Mask, AC 18, HP 230, CR 24)
- **2-3× Red Wizard guards** (flying, AC 12, HP 22 each)
- **Objective:** Kill Severin, destroy Mask, or force ritual collapse

---

## FOUNDRY SCENES (Simplified for Hybrid)

Instead of 13 separate scenes, use **4 main areas:**

1. **"Temple Entrance – Blue Chapel"** (Combat 1)
2. **"Temple Interior – Side Chapels"** (Three sub-encounters at Areas 3/4/5)
3. **"Temple Core – Great Apse"** (Ritual observation, no combat)
4. **"Sanctuary – Severin's Chamber"** (Boss fight)

**Each area has:**
- Enemy placements (use tokens from STEP2/STEP3 scripts)
- Terrain hazards (optional, raw doesn't have many)
- Objective markers (where party needs to go)

---

# ROUND-BY-ROUND COMBAT TRACKING

## RITUAL ADVANCEMENT TRACKER (Show publicly)

Create a **Foundry Journal Entry** with this table updated each round:

```
RITUAL PROGRESSION
==================

Ritual Round: [1/2/3/4/5/6/7/8]

Round 1-3: Building (No heads visible)
Round 4:   WHITE HEAD appears (15 ft. zone: cold aura)
Round 5:   BLACK HEAD appears (poison spreads)
Round 6:   GREEN HEAD appears (illusions + poison)
Round 7:   BLUE HEAD appears (lightning)
Round 8:   RED HEAD appears - TIAMAT FULLY MANIFEST

DISRUPTION STATUS:
- Red Wizards killed: [0/5]
- Mask destroyed: NO
- Prisoners stopped: NO
- Temple damaged: NO
- Ritual casters interrupted: [rounds disrupted]
```

**Update after each combat round's end.**

---

## EXAMPLE COMBAT FLOW: First Room (Area 1)

### Round 1 of Combat (Ritual Round 1)

**Red Wizard's turn:**
- Uses **Magic Missile** on Axar (3d4+3 force)
- Action: Begins ritual chant (cannot be interrupted this turn)

**Dragonclaw #1 & #2 turn:**
- Scimitar attacks on nearest PC
- +4 to hit, 1d6+2 slashing

**Party's turn:**
- Axar casts Fireball (30 ft. cone, DC 15 DEX save, 8d6 fire)
- Dragonclaws likely hit or dead
- Frygtløs attacks Red Wizard with Great Axe

**End of Round 1:**

> Red Wizard falls to Frygtløs's axe.
> 
> **Ritual Check:** DC 12. One Red Wizard dead (DC –1 = DC 11). 
> [Roll] 14 = SUCCESS.
> 
> The ritual's progress is **disrupted**.
> 
> But from deeper in the temple, you hear four more voices chanting in unison.

**Ritual still at Round 1 (delayed).**

---

### Round 2 of Combat (Still Ritual Round 1)

**Red Wizard is dead.** Only Dragonclaws remain.

**Dragonclaw survivor's turn:**
- Attacks again
- Gets bloodied, attempts to flee toward deeper temple

**Party's turn:**
- Chase or loot

**End of Round 2:**

> As the last cultist falls, the chanting from deeper in the temple INTENSIFIES.
> 
> **Ritual Check:** No disruption actions this round. DC 12.
> [Roll] 8 = FAILURE.
> 
> **RITUAL ADVANCES TO ROUND 4.**

---

### Round 3 – Transition (Ritual Round 4)

> The portal in the temple's heart SPLITS OPEN.
> 
> A massive draconic HEAD forces its way through—white scales, frost dripping, eyes like glaciers. It ROARS.
> 
> The WHITE HEAD is here.
> 
> You feel cold bite at your skin. The 15-foot zone around the portal becomes a blizzard.

**New hazard active:**
- Any PC in 15 ft. of portal: DC 13 CON save or 2d6 cold damage per round

---

## TIAMAT HEADS (Rounds 4-8)

### Each Head's Mechanics

| Head | Ritual Round | Aura | Attacks | Effect |
|---|---|---|---|---|
| **White** | 4 | Cold (2d6/round) | Bite +14, 3d6+6 piercing + 1d6 cold | Slowing |
| **Black** | 5 | Acid (2d6/round) | Bite +14, 3d6+6 piercing + 2d6 acid | Corrosion |
| **Green** | 6 | Poison/Illusion (Insight DC 15) | Bite +14, 3d6+6 piercing + 1d6 poison | Confusion |
| **Blue** | 7 | Lightning (2d6/round) | Bite +14, 3d6+6 piercing + 2d6 lightning | Paralysis |
| **Red** | 8 | Fire (3d6/round) | Bite +14, 4d8+6 piercing + 3d8 fire | **FULL TIAMAT** |

---

### Heads as Active Combatants (Optional)

**Simplified:** Heads are **hazards + occasional attacks**, not full combatants.

**Each round a head is visible:**
- At END of round: One head makes a bite attack on **lowest HP PC**
- Attack roll: +14
- Damage: 3d6+6 piercing + elemental (as above)
- Breath weapon (Recharge 5-6): 30 ft. cone, DC 15 save, 7d6 of its type

**When Tiamat fully manifests (Round 8):** Red Head attacks on initiative, acts as a legendary creature.

---

# SEVERIN FIGHT (Sanctuary – Area 13)

## Setup

Severin is **levitating 10 ft. above the ground**, wearing the Mask of the Dragon Queen. Three Red Wizard guards float around him.

**Terrain:**
- Ritual circle (glowing runes) on floor below
- No cover except support columns
- Cannot reach Severin without flying/climbing (DC 18 Athletics to climb support column)

## Severin's Tactics (Ritual Rounds Affecting Him)

**Ritual Rounds 1-7:**
- Severin fights defensively, protected by the ongoing ritual
- Uses spells to delay party (Hold Monster, Counterspell, Fireball)
- Doesn't move—stays levitating above the circle
- Bonus action each round: **Advances ritual** (Clock +1)

**Ritual Round 8 (Tiamat fully manifest):**
- Severin's control is broken by Tiamat
- He acts as **ally to Tiamat**, not independent combatant
- Tiamat begins attacking him (treats him as a snack: "My faithful, your Queen hungers")
- Party now fights Tiamat + Red Wizard guards

---

## Three Victory Paths

### PATH A – Kill Severin

If Severin drops to 0 HP **before Ritual Round 8:**
- Mask falls with him
- Portal **begins to collapse** (ritual disrupted)
- Ritual reset to Round 1
- Heads begin to withdraw

**Party can:**
- Destroy the Mask (DC 17 Athletics, 1 action, 25 fire/radiant damage)
- Grab the Mask (DC 15 Sleight of Hand while it falls)

**If Mask destroyed:** Ritual immediately fails. Heads withdraw. Tiamat banished.

---

### PATH B – Disrupt Ritual (Stop Red Wizards)

**Three Red Wizard guards in sanctuary can:**
- Use bonus actions to maintain ritual chant
- If 2+ are killed: Ritual disruption check becomes DC 10 (easy)
- If all 3 killed + Rath is dead elsewhere: Ritual **immediately collapses**

**Party can:**
- Target Red Wizard guards instead of Severin
- Use ranged attacks to kill them before approaching Severin

---

### PATH C – Stop Prisoner Sacrifice (Early)

**If party stops the sacrifice BEFORE entering the temple:**
- Ritual never starts properly
- Red Wizards struggle to maintain focus
- DC on disruption checks = 8 (very easy)
- Ritual collapses after 2 failed checks

(This would have been accomplished in Scene 4B if party rescued all prisoners.)

---

# FOUNDRY SETUP CHECKLIST

Before running hybrid:

**Scene 1 – Blue Chapel (Entrance)**
- [ ] Map: 50×50 ft., central ritual area
- [ ] Place 1 Red Wizard + 2-3 Dragonclaw tokens
- [ ] Mark ritual circle (visual marker, no mechanical effect yet)

**Scene 2 – Side Chapels (Areas 3, 4, 5)**
- [ ] Optional: Three separate sub-encounters
- [ ] Each has 1 Red Wizard + specialized guardians
- [ ] Objective: Kill Red Wizards to reduce ritual DC

**Scene 3 – Great Apse (Area 7)**
- [ ] Narrative transition (no combat)
- [ ] Show portal opening
- [ ] Display Ritual Round tracking (journal entry)

**Scene 4 – Sanctuary (Area 13)**
- [ ] Map: 60×60 ft., circular chamber with columns
- [ ] Place Severin token (levitating, use flying height if Foundry supports)
- [ ] Place 3 Red Wizard guard tokens
- [ ] Mark ritual circle, portal zone

**Journal Entry – "RITUAL TRACKER"**
- Update after each combat round
- Show current Ritual Round
- Show heads visible
- Show disruption status

---

# DM PACING NOTES (Hybrid)

1. **Ritual Rounds 1-3:** Party fights side encounters, disrupts ritual, gathers intel
2. **Ritual Round 4:** White head appears (climactic moment #1)
3. **Ritual Rounds 5-7:** Party progresses toward Severin, heads add pressure
4. **Ritual Round 8:** Tiamat fully manifest, final battle with Severin + Red Wizards
5. **Post-Round 8:** If party didn't stop ritual, Tiamat begins consuming cultists, then party

---

# FINAL TEMPLE STATE TRACKING

```
HYBRID RITUAL CLOCK (Raw Layout + Custom Heads)
==============================================

RITUAL DISRUPTIONS NEEDED: 2 successful disruptions to collapse ritual

DISRUPTIBLE ELEMENTS:
☐ Rath Modar (kill = ritual DC 10)
☐ Red Wizard in Blue Chapel (kill = ritual DC 11)
☐ Red Wizard in White Chapel (kill = ritual DC 11)
☐ Red Wizard in Green Chapel (kill = ritual DC 11)
☐ Red Wizard in Black Chapel (kill = ritual DC 11)
☐ Red Wizard guards in Sanctuary (kill 2+ = ritual DC 10)
☐ Mask of Dragon Queen (destroy = ritual auto-fails)
☐ Prisoner sacrifice (stop = ritual DC 8)

PROGRESSION TRACKER:
Round 1-3: [ritual building]
Round 4: [WHITE HEAD appears] ← Players see Tiamat
Round 5: [BLACK HEAD appears]
Round 6: [GREEN HEAD appears]
Round 7: [BLUE HEAD appears]
Round 8: [RED HEAD appears] ← TIAMAT FULL MANIFEST

If Round 8 reached without disruption:
→ Tiamat awakens fully
→ Severin becomes irrelevant
→ Red Wizards begin to flee/hide
→ Heads attack with full fury
```

---

**Ready for Foundry. Short. Fast. Dramatic.**

