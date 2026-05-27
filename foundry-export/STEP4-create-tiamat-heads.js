/**
 * STEP 4 COMPLETE - CREATE TIAMAT'S FIVE DRACONIC HEADS (Manifestation Phase 1-3)
 *
 * These five independent draconic heads appear during the ritual (Clock 4-7).
 * They are partial manifestations of Tiamat before her full emergence.
 *
 * Based on the official Tiamat stat block, each head represents one aspect:
 * - Black Head: Acid/Decay (CR 20)
 * - Blue Head: Lightning/Control (CR 20)
 * - Green Head: Poison/Lies (CR 21)
 * - Red Head: Fire/Fury (CR 21)
 * - White Head: Cold/Hunger (CR 20)
 *
 * These are replaced by the full Tiamat (STEP5) at Clock 8.
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

const TIAMAT_HEADS_DETAILED = {
  "Black Dragon Head of Tiamat": {
    type: "npc",
    cr: 20,
    ac: 25,
    hp: 195,
    abilities: { str: 28, dex: 10, con: 28, int: 24, wis: 24, cha: 26 },
    skills: { perception: 15, arcana: 14 },
    savingThrows: { str: 14, dex: 5, wis: 11, cha: 12 },
    resistances: [],
    immunities: ["acid", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    conditionImmunities: ["blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If the Black head fails a saving throw, it can choose to succeed instead." },
      { name: "Partial Manifestation", desc: "This head is a fragment of Tiamat, appearing through the planar veil. It regenerates 15 HP at the start of its turn while the ritual continues." },
      { name: "Acidic Nature", desc: "The Black head drips with corrosive acid. Any creature that touches it or hits it with a melee attack takes 5 (1d10) acid damage." },
      { name: "Magic Weapons", desc: "The Black head's attacks are magical." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 28 (4d10 + 8) slashing damage plus 14 (4d6) acid damage." },
      { name: "Acid Breath (Recharge 5-6)", desc: "The Black head exhales acid in a 120-foot line that is 10 feet wide. Each creature in that line must make a DC 25 Dexterity saving throw, taking 60 (13d8) acid damage on a failed save, or half as much damage on a successful one." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The Black head moves up to 60 feet." },
      { name: "Bite", desc: "The Black head makes one bite attack." },
      { name: "Acid Breath (Costs 2 Actions)", desc: "The Black head uses its Acid Breath (recharge permitting)." }
    ]
  },

  "Blue Dragon Head of Tiamat": {
    type: "npc",
    cr: 20,
    ac: 25,
    hp: 195,
    abilities: { str: 26, dex: 12, con: 28, int: 26, wis: 24, cha: 26 },
    skills: { arcana: 15, perception: 15, intimidation: 13 },
    savingThrows: { str: 13, dex: 6, int: 12, wis: 11, cha: 12 },
    resistances: [],
    immunities: ["lightning", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    conditionImmunities: ["blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If the Blue head fails a saving throw, it can choose to succeed instead." },
      { name: "Partial Manifestation", desc: "This head is a fragment of Tiamat, appearing through the planar veil. It regenerates 15 HP at the start of its turn while the ritual continues." },
      { name: "Lightning Aura", desc: "At the start of each of the Blue head's turns, each creature within 5 feet of it must succeed on a DC 23 Dexterity saving throw or take 10 (3d6) lightning damage." },
      { name: "Magic Weapons", desc: "The Blue head's attacks are magical." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 28 (4d10 + 8) slashing damage plus 14 (4d6) lightning damage." },
      { name: "Lightning Breath (Recharge 5-6)", desc: "The Blue head exhales lightning in a 120-foot line that is 10 feet wide. Each creature in that line must make a DC 25 Dexterity saving throw, taking 77 (14d10) lightning damage on a failed save, or half as much damage on a successful one." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The Blue head moves up to 60 feet." },
      { name: "Bite", desc: "The Blue head makes one bite attack." },
      { name: "Lightning Breath (Costs 2 Actions)", desc: "The Blue head uses its Lightning Breath (recharge permitting)." }
    ]
  },

  "Green Dragon Head of Tiamat": {
    type: "npc",
    cr: 21,
    ac: 25,
    hp: 210,
    abilities: { str: 24, dex: 14, con: 28, int: 28, wis: 22, cha: 27 },
    skills: { arcana: 16, deception: 14, insight: 13, perception: 13 },
    savingThrows: { str: 12, dex: 7, int: 13, wis: 10, cha: 13 },
    resistances: [],
    immunities: ["poison", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    conditionImmunities: ["blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If the Green head fails a saving throw, it can choose to succeed instead." },
      { name: "Partial Manifestation", desc: "This head is a fragment of Tiamat, appearing through the planar veil. It regenerates 15 HP at the start of its turn while the ritual continues." },
      { name: "Poisonous Aura", desc: "Any creature that starts its turn within 10 feet of the Green head must make a DC 25 Constitution saving throw or take 9 (2d8) poison damage." },
      { name: "Magic Weapons", desc: "The Green head's attacks are magical." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 28 (4d10 + 8) slashing damage plus 14 (4d6) poison damage." },
      { name: "Poison Breath (Recharge 5-6)", desc: "The Green head exhales poisonous gas in a 90-foot cone. Each creature in that area must make a DC 25 Constitution saving throw, taking 70 (20d6) poison damage on a failed save, or half as much damage on a successful one." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The Green head moves up to 60 feet." },
      { name: "Bite", desc: "The Green head makes one bite attack." },
      { name: "Poison Breath (Costs 2 Actions)", desc: "The Green head uses its Poison Breath (recharge permitting)." }
    ]
  },

  "Red Dragon Head of Tiamat": {
    type: "npc",
    cr: 21,
    ac: 25,
    hp: 210,
    abilities: { str: 30, dex: 10, con: 30, int: 24, wis: 22, cha: 28 },
    skills: { athletics: 16, intimidation: 15, perception: 13 },
    savingThrows: { str: 15, dex: 5, con: 15, wis: 10, cha: 13 },
    resistances: [],
    immunities: ["fire", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    conditionImmunities: ["blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If the Red head fails a saving throw, it can choose to succeed instead." },
      { name: "Partial Manifestation", desc: "This head is a fragment of Tiamat, appearing through the planar veil. It regenerates 15 HP at the start of its turn while the ritual continues." },
      { name: "Molten Aura", desc: "Any creature that starts its turn within 5 feet of the Red head must make a DC 25 Dexterity saving throw or take 11 (2d10) fire damage." },
      { name: "Magic Weapons", desc: "The Red head's attacks are magical." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 30 (4d10 + 10) slashing damage plus 14 (4d6) fire damage." },
      { name: "Fire Breath (Recharge 5-6)", desc: "The Red head exhales fire in a 90-foot cone. Each creature in that area must make a DC 25 Dexterity saving throw, taking 82 (23d6) fire damage on a failed save, or half as much damage on a successful one." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The Red head moves up to 60 feet." },
      { name: "Bite", desc: "The Red head makes one bite attack." },
      { name: "Fire Breath (Costs 2 Actions)", desc: "The Red head uses its Fire Breath (recharge permitting)." }
    ]
  },

  "White Dragon Head of Tiamat": {
    type: "npc",
    cr: 20,
    ac: 25,
    hp: 195,
    abilities: { str: 29, dex: 10, con: 29, int: 20, wis: 20, cha: 24 },
    skills: { athletics: 15, perception: 13, survival: 12 },
    savingThrows: { str: 14, dex: 5, con: 14 },
    resistances: [],
    immunities: ["cold", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical", "blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    conditionImmunities: ["blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    traits: [
      { name: "Legendary Resistance (3/Day)", desc: "If the White head fails a saving throw, it can choose to succeed instead." },
      { name: "Partial Manifestation", desc: "This head is a fragment of Tiamat, appearing through the planar veil. It regenerates 15 HP at the start of its turn while the ritual continues." },
      { name: "Freezing Aura", desc: "Any creature that starts its turn within 10 feet of the White head must make a DC 23 Constitution saving throw or take 7 (2d6) cold damage." },
      { name: "Magic Weapons", desc: "The White head's attacks are magical." }
    ],
    actions: [
      { name: "Bite", desc: "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 28 (4d10 + 8) slashing damage plus 14 (4d6) cold damage." },
      { name: "Cold Breath (Recharge 5-6)", desc: "The White head exhales an icy blast in a 90-foot cone. Each creature in that area must make a DC 23 Dexterity saving throw, taking 65 (14d8) cold damage on a failed save, or half as much damage on a successful one." }
    ],
    legendaryActions: [
      { name: "Move", desc: "The White head moves up to 60 feet." },
      { name: "Bite", desc: "The White head makes one bite attack." },
      { name: "Cold Breath (Costs 2 Actions)", desc: "The White head uses its Cold Breath (recharge permitting)." }
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
  if (featureLower.includes("manifestation")) return "icons/magic/light/portal-swirl-blue.webp";
  if (featureLower.includes("breath")) return "icons/magic/fire/fireball-flame-ring-orange.webp";
  if (featureLower.includes("acid")) return "icons/magic/water/wave-water-acid-splash.webp";
  if (featureLower.includes("lightning")) return "icons/magic/lightning/projectile-beam-yellow.webp";
  if (featureLower.includes("poison") || featureLower.includes("cloud")) return "icons/magic/death/poison-gas-cloud-gray.webp";
  if (featureLower.includes("fire")) return "icons/magic/fire/fireball-flame-ring-orange.webp";
  if (featureLower.includes("cold") || featureLower.includes("freeze")) return "icons/magic/water/ice-shard-blue.webp";
  if (featureLower.includes("bite") || featureLower.includes("attack")) return "icons/skills/melee/hand-daggers-yellow.webp";
  if (featureLower.includes("resistance") || featureLower.includes("legendary")) return "icons/magic/light/shield-blue.webp";
  if (featureLower.includes("aura")) return "icons/magic/light/aura-blue.webp";

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

async function createCustomHead(name, config, folder) {
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

  // Initialize and set saving throws
  actorData.system.abilities.str.save = 0;
  actorData.system.abilities.dex.save = 0;
  actorData.system.abilities.con.save = 0;
  actorData.system.abilities.int.save = 0;
  actorData.system.abilities.wis.save = 0;
  actorData.system.abilities.cha.save = 0;

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

async function createAllHeads() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 4: TIAMAT'S FIVE DRACONIC HEADS (Manifestation)   ║");
  console.log("║  Phase 1-3 (Clock 4-7) - Replaced by full Tiamat later ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await createFolder();
  let successCount = 0;

  for (const [npcName, config] of Object.entries(TIAMAT_HEADS_DETAILED)) {
    console.log(`🐉 ${npcName}...`);

    try {
      await createCustomHead(npcName, config, folder);
      console.log(`   ✓ Complete (CR ${config.cr}, ${config.hp} HP)\n`);
      successCount++;
    } catch (error) {
      console.log(`   ✗ Error: ${error.message}\n`);
    }
  }

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 4 COMPLETE - FIVE HEADS MANIFESTED               ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Created: ${successCount}/5\n`);
  console.log("📋 NEXT: Run STEP5-create-tiamat-final.js at Clock 8\n");
}

// Execute
createAllHeads();
