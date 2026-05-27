"""Build dnd5e v5.2.x compatible actor JSON from parsed stat blocks.

Schema reference: https://github.com/foundryvtt/dnd5e/blob/master/module/data/actor/npc.mjs
"""

import re
import secrets
from typing import Any, Dict, List, Optional


# dnd5e v5.2.x uses 3-letter skill keys
SKILL_KEYS = {
    'acrobatics': ('acr', 'dex'),
    'animal handling': ('ani', 'wis'),
    'arcana': ('arc', 'int'),
    'athletics': ('ath', 'str'),
    'deception': ('dec', 'cha'),
    'history': ('his', 'int'),
    'insight': ('ins', 'wis'),
    'intimidation': ('itm', 'cha'),
    'investigation': ('inv', 'int'),
    'medicine': ('med', 'wis'),
    'nature': ('nat', 'int'),
    'perception': ('prc', 'wis'),
    'performance': ('prf', 'cha'),
    'persuasion': ('per', 'cha'),
    'religion': ('rel', 'int'),
    'sleight of hand': ('slt', 'dex'),
    'stealth': ('ste', 'dex'),
    'survival': ('sur', 'wis'),
}

ABILITY_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha']


def _spell_item(name: str, level: int, school: str = 'evocation') -> Dict[str, Any]:
    """Create a dnd5e 5.3.3 spell item object."""
    return {
        '_id': new_id(),
        'type': 'spell',
        'name': name,
        'img': 'icons/svg/item-bag.svg',
        'system': {
            'description': {'value': f'<p>{name}</p>', 'chat': ''},
            'source': {'custom': 'SRD 2024', 'revision': 1, 'rules': '2024'},
            'activation': {'type': 'action', 'value': 1},
            'level': level,
            'school': school,
            'materials': {'value': '', 'consumed': False, 'cost': 0, 'supply': 0},
            'properties': [],
            'method': 'spell',
            'prepared': 1,
            'activities': {
                'dnd5eactivity000': {
                    '_id': 'dnd5eactivity000',
                    'type': 'utility',
                    'activation': {'type': 'action', 'override': False},
                    'consumption': {'targets': [], 'scaling': {'allowed': False, 'max': ''}, 'spellSlot': True},
                    'description': {'chatFlavor': ''},
                    'duration': {'units': 'inst', 'concentration': False, 'override': False},
                    'effects': [],
                    'range': {'units': 'self', 'override': False},
                    'target': {'prompt': True, 'template': {'contiguous': False, 'stationary': False, 'units': 'ft'},
                               'affects': {'choice': False}, 'override': False},
                    'uses': {'spent': 0, 'max': '', 'recovery': []},
                    'roll': {'formula': '', 'name': '', 'prompt': False, 'visible': False},
                    'img': None,
                    'sort': 0,
                    'flags': {},
                    'visibility': {'level': {}, 'requireAttunement': False, 'requireIdentification': False,
                                   'requireMagic': False}
                }
            },
            'uses': {'spent': 0, 'recovery': []},
            'identifier': '',
            'duration': {'units': 'inst'},
            'range': {'units': 'self'},
            'target': {'template': {'contiguous': False, 'stationary': False, 'units': 'ft'},
                      'affects': {'choice': False}}
        },
        'effects': [],
        'flags': {'dnd5e': {'persistSourceMigration': True, 'migratedProperties': ['verbal', 'somatic']}},
        'folder': None,
        'sort': 0,
        'ownership': {'default': 0},
        '_stats': {'compendiumSource': None, 'duplicateSource': None, 'exportSource': None,
                   'coreVersion': '13.351', 'systemId': 'dnd5e', 'systemVersion': '5.3.3'}
    }


def _feat_item(name: str, description: str, img: str = 'icons/svg/upgrade.svg') -> Dict[str, Any]:
    """Create a minimal dnd5e 5.3.3 feat item (used for NPC actions/traits/legendary actions).

    Kept minimal on purpose: Foundry fills defaults for omitted fields, which
    avoids the schema-validation errors that strict/incorrect values cause.
    """
    return {
        '_id': new_id(),
        'type': 'feat',
        'name': name,
        'img': img,
        'system': {
            'description': {'value': description, 'chat': ''},
            'source': {'custom': 'Tyranny of Dragons campaign', 'revision': 1, 'rules': '2024'},
        },
        'effects': [],
        'flags': {},
        'folder': None,
        'sort': 0,
        'ownership': {'default': 0},
        '_stats': {'compendiumSource': None, 'duplicateSource': None, 'exportSource': None,
                   'coreVersion': '13.351', 'systemId': 'dnd5e', 'systemVersion': '5.3.3'}
    }


# Spell database with level and school
SPELL_DB = {
    'counterspell': (3, 'abjuration'),
    'detect magic': (0, 'divination'),
    'dominate monster': (8, 'enchantment'),
    'dominate person': (5, 'enchantment'),
    'eldritch blast': (0, 'evocation'),
    'eyebite': (6, 'necromancy'),
    'finger of death': (7, 'necromancy'),
    'fire bolt': (0, 'evocation'),
    'globe of invulnerability': (6, 'abjuration'),
    'hold monster': (5, 'enchantment'),
    'mind sliver': (0, 'enchantment'),
    'plane shift': (7, 'conjuration'),
    'shield': (1, 'abjuration'),
    'speak with animals': (1, 'divination'),
    'wall of fire': (5, 'evocation'),
    'wish': (9, 'conjuration'),
}


def new_id() -> str:
    """Generate a Foundry-compatible 16-char base62-ish document ID."""
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    return ''.join(secrets.choice(alphabet) for _ in range(16))


def _default_abilities() -> Dict[str, Any]:
    """Build the abilities object with all 6 abilities at default 10."""
    return {
        ab: {
            'value': 10,
            'proficient': 0,
            'max': None,
            'bonuses': {'check': '', 'save': ''},
        }
        for ab in ABILITY_KEYS
    }


def _default_skills() -> Dict[str, Any]:
    """Build the full skills object with all dnd5e v5.2.x skill keys."""
    return {
        skill_key: {
            'ability': ability,
            'value': 0,
            'bonuses': {'check': '', 'passive': ''},
        }
        for (skill_key, ability) in SKILL_KEYS.values()
    }


class StatBlockExtractor:
    """Parse D&D 5e markdown stat blocks into dnd5e v5.2.x actor JSON."""

    def extract_abilities(self, content: str) -> Dict[str, int]:
        """Extract ability scores. Handles inline (**STR** 14) and markdown
        table (| Score | 14 | 14 | 18 | 20 | 16 | 22 |) formats."""
        result = {}
        # Inline format: **STR** 14
        for ab in ABILITY_KEYS:
            match = re.search(rf'\*\*{ab.upper()}\*\*\s+(\d+)', content, re.IGNORECASE)
            if match:
                result[ab] = int(match.group(1))
        if len(result) == 6:
            return result

        # Markdown table format: | Score | 14 | 14 | 18 | 20 | 16 | 22 |
        table_match = re.search(
            r'\|\s*Score\s*\|' + r'\s*(\d+)\s*\|' * 6, content, re.IGNORECASE)
        if table_match:
            for i, ab in enumerate(ABILITY_KEYS):
                result[ab] = int(table_match.group(i + 1))
        return result

    def extract_save_proficiencies(self, content: str,
                                   abilities: Dict[str, int]) -> set:
        """Find which ability saves are proficient from a table Save row:
        | Save | +9 | +4 | +9 | — | +6 | — |
        A save is proficient when its bonus exceeds the plain ability modifier."""
        proficient = set()
        row = re.search(
            r'\|\s*Save\s*\|' + r'\s*([^|]*)\|' * 6, content, re.IGNORECASE)
        if not row:
            return proficient
        for i, ab in enumerate(ABILITY_KEYS):
            cell = row.group(i + 1).strip().replace('−', '-')
            num = re.search(r'[+-]?\d+', cell)
            if not num:
                continue
            save_bonus = int(num.group(0))
            modifier = (abilities.get(ab, 10) - 10) // 2
            if save_bonus > modifier:
                proficient.add(ab)
        return proficient

    def extract_ac(self, content: str) -> Optional[int]:
        # Tolerates inline (**AC** 18) and table (| **AC** | 18 |) formats.
        match = re.search(r'\*\*AC\*\*[:\s|]*(\d+)', content, re.IGNORECASE)
        return int(match.group(1)) if match else None

    def extract_hp(self, content: str) -> Dict[str, Any]:
        # Tolerates inline (**HP** 230) and table (| **HP** | 170 |) formats.
        match = re.search(r'\*\*HP\*\*[:\s|]*([^\n|]+)', content, re.IGNORECASE)
        if not match:
            return {'value': 0, 'max': 0, 'formula': ''}
        hp_str = match.group(1).strip()
        value_match = re.search(r'(\d+)', hp_str)
        value = int(value_match.group(1)) if value_match else 0

        # Extract dice formula if present (e.g., "236 (15d20+45)" -> "15d20+45")
        # Only accept valid dice formulas (digits, d, +, -, *, /, %, spaces, parentheses)
        formula = ''
        formula_match = re.search(r'\(([^)]+)\)', hp_str)
        if formula_match:
            candidate = formula_match.group(1).strip()
            # Validate: only allow dice notation (digits, d, operators, spaces)
            if re.match(r'^[\d\+\-\*/%\s()d]+$', candidate, re.IGNORECASE):
                formula = candidate
            # else: invalid formula (e.g., "shared with Tiamat pool"), skip it

        return {'value': value, 'max': value, 'formula': formula}

    def extract_spells(self, content: str) -> list:
        """Extract spell names from content for documentation only.

        NOTE: Spells are NOT created as items. Users should add them from
        their existing Foundry compendia (dnd5e spells compendium).
        This method returns a list of spell names found, for reference only.
        """
        found_spells = []
        found_names = set()

        # Search for spell names in the content (case-insensitive)
        for spell_name, (level, school) in SPELL_DB.items():
            # Search for spell name in content
            pattern = rf'\b{re.escape(spell_name)}\b'
            if re.search(pattern, content, re.IGNORECASE):
                if spell_name.lower() not in found_names:
                    found_spells.append(spell_name)
                    found_names.add(spell_name.lower())

        # Return empty list - spells will be added from user's compendia
        return []

    def extract_speed(self, content: str) -> Dict[str, Any]:
        speeds = {
            'walk': 30, 'burrow': 0, 'climb': 0, 'fly': 0, 'swim': 0,
            'units': 'ft', 'hover': False, 'special': '',
        }
        match = re.search(r'\*\*Speed\*\*\s+([^\n]+)', content, re.IGNORECASE)
        if not match:
            return speeds
        for part in match.group(1).split(','):
            part = part.strip().lower()
            num = re.search(r'(\d+)', part)
            if not num:
                continue
            n = int(num.group(1))
            if 'fly' in part:
                speeds['fly'] = n
            elif 'swim' in part:
                speeds['swim'] = n
            elif 'climb' in part:
                speeds['climb'] = n
            elif 'burrow' in part:
                speeds['burrow'] = n
            else:
                speeds['walk'] = n
        return speeds

    def extract_skills(self, content: str) -> Dict[str, int]:
        """Returns {skill_key (3-letter): proficiency_value (1=proficient, 2=expertise)}."""
        result = {}
        match = re.search(r'\*\*Skills:?\*\*\s*([^\n]+)', content, re.IGNORECASE)
        if not match:
            return result
        for part in match.group(1).split(','):
            sk = re.match(r'\s*\*?([A-Za-z\s]+?)\*?\s+([\+\-]\d+)', part)
            if not sk:
                continue
            name = sk.group(1).strip().lower()
            if name in SKILL_KEYS:
                key, _ = SKILL_KEYS[name]
                result[key] = 1  # mark as proficient
        return result

    def extract_cr(self, content: str) -> float:
        match = re.search(r'\*\*CR:?\*\*[:\s|]*(\d+(?:/\d+)?|\d*\.?\d+)',
                          content, re.IGNORECASE)
        if not match:
            return 1
        cr_str = match.group(1)
        if '/' in cr_str:
            num, den = cr_str.split('/')
            return float(num) / float(den)
        return float(cr_str)

    def extract_languages(self, content: str) -> List[str]:
        match = re.search(r'\*\*Languages:?\*\*\s*([^\n]+)', content, re.IGNORECASE)
        if not match:
            return []
        return [l.strip() for l in match.group(1).split(',') if l.strip()]

    # Section headings (lowercased, parentheticals stripped) whose entries
    # become NPC feat items.
    _FEATURE_SECTIONS = {
        'special abilities': 'icons/svg/aura.svg',
        'traits': 'icons/svg/aura.svg',
        'actions': 'icons/svg/sword.svg',
        'bonus actions': 'icons/svg/sword.svg',
        'reactions': 'icons/svg/shield.svg',
        'legendary actions': 'icons/svg/upgrade.svg',
    }

    def extract_features(self, content: str) -> List[Dict[str, Any]]:
        """Parse `### Special Abilities / Actions / Legendary Actions` sections
        into dnd5e feat items so NPC abilities are usable in Foundry."""
        items: List[Dict[str, Any]] = []
        headers = list(re.finditer(r'(?m)^###\s+(.+?)\s*$', content))
        for i, h in enumerate(headers):
            title = re.sub(r'\(.*?\)', '', h.group(1)).strip().lower()
            img = self._FEATURE_SECTIONS.get(title)
            if not img:
                continue
            start = h.end()
            end = headers[i + 1].start() if i + 1 < len(headers) else len(content)
            body = content[start:end].split('\n---')[0]
            items.extend(self._parse_feature_entries(body, img))
        return items

    @staticmethod
    def _parse_feature_entries(body: str, img: str) -> List[Dict[str, Any]]:
        """Within a section body, turn each `**Name:**` entry (optionally
        numbered, `N. **Name:**`) into a feat item."""
        items: List[Dict[str, Any]] = []
        entry_re = re.compile(r'(?m)^(?:\d+\.\s+)?\*\*(.+?)\*\*[:.]?')
        marks = list(entry_re.finditer(body))
        for j, m in enumerate(marks):
            name = m.group(1).strip().rstrip(':.').strip()
            if not name:
                continue
            desc_end = marks[j + 1].start() if j + 1 < len(marks) else len(body)
            desc = body[m.end():desc_end].strip()
            paras = [p.strip() for p in re.split(r'\n\s*\n', desc) if p.strip()]
            desc_html = ''.join(
                '<p>' + p.replace('\n', ' ') + '</p>' for p in paras
            ) or '<p></p>'
            items.append(_feat_item(name, desc_html, img))
        return items

    def extract_defenses(self, content: str) -> Dict[str, str]:
        """Extract damage immunities/resistances and condition immunities as
        free-text custom strings (kept simple to avoid key-mapping errors)."""
        result = {'di': '', 'dr': '', 'ci': ''}
        for key, label in [('di', 'Damage Immunities'),
                            ('dr', 'Damage Resistances'),
                            ('ci', 'Condition Immunities')]:
            m = re.search(rf'\*\*{label}:?\*\*\s*([^\n]+)', content, re.IGNORECASE)
            if m:
                result[key] = m.group(1).strip()
        return result

    def extract_senses(self, content: str) -> Dict[str, int]:
        """Extract darkvision / truesight / blindsight / tremorsense ranges."""
        result = {'darkvision': 0, 'blindsight': 0, 'tremorsense': 0, 'truesight': 0}
        m = re.search(r'\*\*Senses:?\*\*\s*([^\n]+)', content, re.IGNORECASE)
        if not m:
            return result
        senses_text = m.group(1).lower()
        for sense in result:
            sm = re.search(rf'{sense}\s+(\d+)', senses_text)
            if sm:
                result[sense] = int(sm.group(1))
        return result

    def to_foundry_npc(self, name: str, content: str, biography: str = '') -> Dict[str, Any]:
        """Build a complete dnd5e v5.2.x NPC actor document."""
        abilities_data = self.extract_abilities(content)
        save_profs = self.extract_save_proficiencies(content, abilities_data)
        hp = self.extract_hp(content)
        speed = self.extract_speed(content)
        skills_data = self.extract_skills(content)
        cr = self.extract_cr(content)
        languages = self.extract_languages(content)
        defenses = self.extract_defenses(content)
        senses = self.extract_senses(content)
        # Spells are no longer embedded - users should add them from their Foundry compendia
        # spells = self.extract_spells(content + ' ' + biography)
        features = self.extract_features(content)

        # A creature with no parsed stat block is treated as a social NPC and
        # given a modest baseline so it imports as a valid (non-zero HP) actor.
        has_statblock = bool(abilities_data) or hp['value'] > 0
        ac = self.extract_ac(content) or (10 if has_statblock else 13)
        if hp['value'] == 0 and not has_statblock:
            hp = {'value': 18, 'max': 18, 'formula': ''}
        if not has_statblock:
            cr = 1

        # Build abilities with parsed values and save proficiency
        abilities = _default_abilities()
        for ab, value in abilities_data.items():
            abilities[ab]['value'] = value
        for ab in save_profs:
            abilities[ab]['proficient'] = 1

        # Build skills with parsed proficiency
        skills = _default_skills()
        for sk_key, prof_value in skills_data.items():
            skills[sk_key]['value'] = prof_value

        return {
            '_id': new_id(),
            'name': name,
            'type': 'npc',
            'img': 'icons/svg/mystery-man.svg',
            'system': {
                'abilities': abilities,
                'attributes': {
                    'ac': {'flat': ac, 'calc': 'flat', 'formula': ''},
                    'hp': {**hp, 'temp': 0, 'tempmax': 0},
                    'init': {'ability': 'dex', 'bonus': ''},
                    'movement': speed,
                    'senses': {**senses, 'units': 'ft', 'special': ''},
                    'spellcasting': '',
                    'death': {'success': 0, 'failure': 0},
                    'exhaustion': 0,
                    'inspiration': False,
                },
                'details': {
                    'biography': {'value': biography, 'public': ''},
                    'alignment': '',
                    'race': None,
                    'type': {'value': 'humanoid', 'subtype': '', 'swarm': '', 'custom': ''},
                    'environment': '',
                    'cr': cr,
                    'spellLevel': 0,
                    'source': {'custom': 'Tyranny of Dragons campaign'},
                    'xp': {'value': 0},
                },
                'traits': {
                    'size': 'med',
                    'di': {'value': [], 'bypasses': [], 'custom': defenses['di']},
                    'dr': {'value': [], 'bypasses': [], 'custom': defenses['dr']},
                    'dv': {'value': [], 'bypasses': [], 'custom': ''},
                    'ci': {'value': [], 'custom': defenses['ci']},
                    'languages': {'value': [], 'custom': ', '.join(languages)},
                },
                'currency': {'pp': 0, 'gp': 0, 'ep': 0, 'sp': 0, 'cp': 0},
                'skills': skills,
                'resources': {
                    'legact': {'value': 0, 'max': 0},
                    'legres': {'value': 0, 'max': 0},
                    'lair': {'value': False, 'initiative': 0},
                },
            },
            'prototypeToken': {
                'name': name,
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
            'items': features,  # Only traits/actions; spells come from user's compendia
            'effects': [],
            'folder': None,
            'sort': 0,
            'ownership': {'default': 0},
            'flags': {},
            '_stats': {'systemId': 'dnd5e', 'systemVersion': '5.3.3'},
        }


class PartyCharacterBuilder:
    """Build a dnd5e v5.2.x character actor (PC)."""

    def to_foundry_character(self, character_data: Dict[str, Any]) -> Dict[str, Any]:
        """Convert parsed party character data to a Foundry character actor."""
        abilities_parsed = character_data.get('data', {}).get('abilities', {})
        abilities = _default_abilities()
        for ab, value in abilities_parsed.items():
            # Map full ability names to 3-letter keys
            key_map = {
                'strength': 'str', 'dexterity': 'dex', 'constitution': 'con',
                'intelligence': 'int', 'wisdom': 'wis', 'charisma': 'cha',
            }
            short = key_map.get(ab.lower(), ab.lower())
            if short in abilities:
                abilities[short]['value'] = value

        return {
            '_id': new_id(),
            'name': character_data['name'],
            'type': 'character',
            'img': 'icons/svg/mystery-man.svg',
            'system': {
                'abilities': abilities,
                'attributes': {
                    'ac': {'flat': 10, 'calc': 'default', 'formula': ''},
                    'hp': {'value': 100, 'max': 100, 'temp': 0, 'tempmax': 0, 'bonuses': {'level': '', 'overall': ''}},
                    'init': {'ability': 'dex', 'bonus': ''},
                    'movement': {'walk': 30, 'burrow': 0, 'climb': 0, 'fly': 0, 'swim': 0,
                                 'units': 'ft', 'hover': False, 'special': ''},
                    'senses': {'darkvision': 0, 'blindsight': 0, 'tremorsense': 0,
                               'truesight': 0, 'units': 'ft', 'special': ''},
                    'spellcasting': 'int',
                    'death': {'success': 0, 'failure': 0},
                    'exhaustion': 0,
                    'inspiration': False,
                },
                'details': {
                    'biography': {'value': character_data.get('journal', ''), 'public': ''},
                    'alignment': '',
                    'race': None,
                    'background': None,
                    'originalClass': '',
                    'xp': {'value': 0},
                },
                'traits': {
                    'size': 'med',
                    'di': {'value': [], 'bypasses': [], 'custom': ''},
                    'dr': {'value': [], 'bypasses': [], 'custom': ''},
                    'dv': {'value': [], 'bypasses': [], 'custom': ''},
                    'ci': {'value': [], 'custom': ''},
                    'languages': {'value': [], 'custom': ''},
                },
                'currency': {'pp': 0, 'gp': 0, 'ep': 0, 'sp': 0, 'cp': 0},
                'skills': _default_skills(),
            },
            'prototypeToken': {
                'name': character_data['name'],
                'actorLink': True,
                'width': 1,
                'height': 1,
                'texture': {'src': 'icons/svg/mystery-man.svg'},
                'disposition': 1,
            },
            'items': [],
            'effects': [],
            'folder': None,
            'sort': 0,
            'ownership': {'default': 0},
            'flags': {},
            '_stats': {'systemId': 'dnd5e', 'systemVersion': '5.2.3'},
        }
