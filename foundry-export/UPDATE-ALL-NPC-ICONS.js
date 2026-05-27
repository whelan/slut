/**
 * UPDATE ALL NPC ICONS - Apply proper Foundry core icons to all imported NPCs
 *
 * This script updates icons on ALREADY IMPORTED actors
 * (does not re-import, only updates existing item icons)
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🎨 UPDATING ALL NPC ICONS\n");

function getFeatureIcon(featureName) {
  const name = featureName.toLowerCase();

  // Attack & Combat
  if (name.includes("multiattack")) return "https://assets.forge-vtt.com/bazaar/core/icons/skills/melee/blade-tips-triple-steel.webp";
  if (name.includes("bite")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/mouth-teeth-long-red.webp";
  if (name.includes("claw") || name.includes("claws")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/claws-red.webp";
  if (name.includes("tail")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/tail-sharp-red.webp";
  if (name.includes("slam")) return "https://assets.forge-vtt.com/bazaar/core/icons/skills/melee/fist-raised-red.webp";
  if (name.includes("sting") || name.includes("stinger")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/sting-sharp-yellow.webp";
  if (name.includes("gore")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/horns-curved-red.webp";
  if (name.includes("trample")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/hooves.webp";
  if (name.includes("touch")) return "https://assets.forge-vtt.com/bazaar/core/icons/skills/melee/hand-daggers-yellow.webp";
  if (name.includes("weapon") || name.includes("sword") || name.includes("axe") || name.includes("club")) return "https://assets.forge-vtt.com/bazaar/core/icons/skills/melee/hand-daggers-yellow.webp";
  if (name.includes("dagger")) return "https://assets.forge-vtt.com/bazaar/core/icons/weapons/daggers/dagger-ornate-gold.webp";
  if (name.includes("longsword")) return "https://assets.forge-vtt.com/bazaar/core/icons/weapons/swords/sword-long-gold.webp";
  if (name.includes("shortsword")) return "https://assets.forge-vtt.com/bazaar/core/icons/weapons/swords/sword-short-gold.webp";
  if (name.includes("rapier")) return "https://assets.forge-vtt.com/bazaar/core/icons/weapons/swords/sword-thin-gold.webp";
  if (name.includes("bow")) return "https://assets.forge-vtt.com/bazaar/core/icons/weapons/bows/bow-recurve-gold.webp";
  if (name.includes("crossbow")) return "https://assets.forge-vtt.com/bazaar/core/icons/weapons/crossbows/crossbow-light-gold.webp";

  // Breath Weapons & Elemental
  if (name.includes("breath") || name.includes("breathe")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/fire/fireball-flame-ring-orange.webp";
  if (name.includes("acid")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/water/water-splash-acid-green.webp";
  if (name.includes("fire") || name.includes("flame")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/fire/fireball-flame-ring-orange.webp";
  if (name.includes("cold") || name.includes("ice") || name.includes("frost")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/water/ice-shard-blue.webp";
  if (name.includes("lightning") || name.includes("electric")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/lightning/projectile-beam-yellow.webp";
  if (name.includes("poison")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/death/poison-gas-cloud-gray.webp";
  if (name.includes("necrotic") || name.includes("drain")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/death/death-wave-black.webp";
  if (name.includes("psychic")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-purple.webp";

  // Special Abilities
  if (name.includes("legendary resistance")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("regeneration") || name.includes("regenerate")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/life/heart-plus-green.webp";
  if (name.includes("frightful presence") || name.includes("frightful")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/death/fear-shadow-purple.webp";
  if (name.includes("immunity") || name.includes("immune")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("resistance") || name.includes("resistant")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/light/shield-blue.webp";
  if (name.includes("magic resistance")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("magic weapons")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-blue.webp";
  if (name.includes("innate spell") || name.includes("spellcasting")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/light/projectile-beam-yellow.webp";
  if (name.includes("divine word")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/light/projectile-beam-yellow.webp";
  if (name.includes("counterspell")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-purple.webp";
  if (name.includes("legendary action")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/dragon-multi-head.webp";
  if (name.includes("parry") || name.includes("dodge")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/abjuration/shield-barrier-orange.webp";
  if (name.includes("discorporation")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/light/portal-swirl-blue.webp";
  if (name.includes("multiple heads")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/dragon-multi-head.webp";
  if (name.includes("five draconic heads")) return "https://assets.forge-vtt.com/bazaar/core/icons/creatures/abilities/dragon-multi-head.webp";

  // Spellcasting & Magic
  if (name.includes("spell")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/light/projectile-beam-yellow.webp";
  if (name.includes("magic")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/light/projectile-beam-yellow.webp";
  if (name.includes("fireball")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/fire/fireball-flame-ring-orange.webp";
  if (name.includes("healing") || name.includes("heal")) return "https://assets.forge-vtt.com/bazaar/core/icons/magic/life/heart-plus-green.webp";

  // Default fallback
  return "https://assets.forge-vtt.com/bazaar/core/icons/skills/social/awareness-perception.webp";
}

async function updateAllNPCIcons() {
  // Get all actors in the temple-of-tiamat folder
  const folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");

  if (!folder) {
    console.log("⚠️  Folder 'temple-of-tiamat' not found\n");
    return;
  }

  const actors = game.actors.filter(a => a.folder?.id === folder.id);
  console.log(`Found ${actors.length} NPCs in temple-of-tiamat folder\n`);

  let totalUpdated = 0;

  for (const actor of actors) {
    console.log(`🎨 ${actor.name}...`);
    let itemsUpdated = 0;

    // Get all items (features/abilities) on this actor
    const items = actor.items.filter(i => i.type === "feat");

    for (const item of items) {
      const newIcon = getFeatureIcon(item.name);

      if (item.img !== newIcon) {
        await item.update({ img: newIcon });
        itemsUpdated++;
      }
    }

    if (itemsUpdated > 0) {
      console.log(`   ✓ ${itemsUpdated} icons updated`);
      totalUpdated += itemsUpdated;
    } else {
      console.log(`   ✓ All icons already correct`);
    }
  }

  console.log("\n╔════════════════════════════════════════════════════════╗");
  console.log("║  ICON UPDATE COMPLETE                                  ║");
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log(`\n✓ Total items updated: ${totalUpdated}`);
  console.log(`✓ NPCs processed: ${actors.length}\n`);
}

updateAllNPCIcons();
