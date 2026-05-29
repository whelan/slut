/**
 * RED WIZARD NPC CREATOR - 2024 D&D 5e compliant
 *
 * Creates multiple UNIQUE Red Wizard NPCs (CR 1/8) with individual names and artwork.
 * Used as ritual casters throughout the Temple of Tiamat encounter (5+ needed).
 *
 * 2024 Rules:
 * - Proficiency +2 (CR 1/8)
 * - Spell Save DC: 8 + INT mod (3) + proficiency (2) = 13
 * - Spell attacks: +5 to hit
 * - Uses official 2024 spells from dnd5e.spells24 compendia
 *
 * Each wizard is created as a REAL NPC with unique name and artwork.
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🧙 Creating individual Red Wizard NPCs (2024 compliant)\n");

// Individual Red Wizards with Thayan names and artwork
const RED_WIZARDS = [
  {
    name: "Magus Thallid",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-1-token.png"
  },
  {
    name: "Magus Szass",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-2.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-2-token.png"
  },
  {
    name: "Magus Zalathorm",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-3.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-3-token.png"
  },
  {
    name: "Magus Valrax",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-4.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-4-token.png"
  },
  {
    name: "Magus Thyrmog",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-5.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-5-token.png"
  },
  {
    name: "Magus Yarthraax",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-6.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-6-token.png"
  }
];

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

function getFeatureIcon(featureName) {
  const name = featureName.toLowerCase();
  if (name.includes("spell")) return "icons/magic/light/projectile-beam.webp";
  if (name.includes("fireball")) return "icons/magic/fire/fireball.webp";
  if (name.includes("counterspell")) return "icons/magic/abjuration/shield-barrier.webp";
  if (name.includes("dagger")) return "icons/weapons/daggers/dagger-ornate.webp";
  return "icons/skills/social/awareness-perception.webp";
}

async function addSpellFromCompendium(actor, spellName) {
  const priorityPacks = ["dnd5e.spells24", "dnd5e.spells"];

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
  return false;
}

async function createRedWizard(wizardData) {
  const folder = await createFolder();
  const { name, portrait, token } = wizardData;

  // Base actor data (2024 compliant) - REAL NPC with full character sheet
  const actorData = {
    name: name,
    type: "npc",
    folder: folder.id,
    img: portrait,  // Character portrait
    system: {
      // Core attributes
      attributes: {
        ac: { flat: 12 },
        hp: { value: 22, max: 22 }
      },
      // Details
      details: {
        cr: 0.125,
        alignment: "chaotic evil",
        biography: { value: `${name} is a Red Wizard of Thay, devoted to the cult of Tiamat. Currently focused on maintaining the ritual summoning.` }
      },
      // Abilities (2024)
      abilities: {
        str: { value: 9 },
        dex: { value: 10 },
        con: { value: 11 },
        int: { value: 16 },
        wis: { value: 12 },
        cha: { value: 11 }
      },
      // Proficiencies
      traits: {
        languages: { value: ["Common", "Thayan"] },
        senses: "passive Perception 11",
        resistances: { value: ["fire"] }
      },
      // Spell DC (2024): 8 + INT mod (3) + proficiency (2) = 13
      spelldc: 13,
      profBonus: 2
    },
    prototypeToken: {
      name: name,
      displayName: CONST.TOKEN_DISPLAY_MODES.HOVER,
      vision: true,
      sight: { enabled: true, range: 60 },
      actorLink: false,
      img: token  // Token image
    }
  };

  // Create the actor
  const actor = await Actor.create(actorData);
  console.log(`✓ Created: ${actor.name} (AC 12, HP 22, Spell DC 13)`);

  // Add spells from compendia (2024 spells)
  const spells = [
    "Fire Bolt",      // cantrip
    "Light",          // cantrip
    "Mage Hand",      // cantrip
    "Magic Missile",  // 1st level
    "Burning Hands",  // 1st level
    "Chromatic Orb",  // 1st level
    "Scorching Ray",  // 2nd level
    "Fireball",       // 3rd level (signature 2024 spell)
    "Counterspell"    // 3rd level
  ];

  for (const spellName of spells) {
    const added = await addSpellFromCompendium(actor, spellName);
    if (added) {
      console.log(`  ✓ Added spell: ${spellName}`);
    } else {
      console.log(`  ⚠ Spell not found (may not exist in this system): ${spellName}`);
    }
  }

  // Add dagger as weapon
  const daggerItem = {
    name: "Dagger",
    type: "weapon",
    system: {
      quantity: 1,
      rarity: "common",
      equipped: true,
      properties: { fin: true, light: true, thrown: true },
      damage: { parts: [["1d4+3", "piercing"]] },
      range: { value: 20, long: 60 },
      attack: { bonus: 4 }
    },
    img: "icons/weapons/daggers/dagger-ornate.webp"
  };

  await actor.createEmbeddedDocuments("Item", [daggerItem]);
  console.log(`  ✓ Added dagger (Melee +4, 1d4+3 piercing)`);

  return actor;
}

// Create all Red Wizards at once
async function runCreation() {
  try {
    console.log(`Creating ${RED_WIZARDS.length} unique Red Wizard NPCs...\n`);
    let created = 0;

    for (const wizardData of RED_WIZARDS) {
      await createRedWizard(wizardData);
      created++;
    }

    console.log(`\n✓ All ${created} Red Wizards created successfully!`);
    console.log("  They are ready for deployment in the Temple of Tiamat encounter.");
    console.log("  Each has full stats, spells, and equipment already configured.");
  } catch (error) {
    console.error("Error creating Red Wizard:", error);
  }
}

runCreation();
