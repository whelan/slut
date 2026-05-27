/**
 * STEP 1 COMPLETE - IMPORT & FULLY CUSTOMIZE COUNCIL (11 NPCs)
 *
 * This version:
 * 1. Imports base stat blocks from dnd5e.actors24
 * 2. FULLY customizes each with complete data:
 *    - Skills & proficiencies
 *    - Saving throws
 *    - Weapons & equipment
 *    - Spells (for spellcasters)
 *    - Traits, actions, features
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

const COUNCIL_DETAILED = {
  "Dagult Neverember": {
    baseBlock: "Noble",
    pack: "dnd5e.actors24",
    cr: 3,
    customization: {
      ac: 15,
      hp: 27,
      abilities: { str: 10, dex: 11, con: 12, int: 13, wis: 14, cha: 16 },
      skills: { deception: 5, insight: 4, persuasion: 5 },
      savingThrows: {},
      weapons: ["Rapier"],
      equipment: ["Silk Clothes", "Signet Ring"],
      resistances: [],
      immunities: [],
      traits: [
        { name: "Diplomacy", desc: "The noble can charm other humanoids using normal social interaction." },
        { name: "Leadership", desc: "As an action, the noble can remove a disease, cure poison, or heal nonmagical wounds by touch." }
      ],
      actions: [
        { name: "Rapier", desc: "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8+1) piercing damage." }
      ]
    }
  },

  "Ulder Ravengard": {
    baseBlock: "Knight",
    pack: "dnd5e.actors24",
    cr: 3,
    customization: {
      ac: 18,
      hp: 126,
      abilities: { str: 16, dex: 11, con: 12, int: 12, wis: 11, cha: 13 },
      skills: { athletics: 5, intimidation: 3 },
      savingThrows: { str: 5 },
      weapons: ["Longsword", "Shield", "Lance"],
      equipment: ["Plate Armor"],
      resistances: [],
      immunities: [],
      traits: [
        { name: "Brave", desc: "The knight has advantage on saving throws against being frightened." },
        { name: "Cavalry", desc: "The knight has advantage on melee attack rolls against any creature that doesn't have all its hit points." }
      ],
      actions: [
        { name: "Multiattack", desc: "The knight makes two longsword attacks or uses Parry twice." },
        { name: "Longsword", desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (1d8+6) slashing damage." },
        { name: "Parry", desc: "The knight adds 2 to its AC against one melee attack within reach. To do so, the knight must see the attacker and be wielding a melee weapon." }
      ]
    }
  },

  "Remallia Haventree": {
    baseBlock: "Assassin",
    pack: "dnd5e.actors24",
    cr: 8,
    customization: {
      ac: 16,
      hp: 78,
      abilities: { str: 10, dex: 16, con: 14, int: 14, wis: 12, cha: 13 },
      skills: { acrobatics: 5, deception: 3, insight: 3, investigation: 4, perception: 3, stealth: 8 },
      savingThrows: { dex: 5, int: 4 },
      weapons: ["Shortsword", "Shortbow", "Dagger"],
      equipment: ["Leather Armor", "Thieves Tools"],
      resistances: [],
      immunities: [],
      traits: [
        { name: "Assassinate", desc: "During its first turn, the assassin has advantage on attack rolls against any creature that hasn't taken a turn. Any hit the assassin scores against a surprised creature is a critical hit." },
        { name: "Evasion", desc: "If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the saving throw." },
        { name: "Feat of Speed", desc: "On its turn, the assassin can use a bonus action to take the Dash, Disengage, or Hide action." }
      ],
      actions: [
        { name: "Multiattack", desc: "The assassin makes two shortsword attacks." },
        { name: "Shortsword", desc: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d6+6) piercing damage, and the target must make a DC 14 Constitution save or take 22 (4d8) poison damage." }
      ]
    }
  },

  "Ontharr Frume": {
    baseBlock: "Priest",
    pack: "dnd5e.actors24",
    cr: 2,
    customization: {
      ac: 13,
      hp: 150,
      abilities: { str: 18, dex: 10, con: 12, int: 13, wis: 16, cha: 13 },
      skills: { insight: 5, medicine: 7, persuasion: 3, religion: 4 },
      savingThrows: { wis: 5 },
      weapons: ["Mace", "Shield"],
      equipment: ["Scale Armor", "Holy Symbol"],
      resistances: [],
      immunities: [],
      spells: ["Guidance", "Light", "Bless", "Cure Wounds", "Guiding Bolt", "Spirit Guardians"],
      traits: [
        { name: "Divine Eminence", desc: "As a bonus action on its turn, the priest can expend a spell slot to cause its melee weapon attacks to magically deal an extra 10 (3d6) radiant damage to a target on a hit within 30 feet of it." },
        { name: "Spellcasting", desc: "The priest is a 5th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 13, +5 to hit with spell attacks)." }
      ],
      actions: [
        { name: "Mace", desc: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage." }
      ]
    }
  },

  "Delaan Winterhound": {
    baseBlock: "Veteran",
    pack: "dnd5e.actors24",
    cr: 3,
    customization: {
      ac: 17,
      hp: 45,
      abilities: { str: 16, dex: 13, con: 14, int: 11, wis: 11, cha: 10 },
      skills: { athletics: 5, perception: 2 },
      savingThrows: { str: 5 },
      weapons: ["Longsword", "Shield", "Spear"],
      equipment: ["Plate Armor"],
      resistances: [],
      immunities: [],
      traits: [
        { name: "Multiattack", desc: "The veteran makes two weapon attacks." }
      ],
      actions: [
        { name: "Longsword", desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) slashing damage, or 9 (1d10+4) slashing damage if used with both hands." },
        { name: "Spear", desc: "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 7 (1d6+4) piercing damage." }
      ]
    }
  },

  "Sir Isteval": {
    baseBlock: "Knight",
    pack: "dnd5e.actors24",
    cr: 3,
    customization: {
      ac: 18,
      hp: 52,
      abilities: { str: 16, dex: 11, con: 12, int: 12, wis: 12, cha: 14 },
      skills: { athletics: 5, insight: 3, intimidation: 4 },
      savingThrows: { str: 5, con: 3 },
      weapons: ["Longsword", "Shield"],
      equipment: ["Plate Armor"],
      resistances: [],
      immunities: [],
      traits: [
        { name: "Brave", desc: "The knight has advantage on saving throws against being frightened." }
      ],
      actions: [
        { name: "Multiattack", desc: "The knight makes two longsword attacks." },
        { name: "Longsword", desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (1d8+6) slashing damage." },
        { name: "Parry", desc: "The knight adds 2 to its AC against one melee attack within reach." }
      ]
    }
  },

  "Taern Hornblade": {
    baseBlock: "Mage",
    pack: "dnd5e.actors24",
    cr: 6,
    customization: {
      ac: 14,
      hp: 40,
      abilities: { str: 9, dex: 12, con: 11, int: 17, wis: 12, cha: 11 },
      skills: { arcana: 6, perception: 3, investigation: 5 },
      savingThrows: { int: 5, wis: 3 },
      weapons: ["Quarterstaff", "Dagger"],
      equipment: ["Spellbook", "Scholar's Pack"],
      resistances: [],
      immunities: [],
      spells: ["Fire Bolt", "Light", "Magic Missile", "Shield", "Thunderwave", "Scorching Ray", "Mirror Image"],
      traits: [
        { name: "Spellcasting", desc: "Taern is a 6th-level spellcaster. His spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks)." },
        { name: "Magic Resistance", desc: "Taern has advantage on saving throws against spells and magical effects." }
      ],
      actions: [
        { name: "Dagger", desc: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage." }
      ]
    }
  },

  "King Melandrach": {
    baseBlock: "Mage",
    pack: "dnd5e.actors24",
    cr: 8,
    customization: {
      ac: 15,
      hp: 44,
      abilities: { str: 9, dex: 12, con: 12, int: 18, wis: 14, cha: 13 },
      skills: { arcana: 7, insight: 4, investigation: 6, perception: 4 },
      savingThrows: { int: 6, wis: 4 },
      weapons: ["Quarterstaff", "Dagger"],
      equipment: ["Spellbook", "Crown"],
      resistances: [],
      immunities: [],
      spells: ["Fire Bolt", "Light", "Magic Missile", "Counterspell", "Dispel Magic", "Fireball"],
      traits: [
        { name: "Spellcasting", desc: "Melandrach is an 8th-level spellcaster. His spellcasting ability is Intelligence (spell save DC 15, +7 to hit with spell attacks)." },
        { name: "Legendary Resistance (1/Day)", desc: "If Melandrach fails a saving throw, he can choose to succeed instead." }
      ],
      actions: [
        { name: "Dagger", desc: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage." }
      ],
      legendaryActions: [
        { name: "Move", desc: "Melandrach moves up to his speed." },
        { name: "Cast Cantrip", desc: "Melandrach casts a cantrip." }
      ]
    }
  },

  "Ambassador Brawnanvil": {
    baseBlock: "Noble",
    pack: "dnd5e.actors24",
    cr: 1,
    customization: {
      ac: 15,
      hp: 22,
      abilities: { str: 11, dex: 11, con: 12, int: 14, wis: 13, cha: 15 },
      skills: { deception: 4, insight: 3, persuasion: 4 },
      savingThrows: {},
      weapons: ["Dagger"],
      equipment: ["Fine Clothes", "Signet Ring"],
      resistances: [],
      immunities: [],
      traits: [
        { name: "Diplomat", desc: "The ambassador has advantage on Charisma (Persuasion) checks." }
      ],
      actions: [
        { name: "Dagger", desc: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage." }
      ]
    }
  },

  "Crimson Maccath": {
    baseBlock: "Mage",
    pack: "dnd5e.actors24",
    cr: 6,
    customization: {
      ac: 12,
      hp: 40,
      abilities: { str: 9, dex: 12, con: 11, int: 17, wis: 11, cha: 12 },
      skills: { arcana: 6, deception: 3 },
      savingThrows: { int: 5 },
      weapons: ["Quarterstaff", "Dagger"],
      equipment: ["Spellbook", "Robe of the Archmagi"],
      resistances: [],
      immunities: [],
      spells: ["Fire Bolt", "Burning Hands", "Magic Missile", "Fireball", "Scorching Ray"],
      traits: [
        { name: "Spellcasting", desc: "Crimson is a 6th-level spellcaster. Her spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks)." },
        { name: "Red Wizard", desc: "Crimson is affiliated with the Red Wizards of Thay and uses elemental magic." }
      ],
      actions: [
        { name: "Dagger", desc: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage." }
      ]
    }
  },

  "Nyh Ilmichh": {
    baseBlock: "Mage",
    pack: "dnd5e.actors24",
    cr: 5,
    customization: {
      ac: 12,
      hp: 33,
      abilities: { str: 8, dex: 12, con: 10, int: 16, wis: 11, cha: 11 },
      skills: { arcana: 5, insight: 2 },
      savingThrows: { int: 5 },
      weapons: ["Quarterstaff", "Dagger"],
      equipment: ["Spellbook"],
      resistances: [],
      immunities: [],
      spells: ["Acid Splash", "Magic Missile", "Cone of Cold", "Lightning Bolt", "Scorching Ray"],
      traits: [
        { name: "Spellcasting", desc: "Nyh is a 5th-level spellcaster. Her spellcasting ability is Intelligence (spell save DC 13, +5 to hit with spell attacks)." }
      ],
      actions: [
        { name: "Dagger", desc: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage." }
      ]
    }
  }
};

// Helper functions
async function findBaseBlock(baseName, packId) {
  const pack = game.packs.get(packId);
  if (!pack) return null;

  const index = pack.index;
  const entry = index.find(e => e.name.toLowerCase() === baseName.toLowerCase());

  if (!entry) return null;

  try {
    return await pack.getDocument(entry._id);
  } catch (error) {
    return null;
  }
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

async function addItemFromCompendium(actor, itemName) {
  // Prioritize official dnd5e packs first
  const priorityPacks = ["dnd5e.items", "dnd5e.equipment24", "dnd5e.weapons24"];

  // Search priority packs first
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

  // Search all other packs if not found in priority packs
  for (const pack of game.packs.values()) {
    if (pack.metadata.type !== "Item") continue;
    if (priorityPacks.includes(pack.collection)) continue;

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

async function addSpellFromCompendium(actor, spellName) {
  // Prioritize official dnd5e spell packs first
  const priorityPacks = ["dnd5e.spells24", "dnd5e.spells"];

  // Search priority packs first
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

  // Search all other packs if not found in priority packs
  for (const pack of game.packs.values()) {
    if (pack.metadata.type !== "Item") continue;
    if (priorityPacks.includes(pack.collection)) continue;

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

async function findIconFromCompendium(itemName) {
  // Search for icon in compendium items that match feature name
  const priorityPacks = ["dnd5e.items", "dnd5e.features24", "dnd5e.spells24"];

  for (const packId of priorityPacks) {
    const pack = game.packs.get(packId);
    if (!pack) continue;

    const index = pack.index;
    const entry = index.find(e => e.name.toLowerCase().includes(itemName.toLowerCase().split(' ')[0]));

    if (entry) {
      try {
        const item = await pack.getDocument(entry._id);
        if (item.img) return item.img;
      } catch (error) {
        continue;
      }
    }
  }

  // Fallback icons based on feature type
  const featureLower = itemName.toLowerCase();
  if (featureLower.includes("spell") || featureLower.includes("magic")) return "icons/magic/light/projectile-beam-yellow.webp";
  if (featureLower.includes("attack") || featureLower.includes("weapon")) return "icons/skills/melee/hand-daggers-yellow.webp";
  if (featureLower.includes("resistance") || featureLower.includes("legendary")) return "icons/magic/light/shield-blue.webp";
  if (featureLower.includes("action") || featureLower.includes("ability")) return "icons/skills/melee/strike-slashing-orange.webp";

  return "icons/skills/social/awareness-perception.webp"; // Default fallback
}

async function addFeature(actor, feature) {
  const icon = await findIconFromCompendium(feature.name);

  const featureData = {
    name: feature.name,
    type: "feat",
    img: icon,
    system: {
      description: { value: feature.desc },
      rarity: "",
      activation: { type: "action", cost: 0 }
    }
  };

  await actor.createEmbeddedDocuments("Item", [featureData]);
}

async function importAndCustomizeCouncil() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 1: COUNCIL OF WATERDEEP - COMPLETE IMPORT        ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await createFolder();
  let successCount = 0;

  for (const [npcName, config] of Object.entries(COUNCIL_DETAILED)) {
    console.log(`👥 ${npcName}...`);

    // Import base block
    const baseBlock = await findBaseBlock(config.baseBlock, config.pack);
    if (!baseBlock) {
      console.log(`   ✗ Base block not found: ${config.baseBlock}\n`);
      continue;
    }

    const actorData = baseBlock.toObject();
    actorData.name = npcName;
    actorData.folder = folder.id;

    // Apply customization
    const custom = config.customization;
    actorData.system.attributes.ac = { flat: custom.ac };
    actorData.system.traits.hp = { value: custom.hp, max: custom.hp };

    // Set abilities
    for (const [key, value] of Object.entries(custom.abilities)) {
      actorData.system.abilities[key].value = value;
    }

    // Initialize saving throws if not present
    for (const ability of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
      if (actorData.system.abilities[ability]) {
        actorData.system.abilities[ability].save = actorData.system.abilities[ability].save || 0;
      }
    }

    // Set saving throws from config
    for (const [ability, save] of Object.entries(custom.savingThrows || {})) {
      if (actorData.system.abilities[ability]) {
        actorData.system.abilities[ability].save = save;
      }
    }

    // Initialize skills object if not present
    if (!actorData.system.skills) {
      actorData.system.skills = {
        acrobatics: { value: 0 },
        animalHandling: { value: 0 },
        arcana: { value: 0 },
        athletics: { value: 0 },
        deception: { value: 0 },
        history: { value: 0 },
        insight: { value: 0 },
        intimidation: { value: 0 },
        investigation: { value: 0 },
        medicine: { value: 0 },
        nature: { value: 0 },
        perception: { value: 0 },
        performance: { value: 0 },
        persuasion: { value: 0 },
        religion: { value: 0 },
        sleightOfHand: { value: 0 },
        stealth: { value: 0 },
        survival: { value: 0 }
      };
    }

    // Set skills from config
    for (const [skillName, skillMod] of Object.entries(custom.skills || {})) {
      const skillKey = Object.keys(actorData.system.skills).find(
        k => k.toLowerCase() === skillName.toLowerCase()
      );
      if (skillKey) {
        actorData.system.skills[skillKey].value = skillMod;
      }
    }

    // Create actor
    const actor = await Actor.create(actorData);

    // Add weapons
    for (const weapon of custom.weapons) {
      const added = await addItemFromCompendium(actor, weapon);
      if (added) console.log(`   ✓ ${weapon}`);
    }

    // Add equipment
    for (const equip of custom.equipment) {
      await addItemFromCompendium(actor, equip);
    }

    // Add spells
    if (custom.spells) {
      for (const spell of custom.spells) {
        const added = await addSpellFromCompendium(actor, spell);
        if (added) console.log(`   ✓ ${spell}`);
      }
    }

    // Add traits
    for (const trait of custom.traits) {
      await addFeature(actor, trait);
    }

    // Add actions
    for (const action of custom.actions) {
      await addFeature(actor, action);
    }

    // Add legendary actions
    if (custom.legendaryActions) {
      for (const action of custom.legendaryActions) {
        await addFeature(actor, action);
      }
    }

    console.log(`   ✓ Complete\n`);
    successCount++;
  }

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 1 COMPLETE                                       ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Imported & Customized: ${successCount}/11\n`);
  console.log("📋 NEXT: Run STEP2-import-creatures-COMPLETE.js\n");
}

// Execute
importAndCustomizeCouncil();
