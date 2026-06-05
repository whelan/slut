/**
 * UPDATE-TIAMAT-HEADS-FROM-COMPENDIA.js
 *
 * Searches ALL Foundry compendia for chromatic dragon creatures and updates
 * the five Tiamat head actors with compendium data.
 *
 * Does NOT delete heads. Only updates them with official compendium abilities,
 * traits, and mechanics. Keeps existing head actors in place.
 *
 * Heads to update:
 * - Tiamat Head: White (frost/cold)
 * - Tiamat Head: Black (acid)
 * - Tiamat Head: Green (poison)
 * - Tiamat Head: Blue (lightning)
 * - Tiamat Head: Red (fire)
 */

const headNames = [
  "Tiamat Head: White",
  "Tiamat Head: Black",
  "Tiamat Head: Green",
  "Tiamat Head: Blue",
  "Tiamat Head: Red"
];

const headToSearch = {
  "Tiamat Head: White": ["Adult White Dragon", "White Dragon", "wyrmling white"],
  "Tiamat Head: Black": ["Adult Black Dragon", "Black Dragon", "wyrmling black"],
  "Tiamat Head: Green": ["Adult Green Dragon", "Green Dragon", "wyrmling green"],
  "Tiamat Head: Blue": ["Adult Blue Dragon", "Blue Dragon", "wyrmling blue"],
  "Tiamat Head: Red": ["Adult Red Dragon", "Red Dragon", "wyrmling red"]
};

console.log("=== TIAMAT HEAD COMPENDIUM UPDATE ===");
console.log(`Searching all compendia for chromatic dragon templates...`);

// Phase 1: Search all compendia for each dragon type
const searchResults = {};

for (const headName of headNames) {
  console.log(`\n[${headName}]`);

  searchResults[headName] = null;

  // Get search keywords for this head
  const keywords = headToSearch[headName];

  // Search across ALL compendia
  for (const pack of game.packs) {
    // Only search creature/actor packs
    if (!pack.metadata.type === 'Actor') continue;

    for (const keyword of keywords) {
      try {
        const index = await pack.getIndex();
        const match = index.find(entry =>
          entry.name.toLowerCase().includes(keyword.toLowerCase())
        );

        if (match) {
          console.log(`  ✓ Found in ${pack.collection}: "${match.name}"`);
          searchResults[headName] = { pack, id: match._id, name: match.name };
          break; // Stop after first match for this head
        }
      } catch (e) {
        // Pack search failed, continue
      }
    }

    if (searchResults[headName]) break; // Move to next head if found
  }

  if (!searchResults[headName]) {
    console.log(`  ✗ No compendium match found`);
  }
}

// Phase 2: Update existing head actors with compendium data
console.log("\n=== UPDATING EXISTING HEADS ===");

for (const headName of headNames) {
  console.log(`\n[Updating: ${headName}]`);

  // Find existing head actor
  const existingHead = game.actors.find(a => a.name === headName);

  if (!existingHead) {
    console.log(`  ✗ Head actor not found in world`);
    continue;
  }

  console.log(`  ✓ Found existing actor: ${existingHead.name} (${existingHead.id})`);

  // If we found a compendium match, fetch and apply it
  if (searchResults[headName]) {
    const { pack, id, name } = searchResults[headName];

    try {
      const compendiumActor = await pack.getDocument(id);
      console.log(`  → Fetching data from compendium: ${name}`);

      // Extract relevant data from compendium actor
      const updateData = {
        // Keep existing name, but update everything else
        name: headName, // Preserve the "Tiamat Head: X" naming

        // Copy system data (abilities, stats, etc.)
        system: {
          ...compendiumActor.system,
          // But preserve these fields
          details: {
            ...compendiumActor.system.details,
            biography: existingHead.system.details?.biography || ""
          }
        },

        // Copy items (spells, abilities, traits)
        items: compendiumActor.items.map(item => item.toObject())
      };

      // Apply the update
      await existingHead.update(updateData);
      console.log(`  ✓ Updated ${headName} with compendium data`);
      console.log(`    - Copied ${updateData.items.length} items/abilities`);

    } catch (e) {
      console.error(`  ✗ Error updating from compendium:`, e.message);
    }

  } else {
    console.log(`  → No compendium match; keeping existing actor as-is`);
  }
}

console.log("\n=== COMPLETE ===");
console.log("Tiamat heads have been updated (not deleted). Check each head for:");
console.log("  ✓ Abilities and traits from official dragons");
console.log("  ✓ Proper stat blocks and saving throws");
console.log("  ✓ Legendary actions and resistances");
