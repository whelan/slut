# Temple of Tiamat – Navigation

Temple of Tiamat er slutkampagnens absolutte centrum. Templet køres som tre vertikale zoner med en aktiv ritual clock der driver urgency.

## Filstruktur

| Fil | Indhold |
|---|---|
| [niveau-1-the-maw.md](niveau-1-the-maw.md) | Ydre tempelgrund – indgang, Gate of Bone, The Procession |
| [niveau-2-the-fivefold-sanctum.md](niveau-2-the-fivefold-sanctum.md) | De fem chromatic foci – sabotage og guardians |
| [niveau-3-the-crown.md](niveau-3-the-crown.md) | Severin boss fight, Tiamat-manifestation, templets kollaps |
| [ritual-clock.md](ritual-clock.md) | Clock-mekanik, triggers, starttilstand |
| [battlemap-prompts.md](battlemap-prompts.md) | Image generation prompts til alle tre niveauer |

## Overordnet flow

```
Ankomst til Well of Dragons
        ↓
[NIVEAU 1 – The Maw]
  Encounter A: Gate of Bone (combat eller skill challenge)
  Encounter B: The Procession (moral valg)
        ↓
[NIVEAU 2 – The Fivefold Sanctum]
  5 chromatic foci – sabotér så mange som muligt
  Anbefalet rækkefølge: Green → Red → Black → White → Blue
        ↓
[NIVEAU 3 – The Crown]
  Pre-combat: Severin taler
  Boss fight: Severin + Tiamat-interferens
  Vindmuligheder: dræb Severin / ødelæg masker / bryd ritual circle
        ↓
Templets kollaps (15 runder til flugt)
```

## Designprincipper

- **Tre aktive zoner** – kun én køres taktisk ad gangen
- **Ritual clock** driver urgency hele vejen igennem
- **Sabotage > combat** på Niveau 2 – belønner smarte valg
- **Severin er ikke stationær** – han reagerer på sabotage undervejs
- **Tiamat er aldrig fraværende** – hendes nærvær eskalerer løbende

## Ritual Clock – hurtigreference

| Clock | Hvad sker der |
|---|---|
| 0–2 | Tiamats øjne ses i portalen. Ingen mekanisk effekt. |
| 3 | DC 14 WIS save eller Frightened ved start af Niveau 3-kamp |
| 4 | Et hoved halvvejs igennem. 15 ft. zone: 3d6 fire+cold/runde |
| 5 | Severin: Champion of Tiamat (+2 saves og attacks) |
| 6 | Et hoved angriber: +14, 4d6+8 piercing, 1/runde |
| 7 | Severin kan ikke dø (min. 3 HP) uden portalen lukkes først |
| 8 | Tiamat manifesterer – se Fase 4 konsekvenser |

Se [ritual-clock.md](ritual-clock.md) for fuld mekanik.

## Sabotage-effekter – hurtigreference

| Foci ødelagt | Effekt |
|---|---|
| Black | Acid/necrotic pressure forsvinder |
| Blue | Lair actions fra Blue fjernes |
| Green | Poison clouds og illusioner falder |
| Red | Fire aura og magma-tiles deaktiveres |
| White | Cold slow/freeze effects fjernes |

## Gruppen ved bordet

- **Axar Runes** – Dwarf Wizard 14. Sæt ham under pres med Abishai concentration-jagere og Counterspell-dueller.
- **Daxx Drake** – Changeling Ranger 13. Giv ham scouting-øjeblikke og Favored Enemy-fordele.
- **Frygtløs** – Goliath Barbarian 14. Giv ham fysiske udfordringer der ændrer slagets gang.
- **Twilight Ventress** – Elf Bard 13. Sårbar HP – trusler mod hende skaber reel spænding. Social leverage i pre-combat.
