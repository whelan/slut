/**
 * STEP 2: IMPORT CREATURES FROM COMPENDIA (9 creatures)
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 *
 * Imports creatures with FULL stats, skills, abilities:
 * - Air Elemental, Fire Elemental
 * - Stone Golem, Clay Golem, Iron Golem
 * - Wight (customized for Naergoth Bladelord)
 * - Cult Fanatic, Cultist
 * - Barbed Devil
 */

const CREATURES_CONFIG = {
  "Air Elemental": {
    baseBlock: "Air Elemental",
    pack: "dnd5e.actors24",
    equipment: [],
    description: "Elemental creature of air and wind."
  },
  "Fire Elemental": {
    baseBlock: "Fire Elemental",
    pack: "dnd5e.actors24",
    equipment: [],
    description: "Elemental creature of fire and heat."
  },
  "Stone Golem": {
    baseBlock: "Stone Golem",
    pack: "dnd5e.actors24",
    equipment: [],
    description: "Magical construct of stone and magic."
  },
  "Clay Golem": {
    baseBlock: "Clay Golem",
    pack: "dnd5e.actors24",
    equipment: [],
    description: "Magical construct of clay and will."
  },
  "Iron Golem": {
    baseBlock: "Iron Golem",
    pack: "dnd5e.actors24",
    equipment: [],
    description: "Magical construct of iron and power."
  },
  "Wight": {
    baseBlock: "Wight",
    pack: "dnd5e.actors24",
    equipment: ["Longsword"],
    description: "Undead creature of terrible power.",
    customName: "Wight" // Will be renamed to Naergoth in STEP 3
  },
  "Cult Fanatic": {
    baseBlock: "Cult Fanatic",
    pack: "dnd5e.monsters",
    equipment: ["Scimitar", "Light Crossbow"],
    spells: ["Darkness", "Spiritual Weapon"],
    description: "Devoted servant of a dark cult."
  },
  "Cultist": {
    baseBlock: "Cultist",
    pack: "dnd5e.actors24",
    equipment: ["Scimitar", "Dagger"],
    description: "Member of a dark cult."
  },
  "Barbed Devil": {
    baseBlock: "Barbed Devil",
    pack: "dnd5e.actors24",
    equipment: [],
    description: "Infernal creature of torment and pain."
  }
};

async function findAndImportActor(baseName, config) {
  const pack = game.packs.get(config.pack);
  if (!pack) {
    console.error(`Pack not found: ${config.pack}`);
    return null;
  }

  const index = pack.index;
  const entry = index.find(e => e.name.toLowerCase() === baseName.toLowerCase());

  if (!entry) {
    console.error(`Base block not found: ${baseName}`);
    return null;
  }

  try {
    const baseActor = await pack.getDocument(entry._id);
    const actorData = baseActor.toObject();
    actorData.name = config.customName || baseName;

    const actor = await Actor.create(actorData);
    return actor;
  } catch (error) {
    console.error(`Error importing ${baseName}:`, error);
    return null;
  }
}

async function addWeapon(actor, weaponName) {
  const packs = ["dnd5e.items", "dnd5e.equipment24"];

  for (const packId of packs) {
    const itemPack = game.packs.get(packId);
    if (!itemPack) continue;

    const index = itemPack.index;
    const entry = index.find(e => e.name.toLowerCase() === weaponName.toLowerCase());

    if (entry) {
      try {
        const weapon = await itemPack.getDocument(entry._id);
        await actor.createEmbeddedDocuments("Item", [weapon.toObject()]);
        return true;
      } catch (error) {
        continue;
      }
    }
  }

  return false;
}

async function addSpell(actor, spellName) {
  const packs = ["dnd5e.spells24", "dnd5e.spells"];

  for (const packId of packs) {
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

async function importCreatures() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 2: IMPORT CREATURES (9 creatures)               ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await createFolder();
  let importedCount = 0;
  let failedCount = 0;

  for (const [displayName, config] of Object.entries(CREATURES_CONFIG)) {
    console.log(`📥 Importing: ${displayName}...`);

    const actor = await findAndImportActor(config.baseBlock, config);
    if (!actor) {
      console.log(`   ✗ Failed to import: ${config.baseBlock}`);
      failedCount++;
      continue;
    }

    // Move to folder
    await actor.update({ folder: folder.id });

    // Add equipment
    if (config.equipment && config.equipment.length > 0) {
      for (const equip of config.equipment) {
        const added = await addWeapon(actor, equip);
        if (added) {
          console.log(`   ✓ Added: ${equip}`);
        }
      }
    }

    // Add spells
    if (config.spells && config.spells.length > 0) {
      for (const spell of config.spells) {
        const added = await addSpell(actor, spell);
        if (added) {
          console.log(`   ✓ Added spell: ${spell}`);
        }
      }
    }

    // Update description
    if (config.description) {
      await actor.update({
        data: {
          details: {
            biography: {
              value: config.description
            }
          }
        }
      });
    }

    console.log(`   ✓ ${displayName} imported\n`);
    importedCount++;
  }

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 2 COMPLETE                                       ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Imported: ${importedCount}/${Object.keys(CREATURES_CONFIG).length}`);
  if (failedCount > 0) {
    console.log(`✗ Failed: ${failedCount}`);
  }

  console.log("\n📋 NEXT STEP:");
  console.log("1. Review imported creatures in temple-of-tiamat folder");
  console.log("2. Run STEP3-create-antagonists.js\n");
}

// Execute
importCreatures();
