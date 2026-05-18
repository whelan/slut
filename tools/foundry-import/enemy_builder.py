"""Build Foundry actor JSON from the enemy roster (SRD + homebrew + prisoners)."""

from typing import Any, Dict, List

from enemy_roster import SRD_CREATURES, HOMEBREW_CREATURES, NAMED_PRISONERS
from srd_loader import SRDLoader
from stat_extractor import new_id, _default_abilities, _default_skills


XP_BY_CR = {
    0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100,
    5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900, 11: 7200,
    12: 8400, 13: 10000, 14: 11500, 15: 13000, 16: 15000, 17: 18000,
    18: 20000, 19: 22000, 20: 25000, 21: 33000, 22: 41000, 23: 50000,
    24: 62000, 25: 75000, 26: 90000, 27: 105000, 28: 120000, 29: 135000, 30: 155000,
}


class EnemyBuilder:
    """Build Foundry actors for every campaign enemy and prisoner."""

    def __init__(self, repo_root: str):
        self.srd = SRDLoader(repo_root)

    def build_all(self) -> List[Dict[str, Any]]:
        actors = []
        actors.extend(self.build_srd_actors())
        actors.extend(self.build_homebrew_actors())
        actors.extend(self.build_prisoner_actors())
        return actors

    def build_srd_actors(self) -> List[Dict[str, Any]]:
        actors = []
        for entry in SRD_CREATURES:
            name = entry['name']
            display = entry.get('display_name', name)
            actor = self.srd.to_foundry_actor(name)
            if actor is None:
                print(f"  WARN: SRD creature not found: {name}")
                continue
            actor['name'] = display
            actor['prototypeToken']['name'] = display
            actors.append(actor)
            print(f"    + {display} (SRD, CR {actor['system']['details']['cr']})")
        return actors

    def build_homebrew_actors(self) -> List[Dict[str, Any]]:
        actors = []
        for hb in HOMEBREW_CREATURES:
            actor = self._homebrew_to_actor(hb)
            actors.append(actor)
            print(f"    + {hb['name']} (homebrew, CR {hb['cr']})")
        return actors

    def build_prisoner_actors(self) -> List[Dict[str, Any]]:
        """Each prisoner is a Commoner with a custom biography."""
        actors = []
        for prisoner in NAMED_PRISONERS:
            actor = self._prisoner_to_actor(prisoner)
            actors.append(actor)
            print(f"    + {prisoner['name']} (NPC: prisoner)")
        return actors

    def _homebrew_to_actor(self, hb: Dict[str, Any]) -> Dict[str, Any]:
        # Build abilities
        abilities = _default_abilities()
        for ab in ['str', 'dex', 'con', 'int', 'wis', 'cha']:
            abilities[ab]['value'] = hb[ab]
            if ab in hb.get('saves', {}):
                abilities[ab]['proficient'] = 1
                abilities[ab]['bonuses'] = {'check': '', 'save': ''}

        # Build skills with proficiency
        skills = _default_skills()
        for sk_key in hb.get('skills_prof', []):
            if sk_key in skills:
                skills[sk_key]['value'] = 1

        # Build biography HTML
        bio = hb.get('biography', '')
        for section_name, items in [('Traits', hb.get('traits', [])),
                                     ('Actions', hb.get('actions', [])),
                                     ('Legendary Actions', hb.get('legendary_actions', []))]:
            if items:
                bio += f'<h3>{section_name}</h3>'
                for item in items:
                    bio += f'<p><strong>{item["name"]}.</strong> {item["description"]}</p>'

        # Resistances/immunities → custom strings (dnd5e supports a `value` list of
        # standard keys and `custom` for free-form; we use custom to avoid mapping issues)
        damage_resist_custom = '; '.join(hb.get('damage_resist', []))
        damage_immune_custom = '; '.join(hb.get('damage_immune', []))
        condition_immune_custom = '; '.join(hb.get('condition_immune', []))

        return {
            '_id': new_id(),
            'name': hb['name'],
            'type': 'npc',
            'img': 'icons/svg/mystery-man.svg',
            'system': {
                'abilities': abilities,
                'attributes': {
                    'ac': {'flat': hb['ac'], 'calc': 'flat', 'formula': ''},
                    'hp': {
                        'value': hb['hp_value'], 'max': hb['hp_value'],
                        'formula': hb.get('hp_formula', ''),
                        'temp': 0, 'tempmax': 0,
                    },
                    'init': {'ability': 'dex', 'bonus': ''},
                    'movement': {
                        'walk': hb['speed_walk'], 'burrow': hb['speed_burrow'],
                        'climb': hb['speed_climb'], 'fly': hb['speed_fly'],
                        'swim': hb['speed_swim'],
                        'units': 'ft', 'hover': hb.get('hover', False), 'special': '',
                    },
                    'senses': {
                        'darkvision': hb.get('darkvision', 60),
                        'blindsight': 0, 'tremorsense': 0, 'truesight': 0,
                        'units': 'ft', 'special': '',
                    },
                    'spellcasting': '',
                    'death': {'success': 0, 'failure': 0},
                    'exhaustion': 0,
                    'inspiration': False,
                },
                'details': {
                    'biography': {'value': bio, 'public': ''},
                    'alignment': '',
                    'race': None,
                    'type': {'value': hb.get('type', 'humanoid'),
                             'subtype': '', 'swarm': '', 'custom': ''},
                    'environment': '',
                    'cr': hb['cr'],
                    'spellLevel': 0,
                    'source': {'custom': hb.get('source', '')},
                    'xp': {'value': hb.get('xp', XP_BY_CR.get(hb['cr'], 0))},
                },
                'traits': {
                    'size': hb.get('size', 'med'),
                    'di': {'value': [], 'bypasses': [], 'custom': damage_immune_custom},
                    'dr': {'value': [], 'bypasses': [], 'custom': damage_resist_custom},
                    'dv': {'value': [], 'bypasses': [], 'custom': ''},
                    'ci': {'value': [], 'custom': condition_immune_custom},
                    'languages': {'value': [], 'custom': hb.get('languages', '')},
                },
                'currency': {'pp': 0, 'gp': 0, 'ep': 0, 'sp': 0, 'cp': 0},
                'skills': skills,
                'resources': {
                    'legact': {
                        'value': len(hb.get('legendary_actions', [])),
                        'max': max(3, len(hb.get('legendary_actions', []))),
                    },
                    'legres': {
                        'value': 3 if 'Legendary Resistance' in str(hb.get('traits', [])) else 0,
                        'max': 3 if 'Legendary Resistance' in str(hb.get('traits', [])) else 0,
                    },
                    'lair': {'value': False, 'initiative': 0},
                },
            },
            'prototypeToken': {
                'name': hb['name'],
                'displayName': 0,
                'actorLink': False,
                'width': 2 if hb.get('size') in ('lg', 'huge') else 1,
                'height': 2 if hb.get('size') in ('lg', 'huge') else 1,
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

    def _prisoner_to_actor(self, prisoner: Dict[str, str]) -> Dict[str, Any]:
        """Prisoner = Commoner stats (HP 4, AC 10) + biography for roleplay."""
        bio_html = (
            f'<p><strong>Age:</strong> {prisoner.get("age", "—")}</p>'
            f'<p><strong>Location:</strong> {prisoner.get("location", "—")}</p>'
            f'<p><strong>Status:</strong> {prisoner.get("status", "—")}</p>'
            f'<p>{prisoner.get("background", "")}</p>'
        )

        abilities = _default_abilities()  # All 10s — true commoners
        skills = _default_skills()

        return {
            '_id': new_id(),
            'name': prisoner['name'],
            'type': 'npc',
            'img': 'icons/svg/mystery-man.svg',
            'system': {
                'abilities': abilities,
                'attributes': {
                    'ac': {'flat': 10, 'calc': 'flat', 'formula': ''},
                    'hp': {'value': 4, 'max': 4, 'formula': '1d8', 'temp': 0, 'tempmax': 0},
                    'init': {'ability': 'dex', 'bonus': ''},
                    'movement': {'walk': 30, 'burrow': 0, 'climb': 0, 'fly': 0, 'swim': 0,
                                 'units': 'ft', 'hover': False, 'special': ''},
                    'senses': {'darkvision': 0, 'blindsight': 0, 'tremorsense': 0,
                               'truesight': 0, 'units': 'ft', 'special': ''},
                    'spellcasting': '',
                    'death': {'success': 0, 'failure': 0},
                    'exhaustion': 0,
                    'inspiration': False,
                },
                'details': {
                    'biography': {'value': bio_html, 'public': ''},
                    'alignment': '',
                    'race': None,
                    'type': {'value': 'humanoid', 'subtype': '', 'swarm': '', 'custom': ''},
                    'environment': '',
                    'cr': 0,
                    'spellLevel': 0,
                    'source': {'custom': 'Tyranny of Dragons campaign - named prisoner'},
                    'xp': {'value': 10},
                },
                'traits': {
                    'size': 'med',
                    'di': {'value': [], 'bypasses': [], 'custom': ''},
                    'dr': {'value': [], 'bypasses': [], 'custom': ''},
                    'dv': {'value': [], 'bypasses': [], 'custom': ''},
                    'ci': {'value': [], 'custom': ''},
                    'languages': {'value': ['common'], 'custom': ''},
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
                'name': prisoner['name'],
                'displayName': 0,
                'actorLink': False,
                'width': 1, 'height': 1,
                'texture': {'src': 'icons/svg/mystery-man.svg'},
                'sight': {'enabled': False},
                'detectionModes': [],
                'flags': {},
                'disposition': 0,  # neutral
            },
            'items': [],
            'effects': [],
            'folder': None,
            'sort': 0,
            'ownership': {'default': 0},
            'flags': {},
            '_stats': {'systemId': 'dnd5e', 'systemVersion': '5.2.3'},
        }
