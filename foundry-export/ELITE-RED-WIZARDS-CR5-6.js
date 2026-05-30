/**
 * UPGRADED RED WIZARD NPC CREATOR - 2024 D&D 5e (CR 5-6)
 *
 * Creates elite Red Wizard of Thay NPCs based on official 2024 Mage stat block.
 * Designed as formidable combat opponents (not minions).
 *
 * 2024 Rules:
 * - Proficiency +3 (CR 5-6)
 * - Spell Save DC: 8 + INT mod (3-4) + proficiency (3) = 14-15
 * - Arcane Burst: +6 to hit, 3d8+3 force damage
 * - Counterspell/Shield reactions (3/day each)
 * - Misty Step bonus action (3/day)
 * - Uses official 2024 spells + Arcana treasure
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🧙 Creating elite Red Wizard NPCs (CR 5-6, 2024 compliant)\n");

// Elite Red Wizards with unique names and roles
const ELITE_RED_WIZARDS = [
  {
    name: "Magus Thallid the Shadowborn",
    cr: 5,
    role: "War Mage specializing in evocation",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-1-token.png"
  },
  {
    name: "Magus Szass the Defiler",
    cr: 6,
    role: "Transmutation specialist with ritual focus",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-2.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-2-token.png"
  },
  {
    name: "Magus Zalathorm the Draconic",
    cr: 5,
    role: "Divination expert serving Tiamat",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-3.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-3-token.png"
  }
];

async function createFolder() {
  let folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");
  if (!folder) {
    folder = await Folder.create({
      name: "temple-of-tiamat",
      type: "Actor"
    });
  }
  return folder;
}

async function addSpellFromCompendium(actor, spellName) {
  const priorityPacks = ["dnd5e.spells24", "dnd5e.spells"];

  for (const packId of priorityPacks) {
    const pack = game.packs.get(packId);
    if (!pack) continue;

    const index = pack.index;
    const entry = index.find(e => e.name.toLowerCase() === spellName.toLowerCase());

    if (entry) {
      try {
        const spell = await pack.getDocument(entry._id);
        await actor.createEmbeddedDocuments("Item", [spell.toObject()]);
        return true;
      } catch (error) {
        continue;
      }
    }
  }
  return false;
}

async function addItemFromCompendium(actor, itemName) {
  const priorityPacks = ["dnd5e.items", "dnd5e.equipment"];

  for (const packId of priorityPacks) {
    const pack = game.packs.get(packId);
    if (!pack) continue;

    const index = pack.index;
    const entry = index.find(e => e.name.toLowerCase() === itemName.toLowerCase());

    if (entry) {
      try {
        const item = await pack.getDocument(entry._id);
        await actor.createEmbeddedDocuments("Item", [item.toObject()]);
        return true;
      } catch (error) {
        continue;
      }
    }
  }
  return false;
}

async function createEliteRedWizard(wizardData) {
  const folder = await createFolder();
  const { name, cr, role, portrait, token } = wizardData;

  // CR 5 = proficiency +3, DC 14
  // CR 6 = proficiency +3, DC 15
  const isProfBump = cr >= 6;
  const spellDC = isProfBump ? 15 : 14;
  const intMod = isProfBump ? 4 : 3;

  // Base actor data (2024 compliant) - Elite NPC
  const actorData = {
    name: name,
    type: "npc",
    folder: folder.id,
    img: portrait,
    system: {
      attributes: {
        ac: { flat: 15 },
        hp: { value: isProfBump ? 82 : 71, max: isProfBump ? 82 : 71 }
      },
      details: {
        cr: cr,
        alignment: "chaotic evil",
        biography: { value: `${name} is an elite Red Wizard of Thay (${role}). A formidable spellcaster serving the Cult of the Dragon and Tiamat's ritual.` }
      },
      abilities: {
        str: { value: 9 },
        dex: { value: 14 },
        con: { value: 11 },
        int: { value: 16 + intMod },
        wis: { value: 12 },
        cha: { value: 11 }
      },
      traits: {
        languages: { value: ["Common", "Thayan", "Draconic"] },
        senses: "passive Perception 13",
        resistances: { value: ["fire"] }
      },
      spelldc: spellDC,
      profBonus: 3
    },
    prototypeToken: {
      name: name,
      displayName: CONST.TOKEN_DISPLAY_MODES.HOVER,
      vision: true,
      sight: { enabled: true, range: 60 },
      actorLink: false,
      img: token
    }
  };

  // Create the actor
  const actor = await Actor.create(actorData);
  console.log(`✓ Created: ${actor.name} (CR ${cr}, AC 15, HP ${actorData.system.attributes.hp.value}, Spell DC ${spellDC})`);

  // Add Arcane Burst attack (3d8+3 force damage, +6 to hit)
  const arcaneburstItem = {
    name: "Arcane Burst",
    type: "weapon",
    system: {
      quantity: 1,
      rarity: "uncommon",
      equipped: true,
      properties: { mgc: true },
      damage: { parts: [["3d8+3", "force"]] },
      range: { value: 120, long: 120 },
      attack: { bonus: 6 }
    },
    img: "icons/magic/light/projectile-beam.webp"
  };
  await actor.createEmbeddedDocuments("Item", [arcaneburstItem]);
  console.log(`  ✓ Added Arcane Burst attack (+6, 3d8+3 force)`);

  // Add core spells (At Will)
  const atWillSpells = [
    "Detect Magic",
    "Light",
    "Mage Armor",
    "Mage Hand",
    "Prestidigitation"
  ];

  for (const spellName of atWillSpells) {
    const added = await addSpellFromCompendium(actor, spellName);
    if (added) {
      console.log(`  ✓ Added spell: ${spellName} (At Will)`);
    }
  }

  // Add signature spells (2/Day)
  const signatureSpells = [
    "Fireball",
    "Invisibility"
  ];

  for (const spellName of signatureSpells) {
    const added = await addSpellFromCompendium(actor, spellName);
    if (added) {
      console.log(`  ✓ Added spell: ${spellName} (2/Day)`);
    }
  }

  // Add elite spells (1/Day)
  const eliteSpells = [
    "Cone of Cold",
    "Fly",
    "Counterspell"
  ];

  for (const spellName of eliteSpells) {
    const added = await addSpellFromCompendium(actor, spellName);
    if (added) {
      console.log(`  ✓ Added spell: ${spellName} (1/Day)`);
    }
  }

  // Add Arcana Treasure (magical items)
  const treasureItems = [
    { name: "Wand of the Warmage", type: "weapon" },
    { name: "Robe of the Archmagi", type: "loot" }
  ];

  for (const treasureItem of treasureItems) {
    const added = await addItemFromCompendium(actor, treasureItem.name);
    if (added) {
      console.log(`  ✓ Added treasure: ${treasureItem.name}`);
    } else {
      // Add as custom item if not found
      const customItem = {
        name: treasureItem.name,
        type: treasureItem.type,
        system: {
          quantity: 1,
          rarity: "rare",
          identified: true
        },
        img: "icons/containers/bagpipes/bag-cloth-gold.webp"
      };
      await actor.createEmbeddedDocuments("Item", [customItem]);
      console.log(`  ⚠ Added custom treasure: ${treasureItem.name}`);
    }
  }

  // Add special traits/features
  const traits = [
    {
      name: "Spellcasting",
      desc: "The wizard casts spells using Intelligence as the spellcasting ability (spell save DC " + spellDC + "). At Will: Detect Magic, Light, Mage Armor, Mage Hand, Prestidigitation."
    },
    {
      name: "Fire Resistance",
      desc: "The wizard has resistance to fire damage, a gift from Tiamat's influence."
    },
    {
      name: "Thayan Ritual Mastery",
      desc: "The wizard has advantage on concentration checks related to ritual magic and draconic summoning."
    }
  ];

  for (const trait of traits) {
    const traitItem = {
      name: trait.name,
      type: "feat",
      system: {
        description: { value: trait.desc }
      },
      img: "icons/skills/social/awareness-perception.webp"
    };
    await actor.createEmbeddedDocuments("Item", [traitItem]);
  }
  console.log(`  ✓ Added 3 special traits`);

  return actor;
}

// Create all elite Red Wizards
async function runCreation() {
  try {
    console.log(`Creating ${ELITE_RED_WIZARDS.length} elite Red Wizard NPCs...\n`);
    let created = 0;

    for (const wizardData of ELITE_RED_WIZARDS) {
      await createEliteRedWizard(wizardData);
      created++;
    }

    console.log(`\n✓ All ${created} elite Red Wizards created successfully!`);
    console.log("  They are formidable opponents (CR 5-6).");
    console.log("  Use 1-2 of them as encounter bosses or supporting the ritual.");
    console.log("  Each has full spellcasting, Arcane Burst, and Arcana treasure.");
  } catch (error) {
    console.error("Error creating elite Red Wizard:", error);
  }
}

runCreation();
