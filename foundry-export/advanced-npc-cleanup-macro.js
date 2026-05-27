/**
 * FOUNDRY VTT - Advanced NPC Cleanup & Improvement Macro
 *
 * This macro provides detailed cleanup with compendia searching and NPC improvement.
 * Run in Foundry Console (F12 > Console tab)
 *
 * Features:
 * 1. Identifies which NPCs can be imported from compendia
 * 2. Creates a checklist of what needs manual work
 * 3. Adds weapons and spells from compendia
 * 4. Organizes into temple-of-tiamat folder
 */

const PARTY_CHARACTERS = ["Axar Runes", "Daxx Drake", "Frygtløs", "Twilight Ventress"];

// Mapping: NPC Name -> Compendia Stat Block Name
const COMPENDIA_LOOKUP = {
  "Dagult Neverember": { pack: "dnd5e.creatures", name: "Noble" },
  "Ulder Ravengard": { pack: "dnd5e.creatures", name: "Knight" },
  "Remallia Haventree": { pack: "dnd5e.creatures", name: "Assassin" },
  "Ontharr Frume": { pack: "dnd5e.creatures", name: "Priest" },
  "Delaan Winterhound": { pack: "dnd5e.creatures", name: "Veteran" },
  "Sir Isteval": { pack: "dnd5e.creatures", name: "Knight" },
  "Taern Hornblade": { pack: "dnd5e.creatures", name: "Mage" },
  "King Melandrach": { pack: "dnd5e.creatures", name: "Mage" },
  "Ambassador Brawnanvil": { pack: "dnd5e.creatures", name: "Noble" },
  "Crimson Maccath": { pack: "dnd5e.creatures", name: "Mage" },
  "Nyh Ilmichh": { pack: "dnd5e.creatures", name: "Mage" },
  "Naergoth Bladelord": { pack: "dnd5e.creatures", name: "Wight" },
  "Severin": { pack: "dnd5e.creatures", name: "Cult Fanatic" },
  "Rath Modar": { pack: "dnd5e.creatures", name: "Red Wizard" },
  "Cultist": { pack: "dnd5e.creatures", name: "Cultist" },
  "Cult Fanatic": { pack: "dnd5e.creatures", name: "Cult Fanatic" }
};

// Spells to add to specific NPCs
const NPC_SPELLS = {
  "Taern Hornblade": ["Fire Bolt", "Light", "Magic Missile", "Shield", "Thunderwave", "Scorching Ray", "Mirror Image"],
  "Crimson Maccath": ["Fire Bolt", "Burning Hands", "Magic Missile", "Fireball", "Scorching Ray"],
  "Nyh Ilmichh": ["Acid Splash", "Magic Missile", "Cone of Cold", "Lightning Bolt", "Scorching Ray"],
  "Mage": ["Fire Bolt", "Light", "Magic Missile", "Shield", "Scorching Ray"],
  "Priest": ["Guidance", "Light", "Cure Wounds", "Bless", "Guiding Bolt", "Spirit Guardians"]
};

// UTILITY FUNCTIONS

/**
 * Find a document in a compendia pack
 */
async function findInCompendium(packId, searchName) {
  const pack = game.packs.get(packId);
  if (!pack) {
    console.warn(`  ⚠️  Pack not found: ${packId}`);
    return null;
  }

  const index = pack.index;
  const entry = index.find(e => e.name.toLowerCase() === searchName.toLowerCase());

  if (!entry) return null;

  try {
    return await pack.getDocument(entry._id);
  } catch (error) {
    console.warn(`  ⚠️  Error loading ${searchName} from ${packId}: ${error.message}`);
    return null;
  }
}

/**
 * Create or get temple-of-tiamat folder
 */
async function getOrCreateFolder(folderName = "temple-of-tiamat") {
  let folder = game.folders.find(f => f.name === folderName && f.type === "Actor");
  if (!folder) {
    folder = await Folder.create({
      name: folderName,
      type: "Actor"
    });
  }
  return folder;
}

/**
 * Import actor from compendia to world
 */
async function importFromCompendia(packId, actorName, newName = null, folderId = null) {
  const actor = await findInCompendium(packId, actorName);
  if (!actor) {
    return null;
  }

  // Clone and create
  const actorData = actor.toObject();
  actorData.name = newName || actorName;
  if (folderId) {
    actorData.folder = folderId;
  }

  return await Actor.create(actorData);
}

/**
 * Add spells to an actor from compendia
 */
async function addSpellsToActor(actor, spellNames) {
  const spellPack = game.packs.get("dnd5e.spells");
  if (!spellPack) {
    console.warn("  ⚠️  dnd5e.spells pack not found");
    return;
  }

  const index = spellPack.index;
  const itemsToAdd = [];

  for (const spellName of spellNames) {
    const entry = index.find(e => e.name.toLowerCase() === spellName.toLowerCase());
    if (entry) {
      try {
        const spell = await spellPack.getDocument(entry._id);
        itemsToAdd.push(spell.toObject());
      } catch (error) {
        console.warn(`    ⚠️  Could not load spell: ${spellName}`);
      }
    } else {
      console.warn(`    ⚠️  Spell not found: ${spellName}`);
    }
  }

  if (itemsToAdd.length > 0) {
    await actor.createEmbeddedDocuments("Item", itemsToAdd);
    console.log(`    ✓ Added ${itemsToAdd.length} spells`);
  }
}

/**
 * Add weapons to an actor
 */
async function addWeaponToActor(actor, weaponName) {
  const itemPack = game.packs.get("dnd5e.items");
  if (!itemPack) return false;

  const index = itemPack.index;
  const entry = index.find(e => e.name.toLowerCase() === weaponName.toLowerCase());
  if (!entry) return false;

  try {
    const weapon = await itemPack.getDocument(entry._id);
    await actor.createEmbeddedDocuments("Item", [weapon.toObject()]);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Analyze current actors and report
 */
function analyzeCurrentActors() {
  console.log("\n📊 CURRENT ACTOR ANALYSIS\n");

  const partyCount = game.actors.filter(a => PARTY_CHARACTERS.includes(a.name)).length;
  const otherCount = game.actors.filter(a => !PARTY_CHARACTERS.includes(a.name)).length;

  console.log(`  Party Characters: ${partyCount}`);
  console.log(`  Other Actors: ${otherCount}`);
  console.log(`  Total: ${game.actors.size}`);

  console.log("\n  Party Characters Found:");
  for (const char of PARTY_CHARACTERS) {
    const actor = game.actors.getName(char);
    if (actor) {
      console.log(`    ✓ ${char}`);
    } else {
      console.log(`    ✗ ${char} (missing)`);
    }
  }

  return { partyCount, otherCount };
}

/**
 * Generate cleanup report
 */
async function generateCleanupReport() {
  console.log("\n📋 CLEANUP REPORT\n");
  console.log("  NPCs to find in compendia:");

  const notFound = [];
  const found = [];

  for (const [npcName, lookup] of Object.entries(COMPENDIA_LOOKUP)) {
    const actor = await findInCompendium(lookup.pack, lookup.name);
    if (actor) {
      console.log(`    ✓ ${npcName} → ${lookup.name} (found in ${lookup.pack})`);
      found.push(npcName);
    } else {
      console.log(`    ⚠️  ${npcName} → ${lookup.name} (NOT FOUND - create manually)`);
      notFound.push(npcName);
    }
  }

  console.log(`\n  Summary:`);
  console.log(`    Found: ${found.length}/${Object.keys(COMPENDIA_LOOKUP).length}`);
  console.log(`    Manual: ${notFound.length}`);

  return { found, notFound };
}

/**
 * Check available compendia
 */
function checkCompendia() {
  console.log("\n📦 AVAILABLE COMPENDIA PACKS\n");

  const packs = game.packs.filter(p => p.type === "Actor");
  console.log(`  Actor Packs: ${packs.size}`);
  for (const pack of packs) {
    console.log(`    - ${pack.metadata.id}: ${pack.metadata.name}`);
  }

  const itemPacks = game.packs.filter(p => p.type === "Item");
  console.log(`\n  Item Packs: ${itemPacks.size}`);
  for (const pack of itemPacks) {
    console.log(`    - ${pack.metadata.id}: ${pack.metadata.name}`);
  }
}

/**
 * MAIN EXECUTION
 */
async function advancedNPCCleanup() {
  console.log("╔═══════════════════════════════════════════════════════╗");
  console.log("║  ADVANCED NPC CLEANUP & IMPROVEMENT ANALYZER          ║");
  console.log("╚═══════════════════════════════════════════════════════╝\n");

  try {
    // Step 1: Analyze
    analyzeCurrentActors();

    // Step 2: Check Compendia
    checkCompendia();

    // Step 3: Generate Report
    const { found, notFound } = await generateCleanupReport();

    // Step 4: Instructions
    console.log("\n╔═══════════════════════════════════════════════════════╗");
    console.log("║  NEXT STEPS                                           ║");
    console.log("╚═══════════════════════════════════════════════════════╝\n");

    console.log("1️⃣  MANUAL DELETION:");
    console.log("    - Open Actors folder in Foundry");
    console.log("    - Delete ALL actors EXCEPT party characters");
    console.log("    - This clears the messy pile\n");

    console.log("2️⃣  IMPORT FROM COMPENDIA:");
    console.log(`    - ${found.length} NPCs can be imported automatically`);
    console.log("    - Use Foundry's Actor > Import from Compendium\n");

    console.log("3️⃣  MANUAL CREATION:");
    console.log(`    - ${notFound.length} NPCs need to be created manually`);
    notFound.forEach(npc => console.log(`      • ${npc}`));
    console.log("\n    See NPC-CLEANUP-PLAN.md for 2024-rules templates\n");

    console.log("4️⃣  ADD ITEMS TO ALL:");
    console.log("    - Add weapons from dnd5e.items compendia");
    console.log("    - Add spells to spellcasters");
    console.log("    - Configure Legendary Actions for bosses\n");

    console.log("5️⃣  ORGANIZE:");
    console.log("    - Move all to 'temple-of-tiamat' folder");
    console.log("    - Verify no missing items/spells\n");

    console.log("╔═══════════════════════════════════════════════════════╗");
    console.log("║  ℹ️  FULL INSTRUCTIONS IN: NPC-CLEANUP-PLAN.md       ║");
    console.log("╚═══════════════════════════════════════════════════════╝");

  } catch (error) {
    console.error("❌ Error during analysis:", error);
  }
}

// RUN IT
advancedNPCCleanup();
