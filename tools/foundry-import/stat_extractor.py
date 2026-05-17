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
        result = {}
        for ab in ABILITY_KEYS:
            match = re.search(rf'\*\*{ab.upper()}\*\*\s+(\d+)', content, re.IGNORECASE)
            if match:
                result[ab] = int(match.group(1))
        return result

    def extract_ac(self, content: str) -> Optional[int]:
        match = re.search(r'\*\*AC\*\*\s+(\d+)', content, re.IGNORECASE)
        return int(match.group(1)) if match else None

    def extract_hp(self, content: str) -> Dict[str, Any]:
        match = re.search(r'\*\*HP\*\*\s+([^\n]+)', content, re.IGNORECASE)
        if not match:
            return {'value': 0, 'max': 0, 'formula': ''}
        hp_str = match.group(1).strip()
        value_match = re.match(r'(\d+)', hp_str)
        value = int(value_match.group(1)) if value_match else 0
        return {'value': value, 'max': value, 'formula': hp_str}

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
        match = re.search(r'\*\*Skills\*\*\s+([^\n]+)', content, re.IGNORECASE)
        if not match:
            return result
        for part in match.group(1).split(','):
            sk = re.match(r'\s*([A-Za-z\s]+?)\s+([\+\-]\d+)', part)
            if not sk:
                continue
            name = sk.group(1).strip().lower()
            if name in SKILL_KEYS:
                key, _ = SKILL_KEYS[name]
                result[key] = 1  # mark as proficient
        return result

    def extract_cr(self, content: str) -> float:
        match = re.search(r'\*\*CR\*\*\s+(\d+(?:/\d+)?|\d*\.?\d+)', content, re.IGNORECASE)
        if not match:
            return 1
        cr_str = match.group(1)
        if '/' in cr_str:
            num, den = cr_str.split('/')
            return float(num) / float(den)
        return float(cr_str)

    def extract_languages(self, content: str) -> List[str]:
        match = re.search(r'\*\*Languages\*\*\s+([^\n]+)', content, re.IGNORECASE)
        if not match:
            return []
        return [l.strip() for l in match.group(1).split(',') if l.strip()]

    def to_foundry_npc(self, name: str, content: str, biography: str = '') -> Dict[str, Any]:
        """Build a complete dnd5e v5.2.x NPC actor document."""
        abilities_data = self.extract_abilities(content)
        ac = self.extract_ac(content) or 10
        hp = self.extract_hp(content)
        speed = self.extract_speed(content)
        skills_data = self.extract_skills(content)
        cr = self.extract_cr(content)
        languages = self.extract_languages(content)

        # Build abilities with parsed values
        abilities = _default_abilities()
        for ab, value in abilities_data.items():
            abilities[ab]['value'] = value

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
                    'senses': {'darkvision': 0, 'blindsight': 0, 'tremorsense': 0,
                               'truesight': 0, 'units': 'ft', 'special': ''},
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
                    'di': {'value': [], 'bypasses': [], 'custom': ''},
                    'dr': {'value': [], 'bypasses': [], 'custom': ''},
                    'dv': {'value': [], 'bypasses': [], 'custom': ''},
                    'ci': {'value': [], 'custom': ''},
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
            'items': [],
            'effects': [],
            'folder': None,
            'sort': 0,
            'ownership': {'default': 0},
            'flags': {},
            '_stats': {'systemId': 'dnd5e', 'systemVersion': '5.2.3'},
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
