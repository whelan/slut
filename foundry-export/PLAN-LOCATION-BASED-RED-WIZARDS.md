# Plan: Red Wizards by Temple Placement

## Critical Analysis

**Current Problems with Previous Approach:**
1. 10 generic wizards with random traits don't fit the temple layout
2. Sariax (Arcane Master) would overshadow everything - unrealistic
3. Narathor feeding on deaths makes combat unpredictably snowball
4. No spatial relationship to actual temple structure
5. Ritual mechanics don't connect to their physical locations

**Better Approach - Location-Based Design:**

Instead of generic archetypes, define wizards by WHERE they stand in the temple:
- Each location has unique tactical advantages
- Ritual contribution based on positioning
- Flying wizards vs grounded wizards have different combat styles
- Chapel colors could inform spell specialization
- Removal of a wizard affects that specific ritual location

---

## Temple Layout Analysis

```
Ground Level (4 chapels + 1 great apse):
├─ 1. Blue Chapel (entrance) → Red Wizard
├─ 3. White Chapel → Red Wizard  
├─ 4. Green Chapel → Red Wizard
├─ 5. Black Chapel (exit) → Red Wizard
├─ 6. Red Chapel → RATH MODAR (elite, not generic wizard)
└─ 7. Great Apse → PORTAL (Tiamat emerges)

Spires (5 flying positions):
├─ 8. Blue Spire → Red Wizard (flying)
├─ 9. White Spire → Red Wizard (flying)
├─ 10. Green Spire → Red Wizard (flying)
├─ 11. Black Spire → Red Wizard (flying)
└─ 12. Red Spire → Red Wizard (flying)

Command:
└─ 13. Sanctuary → SEVERIN (boss, not a wizard)
```

**Total Red Wizards Needed: 9** (not 10)
- 4 grounded (chapels 1, 3, 4, 5)
- 5 flying (spires 8-12)

---

## Design Philosophy

### Grounded Wizards (4 - one per chapel)
**Role:** Maintain ritual at specific location, defend chapel entrance

Each named after their chapel color:
- **Magus Azuri** (Blue Chapel) - Entrance guardian, diplomatic if possible, defensive first
- **Magus Alabaster** (White Chapel) - Cold-focused, controls temperature/ice hazards
- **Magus Verdian** (Green Chapel) - Toxin-focused, poison/acid hazards, stealth-capable
- **Magus Obsidian** (Black Chapel) - Exit guardian, blocks retreat, acid-focused

**Combat Style:** Defensive, territorial. They stand their ground because that's their ritual post.

**Ritual Contribution:** Each maintains a portion of the ritual circle at their location. If wizard dies → that chapel's portion fails, increasing overall ritual DC.

**Defensive Tactics:**
- Control chapel entrance/terrain
- Use location as defensive advantage (high ground, cover, environmental hazards)
- Have prepared escape routes if overwhelmed
- Support each other if attackers move between chapels

---

### Flying Wizards (5 - one per spire)
**Role:** Aerial support for ritual, maintain field control, rain spells down

Each represents one of Tiamat's dragonheads (color correspondance):

- **Magus Cerulean** (Blue Spire) - Lightning caster, aerial mobility
- **Magus Platinum** (White Spire) - Cold/ice, slowing effects  
- **Magus Viridian** (Green Spire) - Poison spray, area effects
- **Magus Obsidian II** (Black Spire) - Acid rain, corrosive effects
- **Magus Vermillion** (Red Spire) - Fire, offensive aggression

**Combat Style:** Mobile, aggressive. They can reposition, attack from above, rain spells on targets.

**Ritual Contribution:** Flying pattern creates aerial ritual circle. Disrupting their pattern (knocking one down, killing one) destabilizes the aerial portion of the ritual.

**Defensive Tactics:**
- Maintain altitude advantage
- Support ground wizards from above
- Create overlapping coverage
- Fall back to higher ground if threatened

---

## Specific Red Wizard Designs

### GROUNDED WIZARDS

**1. Magus Azuri (Blue Chapel - Entrance)**
- Role: Gatekeeper, first line of defense
- Ritual: Opening phase of ritual, maintains entry point energy
- Combat: If party enters, casts Counterspell to block their spells initially, then either fights or signals for help
- Personality: Least fanatic, might parley first, but committed to ritual
- Defensive advantage: Controls entrance, can bar doors, calls reinforcements from adjacent areas

**2. Magus Alabaster (White Chapel)**  
- Role: Cold anchor point of ritual
- Ritual: Maintains white dragon essence energies, temperature control
- Combat: Uses cold spells (Cone of Cold, Frostbolt), creates ice hazards in chapel
- Personality: Patient, methodical, ice-cold demeanor
- Defensive advantage: Terrain manipulation (ice walls, slippery ground), cold resistance
- If killed: White dragon aspect of ritual weakens (party gains ice resistance), ritual DC +1

**3. Magus Verdian (Green Chapel)**
- Role: Poison/toxin anchor point
- Ritual: Maintains green dragon essence, poisons/pollutes atmosphere
- Combat: Poison spells, toxic gas, stealth in shadows
- Personality: Vicious, cruel, uses poisons extensively
- Defensive advantage: Poison clouds obscure vision, poison aura damages intruders
- If killed: Green dragon poison removed, ritual DC +1

**4. Magus Obsidian (Black Chapel - Exit)**
- Role: Prevents escape, blocks exit route
- Ritual: Maintains black dragon essence, acid controls
- Combat: Acid spells, blocks exits with magical walls, corrosive aura
- Personality: Trapped in this role, somewhat resentful but committed
- Defensive advantage: Controls only exit, can funnel party into prepared area
- If killed: Exit becomes usable, ritual DC +1

---

### FLYING WIZARDS

**Magus Cerulean (Blue Spire - Lightning)**
- Aerial lightning caster, strikes from height
- Can Misty Step mid-air, lightning chains between enemies
- If knocked prone/flying dispelled → falls 50 ft to ground (takes damage but might survive)
- If killed: Lightning coordination lost, flying formation breaks

**Magus Platinum (White Spire - Ice)**
- Maintains aerial ice storm, slows ground movements
- Creates icing on surfaces below
- Uses slow spells to prevent party escape
- If killed: Ice barriers dissolve, party mobility returns

**Magus Viridian (Green Spire - Poison)**
- Drops poison clouds/gas from above
- Poison damage to anyone outdoors
- Creates toxic environment
- If killed: Air becomes breathable, poison clouds disperse

**Magus Obsidian II (Black Spire - Acid)**
- Acid rain on temple grounds
- Corrodes equipment, damages structures
- If knocked down → crashes (takes massive damage)
- If killed: Acid rain stops, structures stop degrading

**Magus Vermillion (Red Spire - Fire)**
- Most aggressive flyer, fire-focused
- Dive attacks, flame sweeps below
- Supports Rath Modar and overall ritual
- If killed: Fire aspect weakened, party gains fire resistance

---

## Antagonist Strategy

### RATH MODAR (Red Chapel - Boss-Level Wizard)
**Location:** Red Chapel (position 6)  
**Role:** Master of the ritual, second-in-command  
**Status:** Search compendia first for official 2024 version  

**Approach:**
1. Search all Foundry compendia for official "Rath Modar"
2. If found → Clone and update to 2024 D&D 5e rules:
   - Spell Save DC: 8 + INT mod + proficiency
   - Proficiency bonus: Correct for CR
   - Ability modifiers: 2024 standard
3. If not found → Use manual STEP3 creation (backup)
4. Save to temple-of-tiamat folder

**2024 Compliance:**
- Update all spell DCs to 2024 formula
- Verify proficiency bonus by CR
- Recalculate ability modifiers
- Check action economy (2024 standard)

---

### SEVERIN (Sanctuary - Ultimate Boss)
**Location:** Sanctuary (position 13), levitating wearing Mask of the Dragon Queen  
**Role:** Final boss, nearly unkillable while ritual progresses  
**Status:** Search compendia first for official 2024 version

**Approach:**
1. Search all Foundry compendia for official "Severin"
2. If found → Clone and update to 2024 D&D 5e rules:
   - Spell Save DC: 8 + CHA mod + proficiency
   - Legendary Resistance: 3/day (verified)
   - Phase 2 triggers at 50% HP (ritual mechanics)
3. If not found → Use manual STEP3 creation (backup)
4. Save to temple-of-tiamat folder

**Special Mechanics:**
- Mask of the Dragon Queen affects stats (verify in 2024 rules)
- Two-phase battle tied to ritual progression
- Cannot die while ritual active (mechanics linked)

---

## Complete Implementation Strategy

### Phase 1: Search & Verify Official Versions
Search all Foundry compendia for:
- [ ] Rath Modar (any version)
- [ ] Severin (any version)
- Report which ones found vs missing

### Phase 2: Update Found NPCs to 2024 Rules
For Rath Modar (if found):
- [ ] Update spell save DC: 8 + INT mod + proficiency
- [ ] Verify proficiency bonus by CR
- [ ] Recalculate ability modifiers (2024 standard)
- [ ] Move to temple-of-tiamat folder

For Severin (if found):
- [ ] Update spell save DC: 8 + CHA mod + proficiency
- [ ] Verify legendary resistance (3/day)
- [ ] Update two-phase mechanics to 2024 rules
- [ ] Ensure phase triggers work with ritual system
- [ ] Move to temple-of-tiamat folder

### Phase 3: Delete Old Generic Red Wizards
- [ ] Remove all 10 old elite Red Wizards from temple-of-tiamat
- [ ] Confirm deletion from folder

### Phase 4: Create 9 Location-Based Red Wizards
- [ ] Base each on official 2024 Mage (cloned from compendium)
- [ ] Name by chapel/spire color
- [ ] 4 grounded wizards (chapels 1, 3, 4, 5)
- [ ] 5 flying wizards (spires 8-12)
- [ ] Add location-specific traits
- [ ] Add ritual mechanics tied to location

### Phase 5: Ritual System Integration
- [ ] Each wizard death increases ritual DC +1
- [ ] Flying formation disruption destabilizes aerial ritual
- [ ] Ground wizard removal affects specific chapel
- [ ] Total 9 disruption points (9 wizards = 9 ways to disrupt)
- [ ] Rath Modar as ritual master anchor point
- [ ] Severin as final escalation trigger

---

## Benefits of This Approach

✅ **Spatial Logic:** Wizards positioned where the ritual needs them  
✅ **Strategic Depth:** Players must choose which wizard to target and why  
✅ **Modular Difficulty:** Removing wizards in different orders creates different challenges  
✅ **Memorable Encounters:** "The ice wizard in the White Chapel" vs "generic Alabaster"  
✅ **Ritual System Tie-In:** Wizard locations = ritual structure = architectural importance  
✅ **Flying vs Grounded:** Two different combat experiences (ranged aerial vs close tactical)  
✅ **Rath Modar Distinction:** He's the boss wizard (Red Chapel), not one of the generic ones  

---

## Changes to the Script

**What to Add:**
1. Delete old Red Wizard actors from temple-of-tiamat folder
2. Create 9 new wizards (not 10)
3. Name them by chapel color (Azuri, Alabaster, Verdian, Obsidian, etc.)
4. Add location-specific traits (flying/grounded, environmental effects)
5. Add ritual location mechanics (which ritual phase each one maintains)
6. Add tactical DM notes for each location encounter
7. Include visual location description in biography

**What to Remove:**
- Generic Thallid, Szass, Zalathorm, etc. from old script
- Random traits like "Evocation Mastery" that don't fit locations
- Sariax (too powerful, doesn't fit any location)
- Overpowered mechanics (legendary reactions, instant summons)

---

## Critical Questions Answered

**Q: Why location-based instead of archetype-based?**  
A: Party can SEE the temple layout. Making wizards tied to specific chapels makes the ritual visible and tactical. Destroying a wizard = visible progress on the ritual.

**Q: Why delete old wizards?**  
A: They're generic and don't serve the specific encounter. New ones are purpose-built for temple combat.

**Q: Why 9 instead of 10?**  
A: Temple has 9 ritual positions for Red Wizards (4 grounded + 5 flying). Rath Modar is different (boss-level). Severin is ultimate boss.

**Q: Why flying vs grounded mechanic?**  
A: Creates two combat phases: ground-level chapel encounters, then aerial spire encounters. Different strategies for each.

---

## Single Unified Implementation Script

**One script does everything:**

`CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js`

**Handles all 5 phases:**

1. **Search all compendia** for official Rath Modar
2. **Search all compendia** for official Severin
3. **Update both to 2024 rules** (if found in compendium)
4. **Delete** 10 old generic Red Wizards from temple-of-tiamat
5. **Create** 9 new location-based Red Wizards (one per chapel/spire)

**All in one execution - no manual steps needed**

---

## Ready to Implement?

This approach is:
- ✅ Location-based (matches temple)
- ✅ Mechanically sound (9 disruption points)
- ✅ Strategically rich (multiple valid approaches)
- ✅ Narratively coherent (ritual circle structure)
- ✅ Tactically interesting (flying vs grounded)
- ✅ Official-first (searches compendia for Rath Modar & Severin)
- ✅ 2024-compliant (all NPCs updated to 2024 rules)
- ✅ Unified (one script handles everything)

**Proceed with implementation?**
