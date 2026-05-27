/**
 * VERIFICATION SCRIPT - Check all NPCs are COMPLETE
 *
 * Run this AFTER all 3 steps
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 *
 * Reports:
 * ✓ What each NPC has
 * ✗ What each NPC is missing
 */

function verifyActor(actor) {
  const report = {
    name: actor.name,
    ac: false,
    hp: false,
    abilities: false,
    skills: false,
    saves: false,
    resistances: false,
    immunities: false,
    weapons: false,
    spells: false,
    traits: false,
    actions: false,
    legendaryActions: false,
    details: {}
  };

  // Check AC
  if (actor.system?.attributes?.ac?.flat) {
    report.ac = true;
    report.details.ac = actor.system.attributes.ac.flat;
  }

  // Check HP
  if (actor.system?.traits?.hp?.max) {
    report.hp = true;
    report.details.hp = `${actor.system.traits.hp.value}/${actor.system.traits.hp.max}`;
  }

  // Check Abilities
  const abilities = actor.system?.abilities;
  if (abilities && Object.keys(abilities).length >= 6) {
    report.abilities = true;
  }

  // Check Skills
  const skills = actor.system?.skills;
  if (skills && Object.values(skills).some(s => s.value !== undefined)) {
    report.skills = true;
    const skillCount = Object.values(skills).filter(s => s.value !== undefined).length;
    report.details.skills = `${skillCount} proficiencies`;
  }

  // Check Saving Throws
  const saves = actor.system?.abilities;
  if (saves) {
    const hasSaves = Object.values(saves).some(a => a.save?.proficient);
    if (hasSaves) {
      report.saves = true;
    }
  }

  // Check Resistances
  const traits = actor.system?.traits;
  if (traits?.dr?.length > 0) {
    report.resistances = true;
    report.details.resistances = traits.dr.map(d => d.type).join(", ");
  }

  // Check Immunities
  if (traits?.ci?.value?.length > 0) {
    report.immunities = true;
    report.details.immunities = traits.ci.value.join(", ");
  }

  // Check Items
  const items = actor.items;
  const weapons = items.filter(i => i.type === "loot" || i.type === "weapon" || i.type === "equipment");
  const spells = items.filter(i => i.type === "spell");
  const traits = items.filter(i => i.type === "feat");

  if (weapons.length > 0) {
    report.weapons = true;
    report.details.weapons = `${weapons.length} items`;
  }

  if (spells.length > 0) {
    report.spells = true;
    report.details.spells = `${spells.length} spells`;
  }

  if (traits.length > 0) {
    report.traits = true;
    const traitItems = traits.filter(t => !t.name.includes("Action") && !t.name.includes("Legendary"));
    const actions = traits.filter(t => t.name.includes("Action") && !t.name.includes("Legendary"));
    const legendary = traits.filter(t => t.name.includes("Legendary"));

    if (traitItems.length > 0) report.details.traits = `${traitItems.length} traits`;
    if (actions.length > 0) report.details.actions = `${actions.length} actions`;
    if (legendary.length > 0) report.details.legendaryActions = `${legendary.length} legendary actions`;
  }

  return report;
}

async function verifyAllNPCs() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  NPC VERIFICATION REPORT                               ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  const folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");

  if (!folder) {
    console.log("❌ temple-of-tiamat folder not found!");
    return;
  }

  const actors = folder.contents;
  console.log(`📊 Found ${actors.length} actors in temple-of-tiamat\n`);

  let completeCount = 0;
  const incomplete = [];

  for (const actor of actors) {
    const report = verifyActor(actor);

    // Check if complete
    const isComplete =
      report.ac &&
      report.hp &&
      report.abilities &&
      (report.skills || report.saves) &&
      (report.weapons || report.spells || report.traits);

    if (isComplete) {
      completeCount++;
      console.log(`✓ ${report.name}`);
      console.log(`  AC ${report.details.ac || "?"}, HP ${report.details.hp || "?"}`);
      if (report.details.weapons) console.log(`  ${report.details.weapons}`);
      if (report.details.spells) console.log(`  ${report.details.spells}`);
      if (report.details.traits) console.log(`  ${report.details.traits}`);
      if (report.details.actions) console.log(`  ${report.details.actions}`);
      if (report.details.legendaryActions) console.log(`  ${report.details.legendaryActions}`);
      console.log();
    } else {
      incomplete.push({ name: report.name, missing: report });
      console.log(`⚠️  ${report.name}`);
      const missing = [];
      if (!report.ac) missing.push("AC");
      if (!report.hp) missing.push("HP");
      if (!report.abilities) missing.push("Abilities");
      if (!report.skills && !report.saves) missing.push("Skills/Saves");
      if (!report.weapons && !report.spells) missing.push("Items/Spells");
      if (!report.traits) missing.push("Traits/Actions");
      console.log(`  Missing: ${missing.join(", ")}`);
      console.log();
    }
  }

  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  SUMMARY                                               ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`✓ Complete: ${completeCount}/${actors.length}`);
  if (incomplete.length > 0) {
    console.log(`⚠️  Incomplete: ${incomplete.length}`);
  }

  if (completeCount === actors.length) {
    console.log("\n✨ ALL NPCs ARE COMPLETE AND READY TO USE! ✨\n");
  } else {
    console.log(`\n⚠️  ${incomplete.length} NPCs need attention\n`);
  }
}

// Execute
verifyAllNPCs();
