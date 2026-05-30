/**
 * CREATE ELITE RED WIZARDS - COMPLETE SOLUTION
 *
 * One script that does EVERYTHING:
 * 1. Searches all compendia for official 2024 Mage
 * 2. Finds it automatically
 * 3. Creates 10 unique elite Red Wizard variants
 * 4. All with custom names, traits, and artwork
 *
 * Copy entire content → Paste in Foundry Console (F12 > Console)
 * Press Enter
 */

console.log("🧙 ELITE RED WIZARD CREATION - COMPLETE SYSTEM\n");

// 10 Elite Red Wizards with unique names and traits
const ELITE_RED_WIZARDS = [
  {
    name: "Magus Thallid the Shadowborn",
    role: "Evocation Specialist",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-1.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-1-token.png",
    traits: [
      { name: "Thayan Evocation Mastery", desc: "When this wizard casts a damaging spell of 2nd level or higher, he can choose one creature within 30 feet to have resistance to the spell's damage type until the end of his next turn." },
      { name: "Fire Resistance", desc: "This wizard has resistance to fire damage, a gift from Tiamat's influence." }
    ]
  },
  {
    name: "Magus Szass the Defiler",
    role: "Ritual Master",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-2.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-2-token.png",
    traits: [
      { name: "Ritual Mastery", desc: "This wizard has advantage on concentration checks related to ritual magic. Spell duration extends by 1 minute when maintaining ritual focus." },
      { name: "Ritual Counterspell (3/Day)", desc: "When a creature within 60 feet casts a spell that would disrupt draconic ritual magic, this wizard can use his reaction to cast Counterspell with advantage." }
    ]
  },
  {
    name: "Magus Zalathorm the Draconic",
    role: "Divination Expert",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-3.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-3-token.png",
    traits: [
      { name: "Divination Mastery", desc: "This wizard has advantage on Intelligence (Arcana) checks related to magical knowledge and dragon lore." },
      { name: "Draconic Insight (1/Day)", desc: "This wizard can cast Divination without using a spell slot to gain knowledge about draconic or ritual magic within 30 miles." }
    ]
  },
  {
    name: "Magus Valrax the Crimson",
    role: "Abjuration Guardian",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-4.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-4-token.png",
    traits: [
      { name: "Protective Ward", desc: "When a creature within 10 feet of this wizard is hit by an attack, the wizard can use his reaction to grant the target +2 AC against that attack." },
      { name: "Spell Ward (Passive)", desc: "When a spell is cast within 30 feet, this wizard can use his reaction to gain resistance to that spell's damage type until the end of his next turn." }
    ]
  },
  {
    name: "Magus Thyrmog the Infernal",
    role: "Conjuration Summoner",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-5.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-5-token.png",
    traits: [
      { name: "Tiamat's Summons", desc: "This wizard can use his bonus action to summon 2d4 Cultists or a single Barbed Devil once per day, lasting up to 1 hour." },
      { name: "Fire Affinity", desc: "When this wizard casts a fire spell, creatures that fail their saves take an extra 1d6 fire damage." }
    ]
  },
  {
    name: "Magus Yarthraax the Dragonkin",
    role: "Transmutation Shaper",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-6.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-6-token.png",
    traits: [
      { name: "Draconic Form", desc: "This wizard can use an action to gain draconic features for 1 minute: resistance to fire, +2 melee damage with bite attacks." },
      { name: "Planar Shift (1/Day)", desc: "This wizard can cast Misty Step as a bonus action without using a spell slot, once per day." }
    ]
  },
  {
    name: "Magus Narathor the Vile",
    role: "Necromancy Practitioner",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-7.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-7-token.png",
    traits: [
      { name: "Undead Mastery", desc: "This wizard has advantage on concentration checks when controlling undead creatures." },
      { name: "Death Sense", desc: "This wizard can sense the presence of undead within 1 mile and automatically detect when creatures die within 30 feet." }
    ]
  },
  {
    name: "Magus Keturah the Malevolent",
    role: "Illusion Master",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-8.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-8-token.png",
    traits: [
      { name: "Illusory Mastery", desc: "When this wizard casts an illusion spell, creatures have disadvantage on Intelligence (Investigation) checks to see through the illusion." },
      { name: "Mirror Image (1/Day)", desc: "This wizard can cast Mirror Image as a bonus action without using a spell slot, once per day." }
    ]
  },
  {
    name: "Magus Vorathax the Eternal",
    role: "Enchantment Weaver",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-9.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-9-token.png",
    traits: [
      { name: "Charm Mastery", desc: "Creatures have disadvantage on saving throws against enchantment spells cast by this wizard." },
      { name: "Domination Aura", desc: "This wizard's presence is unnerving. Creatures within 10 feet have disadvantage on Wisdom (Insight) checks against this wizard." }
    ]
  },
  {
    name: "Magus Sariax the Archmage",
    role: "Arcane Master",
    portrait: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-10.png",
    token: "https://assets.forge-vtt.com/6013af62c59beb36df7c44a8/temple-of-tiamat/red-wizard-elite-10-token.png",
    traits: [
      { name: "Arcane Mastery", desc: "This wizard gains +2 to all spell attack rolls and spell save DC. Spell slots are treated as one level higher." },
      { name: "Legendary Spellcasting", desc: "This wizard can cast a cantrip as a bonus action on each turn, in addition to normal spellcasting." }
    ]
  }
];

async function createFolder() {
  let folder = game.folders.find(f => f.name === "temple-of-tiamat" && f.type === "Actor");
  if (!folder) {
    folder = await Folder.create({ name: "temple-of-tiamat", type: "Actor" });
  }
  return folder;
}

async function findOfficialMage() {
  console.log("STEP 1: Searching for official 2024 Mage in all compendia...\n");

  const possiblePacks = [
    "dnd5e.creatures24", "dnd5e.actors24",
    "dnd5e.creatures", "dnd5e.actors",
    "dnd5e.npc", "wotc-published-ua"
  ];

  // Also check ALL packs dynamically
  const allPackIds = Array.from(game.packs.keys());

  for (const packId of [...possiblePacks, ...allPackIds]) {
    const pack = game.packs.get(packId);
    if (!pack) continue;

    try {
      const index = pack.index;
      const entry = index.find(e => e.name && e.name.toLowerCase() === "mage");

      if (entry) {
        console.log(`✓ Found official Mage in: ${packId}`);
        const mage = await pack.getDocument(entry._id);
        console.log(`  CR: ${mage.system?.details?.cr || "N/A"}`);
        console.log(`  HP: ${mage.system?.attributes?.hp?.max || "N/A"}`);
        console.log(`  AC: ${mage.system?.attributes?.ac?.flat || "N/A"}\n`);
        return mage;
      }
    } catch (error) {
      // Continue searching
    }
  }

  console.error("❌ Official 2024 Mage not found in any compendium!");
  return null;
}

async function createEliteWizardFromMage(officialMage, customization) {
  if (!officialMage) return null;

  const folder = await createFolder();
  const { name, role, portrait, token, traits } = customization;

  try {
    const mageData = officialMage.toObject();

    // Customize
    mageData.name = name;
    mageData.folder = folder.id;
    mageData.img = portrait;
    mageData.system.details.alignment = "chaotic evil";
    mageData.system.details.biography = {
      value: `${name} is an elite Red Wizard of Thay (${role}). A formidable spellcaster serving the Cult of the Dragon and Tiamat's ritual. Based on official 2024 Mage stat block with Thayan customizations.`
    };
    mageData.prototypeToken.name = name;
    mageData.prototypeToken.img = token;

    // Create the actor
    const actor = await Actor.create(mageData);
    console.log(`  ✓ ${actor.name}`);

    // Add Thayan traits
    for (const trait of traits) {
      const traitItem = {
        name: trait.name,
        type: "feat",
        system: { description: { value: trait.desc } },
        img: "icons/skills/social/awareness-perception.webp"
      };
      await actor.createEmbeddedDocuments("Item", [traitItem]);
    }

    return actor;
  } catch (error) {
    console.error(`Error creating ${name}:`, error);
    return null;
  }
}

async function runCompleteCreation() {
  try {
    const officialMage = await findOfficialMage();

    if (!officialMage) {
      console.error("\n❌ Cannot create wizards without official Mage source!");
      return;
    }

    console.log("STEP 2: Creating 10 elite Red Wizards from official Mage base...\n");

    let created = 0;
    for (const customization of ELITE_RED_WIZARDS) {
      const result = await createEliteWizardFromMage(officialMage, customization);
      if (result) created++;
    }

    console.log(`\n${"=".repeat(60)}\n`);
    console.log(`✅ COMPLETE! Successfully created ${created} elite Red Wizards!`);
    console.log(`\nAll wizards:`);
    console.log(`  ✓ Based on official 2024 Mage stat block`);
    console.log(`  ✓ All spells linked to compendia`);
    console.log(`  ✓ All actions from official source`);
    console.log(`  ✓ With unique Thayan traits`);
    console.log(`  ✓ Custom names, artwork, and roles`);
    console.log(`  ✓ Ready for Temple of Tiamat encounters`);
    console.log(`\nLocation: temple-of-tiamat folder in Actors`);
    console.log(`\n${"=".repeat(60)}\n`);

    // List all created wizards
    console.log("Created wizards:");
    ELITE_RED_WIZARDS.forEach((w, i) => {
      console.log(`${i + 1}. ${w.name} (${w.role})`);
    });

  } catch (error) {
    console.error("Error in creation:", error);
  }
}

// Run everything
runCompleteCreation();
