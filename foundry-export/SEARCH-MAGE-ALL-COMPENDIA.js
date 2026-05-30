/**
 * SEARCH FOR MAGE IN ALL COMPENDIA
 *
 * Scans all available Foundry packs to find where the official 2024 Mage is located.
 * Reports back exact pack location, CR, HP, and full details.
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🔍 Searching for Mage in all Foundry compendia...\n");

async function searchMageInAllPacks() {
  const allPacks = game.packs;
  let found = false;
  let results = [];

  console.log(`Total packs found: ${allPacks.size}\n`);
  console.log("Searching...\n");

  for (const [packId, pack] of allPacks) {
    // Show progress
    if (pack.metadata && pack.metadata.label) {
      process.stdout.write(`  Checking ${pack.metadata.label}...`);
    }

    try {
      // Get the index for quick search
      const index = pack.index;

      // Search for "Mage" (case-insensitive)
      const matches = index.filter(entry =>
        entry.name && entry.name.toLowerCase().includes("mage")
      );

      if (matches.length > 0) {
        console.log(` ✓ FOUND\n`);
        found = true;

        for (const match of matches) {
          console.log(`\n📦 PACK: ${packId}`);
          console.log(`   Label: ${pack.metadata?.label || "Unknown"}`);
          console.log(`   Entry: ${match.name}`);
          console.log(`   Type: ${match.type || "unknown"}`);

          // Try to get full document for more details
          try {
            const doc = await pack.getDocument(match._id);
            console.log(`   CR: ${doc.system?.details?.cr || "N/A"}`);
            console.log(`   HP: ${doc.system?.attributes?.hp?.max || "N/A"}`);
            console.log(`   AC: ${doc.system?.attributes?.ac?.flat || "N/A"}`);
            console.log(`   ID: ${match._id}`);

            results.push({
              packId: packId,
              label: pack.metadata?.label,
              name: match.name,
              cr: doc.system?.details?.cr,
              hp: doc.system?.attributes?.hp?.max,
              ac: doc.system?.attributes?.ac?.flat,
              id: match._id,
              fullDoc: doc
            });
          } catch (error) {
            console.log(`   (Could not load full details)`);
          }
        }
      } else {
        console.log(` ✗\r`);
      }
    } catch (error) {
      console.log(` ✗ Error searching\n`);
    }
  }

  console.log("\n" + "=".repeat(60));

  if (results.length === 0) {
    console.log("\n❌ NO MAGE FOUND in any compendia");
    console.log("\nThis likely means:");
    console.log("  - dnd5e system is not installed");
    console.log("  - Creature packs are not enabled");
    console.log("  - Mage entry doesn't exist in your system version");
    return null;
  }

  console.log(`\n✅ FOUND ${results.length} MAGE ENTRY(IES)\n`);

  // Show the best match (likely the official 2024 one)
  if (results.length > 0) {
    const officialMage = results.find(r =>
      r.packId.includes("creatures24") || r.packId.includes("actors24")
    ) || results[0];

    console.log("📋 RECOMMENDED MAGE TO USE:\n");
    console.log(`Pack: ${officialMage.packId}`);
    console.log(`Name: ${officialMage.name}`);
    console.log(`CR: ${officialMage.cr}`);
    console.log(`HP: ${officialMage.hp}`);
    console.log(`AC: ${officialMage.ac}`);

    console.log("\n✨ You can now use ELITE-RED-WIZARDS-FROM-OFFICIAL-MAGE.js");
    console.log("   The script will automatically find and use this Mage as the base!");
  }

  return results;
}

// Run the search
searchMageInAllPacks().then(results => {
  if (results && results.length > 0) {
    console.log("\n" + "=".repeat(60));
    console.log("\n📊 SUMMARY:");
    console.log(`   Total Mage entries found: ${results.length}`);
    console.log(`   Recommended pack: ${results[0].packId}`);
    console.log(`   Recommended name: ${results[0].name}`);
  }
});
