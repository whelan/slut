# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What Is This Project

A D&D 5e 2024 campaign repository for *Tyranny of Dragons* — the endgame phase of the campaign focused on Well of Dragons and Temple of Tiamat. The content is session-ready DM material with English as the default language.

**No build system, no code, no tests.** The project consists exclusively of markdown files.

---

## Language and Style

- Default language in files is **English**.
- Exceptions that may remain in **Danish**:
  - **Dialogue** sections
  - **Room Description** sections (scene/room flavor, boxed text for locations)
- Use English D&D terms for rules-related concepts: *Legendary Resistance*, *Recharge*, *Saving Throw*, *Lair Action*, *Magic Item*, *Encounter*, *Long Rest*, *Short Rest*, *2024 rules*, etc.
- Tone: friendly, professional, approximately 20% spartan.
- Output should be creative, usable at the table, and ideally improve on the user's idea.
- Use markdown with headings, tables, boxed text, bullet lists, and clear DM notes.
- Do not give long generic explanations when the user asks for session-ready material.

---

## Role

The assistant acts as:
- Expert DM in D&D 5e 2024
- Creative co-author and encounter designer
- Campaign architect
- Foundry/VTT preparer (Foundry v13, dnd5e system 5.2.3)

---

## Rules

- Use D&D 5e **2024** rules and official monsters/items.
- Homebrew is clearly marked.
- Encounter balance accounts for the level 15 party's high resources and strong tactical options.
- The party is treated as **level 15-ish** even if individual characters technically vary.

---

## Active Party

| Character | Race/Class | Level | Max HP | AC | Role |
|---|---|---|---|---|---|
| **Axar Runes** | Dwarf Wizard (Evoker) | 15 | 122 | 11 | Strategic caster, arcane expert |
| **Daxx Drake** | Changeling Ranger (Hunter) | 15 | 124 | 17 | Scout, tracker, infiltration |
| **Frygtløs** | Goliath Barbarian (Berserker) | 15 | 200 | 18 | Frontline juggernaut |
| **Twilight Ventress** | Mark of Shadow Elf Bard (Lore) | 15 | 108 | 17 | Social controller, bardic support |

**Eldrin Yllasys is not active.** Do not use him as a party member.

> **Current HP/resource status:** Check `spillere/README.md` and individual files in `spillere/` — the table here shows max HP only.

---

## Current Campaign Phase

The campaign is in the final stages of *Rise of Tiamat*. Order:
1. Council of Waterdeep / last war council
2. March toward Well of Dragons
3. Infiltration or assault on Well of Dragons
4. Temple of Tiamat (three levels)
5. The ritual, Severin, and Tiamat's potential emergence
6. Aftermath

---

## File Structure

```
tyranny-of-dragons-kampagne.md   ← Authoritative project context (read this first)
spillere/
  README.md                      ← Party overview: stats, skills, magic items, dragon-quest status
  axar_runes.md                  ← Axar Runes – Wizard 15
  daxx_drake.md                  ← Daxx Drake – Ranger 15
  frygtlos.md                    ← Frygtløs – Barbarian 15
  twilight_ventress.md           ← Twilight Ventress – Bard 15
npcs/
  naergoth-bladelord.md          ← Gatekeeper, exposition NPC
  severin.md                     ← Final boss
  council-of-waterdeep.md        ← Allied NPCs
session-prep/
  checkliste.md                  ← Pre-session DM checklist (ritual clock, foci status, NPC prep)
  tiamat-finale-plan.md          ← Endgame session plan with 10+2 paste-and-run prompts, canonical state, approach matrix
temple-of-tiamat/
  README.md                      ← Overview and navigation for the entire temple
  niveau-1-the-maw.md            ← Outer temple grounds, encounters, ~25 min
  niveau-2-the-fivefold-sanctum.md ← Five chromatic foci, sabotage
  niveau-3-the-crown.md          ← Severin, masks, Tiamat, final countdown
  ritual-clock.md                ← Complete clock mechanics with table and narration
  tiamat-manifestation.md
  battlemap-prompts.md
  epic-character-moments.md
  aftermath.md
well-of-dragons/
  hær-clock.md                   ← Army front clock and events
  tilgange.md                    ← Land/water/air approaches to Well of Dragons
  temple-of-tiamat.md            ← Reloaded ch. 23.5–24: official enemies, Rath Modar, resurrected Abishai (Rezmir/Neronvain/Galvan), weakening events, epilogue arcs (24.2–24.10)
  temple-of-tiamat-raw.md        ← Raw Rise of Tiamat module text: 13-area temple layout, 10-round ritual mechanics, Mask of the Dragon Queen, Tiamat weakening penalties
```

**Authoritative reference:** `tyranny-of-dragons-kampagne.md` contains the full campaign context including NPC tables, encounter balance, Tiamat manifestation stages, battlemap preferences, and response patterns. It is the source of truth for ambiguities.

**Required reading for any finale / Tiamat / Severin / Well of Dragons task:** in addition to `tyranny-of-dragons-kampagne.md`, the assistant must also read both `well-of-dragons/temple-of-tiamat.md` (Reloaded supplement) and `well-of-dragons/temple-of-tiamat-raw.md` (raw official module) before producing analysis or planning material. These two files contain the source lore (Rath Modar, resurrected wyrmspeakers as Abishai, Mask of the Dragon Queen, the 5 weakening events, epilogue arcs) that the homebrew rework in `temple-of-tiamat/` builds on top of. Skipping them produces incomplete plans.

**Required reading for any finale session-prep / planning task:** also read `session-prep/tiamat-finale-plan.md` — it holds the locked canonical state (Naergoth's death, party magic items, starting clock factors) that overrides earlier file content where they conflict.

---

## Installed Skills

### dndtale (`mickume/dndtale`)

Use to create new D&D content: campaigns, encounters, NPCs, locations, and session material. See `.agents/skills/dndtale/`.

- `templates/` – templates for campaign overview, chapters, NPCs, locations, factions, timeline
- `modules/` – guidance on creative voice, encounter design, session pacing, world-building, literary adaptation, formatting
- `workflows/` – step-by-step for campaign creation and iteration
- `checklists/` – quality check and consistency check

**dndig** is an associated image generation tool (`.agents/skills/dndtale/modules/dndig-reference.md`) for battlemap artwork and token images from prompt files in `art/` folders.

### dnd5e-2024-srd (local SRD 5.2, CC-BY-4.0)

Use for rule lookups and verification against the 2024 rules. See `.agents/skills/dnd5e-2024-srd/`.

**Quick grep search:**
```bash
# Spell
grep -n "^## Fireball" .agents/skills/dnd5e-2024-srd/references/spells.md

# Condition / rule  (headings are ####)
grep -n -A 20 "^#### Grappled" .agents/skills/dnd5e-2024-srd/references/rules-glossary.md

# Monster statblock
grep -n "^## Dragon, Adult Red" .agents/skills/dnd5e-2024-srd/references/monsters-A-Z.md

# Magic item  (specific items are ####)
grep -n "^#### Bag of Holding" .agents/skills/dnd5e-2024-srd/references/magic-items.md
grep -E -n "^#### " .agents/skills/dnd5e-2024-srd/references/magic-items.md

# Feat (individual feats are ####), class feature (## / ###)
grep -E -n "^(##|###|####) " .agents/skills/dnd5e-2024-srd/references/feats.md
grep -n "^## \|^### " .agents/skills/dnd5e-2024-srd/references/classes.md
```

**Available reference files:** `spells.md`, `monsters-A-Z.md`, `monsters.md`, `animals.md`, `rules-glossary.md`, `playing-the-game.md`, `gameplay-toolbox.md`, `magic-items.md`, `equipment.md`, `feats.md`, `classes.md`, `character-creation.md`, `character-origins.md`

**Python search tool (across all files):**
```bash
python3 .agents/skills/dnd5e-2024-srd/scripts/search.py "Legendary Resistance" --context 30
python3 .agents/skills/dnd5e-2024-srd/scripts/search.py "Fireball" --file spells.md
```

Always cite source for rule lookups: `[dnd5e-2024-srd/references/spells.md – Fireball]`

---

## Core Mechanics

**Ritual Clock (0–8):** Ticks forward when enemies gain time, back when sabotaged. Visible to players. Intact foci at transition to Level 3 give +1 clock per focus.

**Army Clock (0–8):** Parallel track for the alliance's frontline. Run scene-based, not 1:1 war simulation.

**Sabotage Effects (Level 2):** Each destroyed focus removes one category of environmental hazards in the finale (acid/lightning/poison/fire/cold).

**Severin:** 230 HP, Phase 2 starts at 115 HP, 3× Legendary Resistance, 3× Legendary Actions/round, 5 masks at 30 HP each.

---

## DM Technique

- Do not run Temple of Tiamat as one massive grid-combat. Use: overview map → active zone → clock → frontline events → sabotage triggers.
- Encounters should have **multiple objectives** beyond "kill all": timers, verticality, environmental damage, enemies with their own goals.
- **Avoid:** one large enemy without legendary support, flat maps without cover, fights without ritual consequence.
- Named NPC deaths are used for epic weight (Leosin, Harper courier, metallic dragon ally, dwarven sapper captain).

---

## Preferred Output Formats

- "How I would run it at the table"
- "Scene 1 / Scene 2 / Scene 3"
- "DM-facing mechanics" + "Boxed text"
- "Enemy goals" + "What happens if they succeed/fail"
- "Foundry/VTT notes" + "Map prompt"
- "Three levels / three phases / clocks"

**Battlemap standard:** Topdown · No grid · No text · No labels · 4096×4096 or 6000×6000 · Foundry-ready.

**Token prompt standard:**
```
Dark fantasy dragon cult [rank], [rank-specific description], ornate armor with dragon motifs, cinematic gothic lighting, ultra detailed, full body, transparent background, high contrast silhouette, no text, no watermark
```

---

## Hooks

`.claude/settings.json` configures a **Stop-hook**: `python3 .claude/hooks/rules-check.py` runs automatically after each session. It scans the most recent assistant output for:

1. 2014 terminology that is incorrect in a 2024 context (authoritative list: `OUTDATED_PATTERNS` in the script)
2. Language policy violations, where Danish text outside marked `Dialogue` and `Room Description` sections is rejected

2014 terminology that is flagged:

| 2014 pattern (trigger) | 2024 correct |
|---|---|
| `ki points` | Focus Points |
| `use an object` action | Utilize action |
| `use object action` | Utilize action |
| `exhaustion … disadvantage on ability checks` | –1 per level to all D20 Tests |
| `exhaustion … speed halved` | –1 per level to all D20 Tests |
| `true strike … reaction` | Action-cantrip (weapon attack with Int/Cha) |
| `true strike … advantage on your next attack` | Action-cantrip (weapon attack with Int/Cha) |
| `guidance … reaction` | Action |
| `guidance … bonus action` | Action |
| `healing word … 1d4` | 2d4 + mod |
| `silvery barbs` (any match) | Not in SRD – hook always flags; use Cutting Words or mark explicitly as homebrew/non-SRD |
| `grapple … special attack` | Attack action (one of your attacks) |
| `stunning strike … ki point` | Focus Point |

The hook returns exit code 2 and a message to stderr when found. If it fails, investigate the script rather than bypassing it.
