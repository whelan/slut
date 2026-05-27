/**
 * FOUNDRY - COMPENDIA SEARCH MACRO
 *
 * Searches all available compendia for NPCs and creatures
 * Reports what can be imported vs what needs to be created
 *
 * Run in Foundry Console (F12 > Console)
 */

// NPCs we want to find
const COUNCIL_NPCS = [
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

const ANTAGONISTS = [
  "Naergoth Bladelord",
  "Naergoth",
  "Severin",
  "Rath Modar",
  "Rath",
  "Magus Thezzar"
];

const BASE_STAT_BLOCKS = [
  "Noble",
  "Knight",
  "Assassin",
  "Priest",
  "Veteran",
  "Mage",
  "Cultist",
  "Cult Fanatic",
  "Red Wizard",
  "Wight"
];

const CREATURES = [
  "Air Elemental",
  "Fire Elemental",
  "Stone Golem",
  "Clay Golem",
  "Iron Golem",
  "Dragon",
  "Abishai",
  "Beholder",
  "Devil",
  "Demon"
];

/**
 * Search a pack for entries matching names
 */
async function searchPack(packId, searchNames) {
  const pack = game.packs.get(packId);
  if (!pack) return { pack: packId, found: [], notFound: [] };

  const index = pack.index;
  const found = [];
  const notFound = [];

  for (const name of searchNames) {
    const entry = index.find(e =>
      e.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(e.name.toLowerCase())
    );

    if (entry) {
      found.push({ name: name, match: entry.name, id: entry._id });
    } else {
      notFound.push(name);
    }
  }

  return { pack: packId, found, notFound };
}

/**
 * Get all actor compendia
 */
function getActorPacks() {
  return game.packs.filter(p => p.type === "Actor");
}

/**
 * Get all item compendia
 */
function getItemPacks() {
  return game.packs.filter(p => p.type === "Item");
}

/**
 * Main search
 */
async function searchAllCompendia() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║     FOUNDRY COMPENDIA SEARCH - NPC INVENTORY            ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const actorPacks = getActorPacks();
  const itemPacks = getItemPacks();

  console.log(`📦 Found ${actorPacks.size} Actor packs and ${itemPacks.size} Item packs\n`);

  // Report pack names
  console.log("Actor Packs Available:");
  for (const pack of actorPacks) {
    console.log(`  • ${pack.metadata.id} (${pack.metadata.name})`);
  }

  console.log("\n" + "═".repeat(60) + "\n");

  const results = {
    councilFound: [],
    councilMissing: [],
    antagonistFound: [],
    antagonistMissing: [],
    baseBlocksFound: [],
    creaturesFound: [],
    allResults: []
  };

  // Search each actor pack
  for (const pack of actorPacks) {
    console.log(`🔍 Searching ${pack.metadata.id}...\n`);

    // Search Council NPCs
    console.log("  Council NPCs:");
    const councilResult = await searchPack(pack.metadata.id, COUNCIL_NPCS);
    for (const found of councilResult.found) {
      console.log(`    ✓ ${found.name} → "${found.match}" (${pack.metadata.id})`);
      results.councilFound.push({ name: found.name, match: found.match, pack: pack.metadata.id });
    }

    // Search Antagonists
    console.log("\n  Antagonists:");
    const antagonistResult = await searchPack(pack.metadata.id, ANTAGONISTS);
    for (const found of antagonistResult.found) {
      console.log(`    ✓ ${found.name} → "${found.match}" (${pack.metadata.id})`);
      results.antagonistFound.push({ name: found.name, match: found.match, pack: pack.metadata.id });
    }

    // Search Base Stat Blocks
    console.log("\n  Base Stat Blocks (for mapping):");
    const baseResult = await searchPack(pack.metadata.id, BASE_STAT_BLOCKS);
    for (const found of baseResult.found) {
      console.log(`    ✓ ${found.match} (${pack.metadata.id})`);
      results.baseBlocksFound.push({ name: found.match, pack: pack.metadata.id });
    }

    // Search Creatures
    console.log("\n  Creatures:");
    const creaturesResult = await searchPack(pack.metadata.id, CREATURES);
    for (const found of creaturesResult.found) {
      console.log(`    ✓ ${found.match} (${pack.metadata.id})`);
      results.creaturesFound.push({ name: found.match, pack: pack.metadata.id });
    }

    console.log("\n" + "─".repeat(60) + "\n");
  }

  // Summary
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  SEARCH SUMMARY                                        ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log("📊 COUNCIL NPCs:");
  console.log(`   Found: ${results.councilFound.length}/${COUNCIL_NPCS.length}`);
  if (results.councilFound.length > 0) {
    console.log("   Imports available:");
    results.councilFound.forEach(r => {
      console.log(`     • ${r.name} (as "${r.match}")`);
    });
  }

  const councilMissing = COUNCIL_NPCS.filter(n =>
    !results.councilFound.some(f => f.name === n)
  );
  if (councilMissing.length > 0) {
    console.log("   Need manual creation:");
    councilMissing.forEach(n => console.log(`     • ${n}`));
  }

  console.log("\n⚔️  ANTAGONISTS:");
  console.log(`   Found: ${results.antagonistFound.length}/${ANTAGONISTS.length}`);
  if (results.antagonistFound.length > 0) {
    console.log("   Imports available:");
    results.antagonistFound.forEach(r => {
      console.log(`     • ${r.name} (as "${r.match}")`);
    });
  }

  console.log("\n🔧 BASE STAT BLOCKS (for mapping Council):");
  console.log(`   Found: ${results.baseBlocksFound.length}/${BASE_STAT_BLOCKS.length}`);
  results.baseBlocksFound.forEach(r => {
    console.log(`     • ${r.name} (${r.pack})`);
  });

  console.log("\n🐉 CREATURES:");
  console.log(`   Found: ${results.creaturesFound.length}/${CREATURES.length}`);
  results.creaturesFound.forEach(r => {
    console.log(`     • ${r.name} (${r.pack})`);
  });

  console.log("\n╔════════════════════════════════════════════════════════╗");
  console.log("║  NEXT STEPS                                            ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log("1. Review what was found above");
  console.log("2. Run import-macro to import found NPCs");
  console.log("3. Manually create missing NPCs (see guides)");
  console.log("4. Add weapons/spells to all actors\n");

  // Store results for use by import macro
  window.COMPENDIA_SEARCH_RESULTS = results;
  console.log("✓ Results stored in window.COMPENDIA_SEARCH_RESULTS");
}

// RUN IT
searchAllCompendia();
