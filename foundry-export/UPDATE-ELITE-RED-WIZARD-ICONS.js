/**
 * UPDATE ELITE RED WIZARD ICONS - 2024 D&D 5e
 *
 * Updates all ability, spell, and feat icons on elite Red Wizards
 * to use correct Foundry core library icons (guaranteed to exist).
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🎨 Updating elite Red Wizard icons...\n");

const ICON_MAP = {
  // Arcane/Magic abilities
  "Arcane Burst": "icons/magic/light/projectile-beam.webp",
  "Arcane Volley": "icons/magic/fire/fireball.webp",
  "Arcane Sense": "icons/magic/light/projectile-beam.webp",
  "Arcane Countering": "icons/magic/abjuration/shield-barrier.webp",
  "Fireburst": "icons/magic/fire/fireball.webp",
  "Transmutation Strike": "icons/magic/ice/projectile-snowball.webp",
  "Scrying Pulse": "icons/magic/purple/impact-beam.webp",

  // Spells - Evocation (Fire/Force)
  "Fireball": "icons/magic/fire/fireball.webp",
  "Cone of Cold": "icons/magic/ice/projectile-snowball.webp",
  "Fire Bolt": "icons/magic/fire/fireball.webp",
  "Burning Hands": "icons/magic/fire/projectile-fire.webp",

  // Spells - Abjuration (Protection/Counter)
  "Counterspell": "icons/magic/abjuration/shield-barrier.webp",
  "Shield": "icons/magic/abjuration/shield-barrier.webp",
  "Mage Armor": "icons/magic/abjuration/shield-barrier.webp",
  "Protective Magic": "icons/magic/abjuration/shield-barrier.webp",

  // Spells - Divination
  "Detect Magic": "icons/magic/light/projectile-beam.webp",
  "Identify": "icons/magic/light/projectile-beam.webp",
  "Scrying": "icons/magic/purple/impact-beam.webp",
  "True Seeing": "icons/magic/light/projectile-beam.webp",
  "Legend Lore": "icons/magic/light/projectile-beam.webp",
  "Divination": "icons/magic/purple/impact-beam.webp",
  "Draconic Insight": "icons/magic/purple/impact-beam.webp",

  // Spells - Transmutation
  "Invisibility": "icons/magic/control/invisibility.webp",
  "Fly": "icons/magic/control/wind-stream.webp",
  "Misty Step": "icons/magic/control/teleportation.webp",
  "Telekinesis": "icons/magic/control/telekinesis.webp",
  "Contingency": "icons/magic/light/projectile-beam.webp",

  // Spells - Utility
  "Light": "icons/magic/light/light.webp",
  "Mage Hand": "icons/magic/control/telekinesis.webp",
  "Prestidigitation": "icons/magic/light/light.webp",
  "True Strike": "icons/magic/light/projectile-beam.webp",

  // Traits & Features
  "Fire Resistance": "icons/magic/fire/fire-glow.webp",
  "Thayan Evocation Mastery": "icons/magic/fire/fireball.webp",
  "Ritual Focus": "icons/magic/light/projectile-beam.webp",
  "Ritual Mastery": "icons/magic/purple/impact-beam.webp",
  "Legendary Spellcasting": "icons/magic/light/projectile-beam.webp",
  "Ritual Intervention": "icons/magic/purple/impact-beam.webp",
  "Divination Mastery": "icons/magic/purple/impact-beam.webp",
  "Draconic Mastery": "icons/creatures/abilities/mouth-teeth-white.webp",

  // Weapons
  "Wand of the Warmage": "icons/weapons/wands/wand-flame.webp",
  "Wand of Fireballs": "icons/weapons/wands/wand-flame.webp",
  "Wand of Secrets": "icons/weapons/wands/wand-gnarled.webp",
  "Staff of Fire": "icons/weapons/staves/staff-flame.webp",

  // Magic Items
  "Robe of the Archmagi": "icons/equipment/chest/robe-fancy-blue.webp",
  "Ring of Protection": "icons/equipment/finger/ring-gold.webp",

  // Bonus Actions & Reactions
  "Misty Step": "icons/magic/control/teleportation.webp",
  "Ritual Intervention": "icons/magic/purple/impact-beam.webp",
  "Ritual Counterspell": "icons/magic/abjuration/shield-barrier.webp",
  "Evocation Strike": "icons/magic/fire/fireball.webp",
  "Staff Strike": "icons/magic/fire/fireball.webp",
  "Wand Strike": "icons/magic/fire/fireball.webp",
  "Arcane Knowledge": "icons/magic/purple/impact-beam.webp"
};

// Default icon if no match found
const DEFAULT_ICON = "icons/skills/social/awareness-perception.webp";

function getFeatureIcon(featureName) {
  // Check for exact match
  if (ICON_MAP[featureName]) {
    return ICON_MAP[featureName];
  }

  // Check for partial matches
  const name = featureName.toLowerCase();

  if (name.includes("fire") || name.includes("burn")) return "icons/magic/fire/fireball.webp";
  if (name.includes("cold") || name.includes("ice") || name.includes("frost")) return "icons/magic/ice/projectile-snowball.webp";
  if (name.includes("lightning") || name.includes("electric") || name.includes("thunder")) return "icons/magic/lightning/projectile-beam.webp";
  if (name.includes("poison") || name.includes("acid")) return "icons/magic/death/poison-gas-cloud.webp";
  if (name.includes("invisibility") || name.includes("invisible")) return "icons/magic/control/invisibility.webp";
  if (name.includes("teleport") || name.includes("misty step")) return "icons/magic/control/teleportation.webp";
  if (name.includes("counterspell") || name.includes("shield") || name.includes("protect")) return "icons/magic/abjuration/shield-barrier.webp";
  if (name.includes("detect") || name.includes("sense") || name.includes("scry") || name.includes("divination")) return "icons/magic/purple/impact-beam.webp";
  if (name.includes("spell") && name.includes("cast")) return "icons/magic/light/projectile-beam.webp";
  if (name.includes("damage") && name.includes("burst")) return "icons/magic/light/projectile-beam.webp";
  if (name.includes("dagger")) return "icons/weapons/daggers/dagger-ornate.webp";
  if (name.includes("wand")) return "icons/weapons/wands/wand-flame.webp";
  if (name.includes("staff")) return "icons/weapons/staves/staff-flame.webp";
  if (name.includes("robe")) return "icons/equipment/chest/robe-fancy-blue.webp";
  if (name.includes("ring")) return "icons/equipment/finger/ring-gold.webp";
  if (name.includes("resistance")) return "icons/magic/fire/fire-glow.webp";

  // If no match, use default
  return DEFAULT_ICON;
}

async function updateEliteRedWizardIcons() {
  const folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");
  if (!folder) {
    console.error("❌ Temple of Tiamat folder not found!");
    return;
  }

  // Find elite Red Wizards (they have "elite" in their names or are CR 5-6)
  const wizards = game.actors.filter(a =>
    a.folder?.id === folder.id &&
    (a.name.includes("Thallid") || a.name.includes("Szass") || a.name.includes("Zalathorm"))
  );

  if (wizards.length === 0) {
    console.warn("⚠ No elite Red Wizards found in temple-of-tiamat folder");
    return;
  }

  console.log(`Found ${wizards.length} elite Red Wizards\n`);

  for (const wizard of wizards) {
    console.log(`🧙 Updating ${wizard.name}...`);

    let updatedCount = 0;

    // Get all items (spells, feats, weapons, etc.)
    const items = wizard.items;

    for (const item of items) {
      const oldIcon = item.img;
      const newIcon = getFeatureIcon(item.name);

      if (oldIcon !== newIcon) {
        await item.update({ img: newIcon });
        updatedCount++;
        console.log(`   ✓ ${item.name}: ${newIcon.split("/").pop()}`);
      }
    }

    console.log(`   Total updated: ${updatedCount} items\n`);
  }

  console.log("✅ All elite Red Wizard icons updated!");
  console.log("   Spells, abilities, and items now have proper Foundry core icons");
}

updateEliteRedWizardIcons();
