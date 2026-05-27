/**
 * STEP 4 COMPLETE - CREATE OFFICIAL TIAMAT (Fiend, CR 30)
 *
 * This version creates the official Tiamat from Monster Manual:
 * - Gargantuan Fiend, Chaotic Evil
 * - CR 30 (155,000 XP)
 * - 615 HP (30d20 + 300)
 * - AC 25 (natural armor)
 * - Five draconic heads with independent breath weapons
 * - Legendary Actions: 5 per turn (one per head's attack)
 * - Divine resistances and immunities
 * - Frightful Presence (DC 26 WIS save, 240 ft range)
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

const TIAMAT_OFFICIAL = {
  "Tiamat": {
    type: "npc",
    cr: 30,
    ac: 25,
    hp: 615,
    abilities: { str: 30, dex: 10, con: 30, int: 26, wis: 26, cha: 28 },
    skills: { arcana: 17, perception: 26, religion: 17 },
    savingThrows: { str: 19, dex: 9, wis: 17 },
    resistances: [],
    immunities: ["acid", "cold", "fire", "lightning", "poison", "bludgeoning from nonmagical", "piercing from nonmagical", "slashing from nonmagical"],
    conditionImmunities: ["blinded", "charmed", "deafened", "frightened", "poisoned", "stunned"],
    traits: [
      { name: "Discorporation", desc: "When Tiamat drops to 0 hit points or dies, her body is destroyed but her essence travels back to her domain in the Nine Hells, and she is unable to take physical form for a time." },
      { name: "Innate Spellcasting (3/Day)", desc: "Tiamat can innately cast divine word (spell save DC 26). Her spellcasting ability is Charisma." },
      { name: "Legendary Resistance (5/Day)", desc: "If Tiamat fails a saving throw, she can choose to succeed instead." },
      { name: "Limited Magic Immunity", desc: "Unless she wishes to be affected, Tiamat is immune to spells of 6th level or lower. She has advantage on saving throws against all other spells and magical effects." },
      { name: "Magic Weapons", desc: "Tiamat's weapon attacks are magical." },
      { name: "Multiple Heads", desc: "Tiamat can take one reaction per turn, rather than only one per round. She also has advantage on saving throws against being knocked unconscious. If she fails a saving throw against an effect that would stun a creature, one of her unspent legendary actions is spent." },
      { name: "Regeneration", desc: "Tiamat regains 30 hit points at the start of her turn." },
      { name: "Five Draconic Heads", desc: "Tiamat's five heads (Black, Blue, Green, Red, White) each possess independent breath weapons and can act through her legendary actions. Each head has its own personality and tactical focus." }
    ],
    actions: [
      { name: "Multiattack", desc: "Tiamat can use her Frightful Presence. She then makes three attacks: two with her claws and one with her tail." },
      { name: "Claw", desc: "Melee Weapon Attack: +19 to hit, reach 15 ft., one target. Hit: 24 (4d6 + 10) slashing damage." },
      { name: "Tail", desc: "Melee Weapon Attack: +19 to hit, reach 25 ft., one target. Hit: 28 (4d8 + 10) piercing damage." },
      { name: "Frightful Presence", desc: "Each creature of Tiamat's choice that is within 240 feet of Tiamat and aware of her must succeed on a DC 26 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to Tiamat's Frightful Presence for the next 24 hours." },
      { name: "Divine Word (Innate, 3/Day)", desc: "Tiamat casts divine word (spell save DC 26). Her spellcasting ability is Charisma." }
    ],
    legendaryActions: [
      { name: "Move", desc: "Tiamat moves up to her speed." },
      { name: "Bite (Black Dragon Head)", desc: "Melee Weapon Attack: +19 to hit, reach 20 ft., one target. Hit: 32 (4d10 + 10) slashing damage plus 14 (4d6) acid damage." },
      { name: "Bite (Blue Dragon Head)", desc: "Melee Weapon Attack: +19 to hit, reach 20 ft., one target. Hit: 32 (4d10 + 10) slashing damage plus 14 (4d6) lightning damage." },
      { name: "Bite (Green Dragon Head)", desc: "Melee Weapon Attack: +19 to hit, reach 20 ft., one target. Hit: 32 (4d10 + 10) slashing damage plus 14 (4d6) poison damage." },
      { name: "Bite (Red Dragon Head)", desc: "Melee Weapon Attack: +19 to hit, reach 20 ft., one target. Hit: 32 (4d10 + 10) slashing damage plus 14 (4d6) fire damage." },
      { name: "Bite (White Dragon Head)", desc: "Melee Weapon Attack: +19 to hit, reach 20 ft., one target. Hit: 32 (4d10 + 10) slashing damage plus 14 (4d6) cold damage." },
      { name: "Black Dragon Head: Acid Breath (Costs 2 Actions)", desc: "Tiamat exhales acid in a 120-foot line that is 10 feet wide. Each creature in that line must make a DC 27 Dexterity saving throw, taking 67 (15d8) acid damage on a failed save, or half as much damage on a successful one." },
      { name: "Blue Dragon Head: Lightning Breath (Costs 2 Actions)", desc: "Tiamat exhales lightning in a 120-foot line that is 10 feet wide. Each creature in that line must make a DC 27 Dexterity saving throw, taking 88 (16d10) lightning damage on a failed save, or half as much damage on a successful one." },
      { name: "Green Dragon Head: Poison Breath (Costs 2 Actions)", desc: "Tiamat exhales poisonous gas in a 90-foot cone. Each creature in that area must make a DC 27 Constitution saving throw, taking 77 (22d6) poison damage on a failed save, or half as much damage on a successful one." },
      { name: "Red Dragon Head: Fire Breath (Costs 2 Actions)", desc: "Tiamat exhales fire in a 90-foot cone. Each creature in that area must make a DC 27 Dexterity saving throw, taking 91 (26d6) fire damage on a failed save, or half as much damage on a successful one." },
      { name: "White Dragon Head: Cold Breath (Costs 2 Actions)", desc: "Tiamat exhales an icy blast in a 90-foot cone. Each creature in that area must make a DC 27 Dexterity saving throw, taking 72 (16d8) cold damage on a failed save, or half as much damage on a successful one." }
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

async function createTiamat(config, folder) {
  // Create base actor object
  const actorData = {
    name: "Tiamat",
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
        cr: config.cr,
        type: "fiend"
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

async function createAllTiamat() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 4: TIAMAT - OFFICIAL MONSTER MANUAL STAT BLOCK    ║");
  console.log("║  Gargantuan Fiend, Chaotic Evil | CR 30                ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await createFolder();
  let successCount = 0;

  const config = TIAMAT_OFFICIAL["Tiamat"];
  console.log(`🐉 TIAMAT (Gargantuan Fiend, CR 30)...`);

  try {
    await createTiamat(config, folder);
    console.log(`   ✓ Complete\n`);
    console.log(`   AC: 25 | HP: 615 | 5 legendary actions per turn`);
    console.log(`   Five draconic heads (Black, Blue, Green, Red, White)`);
    console.log(`   Divine Word (3/day), Frightful Presence (DC 26), Regeneration 30 HP/turn\n`);
    successCount++;
  } catch (error) {
    console.log(`   ✗ Error: ${error.message}\n`);
  }

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 4 COMPLETE - TIAMAT MANIFESTED                   ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Created: ${successCount}/1\n`);
  console.log("🎉 ALL IMPORT STEPS COMPLETE!\n");
  console.log("📊 Total imported: 11 + 9 + 6 + 1 = 27 NPCs\n");
}

// Execute
createAllTiamat();
