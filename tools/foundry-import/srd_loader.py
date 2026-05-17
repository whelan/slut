"""Look up creatures in the local D&D 5e 2024 SRD and convert to dnd5e v5.2.x actor JSON.

Source file: .agents/skills/dnd5e-2024-srd/references/monsters-A-Z.md
Format per creature: ### CreatureName block with **AC**, **HP**, **Speed**, ability
table, **Skills**, **Senses**, **Languages**, **CR**, then #### Traits/Actions/Legendary.
"""

import re
from pathlib import Path
from typing import Any, Dict, List, Optional

from stat_extractor import new_id, _default_abilities, _default_skills, SKILL_KEYS


SRD_PATH = '.agents/skills/dnd5e-2024-srd/references/monsters-A-Z.md'


class SRDLoader:
    """Parse named creatures from the local SRD reference."""

    def __init__(self, repo_root: str):
        self.repo_root = Path(repo_root)
        self.srd_path = self.repo_root / SRD_PATH
        self._content: Optional[str] = None

    def _load(self) -> str:
        if self._content is None:
            if not self.srd_path.exists():
                raise FileNotFoundError(f"SRD file not found: {self.srd_path}")
            self._content = self.srd_path.read_text(encoding='utf-8')
        return self._content

    def find_block(self, creature_name: str) -> Optional[str]:
        """Return the markdown block for a creature.

        Stops at the next `### Name` or `## Name` heading. Does NOT stop at
        `#### Subsection` headings (Traits/Actions/Legendary), which are part
        of the creature block.
        """
        content = self._load()
        pattern = rf'(?m)^### {re.escape(creature_name)}\s*$\n(.*?)(?=\n^###? |\Z)'
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        return match.group(1) if match else None

    def parse_creature(self, creature_name: str) -> Optional[Dict[str, Any]]:
        """Parse a creature block into structured data. Returns None if not found."""
        block = self.find_block(creature_name)
        if not block:
            return None

        return {
            'name': creature_name,
            'size_type_alignment': self._extract_first_italic(block),
            'ac': self._extract_ac(block),
            'hp': self._extract_hp(block),
            'speed': self._extract_speed(block),
            'abilities': self._extract_abilities(block),
            'skills': self._extract_skills(block),
            'senses': self._extract_senses(block),
            'languages': self._extract_languages(block),
            'cr': self._extract_cr(block),
            'traits': self._extract_section(block, 'Traits'),
            'actions': self._extract_section(block, 'Actions'),
            'legendary_actions': self._extract_section(block, 'Legendary Actions'),
            'raw_block': block,
        }

    def _extract_first_italic(self, block: str) -> str:
        match = re.search(r'^_([^_]+)_', block, re.MULTILINE)
        return match.group(1).strip() if match else ''

    def _extract_ac(self, block: str) -> int:
        match = re.search(r'\*\*AC\*\*\s+(\d+)', block)
        return int(match.group(1)) if match else 10

    def _extract_hp(self, block: str) -> Dict[str, Any]:
        match = re.search(r'\*\*HP\*\*\s+(\d+)\s*(\([^)]+\))?', block)
        if not match:
            return {'value': 1, 'max': 1, 'formula': ''}
        value = int(match.group(1))
        formula = (match.group(2) or '').strip('()')
        return {'value': value, 'max': value, 'formula': formula}

    def _extract_speed(self, block: str) -> Dict[str, Any]:
        result = {'walk': 30, 'burrow': 0, 'climb': 0, 'fly': 0, 'swim': 0,
                  'units': 'ft', 'hover': False, 'special': ''}
        match = re.search(r'\*\*Speed\*\*\s+([^<\n]+)', block)
        if not match:
            return result
        for part in match.group(1).split(','):
            part = part.strip().lower()
            num = re.search(r'(\d+)', part)
            if not num:
                continue
            n = int(num.group(1))
            if 'fly' in part:
                result['fly'] = n
                if 'hover' in part:
                    result['hover'] = True
            elif 'swim' in part:
                result['swim'] = n
            elif 'climb' in part:
                result['climb'] = n
            elif 'burrow' in part:
                result['burrow'] = n
            else:
                result['walk'] = n
        return result

    def _extract_abilities(self, block: str) -> Dict[str, Dict[str, int]]:
        """Extract abilities from the SRD's HTML table.

        Table format: STR / value / mod / save / DEX / value / mod / save / CON / value / mod / save
        then INT / WIS / CHA on next row.
        """
        result = {ab: {'value': 10, 'save': 0} for ab in ['str', 'dex', 'con', 'int', 'wis', 'cha']}
        # Find the table block
        table_match = re.search(r'<table>(.*?)</table>', block, re.DOTALL)
        if not table_match:
            return result
        table = table_match.group(1)
        # Extract all numeric values from <td>X</td>
        numbers = re.findall(r'<td>([+-]?\d+)</td>', table)
        # Pattern: value, mod, save × 6 abilities
        # Each ability uses 3 numbers (value, mod, save). 6 abilities = 18 numbers.
        if len(numbers) >= 18:
            order = ['str', 'dex', 'con', 'int', 'wis', 'cha']
            for i, ab in enumerate(order):
                value = int(numbers[i * 3])
                save = int(numbers[i * 3 + 2])
                result[ab] = {'value': value, 'save': save}
        return result

    def _extract_skills(self, block: str) -> Dict[str, int]:
        """Returns {skill_3letter_key: proficiency_value (1=prof, 2=expertise)}."""
        result = {}
        match = re.search(r'\*\*Skills\*\*\s+([^<\n]+)', block)
        if not match:
            return result
        for part in match.group(1).split(','):
            sk = re.match(r'\s*([A-Za-z\s]+?)\s+([\+\-]\d+)', part)
            if not sk:
                continue
            name = sk.group(1).strip().lower()
            if name in SKILL_KEYS:
                key, _ = SKILL_KEYS[name]
                result[key] = 1
        return result

    def _extract_senses(self, block: str) -> Dict[str, Any]:
        result = {'darkvision': 0, 'blindsight': 0, 'tremorsense': 0,
                  'truesight': 0, 'units': 'ft', 'special': ''}
        match = re.search(r'\*\*Senses\*\*\s+([^<\n]+)', block)
        if not match:
            return result
        text = match.group(1).lower()
        for sense in ['darkvision', 'blindsight', 'tremorsense', 'truesight']:
            m = re.search(rf'{sense}\s+(\d+)', text)
            if m:
                result[sense] = int(m.group(1))
        return result

    def _extract_languages(self, block: str) -> str:
        match = re.search(r'\*\*Languages\*\*\s+([^<\n]+)', block)
        return match.group(1).strip() if match else ''

    def _extract_cr(self, block: str) -> float:
        match = re.search(r'\*\*CR\*\*\s+(\d+(?:/\d+)?|\d*\.?\d+)', block)
        if not match:
            return 1
        cr_str = match.group(1)
        if '/' in cr_str:
            num, den = cr_str.split('/')
            return float(num) / float(den)
        return float(cr_str)

    def _extract_section(self, block: str, section_name: str) -> List[Dict[str, str]]:
        """Extract a section like Traits/Actions/Legendary Actions as a list of {name, description}."""
        pattern = rf'#### {re.escape(section_name)}\s*\n(.*?)(?=\n####|\Z)'
        match = re.search(pattern, block, re.DOTALL)
        if not match:
            return []
        section = match.group(1)
        items = []
        # Each item is **_Name._** description (until next **_Name._** or end)
        for m in re.finditer(r'\*\*_([^_]+?)\._\*\*\s*(.*?)(?=\*\*_[^_]+?\._\*\*|\Z)',
                             section, re.DOTALL):
            items.append({
                'name': m.group(1).strip(),
                'description': m.group(2).strip(),
            })
        return items

    def to_foundry_actor(self, creature_name: str, biography: str = '') -> Optional[Dict[str, Any]]:
        """Build a Foundry dnd5e v5.2.x NPC actor from SRD lookup."""
        data = self.parse_creature(creature_name)
        if not data:
            return None

        # Build abilities dict
        abilities = _default_abilities()
        for ab, ab_data in data['abilities'].items():
            abilities[ab]['value'] = ab_data['value']

        # Build skills dict
        skills = _default_skills()
        for sk_key, prof_value in data['skills'].items():
            skills[sk_key]['value'] = prof_value

        # Build description (combine traits/actions/legendary into HTML for biography)
        bio_html = biography
        for section_name, items in [('Traits', data['traits']),
                                     ('Actions', data['actions']),
                                     ('Legendary Actions', data['legendary_actions'])]:
            if items:
                bio_html += f'<h3>{section_name}</h3>'
                for item in items:
                    bio_html += f'<p><strong>{item["name"]}.</strong> {item["description"]}</p>'

        cr = data['cr']
        xp_by_cr = {0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100,
                    5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900, 11: 7200,
                    12: 8400, 13: 10000, 14: 11500, 15: 13000, 16: 15000, 17: 18000,
                    18: 20000, 19: 22000, 20: 25000, 21: 33000, 22: 41000, 23: 50000,
                    24: 62000, 25: 75000, 26: 90000, 27: 105000, 28: 120000, 29: 135000, 30: 155000}
        xp = xp_by_cr.get(cr, 0)

        return {
            '_id': new_id(),
            'name': creature_name,
            'type': 'npc',
            'img': 'icons/svg/mystery-man.svg',
            'system': {
                'abilities': abilities,
                'attributes': {
                    'ac': {'flat': data['ac'], 'calc': 'flat', 'formula': ''},
                    'hp': {**data['hp'], 'temp': 0, 'tempmax': 0},
                    'init': {'ability': 'dex', 'bonus': ''},
                    'movement': data['speed'],
                    'senses': data['senses'],
                    'spellcasting': '',
                    'death': {'success': 0, 'failure': 0},
                    'exhaustion': 0,
                    'inspiration': False,
                },
                'details': {
                    'biography': {'value': bio_html, 'public': ''},
                    'alignment': '',
                    'race': None,
                    'type': {'value': self._guess_creature_type(data['size_type_alignment']),
                             'subtype': '', 'swarm': '', 'custom': ''},
                    'environment': '',
                    'cr': cr,
                    'spellLevel': 0,
                    'source': {'custom': 'D&D 5e 2024 SRD (CC-BY-4.0)'},
                    'xp': {'value': xp},
                },
                'traits': {
                    'size': self._guess_size(data['size_type_alignment']),
                    'di': {'value': [], 'bypasses': [], 'custom': ''},
                    'dr': {'value': [], 'bypasses': [], 'custom': ''},
                    'dv': {'value': [], 'bypasses': [], 'custom': ''},
                    'ci': {'value': [], 'custom': ''},
                    'languages': {'value': [], 'custom': data['languages']},
                },
                'currency': {'pp': 0, 'gp': 0, 'ep': 0, 'sp': 0, 'cp': 0},
                'skills': skills,
                'resources': {
                    'legact': {'value': 3 if data['legendary_actions'] else 0,
                               'max': 3 if data['legendary_actions'] else 0},
                    'legres': {'value': 3 if 'Legendary Resistance' in str(data['traits']) else 0,
                               'max': 3 if 'Legendary Resistance' in str(data['traits']) else 0},
                    'lair': {'value': False, 'initiative': 0},
                },
            },
            'prototypeToken': {
                'name': creature_name,
                'displayName': 0,
                'actorLink': False,
                'width': 1, 'height': 1,
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

    def _guess_size(self, sta: str) -> str:
        sta_lower = sta.lower()
        for code, words in [('tiny', ['tiny']), ('sm', ['small']), ('med', ['medium']),
                            ('lg', ['large']), ('huge', ['huge']), ('grg', ['gargantuan'])]:
            if any(w in sta_lower for w in words):
                return code
        return 'med'

    def _guess_creature_type(self, sta: str) -> str:
        sta_lower = sta.lower()
        for t in ['aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental',
                  'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant',
                  'undead']:
            if t in sta_lower:
                return t
        return 'humanoid'
