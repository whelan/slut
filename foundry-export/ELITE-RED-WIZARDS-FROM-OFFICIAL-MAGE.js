/**
 * ELITE RED WIZARDS FROM OFFICIAL 2024 MAGE
 *
 * This script:
 * 1. Finds the official 2024 Mage in Foundry compendia
 * 2. Clones it as the base for elite Red Wizards
 * 3. Customizes with Thayan traits
 * 4. All spells and actions come from compendium (not embedded)
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🧙 Creating elite Red Wizards from official 2024 Mage...\n");

// Elite Red Wizard customizations (applied to official Mage base)
const ELITE_CUSTOMIZATIONS = [
  {
    name: "Magus Thallid the Shadowborn",
    baseRole: "War Mage specializing in evocation",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-1-token.png",
    alignment: "chaotic evil",
    traits: [
      {
        name: "Thayan Evocation Mastery",
        desc: "When Thallid casts a damaging spell of 2nd level or higher, he can choose one creature within 30 feet to have resistance to the spell's damage type until the end of his next turn."
      },
      {
        name: "Fire Resistance",
        desc: "Thallid has resistance to fire damage, a gift from Tiamat's influence."
      },
      {
        name: "Ritual Focus (3/Day)",
        desc: "When Thallid casts a spell as part of a ritual that requires concentration, he can maintain concentration for 1 additional minute beyond the spell's duration."
      }
    ]
  },
  {
    name: "Magus Szass the Defiler",
    baseRole: "Transmutation specialist with ritual focus",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-2.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-2-token.png",
    alignment: "chaotic evil",
    traits: [
      {
        name: "Ritual Mastery",
        desc: "Szass has advantage on concentration checks related to ritual magic. When Szass attempts to maintain ritual focus, the spell's duration extends by 1 minute. Szass can use Counterspell to defend or advance draconic rituals as a bonus action (3/Day)."
      },
      {
        name: "Fire Resistance",
        desc: "Szass has resistance to fire damage, a gift from Tiamat's influence."
      },
      {
        name: "Ritual Intervention (1/Day)",
        desc: "When another wizard within 60 feet fails a concentration check for ritual magic, Szass can use his bonus action to grant advantage on that check."
      }
    ]
  },
  {
    name: "Magus Zalathorm the Draconic",
    baseRole: "Divination expert serving Tiamat",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-3.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-3-token.png",
    alignment: "chaotic evil",
    traits: [
      {
        name: "Divination Mastery",
        desc: "Zalathorm has advantage on Intelligence (Arcana) checks related to magical knowledge, dragon lore, and ritual magic."
      },
      {
        name: "Fire Resistance",
        desc: "Zalathorm has resistance to fire damage, a gift from Tiamat's influence."
      },
      {
        name: "Draconic Insight (1/Day)",
        desc: "Zalathorm can cast Divination without using a spell slot or material components to gain knowledge about draconic or ritual magic within 30 miles."
      }
    ]
  }
];

async function createFolder() {
  let folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");
  if (!folder) {
    folder = await Folder.create({
      name: "temple-of-tiamat",
      type: "Actor"
    });
  }
  return folder;
}

async function findOfficialMage() {
  // Search for the official 2024 Mage in compendia
  const possiblePacks = ["dnd5e.creatures24", "dnd5e.creatures", "dnd5e.actors24", "dnd5e.actors"];

  for (const packId of possiblePacks) {
    const pack = game.packs.get(packId);
    if (!pack) continue;

    console.log(`Searching in ${packId}...`);
    const index = pack.index;

    // Look for "Mage" entry
    const entry = index.find(e => e.name.toLowerCase() === "mage");

    if (entry) {
      console.log(`✓ Found official Mage in ${packId}`);
      const mage = await pack.getDocument(entry._id);
      return mage;
    }
  }

  console.error("❌ Official 2024 Mage not found in any compendium!");
  console.error("   Make sure dnd5e system is installed and packs are available");
  return null;
}

async function createEliteRedWizardFromMage(officialMage, customization) {
  if (!officialMage) {
    console.error("No official Mage to clone from!");
    return;
  }

  const folder = await createFolder();
  const { name, baseRole, portrait, token, alignment, traits } = customization;

  try {
    // Clone the official Mage
    const mageData = officialMage.toObject();

    // Customize the clone
    mageData.name = name;
    mageData.folder = folder.id;
    mageData.img = portrait;
    mageData.system.details.alignment = alignment;
    mageData.system.details.biography = {
      value: `${name} is an elite Red Wizard of Thay (${baseRole}). A formidable spellcaster serving the Cult of the Dragon and Tiamat's ritual. Based on official 2024 Mage stat block.`
    };
    mageData.prototypeToken.name = name;
    mageData.prototypeToken.img = token;

    // Create the actor
    const actor = await Actor.create(mageData);
    console.log(`✓ Created: ${actor.name} (base: official Mage)`);

    // Add Thayan traits as feat items
    for (const trait of traits) {
      const traitItem = {
        name: trait.name,
        type: "feat",
        system: {
          description: { value: trait.desc }
        },
        img: "icons/skills/social/awareness-perception.webp"
      };
      await actor.createEmbeddedDocuments("Item", [traitItem]);
    }

    console.log(`  ✓ Added ${traits.length} Thayan traits`);
    console.log(`  ✓ All spells and actions from official Mage preserved\n`);

    return actor;

  } catch (error) {
    console.error(`Error creating ${name}:`, error);
    return null;
  }
}

async function runCreation() {
  try {
    console.log("Step 1: Finding official 2024 Mage...\n");
    const officialMage = await findOfficialMage();

    if (!officialMage) {
      console.error("Cannot proceed without official Mage. Aborting.");
      return;
    }

    console.log("\nStep 2: Creating elite Red Wizards from official Mage base...\n");

    let created = 0;
    for (const customization of ELITE_CUSTOMIZATIONS) {
      const result = await createEliteRedWizardFromMage(officialMage, customization);
      if (result) created++;
    }

    console.log(`\n✅ Successfully created ${created} elite Red Wizards!`);
    console.log(`   All based on official 2024 Mage stat block`);
    console.log(`   All spells and actions from official compendium`);
    console.log(`   Added Thayan customization traits`);
    console.log(`   Ready for combat in Temple of Tiamat`);

  } catch (error) {
    console.error("Error in creation process:", error);
  }
}

runCreation();
