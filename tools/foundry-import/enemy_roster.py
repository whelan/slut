"""Campaign enemy roster: SRD lookups + homebrew stat blocks for Tyranny of Dragons.

Three data tables:
1. SRD_CREATURES - names to look up in the local SRD (full stats parsed from monsters-A-Z.md)
2. HOMEBREW_CREATURES - level-15-tuned stat blocks for non-SRD content
3. NAMED_PRISONERS - sacrificial victims and rescuable NPCs with bios

All stat blocks for HOMEBREW are tuned for a party of 4 PCs at level 15.
"""

from typing import Any, Dict, List


# ---------------------------------------------------------------------------
# SRD CREATURES (looked up in .agents/skills/dnd5e-2024-srd/references/monsters-A-Z.md)
# ---------------------------------------------------------------------------

SRD_CREATURES: List[Dict[str, str]] = [
    # name = SRD heading exactly; display_name = name shown in Foundry (optional override)
    {'name': 'Cultist'},
    {'name': 'Cultist Fanatic', 'display_name': 'Cult Fanatic'},
    {'name': 'Commoner'},
    {'name': 'Black Dragon Wyrmling'},
    {'name': 'Air Elemental'},
    {'name': 'Stone Golem'},
    {'name': 'Flesh Golem'},
    {'name': 'Green Hag'},
    {'name': 'Wight'},
    {'name': 'Mage'},
    {'name': 'Barbed Devil'},
]


# ---------------------------------------------------------------------------
# HOMEBREW STAT BLOCKS - tuned for 4 PCs at level 15
# ---------------------------------------------------------------------------
# Encounter budget reference (XGtE / 2024 DMG):
#   Hard:   ~21,000 XP for the party
#   Deadly: ~32,000 XP for the party
# Solo boss target ~CR 17-20; lieutenants ~CR 12-14; mooks ~CR 4-8.

def _stat_block(**kw) -> Dict[str, Any]:
    """Build a stat-block dict with defaults so callers stay concise."""
    return {
        'ac': kw.get('ac', 14),
        'hp_value': kw.get('hp_value', 50),
        'hp_formula': kw.get('hp_formula', ''),
        'speed_walk': kw.get('speed_walk', 30),
        'speed_fly': kw.get('speed_fly', 0),
        'speed_swim': kw.get('speed_swim', 0),
        'speed_climb': kw.get('speed_climb', 0),
        'speed_burrow': kw.get('speed_burrow', 0),
        'hover': kw.get('hover', False),
        'str': kw.get('str', 10), 'dex': kw.get('dex', 10), 'con': kw.get('con', 10),
        'int': kw.get('int', 10), 'wis': kw.get('wis', 10), 'cha': kw.get('cha', 10),
        'saves': kw.get('saves', {}),  # {ability: bonus}
        'skills_prof': kw.get('skills_prof', []),  # list of 3-letter keys
        'darkvision': kw.get('darkvision', 60),
        'cr': kw.get('cr', 1),
        'xp': kw.get('xp', 200),
        'size': kw.get('size', 'med'),
        'type': kw.get('type', 'humanoid'),
        'languages': kw.get('languages', 'Common, Draconic'),
        'damage_resist': kw.get('damage_resist', []),
        'damage_immune': kw.get('damage_immune', []),
        'condition_immune': kw.get('condition_immune', []),
        'traits': kw.get('traits', []),
        'actions': kw.get('actions', []),
        'legendary_actions': kw.get('legendary_actions', []),
        'biography': kw.get('biography', ''),
        'source': kw.get('source', 'Tyranny of Dragons - homebrew, tuned for 4 PCs lvl 15'),
    }


HOMEBREW_CREATURES: List[Dict[str, Any]] = [

    # =====================================================================
    # DRAGON CULT MOOKS (Hoard of the Dragon Queen / Rise of Tiamat ranks)
    # Tuned UP from book values to challenge a level-15 party.
    # =====================================================================

    {
        'name': 'Dragonclaw',
        **_stat_block(
            ac=15, hp_value=58, hp_formula='9d8 + 18',
            speed_walk=30,
            str=14, dex=14, con=14, int=10, wis=10, cha=12,
            skills_prof=['itm', 'rel'],
            cr=4, xp=1100,
            size='med', type='humanoid',
            languages='Common, Draconic',
            traits=[
                {'name': 'Fanatical Frenzy', 'description': 'When reduced below half HP, the Dragonclaw gains +2 to attack rolls and damage rolls until the end of its next turn.'},
                {'name': 'Tiamat\'s Mark', 'description': 'Advantage on saving throws against being charmed or frightened.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'The Dragonclaw makes two scimitar attacks.'},
                {'name': 'Scimitar', 'description': '_Melee Attack Roll:_ +6, reach 5 ft. _Hit:_ 7 (1d6 + 4) Slashing damage plus 4 (1d8) Acid, Cold, Fire, Lightning, or Poison damage (DM\'s choice based on the cultist\'s patron chromatic dragon).'},
                {'name': 'Heavy Crossbow', 'description': '_Ranged Attack Roll:_ +5, range 100/400 ft. _Hit:_ 8 (1d10 + 3) Piercing damage.'},
            ],
            biography='<p>Frontline cultist sworn to a single chromatic dragon. Fanatical, expendable, but no longer a pushover at this stage of the war.</p>',
        ),
    },

    {
        'name': 'Dragonwing',
        **_stat_block(
            ac=17, hp_value=104, hp_formula='16d8 + 32',
            speed_walk=30, speed_fly=60,
            str=16, dex=16, con=14, int=12, wis=12, cha=14,
            saves={'dex': 6, 'con': 5},
            skills_prof=['per', 'ath'],
            darkvision=60,
            cr=8, xp=3900,
            size='med', type='humanoid',
            languages='Common, Draconic',
            traits=[
                {'name': 'Winged Strike', 'description': 'When the Dragonwing moves at least 20 feet straight toward a target and hits with a glaive attack on the same turn, the target takes an extra 9 (2d8) Slashing damage and must succeed on a DC 15 Strength save or be knocked prone.'},
                {'name': 'Sky Tactician', 'description': 'The Dragonwing has advantage on attack rolls against creatures that don\'t have a flying speed.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'The Dragonwing makes three glaive attacks. It can replace one with a Hurled Spear.'},
                {'name': 'Glaive', 'description': '_Melee Attack Roll:_ +8, reach 10 ft. _Hit:_ 10 (1d10 + 5) Slashing damage.'},
                {'name': 'Hurled Spear', 'description': '_Ranged Attack Roll:_ +8, range 30/120 ft. _Hit:_ 9 (1d8 + 5) Piercing damage.'},
            ],
            biography='<p>Elite flying cultist with grafted dragon wings. Trained as aerial shock troops; rarely fights alone.</p>',
        ),
    },

    {
        'name': 'Dragonfang',
        **_stat_block(
            ac=18, hp_value=171, hp_formula='18d8 + 90',
            speed_walk=30,
            str=18, dex=14, con=20, int=14, wis=14, cha=18,
            saves={'str': 8, 'con': 9, 'wis': 6},
            skills_prof=['itm', 'rel', 'per'],
            darkvision=60,
            cr=11, xp=7200,
            size='med', type='humanoid',
            languages='Common, Draconic',
            damage_resist=['nonmagical bludgeoning, piercing, and slashing'],
            traits=[
                {'name': 'Officer\'s Command', 'description': 'On its turn, the Dragonfang can use a bonus action to direct one allied cultist within 60 ft. it can see; the ally may use its reaction to move up to its speed or make one weapon attack.'},
                {'name': 'Dragon Soul Resilience', 'description': 'Advantage on saving throws against being charmed, frightened, or paralyzed.'},
                {'name': 'Chromatic Aspect', 'description': 'Once per turn when the Dragonfang hits with a weapon, it deals an extra 14 (4d6) damage of a chromatic type (Acid, Cold, Fire, Lightning, or Poison; chosen at character creation).'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'The Dragonfang makes three Greatsword attacks.'},
                {'name': 'Greatsword', 'description': '_Melee Attack Roll:_ +9, reach 5 ft. _Hit:_ 13 (2d6 + 6) Slashing damage plus 14 (4d6) damage of the Dragonfang\'s chromatic type.'},
                {'name': 'Dragon\'s Breath (Recharge 5-6)', 'description': '_Constitution Saving Throw:_ DC 17 in a 30-foot cone. _Failure:_ 35 (10d6) damage of the Dragonfang\'s chromatic type. _Success:_ half damage.'},
            ],
            biography='<p>Wyrmspeaker lieutenant. Commands a squad of Dragonwings and Dragonclaws. Each has been infused with a chromatic dragon\'s essence.</p>',
        ),
    },

    {
        'name': 'Dragonsoul',
        **_stat_block(
            ac=19, hp_value=243, hp_formula='18d10 + 144',
            speed_walk=40, speed_fly=60,
            str=22, dex=16, con=22, int=14, wis=16, cha=20,
            saves={'str': 11, 'con': 11, 'wis': 8, 'cha': 10},
            skills_prof=['itm', 'rel', 'per', 'ins'],
            darkvision=120,
            cr=14, xp=11500,
            size='lg', type='humanoid',
            languages='Common, Draconic, Abyssal',
            damage_resist=['nonmagical bludgeoning, piercing, and slashing', 'acid', 'cold', 'fire', 'lightning', 'poison'],
            condition_immune=['frightened', 'paralyzed', 'charmed'],
            traits=[
                {'name': 'Legendary Resistance (2/Day)', 'description': 'If the Dragonsoul fails a saving throw, it can choose to succeed instead.'},
                {'name': 'Ascended Form', 'description': 'The Dragonsoul is partially transformed into a dragon: scaled skin, claws, partial wings. Has advantage on saves against spells and magical effects.'},
                {'name': 'Chromatic Aura', 'description': 'Once per turn when the Dragonsoul hits with a weapon, it deals an extra 21 (6d6) damage of all five chromatic types (5d6 acid + 5d6 cold + 5d6 fire + 5d6 lightning + 5d6 poison, divided as 21 total damage).'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'The Dragonsoul makes three Claw attacks and one Bite attack, or four Claw attacks.'},
                {'name': 'Claw', 'description': '_Melee Attack Roll:_ +12, reach 10 ft. _Hit:_ 17 (2d8 + 8) Slashing damage plus 9 (2d8) damage of one chromatic type.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +12, reach 10 ft. _Hit:_ 20 (3d8 + 8) Piercing damage plus 13 (3d8) damage of one chromatic type.'},
                {'name': 'Five-Color Breath (Recharge 5-6)', 'description': '_Dexterity Saving Throw:_ DC 19 in a 60-foot cone. _Failure:_ 55 (10d10) damage divided among all five chromatic types. _Success:_ half damage.'},
            ],
            legendary_actions=[
                {'name': 'Claw Strike (1 action)', 'description': 'The Dragonsoul makes one Claw attack.'},
                {'name': 'Wing Beat (2 actions)', 'description': 'Each creature within 10 ft. must succeed on a DC 18 Strength save or be knocked prone and pushed 10 ft.'},
                {'name': 'Tiamat\'s Decree (3 actions)', 'description': 'One creature the Dragonsoul can see within 60 ft. must succeed on a DC 18 Wisdom save or be Frightened of it until the end of its next turn.'},
            ],
            biography='<p>The pinnacle of the Dragon Cult\'s mortal ranks. Granted essence of all five chromatic dragons. Above only Severin himself in the cult hierarchy.</p>',
        ),
    },

    # =====================================================================
    # ABISHAI (devil servants of Tiamat - from Mordenkainen's Tome of Foes,
    # re-statted here as homebrew. Each tied to one chromatic color.)
    # =====================================================================

    {
        'name': 'White Abishai',
        **_stat_block(
            ac=15, hp_value=85, hp_formula='10d8 + 40',
            speed_walk=30, speed_fly=40,
            str=14, dex=15, con=18, int=11, wis=12, cha=13,
            saves={'dex': 6, 'wis': 4},
            darkvision=120,
            cr=6, xp=2300,
            size='med', type='fiend',
            languages='Draconic, Infernal, telepathy 120 ft.',
            damage_resist=['cold', 'nonmagical bludgeoning, piercing, and slashing'],
            damage_immune=['fire', 'poison'],
            condition_immune=['poisoned'],
            traits=[
                {'name': 'Devil\'s Sight', 'description': 'Magical darkness doesn\'t impede the Abishai\'s darkvision.'},
                {'name': 'Magic Resistance', 'description': 'Advantage on saving throws against spells and other magical effects.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'The Abishai makes one Bite attack and two Claw attacks.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +6, reach 5 ft. _Hit:_ 6 (1d6 + 3) Piercing plus 4 (1d8) Cold damage.'},
                {'name': 'Claw', 'description': '_Melee Attack Roll:_ +6, reach 5 ft. _Hit:_ 8 (2d4 + 3) Slashing damage.'},
                {'name': 'Cold Breath (Recharge 5-6)', 'description': '_Constitution Saving Throw:_ DC 15 in a 15-foot cone. _Failure:_ 22 (5d8) Cold damage. _Success:_ half.'},
            ],
            biography='<p>Frost-touched devil sniper. Often perches on barricades and ledges; engages from range with crossbows or icy breath.</p>',
        ),
    },

    {
        'name': 'Black Abishai',
        **_stat_block(
            ac=15, hp_value=104, hp_formula='11d8 + 55',
            speed_walk=30, speed_fly=50,
            str=14, dex=16, con=20, int=14, wis=13, cha=15,
            saves={'dex': 7, 'wis': 5},
            darkvision=120,
            cr=9, xp=5000,
            size='med', type='fiend',
            languages='Draconic, Infernal, telepathy 120 ft.',
            damage_resist=['cold', 'nonmagical bludgeoning, piercing, and slashing'],
            damage_immune=['fire', 'poison', 'acid'],
            condition_immune=['poisoned'],
            traits=[
                {'name': 'Devil\'s Sight', 'description': 'Magical darkness doesn\'t impede darkvision.'},
                {'name': 'Magic Resistance', 'description': 'Advantage on saves vs spells.'},
                {'name': 'Resurrected Wyrmspeaker (Rezmir)', 'description': 'This Abishai is the resurrected form of Rezmir. Knows campaign secrets; has personal grudge against the party.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Three claw attacks and one bite, or two longbow attacks.'},
                {'name': 'Claw', 'description': '_Melee Attack Roll:_ +7, reach 5 ft. _Hit:_ 9 (2d4 + 4) Slashing plus 4 (1d8) Acid.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +7, reach 5 ft. _Hit:_ 7 (1d6 + 4) Piercing plus 4 (1d8) Acid.'},
                {'name': 'Acid Breath (Recharge 5-6)', 'description': '_Dexterity Saving Throw:_ DC 17 in a 30-foot line, 5 ft. wide. _Failure:_ 36 (8d8) Acid damage. _Success:_ half.'},
            ],
            biography='<p>The resurrected Rezmir, former Black Wyrmspeaker. Now serves Tiamat directly. Remembers her death at the party\'s hands - if applicable.</p>',
        ),
    },

    {
        'name': 'Green Abishai',
        **_stat_block(
            ac=16, hp_value=127, hp_formula='15d8 + 60',
            speed_walk=30, speed_fly=50,
            str=15, dex=18, con=18, int=17, wis=14, cha=18,
            saves={'dex': 8, 'wis': 6, 'cha': 8},
            darkvision=120,
            cr=12, xp=8400,
            size='med', type='fiend',
            languages='Draconic, Infernal, telepathy 120 ft.',
            damage_resist=['cold', 'nonmagical bludgeoning, piercing, and slashing'],
            damage_immune=['fire', 'poison'],
            condition_immune=['poisoned'],
            traits=[
                {'name': 'Devil\'s Sight', 'description': 'Magical darkness doesn\'t impede darkvision.'},
                {'name': 'Magic Resistance', 'description': 'Advantage on saves vs spells.'},
                {'name': 'Resurrected Wyrmspeaker (Neronvain)', 'description': 'The reborn Green Wyrmspeaker. Cunning, deceptive, prefers illusion over brute force.'},
                {'name': 'Innate Spellcasting', 'description': 'Cha-based, DC 16, +8 to hit. At will: _Minor Illusion_, _Vicious Mockery_. 3/day each: _Major Image_, _Suggestion_. 1/day: _Mass Suggestion_.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Three Bite attacks or three Longbow attacks.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +8, reach 5 ft. _Hit:_ 9 (2d4 + 4) Piercing plus 13 (3d8) Poison.'},
                {'name': 'Longbow', 'description': '_Ranged Attack Roll:_ +8, range 150/600 ft. _Hit:_ 8 (1d8 + 4) Piercing plus 9 (2d8) Poison.'},
                {'name': 'Poison Breath (Recharge 5-6)', 'description': '_Constitution Saving Throw:_ DC 16 in a 15-foot cone. _Failure:_ 45 (10d8) Poison damage and Poisoned until end of next turn. _Success:_ half, not Poisoned.'},
            ],
            biography='<p>The resurrected Neronvain. Tricky and venomous; will reveal lies, ambush, and play the long game rather than engage directly.</p>',
        ),
    },

    {
        'name': 'Blue Abishai',
        **_stat_block(
            ac=18, hp_value=189, hp_formula='14d10 + 112',
            speed_walk=30, speed_fly=60,
            str=20, dex=17, con=22, int=15, wis=18, cha=20,
            saves={'dex': 8, 'con': 11, 'wis': 9, 'cha': 10},
            skills_prof=['per', 'ins'],
            darkvision=120,
            cr=17, xp=18000,
            size='lg', type='fiend',
            languages='Draconic, Infernal, telepathy 120 ft.',
            damage_resist=['cold', 'nonmagical bludgeoning, piercing, and slashing'],
            damage_immune=['fire', 'lightning', 'poison'],
            condition_immune=['poisoned'],
            traits=[
                {'name': 'Devil\'s Sight', 'description': 'Magical darkness doesn\'t impede darkvision.'},
                {'name': 'Magic Resistance', 'description': 'Advantage on saves vs spells.'},
                {'name': 'Legendary Resistance (3/Day)', 'description': 'If the Abishai fails a saving throw, it can choose to succeed instead.'},
                {'name': 'Resurrected Wyrmspeaker (Galvan)', 'description': 'The reborn Blue Wyrmspeaker. The most powerful of the resurrected Abishai. Mini-finale guardian of the Blue Foci.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Three Claw attacks and one Bite, or four Lightning Bolts.'},
                {'name': 'Claw', 'description': '_Melee Attack Roll:_ +11, reach 10 ft. _Hit:_ 12 (2d6 + 5) Slashing plus 9 (2d8) Lightning.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +11, reach 10 ft. _Hit:_ 15 (2d10 + 5) Piercing plus 13 (3d8) Lightning.'},
                {'name': 'Lightning Bolt', 'description': '_Ranged Spell Attack:_ +10, range 120 ft. _Hit:_ 27 (5d10) Lightning damage.'},
                {'name': 'Lightning Breath (Recharge 5-6)', 'description': '_Dexterity Saving Throw:_ DC 19 in a 90-foot line, 5 ft. wide. _Failure:_ 66 (12d10) Lightning damage. _Success:_ half.'},
            ],
            legendary_actions=[
                {'name': 'Bite (1 action)', 'description': 'One Bite attack.'},
                {'name': 'Skyborne (2 actions)', 'description': 'Fly up to half speed without provoking opportunity attacks.'},
                {'name': 'Storm Eye (3 actions)', 'description': 'All creatures within 30 ft. must succeed on a DC 19 Constitution save or take 18 (4d8) Lightning damage and be deafened until end of next turn.'},
            ],
            biography='<p>The resurrected Galvan. Mini-finale boss guardian of the Blue Foci platform. Massive, electric, regal - the only Abishai of true dragon size.</p>',
        ),
    },

    # =====================================================================
    # WHITE FOCI HOMEBREW
    # =====================================================================

    {
        'name': 'Frost Giant Skeleton',
        **_stat_block(
            ac=17, hp_value=178, hp_formula='17d12 + 68',
            speed_walk=40,
            str=23, dex=9, con=19, int=6, wis=10, cha=6,
            saves={'con': 8},
            darkvision=60,
            cr=10, xp=5900,
            size='huge', type='undead',
            languages='understands Giant but cannot speak',
            damage_resist=['nonmagical bludgeoning, piercing, slashing'],
            damage_immune=['cold', 'poison'],
            condition_immune=['exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
            traits=[
                {'name': 'Aura of Cold', 'description': 'At the start of each of its turns, each creature within 10 ft. takes 9 (2d8) Cold damage.'},
                {'name': 'Bone Chill', 'description': 'When the giant skeleton deals cold damage, the target\'s speed is halved until end of next turn.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'The skeleton makes two Greataxe attacks.'},
                {'name': 'Greataxe', 'description': '_Melee Attack Roll:_ +10, reach 10 ft. _Hit:_ 22 (3d12 + 6) Slashing plus 9 (2d8) Cold damage.'},
                {'name': 'Hurled Bone Spike', 'description': '_Ranged Attack Roll:_ +6, range 60/240 ft. _Hit:_ 15 (2d10 + 4) Piercing damage.'},
            ],
            legendary_actions=[
                {'name': 'Greataxe (1 action)', 'description': 'One Greataxe attack.'},
                {'name': 'Frost Stomp (2 actions)', 'description': 'All creatures within 20 ft. must succeed on a DC 16 Strength save or be knocked prone and take 9 (2d8) Cold.'},
                {'name': 'Skeletal Surge (3 actions)', 'description': 'The skeleton regains 15 (3d10) hit points (cannot exceed max).'},
            ],
            biography='<p>White Foci guardian. The remains of an ancient frost giant raised as undead. Cold aura, lethal greataxe sweep, and bone-rattling presence.</p>',
        ),
    },

    {
        'name': 'Dragonbone Crawler',
        **_stat_block(
            ac=15, hp_value=65, hp_formula='10d8 + 20',
            speed_walk=40, speed_climb=40,
            str=16, dex=14, con=14, int=4, wis=8, cha=4,
            darkvision=60,
            cr=4, xp=1100,
            size='med', type='undead',
            languages='—',
            damage_resist=['cold', 'necrotic'],
            condition_immune=['poisoned', 'frightened', 'charmed'],
            traits=[
                {'name': 'Pack Tactics', 'description': 'Advantage on attack rolls against a creature if at least one ally is within 5 ft. of the target.'},
                {'name': 'Pull and Drag', 'description': 'When the Crawler grapples a target, it can move at full speed dragging the target with it.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'The Crawler makes one Bite attack and one Claw attack.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +6, reach 5 ft. _Hit:_ 10 (1d8 + 4) Piercing damage. If target is Medium or smaller, it has the Grappled condition (escape DC 14).'},
                {'name': 'Claw', 'description': '_Melee Attack Roll:_ +6, reach 5 ft. _Hit:_ 7 (1d6 + 4) Slashing damage.'},
            ],
            biography='<p>White Foci minion. Skeletal beast crawler. Drags victims toward the focus to be consumed. Uses pack tactics.</p>',
        ),
    },

    {
        'name': 'Half-Dragon Red',
        **_stat_block(
            ac=18, hp_value=119, hp_formula='14d10 + 42',
            speed_walk=30, speed_fly=60,
            str=19, dex=14, con=17, int=12, wis=12, cha=15,
            saves={'dex': 6, 'con': 7},
            skills_prof=['per', 'ath'],
            darkvision=60,
            cr=10, xp=5900,
            size='med', type='dragon',
            languages='Common, Draconic',
            damage_immune=['fire'],
            traits=[
                {'name': 'Multiattack Master', 'description': 'Trained in coordinated assaults; gains a bonus action attack with Claw after using Multiattack.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Three weapon attacks; can replace any with a Claw.'},
                {'name': 'Greatsword', 'description': '_Melee Attack Roll:_ +9, reach 5 ft. _Hit:_ 12 (2d6 + 5) Slashing plus 7 (2d6) Fire.'},
                {'name': 'Claw', 'description': '_Melee Attack Roll:_ +9, reach 5 ft. _Hit:_ 10 (2d4 + 5) Slashing.'},
                {'name': 'Fire Breath (Recharge 5-6)', 'description': '_Dexterity Saving Throw:_ DC 15 in a 30-foot cone. _Failure:_ 42 (12d6) Fire damage. _Success:_ half.'},
            ],
            biography='<p>Red Foci guardian. Half-dragon warrior in service to Tiamat\'s red aspect. Fire breath, scaled hide, and a love of slaughter.</p>',
        ),
    },

    {
        'name': 'Yuan-Ti Mind Whisperer',
        **_stat_block(
            ac=14, hp_value=127, hp_formula='17d8 + 51',
            speed_walk=30,
            str=16, dex=14, con=16, int=14, wis=14, cha=18,
            saves={'cha': 8},
            darkvision=60,
            cr=9, xp=5000,
            size='med', type='monstrosity',
            languages='Abyssal, Common, Draconic',
            damage_immune=['poison'],
            condition_immune=['poisoned'],
            traits=[
                {'name': 'Magic Resistance', 'description': 'Advantage on saves vs spells and magical effects.'},
                {'name': 'Innate Spellcasting', 'description': 'Cha-based, DC 16, +8 to hit. At will: _Animal Friendship_ (snakes), _Poison Spray_, _Suggestion_. 3/day: _Hold Person_, _Charm Person_, _Counterspell_. 1/day: _Polymorph_ (self into snake forms).'},
                {'name': 'Mind Whisper', 'description': 'When a creature fails a Wisdom or Charisma save against the Yuan-Ti\'s magic, the Yuan-Ti deals 11 (2d10) Psychic damage to it.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Three Bite attacks or three Shortsword attacks.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +6, reach 5 ft. _Hit:_ 6 (1d6 + 3) Piercing plus 7 (2d6) Poison.'},
                {'name': 'Shortsword', 'description': '_Melee Attack Roll:_ +6, reach 5 ft. _Hit:_ 7 (1d6 + 3) Piercing plus 7 (2d6) Poison.'},
            ],
            biography='<p>Green Foci guardian. Yuan-Ti spell-caster, control mage. Tries to charm and dominate party members; constrict-grapples on melee.</p>',
        ),
    },

    # =====================================================================
    # BOSSES - Severin, Rath Modar, Veksin, Naergoth (already-dead Wight)
    # =====================================================================

    {
        'name': 'Severin Silrajin (Phase 1)',
        **_stat_block(
            ac=19, hp_value=230, hp_formula='28d8 + 112',
            speed_walk=30,  # Hovers above platform; technically magical flight
            str=14, dex=16, con=18, int=20, wis=18, cha=24,
            saves={'int': 11, 'wis': 10, 'cha': 13},
            skills_prof=['arc', 'his', 'rel', 'per', 'ins'],
            darkvision=120,
            cr=20, xp=25000,
            size='med', type='humanoid',
            languages='Common, Draconic, Abyssal, Infernal, telepathy 60 ft.',
            damage_resist=['fire', 'cold', 'lightning', 'acid', 'poison', 'nonmagical bludgeoning, piercing, slashing'],
            condition_immune=['frightened', 'charmed'],
            traits=[
                {'name': 'Legendary Resistance (3/Day)', 'description': 'If Severin fails a saving throw, he can choose to succeed instead. Phase 1 only; refreshes once at Phase 2 transition.'},
                {'name': 'Mask of the Dragon Queen', 'description': 'Severin wears a golden mask channeling Tiamat. Spell save DC 21. Spell attacks +13. While wearing the mask, advantage on ALL saving throws against the party\'s spells.'},
                {'name': 'Dragon\'s Hatred', 'description': 'Once per turn, when Severin reduces a creature to 0 HP, he regains 20 HP. When Severin is below 50% HP, he gains +2 to all attack rolls.'},
                {'name': 'Hovering Master', 'description': 'Severin levitates 3 feet above the platform; immune to prone, and ranged attacks against him have disadvantage.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Severin casts one cantrip (his Action) and uses Tiamat\'s Touch as a bonus action.'},
                {'name': 'Tiamat\'s Touch', 'description': '_Melee Spell Attack:_ +13, reach 5 ft. _Hit:_ 21 (4d6 + 7) Force damage plus 18 (4d8) Necrotic.'},
                {'name': 'Five-Color Bolt (Cantrip)', 'description': '_Ranged Spell Attack:_ +13, range 120 ft. _Hit:_ 27 (5d10) damage of a chosen chromatic type (acid/cold/fire/lightning/poison).'},
                {'name': 'Spellcasting', 'description': 'Severin is an 18th-level caster (Int). Prepared: _Counterspell_, _Dispel Magic_, _Fireball_ (5d6 fire), _Hold Person_, _Misty Step_, _Wall of Force_, _Power Word: Stun_, _Meteor Swarm_ (1/day: 8d6 fire + 8d6 bludgeoning, 4 meteors).'},
            ],
            legendary_actions=[
                {'name': 'Tiamat\'s Mark (1 action)', 'description': 'One creature within 30 ft. Severin can see must succeed on a DC 21 Charisma save or be marked. The next attack against them has advantage.'},
                {'name': 'Spell Slot Restoration (2 actions)', 'description': 'Severin recovers one 5th-level or lower spell slot (1/turn).'},
                {'name': 'Tiamat\'s Decree (3 actions)', 'description': 'Three creatures Severin can see must succeed on a DC 21 Wisdom save or be Frightened until end of next turn.'},
            ],
            biography='<p><strong>Severin Silrajin, High Wyrmspeaker, Phase 1.</strong></p><p>Wears the Mask of the Dragon Queen. Speaks as if everything is already decided. Hovers 3 feet above the platform throughout the fight. At 115 HP (50%), drops to Phase 2 - see <em>Severin (Phase 2)</em>.</p>',
        ),
    },

    {
        'name': 'Severin Silrajin (Phase 2)',
        **_stat_block(
            ac=21, hp_value=115, hp_formula='14d8 + 56',
            speed_walk=40, speed_fly=60, hover=True,
            str=16, dex=18, con=20, int=22, wis=18, cha=26,
            saves={'int': 12, 'wis': 10, 'cha': 14},
            skills_prof=['arc', 'his', 'rel', 'per', 'ins'],
            darkvision=120,
            cr=22, xp=41000,
            size='med', type='humanoid',
            languages='Common, Draconic, Abyssal, Infernal, telepathy 120 ft.',
            damage_resist=['nonmagical bludgeoning, piercing, slashing'],
            damage_immune=['fire'],
            condition_immune=['frightened', 'charmed', 'stunned'],
            traits=[
                {'name': 'Legendary Resistance (3/Day)', 'description': 'Refreshed at Phase 2 start.'},
                {'name': 'Mask Fused to Flesh', 'description': 'The Mask is now part of Severin. Cannot be removed. Spell save DC 22. Spell attacks +14.'},
                {'name': 'Desperate Fanatic', 'description': 'Severin gains 1 extra Legendary Action per round. Attack rolls have advantage when targeting creatures below 50% HP. Cannot be Surprised.'},
                {'name': '5 Masks (HP buffer)', 'description': '5 chromatic dragon masks orbit Severin at 30 HP each. While ANY mask is intact, Severin has resistance to the matching chromatic damage type. Masks act on Severin\'s init at -10. AC 18 each; targeting a specific mask requires a called shot (-5 to hit).'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Severin casts one spell (Action) and one cantrip (Bonus Action).'},
                {'name': 'Five-Color Bolt (Cantrip, enhanced)', 'description': '_Ranged Spell Attack:_ +14, range 120 ft. _Hit:_ 33 (6d10) damage of a chosen chromatic type. Can target up to 2 creatures.'},
                {'name': 'Tiamat\'s Wrath', 'description': '_Constitution Saving Throw:_ DC 22, all creatures within 30 ft. _Failure:_ 45 (10d8) Fire damage and Frightened until end of next turn. _Success:_ half, not Frightened.'},
                {'name': 'Spellcasting (limited)', 'description': '2/day each: _Fireball_ (8d6), _Cone of Cold_ (10d8), _Meteor Swarm_ (12d6 fire + 12d6 bludgeoning). 3/day: _Counterspell_, _Dispel Magic_, _Misty Step_.'},
            ],
            legendary_actions=[
                {'name': 'Bite of Tiamat (1 action)', 'description': 'One creature within 5 ft. takes 14 (4d6) Necrotic damage.'},
                {'name': 'Wing Beat (2 actions)', 'description': 'All creatures within 10 ft. of Severin are pushed 15 ft. and must succeed on a DC 22 Strength save or be knocked prone.'},
                {'name': 'Five-Color Roar (3 actions)', 'description': '_Dexterity Saving Throw:_ DC 22 in a 60-foot cone. _Failure:_ 55 (10d10) damage divided among all five chromatic types. _Success:_ half.'},
                {'name': 'Tiamat\'s Glimpse (4 actions, 1/round)', 'description': 'Tiamat manifests through Severin briefly. One creature must succeed on a DC 22 Wisdom save or be Stunned until the end of its next turn.'},
            ],
            biography='<p><strong>Severin Silrajin, Phase 2.</strong></p><p>Mask fused to face. Tiamat speaks directly through him. Hovers and flies. The 5 dragon masks orbit him as a barrier. When all 5 masks are destroyed AND Severin reaches 0 HP, the ritual collapses.</p>',
        ),
    },

    {
        'name': 'Rath Modar',
        **_stat_block(
            ac=15, hp_value=104, hp_formula='16d8 + 32',
            speed_walk=30,
            str=10, dex=15, con=15, int=20, wis=15, cha=15,
            saves={'int': 9, 'wis': 6},
            skills_prof=['arc', 'his'],
            darkvision=60,
            cr=12, xp=8400,
            size='med', type='humanoid',
            languages='Common, Draconic, Thayan',
            damage_resist=['fire'],  # Red Wizard inherent
            traits=[
                {'name': 'Spell Mastery (Counterspell)', 'description': 'Rath Modar can cast _Counterspell_ at 3rd level at will without expending a spell slot.'},
                {'name': 'Thayan Discipline', 'description': 'Advantage on Wisdom saves against being charmed or frightened. Acts as Tiamat\'s ritual coordinator.'},
                {'name': 'Coordinating the Ritual', 'description': 'On its turn, can use a bonus action to direct one Red Wizard ally\'s ritual chanting; that ally gains +2 to their next spell save DC.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Rath Modar casts one spell and uses Quickened Spell as a bonus action.'},
                {'name': 'Spellcasting', 'description': '17th-level caster (Int). Save DC 17. Prepared: _Fireball_ (7d6), _Cone of Cold_ (10d8), _Wall of Fire_, _Chain Lightning_, _Power Word: Pain_, _Disintegrate_ (10d6 + 40), _Meteor Swarm_ (1/day).'},
                {'name': 'Dagger', 'description': '_Melee Attack Roll:_ +5, reach 5 ft. _Hit:_ 4 (1d4 + 2) Piercing damage.'},
            ],
            biography='<p>Red Wizard of Thay, ritual coordinator for the Mask of the Dragon Queen ceremony. Has Axar\'s Thayan history. Death by Counterspell on his own _Wall of Fire_ would be poetic; Counterspell is his hallmark.</p>',
        ),
    },

    {
        'name': 'Red Wizard (Veksin)',
        **_stat_block(
            ac=12, hp_value=40, hp_formula='9d8',
            speed_walk=30,
            str=9, dex=14, con=11, int=17, wis=12, cha=14,
            saves={'int': 6, 'wis': 4},
            skills_prof=['arc', 'his'],
            cr=4, xp=1100,
            size='med', type='humanoid',
            languages='Common, Draconic, Thayan',
            traits=[
                {'name': 'Apprentice Discipline', 'description': 'Advantage on saves against Charisma effects from his Red Wizard masters.'},
                {'name': 'Nervous Apprentice', 'description': 'Disadvantage on initial Wisdom save vs Intimidation. Will surrender if reduced below 10 HP.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Veksin casts one spell.'},
                {'name': 'Spellcasting', 'description': '5th-level caster (Int). DC 14. Cantrips: _Fire Bolt_, _Prestidigitation_. 1st: _Mage Armor_, _Magic Missile_. 2nd: _Misty Step_. 3rd: _Fireball_ (8d6), _Counterspell_.'},
                {'name': 'Dagger', 'description': '_Melee Attack Roll:_ +4, reach 5 ft. _Hit:_ 3 (1d4 + 2) Piercing.'},
            ],
            biography='<p>Young Red Wizard apprentice in the Blue Chapel. Nervous, scared. Surrenders rather than dies if pressed. Source of intel if captured.</p>',
        ),
    },

    # =====================================================================
    # TIAMAT - 5 HEADS - only manifests at Clock 8
    # Each head treated as separate "creature" but they share Tiamat's HP pool
    # =====================================================================

    {
        'name': 'Tiamat - White Head',
        **_stat_block(
            ac=21, hp_value=80, hp_formula='shared with Tiamat pool',
            speed_walk=0, speed_fly=60, hover=True,
            str=28, dex=10, con=27, int=18, wis=15, cha=20,
            saves={'dex': 7, 'con': 16, 'wis': 10, 'cha': 13},
            skills_prof=['per', 'ins'],
            darkvision=240,
            cr=18, xp=20000,
            size='huge', type='dragon',
            languages='Draconic, Common',
            damage_immune=['cold'],
            condition_immune=['frightened', 'charmed', 'paralyzed'],
            traits=[
                {'name': 'Primal Hunger', 'description': 'On each turn, the White Head bites and may swallow a creature whole (Large or smaller).'},
                {'name': 'Cold Aura', 'description': 'All creatures within 20 ft. take 9 (2d8) Cold damage at the start of their turn.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'One Bite and one Claw.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +16, reach 15 ft. _Hit:_ 23 (3d10 + 9) Piercing plus 9 (2d8) Cold. On Crit: Grapple (escape DC 22).'},
                {'name': 'Claw', 'description': '_Melee Attack Roll:_ +16, reach 10 ft. _Hit:_ 14 (2d6 + 9) Slashing.'},
                {'name': 'Cold Breath (Recharge 5-6)', 'description': '_Constitution Saving Throw:_ DC 23 in a 60-foot cone. _Failure:_ 67 (15d8) Cold damage. _Success:_ half.'},
                {'name': 'Swallow', 'description': 'If a creature is Grappled, the White Head may use a Bonus Action to attempt to swallow them: _Strength Saving Throw:_ DC 22. _Failure:_ Swallowed; takes 21 (6d6) Acid damage at start of each Tiamat turn.'},
            ],
            biography='<p>White Head of Tiamat. Primal, ravenous, instinctive. Grapples and swallows. Cold breath.</p>',
        ),
    },

    {
        'name': 'Tiamat - Black Head',
        **_stat_block(
            ac=21, hp_value=80, hp_formula='shared with Tiamat pool',
            speed_walk=0, speed_fly=60, hover=True,
            str=27, dex=12, con=27, int=22, wis=18, cha=24,
            saves={'dex': 8, 'con': 16, 'wis': 12, 'cha': 15},
            darkvision=240,
            cr=18, xp=20000,
            size='huge', type='dragon',
            languages='Draconic, Common',
            damage_immune=['acid'],
            condition_immune=['frightened', 'charmed', 'paralyzed'],
            traits=[
                {'name': 'Contempt and Mockery', 'description': 'When the Black Head deals damage, the target must succeed on a DC 23 Wisdom save or take an additional 9 (2d8) Psychic damage.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'One Bite and one Tail Slap.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +15, reach 15 ft. _Hit:_ 22 (3d10 + 8) Piercing plus 11 (2d10) Acid.'},
                {'name': 'Tail Slap', 'description': '_Melee Attack Roll:_ +15, reach 20 ft. _Hit:_ 24 (4d8 + 8) Bludgeoning.'},
                {'name': 'Acid Breath (Recharge 5-6)', 'description': '_Dexterity Saving Throw:_ DC 23 in a 90-foot line, 10 ft. wide. _Failure:_ 76 (16d8) Acid damage. _Success:_ half.'},
            ],
            biography='<p>Black Head of Tiamat. Cunning, contemptuous, mocking. Mocks player actions while killing them.</p>',
        ),
    },

    {
        'name': 'Tiamat - Green Head',
        **_stat_block(
            ac=21, hp_value=80, hp_formula='shared with Tiamat pool',
            speed_walk=0, speed_fly=60, hover=True,
            str=25, dex=14, con=27, int=24, wis=20, cha=26,
            saves={'dex': 9, 'con': 16, 'wis': 13, 'cha': 16},
            skills_prof=['per', 'ins', 'dec'],
            darkvision=240,
            cr=18, xp=20000,
            size='huge', type='dragon',
            languages='Draconic, Common, Sylvan',
            damage_immune=['poison'],
            condition_immune=['poisoned', 'frightened', 'charmed', 'paralyzed'],
            traits=[
                {'name': 'Deceiver\'s Web', 'description': 'The Green Head can cast _Major Image_ at will, _Mass Suggestion_ 1/day. Spell DC 23.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'One Bite and uses Poison Breath if available.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +14, reach 15 ft. _Hit:_ 21 (3d10 + 7) Piercing plus 11 (2d10) Poison.'},
                {'name': 'Poison Breath (Recharge 5-6)', 'description': '_Constitution Saving Throw:_ DC 23 in a 90-foot cone. _Failure:_ 76 (16d8) Poison damage and Poisoned for 1 minute. _Success:_ half, not Poisoned.'},
            ],
            biography='<p>Green Head of Tiamat. Deceiver, illusion-weaver. Uses illusions to misdirect attacks.</p>',
        ),
    },

    {
        'name': 'Tiamat - Blue Head',
        **_stat_block(
            ac=21, hp_value=80, hp_formula='shared with Tiamat pool',
            speed_walk=0, speed_fly=60, hover=True,
            str=29, dex=10, con=27, int=20, wis=18, cha=22,
            saves={'dex': 7, 'con': 16, 'wis': 12, 'cha': 14},
            skills_prof=['per', 'itm'],
            darkvision=240,
            cr=18, xp=20000,
            size='huge', type='dragon',
            languages='Draconic, Common, Infernal',
            damage_immune=['lightning'],
            condition_immune=['frightened', 'charmed', 'paralyzed'],
            traits=[
                {'name': 'Commanding Presence', 'description': 'All Dragon Cult allies within 30 ft. of the Blue Head gain advantage on their next attack roll and add 4 to damage.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'One Bite and one Claw.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +16, reach 15 ft. _Hit:_ 23 (3d10 + 9) Piercing plus 13 (2d12) Lightning.'},
                {'name': 'Claw', 'description': '_Melee Attack Roll:_ +16, reach 10 ft. _Hit:_ 16 (2d8 + 9) Slashing.'},
                {'name': 'Lightning Breath (Recharge 5-6)', 'description': '_Dexterity Saving Throw:_ DC 23 in a 120-foot line, 10 ft. wide. _Failure:_ 88 (16d10) Lightning damage. _Success:_ half.'},
            ],
            biography='<p>Blue Head of Tiamat. Imperial, commanding. Empowers cult allies.</p>',
        ),
    },

    {
        'name': 'Tiamat - Red Head',
        **_stat_block(
            ac=21, hp_value=80, hp_formula='shared with Tiamat pool',
            speed_walk=0, speed_fly=60, hover=True,
            str=30, dex=12, con=29, int=21, wis=19, cha=27,
            saves={'dex': 8, 'con': 17, 'wis': 12, 'cha': 16},
            skills_prof=['per', 'itm'],
            darkvision=240,
            cr=18, xp=20000,
            size='huge', type='dragon',
            languages='Draconic, Common, Infernal',
            damage_immune=['fire'],
            condition_immune=['frightened', 'charmed', 'paralyzed'],
            traits=[
                {'name': 'Frightening Presence', 'description': '_Wisdom Saving Throw:_ DC 24, each creature within 120 ft. that can see the Red Head. _Failure:_ Frightened until end of next turn. Cannot be re-triggered for 24 hours.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'One Bite and one Claw.'},
                {'name': 'Bite', 'description': '_Melee Attack Roll:_ +17, reach 15 ft. _Hit:_ 25 (3d10 + 10) Piercing plus 13 (2d12) Fire.'},
                {'name': 'Claw', 'description': '_Melee Attack Roll:_ +17, reach 10 ft. _Hit:_ 17 (2d8 + 10) Slashing.'},
                {'name': 'Fire Breath (Recharge 5-6)', 'description': '_Dexterity Saving Throw:_ DC 24 in a 90-foot cone. _Failure:_ 91 (16d10 + 5) Fire damage. _Success:_ half.'},
            ],
            biography='<p>Red Head of Tiamat. Wrath incarnate. Burns the world. Frightening presence terrifies witnesses.</p>',
        ),
    },

    # =====================================================================
    # NAERGOTH - Already dead per canonical state, but stat block for reference
    # =====================================================================

    {
        'name': 'Naergoth Bladelord (Wight)',
        **_stat_block(
            ac=17, hp_value=120, hp_formula='16d8 + 48',
            speed_walk=30,
            str=18, dex=14, con=17, int=12, wis=14, cha=13,
            saves={'con': 7},
            skills_prof=['itm', 'rel', 'his'],
            darkvision=120,
            cr=8, xp=3900,
            size='med', type='undead',
            languages='Common, Draconic',
            damage_resist=['necrotic', 'nonmagical bludgeoning, piercing, slashing'],
            damage_immune=['poison'],
            condition_immune=['exhaustion', 'poisoned'],
            traits=[
                {'name': 'Old General\'s Tactics', 'description': 'Once per turn, may give an ally within 30 ft. an extra attack as a Reaction.'},
                {'name': 'Sunlight Sensitivity', 'description': 'Disadvantage on attacks and Wisdom (Perception) checks in sunlight.'},
            ],
            actions=[
                {'name': 'Multiattack', 'description': 'Three Greatsword attacks.'},
                {'name': 'Greatsword', 'description': '_Melee Attack Roll:_ +8, reach 5 ft. _Hit:_ 13 (2d6 + 4) Slashing plus 9 (2d8) Necrotic.'},
                {'name': 'Life Drain', 'description': '_Melee Attack Roll:_ +8, reach 5 ft. _Hit:_ 15 (3d6 + 4) Necrotic damage. Target\'s max HP reduced by amount taken. Reduction recovers on Long Rest.'},
            ],
            biography='<p><strong>CANONICAL STATE: Naergoth is DEAD prior to the finale.</strong> Stat block provided for reference if you need to flash back or use as a different undead.</p>',
        ),
    },
]


# ---------------------------------------------------------------------------
# NAMED PRISONERS - rescuable / sacrificial NPCs
# All use Commoner-class stats (HP 4, AC 10) but with bios for roleplay
# ---------------------------------------------------------------------------

NAMED_PRISONERS: List[Dict[str, str]] = [
    {
        'name': 'Stirleng',
        'age': '15',
        'background': 'Human boy. Sole survivor in Pen 16 — found hiding among corpses. Catatonic until spoken to in kind.',
        'location': 'Well of Dragons - Area 16 (corpse pile in empty prisoner pen)',
        'status': 'Alive, hiding',
    },
    {
        'name': 'Stirling',
        'age': 'Adult',
        'background': 'Dwarf guard captain, red-haired. Harper contact. First to be sacrificed in the plaza ritual unless rescued.',
        'location': 'Well of Dragons - Plaza 23 (sacrifice ritual, victim 1 of 5)',
        'status': 'Sacrificed unless rescued',
    },
    {
        'name': 'Kess',
        'age': '19',
        'background': 'Human merchant\'s daughter, captured 2 months ago in Waterdeep. Second sacrifice if ritual proceeds.',
        'location': 'Well of Dragons - Plaza 23 (sacrifice ritual, victim 2 of 5)',
        'status': 'Sacrificed unless rescued',
    },
    {
        'name': 'Thorne',
        'age': 'Adult',
        'background': 'Elf Harper scout. Captured while surveying the caldera. Spits defiance even at the altar. Third sacrifice.',
        'location': 'Well of Dragons - Plaza 23 (sacrifice ritual, victim 3 of 5)',
        'status': 'Sacrificed unless rescued',
    },
    {
        'name': 'Marta',
        'age': 'Adult',
        'background': 'Half-orc farmwoman, mother. Captured with her family. Cries for her children. Fourth sacrifice.',
        'location': 'Well of Dragons - Plaza 23 (sacrifice ritual, victim 4 of 5)',
        'status': 'Sacrificed unless rescued',
    },
    {
        'name': 'Fen',
        'age': '16',
        'background': 'Cult-volunteered boy. Sacrificed last unless rescued from the procession in Level 1 of the temple, in which case a nameless cultist (mind broken from indoctrination) becomes the 5th victim.',
        'location': 'Temple Level 1 Procession; if not rescued, Plaza 23 as victim 5 of 5',
        'status': 'Saveable in Level 1',
    },
    {
        'name': 'Older Woman (Banner Bearer)',
        'age': 'Elderly',
        'background': 'Unnamed cultist matriarch leading the procession of failed ascension. Eyes closed, synchronized chanting. Cannot be reached through reason.',
        'location': 'Temple Level 1 - Procession (Encounter B)',
        'status': 'Lost cause; will not stop chanting',
    },
]
