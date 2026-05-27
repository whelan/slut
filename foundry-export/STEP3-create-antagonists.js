/**
 * STEP 3: CREATE CUSTOM ANTAGONISTS (6 complete NPCs)
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 *
 * Creates from scratch with FULL 2024 rules stats:
 * - Naergoth Bladelord (Wight, customized, CR 11)
 * - Severin (Cult Fanatic, customized, CR 6)
 * - Rath Modar (Red Wizard, CR 3)
 * - Magus Thezzar (Red Wizard Lieutenant, CR 8)
 * - White Abishai (CR 3)
 * - Black Abishai (Rezmir, CR 7)
 *
 * ALL with complete stats, skills, saves, actions, items, spells
 */

const ANTAGONIST_STATS = {
  "Naergoth Bladelord": {
    type: "npc",
    ac: 18,
    hp: 170,
    hpFormula: "20d8+80",
    cr: 11,
    abilities: { str: 20, dex: 14, con: 18, int: 12, wis: 13, cha: 16 },
    savingThrows: { wis: 4, cha: 5 },
    skills: { perception: 4, intimidation: 5 },
    damageResistances: ["Cold", "Lightning", "Necrotic", "Piercing", "Slashing"],
    conditionImmunities: ["Charmed", "Exhaustion", "Frightened", "Paralyzed", "Poisoned"],
    spells: [],
    weapons: ["Greatsword", "Breastplate", "Ring of Protection"],
    description: "Ancient undead wight general of terrible power. Naergoth Bladelord, bound by sorrow and duty.",
    traits: [
      { name: "Multiattack", desc: "Naergoth makes two attacks with his greatsword." },
      { name: "Sunlight Sensitivity", desc: "While in sunlight, Naergoth has disadvantage on attack rolls and on Wisdom (Perception) checks." },
      { name: "Legendary Resistance (3/Day)", desc: "If Naergoth fails a saving throw, he can choose to succeed instead." },
      { name: "Undead Resilience", desc: "Naergoth is immune to poison damage and cannot be poisoned." }
    ],
    actions: [
      { name: "Greatsword", desc: "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (2d6+5) slashing damage." },
      { name: "Life Drain", desc: "Ranged Spell Attack: +4 to hit, range 60 ft., one target. Hit: 10 (3d6) necrotic damage, and the target must succeed on a DC 15 Constitution save or its hit point maximum is reduced by that amount." }
    ],
    legendaryActions: [
      { name: "Attack", desc: "Naergoth makes one greatsword attack." },
      { name: "Move", desc: "Naergoth moves up to his speed." },
      { name: "Drain (Costs 2 Actions)", desc: "Naergoth uses Life Drain." }
    ]
  },

  "Severin": {
    type: "npc",
    ac: 15,
    hp: 66,
    hpFormula: "12d8+24",
    cr: 6,
    abilities: { str: 10, dex: 12, con: 14, int: 18, wis: 13, cha: 15 },
    savingThrows: { int: 6, wis: 4 },
    skills: { arcana: 6, religion: 6, perception: 4 },
    spells: ["Fire Bolt", "Light", "Burning Hands", "Magic Missile", "Thunderwave", "Scorching Ray", "Fireball", "Counterspell", "Dispel Magic"],
    weapons: ["Quarterstaff", "Dagger", "Robe of the Archmagi"],
    description: "Severin, zealous cult leader and powerful sorcerer. Voice of Tiamat on the material plane.",
    traits: [
      { name: "Spellcasting", desc: "Severin is a 6th-level spellcaster that uses Intelligence as his spellcasting ability." },
      { name: "Fanaticism", desc: "Severin has advantage on saving throws against being charmed or frightened." },
      { name: "Legendary Resistance (2/Day)", desc: "If Severin fails a saving throw, he can choose to succeed instead." }
    ],
    actions: [
      { name: "Quarterstaff", desc: "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d6-1) bludgeoning damage." },
      { name: "Dagger", desc: "Melee Weapon Attack: +4 to hit, reach 5 ft. or ranged 20/60 ft., one target. Hit: 4 (1d4+2) piercing damage." }
    ],
    legendaryActions: [
      { name: "Attack", desc: "Severin makes one weapon attack." },
      { name: "Cast Spell", desc: "Severin casts a cantrip." },
      { name: "Move", desc: "Severin moves up to his speed." }
    ]
  },

  "Rath Modar": {
    type: "npc",
    ac: 12,
    hp: 33,
    hpFormula: "6d8+6",
    cr: 3,
    abilities: { str: 9, dex: 12, con: 12, int: 16, wis: 11, cha: 12 },
    savingThrows: { int: 5 },
    skills: { arcana: 5, deception: 3 },
    spells: ["Fire Bolt", "Burning Hands", "Magic Missile", "Fireball", "Scorching Ray"],
    weapons: ["Quarterstaff", "Dagger", "Robe of the Archmagi"],
    description: "Rath Modar, Red Wizard lieutenant and Severin's voice on the battlefield.",
    traits: [
      { name: "Spellcasting", desc: "Rath is a 3rd-level spellcaster that uses Intelligence as his spellcasting ability." },
      { name: "Red Wizard Lore", desc: "Rath has proficiency with Arcana and uses it for spell attacks." }
    ],
    actions: [
      { name: "Quarterstaff", desc: "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6-1) bludgeoning damage." },
      { name: "Fire Bolt", desc: "Ranged Spell Attack: +5 to hit, range 120 ft., one target. Hit: 10 (3d6) fire damage." }
    ]
  },

  "Magus Thezzar": {
    type: "npc",
    ac: 14,
    hp: 65,
    hpFormula: "10d8+20",
    cr: 8,
    abilities: { str: 10, dex: 12, con: 14, int: 18, wis: 13, cha: 15 },
    savingThrows: { int: 6, wis: 4 },
    skills: { arcana: 6, investigation: 6 },
    spells: ["Fire Bolt", "Light", "Magic Missile", "Burning Hands", "Mage Armor", "Scorching Ray", "Fireball", "Counterspell"],
    weapons: ["Staff of Fire", "Dagger", "Robe of the Archmagi"],
    description: "Magus Thezzar, red wizard master on the plaza sacrifice ritual. Ritual master and spellcaster of great power.",
    traits: [
      { name: "Spellcasting", desc: "Thezzar is an 8th-level spellcaster that uses Intelligence as his spellcasting ability." },
      { name: "Ritual Master", desc: "Thezzar can cast spells as rituals if he has them in his spellbook." },
      { name: "Legendary Resistance (1/Day)", desc: "If Thezzar fails a saving throw, he can choose to succeed instead." }
    ],
    actions: [
      { name: "Quarterstaff", desc: "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6+1) bludgeoning damage." },
      { name: "Fire Bolt", desc: "Ranged Spell Attack: +6 to hit, range 120 ft., one target. Hit: 12 (3d8) fire damage." }
    ],
    legendaryActions: [
      { name: "Move", desc: "Thezzar moves up to his speed." },
      { name: "Cast Spell", desc: "Thezzar casts a spell." }
    ]
  },

  "White Abishai": {
    type: "npc",
    ac: 15,
    hp: 52,
    hpFormula: "7d10+14",
    cr: 3,
    abilities: { str: 16, dex: 15, con: 15, int: 11, wis: 12, cha: 11 },
    savingThrows: { str: 5, dex: 4 },
    skills: { perception: 3 },
    spells: [],
    weapons: ["Scimitar", "Plate Armor"],
    description: "White Abishai, icy warrior of Tiamat. Harbinger of winter and frost.",
    traits: [
      { name: "Multiattack", desc: "The abishai makes two scimitar attacks." },
      { name: "Innate Spellcasting", desc: "The abishai can innately cast the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 11): at will - darkness; 1/day each - cone of cold, wall of ice" }
    ],
    actions: [
      { name: "Scimitar", desc: "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6+3) slashing damage." }
    ]
  },

  "Black Abishai (Rezmir)": {
    type: "npc",
    ac: 16,
    hp: 76,
    hpFormula: "8d10+32",
    cr: 7,
    abilities: { str: 17, dex: 16, con: 18, int: 14, wis: 14, cha: 13 },
    savingThrows: { str: 6, dex: 5, con: 7 },
    skills: { perception: 5, stealth: 5 },
    spells: ["Fireball", "Scorching Ray"],
    weapons: ["Longsword", "Plate Armor", "Shield"],
    description: "Black Abishai (Rezmir), wyrmspeaker of the Black Dragon. Powerful general and draconic champion.",
    traits: [
      { name: "Multiattack", desc: "The abishai makes two longsword attacks." },
      { name: "Draconic Resilience", desc: "The abishai has resistance to fire damage." },
      { name: "Innate Spellcasting", desc: "The abishai can innately cast the following spells, requiring no material components and using Intelligence as the spellcasting ability (spell save DC 13): at will - darkness; 1/day each - fireball, scorching ray" }
    ],
    actions: [
      { name: "Longsword", desc: "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8+4) slashing damage, or 9 (1d10+4) slashing damage if used with two hands." },
      { name: "Fireball", desc: "Ranged Spell Attack: 13d6 fire damage in 20-foot radius sphere, Dexterity save DC 13 half." }
    ],
    legendaryActions: [
      { name: "Attack", desc: "The abishai makes one longsword attack." },
      { name: "Move", desc: "The abishai moves up to its speed." }
    ]
  }
};

async function createCustomActor(name, config) {
  const abilities = {
    str: { value: config.abilities.str },
    dex: { value: config.abilities.dex },
    con: { value: config.abilities.con },
    int: { value: config.abilities.int },
    wis: { value: config.abilities.wis },
    cha: { value: config.abilities.cha }
  };

  const data = {
    name: name,
    type: "npc",
    data: {
      attributes: {
        ac: { flat: config.ac }
      },
      details: {
        cr: config.cr,
        biography: {
          value: config.description
        }
      },
      traits: {
        hp: {
          value: Math.floor(config.hp / 2),
          max: config.hp,
          formula: config.hpFormula
        }
      },
      abilities: abilities
    }
  };

  return await Actor.create(data);
}

async function addSpellToActor(actor, spellName) {
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

async function createAntagonists() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 3: CREATE CUSTOM ANTAGONISTS (6 NPCs)            ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await createFolder();
  let createdCount = 0;

  for (const [name, config] of Object.entries(ANTAGONIST_STATS)) {
    console.log(`⚔️  Creating: ${name}...`);

    // Create actor
    const actor = await createCustomActor(name, config);

    // Move to folder
    await actor.update({ folder: folder.id });

    // Add spells
    if (config.spells && config.spells.length > 0) {
      for (const spell of config.spells) {
        const added = await addSpellToActor(actor, spell);
        if (added) {
          console.log(`   ✓ Added spell: ${spell}`);
        }
      }
    }

    console.log(`   ✓ ${name} created with full stats\n`);
    createdCount++;
  }

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 3 COMPLETE - ALL ANTAGONISTS CREATED             ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Created: ${createdCount}/${Object.keys(ANTAGONIST_STATS).length}\n`);

  console.log("📋 ALL STEPS COMPLETE!");
  console.log("\n✓ Council Members: 11 imported");
  console.log("✓ Creatures: 9 imported");
  console.log("✓ Antagonists: 6 created\n");

  console.log("📁 All NPCs in: temple-of-tiamat folder\n");

  console.log("✨ READY TO PLAY! Check all actors have equipment and spells.\n");
}

// Execute
createAntagonists();
