"""Parse D&D campaign markdown files into structured data for Foundry import."""

import os
import re
from pathlib import Path
from typing import Any, Dict, List, Optional
import markdown


class MarkdownParser:
    """Extract campaign content from markdown files."""

    def __init__(self, repo_root: str):
        self.repo_root = Path(repo_root)
        self.md_converter = markdown.Markdown(extensions=['tables', 'extra'])

    def parse_file(self, filepath: str) -> Dict[str, Any]:
        """Parse a single markdown file and extract content."""
        path = self.repo_root / filepath
        if not path.exists():
            raise FileNotFoundError(f"File not found: {filepath}")

        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        return {
            'path': filepath,
            'raw': content,
            'sections': self._extract_sections(content),
            'tables': self._extract_tables(content),
        }

    def _extract_sections(self, content: str) -> Dict[str, str]:
        """Extract markdown sections by heading level."""
        sections = {}
        current_section = None
        current_content = []

        for line in content.split('\n'):
            # Match heading
            match = re.match(r'^(#{1,6})\s+(.+)$', line)
            if match:
                # Save previous section
                if current_section:
                    sections[current_section] = '\n'.join(current_content).strip()
                current_section = match.group(2).strip()
                current_content = []
            else:
                current_content.append(line)

        if current_section:
            sections[current_section] = '\n'.join(current_content).strip()

        return sections

    def _extract_tables(self, content: str) -> List[Dict[str, Any]]:
        """Extract markdown tables into structured data."""
        tables = []
        lines = content.split('\n')
        i = 0

        while i < len(lines):
            # Look for table start (header | separator pattern)
            if '|' in lines[i] and i + 1 < len(lines) and '|' in lines[i + 1]:
                # Check if next line is separator
                if re.match(r'^\|\s*[-:|\s]+\|', lines[i + 1]):
                    header_line = lines[i]
                    sep_line = lines[i + 1]

                    # Parse header
                    headers = [h.strip() for h in header_line.split('|')[1:-1]]

                    # Parse rows
                    rows = []
                    j = i + 2
                    while j < len(lines) and '|' in lines[j]:
                        cells = [c.strip() for c in lines[j].split('|')[1:-1]]
                        if len(cells) == len(headers):
                            rows.append(dict(zip(headers, cells)))
                        j += 1

                    tables.append({
                        'headers': headers,
                        'rows': rows,
                        'raw': '\n'.join(lines[i:j])
                    })
                    i = j
                    continue

            i += 1

        return tables

    def extract_boxed_text(self, content: str) -> List[str]:
        """Extract quoted/boxed text (flavor text) from markdown."""
        boxed = []
        for line in content.split('\n'):
            if line.startswith('>'):
                boxed.append(line[1:].strip())
        return boxed

    def extract_stat_block(self, content: str) -> Optional[Dict[str, Any]]:
        """Extract a D&D stat block from markdown content.

        Looks for patterns like:
        - **AC** 16
        - **HP** 78 (12d8 + 24)
        - **Speed** 30 ft.
        """
        stat_block = {}

        # Match common stat lines
        patterns = {
            'ac': r'\*\*AC\*\*\s+(\d+)',
            'hp': r'\*\*HP\*\*\s+([\d\+\-\w\s()]+)',
            'speed': r'\*\*Speed\*\*\s+(.+?)(?:\n|$)',
            'str': r'\*\*STR\*\*\s+(\d+)',
            'dex': r'\*\*DEX\*\*\s+(\d+)',
            'con': r'\*\*CON\*\*\s+(\d+)',
            'wis': r'\*\*WIS\*\*\s+(\d+)',
            'int': r'\*\*INT\*\*\s+(\d+)',
            'cha': r'\*\*CHA\*\*\s+(\d+)',
        }

        for key, pattern in patterns.items():
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                stat_block[key] = match.group(1).strip()

        return stat_block if stat_block else None

    def parse_party_character(self, filepath: str) -> Dict[str, Any]:
        """Parse a player character file (spillere/*.md)."""
        file_data = self.parse_file(filepath)
        raw = file_data['raw']
        tables = file_data['tables']

        # Extract name from filename or first heading
        name = Path(filepath).stem.replace('_', ' ').replace('-', ' ').title()

        # Extract abilities, skills, spells from tables
        actor = {
            'name': name,
            'type': 'character',
            'data': {
                'abilities': {},
                'skills': {},
                'spells': [],
                'equipment': [],
            },
            'journal': '',
        }

        # Parse ability scores from tables
        for table in tables:
            if any('STR' in h or 'DEX' in h for h in table['headers']):
                for row in table['rows']:
                    for key in ['STR', 'DEX', 'CON', 'WIS', 'INT', 'CHA']:
                        if key in row:
                            actor['data']['abilities'][key.lower()] = int(row[key])

        # Extract spells section
        spells_section = next((v for k, v in file_data['sections'].items() if 'spell' in k.lower()), None)
        if spells_section:
            spell_lines = [line.strip() for line in spells_section.split('\n') if line.strip().startswith('-')]
            actor['data']['spells'] = [line[2:].strip() for line in spell_lines]

        # Extract equipment section
        equip_section = next((v for k, v in file_data['sections'].items() if 'equipment' in k.lower() or 'gear' in k.lower()), None)
        if equip_section:
            equip_lines = [line.strip() for line in equip_section.split('\n') if line.strip().startswith('-')]
            actor['data']['equipment'] = [line[2:].strip() for line in equip_lines]

        return actor

    def parse_npc(self, filepath: str) -> Dict[str, Any]:
        """Parse an NPC file (npcs/*.md)."""
        file_data = self.parse_file(filepath)
        raw = file_data['raw']
        sections = file_data['sections']

        name = Path(filepath).stem.replace('_', ' ').replace('-', ' ').title()

        # Extract sections for journal
        personality = sections.get('Personality', sections.get('Characterization', ''))
        motivations = sections.get('Motivations', sections.get('What They Offer', ''))
        dialogue = sections.get('Dialogue', '')

        npc = {
            'name': name,
            'type': 'npc',
            'data': self.extract_stat_block(raw) or {},
            'raw_content': raw,
            'journal_pages': [
                {'name': 'Personality', 'content': personality},
                {'name': 'Motivations', 'content': motivations},
                {'name': 'Dialogue', 'content': dialogue},
            ],
        }

        return npc

    def parse_npc_registry(self, filepath: str) -> Dict[str, Any]:
        """Parse a registry file (e.g., council-of-waterdeep.md) with `## NPC Name`
        sections — each section becomes its own NPC entry.

        Returns: {'npcs': [...individual NPCs...], 'journal': {...combined journal...}}
        """
        file_data = self.parse_file(filepath)
        raw = file_data['raw']

        # Split on H2 headings. The first chunk is the file's intro (before any H2).
        chunks = re.split(r'(?m)^## (.+)$', raw)
        # chunks = [intro, name1, body1, name2, body2, ...]
        intro = chunks[0] if chunks else ''

        npcs = []
        journal_pages = []
        if intro.strip():
            journal_pages.append({'name': 'Overview', 'content': intro.strip()})

        for i in range(1, len(chunks), 2):
            if i + 1 >= len(chunks):
                break
            npc_name = chunks[i].strip()
            npc_body = chunks[i + 1].strip()
            npcs.append({
                'name': npc_name,
                'type': 'npc',
                'data': self.extract_stat_block(npc_body) or {},
                'raw_content': npc_body,
                'journal_pages': [{'name': 'Profile', 'content': npc_body}],
            })
            journal_pages.append({'name': npc_name, 'content': npc_body})

        return {
            'npcs': npcs,
            'journal': {
                'name': Path(filepath).stem.replace('-', ' ').replace('_', ' ').title(),
                'pages': journal_pages,
            },
        }

    def parse_enemy(self, content: str, name: str) -> Dict[str, Any]:
        """Parse an enemy stat block from markdown content."""
        stat_block = self.extract_stat_block(content)

        enemy = {
            'name': name,
            'type': 'creature',
            'data': stat_block or {},
        }

        return enemy

    def parse_journal_file(self, filepath: str, title: str) -> Dict[str, Any]:
        """Parse a markdown file as a journal entry."""
        file_data = self.parse_file(filepath)
        sections = file_data['sections']

        # Convert sections to journal pages
        pages = []
        for section_name, section_content in sections.items():
            if section_content.strip():
                pages.append({
                    'name': section_name,
                    'content': self._markdown_to_html(section_content),
                })

        return {
            'name': title,
            'type': 'journal',
            'pages': pages if pages else [{
                'name': 'Content',
                'content': self._markdown_to_html(file_data['raw']),
            }],
        }

    def _markdown_to_html(self, content: str) -> str:
        """Convert markdown to HTML for journal entries."""
        self.md_converter.reset()
        return self.md_converter.convert(content)


class ContentExtractor:
    """High-level extraction of campaign content."""

    def __init__(self, repo_root: str):
        self.parser = MarkdownParser(repo_root)
        self.repo_root = Path(repo_root)

    def extract_all_characters(self) -> List[Dict[str, Any]]:
        """Extract all player characters from spillere/."""
        characters = []
        char_dir = self.repo_root / 'spillere'
        if char_dir.exists():
            for md_file in sorted(char_dir.glob('*.md')):
                if md_file.name != 'README.md':
                    try:
                        characters.append(self.parser.parse_party_character(f'spillere/{md_file.name}'))
                    except Exception as e:
                        print(f"Error parsing {md_file.name}: {e}")
        return characters

    def extract_all_npcs(self) -> Dict[str, List[Dict[str, Any]]]:
        """Extract all NPCs from npcs/.

        Returns: {'npcs': [...], 'registry_journals': [...]}
        - Single-NPC files become one entry in 'npcs'.
        - Registry files (H1 contains 'Reference') are split: each `## Name`
          section becomes its own NPC, plus a combined journal for the whole file.
        """
        npcs: List[Dict[str, Any]] = []
        registry_journals: List[Dict[str, Any]] = []
        npc_dir = self.repo_root / 'npcs'
        if not npc_dir.exists():
            return {'npcs': npcs, 'registry_journals': registry_journals}

        for md_file in sorted(npc_dir.glob('*.md')):
            try:
                # Peek at first line to detect registry files
                with open(md_file, 'r', encoding='utf-8') as f:
                    first_line = f.readline().strip()
                is_registry = 'Reference' in first_line or 'Council' in first_line

                if is_registry:
                    result = self.parser.parse_npc_registry(f'npcs/{md_file.name}')
                    npcs.extend(result['npcs'])
                    registry_journals.append(result['journal'])
                else:
                    npcs.append(self.parser.parse_npc(f'npcs/{md_file.name}'))
            except Exception as e:
                print(f"Error parsing {md_file.name}: {e}")

        return {'npcs': npcs, 'registry_journals': registry_journals}

    def extract_campaign_overview(self) -> Optional[Dict[str, Any]]:
        """Extract campaign lore as a journal."""
        try:
            return self.parser.parse_journal_file(
                'tyranny-of-dragons-kampagne.md',
                'Campaign Overview'
            )
        except Exception as e:
            print(f"Error extracting campaign overview: {e}")
            return None

    def extract_session_prep(self) -> List[Dict[str, Any]]:
        """Extract session prep files as journals."""
        journals = []
        prep_dir = self.repo_root / 'session-prep'
        if prep_dir.exists():
            for md_file in sorted(prep_dir.glob('*.md')):
                if md_file.name != 'README.md':
                    try:
                        title = md_file.stem.replace('_', ' ').title()
                        journals.append(self.parser.parse_journal_file(
                            f'session-prep/{md_file.name}',
                            title
                        ))
                    except Exception as e:
                        print(f"Error parsing {md_file.name}: {e}")
        return journals
