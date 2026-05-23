"""Spell mappings for automatically adding spells from Foundry compendia.

This defines which spells should be added to each actor during import.
The macro will search the dnd5e spells compendium and add matching spells.
"""

SPELL_MAPPINGS = {
    "Severin": [
        # Cantrips
        "Detect Magic",
        "Eldritch Blast",
        "Fire Bolt",
        "Mind Sliver",
        "Speak with Animals",
        # 1st-level
        "Shield",
        # 5th-level
        "Counterspell",
        "Dominate Person",
        "Hold Monster",
        "Wall of Fire",
        # 6th-level
        "Eyebite",
        "Globe of Invulnerability",
        # 7th-level
        "Finger of Death",
        "Plane Shift",
        # 8th-level
        "Dominate Monster",
        # 9th-level
        "Wish",
    ],
    "Taern Hornblade": [
        "Fire Bolt",
        "Counterspell",
        "Detect Magic",
        "Shield",
        "Hold Monster",
        "Wall of Fire",
    ],
    "Crimson Maccath": [
        "Eldritch Blast",
        "Counterspell",
        "Dominate Person",
        "Hold Monster",
        "Finger of Death",
    ],
    "Nyh Ilmichh": [
        "Mind Sliver",
        "Dominate Monster",
        "Globe of Invulnerability",
        "Plane Shift",
        "Wish",
    ],
    "Dagult Neverember": [
        "Detect Magic",
    ],
    "Blue Abishai": [
        "Counterspell",
        "Plane Shift",
    ],
    "Rath Modar": [
        "Dominate Person",
    ],
}


def get_spell_mapping():
    """Return the spell mapping dictionary."""
    return SPELL_MAPPINGS
