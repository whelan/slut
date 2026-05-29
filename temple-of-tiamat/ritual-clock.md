# Ritual Clock – Complete Mechanics

The ritual clock is the campaign's urgency engine. It ticks, it reacts, and it changes the final battle.

> **ACTIVE MODE (Hybrid, Raw Layout):** This campaign runs the **round-based ritual** below. The clock = the number of successfully focused **combat rounds**. Heads appear from **Round 4**. The legacy 0–8 escalation table further down is kept for reference and narrative cues only.

---

## Round-Based Ritual (Hybrid – CANONICAL)

The Red Wizards must focus the ritual round after round. The party fights *against the clock of rounds*, not an abstract meter. The temple is the raw single-cathedral layout (13 areas); progress is measured in rounds.

### How a round advances

At the **end of each combat round**, roll a public **Ritual Check**:

- **Base DC 12** to advance the ritual one round.
- If the party did something disruptive this round, the **DC rises** (harder to advance).
- **Success → ritual advances** one round. **Failure → ritual is held** at the current round.
- **Two held rounds in a row → portal collapses, ritual resets to 0.**

### Disruption modifiers (raise the DC)

| Action this round | DC change |
|---|---|
| A Red Wizard was killed | +1 per wizard (cumulative across the fight) |
| Rath Modar killed | DC drops to 10 baseline (hard for cult to sustain) |
| 2+ Sanctuary Red Wizard guards killed | DC drops to 10 baseline |
| Prisoner sacrifice was stopped (Scene 4B) | DC starts at 8 (very easy to hold) |
| Mask of the Dragon Queen destroyed/removed | Ritual **auto-fails** — heads withdraw |
| Severe structural damage to the temple | +2 this round |

### Head appearance schedule

| Ritual Round | Head | Aura / Effect |
|---|---|---|
| 1–3 | None | Ritual building. Chanting only. Best window to disrupt. |
| **4** | **White** | 15 ft. zone at portal: 2d6 cold/round (DC 13 CON). Bite +14, 3d6+6 + 1d6 cold. |
| **5** | **Black** | Acid spreads: 2d6 acid/round near portal. Bite +14, 3d6+6 + 2d6 acid. |
| **6** | **Green** | Poison + illusion (Insight DC 15). Bite +14, 3d6+6 + 1d6 poison. |
| **7** | **Blue** | Lightning arcs: 2d6 lightning/round. Bite +14, 3d6+6 + 2d6 lightning. |
| **8** | **Red** | **TIAMAT FULLY MANIFEST.** Fire 3d6/round. All five heads act. Full initiative. |

**Heads as hazards (simplified):** While only partially through (Rounds 4–7), each visible head makes **one bite at the end of the round** against the lowest-HP PC, plus its aura. Breath weapon on Recharge 5–6 (30 ft. cone, DC 15, 7d6 of its type). At Round 8 the Red head — and thus full Tiamat — takes real initiative.

**Foundry automation:** Use `foundry-export/RITUAL-TRACKER-MACRO.js`. Click **Advance** when the party fails to disrupt (spawns the next head automatically), **Hold** when they disrupt, **Reset** if the portal collapses.

---

## Starting State

The clock does **not start at 0**. It starts based on what happened in the campaign up to this point.

| Factor | Effect on starting state |
|---|---|
| Council of Waterdeep chose defensive tactics | Clock +2 (the army is slow) |
| The party marched without delay | Clock +1 |
| Thay alliance is intact and operational | Clock –1 |
| Party sabotaged the Draakhorn transmission | Clock –1 |
| Leosin and the Harpers delivered the maps to Well of Dragons | Clock –1 |
| Naergoth Bladelord delayed the party | Clock +1 |
| The party spent a long time in Thay | Clock +1 |

**Typical starting clock:** 1–3

---

## Clock Table – Effects

| Clock | Tiamat effect in Temple |
|---|---|
| 0 | The party arrives. No additional effects. |
| 1 | The first head's shadow is visible in the portal (Level 3). |
| 2 | Chromatic energy intensifies – all spells with elemental damage +1d4. |
| 3 | Allied frontline breaks at one point outside (DM describes it as sound/smoke). |
| 4 | Tiamat's first head presses halfway through the portal (Level 3 effect). |
| 5 | Severin activates Champion of Tiamat (+2 saves and attacks). |
| 6 | One head can attack: bite +14, 4d6+8 piercing, 1/round. |
| 7 | Tiamat partially manifests – Severin cannot die (min. 3 HP) until the portal is closed. |
| 8 | Tiamat manifests fully. See: Failure Forward section. |

---

## What increases the clock (+)

### Level 1

| Event | Increase |
|---|---|
| Encounter A (Gate of Bone) lasts >3 rounds | +1 |
| The Procession is allowed to pass unhindered | +1 |
| The party is forced to take a Long Rest in the temple | +3 |

### Level 2

| Event | Increase |
|---|---|
| Each foci that is intact at transition to Level 3 | +1 per foci (max +5) |
| The party spends >4 rounds on one foci | +1 |
| A PC dies and the party spends a long time on Revivify/stabilization | +1 |

### Level 3

| Event | Increase |
|---|---|
| Severin uses Ritual Action (bonus action) | +1 per instance |
| Severin uses Legendary Action: Ritual Surge | +1 per instance |
| Frontline event (DM's assessment): the army loses a flank | +1 |
| The party loses initiative in round 1 and acts last | +1 |

---

## What decreases the clock (–)

### Level 1

| Event | Decrease |
|---|---|
| Skill challenge success (infiltration) | –1 |
| The Procession is stopped (social success) | –1 |

### Level 2

| Event | Decrease |
|---|---|
| Foci sabotaged (quickly – under 2 rounds per foci) | –1 per foci |
| Foci sabotaged (generally) | 0 (no decrease – only prevents +1 at transition) |

### Level 3

| Event | Decrease |
|---|---|
| Axar uses Counterspell against Severin's Ritual Action | –1 (can be done 1× per Long Rest) |
| Metallic dragon ally support (pre-arranged with Council) | –1 (once per campaign) |
| The party destroys 3+ masks on Level 3 | –1 |

---

## What the clock **does not** do

- It does not stop the battle.
- It is not a "fail state timer" – it is an escalation tool.
- Even clock 8 does not mean automatic TPK or campaign end – it is a *failure forward* point, not an endpoint.

---

## DM Technique: Show the Clock

**Recommended method:**

1. Use a visible number of dice or tokens (e.g. a d10 set to the current number).
2. Move it visibly when it increases – let the players see it.
3. Do not say what it does – just update it. Let tension build naturally.

**Alternative:** Describe it narratively:

| Clock | Narration |
|---|---|
| 0–1 | "The temple shudders faintly. The ritual is underway, but you arrived quickly." |
| 2–3 | "The portal behind Severin pulses darker. The light in the temple is beginning to change color." |
| 4–5 | "You hear something behind the portal. Not noise. Breathing." |
| 6–7 | "An eye looks through the portal. It is larger than the portal should allow." |
| 8 | "The portal tears open. And Tiamat looks at you." |

---

## Failure Forward – Clock 8

Tiamat manifests fully. The campaign is not over, but it changes character.

**What happens:**
- Tiamat is 60 seconds from being fully on the Material Plane.
- Severin is no longer necessary – he can die now.
- The portal is fully open and cannot be closed by normal means.

**What the party can do:**
1. **Collapse the portal:** Requires all five masks to be destroyed before Tiamat is through (8 rounds). Chaotic, but possible.
2. **Bind Tiamat:** Axar knows something about binding rituals from Arcana DC 25 – he remembers fragments from Xonthal's dungeon. He can attempt to bind her to the caldera. Requires Ritual casting (10 minutes – which the party does not have). But Twilight can sing to delay Tiamat's arrival (Concentration, Performance DC 20 per round – grants 1 extra round per success).
3. **Flee and face consequences:** The party leaves the temple. Tiamat manifests. Waterdeep cannot hold. The campaign shifts to post-apocalyptic. Only usable if this is a deliberate narrative decision.

---

## Quick Reference for the Table

### Round-Based (ACTIVE)

```
RITUAL ROUNDS  (advance: DC 12 check at end of each round)

[  ] 1 – Building. Chanting. DISRUPT NOW.
[  ] 2 – Building.
[  ] 3 – Building. Last quiet round.
[  ] 4 – WHITE head  (cold zone 2d6/rd)
[  ] 5 – BLACK head  (acid 2d6/rd)
[  ] 6 – GREEN head  (poison + illusion)
[  ] 7 – BLUE head   (lightning 2d6/rd)
[  ] 8 – RED head → TIAMAT FULLY MANIFEST
```

Disrupt: kill Red Wizards (−1 DC each) · destroy Mask (auto-fail) · stop sacrifice (DC 8 baseline).

### Legacy 0–8 Escalation (narrative cues only)

```
[  ] 0 – No effect
[  ] 1 – First shadow visible
[  ] 2 – Elemental energy +1d4
[  ] 3 – Frontline breaks
[  ] 4 – Head halfway through (3d6 fire+cold zone)
[  ] 5 – Severin: Champion of Tiamat
[  ] 6 – Head attacks (+14, 4d6+8)
[  ] 7 – Severin: unkillable (min. 3 HP)
[  ] 8 – Tiamat manifests fully
```

Print and use physically at the table.
