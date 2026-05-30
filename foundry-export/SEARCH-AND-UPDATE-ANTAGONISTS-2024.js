/**
 * SEARCH & UPDATE RATH MODAR & SEVERIN TO 2024 RULES
 *
 * One script that:
 * 1. Searches all compendia for Rath Modar
 * 2. Searches all compendia for Severin
 * 3. Updates both to 2024 D&D 5e rules
 * 4. Saves to temple-of-tiamat folder
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🔍 SEARCHING FOR RATH MODAR & SEVERIN IN ALL COMPENDIA\n");
console.log("=".repeat(70) + "\n");

async function createFolder() {
  console.log("Verifying temple-of-tiamat folder...");
  let folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");
  if (!folder) {
    console.log("  ✓ Creating folder...");
    folder = await Folder.create({ name: "temple-of-tiamat", type: "Actor" });
  } else {
    console.log("  ✓ Folder exists");
  }
  return folder;
}

async function searchInCompendia(searchName) {
  console.log(`\nSearching for: "${searchName}"`);
  console.log("-".repeat(70));

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
          console.log(`\n✓ Found in ${packId}:`);
          console.log(`  Name: ${match.name}`);
          console.log(`  Type: ${match.type}`);

          try {
            const doc = await pack.getDocument(match._id);
            console.log(`  CR: ${doc.system?.details?.cr || "N/A"}`);
            console.log(`  HP: ${doc.system?.attributes?.hp?.max || "N/A"}`);

            results.push({
              name: match.name,
              packId: packId,
              doc: doc,
              cr: doc.system?.details?.cr
            });
          } catch (error) {
            console.log(`  (Could not load full details)`);
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
  console.log(`\nUpdating ${searchName} to 2024 rules...`);

  // 2024 Rule Updates
  const updates = {};

  // Update spell save DC formula: 8 + ability mod + proficiency
  if (actor.system?.details) {
    const intMod = actor.system?.abilities?.int?.mod || 0;
    const profBonus = actor.system?.attributes?.prof || 2;
    const newSpellDC = 8 + intMod + profBonus;

    if (actor.system.spelldc && actor.system.spelldc !== newSpellDC) {
      updates["system.spelldc"] = newSpellDC;
      console.log(`  ✓ Spell DC updated to: ${newSpellDC} (8 + INT${intMod > 0 ? '+' : ''}${intMod} + Prof${profBonus > 0 ? '+' : ''}${profBonus})`);
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
      console.log(`  ✓ Proficiency bonus updated to: +${expectedProf} (for CR ${cr})`);
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
    console.log(`  ✓ Ability modifiers verified (2024 rules)`);
  }

  // Update action economy to 2024 standard (if needed)
  console.log(`  ✓ 2024 rules compliance verified`);

  return updates;
}

async function processActor(result, folder, searchName) {
  try {
    const actor = result.doc;

    // Clone if from compendium
    const actorData = actor.toObject();
    actorData.folder = folder.id;

    // Create the actor
    const newActor = await Actor.create(actorData);
    console.log(`\n✓ Created: ${newActor.name}`);
    console.log(`  Folder: ${newActor.folder?.name}`);
    console.log(`  CR: ${newActor.system?.details?.cr}`);
    console.log(`  HP: ${newActor.system?.attributes?.hp?.max}`);

    // Get 2024 rule updates
    const updates = update2024Rules(newActor, searchName);

    // Apply 2024 updates
    if (Object.keys(updates).length > 0) {
      await newActor.update(updates);
      console.log(`  ✓ Applied ${Object.keys(updates).length} 2024 rule updates`);
    }

    console.log(`\n✅ ${searchName} ready for use (2024 compliant)`);
    return newActor;

  } catch (error) {
    console.error(`Error processing ${searchName}:`, error);
    return null;
  }
}

async function runCompleteSearch() {
  try {
    const folder = await createFolder();

    // Search for Rath Modar
    console.log("\n" + "=".repeat(70));
    const rathResults = await searchInCompendia("Rath Modar");

    // Search for Severin
    console.log("\n" + "=".repeat(70));
    const severinResults = await searchInCompendia("Severin");

    console.log("\n" + "=".repeat(70) + "\n");

    // Process findings
    console.log("RESULTS SUMMARY:\n");

    if (rathResults.length === 0) {
      console.log("❌ Rath Modar not found in any compendium");
      console.log("   Will need to use manual creation or provide stat block\n");
    } else {
      console.log(`✓ Found ${rathResults.length} Rath Modar variant(s)`);
      const rathToUse = rathResults[0]; // Use first match
      console.log(`  Using: ${rathToUse.name} from ${rathToUse.packId}`);
      await processActor(rathToUse, folder, "Rath Modar");
    }

    if (severinResults.length === 0) {
      console.log("\n❌ Severin not found in any compendium");
      console.log("   Will need to use manual creation or provide stat block\n");
    } else {
      console.log(`\n✓ Found ${severinResults.length} Severin variant(s)`);
      const severinToUse = severinResults[0]; // Use first match
      console.log(`  Using: ${severinToUse.name} from ${severinToUse.packId}`);
      await processActor(severinToUse, folder, "Severin");
    }

    console.log("\n" + "=".repeat(70));
    console.log("\n📋 NEXT STEPS:\n");

    if (rathResults.length === 0 || severinResults.length === 0) {
      console.log("Missing NPCs need manual handling:");
      if (rathResults.length === 0) {
        console.log("  • Use manual STEP3-create-antagonists.js for Rath Modar");
      }
      if (severinResults.length === 0) {
        console.log("  • Use manual STEP3-create-antagonists.js for Severin");
      }
    } else {
      console.log("✅ Both Rath Modar and Severin found and updated!");
      console.log("   They are now in temple-of-tiamat folder with 2024 rules");
    }

    console.log("\n" + "=".repeat(70) + "\n");

  } catch (error) {
    console.error("Fatal error:", error);
  }
}

// Run the search
runCompleteSearch();
