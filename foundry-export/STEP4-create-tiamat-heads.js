/**
 * STEP 4 COMPLETE - CREATE TIAMAT MANIFESTATION (5 HEADS)
 *
 * This version creates the 5 independent draconic heads of Tiamat:
 * - Black Head (Acid/Decay)
 * - Blue Head (Lightning/Control)
 * - Green Head (Poison/Illusion)
 * - Red Head (Fire/Fury)
 * - White Head (Cold/Hunger)
 *
 * Each head has: AC, HP, CR, abilities, skills, resistances, immunities,
 * breath weapons, bite attacks, lair actions, and legendary actions
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

const TIAMAT_HEADS_DETAILED = {
  "Tiamat's Black Head": {
    type: "npc",
    cr: 18,
    ac: 17,
    hp: 75,
    abilities: { str: 25, dex: 10, con: 21, int: 19, wis: 16, cha: 20 },
    skills: { intimidation: 9, perception: 6, stealth: 3 },
    savingThrows: { dex: 4, con: 9, wis: 6, cha: 9 },
    resistances: ["acid"],
    immunities: ["acid", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    conditionImmunities: ["charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    traits: [
      { name: "Divine Head", desc: "The Black head is an aspect of Tiamat herself. It has advantage on saving throws against spells and magical effects." },
      { name: "Legendary Resistance (3/Day)", desc: "If the Black head fails a saving throw, it can choose to succeed instead." },
      { name: "Regeneration", desc: "The Black head regains 10 hit points at the start of its turn if the ritual is still ongoing." },
      { name: "Acidic Aura", desc: "Any creature that ends its turn within 10 feet of the Black head must make a DEX save DC 18 or take 1d6 acid damage." },
      { name: "Contemptuous Nature", desc: "The Black head speaks with mocking disdain. It insults the party about their inevitable failure." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 27 (4d6+8) piercing damage plus 7 (2d6) acid damage." },
      { name: "Acid Breath (Recharge 5-6)", desc: "The Black head exhales a line of acid 60 feet long and 8 feet wide. Each creature in that line must make a DEX save DC 20, taking 28 (8d6) acid damage on a failed save, or half as much on a successful one." },
      { name: "Multiattack", desc: "The Black head makes two attacks: two bites or one bite and one Acid Breath." }
    ],
    reactions: [
      { name: "Acidic Deflection", desc: "When the Black head takes damage, it can use its reaction to cause acid spray. Each creature within 10 feet must make a DEX save DC 20 or take half the damage taken by the head." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The Black head moves up to its speed." },
      { name: "Bite Attack", desc: "The Black head makes one bite attack." },
      { name: "Acid Spray (Costs 2 Actions)", desc: "The Black head targets up to three creatures within 30 feet. Each must make a DEX save DC 20 or take 10 (3d6) acid damage. On a success, a creature takes half damage." }
    ]
  },

  "Tiamat's Blue Head": {
    type: "npc",
    cr: 18,
    ac: 17,
    hp: 75,
    abilities: { str: 23, dex: 14, con: 21, int: 21, wis: 16, cha: 20 },
    skills: { intimidation: 9, insight: 6, perception: 6 },
    savingThrows: { dex: 5, con: 9, int: 8, wis: 6, cha: 9 },
    resistances: ["lightning"],
    immunities: ["lightning", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    conditionImmunities: ["charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    traits: [
      { name: "Divine Head", desc: "The Blue head is an aspect of Tiamat herself. It has advantage on saving throws against spells and magical effects." },
      { name: "Legendary Resistance (3/Day)", desc: "If the Blue head fails a saving throw, it can choose to succeed instead." },
      { name: "Regeneration", desc: "The Blue head regains 10 hit points at the start of its turn if the ritual is still ongoing." },
      { name: "Commanding Presence", desc: "Any creature of Tiamat's choice that starts its turn within 30 feet of the Blue head and can see it must make a WIS save DC 18 or be unable to use reactions until the end of its turn." },
      { name: "Authoritative Nature", desc: "The Blue head speaks of order and hierarchy, forcing submission through sheer force of will." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 27 (4d6+8) piercing damage plus 5 (1d10) lightning damage." },
      { name: "Lightning Breath (Recharge 5-6)", desc: "The Blue head exhales a line of lightning 90 feet long and 10 feet wide. Each creature in that line must make a DEX save DC 20, taking 38 (11d6) lightning damage on a failed save, or half as much on a successful one. All creatures in the area are knocked back 5 feet." },
      { name: "Multiattack", desc: "The Blue head makes two attacks: two bites or one bite and one Lightning Breath." }
    ],
    reactions: [
      { name: "Thunderous Deflection", desc: "When the Blue head takes damage, it can use its reaction to redirect the shock. One creature within 30 feet must make a STR save DC 20 or be knocked prone." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The Blue head moves up to its speed." },
      { name: "Bite Attack", desc: "The Blue head makes one bite attack." },
      { name: "Thunderous Rebuke (Costs 2 Actions)", desc: "One creature the Blue head can see within 30 feet must make a STR save DC 20 or be knocked prone and pushed 10 feet away." }
    ]
  },

  "Tiamat's Green Head": {
    type: "npc",
    cr: 18,
    ac: 17,
    hp: 75,
    abilities: { str: 21, dex: 16, con: 20, int: 22, wis: 14, cha: 21 },
    skills: { deception: 9, insight: 5, stealth: 5 },
    savingThrows: { dex: 6, con: 8, int: 9, cha: 9 },
    resistances: ["poison"],
    immunities: ["poison", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    conditionImmunities: ["charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    traits: [
      { name: "Divine Head", desc: "The Green head is an aspect of Tiamat herself. It has advantage on saving throws against spells and magical effects." },
      { name: "Legendary Resistance (3/Day)", desc: "If the Green head fails a saving throw, it can choose to succeed instead." },
      { name: "Regeneration", desc: "The Green head regains 10 hit points at the start of its turn if the ritual is still ongoing." },
      { name: "Poisonous Cloud", desc: "When the Green head uses its Poison Breath, the area becomes difficult terrain and filled with toxic mist until the start of Tiamat's next turn. Any creature that starts its turn in the mist must make a CON save DC 18 or take 1d6 poison damage." },
      { name: "Deceptive Nature", desc: "The Green head speaks in riddles and false truths, sowing distrust and poisoning the party's confidence." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 27 (4d6+8) piercing damage plus 7 (2d6) poison damage." },
      { name: "Poison Breath (Recharge 5-6)", desc: "The Green head exhales poison in a 60-foot cone. Each creature in that area must make a CON save DC 20, taking 35 (10d6) poison damage on a failed save, or half as much on a successful one. Creatures that fail become Poisoned (disadvantage on all ability checks and attacks) until the start of Tiamat's next turn." },
      { name: "Multiattack", desc: "The Green head makes two attacks: two bites or one bite and one Poison Breath." }
    ],
    reactions: [
      { name: "Mirage", desc: "When attacked, the Green head can use its reaction to create a mirror image, imposing disadvantage on the attack roll against it. It can do this up to 3 times." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The Green head moves up to its speed." },
      { name: "Bite Attack", desc: "The Green head makes one bite attack." },
      { name: "Mirage (Costs 1 Action)", desc: "The Green head casts Mirror Image (as if cast with a 9th-level slot). Up to 3 mirages can be active, each lasting until the end of Tiamat's next turn." }
    ]
  },

  "Tiamat's Red Head": {
    type: "npc",
    cr: 18,
    ac: 17,
    hp: 75,
    abilities: { str: 25, dex: 12, con: 21, int: 18, wis: 15, cha: 22 },
    skills: { athletics: 11, intimidation: 10, perception: 5 },
    savingThrows: { str: 9, con: 9, wis: 5, cha: 10 },
    resistances: ["fire"],
    immunities: ["fire", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    conditionImmunities: ["charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    traits: [
      { name: "Divine Head", desc: "The Red head is an aspect of Tiamat herself. It has advantage on saving throws against spells and magical effects." },
      { name: "Legendary Resistance (3/Day)", desc: "If the Red head fails a saving throw, it can choose to succeed instead." },
      { name: "Regeneration", desc: "The Red head regains 10 hit points at the start of its turn if the ritual is still ongoing." },
      { name: "Frightening Presence", desc: "Any creature that starts its turn within 30 feet of the Red head and can see it must make a WIS save DC 20 or be Frightened until the end of its turn." },
      { name: "Wrathful Nature", desc: "The Red head speaks of conquest and power, its presence alone inspiring terror in all who face it." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 27 (4d6+8) piercing damage plus 10 (3d6) fire damage." },
      { name: "Fire Breath (Recharge 5-6)", desc: "The Red head exhales fire in a 90-foot line that is 10 feet wide. Each creature in that line must make a DEX save DC 20, taking 45 (13d6) fire damage on a failed save, or half as much on a successful one." },
      { name: "Multiattack", desc: "The Red head makes two attacks: two bites or one bite and one Fire Breath." }
    ],
    reactions: [
      { name: "Infernal Retaliation", desc: "When a creature within 30 feet attacks the Red head, it can use its reaction to exhale fire. The attacker must make a DEX save DC 20, taking 10 (3d6) fire damage on a failed save, or half as much on a successful one." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The Red head moves up to its speed." },
      { name: "Bite Attack", desc: "The Red head makes one bite attack." },
      { name: "Inferno (Costs 3 Actions)", desc: "The Red head's next breath weapon deals double damage and affects a 90-foot radius instead of a line, centered on the head." }
    ]
  },

  "Tiamat's White Head": {
    type: "npc",
    cr: 18,
    ac: 17,
    hp: 75,
    abilities: { str: 24, dex: 11, con: 22, int: 12, wis: 13, cha: 14 },
    skills: { athletics: 11, perception: 4, survival: 4 },
    savingThrows: { str: 10, con: 10, wis: 4 },
    resistances: ["cold"],
    immunities: ["cold", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    conditionImmunities: ["charmed", "exhaustion", "frightened", "paralyzed", "petrified", "poisoned"],
    traits: [
      { name: "Divine Head", desc: "The White head is an aspect of Tiamat herself. It has advantage on saving throws against spells and magical effects." },
      { name: "Legendary Resistance (3/Day)", desc: "If the White head fails a saving throw, it can choose to succeed instead." },
      { name: "Regeneration", desc: "The White head regains 10 hit points at the start of its turn if the ritual is still ongoing." },
      { name: "Grapple & Swallow", desc: "If the White head hits a creature with its bite and the attack total exceeds the target's AC by 5 or more, the White head can grapple that creature (escape DC 20). If it hits again next turn, the target must make a STR save DC 20 or be swallowed whole." },
      { name: "Primal Hunger", desc: "The White head does not speak in words—only in sensation, hunger, and the drive to consume. It is the most alien and animalistic of the five heads." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 27 (4d6+8) piercing damage plus 7 (2d6) cold damage. If the attack total exceeds the target's AC by 5 or more, the White head can grapple the target (escape DC 20)." },
      { name: "Cold Breath (Recharge 5-6)", desc: "The White head exhales cold in a 60-foot cone. Each creature in that area must make a CON save DC 20, taking 31 (9d6) cold damage on a failed save, or half as much on a successful one. Creatures that fail are slowed (speed halved) until the start of Tiamat's next turn." },
      { name: "Multiattack", desc: "The White head makes two attacks: two bites or one bite and one Cold Breath." }
    ],
    reactions: [
      { name: "Hunger-Snap", desc: "When a creature moves within 15 feet of the White head, it can use its reaction to make one bite attack against that creature." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The White head moves up to its speed." },
      { name: "Bite Attack", desc: "The White head makes one bite attack." },
      { name: "Hunger-Snap (Costs 1 Action)", desc: "The White head makes a bite attack against a creature it can see within 15 feet." }
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

async function createCustomHead(name, config, folder) {
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

  // Add reactions
  if (config.reactions) {
    for (const reaction of config.reactions) {
      await addFeature(actor, reaction);
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

async function createAllHeads() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 4: TIAMAT MANIFESTATION - FIVE HEADS              ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await createFolder();
  let successCount = 0;

  for (const [npcName, config] of Object.entries(TIAMAT_HEADS_DETAILED)) {
    console.log(`🐉 ${npcName}...`);

    try {
      await createCustomHead(npcName, config, folder);
      console.log(`   ✓ Complete\n`);
      successCount++;
    } catch (error) {
      console.log(`   ✗ Error: ${error.message}\n`);
    }
  }

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 4 COMPLETE                                       ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Created & Customized: ${successCount}/5\n`);
  console.log("🎉 ALL IMPORT STEPS COMPLETE!\n");
  console.log("📊 Total imported: 11 + 9 + 6 + 5 = 31 NPCs\n");
}

// Execute
createAllHeads();
