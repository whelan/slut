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
    cr: 11,
    ac: 16,
    hp: 150,
    abilities: { str: 12, dex: 14, con: 14, int: 14, wis: 11, cha: 20 },
    skills: { arcana: 4, deception: 7, insight: 3, persuasion: 7 },
    savingThrows: { int: 4, wis: 3, cha: 7 },
    resistances: ["Fire"],
    immunities: [],
    conditionImmunities: [],
    spells: ["Fire Bolt", "Mage Hand", "Prestidigitation", "Burning Hands", "Chromatic Orb", "Disguise Self", "Magic Missile", "Scorching Ray", "Fireball", "Fly", "Counterspell", "Dimension Door", "Polymorph", "Immolation"],
    traits: [
      { name: "Legendary Resistance (5/Day)", desc: "If Severin fails a saving throw, he can choose to succeed instead." },
      { name: "Draconic Majesty", desc: "Creatures of Severin's choice that are within 120 feet of Severin and aware of it must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to Severin's Draconic Majesty for the next 24 hours." },
      { name: "Damage Absorption (Draconic Heritage)", desc: "Whenever Severin is subjected to damage of a type he has a resistance to, he takes half damage and regains hit points equal to the half damage." },
      { name: "Dragon Breath", desc: "Severin is one of the Masked Lords and can breathe draconic fire." },
      { name: "Dragon Fire", desc: "Severin's spellcasting focuses on fire and draconic magic." },
      { name: "Spellcasting", desc: "Severin is an 11th-level spellcaster. His spellcasting ability is Charisma (spell save DC 17, +7 to hit with spell attacks). He has the following spells prepared: cantrips (at will) - fire bolt, mage hand, prestidigitation; 1st level (4 slots) - burning hands, chromatic orb, magic missile, disguise self; 2nd level (3 slots) - scorching ray, misty step; 3rd level (3 slots) - fireball, fly, counterspell; 4th level (2 slots) - dimension door, polymorph; 5th level (1 slot) - immolation; 6th level (1 slot) - chain lightning." }
    ],
    actions: [
      { name: "Multiattack", desc: "Severin uses Spellcasting twice or makes two dagger attacks." },
      { name: "Fire Breath (Recharge 5-6)", desc: "Severin exhales fire in a 30-foot cone. Each creature in that area must make a DC 17 Dexterity saving throw, taking 55 (10d10) fire damage on a failed save, or half as much on a successful one." },
      { name: "Burning Touch", desc: "Melee Spell Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8+4) fire damage." },
      { name: "Dagger", desc: "Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 3 (1d4+1) piercing damage." }
    ],
    reactions: [
      { name: "Counterspell", desc: "When a creature Severin can see casts a spell within 60 feet, he can use his reaction to force the caster to make a DC 17 Intelligence saving throw. On a failed save, the spell fails and is wasted." },
      { name: "Shield", desc: "When Severin is hit by an attack while he has spells available, he can use his reaction to gain a +5 bonus to AC against that attack." },
      { name: "Elemental Deflection (3/Day)", desc: "When Severin takes acid, cold, fire, lightning, or thunder damage, he can use his reaction to gain resistance to that damage type until the end of his next turn." }
    ],
    legendaryActions: [
      { name: "Move", desc: "Severin moves up to his speed without provoking opportunity attacks." },
      { name: "Cast Cantrip", desc: "Severin casts a cantrip." },
      { name: "Cast Spell (Costs 2 Actions)", desc: "Severin casts a spell of 4th level or lower." },
      { name: "Teleport (Costs 3 Actions)", desc: "Severin magically teleports up to 60 feet to an unoccupied space he can see." }
    ],
    lairActions: [
      { name: "Summon Elemental Force", desc: "Severin summons a fire elemental in an unoccupied space within 60 feet. The elemental acts on its own initiative and obeys Severin's commands." },
      { name: "Arcane Displacement", desc: "Severin magically teleports up to 60 feet to an unoccupied space he can see, or a creature he can see within 60 feet must succeed on a DC 17 Charisma saving throw or be pushed 15 feet away from him." },
      { name: "Infernal Chains (Costs 2 Actions)", desc: "Severin targets a creature he can see within 60 feet. The target must succeed on a DC 17 Strength saving throw or become restrained by magical chains until the end of its next turn." }
    ]
  },

  "Rath Modar": {
    type: "npc",
    cr: 6,
    ac: 13,
    hp: 71,
    abilities: { str: 9, dex: 10, con: 11, int: 18, wis: 12, cha: 13 },
    skills: { arcana: 6, deception: 3, insight: 3, investigation: 6 },
    savingThrows: { int: 6, wis: 3 },
    resistances: ["Fire"],
    immunities: [],
    conditionImmunities: [],
    spells: ["Acid Splash", "Fire Bolt", "Light", "Mage Hand", "Magic Missile", "Burning Hands", "Chromatic Orb", "Magic Missile", "Scorching Ray", "Fireball", "Cone of Cold", "Counterspell", "Misty Step", "Dimension Door", "Lightning Bolt", "Mass Suggestion"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If Rath fails a saving throw, he can choose to succeed instead." },
      { name: "Red Wizard Transmuter", desc: "Rath Modar is an 11th-level spellcaster and senior Red Wizard of Thay. His spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). He has the following spells prepared: cantrips (at will) - acid splash, fire bolt, light, mage hand; 1st level (4 slots) - burning hands, chromatic orb, magic missile, identify; 2nd level (3 slots) - scorching ray, misty step; 3rd level (3 slots) - fireball, counterspell; 4th level (2 slots) - dimension door, polymorph; 5th level (1 slot) - cone of cold; 6th level (1 slot) - mass suggestion." },
      { name: "Magic Resistance", desc: "Rath has advantage on saving throws against spells and magical effects." }
    ],
    actions: [
      { name: "Multiattack", desc: "Rath makes two dagger attacks or uses Spellcasting twice." },
      { name: "Dagger", desc: "Melee or Ranged Weapon Attack: +2 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 2 (1d4) piercing damage." }
    ],
    reactions: [
      { name: "Counterspell", desc: "When a creature Rath can see casts a spell within 60 feet, he can use his reaction to force the caster to make a DC 14 Intelligence saving throw. On a failed save, the spell fails and is wasted." }
    ],
    legendaryActions: [
      { name: "Move", desc: "Rath moves up to his speed without provoking opportunity attacks." },
      { name: "Cast Cantrip", desc: "Rath casts a cantrip." },
      { name: "Cast Spell (Costs 2 Actions)", desc: "Rath casts a spell of 3rd level or lower." },
      { name: "Teleport (Costs 2 Actions)", desc: "Rath magically teleports up to 60 feet to an unoccupied space he can see." }
    ],
    lairActions: [
      { name: "Summon Ally (Costs 1 Action)", desc: "Rath summons a cultist or fire elemental in an unoccupied space within 60 feet." },
      { name: "Arcane Displacement (Costs 1 Action)", desc: "Rath magically teleports up to 30 feet to an unoccupied space he can see." },
      { name: "Cast Spell (Costs 1 Action)", desc: "Rath casts a spell of 3rd level or lower." }
    ]
  },

  "Magus Thezzar": {
    type: "npc",
    cr: 5,
    ac: 15,
    hp: 77,
    abilities: { str: 9, dex: 11, con: 13, int: 18, wis: 13, cha: 14 },
    skills: { arcana: 6, deception: 4, insight: 4, persuasion: 4, investigation: 6 },
    savingThrows: { int: 6, wis: 4, cha: 4 },
    resistances: ["Fire", "Lightning"],
    immunities: [],
    conditionImmunities: [],
    spells: ["Acid Splash", "Fire Bolt", "Light", "Mage Hand", "Prestidigitation", "Burning Hands", "Chromatic Orb", "Magic Missile", "Scorching Ray", "Misty Step", "Fireball", "Lightning Bolt", "Counterspell", "Dimension Door", "Mass Suggestion"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If Thezzar fails a saving throw, he can choose to succeed instead." },
      { name: "Red Wizard Elementalist", desc: "Thezzar is a 9th-level spellcaster and Red Wizard of Thay with mastery over fire and lightning magic. His spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). He has the following spells prepared: cantrips (at will) - acid splash, fire bolt, light, mage hand, prestidigitation; 1st level (4 slots) - burning hands, chromatic orb, magic missile; 2nd level (3 slots) - scorching ray, misty step; 3rd level (3 slots) - fireball, lightning bolt, counterspell; 4th level (2 slots) - dimension door, polymorph; 5th level (1 slot) - mass suggestion." },
      { name: "Magic Resistance", desc: "Thezzar has advantage on saving throws against spells and magical effects." }
    ],
    actions: [
      { name: "Multiattack", desc: "Thezzar makes two dagger attacks or uses Spellcasting twice." },
      { name: "Dagger", desc: "Melee or Ranged Weapon Attack: +2 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 2 (1d4) piercing damage." }
    ],
    reactions: [
      { name: "Counterspell", desc: "When a creature Thezzar can see casts a spell within 60 feet, he can use his reaction to force the caster to make a DC 14 Intelligence saving throw. On a failed save, the spell fails and is wasted." }
    ],
    legendaryActions: [
      { name: "Move", desc: "Thezzar moves up to his speed without provoking opportunity attacks." },
      { name: "Cast Cantrip", desc: "Thezzar casts a cantrip." },
      { name: "Cast Spell (Costs 2 Actions)", desc: "Thezzar casts a spell of 3rd level or lower." },
      { name: "Teleport (Costs 2 Actions)", desc: "Thezzar magically teleports up to 60 feet to an unoccupied space he can see." }
    ],
    lairActions: [
      { name: "Arcane Displacement (Costs 1 Action)", desc: "Thezzar magically teleports up to 30 feet to an unoccupied space he can see." },
      { name: "Elemental Burst (Costs 1 Action)", desc: "Thezzar creates a burst of fire and lightning. Each creature in a 15-foot-radius sphere centered on a point Thezzar can see within 60 feet must make a DC 14 Dexterity saving throw, taking 22 (4d10) fire or lightning damage (Thezzar's choice) on a failed save, or half as much on a successful one." },
      { name: "Cast Spell (Costs 1 Action)", desc: "Thezzar casts a spell of 3rd level or lower." }
    ]
  },

  "White Abishai": {
    type: "npc",
    cr: 5,
    ac: 16,
    hp: 78,
    abilities: { str: 15, dex: 17, con: 14, int: 11, wis: 12, cha: 10 },
    skills: { acrobatics: 5, perception: 3 },
    savingThrows: { dex: 5, con: 4 },
    resistances: ["Cold"],
    immunities: ["Fire", "Poison"],
    conditionImmunities: ["Charmed", "Frightened", "Poisoned"],
    traits: [
      { name: "Magic Resistance", desc: "The abishai has advantage on saving throws against spells and magical effects." },
      { name: "Frozen Aura", desc: "Any creature that starts its turn within 5 feet of the abishai takes 5 (1d10) cold damage. A creature can only take this damage once per turn." },
      { name: "Ice Form", desc: "The abishai can move through nonmagical difficult terrain made of ice or snow as if it were normal terrain." },
      { name: "Innate Spellcasting", desc: "The abishai's innate spellcasting ability is Intelligence (spell save DC 11). The abishai can innately cast the following spells, requiring no material components: at will - detect magic, detect thoughts; 1/day each - armor of Agathys, cone of cold, invisibility." }
    ],
    actions: [
      { name: "Multiattack", desc: "The abishai makes two scimitar attacks." },
      { name: "Scimitar", desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d6+4) slashing damage plus 5 (1d10) cold damage." },
      { name: "Icy Breath (Recharge 5-6)", desc: "The abishai exhales a blast of freezing wind in a 15-foot cone. Each creature in that area must make a DC 14 Dexterity saving throw, taking 27 (5d10) cold damage on a failed save, or half as much on a successful one." }
    ],
    reactions: [
      { name: "Defensive Frost", desc: "When the abishai takes damage from a melee attack, it can use its reaction to reduce the damage by 10 (1d20). If the damage is reduced to 0, the attacker takes 5 (1d10) cold damage." }
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
  if (featureLower.includes("breath") || featureLower.includes("acid") || featureLower.includes("fire") || featureLower.includes("lightning") || featureLower.includes("cold") || featureLower.includes("poison")) return "icons/magic/fire/fireball-flame-ring-orange.webp";
  if (featureLower.includes("bite") || featureLower.includes("claw") || featureLower.includes("attack")) return "icons/skills/melee/hand-daggers-yellow.webp";
  if (featureLower.includes("resistance") || featureLower.includes("legendary") || featureLower.includes("immunity")) return "icons/magic/light/shield-blue.webp";
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

  // Add reactions
  if (config.reactions) {
    for (const reaction of config.reactions) {
      await addFeature(actor, reaction);
    }
  }

  // Add lair actions
  if (config.lairActions) {
    for (const action of config.lairActions) {
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
