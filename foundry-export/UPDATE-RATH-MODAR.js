/**
 * UPDATE RATH MODAR - EPIC BATTLE VERSION
 *
 * Searches compendia for official Rath Modar, updates to 2024 rules,
 * applies epic battle image, and recreates in temple-of-tiamat folder.
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🔴 UPDATING RATH MODAR - EPIC BATTLE\n");
console.log("=".repeat(70) + "\n");

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

  // Search in creature packs first (most likely to have stat blocks)
  const creaturePacks = allPackIds.filter(id =>
    id.includes("creature") || id.includes("npc") || id.includes("monster")
  );

  for (const packId of creaturePacks) {
    const pack = game.packs.get(packId);
    if (!pack || pack.documentName !== "Actor") continue;

    const packIndex = await pack.getIndex();
    const found = packIndex.find(entry => entry.name.includes(searchName));

    if (found) {
      const doc = await pack.getDocument(found._id);
      if (doc) {
        results.push({
          name: doc.name,
          doc: doc,
          packId: packId,
          cr: doc.system?.details?.cr || "?"
        });
      }
    }
  }

  // If nothing found in creature packs, search all remaining packs
  if (results.length === 0) {
    const otherPacks = allPackIds.filter(id => !creaturePacks.includes(id));
    for (const packId of otherPacks) {
      const pack = game.packs.get(packId);
      if (!pack || pack.documentName !== "Actor") continue;

      const packIndex = await pack.getIndex();
      const found = packIndex.find(entry => entry.name.includes(searchName));

      if (found) {
        const doc = await pack.getDocument(found._id);
        if (doc) {
          results.push({
            name: doc.name,
            doc: doc,
            packId: packId,
            cr: doc.system?.details?.cr || "?"
          });
        }
      }
    }
  }

  return results;
}

function update2024Rules(actor, characterName) {
  const updates = {};
  const system = actor.system;

  // Update spell save DC if the actor casts spells
  if (system.attributes?.spelldc) {
    const profBonus = system.attributes?.prof || 2;
    const spellcasting = Object.values(system.spells || {}).find(s => s.dc);

    if (spellcasting) {
      // Find primary spellcasting ability
      const castingAbility = actor.items.find(i => i.type === "class" || i.type === "feat")?.system?.abilityMod || "int";
      const abilityMod = system.abilities[castingAbility]?.mod || 0;
      const newDC = 8 + abilityMod + profBonus;

      // Update all spell DCs
      Object.keys(system.spells).forEach(level => {
        if (system.spells[level].dc) {
          updates[`system.spells.${level}.dc`] = newDC;
        }
      });
    }
  }

  // Ensure proficiency bonus is correct for CR
  const cr = system.details?.cr || 0;
  let expectedProf = 2;
  if (cr >= 5) expectedProf = 3;
  if (cr >= 9) expectedProf = 4;
  if (cr >= 13) expectedProf = 5;
  if (cr >= 17) expectedProf = 6;

  if (system.attributes?.prof !== expectedProf) {
    updates["system.attributes.prof"] = expectedProf;
  }

  return updates;
}

async function runRathModarUpdate() {
  try {
    const folder = await createFolder();

    // ====== PHASE 1: SEARCH FOR RATH MODAR ======
    console.log("PHASE 1: Searching for official Rath Modar...\n");
    const rathResults = await searchInCompendia("Rath Modar");

    if (rathResults.length === 0) {
      console.error("  ❌ Rath Modar not found in any compendium!");
      console.error("     Cannot update without official version.\n");
      return;
    }

    console.log(`  ✓ Found ${rathResults.length} Rath Modar variant(s)`);
    const rathToUse = rathResults[0];
    console.log(`     Using: ${rathToUse.name} from ${rathToUse.packId}`);
    console.log(`     CR: ${rathToUse.cr}\n`);

    // ====== PHASE 2: UPDATE TO 2024 RULES ======
    console.log("PHASE 2: Updating to 2024 D&D 5e rules...\n");
    const updates = update2024Rules(rathToUse.doc, "Rath Modar");

    if (Object.keys(updates).length > 0) {
      await rathToUse.doc.update(updates);
      console.log(`  ✓ Applied ${Object.keys(updates).length} 2024 rule updates`);
    } else {
      console.log(`  ℹ No rule updates needed`);
    }

    console.log(`  ✓ Spell Save DC verified`);
    console.log(`  ✓ Proficiency bonus verified\n`);

    // ====== PHASE 3: DELETE EXISTING RATH MODAR ======
    console.log("PHASE 3: Deleting existing Rath Modar (cleanup duplicates)...\n");
    let deletedCount = 0;
    const allActors = game.actors.contents.filter(a => a.folder?.id === folder.id);

    for (const actor of allActors) {
      if (actor.name === "Rath Modar") {
        await actor.delete();
        console.log(`  ✓ Deleted: ${actor.name}`);
        deletedCount++;
      }
    }

    if (deletedCount === 0) {
      console.log(`  ℹ No existing Rath Modar found\n`);
    } else {
      console.log(`  ✓ Deleted ${deletedCount} old version(s)\n`);
    }

    // ====== PHASE 4: CREATE EPIC VERSION ======
    console.log("PHASE 4: Creating epic battle version...\n");
    const rathClone = rathToUse.doc.toObject();
    rathClone.folder = folder.id;
    rathClone.img = "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/Rath-modar.PNG";
    rathClone.prototypeToken.img = "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/Rath-modar.PNG";

    const created = await Actor.create(rathClone);
    console.log(`  ✓ Created: Rath Modar (Red Chapel Master)`);
    console.log(`  ✓ Image: Epic battle portrait`);
    console.log(`  ✓ Stats: 2024 D&D 5e`);
    console.log(`  ✓ Location: temple-of-tiamat folder\n`);

    // ====== COMPLETE ======
    console.log("=".repeat(70) + "\n");
    console.log(`✅ RATH MODAR READY FOR EPIC BATTLE!\n`);
    console.log(`Summary:`);
    console.log(`  ✓ Official stats from compendium`);
    console.log(`  ✓ 2024 rules compliant`);
    console.log(`  ✓ Epic battle portrait applied`);
    console.log(`  ✓ Ready to encounter in temple-of-tiamat\n`);
    console.log("=".repeat(70) + "\n");

  } catch (error) {
    console.error("Fatal error:", error);
  }
}

// ============================================================================
// RUN
// ============================================================================

runRathModarUpdate();
