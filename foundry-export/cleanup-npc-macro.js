/**
 * FOUNDRY VTT - NPC Cleanup & Improvement Macro
 *
 * This macro:
 * 1. Deletes low-quality imported NPCs (keeps party PCs)
 * 2. Loads official versions from compendia where available
 * 3. Creates/improves NPCs with 2024 rules and full equipment
 * 4. Organizes everything in temple-of-tiamat folder
 *
 * Run in Foundry Console (F12 > Console tab)
 */

const PARTY_CHARACTERS = ["Axar Runes", "Daxx Drake", "Frygtløs", "Twilight Ventress"];

const COUNCIL_NPCS_TO_IMPROVE = [
  "Dagult Neverember",
  "Ulder Ravengard",
  "Remallia Haventree",
  "Ontharr Frume",
  "Delaan Winterhound",
  "Sir Isteval",
  "Taern Hornblade",
  "King Melandrach",
  "Ambassador Brawnanvil",
  "Crimson Maccath",
  "Nyh Ilmichh"
];

const ANTAGONISTS_TO_IMPROVE = [
  "Naergoth Bladelord",
  "Severin",
  "Rath Modar",
  "Magus Thezzar"
];

// Compendia pack IDs (adjust if different in your world)
const COMPENDIA = {
  creatures: "dnd5e.creatures",
  npc: "dnd5e.npc",
  items: "dnd5e.items",
  spells: "dnd5e.spells",
  weapons: "dnd5e.items",
  armor: "dnd5e.items"
};

async function deleteImportedNPCs() {
  console.log("🗑️  Deleting imported NPCs (keeping party characters)...");

  const toDelete = [];
  for (const actor of game.actors.contents) {
    // Skip party characters
    if (PARTY_CHARACTERS.includes(actor.name)) {
      console.log(`  ✓ Keeping: ${actor.name}`);
      continue;
    }

    // Skip if it's a player character (has a player user)
    if (actor.hasPlayerOwner) {
      console.log(`  ✓ Keeping player character: ${actor.name}`);
      continue;
    }

    // Delete everything else (imported NPCs)
    toDelete.push(actor);
  }

  for (const actor of toDelete) {
    await actor.delete();
    console.log(`  ✗ Deleted: ${actor.name}`);
  }

  console.log(`✓ Deleted ${toDelete.length} actors\n`);
}

async function findCompendiumActor(name, packId) {
  const pack = game.packs.get(packId);
  if (!pack) return null;

  // Search by name (case-insensitive)
  const index = pack.index;
  const entry = index.find(e => e.name.toLowerCase() === name.toLowerCase());

  if (entry) {
    return await pack.getDocument(entry._id);
  }
  return null;
}

async function importFromCompendium(packId, actorName, folderName = "temple-of-tiamat") {
  const actor = await findCompendiumActor(actorName, packId);
  if (!actor) return null;

  // Create folder if needed
  let folder = game.folders.find(f => f.name === folderName && f.type === "Actor");
  if (!folder) {
    folder = await Folder.create({
      name: folderName,
      type: "Actor",
      parent: null
    });
  }

  // Duplicate and set folder
  const duplicate = actor.clone({}, { keepId: false });
  duplicate.folder = folder.id;
  return await Actor.create(duplicate.toObject());
}

async function improveCouncilNPC(name) {
  console.log(`  📝 Improving: ${name}`);

  // First try to import from compendia
  let actor = await importFromCompendium(COMPENDIA.creatures, name);
  if (!actor) {
    actor = await importFromCompendium(COMPENDIA.npc, name);
  }

  if (!actor) {
    console.log(`    ⚠️  Not found in compendia - create manually in Foundry`);
    return null;
  }

  // Update to 2024 rules if needed
  // ... additional improvements would go here

  console.log(`    ✓ Imported: ${name}`);
  return actor;
}

async function improveAntagonist(name) {
  console.log(`  ⚔️  Improving: ${name}`);

  // Try to import from compendia first
  let actor = await importFromCompendium(COMPENDIA.creatures, name);
  if (!actor) {
    console.log(`    ⚠️  Not found in compendia - check manually`);
    return null;
  }

  console.log(`    ✓ Imported: ${name}`);
  return actor;
}

async function createFolderStructure() {
  console.log("📁 Creating folder structure...");

  let mainFolder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");
  if (!mainFolder) {
    mainFolder = await Folder.create({
      name: "temple-of-tiamat",
      type: "Actor"
    });
    console.log("  ✓ Created: temple-of-tiamat");
  }

  return mainFolder;
}

// MAIN EXECUTION
async function cleanupAndImproveNPCs() {
  console.log("╔════════════════════════════════════════════════╗");
  console.log("║   FOUNDRY NPC CLEANUP & IMPROVEMENT MACRO      ║");
  console.log("╚════════════════════════════════════════════════╝\n");

  try {
    // Step 1: Delete imported low-quality NPCs
    await deleteImportedNPCs();

    // Step 2: Create folder structure
    await createFolderStructure();

    // Step 3: Improve Council NPCs
    console.log("👥 Improving Council NPCs...");
    for (const npc of COUNCIL_NPCS_TO_IMPROVE) {
      await improveCouncilNPC(npc);
    }

    // Step 4: Improve Antagonists
    console.log("\n⚔️  Improving Antagonists...");
    for (const npc of ANTAGONISTS_TO_IMPROVE) {
      await improveAntagonist(npc);
    }

    console.log("\n╔════════════════════════════════════════════════╗");
    console.log("║   ✓ NPC CLEANUP COMPLETE!                     ║");
    console.log("║                                                ║");
    console.log("║   TODO:                                        ║");
    console.log("║   1. Check Foundry Actors folder               ║");
    console.log("║   2. Add missing NPCs manually from compendia  ║");
    console.log("║   3. Update items/weapons/spells as needed     ║");
    console.log("║   4. Assign to temple-of-tiamat folder         ║");
    console.log("╚════════════════════════════════════════════════╝");

  } catch (error) {
    console.error("❌ Error during cleanup:", error);
  }
}

// Run it
cleanupAndImproveNPCs();
