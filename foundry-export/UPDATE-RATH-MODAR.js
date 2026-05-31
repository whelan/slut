/**
 * UPDATE RATH MODAR - FULL 2024 MID-TIER ARCHMAGE (CR 9)
 *
 * Searches compendia for the official Rath Modar, clones him, then forces a
 * complete 2024 D&D 5e statblock onto the clone (HP, AC, ability scores,
 * proficiency, spell save DC, saving throws), applies the epic battle image,
 * deletes any existing Rath Modar in the temple-of-tiamat folder, and creates
 * the updated version. The compendium spell list is preserved.
 *
 * Target: mid-tier archmage, CR 9 (proficiency +4).
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console) → Press Enter
 */

console.log("🔴 UPDATING RATH MODAR - FULL 2024 (CR 9 ARCHMAGE)\n");
console.log("=".repeat(70) + "\n");

// ============================================================================
// 2024 STATBLOCK TARGET (mid-tier archmage, CR 9)
// ============================================================================
//
//   AC 16   HP 130 (17d8 + 54)   Speed 30 ft.
//   STR 9 (-1)  DEX 14 (+2)  CON 16 (+3)  INT 20 (+5)  WIS 13 (+1)  CHA 14 (+2)
//   Proficiency +4   Spell Save DC 17 (8 + 4 + 5 INT)   Spell Attack +9
//   Saving Throws: INT +9, WIS +5, CON +7 (proficient)
//
const RATH_2024 = {
  cr: 9,
  prof: 4,
  hp: { max: 130, formula: "17d8 + 54" },
  ac: 16,
  abilities: { str: 9, dex: 14, con: 16, int: 20, wis: 13, cha: 14 },
  proficientSaves: ["con", "int", "wis"],
  spellcasting: "int",
  spellDC: 17,
  spellAttack: 9,
  image: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/Rath-modar.PNG"
};

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

  // Search creature packs first (most likely to hold full stat blocks)
  const creaturePacks = allPackIds.filter(id =>
    id.includes("creature") || id.includes("npc") || id.includes("monster")
  );

  const searchPacks = async (packIds) => {
    for (const packId of packIds) {
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
            cr: doc.system?.details?.cr ?? "?"
          });
        }
      }
    }
  };

  await searchPacks(creaturePacks);
  if (results.length === 0) {
    await searchPacks(allPackIds.filter(id => !creaturePacks.includes(id)));
  }

  return results;
}

// Force the full 2024 statblock onto a plain cloned actor object (from toObject()).
function applyFull2024Stats(clone) {
  const sys = clone.system;

  // --- Challenge & proficiency ---
  sys.details = sys.details || {};
  sys.details.cr = RATH_2024.cr;
  sys.attributes = sys.attributes || {};
  sys.attributes.prof = RATH_2024.prof;

  // --- Hit Points (the part the old script never touched) ---
  sys.attributes.hp = sys.attributes.hp || {};
  sys.attributes.hp.max = RATH_2024.hp.max;
  sys.attributes.hp.value = RATH_2024.hp.max;
  sys.attributes.hp.formula = RATH_2024.hp.formula;

  // --- Armor Class (flat) ---
  sys.attributes.ac = sys.attributes.ac || {};
  sys.attributes.ac.calc = "flat";
  sys.attributes.ac.flat = RATH_2024.ac;

  // --- Ability scores & proficient saves ---
  sys.abilities = sys.abilities || {};
  for (const [ab, value] of Object.entries(RATH_2024.abilities)) {
    sys.abilities[ab] = sys.abilities[ab] || {};
    sys.abilities[ab].value = value;
    sys.abilities[ab].proficient = RATH_2024.proficientSaves.includes(ab) ? 1 : 0;
  }

  // --- Spellcasting (DC + attack derive from INT 20 / prof +4 = DC 17 / +9) ---
  sys.attributes.spellcasting = RATH_2024.spellcasting;
  sys.attributes.spelldc = RATH_2024.spellDC;
  sys.attributes.spell = sys.attributes.spell || {};
  sys.attributes.spell.dc = RATH_2024.spellDC;

  return {
    cr: RATH_2024.cr,
    hp: RATH_2024.hp.max,
    ac: RATH_2024.ac,
    dc: RATH_2024.spellDC
  };
}

async function runRathModarUpdate() {
  try {
    const folder = await createFolder();

    // ====== PHASE 1: SEARCH FOR OFFICIAL RATH MODAR ======
    console.log("PHASE 1: Searching for official Rath Modar...\n");
    const rathResults = await searchInCompendia("Rath Modar");

    if (rathResults.length === 0) {
      console.error("  ❌ Rath Modar not found in any compendium!");
      console.error("     Cannot update without an official base statblock.\n");
      return;
    }

    console.log(`  ✓ Found ${rathResults.length} Rath Modar variant(s)`);
    const rathToUse = rathResults[0];
    console.log(`     Using: ${rathToUse.name} from ${rathToUse.packId}`);
    console.log(`     Source CR: ${rathToUse.cr}\n`);

    // ====== PHASE 2: CLONE + APPLY FULL 2024 STATS ======
    console.log("PHASE 2: Applying full 2024 statblock (CR 9 archmage)...\n");
    const rathClone = rathToUse.doc.toObject();
    rathClone.folder = folder.id;
    rathClone.img = RATH_2024.image;
    rathClone.prototypeToken = rathClone.prototypeToken || {};
    rathClone.prototypeToken.img = RATH_2024.image;
    rathClone.prototypeToken.name = "Rath Modar";

    const applied = applyFull2024Stats(rathClone);
    console.log(`  ✓ HP:  ${applied.hp} (${RATH_2024.hp.formula})`);
    console.log(`  ✓ AC:  ${applied.ac}`);
    console.log(`  ✓ CR:  ${applied.cr}  (proficiency +${RATH_2024.prof})`);
    console.log(`  ✓ Spell Save DC: ${applied.dc}  (8 + 4 + 5 INT)`);
    console.log(`  ✓ Ability scores set (INT 20)`);
    console.log(`  ✓ Proficient saves: ${RATH_2024.proficientSaves.join(", ").toUpperCase()}`);
    console.log(`  ✓ Compendium spell list preserved\n`);

    // ====== PHASE 3: DELETE EXISTING RATH MODAR ======
    console.log("PHASE 3: Deleting existing Rath Modar (cleanup duplicates)...\n");
    let deletedCount = 0;
    const existing = game.actors.contents.filter(
      a => a.folder?.id === folder.id && a.name === "Rath Modar"
    );
    for (const actor of existing) {
      await actor.delete();
      console.log(`  ✓ Deleted: ${actor.name}`);
      deletedCount++;
    }
    console.log(deletedCount === 0
      ? `  ℹ No existing Rath Modar found\n`
      : `  ✓ Deleted ${deletedCount} old version(s)\n`);

    // ====== PHASE 4: CREATE UPDATED VERSION ======
    console.log("PHASE 4: Creating updated Rath Modar...\n");
    await Actor.create(rathClone);
    console.log(`  ✓ Created: Rath Modar in temple-of-tiamat folder`);
    console.log(`  ✓ Epic battle portrait applied\n`);

    // ====== COMPLETE ======
    console.log("=".repeat(70) + "\n");
    console.log(`✅ RATH MODAR READY — FULL 2024 (CR 9 ARCHMAGE)\n`);
    console.log(`  HP ${applied.hp}  ·  AC ${applied.ac}  ·  Spell Save DC ${applied.dc}  ·  CR ${applied.cr}`);
    console.log(`  Official compendium base · 2024 stats forced · epic portrait\n`);
    console.log("=".repeat(70) + "\n");

  } catch (error) {
    console.error("Fatal error:", error);
  }
}

// ============================================================================
// RUN
// ============================================================================

runRathModarUpdate();
