
// ============================================================================
// TEST MACRO: Import Single NPC (Severin)
// ============================================================================
// This is a minimal test to verify the import system works
//
// Steps:
// 1. Open Foundry Developer Console (F12)
// 2. Click the 'Console' tab
// 3. Copy this ENTIRE script
// 4. Paste into console and press Enter
// 5. Check Actors sidebar - Severin should appear
// ============================================================================

async function testImport() {
  try {
    ui.notifications.info("Testing import with 1 NPC...");

    // Test data: Just Severin
    const testActor = {
  "_id": "iyemD6ow8T6HpeaI",
  "name": "Severin",
  "type": "npc",
  "img": "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/severin-masked-token_20260516_164450_1.png",
  "system": {
    "abilities": {
      "str": {
        "value": 14,
        "proficient": 0,
        "max": null,
        "bonuses": {
          "check": "",
          "save": ""
        },
        "check": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        },
        "save": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        }
      },
      "dex": {
        "value": 14,
        "proficient": 0,
        "max": null,
        "bonuses": {
          "check": "",
          "save": ""
        },
        "check": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        },
        "save": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        }
      },
      "con": {
        "value": 18,
        "proficient": 0,
        "max": null,
        "bonuses": {
          "check": "",
          "save": ""
        },
        "check": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        },
        "save": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        }
      },
      "int": {
        "value": 20,
        "proficient": 1,
        "max": null,
        "bonuses": {
          "check": "",
          "save": ""
        },
        "check": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        },
        "save": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        }
      },
      "wis": {
        "value": 16,
        "proficient": 1,
        "max": null,
        "bonuses": {
          "check": "",
          "save": ""
        },
        "check": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        },
        "save": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        }
      },
      "cha": {
        "value": 22,
        "proficient": 1,
        "max": null,
        "bonuses": {
          "check": "",
          "save": ""
        },
        "check": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        },
        "save": {
          "roll": {
            "min": null,
            "max": null,
            "mode": 0
          }
        }
      }
    },
    "attributes": {
      "ac": {
        "flat": 18,
        "calc": "flat",
        "formula": ""
      },
      "hp": {
        "value": 230,
        "max": 230,
        "formula": "",
        "temp": 0,
        "tempmax": 0
      },
      "init": {
        "ability": "dex",
        "bonus": ""
      },
      "movement": {
        "walk": 30,
        "burrow": 0,
        "climb": 0,
        "fly": 0,
        "swim": 0,
        "units": "ft",
        "hover": false,
        "special": ""
      },
      "senses": {
        "units": "ft",
        "special": "",
        "ranges": {
          "darkvision": 120,
          "blindsight": 0,
          "tremorsense": 0,
          "truesight": 30
        }
      },
      "spellcasting": "cha",
      "death": {
        "success": 0,
        "failure": 0
      },
      "exhaustion": 0
    },
    "details": {
      "biography": {
        "value": "<h2>Severin, High Wyrmspeaker</h2><p><em>Medium Humanoid (Human), Chaotic Evil. Prophet, fanatic, and Tiamat's voice in the world.</em></p><h3>Personality</h3><p>Severin is <strong>not</strong> a classic villain who wants power for power's sake. He is convinced that Tiamat is the world order - and that everything else is a temporary error.</p><ul><li>Grandiose - he speaks as though everything is already decided.</li><li>Charismatic - he explains, persuades, instructs.</li><li>Contemptuous of democratic power, councils, and compromise.</li><li>Sees the party as interesting anomalies in an inevitable pattern.</li><li>In Phase 2: becomes more desperate - but tries to hide it.</li></ul><h3>Phase 2 (below 115 HP)</h3><ul><li>Globe of Invulnerability drops.</li><li>Dominate Monster against Frygtlos (DC 20 Wisdom save) as the first Phase 2 action.</li><li>Mask Resonance recharges on 4-6.</li><li>No longer uses Shield - Tiamat's protection instead.</li><li>Speaks in a mix of Common and Draconic.</li></ul><h3>The Five Masks</h3><p>Five masks float in a ring 5 feet above Severin's head. <strong>AC 15, HP 30 each.</strong> Immune to acid, cold, fire, lightning, poison; vulnerable to force and radiant. Each destroyed mask gives -1 to Severin's saves and attacks. All five destroyed = Severin falls instantly.</p>",
        "public": ""
      },
      "alignment": "Chaotic Evil",
      "race": null,
      "type": {
        "value": "humanoid",
        "subtype": "human",
        "swarm": "",
        "custom": ""
      },
      "environment": "",
      "cr": 20,
      "spellLevel": 18,
      "source": {
        "custom": "Tyranny of Dragons campaign",
        "revision": 1,
        "rules": "2024"
      },
      "xp": {
        "value": 25000
      }
    },
    "traits": {
      "size": "med",
      "di": {
        "value": [
          "acid",
          "cold",
          "fire",
          "lightning",
          "poison"
        ],
        "bypasses": [],
        "custom": "Removed if all 5 masks are destroyed"
      },
      "dr": {
        "value": [],
        "bypasses": [],
        "custom": ""
      },
      "dv": {
        "value": [],
        "bypasses": [],
        "custom": ""
      },
      "ci": {
        "value": [
          "charmed",
          "frightened"
        ],
        "custom": ""
      },
      "languages": {
        "value": [
          "common",
          "draconic",
          "abyssal",
          "infernal"
        ],
        "custom": ""
      }
    },
    "currency": {
      "pp": 0,
      "gp": 0,
      "ep": 0,
      "sp": 0,
      "cp": 0
    },
    "skills": {
      "acr": {
        "ability": "dex",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "ani": {
        "ability": "wis",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "arc": {
        "ability": "int",
        "value": 2,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "ath": {
        "ability": "str",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "dec": {
        "ability": "cha",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "his": {
        "ability": "int",
        "value": 1,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "ins": {
        "ability": "wis",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "itm": {
        "ability": "cha",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "inv": {
        "ability": "int",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "med": {
        "ability": "wis",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "nat": {
        "ability": "int",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "prc": {
        "ability": "wis",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "prf": {
        "ability": "cha",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "per": {
        "ability": "cha",
        "value": 1,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "rel": {
        "ability": "int",
        "value": 1,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "slt": {
        "ability": "dex",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "ste": {
        "ability": "dex",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      },
      "sur": {
        "ability": "wis",
        "value": 0,
        "bonuses": {
          "check": "",
          "passive": ""
        },
        "roll": {
          "min": null,
          "max": null,
          "mode": 0
        }
      }
    },
    "resources": {
      "legact": {
        "value": 3,
        "max": 3
      },
      "legres": {
        "value": 3,
        "max": 3
      },
      "lair": {
        "value": false,
        "initiative": 0
      }
    }
  },
  "prototypeToken": {
    "name": "Severin",
    "displayName": 0,
    "actorLink": false,
    "width": 1,
    "height": 1,
    "texture": {
      "src": "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/severin-masked-token_20260516_164450_1.png"
    },
    "sight": {
      "enabled": false
    },
    "detectionModes": [],
    "flags": {},
    "disposition": -1
  },
  "items": [
    {
      "_id": "V3w3dwm0qAWXfZlx",
      "type": "feat",
      "name": "Legendary Resistance (3/Day)",
      "img": "icons/svg/aura.svg",
      "system": {
        "description": {
          "value": "<p>If Severin fails a saving throw, he can choose to succeed instead. Refreshes once at the Phase 2 transition (below 115 HP).</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "wlXnC8smceTPt0u1",
      "type": "feat",
      "name": "Mask Resonance (Recharge 5-6)",
      "img": "icons/svg/aura.svg",
      "system": {
        "description": {
          "value": "<p><em>Phase 2: Recharge 4-6.</em> 60 ft. burst, DC 18 Dexterity save. <strong>8d8 damage</strong> (1d8 acid + 1d8 cold + 1d8 fire + 1d8 lightning + 1d8 poison + 3d8 force). Halved on a success. Cover does not reduce this.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "2IQsKQqMAUD5dOmd",
      "type": "feat",
      "name": "Ritual Action (Bonus Action, 1/round)",
      "img": "icons/svg/aura.svg",
      "system": {
        "description": {
          "value": "<p>Ritual clock +1. Cannot be used while Severin is Concentrating on a spell that requires a full action. Axar can Counterspell this (1x per Long Rest for -1 clock).</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "bBVkETBYfeMhJ3M7",
      "type": "feat",
      "name": "Portal Ward",
      "img": "icons/svg/aura.svg",
      "system": {
        "description": {
          "value": "<p>Total cover from the portal behind Severin. The portal closes defensively if Severin is below 50 HP.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "LA5mi6GT1XnZTSCo",
      "type": "feat",
      "name": "Champion of Tiamat (Clock 5+)",
      "img": "icons/svg/aura.svg",
      "system": {
        "description": {
          "value": "<p>While the ritual clock is at 5 or higher, Severin gains +2 to all saving throws and attack rolls.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "aa0t9NGfhNHrPeBM",
      "type": "feat",
      "name": "Dragon Scale Robes of the Five",
      "img": "icons/svg/aura.svg",
      "system": {
        "description": {
          "value": "<p>1/day: ignore the damage from one attack (reduced to 0). Resets on a Long Rest.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "pri6qrpYGw4lxMXx",
      "type": "feat",
      "name": "Innate Casting",
      "img": "icons/svg/aura.svg",
      "system": {
        "description": {
          "value": "<p>Severin casts <em>Detect Magic</em> and <em>Speak with Animals</em> (dragons only) at will, via the masks.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "NwWTDgVXcLNNZnxT",
      "type": "feat",
      "name": "Multiattack",
      "img": "icons/svg/sword.svg",
      "system": {
        "description": {
          "value": "<p>Severin casts two spells, or one spell and one Eldritch Blast.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "T8vsPTqHfiGn2bZM",
      "type": "feat",
      "name": "Eldritch Blast",
      "img": "icons/svg/sword.svg",
      "system": {
        "description": {
          "value": "<p><em>Ranged Spell Attack:</em> +12 to hit, range 120 ft., 2 beams. <em>Hit:</em> 2d10 + 6 Force damage per beam.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "jFs2Ye4RNlrZikds",
      "type": "feat",
      "name": "Shield (Reaction)",
      "img": "icons/svg/sword.svg",
      "system": {
        "description": {
          "value": "<p>+5 to AC against one attack. Can be used to protect a mask instead of Severin.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "gcqV1JC36Q3qy4q5",
      "type": "feat",
      "name": "Spellcasting (Spell Save DC 20, Spell Attack +12)",
      "img": "icons/svg/sword.svg",
      "system": {
        "description": {
          "value": "<p><strong>Cantrips:</strong> Eldritch Blast, Fire Bolt, Mind Sliver.</p><p><strong>5th (3 slots):</strong> Dominate Person, Hold Monster, Wall of Fire.</p><p><strong>6th (2 slots):</strong> Eyebite, Globe of Invulnerability.</p><p><strong>7th (2 slots):</strong> Finger of Death, Plane Shift.</p><p><strong>8th (1 slot):</strong> Dominate Monster.</p><p><strong>9th (1 slot):</strong> Wish (ritual use only).</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "r0ckpWU6AEwf5crK",
      "type": "feat",
      "name": "Legendary Action: Eldritch Blast (1 LA)",
      "img": "icons/svg/upgrade.svg",
      "system": {
        "description": {
          "value": "<p>Severin makes one Eldritch Blast (2 beams, +12, 2d10 + 6 Force each).</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "tLqniLrMngN8C0Dg",
      "type": "feat",
      "name": "Legendary Action: Ritual Surge (2 LA)",
      "img": "icons/svg/upgrade.svg",
      "system": {
        "description": {
          "value": "<p>Ritual clock +1. Allies on Level 3 heal 2d8 HP.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    },
    {
      "_id": "DXxTUVQWrO33gNyR",
      "type": "feat",
      "name": "Legendary Action: Summon Devout (3 LA)",
      "img": "icons/svg/upgrade.svg",
      "system": {
        "description": {
          "value": "<p>1d4 Dragonclaws teleport to an unoccupied space within 30 ft. of Severin.</p>",
          "chat": ""
        },
        "source": {
          "custom": "Tyranny of Dragons campaign",
          "revision": 1,
          "rules": "2024"
        }
      },
      "effects": [],
      "flags": {},
      "folder": null,
      "sort": 0,
      "ownership": {
        "default": 0
      },
      "_stats": {
        "compendiumSource": null,
        "duplicateSource": null,
        "exportSource": null,
        "coreVersion": "13.351",
        "systemId": "dnd5e",
        "systemVersion": "5.3.3"
      }
    }
  ],
  "effects": [],
  "folder": null,
  "sort": 0,
  "ownership": {
    "default": 0
  },
  "flags": {},
  "_stats": {
    "systemId": "dnd5e",
    "systemVersion": "5.3.3"
  }
};

    // Create or find "temple-of-tiamat" parent folder
    let parentFolder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");
    if (!parentFolder) {
      parentFolder = await Folder.create({
        name: "temple-of-tiamat",
        type: "Actor"
      });
    }

    // Create or find "NPCs" subfolder under parent
    let folder = game.folders.find(f => f.name === "NPCs" && f.type === "Actor" && f.parent?.id === parentFolder.id);
    if (!folder) {
      folder = await Folder.create({
        name: "NPCs",
        type: "Actor",
        parent: parentFolder.id
      });
    }

    // Set folder on actor
    testActor.folder = folder.id;

    // Remove _id to let Foundry generate it
    delete testActor._id;

    // Import the actor
    ui.notifications.info("Creating actor: " + testActor.name);
    const actor = await Actor.create(testActor);

    ui.notifications.success("✓ Test successful! " + actor.name + " imported.");
    console.log("Actor created:", actor);

  } catch (error) {
    ui.notifications.error("Test failed: " + error.message);
    console.error("Error details:", error);
  }
}

// Run the test
testImport();
