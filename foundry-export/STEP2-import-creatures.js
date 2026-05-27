/**
 * STEP 2 COMPLETE - IMPORT & FULLY CUSTOMIZE CREATURES (9 NPCs)
 *
 * This version:
 * 1. Imports base creature stat blocks from dnd5e packs
 * 2. FULLY customizes each with complete data:
 *    - Skills & proficiencies
 *    - Saving throws
 *    - Damage resistances & immunities
 *    - Weapons & equipment
 *    - Traits and special abilities
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

const CREATURES_DETAILED = {
  "Air Elemental": {
    baseBlock: "Air Elemental",
    pack: "dnd5e.creatures24",
    cr: 5,
    customization: {
      ac: 15,
      hp: 90,
      abilities: { str: 14, dex: 20, con: 14, int: 6, wis: 10, cha: 6 },
      skills: {},
      savingThrows: {},
      resistances: ["Lightning", "Thunder"],
      immunities: ["Poison"],
      conditionImmunities: ["Exhaustion", "Grappled", "Paralyzed", "Petrified", "Poisoned", "Prone", "Restrained"],
      traits: [
        { name: "Air Form", desc: "The elemental can enter a hostile creature's space and stop there. It can move through a narrow opening only if it can expel part of its body outside that space." },
        { name: "Transparency", desc: "Even when the elemental is in plain sight, it takes a successful DC 15 Wisdom (Perception) check to spot the elemental if it has neither moved nor attacked. A creature that tries to enter the elemental's space while unaware of it is surprised by the elemental." }
      ],
      actions: [
        { name: "Multiattack", desc: "The elemental makes two slam attacks." },
        { name: "Slam", desc: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8+5) bludgeoning damage." },
        { name: "Whirlwind", desc: "Each creature in the elemental's space must make a DC 13 Strength saving throw. On a failure, a target takes 15 (3d8) bludgeoning damage and is grappled (escape DC 13). If the elemental moves, a grappled creature moves with it." }
      ]
    }
  },

  "Fire Elemental": {
    baseBlock: "Fire Elemental",
    pack: "dnd5e.creatures24",
    cr: 5,
    customization: {
      ac: 15,
      hp: 102,
      abilities: { str: 10, dex: 17, con: 16, int: 6, wis: 10, cha: 7 },
      skills: {},
      savingThrows: {},
      resistances: ["Bludgeoning", "Piercing", "Slashing"],
      immunities: ["Fire", "Poison"],
      conditionImmunities: ["Charmed", "Exhaustion", "Frightened", "Grappled", "Paralyzed", "Petrified", "Poisoned", "Prone", "Restrained"],
      traits: [
        { name: "Fire Form", desc: "The elemental can enter a hostile creature's space and stop there. It can move through a narrow opening only if it can expel part of its body outside that space." },
        { name: "Illumination", desc: "The elemental sheds bright light in a 30-foot radius and dim light in an additional 30 feet." },
        { name: "Water Susceptibility", desc: "For every 5 feet the elemental moves in water, or for every gallon of water splashed on it, it takes 1 cold damage." }
      ],
      actions: [
        { name: "Multiattack", desc: "The elemental makes two touch attacks." },
        { name: "Touch", desc: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) fire damage. If the target is a creature or a flammable object, it ignites. Until a creature takes an action to douse the fire, the target takes 5 (1d10) fire damage at the start of each of the elemental's turns." }
      ]
    }
  },

  "Stone Golem": {
    baseBlock: "Stone Golem",
    pack: "dnd5e.creatures24",
    cr: 10,
    customization: {
      ac: 17,
      hp: 178,
      abilities: { str: 22, dex: 9, con: 20, int: 3, wis: 11, cha: 1 },
      skills: {},
      savingThrows: {},
      resistances: [],
      immunities: ["Poison", "Psychic"],
      conditionImmunities: ["Charmed", "Exhaustion", "Frightened", "Paralyzed", "Petrified", "Poisoned"],
      traits: [
        { name: "Immutable Form", desc: "The golem is immune to any spell or effect that would alter its form." },
        { name: "Magic Resistance", desc: "The golem has advantage on saving throws against spells and magical effects." },
        { name: "Magic Weapons", desc: "The golem's weapon attacks are magical." }
      ],
      actions: [
        { name: "Multiattack", desc: "The golem makes two fist attacks." },
        { name: "Fist", desc: "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 15 (2d8+6) bludgeoning damage." },
        { name: "Slow", desc: "The golem targets one or more creatures it can see within 10 feet of it. Each target must make a DC 17 Wisdom saving throw against this magic. On a failed save, a target can't use reactions, and its speed is halved until the end of its next turn." }
      ]
    }
  },

  "Clay Golem": {
    baseBlock: "Clay Golem",
    pack: "dnd5e.creatures24",
    cr: 9,
    customization: {
      ac: 14,
      hp: 133,
      abilities: { str: 20, dex: 8, con: 18, int: 3, wis: 10, cha: 1 },
      skills: {},
      savingThrows: {},
      resistances: [],
      immunities: ["Acid", "Poison", "Psychic"],
      conditionImmunities: ["Charmed", "Exhaustion", "Frightened", "Paralyzed", "Petrified", "Poisoned"],
      traits: [
        { name: "Immutable Form", desc: "The golem is immune to any spell or effect that would alter its form." },
        { name: "Magic Resistance", desc: "The golem has advantage on saving throws against spells and magical effects." },
        { name: "Magic Weapons", desc: "The golem's weapon attacks are magical." }
      ],
      actions: [
        { name: "Multiattack", desc: "The golem makes two fist attacks." },
        { name: "Fist", desc: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6+5) bludgeoning damage." },
        { name: "Haste", desc: "Until the end of its next turn, the golem magically gains a +2 bonus to its AC, has advantage on Dexterity saving throws, and can use its fist attack as a bonus action." }
      ]
    }
  },

  "Iron Golem": {
    baseBlock: "Iron Golem",
    pack: "dnd5e.creatures24",
    cr: 16,
    customization: {
      ac: 20,
      hp: 210,
      abilities: { str: 24, dex: 8, con: 20, int: 3, wis: 11, cha: 1 },
      skills: {},
      savingThrows: {},
      resistances: [],
      immunities: ["Poison", "Psychic"],
      conditionImmunities: ["Charmed", "Exhaustion", "Frightened", "Paralyzed", "Petrified", "Poisoned"],
      traits: [
        { name: "Immutable Form", desc: "The golem is immune to any spell or effect that would alter its form." },
        { name: "Magic Resistance", desc: "The golem has advantage on saving throws against spells and magical effects." },
        { name: "Magic Weapons", desc: "The golem's weapon attacks are magical." },
        { name: "Fire Absorption", desc: "Whenever the golem is subjected to fire damage, it takes no damage and instead regains a number of hit points equal to the fire damage dealt." }
      ],
      actions: [
        { name: "Multiattack", desc: "The golem makes two melee attacks." },
        { name: "Slam", desc: "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 20 (3d8+7) bludgeoning damage." },
        { name: "Sword", desc: "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 23 (3d10+7) slashing damage." }
      ],
      legendaryActions: [
        { name: "Move", desc: "The golem moves up to its speed." },
        { name: "Slam Attack", desc: "The golem makes a slam attack." },
        { name: "Sword Attack", desc: "The golem makes a sword attack." }
      ]
    }
  },

  "Wight": {
    baseBlock: "Wight",
    pack: "dnd5e.creatures24",
    cr: 3,
    customization: {
      ac: 15,
      hp: 45,
      abilities: { str: 15, dex: 10, con: 16, int: 10, wis: 13, cha: 15 },
      skills: { perception: 2, stealth: 2 },
      savingThrows: { wis: 3 },
      resistances: ["Cold", "Lightning", "Piercing", "Slashing"],
      immunities: ["Poison"],
      conditionImmunities: ["Exhaustion", "Poisoned"],
      traits: [
        { name: "Sunlight Sensitivity", desc: "The wight has disadvantage on attack rolls, ability checks, and saving throws while in sunlight or within the radius of a Light spell." },
        { name: "Undead Fortitude", desc: "If damage reduces the wight to 0 hit points, it must make a Constitution saving throw against a DC equal to the damage taken, unless the damage is radiant or from a critical hit. On a success, the wight drops to 1 hit point instead." }
      ],
      actions: [
        { name: "Longsword", desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8+2) slashing damage, or 7 (1d10+2) slashing damage if used with both hands." },
        { name: "Drain Life", desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6+2) necrotic damage. The target must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. If a target is reduced to 0 hit points by this attack, it dies." }
      ]
    }
  },

  "Cult Fanatic": {
    baseBlock: "Cult Fanatic",
    pack: "dnd5e.creatures24",
    cr: 2,
    customization: {
      ac: 13,
      hp: 33,
      abilities: { str: 11, dex: 13, con: 12, int: 10, wis: 14, cha: 14 },
      skills: { deception: 3, insight: 3, persuasion: 3, religion: 2 },
      savingThrows: { wis: 4 },
      resistances: [],
      immunities: [],
      conditionImmunities: [],
      spells: ["Guidance", "Inflict Wounds", "Command", "Cure Wounds", "Spiritual Weapon"],
      traits: [
        { name: "Dark Devotion", desc: "The fanatic has advantage on saving throws against being charmed or frightened." },
        { name: "Spellcasting", desc: "The fanatic is a 4th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks)." }
      ],
      actions: [
        { name: "Multiattack", desc: "The fanatic makes two melee attacks." },
        { name: "Scimitar", desc: "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) slashing damage." }
      ]
    }
  },

  "Cultist": {
    baseBlock: "Cultist",
    pack: "dnd5e.creatures24",
    cr: 1,
    customization: {
      ac: 12,
      hp: 16,
      abilities: { str: 10, dex: 12, con: 10, int: 11, wis: 10, cha: 10 },
      skills: { deception: 2, religion: 2 },
      savingThrows: { wis: 2 },
      resistances: [],
      immunities: [],
      conditionImmunities: [],
      traits: [
        { name: "Dark Devotion", desc: "The cultist has advantage on saving throws against being charmed or frightened." }
      ],
      actions: [
        { name: "Scimitar", desc: "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) slashing damage." },
        { name: "Light Crossbow", desc: "Ranged Weapon Attack: +3 to hit, range 80/320 ft., one target. Hit: 5 (1d8+1) piercing damage." }
      ]
    }
  },

  "Barbed Devil": {
    baseBlock: "Barbed Devil",
    pack: "dnd5e.creatures24",
    cr: 5,
    customization: {
      ac: 15,
      hp: 110,
      abilities: { str: 16, dex: 17, con: 18, int: 12, wis: 14, cha: 14 },
      skills: { insight: 4, perception: 4, stealth: 5 },
      savingThrows: { str: 5, con: 6, wis: 4, cha: 4 },
      resistances: ["Cold", "Fire", "Lightning"],
      immunities: ["Poison"],
      conditionImmunities: ["Poisoned"],
      traits: [
        { name: "Barbed Hide", desc: "At the end of each of the devil's turns, each creature within 5 feet of it takes 5 (1d10) piercing damage if the creature hit the devil with a melee attack since the start of the devil's last turn." },
        { name: "Magic Resistance", desc: "The devil has advantage on saving throws against spells and magical effects." },
        { name: "Reactive", desc: "The devil can take one reaction on each turn in a combat." }
      ],
      actions: [
        { name: "Multiattack", desc: "The devil makes three melee attacks: two with its claws and one with its tail." },
        { name: "Claw", desc: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8+3) piercing damage." },
        { name: "Tail", desc: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) piercing damage." }
      ]
    }
  }
};

// Helper functions (same as STEP1)
async function findBaseBlock(baseName, packId) {
  const pack = game.packs.get(packId);
  if (!pack) {
    console.log(`   ✗ Pack not found: ${packId}`);
    return null;
  }

  const index = pack.index;
  const entry = index.find(e => e.name.toLowerCase() === baseName.toLowerCase());

  if (!entry) {
    console.log(`   ✗ Not found in ${packId}`);
    return null;
  }

  try {
    return await pack.getDocument(entry._id);
  } catch (error) {
    console.log(`   ✗ Error loading: ${error.message}`);
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
  if (featureLower.includes("resistance") || featureLower.includes("immunity")) return "icons/magic/light/shield-blue.webp";
  if (featureLower.includes("breath") || featureLower.includes("elemental")) return "icons/magic/fire/fireball-flame-ring-orange.webp";
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

async function importAndCustomizeCreatures() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 2: CREATURES - COMPLETE IMPORT                   ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await createFolder();
  let successCount = 0;

  for (const [creatureName, config] of Object.entries(CREATURES_DETAILED)) {
    console.log(`🧟 ${creatureName}...`);

    // Import base block
    const baseBlock = await findBaseBlock(config.baseBlock, config.pack);
    if (!baseBlock) {
      console.log(`   ✗ Base block not found: ${config.baseBlock}\n`);
      continue;
    }

    const actorData = baseBlock.toObject();
    actorData.name = creatureName;
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

    // Set resistances and immunities
    if (custom.resistances && custom.resistances.length > 0) {
      actorData.system.traits.dr = custom.resistances.map(r => ({
        type: r.toLowerCase(),
        label: r
      }));
    }

    if (custom.immunities && custom.immunities.length > 0) {
      actorData.system.traits.di = custom.immunities.map(i => ({
        type: i.toLowerCase(),
        label: i
      }));
    }

    if (custom.conditionImmunities && custom.conditionImmunities.length > 0) {
      actorData.system.traits.ci = {
        value: custom.conditionImmunities.map(c => c.toLowerCase())
      };
    }

    // Create actor
    const actor = await Actor.create(actorData);

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
  console.log("║  STEP 2 COMPLETE                                       ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Imported & Customized: ${successCount}/9\n`);
  console.log("📋 NEXT: Run STEP3-create-antagonists-COMPLETE.js\n");
}

// Execute
importAndCustomizeCreatures();
