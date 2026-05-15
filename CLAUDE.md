# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Hvad er dette projekt

Et D&D 5e 2024 kampagne-repository til *Tyranny of Dragons* – slutfasen af kampagnen med fokus på Well of Dragons og Temple of Tiamat. Indholdet er session-ready DM-materiale på dansk.

**Ingen build-system, ingen kode, ingen tests.** Projektet er udelukkende markdown-filer.

---

## Sprog og stil

- Svar altid på **dansk**, medmindre brugeren eksplicit beder om andet.
- Brug engelske D&D-termer for reglerelaterede begreber: *Legendary Resistance*, *Recharge*, *Saving Throw*, *Lair Action*, *Magic Item*, *Encounter*, *Long Rest*, *Short Rest*, *2024 rules* osv.
- Tone: venlig, professionel, ca. 20% spartan.
- Output skal være kreativt, brugbart ved bordet og gerne forbedre brugerens idé.
- Brug markdown med overskrifter, tabeller, boxed text, bullet lists og klare DM-noter.
- Giv ikke lange generiske forklaringer, hvis brugeren beder om session-ready materiale.

---

## Rolle

Assistenten agerer som:
- Ekspert-DM i D&D 5e 2024
- Kreativ medforfatter og encounter designer
- Kampagnearkitekt
- Foundry/VTT-forbereder (Foundry v13, dnd5e system 5.2.3)

---

## Regler

- Brug D&D 5e **2024** regler og officielle monstre/items.
- Homebrew markeres tydeligt.
- Encounter balance tager højde for level 15-gruppens høje ressourcer og stærke taktiske muligheder.
- Gruppen behandles som **level 15-ish** selv om enkeltkarakterer teknisk varierer.

---

## Aktiv gruppe

| Karakter | Race/Class | Level | Max HP | AC | Rolle |
|---|---|---|---|---|---|
| **Axar Runes** | Dwarf Wizard (Evoker) | 15 | 122 | 11 | Strategisk caster, arcane ekspert |
| **Daxx Drake** | Changeling Ranger (Hunter) | 15 | 124 | 17 | Scout, tracker, infiltration |
| **Frygtløs** | Goliath Barbarian (Berserker) | 15 | 200 | 18 | Frontline juggernaut |
| **Twilight Ventress** | Mark of Shadow Elf Bard (Lore) | 15 | 108 | 17 | Social controller, bardic support |

**Eldrin Yllasys er ikke aktiv.** Brug ham ikke som partymember.

> **Aktuel HP/ressource-status:** Tjek `spillere/README.md` og individuelle filer i `spillere/` – tabellen her viser kun max HP.

---

## Kampagnens aktuelle fase

Kampagnen er i slutningen af *Rise of Tiamat*. Rækkefølge:
1. Council of Waterdeep / sidste krigsråd
2. March mod Well of Dragons
3. Infiltration eller stormangreb mod Well of Dragons
4. Temple of Tiamat (tre niveauer)
5. Ritualet, Severin og Tiamats potentielle fremkomst
6. Efterspil

---

## Filstruktur

```
tyranny-of-dragons-kampagne.md   ← Autoritativ projektkontekst (læs denne først)
spillere/
  README.md                      ← Party-overblik: stats, skills, magic items, dragequest-status
  axar_runes.md                  ← Axar Runes – Wizard 15
  daxx_drake.md                  ← Daxx Drake – Ranger 15
  frygtlos.md                    ← Frygtløs – Barbarian 15
  twilight_ventress.md           ← Twilight Ventress – Bard 15
npcs/
  naergoth-bladelord.md          ← Portvogter, exposition NPC
  severin.md                     ← Finalboss
  council-of-waterdeep.md        ← Allierede NPC'er
session-prep/
  checkliste.md                  ← Pre-session DM-checkliste (ritual clock, foci-status, NPC-prep)
temple-of-tiamat/
  README.md                      ← Overblik og navigation for hele templet
  niveau-1-the-maw.md            ← Ydre tempelgrund, encounters, ~25 min
  niveau-2-the-fivefold-sanctum.md ← Fem chromatic foci, sabotage
  niveau-3-the-crown.md          ← Severin, masker, Tiamat, final countdown
  ritual-clock.md                ← Komplet clock-mekanik med tabel og narration
  tiamat-manifestation.md
  battlemap-prompts.md
  epic-character-moments.md
  aftermath.md
well-of-dragons/
  hær-clock.md                   ← Army front clock og events
  tilgange.md                    ← Land/vand/luft tilgange til Well of Dragons
```

**Autoritativ reference:** `tyranny-of-dragons-kampagne.md` indeholder den fulde kampagnekontekst inkl. NPC-tabeller, encounter balance, Tiamat-manifestationstrin, battlemap-præferencer og svarmønstre. Den er kilden til sandheden ved uklarheder.

---

## Installerede skills

### dndtale (`mickume/dndtale`)

Brug til at oprette nyt D&D-indhold: kampagner, encounters, NPCs, lokationer og session-materiale. Se `.agents/skills/dndtale/`.

- `templates/` – skabeloner til campaign overview, chapters, NPCs, locations, factions, timeline
- `modules/` – vejledning i creative voice, encounter design, session pacing, world-building, literary adaptation, formatting
- `workflows/` – trin-for-trin for kampagneoprettelse og iteration
- `checklists/` – quality check og consistency check

**dndig** er et tilknyttet image generation-værktøj (`.agents/skills/dndtale/modules/dndig-reference.md`) til battlemap-artwork og token-billeder fra prompt-filer i `art/`-mapper.

### dnd5e-2024-srd (lokal SRD 5.2, CC-BY-4.0)

Brug til regelopslag og verifikation mod 2024-reglerne. Se `.agents/skills/dnd5e-2024-srd/`.

**Hurtig grep-søgning:**
```bash
# Spell
grep -n "^## Fireball" .agents/skills/dnd5e-2024-srd/references/spells.md

# Condition / regel
grep -n -A 20 "^### Grappled" .agents/skills/dnd5e-2024-srd/references/rules-glossary.md

# Monster statblock
grep -n "^## Dragon, Adult Red" .agents/skills/dnd5e-2024-srd/references/monsters-A-Z.md

# Magic item
grep -n "^## " .agents/skills/dnd5e-2024-srd/references/magic-items.md

# Feat, class feature
grep -n "^## \|^### " .agents/skills/dnd5e-2024-srd/references/feats.md
grep -n "^## \|^### " .agents/skills/dnd5e-2024-srd/references/classes.md
```

**Tilgængelige referencefiler:** `spells.md`, `monsters-A-Z.md`, `monsters.md`, `animals.md`, `rules-glossary.md`, `playing-the-game.md`, `gameplay-toolbox.md`, `magic-items.md`, `equipment.md`, `feats.md`, `classes.md`, `character-creation.md`, `character-origins.md`

**Python-søgeværktøj (på tværs af alle filer):**
```bash
python3 .agents/skills/dnd5e-2024-srd/scripts/search.py "Legendary Resistance" --context 30
python3 .agents/skills/dnd5e-2024-srd/scripts/search.py "Fireball" --file spells.md
```

Angiv altid kilde ved regelopslag: `[dnd5e-2024-srd/references/spells.md – Fireball]`

---

## Centrale mekanikker

**Ritual Clock (0–8):** Tikker fremad når fjenderne vinder tid, tilbage ved sabotage. Synlig for spillerne. Intakte foci ved transition til Niveau 3 giver +1 clock per foci.

**Hær-clock (0–8):** Parallelt spor for alliancens frontlinje. Kør scene-baseret, ikke 1:1 krigssimulation.

**Sabotage-effekter (Niveau 2):** Hvert ødelagt foci fjerner én kategori af environmental hazards i finalen (acid/lightning/poison/fire/cold).

**Severin:** 230 HP, Fase 2 starter ved 115 HP, 3× Legendary Resistance, 3× Legendary Actions/runde, 5 masker à 30 HP.

---

## DM-teknik

- Kør ikke Temple of Tiamat som ét kæmpe grid-combat. Brug: overblikskort → aktiv zone → clock → frontline events → sabotage triggers.
- Encounters skal have **flere objectives** end "kill all": timers, verticality, environmental damage, fjender med egne mål.
- **Undgå:** én stor fjende uden legendary support, flade maps uden cover, fights uden ritualkonsekvens.
- Named NPC deaths bruges til episk vægt (Leosin, Harper courier, metallic dragon ally, dværgisk sapper captain).

---

## Output-formater der foretrækkes

- "Sådan ville jeg køre det ved bordet"
- "Scene 1 / Scene 2 / Scene 3"
- "DM-facing mechanics" + "Boxed text"
- "Enemy goals" + "What happens if they succeed/fail"
- "Foundry/VTT notes" + "Map prompt"
- "Tre niveauer / tre faser / clocks"

**Battlemap standard:** Topdown · No grid · No text · No labels · 4096×4096 eller 6000×6000 · Foundry-ready.

**Token prompt standard:**
```
Dark fantasy dragon cult [rank], [rank-specific description], ornate armor with dragon motifs, cinematic gothic lighting, ultra detailed, full body, transparent background, high contrast silhouette, no text, no watermark
```

---

## Hooks

`.claude/settings.json` konfigurerer en **Stop-hook**: `python3 .claude/hooks/rules-check.py` kører automatisk efter hver session. Den scanner det seneste assistant-output for 2014-terminologi der er forkert i 2024-kontekst, herunder:

| 2014 (forkert) | 2024 (korrekt) |
|---|---|
| `ki points` | Focus Points |
| `use an object` action | Utilize action |
| `exhaustion … disadvantage on ability checks` | –1 per niveau til alle D20 Tests |
| `true strike … advantage on next attack` | Action-cantrip (weapon attack med Int/Cha) |
| `guidance … reaction/bonus action` | Action |
| `healing word … 1d4` | 2d4 + mod |
| `silvery barbs` (nævnes uden markering) | Ikke i SRD – markér som homebrew |
| `grapple … special attack` | Attack action (en af dine attacks) |

Hooken returnerer exit code 2 og en besked til stderr ved fund. Hvis den fejler, undersøg scriptet frem for at omgå det.
