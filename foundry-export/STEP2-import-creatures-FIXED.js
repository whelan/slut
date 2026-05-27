/**
 * STEP 2 - IMPORT CREATURES (9 NPCs)
 *
 * SEARCHES PACKS FIRST, then creates from embedded stat blocks if not found
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🧟 STEP 2: Importing/Creating Creatures (9 NPCs)\n");

// Helper: Search for actor in all available packs
async function findActorInPacks(creatureName) {
  const searchName = creatureName.toLowerCase().trim();

  // List of packs to search (in priority order)
  const packsToSearch = [
    "dnd5e.actors24",
    "dnd5e.creatures24",
    "dnd5e.creatures",
    "dnd5e.actors",
    "dnd5e.npc"
  ];

  // Search known packs first
  for (const packId of packsToSearch) {
    const pack = game.packs.get(packId);
    if (!pack) continue;

    const index = await pack.getIndex();
    const found = index.find(e => e.name.toLowerCase().trim() === searchName);

    if (found) {
      console.log(`   ✓ Found "${creatureName}" in pack: ${packId}`);
      return { packId, documentId: found._id };
    }
  }

  // If not found in known packs, search ALL packs
  for (const pack of game.packs) {
    if (pack.metadata.type !== "Actor") continue;

    const index = await pack.getIndex();
    const found = index.find(e => e.name.toLowerCase().trim() === searchName);

    if (found) {
      console.log(`   ✓ Found "${creatureName}" in pack: ${pack.metadata.id}`);
      return { packId: pack.metadata.id, documentId: found._id };
    }
  }

  return null;
}

// Helper: Import actor from pack
async function importActorFromPack(packId, documentId) {
  const pack = game.packs.get(packId);
  if (!pack) return null;

  const actor = await pack.getDocument(documentId);
  if (!actor) return null;

  // Create a copy in the world
  const actorData = actor.toObject();
  delete actorData._id;
  return await Actor.create(actorData);
}

// Helper: Get icon for feature/action
function getFeatureIcon(featureName) {
  const name = featureName.toLowerCase();

  // Attack & Combat
  if (name.includes("multiattack")) return "https://assets.forge-vtt.com/bazaar/core/icons/skills/melee/blade-tips-triple-steel.webp";
  if (name.includes("bite")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/mouth-teeth-long-red.webp";
  if (name.includes("claw") || name.includes("claws")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/claws-red.webp";
  if (name.includes("tail")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/tail-sharp-red.webp";
  if (name.includes("slam")) return "https://assets.forge-vtt.com/bazaar/core/icons/skills/melee/fist-raised-red.webp";
  if (name.includes("touch")) return "https://assets.forge-vtt.com/bazaar/core/icons/skills/melee/hand-daggers-yellow.webp";

  // Breath Weapons
  if (name.includes("breath")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/fire/fireball-flame-ring-orange.webp";
  if (name.includes("acid")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/water/water-splash-acid-green.webp";
  if (name.includes("fire")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/fire/fireball-flame-ring-orange.webp";
  if (name.includes("cold") || name.includes("ice")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/water/ice-shard-blue.webp";
  if (name.includes("lightning")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/lightning/projectile-beam-yellow.webp";
  if (name.includes("poison")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/death/poison-gas-cloud-gray.webp";

  // Abilities
  if (name.includes("immutable") || name.includes("form")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("magic resistance")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("magic weapons")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("regeneration")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/life/heart-plus-green.webp";
  if (name.includes("legendary resistance")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("sunlight sensitivity")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/light/projectile-beam-yellow.webp";
  if (name.includes("undead fortitude")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/death/death-wave-black.webp";
  if (name.includes("life drain")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/death/death-wave-black.webp";
  if (name.includes("transparency")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-purple.webp";
  if (name.includes("slow")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("haste")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("spellcasting")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/light/projectile-beam-yellow.webp";
  if (name.includes("barbed hide") || name.includes("reactive")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/claws-red.webp";

  // Default
  return "https://assets.forge-vtt.com/bazaar/core/icons/skills/social/awareness-perception.webp";
}

// Helper: Create feat item for traits/actions
function createFeatItem(name, description) {
  const icon = getFeatureIcon(name);
  return {
    name: name,
    type: "feat",
    system: {
      description: { value: description },
      rarity: "uncommon"
    },
    img: icon
  };
}

// Creature data with full stat blocks
const CREATURES = [
  {
    name: "Air Elemental",
    type: "npc",
    system: {
      attributes: {
        ac: { flat: 15 },
        hp: { value: 90, max: 90 }
      },
      details: {
        cr: 5,
        biography: { value: "Elemental creature of air, incorporeal and swift. Resistant to bludgeoning, piercing, slashing; immune to poison." }
      },
      traits: {
        languages: { value: [] },
        senses: "darkvision 60 ft."
      },
      abilities: {
        str: { value: 14 },
        dex: { value: 20 },
        con: { value: 14 },
        int: { value: 6 },
        wis: { value: 10 },
        cha: { value: 6 }
      }
    },
    items: [
      createFeatItem("Air Form", "The elemental can enter a hostile creature's space and stop there. It can move through a narrow opening only if it can expel part of its body outside that space.", "icons/magic/air/wind-stream-air-blue.webp"),
      createFeatItem("Transparency", "Even when in plain sight, takes DC 15 Perception check to spot if not moved or attacked.", "icons/magic/air/wind-stream-air-blue.webp"),
      createFeatItem("Multiattack", "The elemental makes two slam attacks.", "icons/weapons/unarmed/punch-fist-white.webp"),
      createFeatItem("Slam", "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8+5) bludgeoning damage.", "icons/weapons/unarmed/punch-fist-white.webp")
    ]
  },

  {
    name: "Fire Elemental",
    type: "npc",
    system: {
      attributes: {
        ac: { flat: 15 },
        hp: { value: 102, max: 102 }
      },
      details: {
        cr: 5,
        biography: { value: "Elemental creature of fire, burns with intense heat. Immune to fire and poison damage. Sheds bright light 30 ft, dim 60 ft." }
      },
      traits: {
        languages: { value: [] },
        senses: "darkvision 60 ft."
      },
      abilities: {
        str: { value: 10 },
        dex: { value: 17 },
        con: { value: 16 },
        int: { value: 6 },
        wis: { value: 10 },
        cha: { value: 7 }
      }
    },
    items: [
      createFeatItem("Fire Form", "Can enter a hostile creature's space and stop there. Can move through narrow opening only if it can expel part outside.", "icons/magic/fire/flame-wisp-orange.webp"),
      createFeatItem("Illumination", "Sheds bright light in 30 ft radius, dim light in additional 30 ft.", "icons/magic/fire/flame-wisp-orange.webp"),
      createFeatItem("Water Susceptibility", "For every 5 ft moved in water or gallon of water splashed, takes 1 cold damage.", "icons/magic/water/water-splash-blue.webp"),
      createFeatItem("Multiattack", "Makes two touch attacks.", "icons/weapons/unarmed/punch-fist-white.webp"),
      createFeatItem("Touch", "Melee: +6 to hit, reach 5 ft. Hit: 10 (2d6+3) fire. If target is creature/flammable object, ignites for 5 (1d10) fire damage per turn.", "icons/magic/fire/flame-wisp-orange.webp")
    ]
  },

  {
    name: "Stone Golem",
    type: "npc",
    system: {
      attributes: {
        ac: { flat: 17 },
        hp: { value: 178, max: 178 }
      },
      details: {
        cr: 10,
        biography: { value: "Construct of enchanted stone. Immobile form, magic resistant, immune to poison and psychic damage. Slow ability slows multiple targets." }
      },
      traits: {
        languages: { value: [] },
        senses: "darkvision 120 ft."
      },
      abilities: {
        str: { value: 22 },
        dex: { value: 9 },
        con: { value: 20 },
        int: { value: 3 },
        wis: { value: 11 },
        cha: { value: 1 }
      }
    },
    items: [
      createFeatItem("Immutable Form", "Immune to any spell or effect that would alter its form.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Magic Resistance", "Advantage on saving throws against spells and magical effects.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Magic Weapons", "Weapon attacks are magical.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Multiattack", "Makes two fist attacks.", "icons/weapons/unarmed/punch-fist-white.webp"),
      createFeatItem("Fist", "Melee: +10 to hit, reach 5 ft. Hit: 15 (2d8+6) bludgeoning damage.", "icons/weapons/unarmed/punch-fist-white.webp"),
      createFeatItem("Slow", "Up to 3 creatures within 10 ft must make DC 17 Wisdom save. Failed: can't use reactions, speed halved until end of next turn.", "icons/magic/abjuration/shield-barrier-blue.webp")
    ]
  },

  {
    name: "Clay Golem",
    type: "npc",
    system: {
      attributes: {
        ac: { flat: 14 },
        hp: { value: 133, max: 133 }
      },
      details: {
        cr: 9,
        biography: { value: "Construct of magically hardened clay. Haste curse vulnerability, immune to many conditions." }
      },
      traits: {
        languages: { value: [] },
        senses: "darkvision 60 ft."
      },
      abilities: {
        str: { value: 20 },
        dex: { value: 9 },
        con: { value: 18 },
        int: { value: 3 },
        wis: { value: 8 },
        cha: { value: 1 }
      }
    },
    items: [
      createFeatItem("Immutable Form", "Immune to spells or effects that alter form.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Magic Resistance", "Advantage on saves vs spells and magical effects.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Haste Curse", "If haste spell cast on golem, it acts per turn for 1 minute, then can't move or use actions for 1 minute.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Fist", "Melee: +8 to hit, reach 5 ft. Hit: 12 (2d6+5) bludgeoning damage.", "icons/weapons/unarmed/punch-fist-white.webp"),
      createFeatItem("Haste", "Golem can use a bonus action on each of its turns. Lasts 1 minute, then golem is paralyzed for 1 minute.", "icons/magic/abjuration/shield-barrier-blue.webp")
    ]
  },

  {
    name: "Iron Golem",
    type: "npc",
    system: {
      attributes: {
        ac: { flat: 20 },
        hp: { value: 210, max: 210 }
      },
      details: {
        cr: 16,
        biography: { value: "Massive construct of enchanted iron. Extremely durable, immune to many conditions, regenerates from strikes." }
      },
      traits: {
        languages: { value: [] },
        senses: "darkvision 120 ft."
      },
      abilities: {
        str: { value: 24 },
        dex: { value: 8 },
        con: { value: 20 },
        int: { value: 3 },
        wis: { value: 11 },
        cha: { value: 1 }
      }
    },
    items: [
      createFeatItem("Immutable Form", "Immune to spells/effects that alter form.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Magic Resistance", "Advantage on saves vs spells/effects.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Magic Weapons", "Weapon attacks are magical.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Multiattack", "Makes two greatclub attacks or uses Poison Cloud.", "icons/weapons/unarmed/punch-fist-white.webp"),
      createFeatItem("Greatclub", "Melee: +13 to hit, reach 10 ft. Hit: 20 (3d8+7) bludgeoning damage.", "icons/weapons/unarmed/punch-fist-white.webp"),
      createFeatItem("Poison Cloud", "15 ft cone, DC 19 CON save, 22 (5d8) poison damage.", "icons/magic/air/wind-stream-air-blue.webp")
    ]
  },

  {
    name: "Wight",
    type: "npc",
    system: {
      attributes: {
        ac: { flat: 15 },
        hp: { value: 45, max: 45 }
      },
      details: {
        cr: 3,
        biography: { value: "Undead warrior, jealous and wrathful. Drains life force from victims, creates thralls from corpses." }
      },
      traits: {
        languages: { value: ["Common"] },
        senses: "darkvision 60 ft., passive perception 11"
      },
      abilities: {
        str: { value: 15 },
        dex: { value: 10 },
        con: { value: 16 },
        int: { value: 10 },
        wis: { value: 13 },
        cha: { value: 15 }
      }
    },
    items: [
      createFeatItem("Sunlight Sensitivity", "Disadvantage on attack rolls and Perception checks when in sunlight.", "icons/magic/death/death-wave-black.webp"),
      createFeatItem("Undead Fortitude", "If damage reduces it to 0 HP, must make CON save DC 5+damage. On success, dropped to 1 HP instead.", "icons/magic/death/death-wave-black.webp"),
      createFeatItem("Life Drain", "Melee: +4 to hit, reach 5 ft. Hit: 5 (1d6+2) necrotic + target loses 5 (1d6) max HP.", "icons/magic/death/death-wave-black.webp"),
      createFeatItem("Longsword", "Melee: +4 to hit, reach 5 ft. Hit: 6 (1d8+2) slashing.", "icons/weapons/swords/sword-long-purple.webp")
    ]
  },

  {
    name: "Cult Fanatic",
    type: "npc",
    system: {
      attributes: {
        ac: { flat: 13 },
        hp: { value: 33, max: 33 }
      },
      details: {
        cr: 2,
        biography: { value: "Devoted cultist with divine magic, zealous and determined. Casts healing and war spells." }
      },
      traits: {
        languages: { value: ["Common"] },
        senses: "passive perception 10"
      },
      abilities: {
        str: { value: 11 },
        dex: { value: 13 },
        con: { value: 12 },
        int: { value: 12 },
        wis: { value: 15 },
        cha: { value: 14 }
      }
    },
    items: [
      createFeatItem("Spellcasting", "WIS-based caster. Cantrips: Light, Sacred Flame. 1st (3/day): Cure Wounds, Inflict Wounds. 2nd (1/day): Hold Person.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Multiattack", "Makes two melee attacks.", "icons/weapons/unarmed/punch-fist-white.webp"),
      createFeatItem("Scimitar", "Melee: +3 to hit, reach 5 ft. Hit: 4 (1d6+1) slashing.", "icons/weapons/swords/scimitar-curved-white.webp"),
      createFeatItem("Dagger", "Melee/Ranged: +3 to hit, reach 5 ft or 20/60 ft. Hit: 3 (1d4+1) piercing.", "icons/weapons/daggers/dagger-curved-white.webp")
    ]
  },

  {
    name: "Cultist",
    type: "npc",
    system: {
      attributes: {
        ac: { flat: 12 },
        hp: { value: 16, max: 16 }
      },
      details: {
        cr: 0.125,
        biography: { value: "Lowly cultist, believer in the cult's cause. Weak combatant but numerous." }
      },
      traits: {
        languages: { value: ["Common"] },
        senses: "passive perception 10"
      },
      abilities: {
        str: { value: 10 },
        dex: { value: 12 },
        con: { value: 10 },
        int: { value: 11 },
        wis: { value: 10 },
        cha: { value: 10 }
      }
    },
    items: [
      createFeatItem("Scimitar", "Melee: +3 to hit, reach 5 ft. Hit: 4 (1d6+1) slashing.", "icons/weapons/swords/scimitar-curved-white.webp"),
      createFeatItem("Light Crossbow", "Ranged: +3 to hit, 80/320 ft. Hit: 5 (1d8+1) piercing.", "icons/weapons/crossbows/crossbow-light-wood.webp")
    ]
  },

  {
    name: "Barbed Devil",
    type: "npc",
    system: {
      attributes: {
        ac: { flat: 15 },
        hp: { value: 110, max: 110 }
      },
      details: {
        cr: 5,
        biography: { value: "Infernal fiend from Hell, covered in barbs. Dangerous combatant with regeneration and reactive damage." }
      },
      traits: {
        languages: { value: ["Infernal"] },
        senses: "darkvision 120 ft., passive perception 12"
      },
      abilities: {
        str: { value: 16 },
        dex: { value: 17 },
        con: { value: 18 },
        int: { value: 12 },
        wis: { value: 14 },
        cha: { value: 14 }
      }
    },
    items: [
      createFeatItem("Barbed Hide", "At start of turn, any creature grappling the devil takes 5 (1d10) piercing damage.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Regeneration", "Regains 5 HP at start of turn if has at least 1 HP. If takes cold damage, this doesn't function until end of next turn.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Magic Resistance", "Advantage on saves vs spells and magical effects.", "icons/magic/abjuration/shield-barrier-blue.webp"),
      createFeatItem("Multiattack", "Makes three attacks: two with claws, one with tail.", "icons/weapons/unarmed/punch-fist-white.webp"),
      createFeatItem("Claw", "Melee: +5 to hit, reach 5 ft. Hit: 6 (1d6+3) piercing.", "icons/weapons/claws/claw-blood-red.webp"),
      createFeatItem("Tail", "Melee: +5 to hit, reach 5 ft. Hit: 10 (2d6+3) piercing.", "icons/weapons/claws/claw-blood-red.webp"),
      createFeatItem("Reactive", "When damaged, can move up to half its speed toward the attacker.", "icons/magic/abjuration/shield-barrier-blue.webp")
    ]
  }
];

// Create all creatures (search packs first, then fallback to embedded data)
async function createAllCreatures() {
  let imported = 0;
  let created = 0;
  let failed = 0;

  for (const creatureData of CREATURES) {
    console.log(`🧟 ${creatureData.name}...`);

    try {
      // Step 1: Search packs
      const found = await findActorInPacks(creatureData.name);

      if (found) {
        // Step 2: Import from pack
        const imported_actor = await importActorFromPack(found.packId, found.documentId);
        if (imported_actor) {
          console.log(`   ✓ ${creatureData.name} imported from pack`);
          imported++;
          continue;
        }
      }

      // Step 3: Fall back to creating from embedded data
      console.log(`   ⚠ Not found in packs, creating from embedded data...`);
      await Actor.create(creatureData);
      console.log(`   ✓ ${creatureData.name} created from embedded data`);
      created++;

    } catch (error) {
      console.error(`   ✗ Error with ${creatureData.name}:`, error.message);
      failed++;
    }
  }

  console.log("\n╔════════════════════════════════════════════════════════╗");
  console.log("║  STEP 2 COMPLETE                                       ║");
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log(`\n✓ Imported from packs: ${imported}/9`);
  console.log(`✓ Created from embedded: ${created}/9`);

  if (imported + created === 9) {
    console.log("\n📋 All 9 creatures ready!");
    console.log("📋 NEXT STEP: Run STEP3-create-antagonists.js\n");
  } else {
    console.log(`\n⚠️  ${failed} creatures failed. Check errors above.\n`);
  }
}

createAllCreatures();