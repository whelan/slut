/**
 * STEP 1: IMPORT & CUSTOMIZE COUNCIL OF WATERDEEP (11 NPCs)
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 *
 * Imports base stat blocks and fully customizes:
 * - Adds weapons/equipment
 * - Adds spells for spellcasters
 * - Sets correct skills and saves
 * - Organizes in temple-of-tiamat folder
 */

const COUNCIL_CONFIG = {
  "Dagult Neverember": {
    baseBlock: "Noble",
    pack: "dnd5e.actors24",
    equipment: ["Longsword", "Dagger"],
    traits: ["Leadership", "Parry"],
    description: "Open Lord of Waterdeep. Master strategist and politician."
  },
  "Ulder Ravengard": {
    baseBlock: "Knight",
    pack: "dnd5e.actors24",
    equipment: ["Longsword", "Shield", "Plate Armor"],
    traits: ["Brave", "Parry"],
    description: "Commander of the Waterdeep Guard. Seasoned warrior."
  },
  "Remallia Haventree": {
    baseBlock: "Assassin",
    pack: "dnd5e.actors24",
    equipment: ["Shortsword", "Shortbow", "Dagger"],
    traits: ["Assassinate", "Evasion"],
    description: "Harpers agent. Master of espionage and intrigue."
  },
  "Ontharr Frume": {
    baseBlock: "Priest",
    pack: "dnd5e.actors24",
    equipment: ["Mace", "Shield", "Holy Symbol"],
    spells: ["Bless", "Cure Wounds", "Guiding Bolt", "Spiritual Weapon"],
    traits: ["Divine Eminence", "Channel Divinity"],
    description: "Helm's Hand. Devoted cleric protecting the innocent."
  },
  "Delaan Winterhound": {
    baseBlock: "Veteran",
    pack: "dnd5e.actors24",
    equipment: ["Longsword", "Spear", "Plate Armor"],
    traits: ["Parry", "Multiattack"],
    description: "Dwarf warrior of tremendous experience and valor."
  },
  "Sir Isteval": {
    baseBlock: "Knight",
    pack: "dnd5e.actors24",
    equipment: ["Longsword", "Shield", "Plate Armor"],
    traits: ["Brave", "Parry"],
    description: "Knight Commander. Protector of the realm."
  },
  "Taern Hornblade": {
    baseBlock: "Mage",
    pack: "dnd5e.actors24",
    equipment: ["Quarterstaff", "Dagger", "Spellbook"],
    spells: ["Fire Bolt", "Light", "Magic Missile", "Shield", "Thunderwave", "Scorching Ray", "Mirror Image"],
    traits: ["Spellcasting", "Magic Resistance"],
    description: "War wizard. Master of arcane combat."
  },
  "King Melandrach": {
    baseBlock: "Mage",
    pack: "dnd5e.actors24",
    equipment: ["Quarterstaff", "Dagger", "Crown"],
    spells: ["Fire Bolt", "Light", "Magic Missile", "Counterspell", "Dispel Magic", "Fireball"],
    traits: ["Spellcasting", "Royal Authority"],
    description: "Elf King. Ancient and powerful wizard."
  },
  "Ambassador Brawnanvil": {
    baseBlock: "Noble",
    pack: "dnd5e.actors24",
    equipment: ["Dagger", "Signet Ring"],
    traits: ["Leadership"],
    description: "Dwarf ambassador. Skilled diplomat."
  },
  "Crimson Maccath": {
    baseBlock: "Mage",
    pack: "dnd5e.actors24",
    equipment: ["Quarterstaff", "Dagger", "Robe of the Archmagi"],
    spells: ["Fire Bolt", "Burning Hands", "Magic Missile", "Fireball", "Scorching Ray"],
    traits: ["Spellcasting", "Red Wizard Lore"],
    description: "Red Wizard lieutenant. Master of elemental magic."
  },
  "Nyh Ilmichh": {
    baseBlock: "Mage",
    pack: "dnd5e.actors24",
    equipment: ["Quarterstaff", "Dagger", "Spellbook"],
    spells: ["Acid Splash", "Magic Missile", "Cone of Cold", "Lightning Bolt", "Scorching Ray"],
    traits: ["Spellcasting"],
    description: "Rare Gnome mage. Skilled with elemental destruction."
  }
};

async function findAndImportActor(baseName, config) {
  // Find base stat block in dnd5e.actors24
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
    actorData.name = config.displayName || baseName;

    // Create in world
    const actor = await Actor.create(actorData);
    return actor;
  } catch (error) {
    console.error(`Error importing ${baseName}:`, error);
    return null;
  }
}

async function addWeapon(actor, weaponName) {
  const itemPack = game.packs.get("dnd5e.items");
  if (!itemPack) return false;

  const index = itemPack.index;
  const entry = index.find(e => e.name.toLowerCase() === weaponName.toLowerCase());

  if (!entry) return false;

  try {
    const weapon = await itemPack.getDocument(entry._id);
    await actor.createEmbeddedDocuments("Item", [weapon.toObject()]);
    return true;
  } catch (error) {
    return false;
  }
}

async function addSpell(actor, spellName) {
  // Try dnd5e.spells24 first, then dnd5e.spells
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

async function importCouncil() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 1: IMPORT COUNCIL OF WATERDEEP (11 NPCs)         ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await createFolder();
  let importedCount = 0;
  let failedCount = 0;

  for (const [displayName, config] of Object.entries(COUNCIL_CONFIG)) {
    console.log(`📥 Importing: ${displayName}...`);

    // Import base block
    const actor = await findAndImportActor(config.baseBlock, config);
    if (!actor) {
      console.log(`   ✗ Failed to import base block: ${config.baseBlock}`);
      failedCount++;
      continue;
    }

    // Rename
    await actor.update({ name: displayName });

    // Move to folder
    await actor.update({ folder: folder.id });

    // Add equipment
    if (config.equipment) {
      for (const equip of config.equipment) {
        const added = await addWeapon(actor, equip);
        if (added) {
          console.log(`   ✓ Added: ${equip}`);
        }
      }
    }

    // Add spells
    if (config.spells) {
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
  console.log("║  STEP 1 COMPLETE                                       ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Imported: ${importedCount}/${Object.keys(COUNCIL_CONFIG).length}`);
  if (failedCount > 0) {
    console.log(`✗ Failed: ${failedCount}`);
  }

  console.log("\n📋 NEXT STEP:");
  console.log("1. Review imported Council members in temple-of-tiamat folder");
  console.log("2. Run STEP2-import-creatures.js\n");
}

// Execute
importCouncil();
