---
name: dnd5e-2024-srd
description: Regelopslag i D&D 5e 2024 SRD (SRD 5.2, CC-BY-4.0). Brug denne skill til at verificere regler, spells, klasser, monstre, magic items og conditions efter 2024-reglerne. Indeholder de officielle 2024 SRD-filer lokalt. Brug den når der er tvivl om en regel, eller når output skal tjekkes mod 2024-reglerne.
---

# D&D 5e 2024 SRD – Lokalt Regelopslag

Lokal kopi af D&D 5e SRD 5.2 (2024, CC-BY-4.0) som markdown-filer i `references/`.

## Filindeks

| Fil | Indhold |
|---|---|
| `playing-the-game.md` | Kerneregelsæt: actions, combat, saves, skill checks |
| `rules-glossary.md` | Conditions, termer, definitioner |
| `classes.md` | Alle klasser inkl. subclasses (Wizard, Ranger, Barbarian, Bard m.fl.) |
| `spells.md` | Komplet spellliste med beskrivelser |
| `monsters.md` | Monster-regler og traits |
| `monsters-A-Z.md` | Alle monster-statblocks A–Z |
| `animals.md` | Dyr og beasts |
| `magic-items.md` | Magic items |
| `equipment.md` | Udstyr, våben, rustninger |
| `feats.md` | Feats |
| `character-creation.md` | Karakterskabelse |
| `character-origins.md` | Backgrounds, species |
| `gameplay-toolbox.md` | DM-værktøjer, encounter-regler, XP/CR |

## Søgestrategi

### 1. Direkte grep-søgning

```bash
# Find en spell
grep -n "^## Fireball" /home/user/slut/.agents/skills/dnd5e-2024-srd/references/spells.md

# Find en condition
grep -n -A 20 "^### Grappled" /home/user/slut/.agents/skills/dnd5e-2024-srd/references/rules-glossary.md

# Find et monster
grep -n "^## Dragon, Adult Red" /home/user/slut/.agents/skills/dnd5e-2024-srd/references/monsters-A-Z.md

# Find en klasse-feature
grep -n -A 30 "Sculpt Spells" /home/user/slut/.agents/skills/dnd5e-2024-srd/references/classes.md
```

### 2. Python søgeværktøj (anbefalet til komplekse forespørgsler)

```bash
# Søg på tværs af alle filer
python3 /home/user/slut/.agents/skills/dnd5e-2024-srd/scripts/search.py "søgeterm"

# Søg i specifik fil
python3 /home/user/slut/.agents/skills/dnd5e-2024-srd/scripts/search.py "søgeterm" --file spells.md

# Vis sektion rundt om match
python3 /home/user/slut/.agents/skills/dnd5e-2024-srd/scripts/search.py "Legendary Resistance" --context 30
```

### 3. Hvad finder du hvor

**Regler og combat:**
- `playing-the-game.md` → Actions, Attack rolls, Saving Throws, Concentration, Opportunity Attacks
- `rules-glossary.md` → Conditions (Grappled, Frightened, Stunned osv.), termdefinitioner

**Klasser (aktiv gruppe):**
- `classes.md` → Wizard/Evoker, Ranger/Hunter, Barbarian/Berserker, Bard/Lore – alle features til level 14-15

**Spells:**
- `spells.md` → Alle 2024-spells med korrekte damage dice, ranges, components

**Monstre:**
- `monsters-A-Z.md` → Statblocks inkl. Adult Chromatic Dragons, Cultists, Cult Fanatics
- `monsters.md` → Monster traits og legendary action-regler

**Magic items:**
- `magic-items.md` → Dragon Slayer, Cloak of Protection, Ring of Resistance osv.

## Vigtige 2024-ændringer vs. 2014

| Emne | 2014 | 2024 |
|---|---|---|
| Exhaustion | 6 niveauer med unikke penalties | 6 niveauer = -1 per niveau til alle D20 Tests |
| Grapple/Shove | Special attacks | Brug af Attack action (en af attacks) |
| Actions (kamp) | Attack, Dash, Disengage, Dodge, Help, Hide, Ready, Search, Use Object | + Influence, Magic, Study, Utilize |
| Weapon Mastery | Ikke eksisterende | Cleave, Graze, Nick, Push, Sap, Slow, Topple, Vex |
| Cunning Action (Rogue) | Bonus action | Ikke ændret (stadig bonus action i 2024) |
| Healing Word | 1d4 + mod | 2d4 + mod |
| Silvery Barbs | Ikke SRD | Ikke SRD |
| True Strike | Reaction, Advantage | Action, Cantrip, Weapon attack med Charisma/Intelligence |
| Guidance | Reaction | Action |
| Ranger features | Forced realities | Reviderede klasse-features |

## Citering

Angiv altid kilde ved regelopslag:
```
[dnd5e-2024-srd/references/spells.md – Fireball]
[dnd5e-2024-srd/references/rules-glossary.md – Grappled condition]
```
