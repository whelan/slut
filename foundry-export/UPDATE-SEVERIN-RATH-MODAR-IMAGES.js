/**
 * UPDATE SEVERIN & RATH MODAR IMAGES
 *
 * Updates portrait and token images for Severin and Rath Modar
 * Run this after STEP3 or CREATE-COMPLETE-TEMPLE-ANTAGONISTS.js
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🖼️  Updating Severin & Rath Modar images...\n");

const folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");

if (!folder) {
  console.error("❌ temple-of-tiamat folder not found!");
  console.error("   Run STEP1-8 first to create the folder and actors.");
} else {
  const allActors = game.actors.contents.filter(a => a.folder?.id === folder.id);

  // Update Severin
  const severin = allActors.find(a => a.name === "Severin");
  if (severin) {
    severin.update({
      img: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-severin.jpg",
      "prototypeToken.img": "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-severin-token.jpg"
    });
    console.log("✓ Severin: Portrait and token updated");
  } else {
    console.log("ℹ Severin not found (may need to run STEP3 first)");
  }

  // Update Rath Modar
  const rath = allActors.find(a => a.name === "Rath Modar");
  if (rath) {
    rath.update({
      img: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-rath-modar.jpg",
      "prototypeToken.img": "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-rath-modar-token.jpg"
    });
    console.log("✓ Rath Modar: Portrait and token updated");
  } else {
    console.log("ℹ Rath Modar not found (may need to run CREATE-COMPLETE-TEMPLE-ANTAGONISTS or STEP3 first)");
  }

  console.log("\n✅ Image updates complete!");
}
