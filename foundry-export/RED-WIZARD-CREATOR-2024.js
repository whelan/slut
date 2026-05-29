/**
 * RED WIZARD ACTOR CREATOR - 2024 D&D 5e compliant
 *
 * Creates generic Red Wizard NPCs (CR 1/8) for the Temple ritual.
 * Used as reinforcements throughout the encounter (5+ copies needed).
 *
 * 2024 Rules:
 * - Proficiency +2 (CR 1/8)
 * - Spell Save DC: 8 + INT mod (3) + proficiency (2) = 13
 * - Spell attacks: +5 to hit
 * - Uses official 2024 spells from dnd5e.spells24 compendia
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🧙 Creating Red Wizard actors (2024 compliant)\n");

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

async function createRedWizard(name = "Red Wizard") {
  const folder = await createFolder();

  // Base actor data (2024 compliant)
  const actorData = {
    name: name,
    type: "npc",
    folder: folder.id,
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
        biography: { value: "Red Wizard of Thay, performing the ritual." }
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
    img: "icons/svg/mystery-man.svg",
    prototypeToken: {
      name: name,
      displayName: CONST.TOKEN_DISPLAY_MODES.HOVER,
      vision: true,
      sight: { enabled: true, range: 60 },
      actorLink: false
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

  // Create 5 copies (ritual needs 5+ Red Wizards)
  return actor;
}

// Create one Red Wizard (you can duplicate in Foundry if needed)
async function runCreation() {
  try {
    const wizard = await createRedWizard("Red Wizard #1");
    console.log("\n✓ Red Wizard created successfully!");
    console.log("   To create more: Right-click actor in sidebar → Duplicate (repeat 4-5 times)");
    console.log("   OR run this macro again with different names.");
  } catch (error) {
    console.error("Error creating Red Wizard:", error);
  }
}

runCreation();
