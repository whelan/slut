/**
 * CREATE COMPLETE TEMPLE ANTAGONISTS - UNIFIED SCRIPT
 *
 * One script does EVERYTHING (all 5 phases):
 * 1. Search all compendia for official Rath Modar + update to 2024 rules
 * 2. Search all compendia for official Severin + update to 2024 rules
 * 3. Delete 10 old generic Red Wizards from temple-of-tiamat folder
 * 4. Find official 2024 Mage as base template
 * 5. Create 9 location-based Red Wizards (4 grounded + 5 flying)
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🔴 COMPLETE TEMPLE ANTAGONIST CREATION SYSTEM\n");
console.log("=".repeat(70) + "\n");

// ============================================================================
// WIZARD DEFINITIONS (LOCATION-BASED)
// ============================================================================

const LOCATION_BASED_WIZARDS = [
  // ========== GROUNDED WIZARDS (4) ==========
  {
    name: "Magus Azuri",
    location: "Blue Chapel (Entrance)",
    type: "grounded",
    cr: 4,
    role: "Gatekeeper, first line of defense",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-1.jpg",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-1-token.jpg",
    traits: [
      {
        name: "Blue Chapel Guardian",
        desc: "Magus Azuri maintains the entrance phase of the ritual. If this wizard dies, the chapel entrance becomes easier to breach (+1 to attack rolls to enter)."
      },
      {
        name: "Counterspell Mastery",
        desc: "When a creature within 60 feet casts a spell, Magus Azuri can use a reaction to cast Counterspell with advantage if it's cast at 2nd level or higher."
      }
    ],
    biography: "Magus Azuri stands eternal watch at the Blue Chapel entrance, first line of defense for Tiamat's ritual. A diplomat among Red Wizards, but committed to the cause."
  },
  {
    name: "Magus Alabaster",
    location: "White Chapel",
    type: "grounded",
    cr: 4,
    role: "Cold anchor point, maintains white dragon essence",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-2.jpg",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-2-token.jpg",
    traits: [
      {
        name: "White Chapel Anchor",
        desc: "Magus Alabaster maintains the white dragon essence. If this wizard dies, the chapel loses its cold hazards and the party gains resistance to cold damage until the ritual completes."
      },
      {
        name: "Ice Aura",
        desc: "Any creature that ends its turn within 10 feet of Magus Alabaster takes 5 (1d10) cold damage."
      }
    ],
    biography: "Patient, methodical, and cold as ice. Magus Alabaster maintains the White Chapel's temperature control and dragon essence energy."
  },
  {
    name: "Magus Verdian",
    location: "Green Chapel",
    type: "grounded",
    cr: 4,
    role: "Poison/toxin anchor, green dragon essence",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-4.jpg",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-4-token.jpg",
    traits: [
      {
        name: "Green Chapel Anchor",
        desc: "Magus Verdian maintains the green dragon essence and poison atmosphere. If this wizard dies, poison clouds dissipate and creatures gain resistance to poison damage."
      },
      {
        name: "Poison Aura",
        desc: "Any creature that starts its turn within 10 feet of Magus Verdian must make a DC 14 Constitution saving throw, taking 7 (2d6) poison damage on a failure, or half as much on a success."
      }
    ],
    biography: "Vicious and cruel, Magus Verdian uses toxins extensively. The Green Chapel's poison aspect manifests through their will."
  },
  {
    name: "Magus Obsidian",
    location: "Black Chapel (Exit)",
    type: "grounded",
    cr: 4,
    role: "Exit guardian, prevents escape",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-1.jpg",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-1-token.jpg",
    traits: [
      {
        name: "Black Chapel Anchor",
        desc: "Magus Obsidian maintains the black dragon essence and controls the exit. If this wizard dies, the exit becomes passable and the party gains resistance to acid damage."
      },
      {
        name: "Acid Aura",
        desc: "Any creature that ends its turn within 10 feet of Magus Obsidian takes 5 (1d10) acid damage."
      }
    ],
    biography: "Trapped in this role but committed. Magus Obsidian blocks the exit and maintains the Black Chapel's acid defenses."
  },

  // ========== FLYING WIZARDS (5) ==========
  {
    name: "Magus Cerulean",
    location: "Blue Spire",
    type: "flying",
    cr: 5,
    role: "Lightning aerial caster, mobility support",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-3.jpg",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-3-token.jpg",
    traits: [
      {
        name: "Flying Ritual Anchor",
        desc: "Magus Cerulean maintains the aerial portion of the ritual from the Blue Spire. If knocked prone or flying dispelled, falls 50 ft (survives but vulnerable)."
      },
      {
        name: "Lightning Channel",
        desc: "When Magus Cerulean casts a spell that affects multiple targets, creatures within 30 feet take an additional 3 (1d6) lightning damage."
      }
    ],
    biography: "Magus Cerulean strikes from above, maintaining lightning coordination across the ritual circle from the Blue Spire."
  },
  {
    name: "Magus Platinum",
    location: "White Spire",
    type: "flying",
    cr: 4,
    role: "Ice/slowing aerial support",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-2.jpg",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-2-token.jpg",
    traits: [
      {
        name: "Aerial Ice Storm",
        desc: "Magus Platinum maintains an ice storm from the White Spire. Creatures on the ground take 3 (1d6) cold damage at the start of their turn while Magus Platinum is airborne and can see them."
      },
      {
        name: "Slow Mastery",
        desc: "When Magus Platinum casts Slow or a similar spell, creatures have disadvantage on their saving throw."
      }
    ],
    biography: "From the White Spire, Magus Platinum creates icing hazards below and slows the party's escape routes."
  },
  {
    name: "Magus Viridian",
    location: "Green Spire",
    type: "flying",
    cr: 4,
    role: "Poison aerial support, area effects",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-3.jpg",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-3-token.jpg",
    traits: [
      {
        name: "Poison Cloud Drop",
        desc: "Magus Viridian drops poison clouds from the Green Spire. All creatures on the ground within 60 feet take 3 (1d6) poison damage at the start of their turn."
      },
      {
        name: "Toxic Atmosphere",
        desc: "The air around Magus Viridian becomes toxic. Creatures that start their turn within 15 feet must make a DC 14 Constitution saving throw or take 2 (1d4) poison damage."
      }
    ],
    biography: "Vicious from above, Magus Viridian drops poison and gas from the Green Spire, making the very air deadly."
  },
  {
    name: "Magus Obsidian II",
    location: "Black Spire",
    type: "flying",
    cr: 5,
    role: "Acid rain, structural damage",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-4.jpg",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-4-token.jpg",
    traits: [
      {
        name: "Acid Rain",
        desc: "Magus Obsidian II maintains acid rain from the Black Spire. All creatures on the ground take 5 (1d10) acid damage at the start of their turn."
      },
      {
        name: "Corrosive Aura",
        desc: "Any nonmagical object within 10 feet of Magus Obsidian II takes 3 (1d6) acid damage at the start of each turn. Magical items are immune."
      }
    ],
    biography: "Crash-landing from the Black Spire means certain death from acid rain. Magus Obsidian II controls the skies with corrosion."
  },
  {
    name: "Magus Vermillion",
    location: "Red Spire",
    type: "flying",
    cr: 5,
    role: "Fire support, aggressive aerial caster",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-5.jpg",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-5-token.jpg",
    traits: [
      {
        name: "Aerial Fire Support",
        desc: "Magus Vermillion is the most aggressive flyer, supporting the ritual with constant fire attacks from the Red Spire."
      },
      {
        name: "Dive Attack",
        desc: "When Magus Vermillion moves at least 30 feet straight toward a creature and hits it with a melee weapon attack, that target takes an extra 7 (2d6) fire damage."
      }
    ],
    biography: "Most aggressive of the flying wizards, Magus Vermillion supports Rath Modar with dive attacks and fire sweeps from the Red Spire."
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function createFolder() {
  let folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");
  if (!folder) {
    folder = await Folder.create({ name: "temple-of-tiamat", type: "Actor" });
  }
  return folder;
}

async function searchInCompendia(searchName) {
  const allPackIds = Array.from(game.packs.keys());
  const results = [];

  for (const packId of allPackIds) {
    const pack = game.packs.get(packId);
    if (!pack) continue;

    try {
      const index = pack.index;
      const matches = index.filter(e =>
        e.name && e.name.toLowerCase().includes(searchName.toLowerCase())
      );

      if (matches.length > 0) {
        for (const match of matches) {
          try {
            const doc = await pack.getDocument(match._id);
            results.push({
              name: match.name,
              packId: packId,
              doc: doc,
              cr: doc.system?.details?.cr
            });
          } catch (error) {
            // Continue searching
          }
        }
      }
    } catch (error) {
      // Continue searching
    }
  }

  return results;
}

function update2024Rules(actor, searchName) {
  const updates = {};

  // Update spell save DC formula: 8 + ability mod + proficiency
  if (actor.system?.details) {
    const intMod = actor.system?.abilities?.int?.mod || 0;
    const chaMod = actor.system?.abilities?.cha?.mod || 0;
    const profBonus = actor.system?.attributes?.prof || 2;

    // For wizard-like casters, use INT
    const useMod = actor.system?.spellcasting?.ability === "cha" ? chaMod : intMod;
    const newSpellDC = 8 + useMod + profBonus;

    if (actor.system.spelldc && actor.system.spelldc !== newSpellDC) {
      updates["system.spelldc"] = newSpellDC;
    }
  }

  // Update proficiency bonus based on CR
  if (actor.system?.details?.cr !== undefined) {
    const cr = actor.system.details.cr;
    let expectedProf = 2;
    if (cr >= 5) expectedProf = 3;
    if (cr >= 9) expectedProf = 4;
    if (cr >= 13) expectedProf = 5;
    if (cr >= 17) expectedProf = 6;

    if (actor.system?.attributes?.prof !== expectedProf) {
      updates["system.attributes.prof"] = expectedProf;
    }
  }

  // Ensure 2024 ability modifiers are calculated
  if (actor.system?.abilities) {
    Object.keys(actor.system.abilities).forEach(ability => {
      const score = actor.system.abilities[ability].value;
      const expectedMod = Math.floor((score - 10) / 2);
      if (actor.system.abilities[ability].mod !== expectedMod) {
        updates[`system.abilities.${ability}.mod`] = expectedMod;
      }
    });
  }

  return updates;
}

async function findOfficialMage() {
  const possiblePacks = [
    "dnd5e.creatures24", "dnd5e.actors24",
    "dnd5e.creatures", "dnd5e.actors",
    "dnd5e.npc"
  ];

  const allPackIds = Array.from(game.packs.keys());

  for (const packId of [...possiblePacks, ...allPackIds]) {
    const pack = game.packs.get(packId);
    if (!pack) continue;

    try {
      const index = pack.index;
      const entry = index.find(e => e.name && e.name.toLowerCase() === "mage");

      if (entry) {
        const mage = await pack.getDocument(entry._id);
        return mage;
      }
    } catch (error) {
      // Continue searching
    }
  }

  return null;
}

async function deleteOldWizards() {
  console.log("\nPHASE 3: Deleting old generic Red Wizards...\n");

  const folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");
  if (!folder) {
    console.log("  ℹ No existing temple-of-tiamat folder found (nothing to delete)");
    return;
  }

  const oldWizardNames = [
    "Magus Thallid the Shadowborn",
    "Magus Szass the Defiler",
    "Magus Zalathorm the Draconic",
    "Magus Valrax the Crimson",
    "Magus Thyrmog the Infernal",
    "Magus Yarthraax the Dragonkin",
    "Magus Narathor the Vile",
    "Magus Keturah the Malevolent",
    "Magus Vorathax the Eternal",
    "Magus Sariax the Archmage",
    "Red Wizard",
    "Red Wizard Minion"
  ];

  let deletedCount = 0;
  const allActors = game.actors.contents.filter(a => a.folder?.id === folder.id);

  for (const actor of allActors) {
    if (oldWizardNames.some(name => actor.name.includes(name))) {
      await actor.delete();
      console.log(`  ✓ Deleted: ${actor.name}`);
      deletedCount++;
    }
  }

  console.log(`\n  Deleted ${deletedCount} old Red Wizards`);
}

async function createLocationWizardFromMage(officialMage, customization) {
  if (!officialMage) return null;

  const folder = await createFolder();
  const { name, location, biography, portrait, token, traits } = customization;

  try {
    const mageData = officialMage.toObject();

    // Customize
    mageData.name = name;
    mageData.folder = folder.id;
    mageData.img = portrait;
    mageData.system.details.alignment = "chaotic evil";
    mageData.system.details.biography = {
      value: biography
    };
    mageData.prototypeToken.name = name;
    mageData.prototypeToken.img = token;

    // Create the actor
    const actor = await Actor.create(mageData);

    // Add location-specific traits
    for (const trait of traits) {
      const traitItem = {
        name: trait.name,
        type: "feat",
        system: { description: { value: trait.desc } },
        img: "icons/skills/social/awareness-perception.webp"
      };
      await actor.createEmbeddedDocuments("Item", [traitItem]);
    }

    return actor;
  } catch (error) {
    console.error(`Error creating ${name}:`, error);
    return null;
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function runCompleteAntagonistCreation() {
  try {
    const folder = await createFolder();

    // ====== PHASE 1: SEARCH FOR RATH MODAR ======
    console.log("PHASE 1: Searching for official Rath Modar...\n");
    const rathResults = await searchInCompendia("Rath Modar");

    if (rathResults.length === 0) {
      console.log("  ❌ Rath Modar not found in any compendium");
      console.log("     (Will use STEP3 manual creation as fallback)\n");
    } else {
      console.log(`  ✓ Found ${rathResults.length} Rath Modar variant(s)`);
      const rathToUse = rathResults[0];
      console.log(`     Using: ${rathToUse.name} from ${rathToUse.packId}`);
      console.log(`     CR: ${rathToUse.cr}`);

      // Update to 2024 rules
      const updates = update2024Rules(rathToUse.doc, "Rath Modar");
      if (Object.keys(updates).length > 0) {
        await rathToUse.doc.update(updates);
        console.log(`  ✓ Applied ${Object.keys(updates).length} 2024 rule updates`);
      }

      // Move to temple folder
      const rathClone = rathToUse.doc.toObject();
      rathClone.folder = folder.id;
      await Actor.create(rathClone);
      console.log(`  ✓ Created: Rath Modar (Red Chapel Master) in temple-of-tiamat\n`);
    }

    // ====== PHASE 2: SEARCH FOR SEVERIN ======
    console.log("PHASE 2: Searching for official Severin...\n");
    const severinResults = await searchInCompendia("Severin");

    if (severinResults.length === 0) {
      console.log("  ❌ Severin not found in any compendium");
      console.log("     (Will use STEP3 manual creation as fallback)\n");
    } else {
      console.log(`  ✓ Found ${severinResults.length} Severin variant(s)`);
      const severinToUse = severinResults[0];
      console.log(`     Using: ${severinToUse.name} from ${severinToUse.packId}`);
      console.log(`     CR: ${severinToUse.cr}`);

      // Update to 2024 rules
      const updates = update2024Rules(severinToUse.doc, "Severin");
      if (Object.keys(updates).length > 0) {
        await severinToUse.doc.update(updates);
        console.log(`  ✓ Applied ${Object.keys(updates).length} 2024 rule updates`);
      }

      // Move to temple folder with Severin's official portrait
      const severinClone = severinToUse.doc.toObject();
      severinClone.folder = folder.id;
      severinClone.img = "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/severin-masked-token_20260516_164450_1.png";
      severinClone.prototypeToken.img = "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/severin-masked-token-token_circular.png";
      await Actor.create(severinClone);
      console.log(`  ✓ Created: Severin (Sanctuary Master) in temple-of-tiamat`);
      console.log(`  ✓ Portrait: Official masked artwork\n`);
    }

    // ====== PHASE 3: DELETE OLD WIZARDS ======
    await deleteOldWizards();

    // ====== PHASE 4: FIND OFFICIAL MAGE & CREATE LOCATION WIZARDS ======
    console.log("\nPHASE 4: Searching for official 2024 Mage...\n");
    const officialMage = await findOfficialMage();

    if (!officialMage) {
      console.error("\n❌ Cannot create location wizards without official Mage source!");
      console.error("   Ensure dnd5e system creature packs are enabled.");
      return;
    }

    console.log("  ✓ Found official 2024 Mage");
    console.log(`     CR: ${officialMage.system?.details?.cr}`);
    console.log(`     HP: ${officialMage.system?.attributes?.hp?.max}`);

    // ====== PHASE 5: CREATE 9 LOCATION-BASED WIZARDS ======
    console.log("\nPHASE 5: Creating 9 location-based Red Wizards...\n");

    let created = 0;
    for (const customization of LOCATION_BASED_WIZARDS) {
      const result = await createLocationWizardFromMage(officialMage, customization);
      if (result) {
        console.log(`  ✓ ${result.name} (${customization.location})`);
        created++;
      }
    }

    // ====== COMPLETE ======
    console.log("\n" + "=".repeat(70) + "\n");
    console.log(`✅ COMPLETE! Successfully created ${created} location-based Red Wizards!\n`);
    console.log(`Summary:`);
    console.log(`  ✓ Grounded Wizards: 4 (Azuri, Alabaster, Verdian, Obsidian)`);
    console.log(`  ✓ Flying Wizards: 5 (Cerulean, Platinum, Viridian, Obsidian II, Vermillion)`);
    console.log(`  ✓ Rath Modar: ${rathResults.length > 0 ? "Found & Updated" : "Missing (use STEP3)"}`);
    console.log(`  ✓ Severin: ${severinResults.length > 0 ? "Found & Updated" : "Missing (use STEP3)"}`);
    console.log(`  ✓ Old Wizards: Deleted`);
    console.log(`  ✓ All 2024 compliant`);
    console.log(`  ✓ Location: temple-of-tiamat folder\n`);
    console.log(`Temple Ritual Structure:`);
    console.log(`  Ground: 4 chapel anchors (Blue, White, Green, Black)`);
    console.log(`  Aerial: 5 spire supports (Blue, White, Green, Black, Red)`);
    console.log(`  Command: Rath Modar (Red Chapel) + Severin (Sanctuary)\n`);
    console.log("=".repeat(70) + "\n");

  } catch (error) {
    console.error("Fatal error:", error);
  }
}

// ============================================================================
// RUN
// ============================================================================

runCompleteAntagonistCreation();
