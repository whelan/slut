/**
 * STEP 3 COMPLETE - CREATE CUSTOM ANTAGONISTS (6 NPCs)
 *
 * This version creates 6 custom antagonists from scratch with FULL data:
 * - Naergoth Bladelord (CR 11 Wight)
 * - Severin (CR 6 Sorcerer)
 * - Rath Modar (CR 3 Red Wizard)
 * - Magus Thezzar (CR 8 Red Wizard)
 * - White Abishai (CR 3)
 * - Black Abishai / Rezmir (CR 7)
 *
 * All with: AC, HP, abilities, skills, saves, spells, traits, actions, legendary actions
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

const ANTAGONISTS_DETAILED = {
  "Naergoth Bladelord": {
    type: "npc",
    cr: 11,
    ac: 18,
    hp: 170,
    abilities: { str: 20, dex: 11, con: 18, int: 10, wis: 12, cha: 14 },
    skills: { perception: 3, stealth: 2 },
    savingThrows: { str: 8, con: 7, wis: 4 },
    resistances: ["Cold", "Lightning", "Necrotic", "Piercing", "Slashing"],
    immunities: ["Poison"],
    conditionImmunities: ["Exhaustion", "Poisoned"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If Naergoth fails a saving throw, he can choose to succeed instead." },
      { name: "Sunlight Sensitivity", desc: "While in sunlight, Naergoth has disadvantage on attack rolls, ability checks, and saving throws." },
      { name: "Undead Fortitude", desc: "If damage reduces Naergoth to 0 hit points, he must make a Constitution saving throw against a DC equal to the damage taken, unless the damage is radiant or from a critical hit. On a success, he drops to 1 hit point instead." }
    ],
    actions: [
      { name: "Multiattack", desc: "Naergoth makes two greatsword attacks or uses Drain Life twice." },
      { name: "Greatsword", desc: "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 17 (2d12+5) slashing damage." },
      { name: "Drain Life", desc: "Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 12 (2d6+5) necrotic damage. The target must succeed on a DC 16 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. If a target is reduced to 0 hit points by this attack, it dies and becomes a ghoul under Naergoth's control." }
    ],
    legendaryActions: [
      { name: "Move", desc: "Naergoth moves up to his speed without provoking opportunity attacks." },
      { name: "Greatsword Attack", desc: "Naergoth makes a greatsword attack." },
      { name: "Drain (Costs 2 Actions)", desc: "Naergoth uses Drain Life." }
    ]
  },

  "Severin": {
    type: "npc",
    cr: 6,
    ac: 15,
    hp: 110,
    abilities: { str: 10, dex: 14, con: 14, int: 13, wis: 11, cha: 16 },
    skills: { arcana: 4, deception: 5, insight: 3, persuasion: 5 },
    savingThrows: { cha: 5, int: 4 },
    resistances: ["Fire"],
    immunities: [],
    conditionImmunities: [],
    spells: ["Fire Bolt", "Mage Hand", "Prestidigitation", "Burning Hands", "Chromatic Orb", "Disguise Self", "Magic Missile", "Fireball", "Fly"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If Severin fails a saving throw, he can choose to succeed instead." },
      { name: "Spellcasting", desc: "Severin is a 6th-level spellcaster. His spellcasting ability is Charisma (spell save DC 14, +5 to hit with spell attacks). He can cast fireball at will." },
      { name: "Red Wizard", desc: "Severin has advantage on saving throws against spells and magical effects." }
    ],
    actions: [
      { name: "Multiattack", desc: "Severin uses Spellcasting twice or makes two dagger attacks." },
      { name: "Dagger", desc: "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 3 (1d4+1) piercing damage." }
    ],
    legendaryActions: [
      { name: "Move", desc: "Severin moves up to his speed." },
      { name: "Cantrip", desc: "Severin casts a cantrip." },
      { name: "Cast Spell (Costs 2 Actions)", desc: "Severin casts a spell of 2nd level or lower." }
    ]
  },

  "Rath Modar": {
    type: "npc",
    cr: 3,
    ac: 12,
    hp: 40,
    abilities: { str: 9, dex: 10, con: 11, int: 16, wis: 12, cha: 13 },
    skills: { arcana: 5, deception: 3, insight: 3 },
    savingThrows: { int: 5, wis: 3 },
    resistances: [],
    immunities: [],
    conditionImmunities: [],
    spells: ["Acid Splash", "Fire Bolt", "Mage Hand", "Magic Missile", "Cone of Cold", "Misty Step", "Scorching Ray"],
    traits: [
      { name: "Spellcasting", desc: "Rath Modar is a 4th-level spellcaster. His spellcasting ability is Intelligence (spell save DC 13, +5 to hit with spell attacks)." },
      { name: "Red Wizard", desc: "Rath Modar is a Red Wizard of Thay, specializing in transmutation magic." }
    ],
    actions: [
      { name: "Dagger", desc: "Melee or Ranged Weapon Attack: +1 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 2 (1d4) piercing damage." }
    ]
  },

  "Magus Thezzar": {
    type: "npc",
    cr: 8,
    ac: 13,
    hp: 99,
    abilities: { str: 9, dex: 11, con: 13, int: 17, wis: 13, cha: 14 },
    skills: { arcana: 6, deception: 4, insight: 4, persuasion: 4 },
    savingThrows: { int: 6, wis: 4, cha: 4 },
    resistances: ["Fire"],
    immunities: [],
    conditionImmunities: [],
    spells: ["Acid Splash", "Fire Bolt", "Light", "Mage Hand", "Prestidigitation", "Burning Hands", "Chromatic Orb", "Cone of Cold", "Counterspell", "Dispel Magic", "Fireball", "Lightning Bolt"],
    traits: [
      { name: "Legendary Resistance (2/Day)", desc: "If Thezzar fails a saving throw, he can choose to succeed instead." },
      { name: "Spellcasting", desc: "Thezzar is an 8th-level spellcaster. His spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks)." },
      { name: "Red Wizard Lieutenant", desc: "Thezzar is a senior Red Wizard of Thay with mastery over elemental magic." }
    ],
    actions: [
      { name: "Multiattack", desc: "Thezzar uses Spellcasting twice or makes two dagger attacks." },
      { name: "Dagger", desc: "Melee or Ranged Weapon Attack: +2 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 2 (1d4) piercing damage." }
    ],
    legendaryActions: [
      { name: "Move", desc: "Thezzar moves up to his speed." },
      { name: "Cantrip", desc: "Thezzar casts a cantrip." },
      { name: "Cast Spell (Costs 2 Actions)", desc: "Thezzar casts a spell of 3rd level or lower." }
    ]
  },

  "White Abishai": {
    type: "npc",
    cr: 3,
    ac: 15,
    hp: 36,
    abilities: { str: 14, dex: 16, con: 13, int: 11, wis: 12, cha: 10 },
    skills: { acrobatics: 4, perception: 3 },
    savingThrows: { dex: 4 },
    resistances: ["Cold"],
    immunities: ["Poison"],
    conditionImmunities: ["Charmed", "Poisoned"],
    traits: [
      { name: "Magic Resistance", desc: "The abishai has advantage on saving throws against spells and magical effects." },
      { name: "Innate Spellcasting", desc: "The abishai's innate spellcasting ability is Intelligence (spell save DC 11). The abishai can innately cast the following spells, requiring no material components: at will - detect thoughts; 1/day each - armor of Agathys, cone of cold." },
      { name: "Ice Form", desc: "The abishai can move through nonmagical difficult terrain made of ice or snow as if it were normal terrain." }
    ],
    actions: [
      { name: "Multiattack", desc: "The abishai makes two scimitar attacks." },
      { name: "Scimitar", desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) slashing damage plus 3 (1d6) cold damage." }
    ]
  },

  "Black Abishai (Rezmir)": {
    type: "npc",
    cr: 7,
    ac: 16,
    hp: 120,
    abilities: { str: 17, dex: 16, con: 16, int: 13, wis: 14, cha: 13 },
    skills: { deception: 4, insight: 4, perception: 4, stealth: 5 },
    savingThrows: { str: 5, dex: 5, con: 5, wis: 4 },
    resistances: ["Fire", "Lightning", "Cold"],
    immunities: ["Poison"],
    conditionImmunities: ["Charmed", "Poisoned"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If Rezmir fails a saving throw, she can choose to succeed instead." },
      { name: "Magic Resistance", desc: "Rezmir has advantage on saving throws against spells and magical effects." },
      { name: "Innate Spellcasting", desc: "Rezmir's innate spellcasting ability is Charisma (spell save DC 12). She can innately cast the following spells, requiring no material components: at will - detect magic, invisibility; 1/day each - darkness, teleport." },
      { name: "Wyrmspeaker", desc: "Rezmir is a chosen of the Cult of the Dragon and can communicate with dragons magically." }
    ],
    actions: [
      { name: "Multiattack", desc: "Rezmir makes two melee attacks: two with her claws or one with her claws and one with her bite." },
      { name: "Claw", desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) slashing damage." },
      { name: "Bite", desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6+3) piercing damage." }
    ],
    legendaryActions: [
      { name: "Move", desc: "Rezmir moves up to her speed." },
      { name: "Claw Attack", desc: "Rezmir makes a claw attack." },
      { name: "Teleport (Costs 2 Actions)", desc: "Rezmir uses her Innate Spellcasting to cast teleport." }
    ]
  }
};

// Helper functions
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

async function addFeature(actor, feature) {
  const featureData = {
    name: feature.name,
    type: "feat",
    system: {
      description: { value: feature.desc },
      rarity: "",
      activation: { type: "action", cost: 0 }
    }
  };

  await actor.createEmbeddedDocuments("Item", [featureData]);
}

async function createCustomAntagonist(name, config, folder) {
  // Create base actor object
  const actorData = {
    name: name,
    type: "npc",
    folder: folder.id,
    system: {
      attributes: {
        ac: { flat: config.ac }
      },
      traits: {
        hp: { value: config.hp, max: config.hp }
      },
      details: {
        cr: config.cr
      }
    }
  };

  // Initialize abilities
  actorData.system.abilities = {
    str: { value: config.abilities.str },
    dex: { value: config.abilities.dex },
    con: { value: config.abilities.con },
    int: { value: config.abilities.int },
    wis: { value: config.abilities.wis },
    cha: { value: config.abilities.cha }
  };

  // Initialize skills
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

  // Set skills from config
  for (const [skillName, skillMod] of Object.entries(config.skills || {})) {
    const skillKey = Object.keys(actorData.system.skills).find(
      k => k.toLowerCase() === skillName.toLowerCase()
    );
    if (skillKey) {
      actorData.system.skills[skillKey].value = skillMod;
    }
  }

  // Initialize saving throws
  actorData.system.abilities.str.save = 0;
  actorData.system.abilities.dex.save = 0;
  actorData.system.abilities.con.save = 0;
  actorData.system.abilities.int.save = 0;
  actorData.system.abilities.wis.save = 0;
  actorData.system.abilities.cha.save = 0;

  // Set saving throws from config
  for (const [ability, save] of Object.entries(config.savingThrows || {})) {
    if (actorData.system.abilities[ability]) {
      actorData.system.abilities[ability].save = save;
    }
  }

  // Set resistances and immunities
  if (config.resistances && config.resistances.length > 0) {
    actorData.system.traits.dr = config.resistances.map(r => ({
      type: r.toLowerCase(),
      label: r
    }));
  }

  if (config.immunities && config.immunities.length > 0) {
    actorData.system.traits.di = config.immunities.map(i => ({
      type: i.toLowerCase(),
      label: i
    }));
  }

  if (config.conditionImmunities && config.conditionImmunities.length > 0) {
    actorData.system.traits.ci = {
      value: config.conditionImmunities.map(c => c.toLowerCase())
    };
  }

  // Create the actor
  const actor = await Actor.create(actorData);

  // Add spells
  if (config.spells) {
    for (const spell of config.spells) {
      const added = await addSpellFromCompendium(actor, spell);
      if (added) console.log(`   ✓ ${spell}`);
    }
  }

  // Add traits
  if (config.traits) {
    for (const trait of config.traits) {
      await addFeature(actor, trait);
    }
  }

  // Add actions
  if (config.actions) {
    for (const action of config.actions) {
      await addFeature(actor, action);
    }
  }

  // Add legendary actions
  if (config.legendaryActions) {
    for (const action of config.legendaryActions) {
      await addFeature(actor, action);
    }
  }

  return actor;
}

async function createAllAntagonists() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 3: ANTAGONISTS - COMPLETE CREATION               ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await createFolder();
  let successCount = 0;

  for (const [npcName, config] of Object.entries(ANTAGONISTS_DETAILED)) {
    console.log(`⚔️  ${npcName}...`);

    try {
      await createCustomAntagonist(npcName, config, folder);
      console.log(`   ✓ Complete\n`);
      successCount++;
    } catch (error) {
      console.log(`   ✗ Error: ${error.message}\n`);
    }
  }

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 3 COMPLETE                                       ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Created & Customized: ${successCount}/6\n`);
  console.log("🎉 ALL STEPS COMPLETE!\n");
  console.log("📊 Total imported: 11 + 9 + 6 = 26 NPCs\n");
  console.log("📋 Next: Run VERIFY-ALL-NPCS.js to check completeness\n");
}

// Execute
createAllAntagonists();
