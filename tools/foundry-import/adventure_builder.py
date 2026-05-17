"""Wrap actors / journals / scenes into a Foundry Adventure document.

Adventure schema reference:
https://foundryvtt.com/api/classes/foundry.documents.Adventure.html

The Adventure Importer/Exporter module accepts a single JSON file matching
this shape and creates all embedded documents in one click.
"""

from typing import Any, Dict, List

from stat_extractor import new_id


def build_journal_entry(name: str, pages: List[Dict[str, str]]) -> Dict[str, Any]:
    """Build a JournalEntry document with text pages.

    Each page dict must have 'name' and 'content' (HTML string).
    """
    journal_pages = []
    for sort_idx, page in enumerate(pages):
        journal_pages.append({
            '_id': new_id(),
            'name': page.get('name', 'Page'),
            'type': 'text',
            'title': {'show': True, 'level': 1},
            'text': {
                'content': page.get('content', ''),
                'format': 1,  # 1 = HTML, 2 = Markdown
                'markdown': '',
            },
            'src': None,
            'image': {'caption': ''},
            'video': {'controls': True, 'volume': 0.5},
            'system': {},
            'sort': sort_idx * 100000,
            'ownership': {'default': -1},
            'flags': {},
        })

    return {
        '_id': new_id(),
        'name': name,
        'pages': journal_pages,
        'folder': None,
        'sort': 0,
        'ownership': {'default': 0},
        'flags': {},
    }


def build_scene(
    name: str,
    width: int,
    height: int,
    grid_size: int = 150,
    background_src: str = '',
    description: str = '',
) -> Dict[str, Any]:
    """Build a Scene document. Background can be added in Foundry after import."""
    return {
        '_id': new_id(),
        'name': name,
        'active': False,
        'navigation': True,
        'navOrder': 0,
        'navName': '',
        'background': {'src': background_src or None, 'anchorX': 0.5, 'anchorY': 0.5},
        'foreground': None,
        'foregroundElevation': 20,
        'thumb': None,
        'width': width,
        'height': height,
        'padding': 0.25,
        'initial': None,
        'backgroundColor': '#999999',
        'grid': {
            'type': 1,  # 1 = square
            'size': grid_size,
            'style': 'solidLines',
            'thickness': 1,
            'color': '#000000',
            'alpha': 0.2,
            'distance': 5,
            'units': 'ft',
        },
        'tokenVision': True,
        'fog': {'exploration': True, 'reset': 0, 'overlay': None, 'colors': {'explored': None, 'unexplored': None}},
        'environment': {
            'darknessLevel': 0,
            'darknessLock': False,
            'globalLight': {
                'enabled': True,
                'alpha': 0.5,
                'bright': False,
                'color': None,
                'coloration': 1,
                'luminosity': 0,
                'saturation': 0,
                'contrast': 0,
                'shadows': 0,
                'darkness': {'min': 0, 'max': 1},
            },
            'cycle': True,
            'base': {'hue': 0, 'intensity': 0, 'luminosity': 0, 'saturation': 0, 'shadows': 0},
            'dark': {'hue': 0, 'intensity': 0, 'luminosity': -0.25, 'saturation': 0, 'shadows': 0},
        },
        'tokens': [],
        'lights': [],
        'notes': [],
        'sounds': [],
        'regions': [],
        'templates': [],
        'tiles': [],
        'drawings': [],
        'walls': [],
        'folder': None,
        'sort': 0,
        'ownership': {'default': 0},
        'flags': {
            'tyranny-of-dragons': {'description': description},
        },
    }


def build_adventure(
    name: str,
    actors: List[Dict[str, Any]],
    journal: List[Dict[str, Any]],
    scenes: List[Dict[str, Any]],
    description: str = '',
    caption: str = '',
    img: str = '',
) -> Dict[str, Any]:
    """Assemble the top-level Adventure document.

    Embedded documents (actors, journal, scenes) live inline. The Adventure
    Importer/Exporter module reads this and creates them all on import.
    """
    return {
        '_id': new_id(),
        'name': name,
        'description': description,
        'caption': caption,
        'img': img,
        'folder': None,
        'sort': 0,
        'flags': {
            'core': {'sourceId': 'Adventure.tyranny-of-dragons'},
        },
        'actors': actors,
        'items': [],
        'scenes': scenes,
        'journal': journal,
        'tables': [],
        'macros': [],
        'playlists': [],
        'cards': [],
        'combats': [],
        'folders': [],
        '_stats': {
            'systemId': 'dnd5e',
            'systemVersion': '5.2.3',
            'coreVersion': '13.0.0',
        },
    }
