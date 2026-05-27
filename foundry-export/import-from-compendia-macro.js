/**
 * FOUNDRY - IMPORT FROM COMPENDIA
 *
 * Automatically imports NPCs found in compendia
 * Maps them to correct names (e.g., "Noble" → "Dagult Neverember")
 *
 * Prerequisites:
 * 1. Run search-compendia-macro.js first
 * 2. Review what was found
 * 3. Run this macro to import
 *
 * Run in Foundry Console (F12 > Console)
 */

// Mapping: What we want → What to search for in compendia
const COUNCIL_MAPPING = {
  "Dagult Neverember": "Noble",
  "Ulder Ravengard": "Knight",
  "Remallia Haventree": "Assassin",
  "Ontharr Frume": "Priest",
  "Delaan Winterhound": "Veteran",
  "Sir Isteval": "Knight",
  "Taern Hornblade": "Mage",
  "King Melandrach": "Mage",
  "Ambassador Brawnanvil": "Noble",
  "Crimson Maccath": "Mage",
  "Nyh Ilmichh": "Mage"
};

const ANTAGONIST_MAPPING = {
  "Naergoth Bladelord": "Wight",
  "Severin": "Cult Fanatic",
  "Rath Modar": "Red Wizard"
};

/**
 * Find and import an actor from compendia
 */
async function findAndImport(searchName, newName, folder = null) {
  // Search all actor packs
  for (const pack of game.packs.filter(p => p.type === "Actor")) {
    const index = pack.index;
    const entry = index.find(e =>
      e.name.toLowerCase() === searchName.toLowerCase()
    );

    if (entry) {
      try {
        // Load the actor
        const actor = await pack.getDocument(entry._id);

        // Clone and create in world
        const data = actor.toObject();
        data.name = newName;

        // Set folder if provided
        if (folder) {
          data.folder = folder.id;
        }

        // Create in world
        const newActor = await Actor.create(data);
        return { success: true, actor: newActor, foundIn: pack.metadata.id };
      } catch (error) {
        console.error(`Error importing ${searchName}: ${error.message}`);
        return { success: false, error: error.message };
      }
    }
  }

  return { success: false, error: "Not found in any pack" };
}

/**
 * Create or get temple-of-tiamat folder
 */
async function getTempleFolde() {
  let folder = game.folders.find(f =>
    f.name === "temple-of-tiamat" && f.type === "Actor"
  );
  if (!folder) {
    folder = await Folder.create({
      name: "temple-of-tiamat",
      type: "Actor"
    });
  }
  return folder;
}

/**
 * Main import
 */
async function importFromCompendia() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║     IMPORTING NPCs FROM COMPENDIA                      ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = await getTempleFolder();

  let successCount = 0;
  let failCount = 0;

  // Import Council
  console.log("👥 COUNCIL OF WATERDEEP:\n");
  for (const [npcName, searchName] of Object.entries(COUNCIL_MAPPING)) {
    const result = await findAndImport(searchName, npcName, folder);
    if (result.success) {
      console.log(`  ✓ ${npcName} (imported from "${searchName}" in ${result.foundIn})`);
      successCount++;
    } else {
      console.log(`  ✗ ${npcName} (${result.error}) - CREATE MANUALLY`);
      failCount++;
    }
  }

  // Import Antagonists
  console.log("\n⚔️  ANTAGONISTS:\n");
  for (const [npcName, searchName] of Object.entries(ANTAGONIST_MAPPING)) {
    const result = await findAndImport(searchName, npcName, folder);
    if (result.success) {
      console.log(`  ✓ ${npcName} (imported from "${searchName}" in ${result.foundIn})`);
      successCount++;
    } else {
      console.log(`  ✗ ${npcName} (${result.error}) - CREATE MANUALLY`);
      failCount++;
    }
  }

  // Summary
  console.log("\n╔════════════════════════════════════════════════════════╗");
  console.log("║  IMPORT COMPLETE                                       ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Imported: ${successCount}`);
  console.log(`✗ Failed: ${failCount} (create manually using guides)\n`);

  console.log("📋 NEXT STEPS:");
  console.log("1. Review imported actors in temple-of-tiamat folder");
  console.log("2. Add weapons/equipment to each NPC");
  console.log("3. Add spells to spellcasters");
  console.log("4. Create missing NPCs manually (see FOUNDRY-NPC-UPGRADE-GUIDE.md)\n");
}

// RUN IT
async function getTempleFolder() {
  let folder = game.folders.find(f =>
    f.name === "temple-of-tiamat" && f.type === "Actor"
  );
  if (!folder) {
    folder = await Folder.create({
      name: "temple-of-tiamat",
      type: "Actor"
    });
  }
  return folder;
}

importFromCompendia();
