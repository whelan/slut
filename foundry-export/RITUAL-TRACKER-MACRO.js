/**
 * RITUAL TRACKER MACRO - Hybrid Temple of Tiamat (Raw Layout + Round-Based Ritual)
 *
 * Tracks the summoning ritual as combat ROUNDS, not abstract clock points.
 * Heads appear progressively starting RITUAL ROUND 4.
 *
 * USAGE:
 *   1. Create as a Script Macro in Foundry (give it a hotbar slot)
 *   2. Click it at the END of each combat round to advance/check the ritual
 *   3. It posts a public chat card showing ritual state + which heads are active
 *   4. When a head's threshold is hit, it auto-spawns that head's token (if found)
 *
 * The macro stores state in a world flag, so it survives reloads.
 * Reset with: game.settings.set("world","ritualRound",0)  (or use the Reset button)
 *
 * Copy entire content → Foundry → Create Macro (type: script) → Paste → Save
 */

// ───────────────────────────────────────────────────────────────────
// CONFIG
// ───────────────────────────────────────────────────────────────────

const HEAD_SCHEDULE = {
  4: { color: "White", actor: "White Dragon Head of Tiamat",
       aura: "15 ft. zone: 2d6 cold/round (DC 13 CON)", element: "cold" },
  5: { color: "Black", actor: "Black Dragon Head of Tiamat",
       aura: "Acid spreads: 2d6 acid/round near portal (DC 13 CON)", element: "acid" },
  6: { color: "Green", actor: "Green Dragon Head of Tiamat",
       aura: "Poison + illusion (Insight DC 15 to ignore false images)", element: "poison" },
  7: { color: "Blue", actor: "Blue Dragon Head of Tiamat",
       aura: "Lightning arcs: 2d6 lightning/round near portal (DC 13 DEX)", element: "lightning" },
  8: { color: "Red", actor: "Red Dragon Head of Tiamat",
       aura: "TIAMAT FULLY MANIFEST — fire 3d6/round, all five heads active", element: "fire" }
};

const FOLDER_NAME = "temple-of-tiamat";   // where head actors live
const FLAG_SCOPE  = "world";
const FLAG_KEY    = "tiamatRitualRound";

// ───────────────────────────────────────────────────────────────────
// STATE HELPERS
// ───────────────────────────────────────────────────────────────────

function getRound() {
  return game.user.getFlag(FLAG_SCOPE, FLAG_KEY) ?? 0;
}
async function setRound(n) {
  await game.user.setFlag(FLAG_SCOPE, FLAG_KEY, n);
}

// Find a head actor by name in the temple folder (falls back to any actor)
function findHeadActor(name) {
  const folder = game.folders.find(f => f.name === FOLDER_NAME && f.type === "Actor");
  let actor = null;
  if (folder) actor = game.actors.find(a => a.name === name && a.folder?.id === folder.id);
  if (!actor) actor = game.actors.getName(name);
  return actor;
}

// Spawn a head token near the portal (center of current scene if no marker)
async function spawnHead(actorName) {
  const actor = findHeadActor(actorName);
  if (!actor) {
    ui.notifications.warn(`Head actor not found: ${actorName} (spawn manually)`);
    return false;
  }
  const scene = game.scenes.active;
  if (!scene) { ui.notifications.warn("No active scene to spawn into."); return false; }

  // Look for a note/token literally named "Portal" to anchor on; else center
  const portal = scene.tokens.find(t => /portal/i.test(t.name));
  const cx = portal ? portal.x : (scene.width / 2);
  const cy = portal ? portal.y : (scene.height / 2);

  const tokenData = await actor.getTokenDocument({ x: cx, y: cy });
  await scene.createEmbeddedDocuments("Token", [tokenData.toObject()]);
  return true;
}

// ───────────────────────────────────────────────────────────────────
// CHAT CARD
// ───────────────────────────────────────────────────────────────────

function buildCard(round) {
  const rows = [];
  for (let r = 4; r <= 8; r++) {
    const h = HEAD_SCHEDULE[r];
    const active = round >= r;
    const mark = active ? "🟢" : "⚪";
    const style = active ? "font-weight:bold;" : "opacity:0.5;";
    rows.push(`<tr style="${style}">
      <td>${mark} R${r}</td>
      <td><b>${h.color}</b></td>
      <td>${h.aura}</td>
    </tr>`);
  }

  let phase, color;
  if (round <= 3)      { phase = "BUILDING — no heads visible. Disrupt now!"; color = "#888"; }
  else if (round < 8)  { phase = `Round ${round}: ${HEAD_SCHEDULE[round].color} head ACTIVE`; color = "#c0392b"; }
  else                 { phase = "TIAMAT FULLY MANIFEST — all five heads"; color = "#8e0000"; }

  return `
  <div style="border:2px solid ${color};border-radius:6px;padding:8px;background:#1b1b1b;color:#eee;">
    <h2 style="margin:0 0 4px 0;color:${color};text-align:center;">RITUAL ROUND ${round}</h2>
    <p style="text-align:center;margin:0 0 6px 0;">${phase}</p>
    <table style="width:100%;font-size:11px;border-collapse:collapse;">
      <tr style="border-bottom:1px solid #555;"><th>When</th><th>Head</th><th>Effect</th></tr>
      ${rows.join("")}
    </table>
    <p style="font-size:10px;margin:6px 0 0 0;color:#aaa;">
      Disrupt: kill Red Wizards (−1 DC each) · destroy Mask (auto-fail) · stop sacrifice (DC 8)
    </p>
  </div>`;
}

// ───────────────────────────────────────────────────────────────────
// DIALOG
// ───────────────────────────────────────────────────────────────────

const current = getRound();

new Dialog({
  title: "Tiamat Ritual Tracker",
  content: `<p>Current Ritual Round: <b>${current}</b></p>
            <p>Heads appear from Round 4 onward.</p>`,
  buttons: {
    advance: {
      label: "▶ Advance (ritual NOT disrupted)",
      callback: async () => {
        let r = getRound() + 1;
        if (r > 8) r = 8;
        await setRound(r);
        // Spawn head if this round crosses a threshold
        if (HEAD_SCHEDULE[r]) {
          const ok = await spawnHead(HEAD_SCHEDULE[r].actor);
          if (ok) ui.notifications.info(`${HEAD_SCHEDULE[r].color} head spawned at portal.`);
        }
        ChatMessage.create({ content: buildCard(r) });
      }
    },
    hold: {
      label: "⏸ Hold (party disrupted)",
      callback: async () => {
        const r = getRound();
        ChatMessage.create({
          content: buildCard(r) +
            `<p style="color:#2ecc71;text-align:center;"><b>Ritual disrupted — round held at ${r}.</b></p>`
        });
      }
    },
    reset: {
      label: "↺ Reset to 0",
      callback: async () => {
        await setRound(0);
        ChatMessage.create({ content: `<p><b>Ritual reset to 0.</b> Portal collapsed — count restarts.</p>` });
      }
    }
  },
  default: "advance"
}).render(true);
