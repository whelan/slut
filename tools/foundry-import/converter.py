"""Orchestrate markdown parsing and Adventure JSON assembly."""

import json
from pathlib import Path
from typing import Any, Dict, List

from markdown_parser import ContentExtractor, MarkdownParser
from stat_extractor import StatBlockExtractor, PartyCharacterBuilder
from adventure_builder import build_adventure, build_journal_entry, build_scene
from enemy_builder import EnemyBuilder


class CampaignConverter:
    """Convert campaign markdown files into a Foundry Adventure document."""

    def __init__(self, repo_root: str):
        self.repo_root = Path(repo_root)
        self.extractor = ContentExtractor(repo_root)
        self.parser = MarkdownParser(repo_root)
        self.stat = StatBlockExtractor()
        self.pc_builder = PartyCharacterBuilder()
        self.enemy_builder = EnemyBuilder(repo_root)

        self.actors: List[Dict[str, Any]] = []
        self.journals: List[Dict[str, Any]] = []
        self.scenes: List[Dict[str, Any]] = []

    def convert_all(self, skip_pcs: bool = False) -> None:
        print("Converting campaign content...")

        if skip_pcs:
            print("  Skipping party characters (already exist in Foundry)")
        else:
            print("  Party characters:")
            for char in self.extractor.extract_all_characters():
                self.actors.append(self.pc_builder.to_foundry_character(char))
                print(f"    + {char['name']}")

        print("  NPCs:")
        npc_result = self.extractor.extract_all_npcs()
        for npc in npc_result['npcs']:
            biography = self._pages_to_biography(npc.get('journal_pages', []))
            actor = self.stat.to_foundry_npc(
                name=npc['name'],
                content=npc.get('raw_content', ''),
                biography=biography,
            )
            self.actors.append(actor)

            # Standalone journal for single-NPC files (skip for registry-split NPCs:
            # those are covered by the combined registry journal below).
            journal_pages = [
                {'name': p.get('name', 'Page'), 'content': self._to_html(p.get('content', ''))}
                for p in npc.get('journal_pages', [])
                if p.get('content', '').strip()
            ]
            if len(journal_pages) > 1:  # >1 indicates structured personality/motivations/dialogue
                self.journals.append(build_journal_entry(
                    name=f"{npc['name']} – Profile",
                    pages=journal_pages,
                ))
            print(f"    + {npc['name']}")

        # Combined registry journals (one per registry file, e.g. Council of Waterdeep)
        for reg_journal in npc_result['registry_journals']:
            pages_html = [
                {'name': p['name'], 'content': self._to_html(p['content'])}
                for p in reg_journal['pages']
            ]
            self.journals.append(build_journal_entry(name=reg_journal['name'], pages=pages_html))
            print(f"    + {reg_journal['name']} (registry journal)")

        print("  Enemy roster (SRD + homebrew + prisoners):")
        enemy_actors = self.enemy_builder.build_all()
        self.actors.extend(enemy_actors)

        print("  Campaign lore:")
        campaign = self.extractor.extract_campaign_overview()
        if campaign:
            pages = [
                {'name': p.get('name', 'Page'), 'content': p.get('content', '')}
                for p in campaign.get('pages', [])
            ]
            self.journals.append(build_journal_entry(name=campaign['name'], pages=pages))
            print(f"    + {campaign['name']}")

        print("  Session prep:")
        for journal_data in self.extractor.extract_session_prep():
            pages = [
                {'name': p.get('name', 'Page'), 'content': p.get('content', '')}
                for p in journal_data.get('pages', [])
            ]
            self.journals.append(build_journal_entry(name=journal_data['name'], pages=pages))
            print(f"    + {journal_data['name']}")

        print("  Ritual clock tracker:")
        self.journals.append(self._ritual_clock_journal())
        print("    + Ritual Clock Tracker")

        print("  Temple scenes:")
        for scene in self._temple_scenes():
            self.scenes.append(scene)
            print(f"    + {scene['name']}")

        print()
        print(f"Total: {len(self.actors)} actors, {len(self.journals)} journals, {len(self.scenes)} scenes")

    def write_adventure(self, output_dir: str, adventure_name: str) -> str:
        out = Path(output_dir)
        out.mkdir(parents=True, exist_ok=True)

        adventure = build_adventure(
            name=adventure_name,
            actors=self.actors,
            journal=self.journals,
            scenes=self.scenes,
            description='<p>Tyranny of Dragons finale: Well of Dragons and Temple of Tiamat.</p>',
            caption='<p>D&D 5e 2024 campaign endgame.</p>',
        )

        # Adventure Importer/Exporter expects a list-shaped JSON for some versions,
        # but the standard Foundry Adventure document is a single object. We write
        # the single-object form, which works with the current importer module.
        output_path = out / 'adventure.json'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(adventure, f, indent=2, ensure_ascii=False)

        return str(output_path)

    def _ritual_clock_journal(self) -> Dict[str, Any]:
        return build_journal_entry(
            name='Ritual Clock Tracker',
            pages=[{
                'name': 'Clock Status',
                'content': (
                    '<h2>Ritual Clock (0–8)</h2>'
                    '<p><strong>Current:</strong> 0</p>'
                    '<h2>Advancement Triggers</h2>'
                    '<ul>'
                    '<li>Foci sabotaged: -1 per focus</li>'
                    '<li>Round passes (combat): +1 per 3 rounds</li>'
                    '<li>Ritual Surge triggered: +1</li>'
                    '</ul>'
                    '<h2>Manifestation Stages</h2>'
                    '<table>'
                    '<tr><th>Clock</th><th>Tiamat State</th><th>Effect</th></tr>'
                    '<tr><td>0–2</td><td>Dimly perceivable</td><td>Faint whispers, shadows move unnaturally</td></tr>'
                    '<tr><td>3–4</td><td>Emerging</td><td>Chromatic dragon heads materialize, acid/lightning environmental damage</td></tr>'
                    '<tr><td>5–6</td><td>Dominant</td><td>Tiamat nearly full manifestation, multiple breath weapons available</td></tr>'
                    '<tr><td>7–8</td><td>Full ascension</td><td>Tiamat physically manifests, impossible to stop ritual</td></tr>'
                    '</table>'
                ),
            }],
        )

    def _temple_scenes(self) -> List[Dict[str, Any]]:
        return [
            build_scene(
                name='Temple – Level 1: The Maw',
                width=1536, height=1536, grid_size=150,
                description='Outer temple grounds with carved bone walls. Multiple encounter zones.',
            ),
            build_scene(
                name='Temple – Level 2: The Fivefold Sanctum',
                width=2048, height=2048, grid_size=150,
                description='Five chromatic foci on ritual platforms. Fire, cold, lightning, poison, acid hazards.',
            ),
            build_scene(
                name='Temple – Level 3: The Crown',
                width=1536, height=1536, grid_size=150,
                description='Ritual chamber with Tiamat manifestation point. Severin and the Mask of the Dragon Queen.',
            ),
        ]

    def _pages_to_biography(self, pages: List[Dict[str, str]]) -> str:
        """Concatenate page content into a single HTML biography string."""
        parts = []
        for p in pages:
            name = p.get('name', '')
            content = p.get('content', '').strip()
            if content:
                parts.append(f'<h3>{name}</h3>{self._to_html(content)}')
        return ''.join(parts)

    def _to_html(self, markdown_text: str) -> str:
        return self.parser._markdown_to_html(markdown_text)
