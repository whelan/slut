/**
 * FOUNDRY - COMPREHENSIVE COMPENDIA SEARCH (JSON OUTPUT)
 *
 * Searches ALL compendia (Actor, Item, Spell, etc.)
 * Outputs results as JSON for easy analysis
 *
 * Run in Foundry Console (F12 > Console)
 */

// NPCs we want to find
const COUNCIL_NPCS = [
  "Dagult Neverember", "Ulder Ravengard", "Remallia Haventree",
  "Ontharr Frume", "Delaan Winterhound", "Sir Isteval",
  "Taern Hornblade", "King Melandrach", "Ambassador Brawnanvil",
  "Crimson Maccath", "Nyh Ilmichh"
];

const ANTAGONISTS = [
  "Naergoth Bladelord", "Naergoth", "Severin", "Rath Modar",
  "Rath", "Magus Thezzar"
];

const BASE_STAT_BLOCKS = [
  "Noble", "Knight", "Assassin", "Priest", "Veteran",
  "Mage", "Cultist", "Cult Fanatic", "Red Wizard", "Wight"
];

const CREATURES = [
  "Air Elemental", "Fire Elemental", "Stone Golem", "Clay Golem",
  "Iron Golem", "Dragon", "Abishai", "Beholder", "Devil", "Demon",
  "Tiamat", "Naergoth"
];

const SPELLS = [
  "Fire Bolt", "Light", "Magic Missile", "Fireball",
  "Shield", "Burning Hands", "Scorching Ray", "Lightning Bolt"
];

/**
 * Search all packs for a name
 */
async function searchAllPacks(searchName) {
  const results = [];

  for (const pack of game.packs) {
    const index = pack.index;

    // Try exact match first
    let entry = index.find(e =>
      e.name.toLowerCase() === searchName.toLowerCase()
    );

    // If not found, try partial match
    if (!entry) {
      entry = index.find(e =>
        e.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (entry) {
      results.push({
        name: entry.name,
        pack: pack.metadata.id,
        packName: pack.metadata.name,
        type: pack.type,
        id: entry._id
      });
    }
  }

  return results;
}

/**
 * Main search and output JSON
 */
async function comprehensiveSearch() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  COMPREHENSIVE COMPENDIA SEARCH - JSON OUTPUT          ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  // Report all packs
  console.log("📦 AVAILABLE PACKS:\n");
  const packSummary = {};
  for (const pack of game.packs) {
    if (!packSummary[pack.type]) {
      packSummary[pack.type] = [];
    }
    packSummary[pack.type].push({
      id: pack.metadata.id,
      name: pack.metadata.name,
      size: pack.index.size
    });
  }

  for (const [type, packs] of Object.entries(packSummary)) {
    console.log(`${type} packs: ${packs.length}`);
    packs.forEach(p => {
      console.log(`  • ${p.id} (${p.name}) - ${p.size} entries`);
    });
  }

  console.log("\n" + "═".repeat(60) + "\n");

  // Conduct searches
  console.log("🔍 SEARCHING...\n");

  const searchResults = {
    timestamp: new Date().toISOString(),
    council: {},
    antagonists: {},
    baseStatBlocks: {},
    creatures: {},
    spells: {},
    summary: {}
  };

  // Search Council
  console.log("  Council NPCs...");
  for (const npc of COUNCIL_NPCS) {
    const results = await searchAllPacks(npc);
    searchResults.council[npc] = results;
  }

  // Search Antagonists
  console.log("  Antagonists...");
  for (const npc of ANTAGONISTS) {
    const results = await searchAllPacks(npc);
    searchResults.antagonists[npc] = results;
  }

  // Search Base Stat Blocks
  console.log("  Base Stat Blocks...");
  for (const block of BASE_STAT_BLOCKS) {
    const results = await searchAllPacks(block);
    searchResults.baseStatBlocks[block] = results;
  }

  // Search Creatures
  console.log("  Creatures...");
  for (const creature of CREATURES) {
    const results = await searchAllPacks(creature);
    searchResults.creatures[creature] = results;
  }

  // Search Spells
  console.log("  Spells...");
  for (const spell of SPELLS) {
    const results = await searchAllPacks(spell);
    searchResults.spells[spell] = results;
  }

  // Generate summary
  searchResults.summary = {
    councilFound: Object.values(searchResults.council).filter(r => r.length > 0).length,
    councilTotal: COUNCIL_NPCS.length,
    antagonistsFound: Object.values(searchResults.antagonists).filter(r => r.length > 0).length,
    antagonistsTotal: ANTAGONISTS.length,
    baseBlocksFound: Object.values(searchResults.baseStatBlocks).filter(r => r.length > 0).length,
    baseBlocksTotal: BASE_STAT_BLOCKS.length,
    creaturesFound: Object.values(searchResults.creatures).filter(r => r.length > 0).length,
    creaturesTotal: CREATURES.length,
    spellsFound: Object.values(searchResults.spells).filter(r => r.length > 0).length,
    spellsTotal: SPELLS.length
  };

  // Output JSON
  console.log("\n" + "═".repeat(60) + "\n");
  console.log("📊 SEARCH RESULTS (JSON):\n");
  console.log(JSON.stringify(searchResults, null, 2));

  // Save to window for export
  window.COMPENDIA_SEARCH_JSON = searchResults;

  // Print summary
  console.log("\n" + "═".repeat(60) + "\n");
  console.log("📋 SUMMARY:\n");
  console.log(`  Council NPCs Found: ${searchResults.summary.councilFound}/${searchResults.summary.councilTotal}`);
  console.log(`  Antagonists Found: ${searchResults.summary.antagonistsFound}/${searchResults.summary.antagonistsTotal}`);
  console.log(`  Base Stat Blocks Found: ${searchResults.summary.baseBlocksFound}/${searchResults.summary.baseBlocksTotal}`);
  console.log(`  Creatures Found: ${searchResults.summary.creaturesFound}/${searchResults.summary.creaturesTotal}`);
  console.log(`  Spells Found: ${searchResults.summary.spellsFound}/${searchResults.summary.spellsTotal}`);

  // List what's found
  console.log("\n✓ FOUND:\n");
  Object.entries(searchResults.council).forEach(([name, results]) => {
    if (results.length > 0) {
      console.log(`  Council: ${name} → "${results[0].name}" (${results[0].pack})`);
    }
  });

  Object.entries(searchResults.antagonists).forEach(([name, results]) => {
    if (results.length > 0) {
      console.log(`  Antagonist: ${name} → "${results[0].name}" (${results[0].pack})`);
    }
  });

  // List what's missing
  console.log("\n✗ NOT FOUND:\n");
  Object.entries(searchResults.council).forEach(([name, results]) => {
    if (results.length === 0) {
      console.log(`  Council: ${name}`);
    }
  });

  Object.entries(searchResults.antagonists).forEach(([name, results]) => {
    if (results.length === 0) {
      console.log(`  Antagonist: ${name}`);
    }
  });

  console.log("\n" + "═".repeat(60) + "\n");
  console.log("💾 Results saved to: window.COMPENDIA_SEARCH_JSON");
  console.log("📋 Copy the JSON above for analysis\n");

  return searchResults;
}

// RUN IT
comprehensiveSearch();
