"""Extract and convert D&D 5e stat blocks to Foundry dnd5e JSON format."""

import re
from typing import Any, Dict, Optional


class StatBlockExtractor:
    """Convert D&D 5e markdown stat blocks to Foundry actor JSON."""

    # Ability abbreviations to full names
    ABILITIES = {
        'STR': 'strength',
        'DEX': 'dexterity',
        'CON': 'constitution',
        'INT': 'intelligence',
        'WIS': 'wisdom',
        'CHA': 'charisma',
    }

    # Skill mappings to abilities
    SKILLS = {
        'acrobatics': 'dex',
        'animal handling': 'wis',
        'arcana': 'int',
        'athletics': 'str',
        'deception': 'cha',
        'history': 'int',
        'insight': 'wis',
        'intimidation': 'cha',
        'investigation': 'int',
        'medicine': 'wis',
        'nature': 'int',
        'perception': 'wis',
        'performance': 'cha',
        'persuasion': 'cha',
        'religion': 'int',
        'sleight of hand': 'dex',
        'stealth': 'dex',
        'survival': 'wis',
    }

    def extract_abilities(self, content: str) -> Dict[str, int]:
        """Extract ability scores from stat block."""
        abilities = {}
        patterns = {
            'STR': r'\*\*STR\*\*\s+(\d+)',
            'DEX': r'\*\*DEX\*\*\s+(\d+)',
            'CON': r'\*\*CON\*\*\s+(\d+)',
            'INT': r'\*\*INT\*\*\s+(\d+)',
            'WIS': r'\*\*WIS\*\*\s+(\d+)',
            'CHA': r'\*\*CHA\*\*\s+(\d+)',
        }

        for abbr, pattern in patterns.items():
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                abilities[self.ABILITIES[abbr]] = int(match.group(1))

        return abilities

    def extract_ac(self, content: str) -> Optional[int]:
        """Extract AC value."""
        match = re.search(r'\*\*AC\*\*\s+(\d+)', content, re.IGNORECASE)
        return int(match.group(1)) if match else None

    def extract_hp(self, content: str) -> Dict[str, Any]:
        """Extract HP and hit dice."""
        match = re.search(r'\*\*HP\*\*\s+([\d\+\-\w\s()]+)', content, re.IGNORECASE)
        if not match:
            return {'value': 0, 'formula': ''}

        hp_str = match.group(1).strip()
        # Parse "78 (12d8 + 24)" format
        value_match = re.match(r'(\d+)', hp_str)
        value = int(value_match.group(1)) if value_match else 0

        return {
            'value': value,
            'formula': hp_str,
        }

    def extract_speed(self, content: str) -> Dict[str, int]:
        """Extract movement speeds."""
        speeds = {'walk': 30}
        match = re.search(r'\*\*Speed\*\*\s+(.+?)(?:\n|$)', content, re.IGNORECASE)
        if not match:
            return speeds

        speed_str = match.group(1).strip()
        # Parse "30 ft., fly 60 ft., swim 40 ft." format
        parts = speed_str.split(',')
        for part in parts:
            part = part.strip()
            if 'walk' in part.lower() or (re.match(r'^\d+', part) and 'fly' not in part.lower()):
                val = re.search(r'(\d+)', part)
                if val:
                    speeds['walk'] = int(val.group(1))
            elif 'fly' in part.lower():
                val = re.search(r'(\d+)', part)
                if val:
                    speeds['fly'] = int(val.group(1))
            elif 'swim' in part.lower():
                val = re.search(r'(\d+)', part)
                if val:
                    speeds['swim'] = int(val.group(1))
            elif 'climb' in part.lower():
                val = re.search(r'(\d+)', part)
                if val:
                    speeds['climb'] = int(val.group(1))

        return speeds

    def extract_skills(self, content: str) -> Dict[str, int]:
        """Extract skill bonuses."""
        skills = {}
        match = re.search(r'\*\*Skills\*\*\s+(.+?)(?:\n\*\*|$)', content, re.IGNORECASE)
        if not match:
            return skills

        skills_str = match.group(1).strip()
        # Parse "Perception +5, Stealth +7" format
        parts = skills_str.split(',')
        for part in parts:
            part = part.strip()
            skill_match = re.match(r'([A-Za-z\s]+)\s+([\+\-]\d+)', part)
            if skill_match:
                skill_name = skill_match.group(1).strip().lower()
                bonus = int(skill_match.group(2))
                if skill_name in self.SKILLS:
                    skills[skill_name] = bonus

        return skills

    def extract_resistances(self, content: str) -> Dict[str, list]:
        """Extract damage resistances, immunities, and vulnerabilities."""
        resistances = {'damage': [], 'condition': []}

        patterns = {
            'damage_resist': r'\*\*Damage Resistances\*\*\s+(.+?)(?:\n\*\*|$)',
            'damage_immune': r'\*\*Damage Immunities\*\*\s+(.+?)(?:\n\*\*|$)',
            'condition_immune': r'\*\*Condition Immunities\*\*\s+(.+?)(?:\n\*\*|$)',
        }

        # Extract damage resistances
        match = re.search(patterns['damage_resist'], content, re.IGNORECASE)
        if match:
            damages = [d.strip() for d in match.group(1).split(',')]
            resistances['damage'].extend(damages)

        # Extract condition immunities
        match = re.search(patterns['condition_immune'], content, re.IGNORECASE)
        if match:
            conditions = [c.strip() for c in match.group(1).split(',')]
            resistances['condition'].extend(conditions)

        return resistances

    def to_foundry_actor(self, name: str, content: str, actor_type: str = 'creature') -> Dict[str, Any]:
        """Convert extracted stat block to Foundry actor JSON.

        Args:
            name: Actor name
            content: Markdown stat block content
            actor_type: 'character', 'npc', or 'creature'

        Returns:
            Foundry actor JSON structure
        """
        abilities = self.extract_abilities(content)
        ac = self.extract_ac(content)
        hp = self.extract_hp(content)
        speed = self.extract_speed(content)
        skills = self.extract_skills(content)
        resistances = self.extract_resistances(content)

        actor = {
            'name': name,
            'type': actor_type,
            'img': 'icons/creatures/humanoids/dragonborn-teal.webp',  # Default token
            'system': {
                'abilities': self._build_abilities_json(abilities),
                'attributes': {
                    'ac': {'flat': ac or 10},
                    'hp': {
                        'value': hp['value'],
                        'max': hp['value'],
                        'formula': hp['formula'],
                    },
                },
                'traits': {
                    'languages': {'value': []},
                    'resistances': resistances.get('damage', []),
                    'conditionImmunities': resistances.get('condition', []),
                },
                'details': {
                    'biography': {'value': ''},
                    'alignment': '',
                },
            },
            'items': [],
            'effects': [],
        }

        # Add skills if present
        if skills:
            actor['system']['skills'] = skills

        # Add speed
        actor['system']['attributes']['movement'] = {
            'walk': speed.get('walk', 30),
            'fly': speed.get('fly', 0),
            'swim': speed.get('swim', 0),
            'climb': speed.get('climb', 0),
        }

        return actor

    def _build_abilities_json(self, abilities: Dict[str, int]) -> Dict[str, Any]:
        """Build abilities section for Foundry JSON."""
        result = {}
        for ability_name in self.ABILITIES.values():
            score = abilities.get(ability_name, 10)
            result[ability_name] = {
                'value': score,
                'proficient': 0,
            }
        return result


class PartyCharacterConverter:
    """Convert player character data to Foundry actor JSON."""

    CLASSES = {
        'wizard': 'wizard',
        'ranger': 'ranger',
        'barbarian': 'barbarian',
        'bard': 'bard',
        'cleric': 'cleric',
        'druid': 'druid',
        'fighter': 'fighter',
        'monk': 'monk',
        'paladin': 'paladin',
        'rogue': 'rogue',
        'sorcerer': 'sorcerer',
        'warlock': 'warlock',
    }

    def to_foundry_actor(self, character_data: Dict[str, Any]) -> Dict[str, Any]:
        """Convert parsed character data to Foundry actor JSON."""
        abilities = character_data.get('data', {}).get('abilities', {})
        spells = character_data.get('data', {}).get('spells', [])
        equipment = character_data.get('data', {}).get('equipment', [])

        actor = {
            'name': character_data['name'],
            'type': 'character',
            'img': 'icons/characters/unknown.webp',
            'system': {
                'abilities': self._build_abilities(abilities),
                'attributes': {
                    'ac': {'flat': 11},
                    'hp': {
                        'value': 100,
                        'max': 100,
                    },
                },
                'details': {
                    'biography': {'value': character_data.get('journal', '')},
                },
                'traits': {
                    'languages': {'value': []},
                    'proficiencies': {'value': []},
                },
            },
            'items': [],
            'effects': [],
        }

        # Add spells as items (referenced from compendium)
        for spell_name in spells:
            actor['items'].append({
                'name': spell_name,
                'type': 'spell',
                'compendium_link': f'dnd5e.spells.{self._slugify(spell_name)}',
            })

        # Add equipment as items
        for equip_name in equipment:
            actor['items'].append({
                'name': equip_name,
                'type': 'equipment',
            })

        return actor

    def _build_abilities(self, abilities: Dict[str, int]) -> Dict[str, Any]:
        """Build abilities section with defaults."""
        result = {}
        for ability in ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']:
            value = abilities.get(ability, 10)
            result[ability] = {
                'value': value,
                'proficient': 0,
            }
        return result

    @staticmethod
    def _slugify(name: str) -> str:
        """Convert name to slug for compendium lookup."""
        return name.lower().replace(' ', '-').replace("'", '')
