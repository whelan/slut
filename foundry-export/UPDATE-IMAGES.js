/**
 * UPDATE IMAGES - Apply character portraits and token images to all NPCs
 *
 * This script updates existing NPC actors with proper images:
 * - Character portrait (img field) - shown on character sheet
 * - Token image - shown on battlefield
 *
 * NOTE: Only updates NPCs (Council, Antagonists, Creatures, Tiamat)
 *       Does NOT update player characters (Axar, Daxx, Frygtløs, Twilight)
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🖼️  UPDATING NPC IMAGES (Council, Antagonists, Creatures, Tiamat)\n");

// Image mapping: NPC Name → { portrait: "url", token: "url" }
// Note: Excludes player characters (Axar, Daxx, Frygtløs, Twilight)
// Uses Forge VTT asset URLs
const FORGE_ASSETS = "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/";

const IMAGE_MAP = {
  // COUNCIL MEMBERS
  "Dagult Neverember": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/dagult-neverember_20260525_203851_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/dagult-neverember-token_circular.png"
  },
  "Ulder Ravengard": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/ulder-ravengard_20260525_204211_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/ulder-ravengard-token_circular.png"
  },
  "Remallia Haventree": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/remallia-haventree_20260525_204250_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/remallia-haventree-token_circular.png"
  },
  "Ontharr Frume": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/ontharr-frume_20260525_204326_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/ontharr-frume-token_circular.png"
  },
  "Delaan Winterhound": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/delaan-winterhound_20260525_204357_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/delaan-winterhound-token_circular.png"
  },
  "Sir Isteval": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/sir-isteval_20260525_204429_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/sir-isteval-token_circular.png"
  },
  "Taern Hornblade": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/taern-hornblade_20260525_204506_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/taern-hornblade-token_circular.png"
  },
  "King Melandrach": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/king-melandrach_20260525_203932_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/king-melandrach-token_circular.png"
  },
  "Ambassador Brawnanvil": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/ambassador-brawnanvil_20260525_204641_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/ambassador-brawnanvil-token_circular.png"
  },
  "Crimson Maccath": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/crimson-maccath_20260525_204712_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/crimson-maccath-token_circular.png"
  },
  "Nyh Ilmichh": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/nyh-ilmichh_20260525_204745_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/nyh-ilmichh-token_circular.png"
  },

  // ANTAGONISTS
  "Naergoth Bladelord": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/naergoth-bladelord-wight-portrait_20260525_204506_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/naergoth-bladelord-wight-portrait-token_circular.png"
  },
  "Severin": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/severin-masked-token_20260516_164450_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/severin-masked-token-token_circular.png"
  },
  "Rath Modar": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/rath-modar-token_20260516_164527_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/rath-modar-token-token_circular.png"
  },
  "Magus Thezzar": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/magus-thezzar-red-wizard-token_20260517_113119_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/magus-thezzar-red-wizard-token-token_circular.png"
  },
  "White Abishai": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-white-head_20260525_204816_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-white-head-token_circular.png"
  },
  "Black Abishai": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/rezmir-black-abishai-token_20260516_164509_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/rezmir-black-abishai-token-token_circular.png"
  },

  // CREATURES
  "Air Elemental": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/air-elemental-placeholder-token_20260525_202308_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/air-elemental-placeholder-token_20260525_202308_1.png"
  },
  "Fire Elemental": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/fire-elemental-placeholder-token_20260525_202308_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/fire-elemental-placeholder-token_20260525_202308_1.png"
  },
  "Stone Golem": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/stone-golem-placeholder-token_20260525_202308_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/stone-golem-placeholder-token_20260525_202308_1.png"
  },
  "Clay Golem": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/clay-golem-placeholder-token_20260525_202308_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/clay-golem-placeholder-token_20260525_202308_1.png"
  },
  "Iron Golem": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/iron-golem-placeholder-token_20260525_202308_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/iron-golem-placeholder-token_20260525_202308_1.png"
  },
  "Wight": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/wight-placeholder-token_20260525_202308_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/wight-placeholder-token_20260525_202308_1.png"
  },
  "Cult Fanatic": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/cult-fanatic-placeholder-token_20260525_202308_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/cult-fanatic-placeholder-token_20260525_202308_1.png"
  },
  "Cultist": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/cultist-placeholder-token_20260525_202307_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/cultist-placeholder-token_20260525_202307_1.png"
  },
  "Barbed Devil": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/barbed-devil-placeholder-token_20260525_202308_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/barbed-devil-placeholder-token_20260525_202308_1.png"
  },

  // TIAMAT MANIFESTATIONS
  "Black Dragon Head of Tiamat": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-black-head_20260525_204846_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-black-head-token_circular.png"
  },
  "Blue Dragon Head of Tiamat": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-blue-head_20260525_204952_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-blue-head-token_circular.png"
  },
  "Green Dragon Head of Tiamat": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-green-head_20260525_204919_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-green-head-token_circular.png"
  },
  "Red Dragon Head of Tiamat": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-red-head_20260525_205023_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-red-head-token_circular.png"
  },
  "White Dragon Head of Tiamat": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-white-head_20260525_204816_1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-white-head-token_circular.png"
  },
  "Tiamat": {
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/tiamat-red-head-token_circular.png"
  }
};

async function updateAllImages() {
  let updated = 0;
  let notFound = 0;

  for (const [npcName, images] of Object.entries(IMAGE_MAP)) {
    const actor = game.actors.find(a => a.name === npcName);

    if (!actor) {
      console.log(`⚠️  ${npcName}: Not found in actors`);
      notFound++;
      continue;
    }

    console.log(`🖼️  ${npcName}...`);

    try {
      // Update actor portrait (character sheet image)
      await actor.update({ img: images.portrait });

      // Update default token image
      await actor.update({ prototypeToken: { img: images.token } });

      console.log(`   ✓ Portrait & Token updated`);
      updated++;
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`);
    }
  }

  console.log("\n╔════════════════════════════════════════════════════════╗");
  console.log("║  NPC IMAGE UPDATE COMPLETE                             ║");
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log(`\n✓ Updated: ${updated}/32 NPCs`);

  if (notFound > 0) {
    console.log(`⚠️  Not found: ${notFound} NPCs\n`);
  }

  if (updated === 32) {
    console.log("✨ All 32 NPCs now have proper images!\n");
  } else {
    console.log(`${32 - updated} NPCs still need image updates\n`);
  }
}

updateAllImages();
