"""Main converter: orchestrates markdown parsing and Foundry JSON generation."""

from typing import Any, Dict, List, Optional
from pathlib import Path
from markdown_parser import ContentExtractor
from stat_extractor import StatBlockExtractor, PartyCharacterConverter
from foundry_api import FoundryAPIClient


class CampaignConverter:
    """Convert campaign markdown files to Foundry JSON entities."""

    def __init__(self, repo_root: str):
        self.repo_root = Path(repo_root)
        self.extractor = ContentExtractor(repo_root)
        self.stat_extractor = StatBlockExtractor()
        self.char_converter = PartyCharacterConverter()

        self.actors = []
        self.journals = []
        self.scenes = []

    def convert_all(self, skip_pcs: bool = False) -> Dict[str, List[Any]]:
        """Execute full conversion pipeline.

        Args:
            skip_pcs: If True, skip player character actor creation (useful when
                      PCs already exist in the Foundry world).
        """
        print("🔄 Converting campaign content...")

        # Extract and convert party characters
        if skip_pcs:
            print("⏭️  Skipping party characters (already exist in Foundry)")
        else:
            print("📋 Converting party characters...")
            characters = self.extractor.extract_all_characters()
            for char_data in characters:
                actor = self.char_converter.to_foundry_actor(char_data)
                self.actors.append(actor)
                print(f"  ✓ {char_data['name']}")

        # Extract and convert NPCs
        print("📋 Converting NPCs...")
        npcs = self.extractor.extract_all_npcs()
        for npc_data in npcs:
            # Convert NPC to actor
            actor = {
                'name': npc_data['name'],
                'type': 'npc',
                'img': 'icons/characters/humanoids/commoner.webp',
                'system': {
                    'details': {
                        'biography': {'value': ''},
                    },
                },
                'items': [],
                'effects': [],
            }
            self.actors.append(actor)

            # Create NPC journal
            journal = {
                'name': f"{npc_data['name']} - Profile",
                'pages': npc_data.get('journal_pages', []),
            }
            self.journals.append(journal)
            print(f"  ✓ {npc_data['name']}")

        # Extract campaign overview
        print("📋 Converting campaign lore...")
        campaign = self.extractor.extract_campaign_overview()
        if campaign:
            self.journals.append(campaign)
            print(f"  ✓ Campaign Overview")

        # Extract session prep journals
        print("📋 Converting session prep documents...")
        session_journals = self.extractor.extract_session_prep()
        self.journals.extend(session_journals)
        for journal in session_journals:
            print(f"  ✓ {journal['name']}")

        # Create ritual clock journal
        print("📋 Creating ritual clock tracker...")
        ritual_clock = self._create_ritual_clock_journal()
        self.journals.append(ritual_clock)
        print(f"  ✓ Ritual Clock Tracker")

        # Create temple scenes
        print("📋 Creating temple scenes...")
        temple_scenes = self._create_temple_scenes()
        self.scenes.extend(temple_scenes)
        for scene in temple_scenes:
            print(f"  ✓ {scene['name']}")

        return {
            'actors': self.actors,
            'journals': self.journals,
            'scenes': self.scenes,
        }

    def _create_ritual_clock_journal(self) -> Dict[str, Any]:
        """Create ritual clock tracker journal."""
        return {
            'name': 'Ritual Clock Tracker',
            'pages': [
                {
                    'name': 'Clock Status',
                    'content': '''
<h2>Ritual Clock (0–8)</h2>
<p><strong>Current:</strong> 0</p>

<h2>Advancement Triggers</h2>
<ul>
<li>Foci sabotaged: -1 per focus</li>
<li>Round passes (combat): +1 per 3 rounds</li>
<li>Ritual Surge triggered: +1</li>
<li>Severin wounded: varies by phase</li>
</ul>

<h2>Manifestation Stages</h2>
<table>
<tr><th>Clock</th><th>Tiamat State</th><th>Effect</th></tr>
<tr><td>0–2</td><td>Dimly perceivable</td><td>Faint whispers, shadows move unnaturally</td></tr>
<tr><td>3–4</td><td>Emerging</td><td>Chromatic dragon heads materialize, acid/lightning environmental damage</td></tr>
<tr><td>5–6</td><td>Dominant</td><td>Tiamat nearly full manifestation, multiple breath weapons available</td></tr>
<tr><td>7–8</td><td>Full ascension</td><td>Tiamat physically manifests, impossible to stop ritual</td></tr>
</table>
                    ''',
                }
            ],
        }

    def _create_temple_scenes(self) -> List[Dict[str, Any]]:
        """Create scene stubs for temple levels."""
        scenes = [
            {
                'name': 'Temple – Level 1: The Maw',
                'width': 1536,
                'height': 1536,
                'grid': {
                    'distance': 5,
                    'type': 1,
                    'size': 150,
                },
                'background': '',  # User will add background image path
                'description': 'Outer temple grounds with carved bone walls and dragon iconography. Multiple encounter zones.',
                'tokens': [],
                'walls': [],
                'lights': [],
            },
            {
                'name': 'Temple – Level 2: The Fivefold Sanctum',
                'width': 2048,
                'height': 2048,
                'grid': {
                    'distance': 5,
                    'type': 1,
                    'size': 150,
                },
                'background': '',
                'description': 'Five chromatic foci arranged in ritual platforms. Fire, cold, lightning, poison, acid hazards.',
                'tokens': [],
                'walls': [],
                'lights': [],
            },
            {
                'name': 'Temple – Level 3: The Crown',
                'width': 1536,
                'height': 1536,
                'grid': {
                    'distance': 5,
                    'type': 1,
                    'size': 150,
                },
                'background': '',
                'description': 'Ritual chamber with Tiamat manifestation point. Severin and the Mask of the Dragon Queen.',
                'tokens': [],
                'walls': [],
                'lights': [],
            },
        ]

        return scenes

    def to_json_files(self, output_dir: str) -> None:
        """Write all converted entities to JSON files."""
        import json
        out = Path(output_dir)
        out.mkdir(parents=True, exist_ok=True)

        # Write actors
        with open(out / 'actors.json', 'w') as f:
            json.dump(self.actors, f, indent=2)
        print(f"✓ Written {len(self.actors)} actors to {out / 'actors.json'}")

        # Write journals
        with open(out / 'journals.json', 'w') as f:
            json.dump(self.journals, f, indent=2)
        print(f"✓ Written {len(self.journals)} journals to {out / 'journals.json'}")

        # Write scenes
        with open(out / 'scenes.json', 'w') as f:
            json.dump(self.scenes, f, indent=2)
        print(f"✓ Written {len(self.scenes)} scenes to {out / 'scenes.json'}")

        print(f"\n📁 All JSON exported to {output_dir}/")
