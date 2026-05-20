"""Dedicated builder for Severin, High Wyrmspeaker - the campaign's final boss.

The generic markdown parser cannot capture Severin's full 2024 stat block
(saves, skills with expertise, immunities, legendary actions, spell list).
This module hardcodes the complete actor from npcs/severin.md so the
imported Severin is the full "uber" version, not a bare-bones placeholder.

Schema modeled on a real dnd5e 5.3.3 actor export (Foundry v13).
"""

from typing import Any, Dict, List

from stat_extractor import new_id, _spell_item, _feat_item, SPELL_DB, SKILL_KEYS


def _ability(value: int, proficient: int = 0) -> Dict[str, Any]:
    """One ability entry in the dnd5e 5.3.3 schema."""
    return {
        'value': value,
        'proficient': proficient,
        'max': None,
        'bonuses': {'check': '', 'save': ''},
        'check': {'roll': {'min': None, 'max': None, 'mode': 0}},
        'save': {'roll': {'min': None, 'max': None, 'mode': 0}},
    }


def _skill(ability: str, value: int = 0) -> Dict[str, Any]:
    """One skill entry. value: 0 = none, 1 = proficient, 2 = expertise."""
    return {
        'ability': ability,
        'value': value,
        'bonuses': {'check': '', 'passive': ''},
        'roll': {'min': None, 'max': None, 'mode': 0},
    }


# Severin's proficient skills (from npcs/severin.md): Arcana is expertise (+17),
# History/Persuasion/Religion are proficient.
_SEVERIN_SKILL_PROF = {'arc': 2, 'his': 1, 'per': 1, 'rel': 1}


def _build_skills() -> Dict[str, Any]:
    skills: Dict[str, Any] = {}
    for (skill_key, ability) in SKILL_KEYS.values():
        skills[skill_key] = _skill(ability, _SEVERIN_SKILL_PROF.get(skill_key, 0))
    return skills


def _build_spell_items() -> List[Dict[str, Any]]:
    """All 16 of Severin's spells as dnd5e 5.3.3 spell items."""
    items = []
    for spell_name, (level, school) in SPELL_DB.items():
        items.append(_spell_item(spell_name.title(), level, school))
    return items


def _build_feat_items() -> List[Dict[str, Any]]:
    """Severin's special abilities, actions, and legendary actions as feat items."""
    traits = [
        ('Legendary Resistance (3/Day)',
         '<p>If Severin fails a saving throw, he can choose to succeed instead. '
         'Refreshes once at the Phase 2 transition (below 115 HP).</p>'),
        ('Mask Resonance (Recharge 5-6)',
         '<p><em>Phase 2: Recharge 4-6.</em> 60 ft. burst, DC 18 Dexterity save. '
         '<strong>8d8 damage</strong> (1d8 acid + 1d8 cold + 1d8 fire + 1d8 lightning '
         '+ 1d8 poison + 3d8 force). Halved on a success. Cover does not reduce this.</p>'),
        ('Ritual Action (Bonus Action, 1/round)',
         '<p>Ritual clock +1. Cannot be used while Severin is Concentrating on a spell '
         'that requires a full action. Axar can Counterspell this (1x per Long Rest for -1 clock).</p>'),
        ('Portal Ward',
         '<p>Total cover from the portal behind Severin. The portal closes defensively '
         'if Severin is below 50 HP.</p>'),
        ('Champion of Tiamat (Clock 5+)',
         '<p>While the ritual clock is at 5 or higher, Severin gains +2 to all saving '
         'throws and attack rolls.</p>'),
        ('Dragon Scale Robes of the Five',
         '<p>1/day: ignore the damage from one attack (reduced to 0). Resets on a Long Rest.</p>'),
        ('Innate Casting',
         '<p>Severin casts <em>Detect Magic</em> and <em>Speak with Animals</em> '
         '(dragons only) at will, via the masks.</p>'),
    ]
    actions = [
        ('Multiattack',
         '<p>Severin casts two spells, or one spell and one Eldritch Blast.</p>'),
        ('Eldritch Blast',
         '<p><em>Ranged Spell Attack:</em> +12 to hit, range 120 ft., 2 beams. '
         '<em>Hit:</em> 2d10 + 6 Force damage per beam.</p>'),
        ('Shield (Reaction)',
         '<p>+5 to AC against one attack. Can be used to protect a mask instead of Severin.</p>'),
        ('Spellcasting (Spell Save DC 20, Spell Attack +12)',
         '<p><strong>Cantrips:</strong> Eldritch Blast, Fire Bolt, Mind Sliver.</p>'
         '<p><strong>5th (3 slots):</strong> Dominate Person, Hold Monster, Wall of Fire.</p>'
         '<p><strong>6th (2 slots):</strong> Eyebite, Globe of Invulnerability.</p>'
         '<p><strong>7th (2 slots):</strong> Finger of Death, Plane Shift.</p>'
         '<p><strong>8th (1 slot):</strong> Dominate Monster.</p>'
         '<p><strong>9th (1 slot):</strong> Wish (ritual use only).</p>'),
    ]
    legendary = [
        ('Legendary Action: Eldritch Blast (1 LA)',
         '<p>Severin makes one Eldritch Blast (2 beams, +12, 2d10 + 6 Force each).</p>'),
        ('Legendary Action: Ritual Surge (2 LA)',
         '<p>Ritual clock +1. Allies on Level 3 heal 2d8 HP.</p>'),
        ('Legendary Action: Summon Devout (3 LA)',
         '<p>1d4 Dragonclaws teleport to an unoccupied space within 30 ft. of Severin.</p>'),
    ]

    items = []
    for name, desc in traits:
        items.append(_feat_item(name, desc, img='icons/svg/aura.svg'))
    for name, desc in actions:
        items.append(_feat_item(name, desc, img='icons/svg/sword.svg'))
    for name, desc in legendary:
        items.append(_feat_item(name, desc, img='icons/svg/upgrade.svg'))
    return items


_BIOGRAPHY = (
    '<h2>Severin, High Wyrmspeaker</h2>'
    '<p><em>Medium Humanoid (Human), Chaotic Evil. Prophet, fanatic, and Tiamat\'s '
    'voice in the world.</em></p>'
    '<h3>Personality</h3>'
    '<p>Severin is <strong>not</strong> a classic villain who wants power for power\'s '
    'sake. He is convinced that Tiamat is the world order - and that everything else '
    'is a temporary error.</p>'
    '<ul>'
    '<li>Grandiose - he speaks as though everything is already decided.</li>'
    '<li>Charismatic - he explains, persuades, instructs.</li>'
    '<li>Contemptuous of democratic power, councils, and compromise.</li>'
    '<li>Sees the party as interesting anomalies in an inevitable pattern.</li>'
    '<li>In Phase 2: becomes more desperate - but tries to hide it.</li>'
    '</ul>'
    '<h3>Phase 2 (below 115 HP)</h3>'
    '<ul>'
    '<li>Globe of Invulnerability drops.</li>'
    '<li>Dominate Monster against Frygtlos (DC 20 Wisdom save) as the first Phase 2 action.</li>'
    '<li>Mask Resonance recharges on 4-6.</li>'
    '<li>No longer uses Shield - Tiamat\'s protection instead.</li>'
    '<li>Speaks in a mix of Common and Draconic.</li>'
    '</ul>'
    '<h3>The Five Masks</h3>'
    '<p>Five masks float in a ring 5 feet above Severin\'s head. <strong>AC 15, '
    'HP 30 each.</strong> Immune to acid, cold, fire, lightning, poison; vulnerable '
    'to force and radiant. Each destroyed mask gives -1 to Severin\'s saves and '
    'attacks. All five destroyed = Severin falls instantly.</p>'
)


def build_severin() -> Dict[str, Any]:
    """Build the complete uber-Severin actor for dnd5e 5.3.3 (Foundry v13)."""
    abilities = {
        'str': _ability(14, 0),
        'dex': _ability(14, 0),
        'con': _ability(18, 0),
        'int': _ability(20, 1),  # proficient save
        'wis': _ability(16, 1),  # proficient save
        'cha': _ability(22, 1),  # proficient save
    }

    items = _build_spell_items() + _build_feat_items()

    return {
        '_id': new_id(),
        'name': 'Severin',
        'type': 'npc',
        'img': 'icons/svg/mystery-man.svg',
        'system': {
            'abilities': abilities,
            'attributes': {
                'ac': {'flat': 18, 'calc': 'flat', 'formula': ''},
                'hp': {'value': 230, 'max': 230, 'formula': '', 'temp': 0, 'tempmax': 0},
                'init': {'ability': 'dex', 'bonus': ''},
                'movement': {
                    'walk': 30, 'burrow': 0, 'climb': 0, 'fly': 0, 'swim': 0,
                    'units': 'ft', 'hover': False, 'special': '',
                },
                'senses': {
                    'units': 'ft', 'special': '',
                    'ranges': {'darkvision': 120, 'blindsight': 0,
                               'tremorsense': 0, 'truesight': 30},
                },
                'spellcasting': 'cha',
                'death': {'success': 0, 'failure': 0},
                'exhaustion': 0,
            },
            'details': {
                'biography': {'value': _BIOGRAPHY, 'public': ''},
                'alignment': 'Chaotic Evil',
                'race': None,
                'type': {'value': 'humanoid', 'subtype': 'human', 'swarm': '', 'custom': ''},
                'environment': '',
                'cr': 20,
                'spellLevel': 18,
                'source': {'custom': 'Tyranny of Dragons campaign', 'revision': 1, 'rules': '2024'},
                'xp': {'value': 25000},
            },
            'traits': {
                'size': 'med',
                'di': {'value': ['acid', 'cold', 'fire', 'lightning', 'poison'],
                       'bypasses': [], 'custom': 'Removed if all 5 masks are destroyed'},
                'dr': {'value': [], 'bypasses': [], 'custom': ''},
                'dv': {'value': [], 'bypasses': [], 'custom': ''},
                'ci': {'value': ['charmed', 'frightened'], 'custom': ''},
                'languages': {'value': ['common', 'draconic', 'abyssal', 'infernal'],
                              'custom': ''},
            },
            'currency': {'pp': 0, 'gp': 0, 'ep': 0, 'sp': 0, 'cp': 0},
            'skills': _build_skills(),
            'resources': {
                'legact': {'value': 3, 'max': 3},
                'legres': {'value': 3, 'max': 3},
                'lair': {'value': False, 'initiative': 0},
            },
        },
        'prototypeToken': {
            'name': 'Severin',
            'displayName': 0,
            'actorLink': False,
            'width': 1,
            'height': 1,
            'texture': {'src': 'icons/svg/mystery-man.svg'},
            'sight': {'enabled': False},
            'detectionModes': [],
            'flags': {},
            'disposition': -1,
        },
        'items': items,
        'effects': [],
        'folder': None,
        'sort': 0,
        'ownership': {'default': 0},
        'flags': {},
        '_stats': {'systemId': 'dnd5e', 'systemVersion': '5.3.3'},
    }
