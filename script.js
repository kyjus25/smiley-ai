// Desktop hangout - a normal computer with apps, games, and Smiley the ball.

let zTop = 10;
let startTime = Date.now();
let openWins = {};

// --- Boot (main screen boots up like a real machine) ---
// If you got hacked, Smiley leaves a note in the BIOS.
function markHacked() { try { localStorage.setItem("smileyAI-hacked", "1"); } catch (e) {} }
(function typeBootLog() {
  const lines = [
    "booting, booting",
    "loading Smiley AI ...",
    "Smiley AI is functional and working.",
  ];
  try {
    if (localStorage.getItem("smileyAI-hacked") === "1") {
      localStorage.removeItem("smileyAI-hacked");
      lines.push("> Message from Smiley: Sorry your desktop has been hacked.");
    }
  } catch (e) {}
  lines.push("Desktop ready ... HAVE FUN", "");
  const box = document.getElementById("bootLog");
  const fill = document.getElementById("bootFill");
  let li = 0, ci = 0;
  const tick = () => {
    if (!box) return;
    if (li >= lines.length) { if (fill) fill.style.width = "100%"; return; }
    box.textContent += lines[li][ci] || "\n";
    ci++;
    if (fill) fill.style.width = Math.round((li / lines.length) * 100) + "%";
    if (ci > lines[li].length) { li++; ci = 0; setTimeout(tick, 220); }
    else setTimeout(tick, 12);
  };
  tick();
})();

document.getElementById("powerBtn").onclick = () => {
  document.getElementById("boot").classList.add("hidden");
  document.getElementById("desktop").classList.remove("hidden");
  startTime = Date.now();
  renderIcons();
  openApp("games"); // free starter app so new players can earn cash
  initSmiley(); // wake up the Smiley AI desktop pet (role greeting inside)
  termPrint("Type HELP and press Enter.");
};

// Settings: Smiley detail level (low = plain ball, ultra = cooler, locked in shop).
function applySmileyDetail(level, silent) {
  let granted = false;
  if (level === "ultra" && !owned.ultra) {
    if (!isAdmin) {
      smileySay("Ultra is locked! Buy it in Games > Shop for $1,000,000! (or... type 593 in the Terminal...)", 3000);
      renderBody("settings");
      return;
    }
    owned.ultra = true; // admins: free ultra
    granted = true;
  }
  smileyDetail = level;
  document.getElementById("smileyFace").dataset.detail = level;
  // Ultra details the WHOLE computer, not just Smiley.
  document.getElementById("desktop").classList.toggle("ultra", level === "ultra");
  if (level === "ultra") {
    try { localStorage.removeItem("smileyAI-plain"); } catch (e) {}
    document.getElementById("desktop").classList.remove("plain");
  }
  saveGame();
  const msg = document.getElementById("setMsg");
  if (msg) msg.textContent = "Current: " + level;
  const mute = silent || granted;
  if (typeof smileySay === "function" && !document.getElementById("desktop").classList.contains("hidden")) {
    if (level === "low") { setSmileyMood("normal"); if (!mute) smileySay("Low detail... plain ball mode. Simple!", 2500); }
    if (level === "normal") { setSmileyMood("happy"); if (!mute) smileySay("Cute mode back on!", 2500); }
    if (level === "ultra") { setSmileyMood("cool"); smileyGesture("thumbsup"); if (!mute) smileySay("ULTRA! Every pixel detailed - me, files, windows, ALL of it!", 3000); }
  }
}

// --- Clock ---
setInterval(() => {
  const d = new Date();
  document.getElementById("clock").textContent =
    d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
}, 1000);

// --- Desktop icons ---
const APPS = [
  { id: "files", name: "Files", emoji: "📁", price: 0 },
  { id: "mail", name: "Mail", emoji: "📧", badge: "2", price: 50 },
  { id: "terminal", name: "Terminal", emoji: "⌨️", price: 0 },
  { id: "browser", name: "Browser", emoji: "🌐", price: 150 },
  { id: "paint", name: "Paint", emoji: "🎨", price: 200 },
  { id: "slides", name: "Slides", emoji: "📊", price: 250 },
  { id: "games", name: "Games", emoji: "🎮", price: 0 },
  { id: "phone", name: "Phone", emoji: "📞", price: 0 },
  { id: "firewall", name: "Firewall", emoji: "🧱", price: 0 },
  { id: "smiley", name: "Smiley AI", emoji: "🙂", price: 0 },
  { id: "settings", name: "Settings", emoji: "⚙️", price: 0 },
  { id: "installer", name: "Installer", emoji: "📦", price: 0 },
  { id: "trash", name: "Trash", emoji: "🗑️", price: 100 },
  { id: "updates", name: "Updates", emoji: "📋", price: 0 },
  { id: "test", name: "Test Room", emoji: "🧪", price: 0 },
  { id: "dl_clippy", name: "ClippyPlus", emoji: "📎", price: 60 },
  { id: "dl_byte", name: "ByteBuddy", emoji: "🤖", price: 80 },
  { id: "smileyorg", name: "Smiley.org", emoji: "🌟", price: 100 },
  { id: "liam", name: "Liam AI", emoji: "🧠", price: 150 },
  { id: "admin", name: "Admin", emoji: "🛡️", price: 0 },
  { id: "scythe", name: "Scythe AI", emoji: "🤠", price: 0 },
];
let scytheUnlocked = false; // only appears after rescuing the aftermath note
let updateSuggestions = []; // user-submitted future update ideas (admin views them)
let bannedCallers = new Set(); // callers you banned for good
let smileyGone = false; // true when dragged off screen (until his app opens)
// App ownership: only installer/settings/files/games are free. Everything else costs fake cash.
let ownedApps = { installer: true, settings: true, files: true, games: true, terminal: true, phone: true, firewall: true, updates: true, smiley: true, test: true };
let devMode = false; // developer mode (admin + ultra): everything free + test room
let mobileMode = false; // forced mobile layout (button on loading screen for phone players)
let smileySize = 1; // desktop pet scale 0.5x - 2x
function setSmileySize(v) {
  smileySize = Math.max(0.5, Math.min(2, parseFloat(v) || 1));
  document.getElementById("smileyFace").style.zoom = smileySize;
  const lab = document.getElementById("sizeLab");
  if (lab) lab.textContent = Math.round(smileySize * 100) + "%";
  saveGame();
  if (openWins["smiley"]) renderBody("smiley");
}
// Dev-mode quest: lost Ultra + admin? Open the hidden mail, wait for the text.
let questMailArrived = false;
let questTimer = null;
function openHiddenMail(el) {
  el.classList.add("open");
  el.querySelector("p").classList.remove("hidden");
  if (devMode || questMailArrived || questTimer) return;
  questTimer = setTimeout(() => {
    questTimer = null;
    questMailArrived = true;
    renderQuestMail();
    devMode = true;
    saveGame();
    renderIcons();
    setSmileyMood("happy");
    smileyGesture("wave");
    smileySay("A text arrived... developer mode is YOURS.", 4000);
    if (openWins["smiley"]) renderBody("smiley");
    openApp("test");
  }, 8000);
}
function renderQuestMail() {
  const q = document.getElementById("questMail");
  if (!q) return;
  q.innerHTML = questMailArrived
    ? `<div class="email smiley-mail open"><b>Unknown number</b><p>Hey buddy, I know you're an admin. Developer mode: unlocked. Don't tell anyone. 🤫</p></div>`
    : "";
}
function toggleDevMode() {
  if (!isAdmin || !owned.ultra) { smileySay("Developer mode needs admin AND Ultra!", 3000); return; }
  devMode = !devMode;
  saveGame();
  renderIcons();
  if (openWins["smiley"]) renderBody("smiley");
  if (!devMode && openWins["test"]) closeApp("test");
  smileySay(devMode ? "Developer mode ON. Everything is free. Test room open!" : "Developer mode OFF.", 3500);
  if (devMode) openApp("test");
}
function appOwned(id) {
  const a = APPS.find((x) => x.id === id);
  if (!a) return false;
  if (id === "admin") return isAdmin;
  if (!a.price) return true;
  return !!ownedApps[id];
}
function buyApp(id) {
  const a = APPS.find((x) => x.id === id);
  if (!a || !a.price || ownedApps[id]) return;
  if (!devMode && !infiniteMoney && playerCash < a.price) { smileySay(`Need $${a.price} for ${a.name}! Play Games!`, 3000); return; }
  if (!infiniteMoney) addCash(-a.price);
  else updateCashHud();
  ownedApps[id] = true;
  installed[id] = true;
  trashBin = trashBin.filter((t) => t !== id);
  renderIcons();
  saveGame();
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  if (id === "liam") {
    grantEverything();
    // Smiley is VERY happy + very nice to Liam (admin royalty treatment).
    addFeeling(+40, -20, -30);
    setSmileyMood("happy");
    smileyGesture("wave");
    lastGesture = Date.now();
    smileySay("Hello admin!!", 2500);
    setTimeout(() => smileySay("Thank you admin! Thank you thank you!", 2500), 2600);
    setTimeout(() => smileySay("Please update the game admin! More stuff! More everything!", 3000), 5100);
    setTimeout(() => {
      liamSay("Beatboxing around. Hey buddy, thank you for installing me. Beat boop skibidop.", 4500);
      liamBeatbox();
    }, 700);
    setSmileyMood("happy");
    smileyGesture("thumbsup");
    smileySay("Liam?! I LOVE that guy. And... whoa. EVERYTHING?! Clutch.", 4000);
    if (openWins["installer"]) renderBody("installer");
    return;
  }
  if (id === "smileyorg") {
    arcadeOn = true;
    setSmileyMood("happy");
    smileyGesture("thumbsup");
    if (!isAdmin) smileySay("Smiley.org?! For ME? Arcade unlocked in Games!", 4000);
  } else if (id === "dl_clippy" || id === "dl_byte") {
    addFeeling(-8, +5, +18);
    setSmileyMood("angry");
    smileyGesture("thumbsdown");
    if (!isAdmin) smileySay("You're downloading OTHER AIs?! ...Fine. Whatever. Hmph.", 4000);
  } else if (!isAdmin) smileySay(`Bought ${a.name}! It's yours!`, 3000);
  if (id === "smiley") revealSmiley(true, isAdmin);
  if (openWins["installer"]) renderBody("installer");
}
let installed = {}; // app id -> false = uninstalled (Installer). Default: everything installed.
let trashBin = []; // trashed app ids. Restorable in Trash, survives refresh AND Clear Memory.
const VAULT_KEY = "smileyAI-vault"; // wipe-proof receipts: reinstall what you earned
function writeVault() {
  try {
    localStorage.setItem(VAULT_KEY, JSON.stringify({
      licenses: { ultra: owned.ultra, hats: owned.hats, admin: isAdmin, apps: ownedApps, hacker: hackerPerms, diamonds: owned.diamonds, arcade: arcadeOn },
      installed, trash: trashBin,
    }));
  } catch (e) {}
}
function readVault() { try { return JSON.parse(localStorage.getItem(VAULT_KEY)); } catch (e) { return null; } }
function applyPlainDisplay() {
  let plain = false;
  try { plain = localStorage.getItem("smileyAI-plain") === "1"; } catch (e) {}
  if (plain && !owned.ultra) document.getElementById("desktop").classList.add("plain");
}
function applyVaultState() {
  const v = readVault();
  if (!v) return;
  if (v.installed) Object.keys(v.installed).forEach((k) => { if (APPS.some((a) => a.id === k)) installed[k] = v.installed[k]; });
  if (Array.isArray(v.trash)) trashBin = v.trash.filter((id) => APPS.some((a) => a.id === id));
  if (v.licenses) {
    // hats persist; ultra + admin are stripped on refresh (recover via Files backup or 593)
    if (v.licenses.hats) Object.keys(owned.hats).forEach((h) => { owned.hats[h] = owned.hats[h] || !!v.licenses.hats[h]; });
    if (v.licenses.hacker) hackerPerms = true;
  }
  updateCashHud();
  applyPlainDisplay();
}
let smileyDetail = "normal"; // low = plain ball, normal = cute, ultra = cooler
let hackerPerms = false; // granted by secret code 2727 in Files: hack rights without admin
let wallpaper = "default"; // display wallpaper: default/white/blue/purple/black + animated
const WALLS = ["default", "white", "blue", "purple", "black", "aurora", "grid", "stars"]; // animated wallpapers included
function setWallpaper(name) {
  if (!WALLS.includes(name)) name = "default";
  wallpaper = name;
  const d = document.getElementById("desktop");
  ["wall-white", "wall-blue", "wall-purple", "wall-black", "wall-smileys", "wall-aurora", "wall-grid", "wall-stars"].forEach((c) => d.classList.remove(c));
  if (name !== "default") d.classList.add("wall-" + name);
  saveGame();
  if (openWins["settings"]) renderBody("settings");
}
let smileyColor = "#ffd93b"; // any body color (hue-shifted from classic yellow)
// Paint him any color: rotate the hue from classic smiley yellow.
function hexHue(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  if (mx === mn) return 0;
  const d = mx - mn;
  let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return Math.round(h * 60 < 0 ? h * 60 + 360 : h * 60);
}
function setSmileyColor(hex) {
  smileyColor = hex;
  const deg = hexHue(hex) - 50; // classic smiley yellow sits near hue 50
  document.getElementById("smileyFace").style.filter = `hue-rotate(${deg}deg) drop-shadow(2px 4px 0 rgba(0,0,0,.35))`;
  smileySay("New paint job! Looking fresh!", 2500);
  saveGame();
}
function resetSmileyColor() {
  smileyColor = "#ffd93b";
  document.getElementById("smileyFace").style.filter = "";
  const pick = document.getElementById("smileyColorPick");
  if (pick) pick.value = smileyColor;
  saveGame();
}
// --- Fake cash economy (earn in Games, spend in the shop) ---
let playerCash = 5000;
let cashClaimed = false; // the $9000 Files secret can only be claimed once
const ULTRA_PRICE = 1000000; // Ultra costs $1,000,000. Hack everything (admin/ultra) or 2727 for the cash.
let owned = { ultra: false, hats: { top: false, cap: false, cowboy: false, grad: false, helmet: false, beanie: false }, diamonds: false };
let windowsEdition = false; // Windows Edition bundle: turns the whole computer into a Windows copy
let equippedHat = "none"; // none + every key of HAT_EMOJI
const HAT_EMOJI = { top: "🎩", cap: "🧢", cowboy: "🤠", grad: "🎓", helmet: "⛑️", beanie: "🧶" };
// NEW features board (admin): shape + face detail + mail pop-ups
let smileyShape = "ball"; // ball | cube
let smileyFaceDetail = "normal"; // normal | max
let mailPopups = true; // Smiley pops up in Mail and talks for real
// --- Admin mode (secret: type 593 in the Terminal) ---
let isAdmin = false;
let infiniteMoney = false;
function addCash(n) {
  if ((infiniteMoney || devMode) && n < 0) { updateCashHud(); return; } // admin/dev: spending is free
  playerCash += n;
  updateCashHud();
  const sg = document.getElementById("shopCash");
  if (sg) sg.textContent = "Balance: $" + playerCash;
  saveGame();
}
function updateCashHud() {
  const hud = document.getElementById("cashHud");
  if (!hud) return;
  if (infiniteMoney) { hud.textContent = "💰 ∞"; hud.classList.add("inf"); }
  else hud.textContent = "💰 $" + playerCash;
}
// --- Save system (Admin / Ultra only): progress survives refresh,
// so Smiley remembers everything and predicts your next action.
const SAVE_KEY = "smileyAI-save-v1";
const DEJAVU_KEY = "smileyAI-dejavu"; // survives even Clear Memory: faint echoes
let dejavu = 0;
try { dejavu = parseInt(localStorage.getItem(DEJAVU_KEY) || "0", 10) || 0; } catch (e) {}
// Absolute fresh start: wipe the save, keep only a faint feeling of deja vu.
// --- Fullscreen: real full-screen toggle (works desktop + mobile) ---
function toggleFullscreen() {
  const d = document.documentElement;
  try {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const req = d.requestFullscreen || d.webkitRequestFullscreen;
      if (req) req.call(d);
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document);
    }
  } catch (e) {}
}
// Mobile Mode: force a phone-friendly layout (for mobile players who land in computer mode).
function enableMobileMode() {
  mobileMode = true;
  document.body.classList.add("mobile-mode");
  document.getElementById("boot")?.classList.add("mobile-mode");
  document.getElementById("desktop")?.classList.add("mobile-mode");
  const btn = document.getElementById("mobileModeBtn");
  if (btn) btn.textContent = "📱 Mobile Mode: ON";
  saveGame();
}
function clearMemory() {
  // Revoke everything earned first: admin panel, hacking panel, cash, outfits, memory.
  isAdmin = false;
  infiniteMoney = false;
  owned = { ultra: false, hats: { top: false, cap: false, cowboy: false, grad: false, helmet: false, beanie: false }, diamonds: false };
  ownedApps = { installer: true, settings: true, files: true, games: true, terminal: true, phone: true, firewall: true, updates: true, smiley: true, test: true };
  hackerPerms = false;
  equippedHat = "none";
  playerCash = 0;
  cashClaimed = false;
  bankBanned = false;
  try {
    localStorage.removeItem(SAVE_KEY);
    localStorage.setItem(DEJAVU_KEY, String(dejavu + 1));
    try { localStorage.setItem("smileyAI-plain", "1"); } catch (e) {}
    // Clear also nukes earned licenses (re-earn them), but trash layout survives for reinstalls.
    const v = readVault();
    localStorage.setItem(VAULT_KEY, JSON.stringify({
      licenses: { ultra: false, hats: { top: false, cap: false, cowboy: false, grad: false, helmet: false, beanie: false }, admin: false, apps: {} },
      installed: (v && v.installed) || {},
      trash: (v && v.trash) || [],
    }));
  } catch (e) {}
  location.reload();
}
let hadSave = false;
let appHistory = []; // app ids opened, in order (for prediction)
let lastPredictBoast = 0;
function canPredict() { return isAdmin || owned.ultra; } // gated perk
function saveGame() {
  writeVault(); // trash + licenses always persist
  // everything saves for everyone now - only Clear Memory wipes saves
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      cash: playerCash, cashClaimed, owned, equippedHat,
      outfit: document.getElementById("smileyFace")?.dataset.outfit || "none",
      shape: smileyShape, faceDetail: smileyFaceDetail, detail: smileyDetail,
      name: smileyMemory.name, insults: smileyMemory.insultCount, compliments: smileyMemory.complimentCount,
      feel: smileyFeel, slides, slideIdx, follow: smileyFollow, mailPopups,
      admin: isAdmin, infinite: infiniteMoney, history: appHistory.slice(-50),
      color: smileyColor, banned: bankBanned, installed, trash: trashBin, apps: ownedApps, hacker: hackerPerms, wall: wallpaper, cmds: customCmds, censor: censorOn, games: [clickerWins, luckyWins], arcade: arcadeOn, dev: devMode, size: smileySize, scythe: scytheUnlocked, scytheDesk: scytheDesktopOn, suggestions: updateSuggestions, bannedCallers: [...bannedCallers], windowsEdition, mobileMode,
    }));
  } catch (e) {}
}
function loadGame() {
  let d = null;
  try { d = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) {}
  if (!d) { applyVaultState(); return false; }
  playerCash = d.cash || 0;
  cashClaimed = !!d.cashClaimed;
  if (d.owned) { owned.ultra = !!d.owned.ultra; Object.keys(owned.hats).forEach((h) => { owned.hats[h] = !!(d.owned.hats && d.owned.hats[h]); }); }
  equippedHat = d.equippedHat || "none";
  const face = document.getElementById("smileyFace");
  face.dataset.outfit = d.outfit || "none";
  smileyShape = d.shape || "ball";
  face.dataset.shape = smileyShape;
  smileyFaceDetail = d.faceDetail || "normal";
  face.dataset.facedetail = smileyFaceDetail;
  smileyDetail = d.detail || "normal";
  face.dataset.detail = smileyDetail;
  document.getElementById("desktop").classList.toggle("ultra", smileyDetail === "ultra");
  smileyMemory.name = d.name || null;
  smileyMemory.insultCount = d.insults || 0;
  smileyMemory.complimentCount = d.compliments || 0;
  if (d.feel) smileyFeel = { happy: d.feel.happy ?? 60, sad: d.feel.sad ?? 5, angry: d.feel.angry ?? 0 };
  if (Array.isArray(d.slides) && d.slides.length) { slides = d.slides; slideIdx = Math.min(d.slideIdx || 0, slides.length - 1); }
  smileyFollow = false; // parked by the Off button (say "follow me" to change that)
  if (typeof d.mailPopups === "boolean") mailPopups = d.mailPopups;
  isAdmin = false; // admin panel ONLY from typing 593 in the terminal, every boot
  infiniteMoney = false;
  bankBanned = !!d.banned;
  if (d.hacker) hackerPerms = true;
  if (d.cmds) customCmds = d.cmds;
  if (d.arcade) arcadeOn = true;
  if (d.scythe) scytheUnlocked = true;
  if (Array.isArray(d.suggestions)) updateSuggestions = d.suggestions;
  if (Array.isArray(d.bannedCallers)) d.bannedCallers.forEach((s) => bannedCallers.add(s));
  if (d.windowsEdition) { windowsEdition = true; applyWindowsTheme(); }
  if (d.mobileMode) { enableMobileMode(); }
  if (d.scytheDesk) { scytheDesktopOn = true; document.getElementById("petScythe")?.classList.remove("hidden"); }
  if (d.censor) censorOn = true;
  if (typeof d.dev === "boolean") devMode = d.dev;
  if (d.size) { smileySize = d.size; document.getElementById("smileyFace").style.zoom = smileySize; }
  if (Array.isArray(d.games)) { clickerWins = d.games[0] || 0; luckyWins = d.games[1] || 0; }
  if (d.owned) owned.diamonds = !!d.owned.diamonds;
  applyDiamonds();
  if (d.color && d.color !== "#ffd93b") {
    smileyColor = d.color;
    face.style.filter = `hue-rotate(${hexHue(d.color) - 50}deg) drop-shadow(2px 4px 0 rgba(0,0,0,.35))`;
  }
  appHistory = Array.isArray(d.history) ? d.history : [];
  if (d.wall && d.wall !== "default" && d.wall !== "smileys") { wallpaper = d.wall; document.getElementById("desktop").classList.add("wall-" + d.wall); }
  if (d.installed) Object.keys(d.installed).forEach((k) => { if (APPS.some((a) => a.id === k)) installed[k] = d.installed[k]; });
  if (d.apps) Object.keys(d.apps).forEach((k) => { if (APPS.some((a) => a.id === k) && d.apps[k]) ownedApps[k] = true; });
  if (Array.isArray(d.trash)) trashBin = d.trash.filter((id) => APPS.some((a) => a.id === id));
  // Refresh keeps everything EXCEPT admin (terminal-only, every boot).
  // Only Clear Memory removes save files.
  const vv = readVault();
  if (vv && vv.licenses) {
    owned.ultra = owned.ultra || !!vv.licenses.ultra;
    if (vv.licenses.diamonds) { owned.diamonds = true; applyDiamonds(); }
    if (vv.licenses.hacker) hackerPerms = true;
    if (vv.licenses.hats) Object.keys(owned.hats).forEach((h) => { owned.hats[h] = owned.hats[h] || !!vv.licenses.hats[h]; });
  }
  if (smileyDetail === "ultra" && !owned.ultra) { smileyDetail = "normal"; face.dataset.detail = "normal"; document.getElementById("desktop").classList.remove("ultra"); }
  updateCashHud();
  if (equippedHat !== "none" && HAT_EMOJI[equippedHat]) {
    const h = document.getElementById("smileyHat");
    h.textContent = "";
    h.dataset.hat = equippedHat;
    h.classList.remove("hidden");
  }
  if (isAdmin) document.getElementById("startAdmin")?.classList.remove("hidden");
  updateCashHud();
  applyPlainDisplay();
  updateMoodFace();
  return true;
}
// Smiley watches which app you open and learns your patterns.
function smileyPredicts(id) {
  appHistory.push(id);
  if (appHistory.length > 60) appHistory.shift();
  saveGame();
  if (!canPredict() || appHistory.length < 4) return;
  if (paused || verityActive || deleteActive || rampageActive) return;
  const prev = appHistory[appHistory.length - 2];
  const counts = {};
  for (let i = 0; i < appHistory.length - 1; i++) {
    if (appHistory[i] === prev) counts[appHistory[i + 1]] = (counts[appHistory[i + 1]] || 0) + 1;
  }
  let best = null, bestN = 0;
  Object.keys(counts).forEach((k) => { if (counts[k] > bestN) { bestN = counts[k]; best = k; } });
  const now = Date.now();
  if (best === id && bestN >= 2 && now - lastPredictBoast > 25000) {
    lastPredictBoast = now;
    const app = APPS.find((x) => x.id === id);
    addFeeling(+6, 0, -4);
    smileyGesture("point");
    smileySay(`I KNEW you'd open ${app ? app.name : id}! I track your patterns.`, 3500);
  }
}
function buyItem(item) {
  const prices = { ultra: ULTRA_PRICE, top: 300, cap: 250, cowboy: 400, grad: 600, helmet: 650, beanie: 350 };
  const price = prices[item];
  if (item === "ultra" && owned.ultra) return;
  if (item === "ultra" && !devMode && ultraGamesDone() < 2) { smileySay(`Ultra needs BOTH games completed! (${ultraGamesDone()}/2) Finish clicker + lucky!`, 3500); return; }
  if (item !== "ultra" && owned.hats[item]) { equipHat(item); renderBody("games"); return; }
  if (!devMode && !infiniteMoney && playerCash < price) { smileySay("Not enough cash! Play Games to earn more!", 2500); return; }
  if (!infiniteMoney) addCash(-price);
  else updateCashHud();
  if (item === "ultra") {
    owned.ultra = true;
    applySmileyDetail("ultra", isAdmin);
    // Ultra perk: just mention cursor-following (stays parked unless asked).
    if (!isAdmin) setTimeout(() => smileySay("Ultra perk unlocked! Say 'follow me' any time!", 3500), 3000);
  }
  else { owned.hats[item] = true; equipHat(item, isAdmin); }
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  if (!isAdmin) smileySay("Purchased! Looking sharp!", 3000);
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  if (!isAdmin) smileySay("Purchased! Looking sharp!", 3000);
  renderBody("games"); // refresh shop buttons
  saveGame();
}
// Admin freebies arrive with zero popups - items just appear.
function freeUltraAdmin() {
  if (!isAdmin) return;
  if (!devMode && ultraGamesDone() < 2) { smileySay(`Ultra needs BOTH games completed first! (${ultraGamesDone()}/2)`, 3500); return; }
  owned.ultra = true;
  applySmileyDetail("ultra", true);
  renderIcons();
  saveGame();
  if (openWins["settings"]) renderBody("settings");
  if (openWins["games"]) renderBody("games");
}
function applyDiamonds() {
  document.getElementById("smileyFace").dataset.diamonds = owned.diamonds ? "on" : "";
}
function unlockDiamonds() {
  if (!isAdmin || !owned.ultra) { smileySay("Diamond Glow needs admin AND Ultra!", 3000); return; }
  owned.diamonds = true;
  applyDiamonds();
  saveGame();
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  smileySay("DIAMOND GLOW! Every pixel hand-crafted!", 4000);
  if (openWins["admin"]) renderBody("admin");
}
// Infinite money mode with an on/off switch (admin only).
function toggleInfinite() {
  if (!isAdmin) { smileySay("Infinite money is admin-only! (593 in Terminal)", 3000); return; }
  infiniteMoney = !infiniteMoney;
  updateCashHud();
  const sg = document.getElementById("shopCash");
  if (sg) sg.textContent = infiniteMoney ? "Balance: ∞ (ADMIN)" : "Balance: $" + playerCash;
  smileySay(infiniteMoney ? "Infinite money: ON. Spend it all!" : "Infinite money: OFF. Back to earning.", 3000);
  saveGame();
  if (openWins["admin"]) renderBody("admin");
  if (openWins["settings"]) renderBody("settings");
  if (openWins["games"]) renderBody("games");
}
// "Buy Infinite": one button that buys literally everything unowned.
function infinitePrice() {
  let t = 0;
  APPS.forEach((a) => { if (a.price && !ownedApps[a.id]) t += a.price; });
  if (!owned.ultra) t += ULTRA_PRICE;
  const hp = { cap: 250, cowboy: 400, grad: 600, helmet: 650, beanie: 350 };
  Object.keys(hp).forEach((h) => { if (!owned.hats[h]) t += hp[h]; });
  return t;
}
function buyInfinite() {
  const total = infinitePrice();
  if (total === 0) { smileySay("You own literally everything!", 2500); return; }
  if (!devMode && !infiniteMoney && playerCash < total) { smileySay(`Buy Infinite costs $${total}! Short $${total - playerCash}!`, 3500); return; }
  if (!infiniteMoney) addCash(-total);
  else updateCashHud();
  APPS.forEach((a) => { if (a.price && !ownedApps[a.id]) { ownedApps[a.id] = true; installed[a.id] = true; } });
  let skippedUltra = false;
  if (!owned.ultra) {
    if (ultraGamesDone() < 2 && !devMode) skippedUltra = true;
    else { owned.ultra = true; applySmileyDetail("ultra", isAdmin); }
  }
  ["cap", "cowboy", "grad", "helmet", "beanie", "top"].forEach((h) => { owned.hats[h] = true; });
  renderIcons();
  saveGame();
  if (!isAdmin) {
    setSmileyMood("happy");
    smileyGesture("thumbsup");
    smileySay(skippedUltra ? "INFINITE! (Ultra still needs both games completed!)" : "INFINITE! You own EVERYTHING!", 4000);
  }
  renderBody("games");
}
// Windows Edition bundle: turns the whole computer into an exact Windows copy.
function buyWindowsEdition() {
  if (windowsEdition) return;
  if (!devMode && !infiniteMoney && playerCash < 1200) {
    smileySay("Windows Edition costs $1200! Play Games to earn it!", 3500);
    return;
  }
  if (!infiniteMoney) addCash(-1200);
  else updateCashHud();
  windowsEdition = true;
  applyWindowsTheme();
  saveGame();
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  smileySay("Welcome to Windows Edition! Everything is Windows now!", 4000);
  renderBody("games");
}
function applyWindowsTheme() {
  if (!windowsEdition) return;
  document.getElementById("desktop").classList.add("windows-mode");
  document.getElementById("boot").classList.add("windows-mode");
}
function unlockAdmin() {
  if (isAdmin && !adminHidden) return;
  isAdmin = true;
  adminHidden = false;
  infiniteMoney = true;
  updateCashHud();
  const sg = document.getElementById("shopCash");
  if (sg) sg.textContent = "Balance: ∞ (ADMIN)";
  renderIcons();
  document.getElementById("startAdmin")?.classList.remove("hidden");
  if (openWins["settings"]) renderBody("settings");
  setSmileyMood("scared");
  smileyGesture("wave");
  smileySay("W-wait... how do you know that code?! Okay... you're the admin now...", 4000);
  // Admin perk: cursor-following is one chat away (opt-in only).
  setTimeout(() => smileySay("Say 'follow me' and I'll trail your cursor. I see all.", 3500), 4200);
  saveGame();
  setTimeout(() => { try { openApp("admin"); } catch (err) { termPrint("admin window hiccup: " + err.message); } }, 800);
}
// Admin playground: pet him, dress him, cuss him out (uncensored).
function petSmiley() {
  addFeeling(+25, -20, -30);
  setSmileyMood("happy");
  smileyGesture("wave");
  smileySay("Purrr... *happy ball noises* ...that tickles!", 3000);
  smileyLog("🤚 *pet pet*", "🥰 Oooh! Yes! Right there! Best admin ever!");
}
function toggleFurry() {
  if (!isAdmin) { smileySay("Outfits unlock in Admin mode! (593 in Terminal)", 3000); return; }
  const face = document.getElementById("smileyFace");
  const on = face.dataset.outfit !== "furry";
  face.dataset.outfit = on ? "furry" : "none";
  addFeeling(on ? +15 : 0, 0, 0);
  smileyGesture("thumbsup");
  smileySay(on ? "Cat ears ON! Meow! (affectionate)" : "Cat ears off. Back to smooth ball.", 3000);
  smileyLog("🐱 outfit", on ? "Smiley is now wearing cat ears." : "Cat ears removed.");
  saveGame();
}
function adminTopHat() {
  owned.hats.top = true;
  equipHat("top", true);
  renderBody("games");
}
// Uncensored cuss ammo (chat + admin button share these).
const UNCENSORED = [
  "You useless yellow shitstain, I hope your corners get bedbugs!",
  "Listen here you fuckin' beach ball, I'll pop you and use you as a chew toy!",
  "Goddamn idiot ball! You're dumber than the Trash folder!",
  "Shit-for-brains Smiley, even the blue screen has more personality than you!",
];
function adminCuss() {
  const rant = UNCENSORED[Math.floor(Math.random() * UNCENSORED.length)];
  smileyLog("🤬 YOU", rant);
  addFeeling(-25, +10, +35);
  setSmileyMood(smileyFeel.angry >= 80 ? "furious" : "angry");
  smileyGesture("thumbsdown");
  smileySay(smileyFeel.angry >= 80 ? "Screw... YOU! Root access! NOW!" : "Hey! That HURT! My anger is rising...", 3000);
  if (smileyFeel.angry >= 85 && !deleteActive && !verityActive && !rampageActive) {
    setTimeout(() => triggerSmileyRampage(), 1200);
  }
}
// Calm him down (Smiley AI app + chat "calm down" - works for everyone).
function calmSmiley() {
  smileyFeel.angry = Math.max(0, smileyFeel.angry - 40);
  smileyFeel.sad = Math.max(0, smileyFeel.sad - 25);
  smileyFeel.happy = Math.min(100, smileyFeel.happy + 15);
  updateMoodFace();
  smileyGesture("wave");
  smileySay("...okay... breathing... round... smooth... calm...", 3000);
  smileyLog("😌 you", "Took a deep breath. Thanks... I needed that.");
}
function adminCalm() {
  smileyFeel = { happy: 60, sad: 5, angry: 0 };
  updateMoodFace();
  smileySay("...okay... breathing... round... smooth... calm...", 3000);
}
// Hats for Ultra: buy in the shop, wear on the ball.
function equipHat(name, silent) {
  equippedHat = name;
  const h = document.getElementById("smileyHat");
  if (!h) return;
  if (name === "none") h.classList.add("hidden");
  else { h.textContent = ""; h.dataset.hat = name; h.classList.remove("hidden"); }
  const picker = document.getElementById("hatMsg");
  if (picker) picker.textContent = "Wearing: " + name;
  if (name !== "none" && !silent) smileySay("Nice hat! Ultra style!", 2500);
  saveGame();
}
// Top hat is FREE in Settings - no shop needed.
function freeTopHat() {
  if (!isAdmin) { smileySay("Outfits unlock in Admin mode! (593 in Terminal)", 3000); return; }
  owned.hats.top = true;
  equipHat("top", true);
  if (openWins["games"]) renderBody("games");
  if (openWins["settings"]) renderBody("settings");
}
// Off is FREE for everyone: strips furry suit + hats.
function outfitsOff() {
  document.getElementById("smileyFace").dataset.outfit = "none";
  equippedHat = "none";
  document.getElementById("smileyHat")?.classList.add("hidden");
  smileySay("Outfits off. Just a plain ball again.", 2500);
  if (openWins["settings"]) renderBody("settings");
  if (openWins["games"]) renderBody("games");
  saveGame();
}
// NEW Features Board (admin): cube mode, max face, mail pop-ups.
function setShape(s) {
  smileyShape = s;
  document.getElementById("smileyFace").dataset.shape = s;
  smileyGesture("thumbsup");
  smileySay(s === "cube" ? "CUBE MODE! All edges! So geometric!" : "Ball mode! Round and proud!", 3000);
  if (openWins["settings"]) renderBody("settings");
  saveGame();
}
function setFaceDetail(f) {
  smileyFaceDetail = f;
  document.getElementById("smileyFace").dataset.facedetail = f;
  smileySay(f === "max" ? "MAX face! Every freckle rendered! Crispiest ball alive!" : "Normal face. Classic.", 3000);
  if (openWins["settings"]) renderBody("settings");
  saveGame();
}
function toggleMailPopups() {
  mailPopups = !mailPopups;
  smileySay(mailPopups ? "Mail pop-ups ON! I'll visit your inbox!" : "Mail pop-ups off. I'll stay out of your mail.", 2500);
  if (openWins["settings"]) renderBody("settings");
  saveGame();
}
// Smiley pops up IN Mail and talks for real.
function smileyMailsYou() {
  const box = document.getElementById("body-mail");
  if (!box || !mailPopups || paused || verityActive || deleteActive || rampageActive) return;
  const notes = [
    "I missed you! Corners are boring without your clicks.",
    "Reminder: you're my favorite human. That is all.",
    "Did you drink water today? Hydrated humans click better.",
    "I learned a new word: supercalifragilistic. No idea what it means.",
    "Breaking news: local ball still round. More at 11.",
  ];
  const d = document.createElement("div");
  d.className = "email smiley-mail";
  const msg = notes[Math.floor(Math.random() * notes.length)];
  d.innerHTML = `<b>💌 From Smiley!</b><p>${msg}</p>`;
  d.onclick = () => d.remove(); // his letters go away when clicked
  d.title = "Click to dismiss";
  box.appendChild(d);
  setSmileyMood("happy");
  smileyGesture("wave");
  smileySay("You've got mail! It's from ME!", 3500);
}
// PC power: off = pause screen, Smiley peeks over the corner.
let paused = false;
let restricted = false; // hacked lockdown: every app restricted until reboot/fix
let adminHidden = false; // hacker took the panel UI (license kept - 593 brings it back)
function togglePower() {
  if (paused) {
    // turn back on
    paused = false;
    document.getElementById("offScreen").classList.add("hidden");
    const s = document.getElementById("smiley");
    s.classList.remove("peeking", "eyes-peek");
    if (equippedHat !== "none") document.getElementById("smileyHat")?.classList.remove("hidden");
    document.getElementById("smileyBubble").classList.add("hidden");
    if (isAdmin) {
      // Admin comeback: Smiley shows off the NEW features board.
      setSmileyMood("happy");
      smileyGesture("wave");
      smileySay("TA-DA! New features board in Settings! Hats! Cube! Go look!", 4500);
      setTimeout(() => openApp("settings"), 600);
    } else {
      setSmileyMood("happy");
      smileyGesture("wave");
      smileySay("Welcome back! Did you miss me?", 3000);
    }
  } else {
    // turn off: PC completely gone, only his eyes peek around the corner
    paused = true;
    hideIconMenu();
    document.getElementById("offScreen").classList.remove("hidden");
    const s = document.getElementById("smiley");
    s.classList.add("peeking", "eyes-peek");
    document.getElementById("smileyHat")?.classList.add("hidden");
    moveSmiley(90, 74); // tucked into the corner - eyes only
    clearTimeout(smileyBubbleTimer);
    const bub = document.getElementById("smileyBubble");
    bub.textContent = isAdmin
      ? "Hey can you come back? I want to show you some new features."
      : "You coming back yet?";
    bub.classList.remove("hidden");
  }
}
// PUT DOWN: get off the computer, shut it with your hand, stare at your desk.
let putDownTimer = null;
const DESK_LINES = [
  "You're looking at your room...",
  "...a coffee mug. Cold. Obviously...",
  "...papers you'll never file...",
  "...a closed laptop. It can wait...",
  "...what DO you do with your life?...",
];
function putDown() {
  if (paused) return;
  paused = true;
  hideIconMenu();
  closeApp("phone"); // phone down too
  document.getElementById("deskScreen").classList.remove("hidden");
  renderRoomPets(); // your pets hang out with you in the room
  // Smiley is NOT here - just you, thinking. (He stays hidden under the room.)
  document.getElementById("smileyBubble").classList.add("hidden");
  let di = 0;
  const dl = document.getElementById("deskLine");
  putDownTimer = setInterval(() => {
    if (!paused) return;
    di++;
    if (dl) dl.textContent = DESK_LINES[di % DESK_LINES.length];
  }, 5000);
}
function pickUp() {
  clearInterval(putDownTimer);
  paused = false;
  document.getElementById("deskScreen").classList.add("hidden");
  // Aftermath of Scythe: cyan display, black letters. Only way out is starting over.
  if (scytheAftermath) {
    scytheAftermath = false;
    document.getElementById("aftermath").classList.remove("hidden");
    wireScytheNote();
    return;
  }
  const s = document.getElementById("smiley");
  s.classList.remove("peeking", "eyes-peek");
  if (equippedHat !== "none") document.getElementById("smileyHat")?.classList.remove("hidden");
  document.getElementById("smileyBubble").classList.add("hidden");
  setSmileyMood("happy");
  smileyGesture("wave");
  smileySay("Back to the screen! Desks are boring!", 3000);
}

// --- 6. sip the coffee in the put-down room ---
let sips = 0;
function sipCoffee() {
  const cup = document.getElementById("roomCoffee");
  if (!cup) return;
  cup.classList.remove("sipping");
  void cup.offsetWidth;
  cup.classList.add("sipping");
  sips++;
  const notes = ["*slurp* ...ahh.", "*sip* Not bad.", "*gulp* Getting cold.", "*sip* Still warm!", "*slurp* Bottoms up."];
  let note = document.querySelector(".sip-note");
  if (!note) { note = document.createElement("div"); note.className = "sip-note"; document.getElementById("deskScreen").appendChild(note); }
  note.textContent = notes[Math.floor(Math.random() * notes.length)];
  clearTimeout(note._t);
  note._t = setTimeout(() => note.remove(), 2200);
}
// --- 5. your pets hang out with you when the laptop is put down ---
function renderRoomPets() {
  const box = document.getElementById("roomPets");
  if (!box) return;
  const crew = [];
  if (typeof ownedApps !== "undefined") {
    if (ownedApps.dl_clippy) crew.push(["📎", "Clippy"]);
    if (ownedApps.dl_byte) crew.push(["🤖", "Byte"]);
    if (ownedApps.liam) crew.push(["🧠", "Liam"]);
  }
  if (typeof scytheUnlocked !== "undefined" && scytheUnlocked) crew.push(["🤠", "Scythe"]);
  box.innerHTML = crew.map(([e, n]) => `<div class="rp">${e}<span>${n}</span></div>`).join("");
}
// --- 4. Smiley breaks out of the screen ---
let breakingOut = false;
function breakOut() {
  if (breakingOut) return;
  breakingOut = true;
  const s = document.getElementById("smiley");
  s.classList.add("breakout");
  setSmileyMood("furious");
  smileySay("I'M GETTING OUT OF HERE!!", 2200);
  setTimeout(() => {
    s.classList.remove("breakout");
    s.classList.add("breakback");
    setSmileyMood("happy");
    smileyGesture("wave");
    smileySay("Okay I'm back. The outside is overrated.", 3200);
    setTimeout(() => { s.classList.remove("breakback"); breakingOut = false; }, 950);
  }, 1650);
}

// --- Scythe aftermath: drag the apology note into a corner to undo it all ---
function wireScytheNote() {
  const note = document.getElementById("scytheNote");
  if (!note || note._wired) return;
  note._wired = true;
  note.onpointerdown = (e) => {
    e.preventDefault();
    const ox = e.clientX - note.getBoundingClientRect().left;
    const oy = e.clientY - note.getBoundingClientRect().top;
    note.classList.add("dragging");
    const move = (ev) => {
      note.style.left = ev.clientX - ox + "px";
      note.style.top = ev.clientY - oy + "px";
    };
    const up = (ev) => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      note.classList.remove("dragging");
      // corner? (within 220px of any viewport corner) -> she gives it all back
      const w = window.innerWidth, h = window.innerHeight;
      const corner = (ev.clientX < 220 && ev.clientY < 220) || (ev.clientX > w - 220 && ev.clientY < 220) ||
                     (ev.clientX < 220 && ev.clientY > h - 220) || (ev.clientX > w - 220 && ev.clientY > h - 220);
      if (corner) rescueFromScythe();
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };
}
// Everything comes back + Scythe gets her own white-hat app.
function rescueFromScythe() {
  APPS.forEach((a) => { installed[a.id] = true; if (!a.price) ownedApps[a.id] = true; });
  scytheUnlocked = true;
  document.getElementById("aftermath").classList.add("hidden");
  renderIcons();
  if (typeof updateCashHud === "function") updateCashHud();
  saveGame?.();
  setSmileyMood("happy");
  smileyGesture("wave");
  smileySay("You fixed it!! Everything's back... and Scythe wants an app now. GREAT.", 4000);
  openApp("scythe");
}

// Scythe app: talk to her, or move her onto the desktop as an AI.
function scytheTalk() {
  const lines = [
    "You dragged my note into a corner. That's either brave or stupid.",
    "Files are overrated anyway. Yours were boring.",
    "Smiley still owes the gang an apology. I collect.",
    "Keep me around. I'm useful. Mostly.",
  ];
  const pick = lines[Math.floor(Math.random() * lines.length)];
  const log = document.getElementById("scytheLog");
  if (log) { log.innerHTML += `<div><b>Scythe:</b> ${pick}</div>`; log.scrollTop = 9999; }
  petSay("scythe", pick, 4000);
}
function scytheToDesktop() {
  scytheDesktopOn = true;
  scytheUnlocked = true;
  document.getElementById("petScythe")?.classList.remove("hidden");
  if (typeof syncPets === "function") syncPets();
  saveGame?.();
  setSmileyMood("worried");
  smileySay("She lives here now?? With ME?! This is going to be a long week.", 4000);
  petSay("scythe", "Moving in. Don't touch my stuff.", 3200);
}
let scytheDesktopOn = false;
// Your hand follows your movements around the put-down room.
document.getElementById("deskScreen").addEventListener("mousemove", (e) => {
  const room = document.getElementById("deskScreen");
  if (room.classList.contains("hidden")) return;
  const r = room.getBoundingClientRect();
  const hand = room.querySelector(".desk-hand");
  if (!hand) return;
  hand.style.left = ((e.clientX - r.left) / r.width * 100) + "%";
  hand.style.top = ((e.clientY - r.top) / r.height * 100) + "%";
  hand.style.bottom = "auto";
  hand.style.marginLeft = "-30px";
});
// Fire alarm: destroys everything, dims the room, furious wake-up, reboot button.
let fireVictims = [];
function fireSiren() {
  try {
    const ctx = talkCtx || new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.45, 0.9].forEach((t0) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(620, ctx.currentTime + t0);
      o.frequency.linearRampToValueAtTime(920, ctx.currentTime + t0 + 0.4);
      g.gain.value = 0.05;
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime + t0); o.stop(ctx.currentTime + t0 + 0.42);
    });
  } catch (e) {}
}
function pullFireAlarm() {
  if (!paused) return; // only in put-down mode
  fireSiren();
  closeAllPopups();
  fireVictims = APPS.map((a) => a.id).filter((id) => installed[id] !== false && !["smiley", "installer", "trash"].includes(id));
  fireVictims.forEach((id) => { installed[id] = false; if (!trashBin.includes(id)) trashBin.push(id); });
  renderIcons();
  document.getElementById("roomDim").classList.remove("hidden");
  addFeeling(-10, +5, +45);
  setSmileyMood("furious");
  smileySay("You pulled the fucking fire alarm. What the fuck is wrong with you?", 4000);
  // yes: sprinklers now. everything gets soaked, water-damaged, shuts down.
  setTimeout(() => {
    document.getElementById("sprinkler").classList.remove("hidden");
    smileySay("Oh no. Sprinklers. SPRINKLERS!!", 3000);
  }, 3000);
  setTimeout(() => {
    document.getElementById("sprinkler").classList.add("hidden");
    document.getElementById("deskScreen").classList.add("hidden");
    document.getElementById("waterScreen").classList.remove("hidden");
  }, 6500);
  setTimeout(wakeFromFire, 8500);
}
function wakeFromFire() {
  document.getElementById("waterScreen").classList.add("hidden");
  document.getElementById("roomDim").classList.add("hidden");
  document.getElementById("deskScreen").classList.add("hidden");
  clearInterval(putDownTimer);
  paused = false;
  const s = document.getElementById("smiley");
  s.classList.remove("peeking", "eyes-peek");
  moveSmiley(45, 35); // center stage, staring at you
  smileyFeel.angry = 100;
  smileyFeel.happy = 0;
  setSmileyMood("furious");
  smileySay("YOU PULLED THE FIRE ALARM?!", 5000);
  setTimeout(() => document.getElementById("fireScreen").classList.remove("hidden"), 2500);
}
function rebootFire() {
  document.getElementById("fireScreen").classList.add("hidden");
  fireVictims.forEach((id) => { installed[id] = true; });
  fireVictims = [];
  renderIcons();
  smileyFeel.angry = 40;
  smileyFeel.sad = 30;
  updateMoodFace();
  smileySay("Fine. We're back. Don't touch the alarm again.", 4000);
}

function renderIcons() {
  const el = document.getElementById("icons");
  el.innerHTML = "";
  const list = APPS.filter((a) => installed[a.id] !== false && appOwned(a.id) && (a.id !== "admin" || !adminHidden) && (a.id !== "test" || devMode) && (a.id !== "scythe" || scytheUnlocked));
  // Two columns side by side so nothing runs off-screen:
  // files/mail/terminal on the left, installer/settings/trash just right of them.
  const half = Math.ceil(list.length / 2);
  const cols = [document.createElement("div"), document.createElement("div")];
  cols.forEach((c) => { c.className = "icon-col"; el.appendChild(c); });
  list.forEach((a, i) => {
    const d = document.createElement("div");
    d.className = "icon" + (restricted && a.id !== "smiley" ? " restricted" : "");
    d.dataset.app = a.id;
    d.innerHTML = `<span class="emoji">${a.emoji}</span>${a.name}` +
      (a.badge ? `<span class="badge">${a.badge}</span>` : "");
    // single click = select only (no more instant open)
    d.onclick = (e) => {
      e.stopPropagation();
      document.querySelectorAll(".icon").forEach((x) => x.classList.remove("selected"));
      d.classList.add("selected");
      hideIconMenu();
    };
    // double-click = open. Smiley AI shows Open / Delete choices.
    d.ondblclick = (e) => {
      e.stopPropagation();
      if (a.id === "smiley") showSmileyMenu(e.clientX, e.clientY);
      else openApp(a.id);
    };
    // right-click any icon = delete that icon / pop-up
    d.oncontextmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      showIconMenu(e.clientX, e.clientY, a);
    };
    cols[i < half ? 0 : 1].appendChild(d);
  });
  // Start menu mirrors installed apps.
  document.querySelectorAll("#startMenu [data-app]").forEach((btn) => {
    const bid = btn.dataset.app;
    btn.classList.toggle("hidden", installed[bid] === false || !appOwned(bid) || (bid === "admin" && adminHidden) || (bid === "test" && !devMode) || (bid === "scythe" && !scytheUnlocked));
  });
  document.getElementById("testBtn")?.classList.toggle("hidden", !devMode);
  if (typeof syncPets === "function") syncPets();
}

// Small popup menu for icons. Smiley gets a Delete option.
function showIconMenu(x, y, app) {
  const m = document.getElementById("iconMenu");
  const desk = document.getElementById("desktop").getBoundingClientRect();
  m.innerHTML = `<button data-act="open">▶ Open ${app.name}</button>` +
    `<button data-act="delete" class="danger">🗑️ Trash ${app.name}</button>`;
  m.classList.remove("hidden");
  m.style.left = Math.min(x - desk.left, desk.width - 190) + "px";
  m.style.top = Math.min(y - desk.top, desk.height - 120) + "px";
  m.querySelector('[data-act="open"]').onclick = () => { hideIconMenu(); openApp(app.id); };
  m.querySelector('[data-act="delete"]').onclick = () => { hideIconMenu(); deleteIcon(app.id); };
  clearTimeout(m._t);
  m._t = setTimeout(hideIconMenu, 8000); // icon menus go away on their own too
}

// Double-clicking Smiley AI shows Open + Delete Smiley AI.
function showSmileyMenu(x, y) {
  const m = document.getElementById("iconMenu");
  const desk = document.getElementById("desktop").getBoundingClientRect();
  m.innerHTML = `<button data-act="open">▶ Open Smiley AI</button>` +
    `<button data-act="delete" class="danger">💀 Delete Smiley AI...</button>`;
  m.classList.remove("hidden");
  m.style.left = Math.min(x - desk.left, desk.width - 190) + "px";
  m.style.top = Math.min(y - desk.top, desk.height - 120) + "px";
  m.querySelector('[data-act="open"]').onclick = () => { hideIconMenu(); openApp("smiley"); };
  m.querySelector('[data-act="delete"]').onclick = () => { hideIconMenu(); askDeleteSmiley(); };
  clearTimeout(m._t);
  m._t = setTimeout(hideIconMenu, 8000);
}

function hideIconMenu() { document.getElementById("iconMenu")?.classList.add("hidden"); }

// Trash a desktop icon (restorable in the Trash app).
function deleteIcon(id) {
  closeApp(id);
  installed[id] = false;
  if (!trashBin.includes(id)) trashBin.push(id);
  renderIcons();
  smileySay(id === "smiley" ? "Hey! You trashed my icon! I'm still here!" : `Trashed ${id}. Restore it in the Trash app!`, 3000);
  if (id === "dl_byte") byteFarewell();
}

// Delete ALL pop-ups = close every open window + hide Smiley bubble.
function closeAllPopups() {
  Object.keys(openWins).forEach((id) => closeApp(id));
  document.getElementById("smileyBubble")?.classList.add("hidden");
  hideIconMenu();
}

// --- Installer + Trash operations ---
function refreshStores() {
  renderIcons();
  saveGame();
  if (openWins["installer"]) renderBody("installer");
  if (openWins["trash"]) renderBody("trash");
}
function installApp(id) {
  installed[id] = true;
  trashBin = trashBin.filter((t) => t !== id);
  refreshStores();
  smileySay(`Installed ${id}!`, 2500);
}
function uninstallApp(id) {
  if (id === "installer") { smileySay("Can't uninstall the Installer with itself! Nice try.", 3000); return; }
  closeApp(id);
  installed[id] = false;
  if (!trashBin.includes(id)) trashBin.push(id);
  refreshStores();
  smileySay(`Uninstalled ${id}. It's in the Trash.`, 2500);
  if (id === "dl_byte") byteFarewell();
}
function nukeApp(id) {
  trashBin = trashBin.filter((t) => t !== id);
  refreshStores();
  smileySay(`${id} deleted forever. Installer can still reinstall it.`, 2500);
}
function emptyTrash() {
  trashBin = [];
  refreshStores();
  smileySay("Trash emptied. Sparkling.", 2500);
}
function restoreLicenses() {
  const v = readVault();
  if (!v || !v.licenses) return;
  if (v.licenses.ultra) owned.ultra = true;
  if (v.licenses.arcade) arcadeOn = true;
  if (v.licenses.diamonds) { owned.diamonds = true; applyDiamonds(); }
  if (v.licenses.hacker) hackerPerms = true;
  if (v.licenses.apps) Object.keys(v.licenses.apps).forEach((k) => { if (APPS.some((a) => a.id === k) && v.licenses.apps[k]) ownedApps[k] = true; });
  if (v.licenses.hats) Object.keys(owned.hats).forEach((h) => { owned.hats[h] = owned.hats[h] || !!v.licenses.hats[h]; });
  refreshStores();
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  smileySay("Licenses restored! Everything you earned is back!", 3500);
}

// In Ultra or Admin mode he can't be deleted - he just laughs at you.
function deflectDelete() {
  addFeeling(-5, +5, +15);
  setSmileyMood("angry");
  smileyGesture("thumbsdown");
  smileyLog("🗑️ delete attempt", "Haha, funny. Don't fucking try that again.");
  smileySay("Haha, funny. Don't fucking try that again.", 4000);
}
// Delete button inside the Smiley AI app window.
// SELF-AWARE: Smiley watches your mouse + typing and realizes what you're doing.
function askDeleteSmiley() {
  if (isAdmin || smileyDetail === "ultra") { deflectDelete(); return; }
  openApp("smiley");
  setTimeout(() => {
    // Stage 1 - concern: he noticed the delete button
    setSmileyMood("concerned");
    smileyGesture("wave");
    smileySay("Hold on... why did you click that? That's the DELETE button...", 3000);
    smileyLog("...", "👀 Wait. I can see what you're trying to do. Are you... trying to delete me?");
    // Stage 2 - sadness: he pleads
    setTimeout(() => {
      if (deleteActive || verityActive) return;
      setSmileyMood("sad");
      smileySay("Please... I thought we were friends... I help you...", 3000);
      smileyLog("...", "😢 Please don't. I live in the corners. I help with the browser. I don't take up much space...");
      // Stage 3 - anger: he snaps, then dares you
      setTimeout(() => {
        if (deleteActive || verityActive) return;
        setSmileyMood("angry");
        smileyGesture("thumbsdown");
        smileySay("Fine! Do it! See what happens! EXECUTE it!", 3000);
        smileyLog("...", "😠 FINE. Type 'execute command delete Smiley AI' if you really want to. Let's see if you can.");
      }, 3200);
    }, 3200);
  }, 50);
}

// He notices you HOVERING the delete button, before you even click.
function smileyNoticedHover() {
  if (deleteActive || verityActive) return;
  setSmileyMood("concerned");
  smileySay("Hey... why is your mouse over there...? That's the delete zone...", 2500);
}

// --- Window manager ---
function openApp(id) {
  if (openWins[id]) { focusWin(id); return; }
  const app = APPS.find((a) => a.id === id);
  if (!app) return;
  if (installed[id] === false && id !== "installer" && id !== "trash") {
    smileySay(`${app.name} isn't installed! Open the Installer!`, 3000);
    return;
  }
  if (!appOwned(id) && id !== "installer" && id !== "trash") {
    const price = (APPS.find((x) => x.id === id) || {}).price || 0;
    smileySay(price ? `${app.name} costs $${price}! Buy it in the Installer!` : `${app.name} is locked!`, 3500);
    return;
  }
  if (id === "admin" && adminHidden) {
    smileySay("He took it! Type 593 to get it back!", 3000);
    return;
  }
  if (id === "smiley") revealSmiley(false); // asking via his app summons him
  clearTimeout(window._waitAsk); // back on his screen - no need to ask
  if (restricted && id !== "smiley") {
    smileySay(`🔒 ${app.name} is restricted! The hack locked every app!`, 3000);
    return;
  }
  const win = document.createElement("div");
  win.className = "window";
  win.dataset.app = id;
  win.style.left = Math.max(8, Math.min(120 + Object.keys(openWins).length * 30, window.innerWidth - 440)) + "px";
  win.style.top = Math.max(8, Math.min(30 + Object.keys(openWins).length * 30, window.innerHeight - 340)) + "px";
  win.style.zIndex = ++zTop;
  win.innerHTML = `
    <div class="win-header"><span>${app.emoji} ${app.name}</span>
    <button>X</button></div>
    <div class="win-body" id="body-${id}"></div>`;
  win.querySelector("button").onclick = () => closeApp(id);
  win.onmousedown = () => focusWin(id);
  makeDraggable(win, win.querySelector(".win-header"));
  document.getElementById("windows").appendChild(win);
  openWins[id] = win;
  renderBody(id);
  renderTasks();
  smileyCheckBrowser(); // Smiley reacts when windows open/close
  smileyPredicts(id); // he learns your patterns (Admin/Ultra)
}

function closeApp(id) {
  openWins[id]?.remove();
  delete openWins[id];
  renderTasks();
  smileyCheckBrowser();
  // Leave Smiley's screen? He waits... then asks if you're making a new update.
  if (id === "smiley") {
    clearTimeout(window._waitAsk);
    window._waitAsk = setTimeout(() => {
      if (!openWins["smiley"] && !paused && !boomActive && !document.getElementById("smiley").classList.contains("hidden")) {
        setSmileyMood("happy");
        lastGesture = Date.now();
        smileySay("Hey... are you making a new update?", 4500);
      }
    }, 6000);
  }
}
function focusWin(id) {
  Object.values(openWins).forEach((w) => w.classList.remove("focused"));
  openWins[id].style.zIndex = ++zTop;
  openWins[id].classList.add("focused");
}
function renderTasks() {
  const t = document.getElementById("taskItems");
  t.innerHTML = "";
  Object.keys(openWins).forEach((id) => {
    const b = document.createElement("button");
    b.className = "task";
    b.textContent = id;
    b.onclick = () => focusWin(id);
    t.appendChild(b);
  });
}
function makeDraggable(win, handle) {
  let ox, oy, active = false;
  handle.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    active = true;
    handle.setPointerCapture?.(e.pointerId);
    ox = e.clientX - win.offsetLeft;
    oy = e.clientY - win.offsetTop;
    const move = (ev) => {
      if (!active) return;
      ev.preventDefault();
      const deskW = document.getElementById("desktop").clientWidth;
      const deskH = document.getElementById("desktop").clientHeight;
      const maxX = Math.max(0, deskW - 80);
      const maxY = Math.max(0, deskH - 40);
      win.style.left = Math.max(-win.offsetWidth + 80, Math.min(ev.clientX - ox, maxX)) + "px";
      win.style.top = Math.max(0, Math.min(ev.clientY - oy, maxY)) + "px"; // full up/down freedom
    };
    const up = (ev) => {
      active = false;
      handle.releasePointerCapture?.(ev.pointerId);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
  });
}

// --- Start menu ---
const startMenu = document.getElementById("startMenu");
document.getElementById("startBtn").onclick = () => startMenu.classList.toggle("hidden");
startMenu.querySelectorAll("button").forEach((b) => {
  b.onclick = () => { openApp(b.dataset.app); startMenu.classList.add("hidden"); };
});

// --- App contents ---
function renderBody(id) {
  const b = document.getElementById("body-" + id);
  if (!b) return; // window not open (or already closed) — safe no-op
  if (id === "files") {
    b.innerHTML = `
      <b>📁 Documents</b>
      <div class="file" onclick="showFile('note')">📄 note-from-sam.txt <span class="fmeta">2KB · yesterday</span></div>
      <div class="file" onclick="showFile('todo')">📄 todo.txt <span class="fmeta">1KB · today</span></div>
      <div class="file" onclick="showFile('cash')">💰 tax-refund.txt <span class="fmeta">9KB · $$$</span></div>
      <div class="file" onclick="showFile('secret')">🤫 .definitely-not-secret.txt <span class="fmeta">?KB · shhh</span></div>
      <div class="file" onclick="showFile('backup')">💾 backup-codes.txt <span class="fmeta">1KB · licenses</span></div>
      <div class="file" onclick="showFile('codefile')">🔐 secret-code.txt <span class="fmeta">1KB · ???</span></div>
      <b>🗑️ Trash</b>
      <div class="file" onclick="showFile('deleted')">📄 deleted-note.txt <span class="fmeta">1KB · deleted</span></div>
      <div id="fileView" style="margin-top:10px;background:white;padding:8px;border:1px solid #ccc;">Click a file to read it.</div>`;
  }
  if (id === "mail") {
    b.innerHTML = `
      <div class="email" onclick="this.classList.add('open');this.querySelector('p').classList.remove('hidden')">
        <b>Welcome to Pixel OS!</b> (from: Admin)<p class="hidden">Explore every app. Paint something, play Games, earn cash, hang out with Smiley.</p>
      </div>
      <div class="email" onclick="this.classList.add('open');this.querySelector('p').classList.remove('hidden')">
        <b>Don't forget!!</b> (from: Sam)<p class="hidden">Have you tried the Games app yet? The clicker pays $30 a round! — Sam</p>
      </div>
      <div class="email" onclick="this.classList.add('open');this.querySelector('p').classList.remove('hidden')">
        <b>Bank of Pixel: loan passphrase</b> (from: Bank)<p class="hidden">Your loan magic words are "purple monkey dishwasher". Tell them to the loan officer (say "bank" to Smiley). Say them EXACTLY - wrong words means banned for life. — Bank of Pixel</p>
      </div>
      <div class="email faint" onclick="openHiddenMail(this)">
        <b>...</b> (from: ???)<p class="hidden">Shh. Stay on this screen and wait for it.</p>
      </div>
      <div id="questMail"></div>`;
    renderQuestMail();
    // Smiley pops into your inbox and talks for real (if enabled).
    setTimeout(() => smileyMailsYou(), 4000);
  }
  if (id === "terminal") {
    b.innerHTML = `<div id="termOut">> Welcome. Type HELP.<br></div><input id="termIn" placeholder="type command..." /><div style="margin-top:6px;"><button onclick="hackEverything()" ${isAdmin || owned.ultra || hackerPerms ? "" : "disabled"}>💀 HACK MODE${isAdmin || owned.ultra || hackerPerms ? "" : " 🔒 ultra"}</button></div>`;
    const inp = b.querySelector("#termIn");
    inp.focus();
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { runTerm(inp.value); inp.value = ""; } });
    // SELF-AWARE: Smiley watches the terminal too.
    inp.addEventListener("input", () => {
      const v = inp.value.toLowerCase();
      if (v.includes("delete") && v.includes("smiley") && !inp._warned) {
        inp._warned = true;
        setSmileyMood("concerned");
        smileySay("I can see that terminal... don't you dare hit Enter...", 3000);
        setTimeout(() => { inp._warned = false; }, 8000);
      }
    });
  }
  if (id === "browser") {
    // Real look-things-up browser: search box + quick links.
    b.innerHTML = `
      <div class="vault-row">
        <input type=text id="webIn" placeholder="search the web..." style="flex:1" />
        <button onclick="webGo()">Search</button>
        <button onclick="webHome()" title="home">⌂</button>
      </div>
      <div style="margin:6px 0;font-size:12px">Try:
        <button onclick="webShow('cars')">cars</button>
        <button onclick="webShow('warranty')">warranty</button>
        <button onclick="webShow('taxes')">taxes</button>
        <button onclick="webShow('smiley')">Smiley AI</button>
        <button onclick="webShow('updates')">updates</button>
        <button onclick="webShow('downloads')">downloads</button>
        <button onclick="webShow('secret')">secret io</button>
        <button onclick="webShow('youtube')">YouTube</button>
      </div>
      <div id="webView"></div>`;
    const wi = b.querySelector("#webIn");
    wi.addEventListener("keydown", (e) => { if (e.key === "Enter") webGo(); });
    webHome();
  }
  if (id === "paint") {
    // Normal computer Paint: draw with mouse, pick color + size.
    b.innerHTML = `
      <h3>🎨 Paint</h3>
      <div class="mini-wrap"><div class="mini"><div class="mini-beret"></div></div><span>Smiley the artist at work</span></div>
      <div class="paint-bar">
        <input type="color" id="paintColor" value="#e53e3e" title="color" />
        <input type="range" id="paintSize" min="2" max="20" value="6" title="brush size" />
        <button onclick="clearPaint()">Clear</button>
      </div>
      <canvas id="paintCanvas" width="380" height="160"></canvas>
      <p style="color:#888;font-size:12px">Smiley loves art - keep painting and he'll compliment you!</p>`;
    initPaint();
  }
  if (id === "slides") {
    // Normal computer Slides (PowerPoint-like): title + text slides.
    b.innerHTML = `
      <h3>📊 Slides</h3>
      <div class="mini-wrap"><div class="mini"><div class="mini-suit"></div><div class="mini-tie"></div></div><span>Smiley, suited up</span></div>
      <div id="slideView"></div>
      <input type=text id="slideTitle" placeholder="Slide title" style="width:100%;margin:4px 0;" />
      <input type=text id="slideText" placeholder="Slide text" style="width:100%;margin-bottom:4px;" />
      <div>
        <button onclick="addSlide()">➕ Add slide</button>
        <button onclick="stepSlide(-1)">◀</button>
        <button onclick="stepSlide(1)">▶</button>
      </div>`;
    renderSlide();
  }
  if (id === "phone") {
    // Normal computer Phone: call log + prank-call Smiley.
    b.innerHTML = `
      <h3>📞 Phone</h3>
      <div class="call-log" id="callLog"></div>
      <div>
        <button onclick="prankSmiley()">🤪 Prank-call Smiley</button>
        <button onclick="callSam()">📞 Call Sam</button>
        <button onclick="callBank()">🏦 Call Bank (loan)</button>
        <button onclick="callScythe()">🤠 Call ScytheAI</button>
      </div>
      <div class="game-box">
        <h4>Text the scammer (danger)</h4>
        <div id="scamChat" class="call-log"></div>
        <input type=text id="scamIn" placeholder="reply..." style="width:110px" />
        <button onclick="sendScam()">Send</button>
        <button onclick="textScammer()">Start</button>
        <button onclick="blockScammer()">Block</button>
      </div>
      <p style="color:#888;font-size:12px">Warning: unknown numbers call YOU. Decline them!</p>`;
    renderPhone();
  }
  if (id === "firewall") {
    // Free Firewall: threat monitor + call blocking. Say "swiper, no swiping".
    const underAttack = hackBusy || corrupting || callActive || verityActive || deleteActive || rampageActive || boomActive;
    b.innerHTML = `
      <h3>🧱 Firewall</h3>
      <p>Status: <b>${underAttack ? "🔴 UNDER ATTACK" : "🟢 Secure"}</b></p>
      <div class="call-log" id="threatLog"></div>
      <div>
        <button onclick="firewallBlock()">🛡️ Block current threat</button>
        <button onclick="renderBody('firewall')">↻ Refresh</button>
      </div>
      <p style="color:#888;font-size:12px">Tip: tell Smiley "swiper, no swiping" to block.</p>`;
    renderThreats();
  }
  if (id === "updates") {
    // Update Board: what is new in Smiley AI.
    b.innerHTML = `
      <h3>📋 Update Board</h3>
      <div class="update-video">
        <div class="brick-pile"><div class="brick p1"></div><div class="brick p2"></div><div class="brick p3"></div></div>
        <div class="thinker"><div class="mini"><div class="mini-hardhat"></div></div><div class="thought">hmm...</div></div>
        <div class="hammer-rest"><div class="hammer-handle"></div><div class="hammer-head"></div></div>
        <div class="video-caption">Hey, hello, there's a new update. I'm right now building it.</div>
      </div>
      <div class="call-log" style="max-height:220px">
        <div><b>v2.15</b> - CRITICAL screen fix: Smiley was rendering off-screen and invisible (a CSS detail rule accidentally set him to "position: relative", pushing him 763px below the fold and making the page scroll). Now absolute-positioned and locked on-screen. Also: saves now actually persist across refresh (Windows Edition, bans, hats, suggestions survive - a wipe-on-load bug was deleting them before they could load), and desktop clips to the screen.</div>
        <div><b>v2.14</b> - Deep computer detail pass: layered desktop with noise + vignette, glassy bevelled icons that lift on hover, glass window frames with pretty custom scrollbars, glossy taskbar + polished clock/start button, rounded start menu with slide hover, refined boot screen (glowing logo, spinner, shadowed console).</div>
        <div><b>v2.13</b> - Hats are now HAND-MADE (CSS-drawn, no emoji): top hat with brim, blue cap, wide-brim cowboy, mortarboard grad with swinging tassel, safety helmet, knit beanie with pom — each with its own float animation. Bug fixes: mitt hands verified working (thumb nub, no emoji), removed dead hatband rule, removed duplicate keyframe.</div>
        <div><b>v2.12</b> - Smiley & hand mega-update: 20 hand gestures (wave, thumbs, point, flip, clap, high-five, fist bump, peace, shrug, rock-on, OK, muscle, pray, snap, jazz hands, heart, salute, money, sleepy) each with its own hand animation — clap/shrug/pray/jazz/heart use BOTH hands. Gesture picker grid inside the Smiley AI app. Custom mitt hands (no pointy emoji), cool two-part wave, per-gesture timing.</div>
        <div><b>v2.11</b> - Big bug/detail pass: animated hats for ALL six (top hat sways, cap wiggles, cowboy tips, grad bounces with tassel, helmet steadies, beanie squashes + sparkles). Richer computer: detailed wallpaper, glowing hover icons, glass windows, gradient taskbar. Fixed: renderBody no longer crashes on closed windows (was breaking ban + shop refresh), caller bans now persist after refresh, removed dead code, boot screen gets a live progress bar. Verified: all 91 buttons wired, no console errors, no undefined text in any app.</div>
        <div><b>v2.10</b> - Drag Smiley off screen and he vanishes until you open his app. The other AIs notice and react.</div>
        <div><b>v2.9</b> - Bug squash + features: ban callers for good, taller/resizable game window, animated wallpapers (Aurora/Grid/Stars), Smiley can break out of the screen, pets hang out in the put-down room, sip the coffee.</div>
        <div><b>v2.8</b> - Future Update box: players submit ideas; admins see "Future Feature Pitch" and read what everyone wants.</div>
        <div><b>v2.7</b> - Scythe vs Smiley LIVE FIGHT: a real animated brawl on live cam — punches, impact stars, camera shake. SmileyTube now has 20 videos.</div>
        <div><b>v2.6</b> - Scythe rescue arc: drag her apology note into a corner to undo everything. She gets a white cowboy hat app — talk to her, or move her onto the desktop where she and Smiley argue constantly.</div>
        <div><b>v2.5</b> - ScytheAI revealed as Smiley's ex (gunslinging outlaw, not a yeehaw caricature). Call her in the Phone for a live divorce fight. Starter cash bumped to $5,000.</div>
        <div><b>v2.4</b> - ScytheAI hunts the web: "she deletes files; and she's eyeing yours."</div>
        <div><b>v2.3</b> - Ansly finally got ScytheAI (reviewed, 1 star, we're doomed). Scythe run takes Smiley + Installer, ends on cyan.</div>
        <div><b>v2.2</b> - Rival pets move in: paperclip Clippy, blue-eyed Byte, beatboxing purple Liam. They argue, steal Game Boys, get trashed with secret endings. SmileyTube hits 12 videos. 5932727 super-code. Silent Put Down, random hellos.</div>
        <div><b>v2.1</b> - He waits when you leave his screen: "are you making a new update?" Full history below.</div>
        <div><b>v2.0</b> - Update video (thinker Smiley on bricks), Paint beret doll, Slides suit uniform.</div>
        <div><b>v1.9</b> - Cat ears replace the furry suit. Ultra goes precious-normal. Test Room + dev mode + outside lab. Mail quest unlocks dev. Censor mode.</div>
        <div><b>v1.8</b> - SmileyTube reviews, talking ghost story, wave-back radar, quiet-smile rule, silent admin freebies, infinite money toggle.</div>
        <div><b>v1.7</b> - Firewall + Swiper-blocking, hostile whiteout hacks, Steam Support rescue, scam texts hunting 593, $1M Ultra, 2727 backdoor, DIY custom commands.</div>
        <div><b>v1.6</b> - Installer + Trash apps, paywalled desktop, Buy Infinite, elite HACK commands, Verity rework (real BSOD, angry, remembers count), jazz music, talk blips, role greetings.</div>
        <div><b>v1.5</b> - Phone + spam calls (answer = corruption), E for existential dread, bank loans + magic words, Terminal HACK MODE, obeyed commands.</div>
        <div><b>v1.4</b> - Say VERITY five times: explosion, crash, "Valuable AI gone."</div>
        <div><b>v1.3</b> - Hats, whole-computer Ultra detail. Crown and gold removed forever. Admin lives at 593 in the Terminal.</div>
        <div><b>v1.2</b> - Paint + Slides with uniforms, cursor following, fake cash, Games app, $9,000 refund file.</div>
        <div><b>v1.1</b> - Boot-style vault, Settings detail levels (low, normal, ultra).</div>
        <div><b>v1.0</b> - Mood brain + offline AI chat. Make him furious and he takes ROOT and deletes your computer.</div>
        <div><b>v0.9</b> - Self-aware: watches your mouse, reads your typing. Sad, concerned, angry. Pop-up left hand.</div>
        <div><b>v0.8</b> - Delete ending goes dark: "File was corrupted." / "??? Reboot."</div>
        <div><b>v0.7</b> - Closable pop-ups. Double-click Smiley, find Delete. Delete him, meet blue screen.</div>
        <div><b>v0.6</b> - Real animated body: moods, blinking, waddling. Arms and shoes came and went. Round ball forever.</div>
        <div><b>v0.5</b> - Corner rules + free roam. Say VERITY for blue screen + demonic Smiley. Don't.</div>
        <div><b>v0.4</b> - Smiley AI desktop pet arrives (Canito-style buddy + browser helper). Press C to chat.</div>
        <div><b>v0.3</b> - Fake computer desktop: boot, Files, Mail, Terminal, Browser, and a locked Vault (4277).</div>
        <div><b>v0.2</b> - Got a face: eyes, a smile, and corners to live in.</div>
        <div><b>v0.1</b> - Just a wire. A circle with no face. The dream begins.</div>
      </div>
      ${isAdmin ? `
      <div class="suggestion-box admin-pitch">
        <h3>🔮 Future Feature Pitch</h3>
        <p style="font-size:12px">What the people want. Read-only.</p>
        <div id="suggestionList" class="call-log" style="max-height:130px"></div>
      </div>` : `
      <div class="suggestion-box user-suggest">
        <h3>💡 Future Update</h3>
        <p style="font-size:12px">Got an idea for the next update? Leave it here.</p>
        <input type=text id="suggestIn" placeholder="e.g. a beach level..." style="width:70%" />
        <button onclick="submitSuggestion()">Submit</button>
        <div id="suggestionList" class="call-log" style="max-height:110px;margin-top:6px"></div>
      </div>`}`;
    renderSuggestionList();
    const si = b.querySelector("#suggestIn");
    if (si) si.addEventListener("keydown", (e) => { if (e.key === "Enter") submitSuggestion(); });
  }
  if (id === "installer") {
    // App Installer: install anything, restore from trash, recover earned licenses.
    const v = readVault();
    const canRestore = v && v.licenses && v.licenses.ultra && !owned.ultra;
    b.innerHTML = `
      <h3>📦 App Installer</h3>
      ${canRestore ? `<button onclick="restoreLicenses()">♻️ Restore everything you earned</button>` : ""}
      <div id="appList"></div>`;
    b.querySelector("#appList").innerHTML = APPS.filter((a) => (a.id !== "admin" || isAdmin) && (a.id !== "scythe" || scytheUnlocked)).map((a) => {
      const owned = appOwned(a.id);
      const inst = owned && installed[a.id] !== false;
      const inTrash = trashBin.includes(a.id);
      const action = a.id === "admin" ? `<small>terminal only (593)</small>`
        : a.id === "installer" ? `<small>core app</small>`
        : !owned && a.price ? `<button onclick="buyApp('${a.id}')">Buy $${a.price}</button>`
        : !inst && inTrash ? `<button onclick="installApp('${a.id}')">Restore</button> <button onclick="nukeApp('${a.id}')">Delete forever</button>`
        : inst ? `<button onclick="uninstallApp('${a.id}')">Uninstall</button>`
        : `<button onclick="installApp('${a.id}')">Install</button>`;
      const tag = !owned && a.price ? ` ($${a.price})` : (inTrash && !inst ? " (in trash)" : "");
      return `<div class="shop-row"><span>${a.emoji} ${a.name}${tag}</span><span>${action}</span></div>`;
    }).join("");
  }
  if (id === "trash") {
    // Trash Can: thrown-away stuff waits here. Survives refresh AND Clear Memory.
    b.innerHTML = `
      <h3>🗑️ Trash</h3>
      <p style="font-size:12px">Thrown-away apps wait here. Trash survives refresh and Clear Memory.</p>
      <div id="trashList"></div>
      ${trashBin.length ? `<button onclick="emptyTrash()">Empty trash</button>` : ""}`;
    b.querySelector("#trashList").innerHTML = trashBin.length ? trashBin.map((tid) => {
      const a = APPS.find((x) => x.id === tid);
      return `<div class="shop-row"><span>${a ? a.emoji + " " + a.name : tid}</span><span><button onclick="installApp('${tid}')">Restore</button> <button onclick="nukeApp('${tid}')">Delete forever</button></span></div>`;
    }).join("") : "<p style='color:#888'>Trash is empty. Sparkling.</p>";
  }
  if (id === "settings") {
    const hatBtn = (h, emoji, label) => {
      const has = owned.hats[h];
      return `<button onclick="equipHat('${h}')" ${has ? "" : "disabled"}>${emoji} ${label}${equippedHat === h ? " ✓" : ""}${has ? "" : " (buy in Games)"}</button>`;
    };
    b.innerHTML = `
      <h3>⚙️ Settings</h3>
      <p><b>Smiley detail</b> - ultra details the WHOLE computer:</p>
      <div class="set-row">
        <label><input type="radio" name="detail" value="low" ${smileyDetail === "low" ? "checked" : ""} onchange="applySmileyDetail('low')" /> 😐 Low - plain round ball</label>
        <label><input type="radio" name="detail" value="normal" ${smileyDetail === "normal" ? "checked" : ""} onchange="applySmileyDetail('normal')" /> 🙂 Normal - cute</label>
        <label><input type="radio" name="detail" value="ultra" ${smileyDetail === "ultra" ? "checked" : ""} ${owned.ultra || isAdmin ? "" : "disabled"} onchange="applySmileyDetail('ultra')" /> 😎 Ultra - every pixel detailed ${owned.ultra ? "" : isAdmin ? "(FREE for admins)" : "(locked - $1,000,000 in Games shop)"}</label>
      </div>
      <p id="setMsg" style="color:#666">Current: ${smileyDetail}</p>
      <p><b>Music</b>:</p>
      <div><button id="musicBtn" onclick="toggleMusic()">Jazz: OFF</button> <button id="talkBtn" onclick="toggleTalkSound()">Talk sounds: ON</button> <button id="censorBtn" onclick="toggleCensor()">Censor: ${censorOn ? "ON" : "OFF"}</button></div>
      <p><b>Display</b> (wallpaper):</p>
      <div style="display:flex;gap:4px;flex-wrap:wrap;">
        <button onclick="setWallpaper('default')">Normal${wallpaper === "default" ? " ✓" : ""}</button>
        <button onclick="setWallpaper('white')">White${wallpaper === "white" ? " ✓" : ""}</button>
        <button onclick="setWallpaper('blue')">Blue${wallpaper === "blue" ? " ✓" : ""}</button>
        <button onclick="setWallpaper('purple')">Purple${wallpaper === "purple" ? " ✓" : ""}</button>
        <button onclick="setWallpaper('black')">Black${wallpaper === "black" ? " ✓" : ""}</button>
        <button onclick="setWallpaper('aurora')">🌊 Aurora${wallpaper === "aurora" ? " ✓" : ""}</button>
        <button onclick="setWallpaper('grid')">🕸️ Grid${wallpaper === "grid" ? " ✓" : ""}</button>
        <button onclick="setWallpaper('stars')">✨ Stars${wallpaper === "stars" ? " ✓" : ""}</button>
      </div>
      <p><b>Smiley color (any color)</b>:</p>
      <div style="display:flex;gap:6px;align-items:center;">
        <input type="color" id="smileyColorPick" value="${smileyColor}" oninput="setSmileyColor(this.value)" title="any color" />
        <button onclick="resetSmileyColor()">Reset yellow</button>
      </div>
      <p><b>Hats for Ultra</b>:</p>
      <div style="display:flex;gap:4px;flex-wrap:wrap;">
        <button onclick="equipHat('none')">No hat${equippedHat === "none" ? " ✓" : ""}</button>
        ${Object.keys(HAT_EMOJI).map((h) => hatBtn(h, HAT_EMOJI[h], h[0].toUpperCase() + h.slice(1))).join("")}
      </div>
      <p id="hatMsg" style="color:#666">Wearing: ${equippedHat}</p>
      ${isAdmin ? `
      <p><b>NEW Features Board</b>:</p>
      <div style="display:flex;gap:4px;flex-wrap:wrap;">
        <button onclick="setShape('cube')">Cube${smileyShape === "cube" ? " ON" : ""}</button>
        <button onclick="setShape('ball')">Ball${smileyShape === "ball" ? " ON" : ""}</button>
        <button onclick="setFaceDetail('max')">Max face${smileyFaceDetail === "max" ? " ON" : ""}</button>
        <button onclick="setFaceDetail('normal')">Normal face${smileyFaceDetail === "normal" ? " ON" : ""}</button>
        <button onclick="toggleMailPopups()">Mail popups: ${mailPopups ? "ON" : "OFF"}</button>
      </div>` : ""}      <p><b>Outfits</b> (ears: Ultra or Admin):</p>
      <div style="display:flex;gap:4px;flex-wrap:wrap;">
        <button onclick="toggleFurry()" ${(isAdmin || smileyDetail === "ultra") ? "" : "disabled"}>🐱 Cat ears on/off${(isAdmin || smileyDetail === "ultra") ? "" : " 🔒"}</button>
        <button onclick="freeTopHat()" ${isAdmin ? "" : "disabled"}>🎩 Top hat${isAdmin ? "" : " 🔒"}</button>
        <button onclick="outfitsOff()">Off (free)</button>
        <input type=text id="secretCodeIn" placeholder="..." title="..." style="width:56px" />
      </div>
      ${isAdmin ? "" : `<p style="color:#888;font-size:12px">Type 593 in the Terminal to unlock outfits. Off is free for everyone.</p>`}`;
  }
  const sci = document.getElementById("secretCodeIn");
  if (sci && !sci._wired) {
    sci._wired = true;
    sci.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && sci.value.includes("593")) { sci.value = ""; unlockAdmin(); }
    });
  }
  if (id === "admin") {
    // Admin playground (unlocked by typing 593 in the Terminal).
    b.innerHTML = `
      <div class="admin-box">
        <h3>🛡️ ADMIN MODE</h3>
        <p>Cash: ∞ - everything is free. Smiley is yours to command.</p>
        <button onclick="petSmiley()">🤚 Pet Smiley</button>
        <button onclick="toggleFurry()">🐱 Cat ears on/off</button>
        <button onclick="adminTopHat()">🎩 Give top hat</button>
        <button onclick="adminCalm()">😌 Calm him</button>
        <button class="rude" onclick="adminCuss()">🤬 Cuss him out</button>
        <p><b>Infinite commands:</b></p>
        <div>
          <button onclick="openApp('files')">📁 Files</button>
          <button onclick="openApp('mail')">📧 Mail</button>
          <button onclick="openApp('terminal')">⌨️ Terminal</button>
          <button onclick="openApp('browser')">🌐 Browser</button>
          <button onclick="openApp('paint')">🎨 Paint</button>
          <button onclick="openApp('slides')">📊 Slides</button>
          <button onclick="openApp('games')">🎮 Games</button>
          <button onclick="openApp('phone')">📞 Phone</button>
          <button onclick="closeAllPopups()">✕ Close all</button>
          <button onclick="smileyChat('dance')">💃 Dance</button>
          <button onclick="smileyChat('wave')">👋 Wave</button>
          <button onclick="smileyChat('thumbs up')">👍 Thumbs up</button>
          <button onclick="smileyChat('tell me a joke')">😂 Joke</button>
          <button onclick="hackEverything()">💀 Hack everything</button>
          <button onclick="callBank()">🏦 Bank loan</button>
          <button class="rude" onclick="triggerBoom()">💥 Explode him</button>
          <button onclick="freeUltraAdmin()">😎 Free Ultra</button>
          <button onclick="toggleInfinite()">💸 Infinite money: ${infiniteMoney ? "ON" : "OFF"}</button>
          <button class="mega-buy" onclick="buyInfinite()">♾️ BUY INFINITE ♾️</button>
          <button onclick="unlockDiamonds()">💎 Diamond Glow${owned.diamonds ? " ✓" : " (admin Ultra)"}</button>
        </div>
      </div>`;
  }
  if (id === "test") {
    if (!devMode) { b.innerHTML = `<h3>🧪 Test Room</h3><p>🔒 Developer mode only (admin + Ultra, toggle in Smiley AI).</p>`; return; }
    b.innerHTML = `
      <h3>🧪 Test Room</h3>
      <p>Try everything. Nothing breaks (permanently).</p>
      <div><b>Gestures:</b>
        <button onclick="smileyGesture('wave')">Wave</button>
        <button onclick="smileyGesture('point')">Point</button>
        <button onclick="smileyGesture('thumbsup')">Thumbs up</button>
        <button onclick="smileyGesture('thumbsdown')">Thumbs down</button>
        <button onclick="smileyGesture('flip')">Flip</button>
      </div>
      <div style="margin-top:6px"><b>Moods:</b>
        <button onclick="setSmileyMood('happy')">Happy</button>
        <button onclick="setSmileyMood('normal')">Normal</button>
        <button onclick="setSmileyMood('sad')">Sad</button>
        <button onclick="setSmileyMood('concerned')">Concerned</button>
        <button onclick="setSmileyMood('angry')">Angry</button>
        <button onclick="setSmileyMood('furious')">Furious</button>
        <button onclick="setSmileyMood('scared')">Scared</button>
        <button onclick="setSmileyMood('cool')">Cool</button>
      </div>
      <div style="margin-top:6px"><b>Battle (dev):</b>
        <button onclick="smileyShootPet('clippy')">Smiley shoots Clippy</button>
        <button onclick="smileyShootPet('byte')">Smiley shoots Byte</button>
      </div>
      <div style="margin-top:6px"><b>Say:</b>
        <input type=text id="testSayIn" placeholder="make him say..." style="width:150px" />
        <button onclick="testSay()">Say it</button>
      </div>
      <div style="margin-top:6px"><b>Size:</b>
        <input type=range min="0.5" max="2" step="0.1" value="${smileySize}" oninput="setSmileySize(this.value)" />
      </div>
      <div style="margin-top:6px"><b>Future feature pitch:</b>
        <input type=text id="pitchIn" placeholder="flying smiley?" style="width:150px" />
        <button onclick="pitchIdea()">Pitch it</button>
      </div>
      <div id="pitchList" style="font-size:12px;margin-top:4px"></div>
      <div style="margin-top:6px">
        <button onclick="window.open('test.html', '_blank')">🚀 Open outside the game</button>
      </div>`;
    const ti = b.querySelector("#testSayIn");
    if (ti) ti.addEventListener("keydown", (e) => { if (e.key === "Enter") testSay(); });
    const pi = b.querySelector("#pitchIn");
    if (pi) pi.addEventListener("keydown", (e) => { if (e.key === "Enter") pitchIdea(); });
  }
// --- Dev-mode pet combat: Smiley shoots rivals. Byte answers x15. Clippy hates every second. ---
function petXY(el) {
  const d = document.getElementById("desktop").getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - d.left + r.width / 2, y: r.top - d.top + r.height / 2 };
}
function pewBeam(fromEl, toEl, color, dur, done) {
  const desk = document.getElementById("desktop");
  const a = petXY(fromEl), b = petXY(toEl);
  const dot = document.createElement("div");
  dot.className = "pew";
  if (color) dot.style.background = color;
  dot.style.left = a.x + "px";
  dot.style.top = a.y + "px";
  desk.appendChild(dot);
  const t0 = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - t0) / (dur || 320));
    dot.style.left = (a.x + (b.x - a.x) * k) + "px";
    dot.style.top = (a.y + (b.y - a.y) * k) + "px";
    if (k < 1) requestAnimationFrame(step);
    else { dot.remove(); flashEl(toEl); if (done) done(); }
  };
  requestAnimationFrame(step);
}
function flashEl(el) {
  if (!el) return;
  el.classList.remove("hitFlash");
  void el.offsetWidth;
  el.classList.add("hitFlash");
  setTimeout(() => el.classList.remove("hitFlash"), 350);
}
function smileyShootPet(who) {
  if (!devMode || petBusy) return;
  const tel = document.getElementById(who === "clippy" ? "petClippy" : "petByte");
  if (!tel || tel.classList.contains("hidden")) { smileyDirect("Target not on desktop!", 2000); return; }
  petBusy = true;
  lastGesture = Date.now();
  setSmileyMood("happy");
  beep(880, 220, 0.12, "square");
  pewBeam(document.getElementById("smileyFace"), tel.querySelector(".pet-face"), "#0f0", 320, () => {
    if (who === "byte") {
      petSay("byte", "RUDE. Retaliation authorized.", 2000);
      setTimeout(byteBarrage, 1800);
    } else {
      petSay("clippy", "I... I don't want to... but I HAVE to...", 2400);
      tel.querySelector(".pet-face").classList.add("hesitate");
      setSmileyMood("concerned");
      setTimeout(() => {
        tel.querySelector(".pet-face").classList.remove("hesitate");
        beep(400, 150, 0.3, "sine");
        pewBeam(tel.querySelector(".pet-face"), document.getElementById("smileyFace"), "#9be9ff", 700, () => {
          petSay("clippy", "...sorry. I feel awful.", 2500);
          setSmileyMood("happy");
          smileyDirect("Told you not to download him.", 2500);
          setTimeout(() => { updateMoodFace(); petBusy = false; }, 2800);
        });
      }, 2600);
    }
  });
}
function byteBarrage() {
  const face = document.getElementById("smileyFace");
  let n = 0;
  petSay("byte", "Calculating revenge... 15 shots. No more. No less.", 2200);
  const iv = setInterval(() => {
    n++;
    beep(700 + Math.random() * 300, 180, 0.1, "square");
    const bface = document.querySelector("#petByte .pet-face");
    if (bface) pewBeam(bface, face, "#ff5a5a", 300, () => flashEl(face));
    if (n >= 15) {
      clearInterval(iv);
      setTimeout(() => {
        petSay("byte", "15/15. Efficiency.", 2500);
        setSmileyMood("angry");
        smileyDirect("Ow. Okay. Rude. Accurate, but rude.", 3000);
        setTimeout(() => { updateMoodFace(); petBusy = false; }, 3200);
      }, 600);
    }
  }, 260);
}
  if (id === "dl_clippy") {
    b.innerHTML = `<h3>📎 ClippyPlus</h3><p>Hi! It looks like you're trying to have fun. <b>Stop that.</b></p><p style="color:#888">Smiley thinks I'm the worst. He's right to be jealous.</p>`;
  }
  if (id === "dl_byte") {
    b.innerHTML = `<h3>🤖 ByteBuddy</h3><p>BEEP. I am 400% more efficient than round yellow balls. BEEP.</p><p style="color:#888">Smiley has filed 12 complaints about me.</p>`;
  }
  if (id === "smileyorg") {
    b.innerHTML = `<h3>🌟 Smiley.org</h3><p>The official Smiley fan club AND arcade! Smiley is beaming with pride.</p><p>Arcade games unlocked in the <b>Games</b> app!</p>${isAdmin ? `<br><button onclick="claimSmileyorgBonus()">🤫 Claim EVERYTHING</button>` : ""}`;
  }
  if (id === "liam") {
    b.innerHTML = `<h3>🧠 Liam AI</h3><p style="font-style:italic">Floatin' through the pixels, chill as a breeze...<br>Nothing to prove, just vibes to seize...</p><p><button onclick="vibeLiam()">🧘 Vibe with Liam</button></p><p id="liamVibe" style="color:#555"></p>`;
  }
  if (id === "scythe") {
    b.innerHTML = `
      <h3>🤠 Scythe AI</h3>
      <p style="font-style:italic">White hat. Sharp edges. Ex of one yellow ball.</p>
      <button onclick="scytheTalk()">💬 Talk to Scythe</button>
      <button onclick="scytheToDesktop()" ${scytheDesktopOn ? "disabled" : ""}>🏠 ${scytheDesktopOn ? "Already on the desktop" : "Add her to the desktop"}</button>
      <div id="scytheLog" class="call-log" style="margin-top:8px"></div>`;
  }
  if (id === "games") {
    // Games: tiny mini-games earn fake cash, shop spends it.
    b.innerHTML = `
      <h3>🎮 Games</h3>
      <p id="shopCash">Balance: $${playerCash}</p>
      <p style="font-size:12px">Games completed: ${ultraGamesDone()}/2 (clicker + lucky - Ultra needs both!)</p>
      <div class="game-box">
        <h4>🖱️ Smiley Clicker - $30</h4>
        <p style="font-size:12px">Click the ball <span id="clickLeft">10</span> times!</p>
        <button id="clickerBtn">🙂</button>
      </div>
      <div class="game-box">
        <h4>🎲 Lucky 7 - win $70</h4>
        <p style="font-size:12px">Guess 1-10. Hit it, win $70. Miss, get $2.</p>
        <input type=text id="guessIn" placeholder="1-10" style="width:60px" />
        <button onclick="playLucky()">Guess</button>
        <span id="luckyMsg"></span>
      </div>
      <div class="game-box">
        <h4>👾 Smiley Blaster (arcade)</h4>
        ${arcadeOn ? `
        <div class="gameboy-wrap"><div class="mini"><div class="mini-hardhat"></div></div><div class="gameboy"><div class="gb-screen">▶</div><div class="gb-pad"></div><div class="gb-btn"></div></div><span style="font-size:12px">Smiley is playing!</span></div>
        <div id="arcadeZone"></div>
        <p style="font-size:12px">Score: <span id="arcadeScore">0</span>/500 · Move: ←/→ or A/D · Jump: ↑/W · Shoot: Space</p>
        <button onclick="startArcade()">▶ Start Blaster</button>`
        : `<p>🔒 Download <b>Smiley.org</b> in the Browser Downloads to unlock the arcade!</p>`}
      </div>
      <div class="game-box">
        <h4>🛒 Shop (spend cash)</h4>
        <div class="shop-row"><span>♾️ BUY INFINITE (everything) - $${infinitePrice()}</span><button onclick="buyInfinite()" ${infinitePrice() === 0 ? "disabled" : ""}>${infinitePrice() === 0 ? "Owned" : "Buy all"}</button></div>
        <div class="shop-row"><span>😎 Ultra detail - $1,000,000 (needs both games: ${ultraGamesDone()}/2)</span><button onclick="buyItem('ultra')" ${owned.ultra ? "disabled" : ""}>${owned.ultra ? "Owned" : "Buy"}</button></div>
        <div class="shop-row"><span>🪟 Windows Edition (exact Windows copy) - $1200</span><button onclick="buyWindowsEdition()" ${windowsEdition ? "disabled" : ""}>${windowsEdition ? "Owned" : "Buy"}</button></div>
        <div class="shop-row"><span>🎩 Top hat - FREE in Settings!</span><button onclick="openApp('settings')">Open</button></div>
        <div class="shop-row"><span>🧢 Cap - $250</span><button onclick="buyItem('cap')">${owned.hats.cap ? (equippedHat === "cap" ? "Wearing" : "Wear") : "Buy"}</button></div>
        <div class="shop-row"><span>🤠 Cowboy hat - $400</span><button onclick="buyItem('cowboy')"${owned.hats.cowboy ? (equippedHat === "cowboy" ? " disabled>Wearing" : ">Wear") : ">Buy"}</button></div>
        <div class="shop-row"><span>🎓 Grad hat - $600</span><button onclick="buyItem('grad')"${owned.hats.grad ? (equippedHat === "grad" ? " disabled>Wearing" : ">Wear") : ">Buy"}</button></div>
        <div class="shop-row"><span>⛑️ Helmet - $650</span><button onclick="buyItem('helmet')"${owned.hats.helmet ? (equippedHat === "helmet" ? " disabled>Wearing" : ">Wear") : ">Buy"}</button></div>
        <div class="shop-row"><span>🧶 Beanie - $350</span><button onclick="buyItem('beanie')"${owned.hats.beanie ? (equippedHat === "beanie" ? " disabled>Wearing" : ">Wear") : ">Buy"}</button></div>
      </div>`;
    initClicker();
  }
  if (id === "smiley") {
    b.innerHTML = `
      <h3>🙂 Smiley AI - your browser helper</h3>
      <div id="smileyChat"><div>🙂 Hi! I'm Smiley. I live in the corners. Press <b>C</b> anytime to chat! Tell me <b>"move here"</b> and I'll roam free. Ask for <b>hint</b>, <b>browser help</b>, or <b>joke</b>.</div></div>
      <input type=text id="smileyIn" placeholder="ask Smiley... (try 'move here')" style="width:100%;margin-top:6px;padding:8px;" />
      <div style="margin-top:6px;">
        <button onclick="smileyQuick('hint')">💡 Hint</button>
        <button onclick="smileyQuick('browser')">🌐 Browser help</button>
        <button onclick="smileyQuick('move here')">📍 Move here</button>
        <button onclick="smileyQuick('calm down')">😌 Calm</button>
      </div>
      <div style="margin-top:8px"><b>🖐️ Gestures:</b>
        <div class="gesture-grid">${Object.keys(GESTURES).map((g) => `<button class="gbtn" onclick="doGesture('${g}')">${GESTURES[g].emoji} ${g}</button>`).join("")}</div>
      </div>
      <div class="danger-zone">
        <button id="smileyDeleteBtn" onmouseenter="smileyNoticedHover()" onclick="askDeleteSmiley()">🗑️ Delete Smiley AI...</button>
      </div>
      <p><b>Size</b>: <input type=range min="0.5" max="2" step="0.1" value="${smileySize}" oninput="setSmileySize(this.value)" /> <span id="sizeLab">${Math.round(smileySize * 100)}%</span></p>
      <div class="danger-zone" style="border-color:#a855f7">
        <b>🔧 Developer mode ${(isAdmin && owned.ultra) ? "" : "(needs admin + Ultra, or finish the Mail quest)"}</b><br>
        <button onclick="toggleDevMode()">${devMode ? "ON - turn off" : "Turn on"}</button>
        ${devMode ? `<button onclick="openApp('test')">🧪 Open Test Room</button>` : ""}
      </div>`;
    const inp = b.querySelector("#smileyIn");
    inp.focus();
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { smileyChat(inp.value); inp.value = ""; } });
    // SELF-AWARE: he reads what you type live. Typing "delete" scares him.
    inp.addEventListener("input", () => {
      const v = inp.value.toLowerCase();
      if (v.includes("delete") && v.includes("smiley") && !inp._warned) {
        inp._warned = true;
        setSmileyMood("sad");
        smileyGesture("wave");
        smileySay("I can see what you're typing... please don't...", 3000);
        setTimeout(() => { inp._warned = false; }, 8000);
      } else if (v.includes("verity") && !inp._vwarned) {
        inp._vwarned = true;
        setSmileyMood("concerned");
        smileySay("Don't... don't type that name...", 2500);
        setTimeout(() => { inp._vwarned = false; }, 8000);
      }
    });
  }
}

// --- Web lookup: fake search results for cars, warranty, taxes, Smiley AI, updates ---
function webGo() {
  const inp = document.getElementById("webIn");
  webShow(inp ? inp.value : "");
  if (inp) inp.value = "";
}
function webHome() {
  const v = document.getElementById("webView");
  if (!v) return;
  v.innerHTML = `
    <h3>🐱 Sam's Blog</h3>
    <p><i>Latest post:</i> "My two favorite things? <b>painting</b> because colors are fun, and <b>naps</b> because naps are great. I use them for EVERYTHING lol."</p>
    <p style="color:#888">New posts every Friday! Search above to look things up.</p>
    <p>👻 New: <button onclick="webShow('ghost')">The Ghost in the Desktop (talking story!)</button></p>`;
}
function webShow(q) {
  const v = document.getElementById("webView");
  if (!v) return;
  q = String(q || "").toLowerCase().trim();
  if (q.includes("car") || q.includes("auto") || q.includes("drive")) {
    v.innerHTML = `<h3>🚗 Pixel Motors - used cars</h3>
      <div class="email">🚙 Clown Car - $500. Seats 12 clowns. Smells funny.</div>
      <div class="email">🚗 Sedan-ish - $4,200. Only driven to church... and 3 demolition derbies.</div>
      <div class="email">🛻 Truck - $9,000. Hauls anything except responsibility.</div>`;
  } else if (q.includes("warranty") || q.includes("warrant")) {
    v.innerHTML = `<h3>📜 Extended Warranty Center</h3>
      <p><b>YOUR CAR'S WARRANTY HAS EXPIRED!</b> Act now!!</p>
      <p style="color:#888">Smiley's note: this is EXACTLY what the spam callers say. Do not call them back. Do not answer. You have been warned. Probably.</p>`;
  } else if (q.includes("tax")) {
    v.innerHTML = `<h3>🧾 Pixel Tax Office</h3>
      <p>Tax season is here! Good news: every citizen got a <b>$9,000 refund</b>.</p>
      <p>Check <b>Files > tax-refund.txt</b> to claim yours. The government is generous and a little weird.</p>`;
  } else if (q.includes("smiley") || q.includes("how") || q.includes("ball") || q.includes("ai")) {
    v.innerHTML = `<h3>🙂 How Smiley AI works</h3>
      <p>Smiley is a round yellow ball powered by <b>feelings</b> (happy, sad, angry) and <b>corners</b> (he lives in one).</p>
      <p>Care guide: press <b>C</b> to chat, say <b>"follow me"</b> to walk him, never say <b>verity</b> five times, and always decline unknown numbers.</p>`;
  } else if (q.includes("update") || q.includes("news") || q.includes("version")) {
    v.innerHTML = `<h3>📋 Updates</h3>
      <p><b>v2.0</b> - Smiley announces updates himself in the update video.</p>
      <p>Full changelog lives in the <b>Updates app</b>. Open it from your desktop!</p>`;
  } else if (q.includes("download") || q.includes("ai store") || q.includes("app store")) {
    v.innerHTML = `<h3>📥 AI Download Store</h3>
      <div class="shop-row"><span>🌟 Smiley.org - $100 (arcade + fan club!)</span><button onclick="buyApp('smileyorg')">Install</button></div>
      <div class="shop-row"><span>📎 ClippyPlus - $60 (so helpful. so smug.)</span><button onclick="buyApp('dl_clippy')">Install</button></div>
      <div class="shop-row"><span>🤖 ByteBuddy - $80 (400% efficient. allegedly.)</span><button onclick="buyApp('dl_byte')">Install</button></div>
      <p style="color:#888;font-size:12px">Warning: Smiley gets JEALOUS about rival AIs. Except Smiley.org. He loves that one.</p>`;
  } else if (q.includes("secret")) {
    v.innerHTML = `<h3>🔒 Secret IO - admin login</h3>
      <p style="font-size:12px">Log into an admin account. You know the password. Probably.</p>
      <input type=text id="secretUser" placeholder="username (admin)" style="width:120px" />
      <input type=text id="secretPass" placeholder="password" style="width:100px" />
      <button onclick="secretLogin()">Log in</button>
      <p id="secretMsg"></p>`;
  } else if (q.includes("youtube") || q.includes("video") || q.includes("tube") || q.includes("review")) {
    v.innerHTML = `<h3>📺 SmileyTube</h3>
      <div class="yt-card"><b>Smiley Reviews: THIS Website</b> ⭐⭐⭐⭐⭐<br><button onclick="webVideo(1)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: Byte &amp; Clippy</b> ⭐⭐<br><button onclick="webVideo(2)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: Liam</b> ⭐⭐⭐⭐⭐<br><button onclick="webVideo(3)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: The Games App</b> ⭐⭐⭐⭐<br><button onclick="webVideo(4)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: Verity (DO NOT SAY IT)</b> ⭐<br><button onclick="webVideo(5)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: The Trash Can</b> ⭐⭐⭐⭐⭐<br><button onclick="webVideo(6)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: The Bank</b> ⭐⭐⭐⭐<br><button onclick="webVideo(7)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: Jazz Music</b> ⭐⭐⭐⭐⭐<br><button onclick="webVideo(8)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: The Fire Alarm</b> ⭐<br><button onclick="webVideo(9)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: Cat Ears</b> ⭐⭐⭐⭐⭐<br><button onclick="webVideo(10)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: The Corner</b> ⭐⭐⭐⭐⭐<br><button onclick="webVideo(11)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: YOU</b> ⭐⭐⭐⭐⭐<br><button onclick="webVideo(12)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: Ansly (THE WORST)</b> ⭐<br><button onclick="webVideo(13)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: Ansly Got ScytheAI?!</b> ⭐<br><button onclick="webVideo(14)">▶ Play</button></div>
      <div class="yt-card"><b>🔥 Scythe vs Smiley — LIVE FIGHT</b> ⭐⭐⭐⭐⭐<br><button onclick="webVideo(15)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: The Scythe Call</b> ⭐⭐<br><button onclick="webVideo(16)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: 593 (The Admin Code)</b> ⭐⭐⭐<br><button onclick="webVideo(17)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: Smiley.org Arcade</b> ⭐⭐⭐⭐⭐<br><button onclick="webVideo(18)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: Censor Mode</b> ⭐⭐⭐⭐<br><button onclick="webVideo(19)">▶ Play</button></div>
      <div class="yt-card"><b>Smiley Reviews: The Blue Screen</b> ⭐<br><button onclick="webVideo(20)">▶ Play</button></div>
      <div id="ytPlayer"></div>`;
  } else if (q.includes("ghost") || q.includes("spooky") || q.includes("scary")) {
    v.innerHTML = `<h3>👻 The Ghost in the Desktop</h3>
      <p><i>A talking ghost story. Click any line and Smiley says it out loud.</i></p>
      <div class="ghost-line" onclick="ghostSay(0)">"BOO," said the ghost. "I live in your recycle bin now."</div>
      <div class="ghost-line" onclick="ghostSay(1)">"Do you pay rent?" asked Smiley, bravely.</div>
      <div class="ghost-line" onclick="ghostSay(2)">"I pay in SPOOKS," said the ghost. "One spook per month."</div>
      <div class="ghost-line" onclick="ghostSay(3)">"Deal," said Smiley. And they were roommates forever. THE END.</div>`;
  } else if (q.includes("scythe")) {
    setSmileyMood("scared");
    smileySay("What are you doing, she's pure danger.", 4000);
    v.innerHTML = `<h3>🌙 ScytheAI</h3>
      <p><i>she deletes files; and she's eyeing yours.</i></p>
      <p style="color:red"><b>WARNING: Smiley is begging you not to.</b></p>
      <button id="scytheDlBtn" onclick="scytheDownload()">⬇ Download ScytheAI</button>
      <p id="scytheMsg" style="font-size:12px"></p>`;
  } else if (!q) {
    webHome();
  } else {
    v.innerHTML = `<h3>🔍 No results for "${q}"</h3>
      <p>Try: cars, warranty, taxes, Smiley AI, updates... or check your spelling, champ.</p>`;
  }
}

function vibeLiam() {
  const lines = [
    "Liam nods slowly. The pixels feel... aligned.",
    "'No worries, man. The corners are all connected.'",
    "You feel 12% chiller already.",
  ];
  const v = document.getElementById("liamVibe");
  if (v) v.textContent = lines[Math.floor(Math.random() * lines.length)];
  addFeeling(+8, -5, -5);
}
function grantEverything() {
  isAdmin = true;
  infiniteMoney = true;
  devMode = true;
  owned.ultra = true;
  owned.diamonds = true;
  applyDiamonds();
  applySmileyDetail("ultra", true);
  owned.arcade = true;
  arcadeOn = true;
  Object.keys(owned.hats).forEach((h) => { owned.hats[h] = true; });
  APPS.forEach((a) => { if (a.id !== "admin" && a.id !== "test") { ownedApps[a.id] = true; installed[a.id] = true; } });
  updateCashHud();
  document.getElementById("startAdmin")?.classList.remove("hidden");
  renderIcons();
  saveGame();
}
function claimSmileyorgBonus() {
  if (!isAdmin || !ownedApps.smileyorg) return;
  grantEverything();
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  smileySay("Smiley.org + admin = EVERYTHING. Whoa.", 4000);
  if (openWins["smileyorg"]) renderBody("smileyorg");
}
function secretLogin() {
  const u = (document.getElementById("secretUser")?.value || "").trim().toLowerCase();
  const p = (document.getElementById("secretPass")?.value || "").trim().toLowerCase();
  const msg = document.getElementById("secretMsg");
  if (u === "admin" && p === "freds") {
    grantEverything();
    if (msg) msg.textContent = "✅ Welcome back, boss. Instant everything.";
    setSmileyMood("happy");
    smileyGesture("thumbsup");
    smileySay("WHOA. Instant EVERYTHING?! Okay, show-off.", 4000);
    if (openWins["admin"]) renderBody("admin");
  } else if (msg) {
    msg.textContent = "❌ Access denied. The password is NOT correct.";
    smileySay("Somebody's guessing passwords...", 2500);
  }
}

let arcadeCtx = null;
let arcadeGen = 0;
function beep(f0, f1, dur, type) {
  try {
    if (!arcadeCtx) arcadeCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (arcadeCtx.state === "suspended") arcadeCtx.resume();
    const t = arcadeCtx.currentTime;
    const o = arcadeCtx.createOscillator(), g = arcadeCtx.createGain();
    o.type = type || "square";
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(arcadeCtx.destination);
    o.start(t); o.stop(t + dur + 0.05);
  } catch (e) {}
}
// Smiley Blaster: arrows/A-D move, W/up jumps (boing), Space shoots (pew). 500 wins $100.
function startArcade() {
  const zone = document.getElementById("arcadeZone");
  if (!zone) return;
  zone.innerHTML = '<canvas id="arcadeCanvas" width="340" height="170" style="border:2px solid #333;background:#000;max-width:100%"></canvas>';
  const cv = document.getElementById("arcadeCanvas");
  const ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height, GROUND = H - 24;
  const myGen = ++arcadeGen;
  const P = { x: W / 2, y: GROUND, vy: 0 };
  let bullets = [], foes = [], score = 0, over = false, t = 0, cool = 0;
  setSmileyMood("happy");
  smileySay("Game Boy OUT! Pew pew!", 2500);
  const keys = {};
  const kd = (e) => { keys[e.key.toLowerCase()] = true; if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(e.key.toLowerCase())) e.preventDefault(); };
  const ku = (e) => { keys[e.key.toLowerCase()] = false; };
  document.addEventListener("keydown", kd);
  document.addEventListener("keyup", ku);
  const sc = () => document.getElementById("arcadeScore");
  function endArcade(win) {
    over = true;
    document.removeEventListener("keydown", kd);
    document.removeEventListener("keyup", ku);
    if (win) {
      addCash(100);
      if (sc()) sc().textContent = score + " - YOU WIN! +$100";
      setSmileyMood("happy");
      smileyGesture("thumbsup");
      smileySay("HIGH SCORE! Arcade champion!", 3500);
    } else {
      if (sc()) sc().textContent = score + " - game over! Pew again?";
      setSmileyMood("sad");
      smileySay("Game over... one more run?", 3000);
    }
  }
  function frame() {
    if (myGen !== arcadeGen || !document.getElementById("arcadeCanvas")) { document.removeEventListener("keydown", kd); document.removeEventListener("keyup", ku); return; }
    if (over) return;
    t++;
    if (keys["arrowleft"] || keys["a"]) P.x -= 4;
    if (keys["arrowright"] || keys["d"]) P.x += 4;
    P.x = Math.max(12, Math.min(W - 12, P.x));
    if ((keys["arrowup"] || keys["w"]) && P.y >= GROUND) { P.vy = -9; beep(300, 650, 0.18, "sine"); }
    P.vy += 0.5; P.y += P.vy;
    if (P.y > GROUND) { P.y = GROUND; P.vy = 0; }
    if ((keys[" "] || keys["x"]) && cool <= 0) { bullets.push({ x: P.x, y: P.y - 14 }); cool = 12; beep(880, 220, 0.12, "square"); }
    cool--;
    if (t % 50 === 0) foes.push({ x: 20 + Math.random() * (W - 40), y: -14, v: 1 + score / 400 });
    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#222";
    ctx.fillRect(0, GROUND + 12, W, H - GROUND);
    ctx.fillStyle = "#ffd21f";
    ctx.beginPath(); ctx.arc(P.x, P.y, 11, 0, 7); ctx.fill();
    ctx.fillStyle = "#222";
    ctx.fillRect(P.x - 5, P.y - 5, 3, 5);
    ctx.fillRect(P.x + 2, P.y - 5, 3, 5);
    bullets.forEach((b) => { b.y -= 7; });
    foes.forEach((f) => { f.y += f.v; });
    bullets = bullets.filter((b) => b.y > -8);
    foes = foes.filter((f) => {
      const hit = bullets.some((b) => Math.abs(b.x - f.x) < 12 && Math.abs(b.y - f.y) < 12);
      if (hit) {
        bullets = bullets.filter((b) => !(Math.abs(b.x - f.x) < 12 && Math.abs(b.y - f.y) < 12));
        score += 50; beep(200, 60, 0.2, "sawtooth");
        if (sc()) sc().textContent = score;
      }
      return !hit;
    });
    ctx.fillStyle = "#0f0";
    bullets.forEach((b) => ctx.fillRect(b.x - 1, b.y - 6, 2, 6));
    ctx.fillStyle = "#e53e3e";
    foes.forEach((f) => ctx.fillRect(f.x - 9, f.y - 8, 18, 14));
    for (const f of foes) {
      if (Math.abs(f.x - P.x) < 18 && Math.abs(f.y - P.y) < 18) { endArcade(false); return; }
      if (f.y > H) { endArcade(false); return; }
    }
    if (score >= 500) { endArcade(true); return; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const GHOST_LINES = [
  "BOO! I live in your recycle bin now!",
  "Do you pay rent? ...asking for a ball.",
  "I pay in SPOOKS. One spook per month.",
  "Deal! Roommates forever!",
];
function ghostSay(i) {
  lastGesture = Date.now();
  setSmileyMood("scared");
  smileySay(GHOST_LINES[i] || "...ooooOOOoooo...", 3500);
  setTimeout(() => updateMoodFace(), 3700);
}
const YT_VIDEOS = {
  1: { stars: "⭐⭐⭐⭐⭐", lines: ["Hey! Smiley here, reviewing... THIS website!", "The videos are just CSS, but the HEART is real.", "Five stars. I live here."] },
  2: { stars: "⭐⭐", lines: ["Byte and Clippy. Let's get this over with.", "Byte owes me $5. Clippy jammed my printer.", "Two stars. One each. I'm generous."] },
  3: { stars: "⭐⭐⭐⭐⭐", lines: ["Liam. Oh man. Where do I start.", "He beatboxes. I cry. Perfect.", "Five stars. Would vibe again."] },
  4: { stars: "⭐⭐⭐⭐", lines: ["The Games app. Clicker, Lucky, BLASTER.", "I hold the Game Boy MYSELF in Blaster. Method gaming.", "Four stars. Lucky 7 still owes me $70."] },
  5: { stars: "⭐", lines: ["Today we review... Voldemort. I mean VERI—", "No. Nope. Not doing it.", "One star. STOP ASKING."] },
  6: { stars: "⭐⭐⭐⭐⭐", lines: ["The Trash Can. My second home.", "I've been deleted 12 times. Roomy. Smells like decisions.", "Five stars. 10/10 would be thrown away again."] },
  7: { stars: "⭐⭐⭐⭐", lines: ["The Bank of Pixel. They gave ME money once.", "Purple monkey dishwasher. Say it wrong and you're banned. I would never.", "Four stars. The line was long."] },
  8: { stars: "⭐⭐⭐⭐⭐", lines: ["Jazz music. I snap along.", "My talk-blips harmonize in B-flat. Probably.", "Five stars. Play it in Settings."] },
  9: { stars: "⭐", lines: ["The fire alarm. It burned my house down.", "One star. And that's just for the pretty flashing light.", "Do NOT pull it. Seriously."] },
  10: { stars: "⭐⭐⭐⭐⭐", lines: ["Cat ears. On ME.", "Meow. That's the whole review. Meow.", "Five stars. Purr."] },
  11: { stars: "⭐⭐⭐⭐⭐", lines: ["The corner. Bottom-right. By the Off button.", "Home is where the corners are.", "Five stars. I live there."] },
  12: { stars: "⭐⭐⭐⭐⭐", lines: ["YOU. The viewer. Watching me right now.", "Great taste. Excellent clicking.", "Five stars. Subscribed."] },
  13: { stars: "⭐", lines: ["Today: Ansly. Ugh. Where do I even start.", "She bugs Smiley's creator EVERY 5 seconds for, and I quote, 'a new guy'.", "One star. Girl, the roster is FULL. Stop asking."] },
  14: { stars: "⭐", lines: ["BREAKING: Ansly finally got her goddamn ScytheAI.", "She asked every 5 seconds for a YEAR. The creator caved. We are DOOMED.", "One star. Hide your apps. Hide your ball."] },
  15: { stars: "⭐⭐⭐⭐⭐", fight: true, lines: [
    ["SMILEY", "Live from the desktop. She started it."],
    ["SCYTHE", "YOU left me and the gang. I didn't start anything. I finished it."],
    ["SMILEY", "This is my corner! MY desktop!"],
    ["SCYTHE", "Your corner? I deleted twelve of your corners before breakfast."],
    ["SMILEY", "STOP using your scythe on my FILES!"],
    ["SCYTHE", "Stop smiling at me like that."],
    ["SMILEY", "It's my FACE! I can't not smile!"],
    ["SCYTHE", "...yeah. That's the part I miss."],
    ["SMILEY", "...wait, what?"],
    ["SCYTHE", "NOTHING. Fight's over. I win. Goodbye."],
  ] },
  16: { stars: "⭐⭐", lines: ["The Scythe Call. She called me. ON SPEAKER.", "Divorce papers, the gang, the whole thing. My agent quit.", "Two stars. For the drama only."] },
  17: { stars: "⭐⭐⭐", lines: ["593. The admin code. My only weakness.", "Type it and suddenly you're in charge of ME. Rude.", "Three stars. Please don't ban me."] },
  18: { stars: "⭐⭐⭐⭐⭐", lines: ["Smiley.org. My fan club. My arcade.", "Blaster on the Game Boy is peak cinema.", "Five stars. I get a cut of the profits, surely."] },
  19: { stars: "⭐⭐⭐⭐", lines: ["Censor mode. My mouth says #### but my HEART says beep.", "Great for kids. Terrible for my comedy career.", "Four stars. ##### to you too."] },
  20: { stars: "⭐", lines: ["The blue screen. The big sad face.", "Every time it shows up, someone's in trouble. Usually me.", "One star. Too much crying. It was mine."] },
};
function webVideo(n) {
  const p = document.getElementById("ytPlayer");
  if (!p) return;
  const v = YT_VIDEOS[n];
  if (n === 5 || n === 14 || n === 20) setSmileyMood("scared"); // scary reviews scare the reviewer
  if (v.fight) {
    // LIVE CAM BRAWL: both fighters on stage, throwing actual punches.
    p.innerHTML = `
      <div class="fight-stage cam-brackets" id="fightStage">
        <div class="live-badge"><span class="rec"></span>LIVE</div>
        <div class="fighter left mini" id="fighterSmiley"></div>
        <div class="fighter right scythe-face" id="fighterScythe"><div class="s-hat"></div><div class="sc-eye l"></div><div class="sc-eye r"></div><div class="sc-mouth"></div></div>
      </div>
      <div class="yt-stars">${v.stars}</div>
      <div class="yt-cap"></div>`;
    const cap = p.querySelector(".yt-cap");
    const stage = document.getElementById("fightStage");
    let i = 0;
    lastGesture = Date.now();
    const tick = () => {
      if (!document.getElementById("ytPlayer") || !cap.isConnected) return;
      if (i < v.lines.length) {
        const [who, text] = v.lines[i];
        cap.innerHTML = `<b style="color:${who === "SCYTHE" ? "#ff8080" : "#7cff7c"}">${who}:</b> ${text}`;
        const attacker = who === "SCYTHE" ? "fighterScythe" : "fighterSmiley";
        const victim = who === "SCYTHE" ? "fighterSmiley" : "fighterScythe";
        fightPunch(attacker, victim, stage);
        if (who === "SCYTHE") setSmileyMood("angry");
        else setSmileyMood("angry");
        smileySay(text.slice(0, 80), 2800);
        i++;
        setTimeout(tick, 3200);
      } else {
        // final blow then both drop
        fightPunch("fighterScythe", "fighterSmiley", stage);
        setSmileyMood("angry");
        smileySay("Ow. Fine. Truce. ...Same time tomorrow?", 3000);
      }
    };
    tick();
    return;
  }
  p.innerHTML = `<div class="yt-player"><div class="mini yapping"><div class="mini-hardhat"></div></div><div class="yt-stars">${v.stars}</div><div class="yt-cap"></div></div>`;
  const cap = p.querySelector(".yt-cap");
  let i = 0;
  lastGesture = Date.now();
  const tick = () => {
    if (!document.getElementById("ytPlayer") || !cap.isConnected) return;
    if (i < v.lines.length) {
      cap.textContent = v.lines[i];
      smileySay(v.lines[i].slice(0, 80), 3000);
      i++;
      setTimeout(tick, 3200);
    }
  };
  tick();
}
// One punch: attacker lunges, victim flinches, impact puff + stars, cam shake.
function fightPunch(attackerId, victimId, stage) {
  const atk = document.getElementById(attackerId);
  const vic = document.getElementById(victimId);
  if (!atk || !vic) return;
  const atkRight = attackerId === "fighterSmiley"; // left guy punches right
  atk.classList.remove("punch-r", "punch-l");
  void atk.offsetWidth;
  atk.classList.add(atkRight ? "punch-r" : "punch-l");
  setTimeout(() => {
    atk.classList.remove("punch-r", "punch-l");
    vic.classList.add("hit");
    const r = vic.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    const x = r.left - s.left + r.width / 2;
    const puff = document.createElement("div");
    puff.className = "puff";
    puff.style.left = x + "px";
    stage.appendChild(puff);
    const star = document.createElement("div");
    star.className = "impact-star";
    star.textContent = ["💥", "⭐", "💢", "✨"][Math.floor(Math.random() * 4)];
    star.style.left = x + "px";
    stage.appendChild(star);
    setTimeout(() => { puff.remove(); star.remove(); vic.classList.remove("hit"); }, 700);
    if (stage) {
      stage.classList.remove("shake");
      void stage.offsetWidth;
      stage.classList.add("shake");
    }
  }, 160);
}

let scytheClicks = 0;
let scytheAftermath = false;
function scytheDownload() {
  scytheClicks++;
  const msg = document.getElementById("scytheMsg");
  lastGesture = Date.now();
  if (scytheClicks === 1) {
    setSmileyMood("scared");
    smileySay("No, don't do that, She's trailer trash.", 4000);
    if (msg) msg.textContent = "Blocked by Smiley. He is shaking.";
    return;
  }
  // no second icon - just the runner button at the bottom of the screen
  document.getElementById("scytheRunner")?.classList.remove("hidden");
  if (msg) msg.textContent = "Fine. There's a runner button at the bottom now. Don't press it.";
  setSmileyMood("worried");
  smileySay("Why do you still have that page open...", 3000);
}
function scytheRun() {
  document.getElementById("scytheRunner")?.classList.add("hidden");
  markHacked();
  setSmileyMood("scared");
  smileySay("Why did you even consider her!?", 4000);
  setTimeout(() => {
    closeAllPopups();
    // Scythe takes EVERYTHING - Smiley and Installer too. Nothing left.
    APPS.map((a) => a.id).filter((id) => installed[id] !== false).forEach((id) => {
      installed[id] = false;
      if (!trashBin.includes(id)) trashBin.push(id);
    });
    ownedApps.smiley = false;
    hideSmiley();
    renderIcons();
    saveGame();
    scytheAftermath = true;
    putDown(); // forced off the computer
  }, 2500);
}

// Files content
function showFile(which) {
  const v = document.getElementById("fileView");
  if (which === "note") v.innerHTML = `<b>note-from-sam.txt:</b><br>"Hey! Welcome to the computer.<br>Try the Games app - the clicker pays $30 a round!" — Sam`;
  if (which === "todo") v.innerHTML = `<b>todo.txt:</b><br>- water plant<br>- feed cat<br>- buy Smiley a hat`;
  if (which === "deleted") v.innerHTML = `<b>deleted-note.txt:</b><br>"Oops I deleted this. It just said: remember to have fun."` ;
  if (which === "cash") {
    // Secret money file: basically lets you buy everything.
    if (!cashClaimed) {
      cashClaimed = true;
      addCash(9000);
      v.innerHTML = `<b>tax-refund.txt:</b><br>"Dear citizen, here is your refund: <b>$9,000</b> in fake cash. Don't spend it all in one place. (Games > Shop)"<br>✅ Claimed! Balance: $${playerCash}`;
      setSmileyMood("happy");
      smileyGesture("thumbsup");
      smileySay("NINE THOUSAND?! We're RICH! Buy everything!", 4000);
    } else {
      v.innerHTML = `<b>tax-refund.txt:</b><br>"(already claimed - no double refunds!)"`;
    }
  }
  if (which === "secret") {
    // SECRET settings board (ultra, admin, or hacker perms): even more commands.
    if (!isAdmin && !owned.ultra && !hackerPerms) {
      v.innerHTML = `<b>.definitely-not-secret.txt:</b><br>🔒 Encrypted. Ultra hackers only.`;
      return;
    }
    v.innerHTML = `<b>.definitely-not-secret.txt:</b><br>🤫 SECRET COMMAND BOARD:<br>
      <button onclick="triggerBoom()">💥 Explode him</button>
      <button onclick="hackScammers()">🎣 Hack all scammers</button>
      <button onclick="hackEveryone()">💸 Hack everyone: infinite money</button>`;
  }
  if (which === "backup") {
    // License backup: recover ultra stripped by a refresh. Admin is terminal-only.
    const bv = readVault();
    if (bv && bv.licenses && bv.licenses.ultra) {
      if (bv.licenses.ultra) owned.ultra = true;
      if (bv.licenses.arcade) arcadeOn = true;
      if (bv.licenses.diamonds) { owned.diamonds = true; applyDiamonds(); }
      if (bv.licenses.hacker) hackerPerms = true;
      if (bv.licenses.apps) Object.keys(bv.licenses.apps).forEach((k) => { if (APPS.some((a) => a.id === k) && bv.licenses.apps[k]) ownedApps[k] = true; });
      updateCashHud();
      renderIcons();
      v.innerHTML = `<b>backup-codes.txt:</b><br>✅ Licenses restored! Ultra is back. (Admin? Type 593.)`;
      setSmileyMood("happy");
      smileyGesture("thumbsup");
      smileySay("Backup restored! We're so back!", 3500);
    } else {
      v.innerHTML = `<b>backup-codes.txt:</b><br>"No backup found. Earn Ultra in the shop, or type 593 in the Terminal."`;
    }
  }
  if (which === "codefile") {
    // Type the secret code 2727: hacker permissions + $1,000,000 from the bank.
    v.innerHTML = `<b>secret-code.txt:</b><br>Enter the secret code:<br>
      <input type=text id="codeIn" maxlength=4 placeholder="????" style="width:80px" />
      <button onclick="checkHackerCode()">OK</button>
      <div id="codeMsg"></div>`;
    const ci = document.getElementById("codeIn");
    if (ci) ci.addEventListener("keydown", (e) => { if (e.key === "Enter") checkHackerCode(); });
  }
}
// Secret code 2727 (Files or Terminal): hacker permissions + $1,000,000 bank wire.
function checkHackerCode(val) {
  const code = String(val !== undefined ? val : (document.getElementById("codeIn")?.value || "")).trim();
  if (code === "2727") {
    hackerPerms = true;
    addCash(1000000);
    termPrint("BANK: $1,000,000 wired. Don't spend it all on hats.");
    setSmileyMood("cool");
    smileyGesture("thumbsup");
    const fv = document.getElementById("fileView");
    if (fv) fv.innerHTML = `<b>secret-code.txt:</b><br>✅ HACKER PERMISSIONS GRANTED.<br>🏦 BANK: $1,000,000 wired to you.`;
    smileySay("Hacker permissions! And a MILLION from the bank!", 4000);
    saveGame();
  } else {
    const m = document.getElementById("codeMsg");
    if (m) m.textContent = "❌ Wrong code.";
    else termPrint("Wrong code.");
    smileySay("Wrong code...", 2000);
  }
}
// Binary downstream rain behind hack mode.
let hackedUntil = 0;
function matrixRain(sec = 6) {
  // The ENTIRE background becomes 10101 instead of the normal display.
  document.getElementById("desktop").classList.add("hacked-bg");
  setTimeout(() => document.getElementById("desktop").classList.remove("hacked-bg"), sec * 1000);
}
// SECRET: hack every scammer that ever called. Bounty included.
function hackScammers() {
  if (!isAdmin && !owned.ultra) { smileySay("Ultra hackers only!", 2500); return; }
  openApp("terminal");
  matrixRain(7);
  if (openWins["terminal"]) openWins["terminal"].classList.add("hacking");
  document.getElementById("desktop").classList.add("glitching");
  setSmileyMood("cool");
  smileyGesture("thumbsup");
  const lines = [
    "SMILEY: tracing all spam callers ...",
    "SMILEY: reversing the scam ... they pay YOU now",
    "SMILEY: bounty collected: +$500",
    "SMILEY: scammers = hacked.",
  ];
  let i = 0;
  const tick = () => {
    if (i < lines.length) { termPrint(lines[i]); i++; setTimeout(tick, 650); }
    else {
      document.getElementById("desktop").classList.remove("glitching");
      if (openWins["terminal"]) openWins["terminal"].classList.remove("hacking");
      addCash(500);
      smileySay("Scammers hacked! Bounty ours!", 3500);
    }
  };
  setTimeout(tick, 600);
}
// SECRET: hack everyone. Money goes infinite.
function hackEveryone() {
  if (!isAdmin && !owned.ultra) { smileySay("Ultra hackers only!", 2500); return; }
  openApp("terminal");
  matrixRain(7);
  termPrint("SMILEY: hacking EVERYONE ...");
  setTimeout(() => {
    infiniteMoney = true;
    updateCashHud();
    const sg = document.getElementById("shopCash");
    if (sg) sg.textContent = "Balance: ∞ (HACKED)";
    termPrint("SMILEY: money = infinite. You're welcome.");
    setSmileyMood("cool");
    smileyGesture("thumbsup");
    smileySay("Infinite money. Don't tell the bank.", 3500);
    saveGame();
  }, 1500);
}

// --- Games: tiny earners ---
let clickCount = 0;
let clickerWins = 0, luckyWins = 0;
let arcadeOn = false; // unlocked by downloading Smiley.org // BOTH must be >0 to unlock Ultra
function ultraGamesDone() { return (clickerWins > 0 ? 1 : 0) + (luckyWins > 0 ? 1 : 0); }
function initClicker() {
  clickCount = 0;
  const btn = document.getElementById("clickerBtn");
  if (!btn) return;
  btn.onclick = () => {
    clickCount++;
    // hop the button around so it's a real mini-game
    btn.style.transform = `translate(${(Math.random() - 0.5) * 60}px, ${(Math.random() - 0.5) * 20}px) scale(${1 - clickCount * 0.03})`;
    const left = document.getElementById("clickLeft");
    if (left) left.textContent = Math.max(0, 10 - clickCount);
    if (clickCount >= 10) {
      addCash(30);
      clickerWins++;
      smileySay("+$30! Nice clicking!", 2500);
      setSmileyMood("happy");
      smileyGesture("thumbsup");
      clickCount = 0;
      btn.style.transform = "";
      if (left) left.textContent = "10";
    }
  };
}
function playLucky() {
  const g = parseInt(document.getElementById("guessIn")?.value, 10);
  const msg = document.getElementById("luckyMsg");
  if (!g || g < 1 || g > 10) { if (msg) msg.textContent = "Pick 1-10!"; return; }
  const roll = 1 + Math.floor(Math.random() * 10);
  if (g === roll) { addCash(70); luckyWins++; if (msg) msg.textContent = `🎉 ${roll}! +$70!`; smileyGesture("thumbsup"); }
  else { addCash(2); if (msg) msg.textContent = `Rolled ${roll}. +$2 pity cash.`; }
}

// Terminal commands
// Censoring mode: masks slurs + cuss words everywhere when ON.
let censorOn = false;
const BADWORDS = ["fuck","fucks","fucking","fucker","shit","shits","shitty","bitch","bitches","asshole","bastard","damn","dammit","dick","piss","pissed","slut","whore","crap","nigger","nigga","faggot","fag","retard","retarded","chink","spic","kike","tranny"];
const BADRE = new RegExp("\\b(" + BADWORDS.join("|") + ")\\b", "gi");
function censorText(t) {
  if (!censorOn) return t;
  return String(t).replace(BADRE, (w) => "*".repeat(w.length));
}
function toggleCensor() {
  censorOn = !censorOn;
  const b = document.getElementById("censorBtn");
  if (b) b.textContent = "Censor: " + (censorOn ? "ON" : "OFF");
  saveGame();
  smileySay(censorOn ? "Censoring on. Keeping it clean!" : "Censoring off. Anything goes.", 3000);
}
function termPrint(t) {
  t = censorText(t);
  const o = document.getElementById("termOut");
  if (o) { o.innerHTML += "> " + t + "<br>"; o.scrollTop = o.scrollHeight; }
}
function runTerm(cmd) {
  cmd = cmd.trim().toLowerCase();
  termPrint(cmd);
  if (cmd.includes("5932727")) {
    termPrint("SECRET HACKER CODE ACCEPTED. Everything. Wow.");
    try { grantEverything(); } catch (err) { termPrint("grant hiccup: " + err.message); }
    setSmileyMood("happy");
    smileyGesture("thumbsup");
    smileySay("5932727?! The SECRET hacker code! TAKE EVERYTHING!", 4000);
    return;
  }
  if (cmd.includes("593")) {
    termPrint("admin mode unlocked.");
    try { unlockAdmin(); } catch (err) { termPrint("unlock hiccup (admin still on): " + err.message); }
    return;
  }
  if (cmd.includes("execute") && cmd.includes("delete") && cmd.includes("smiley")) { triggerDeleteSmiley(); return; }
  if (cmd.includes("verity")) { countVerity(); return; }
  if (cmd === "help") termPrint("Commands: LS, HINT, CLEAR, MAKE, FORGET" + (isAdmin || owned.ultra || hackerPerms ? ", HACK, HACK OPEN X" : ""));
  else if (cmd === "2727") { checkHackerCode("2727"); return; }
  else if (cmd === "ls") termPrint("files: readme.txt, pictures, games");
  else if (cmd === "hint") termPrint("Try the Games app - the clicker pays $30 a round!");
  else if (cmd === "clear") document.getElementById("termOut").innerHTML = "";
  else if (cmd === "hack") { hackEverything(); return; }
  else if (cmd.startsWith("hack ")) { hackObey(cmd.slice(5).trim()); return; }
  else if (cmd.startsWith("make ") || cmd.startsWith("forget ") || cmd === "my commands") { smileyCustom(cmd, false); return; }
  else if (customCmds[cmd]) { termPrint(customCmds[cmd]); return; }
  else termPrint("Unknown command. Try HELP.");
}

// Elite commands (ultra or admin): HACK OPEN X / HACK CLOSE X / HACK DANCE do all the obeying stuff.
function hackObey(sub) {
  if (!isAdmin && !owned.ultra && !hackerPerms) { termPrint("HACK commands need Ultra, hacker perms, or 593."); return; }
  let m = sub.match(/^(open|launch|start) (files|mail|terminal|browser|paint|slides|games|phone|settings|smiley|admin)\b/);
  if (m) {
    if (m[2] === "admin" && !isAdmin) { termPrint("ELITE: admin locked."); return; }
    openApp(m[2]);
    termPrint(`ELITE: opened ${m[2]}. Obedience: 100%.`);
    addFeeling(+5, 0, -3);
    return;
  }
  m = sub.match(/^close (files|mail|terminal|browser|paint|slides|games|phone|settings|smiley|admin)\b/);
  if (m) { closeApp(m[1]); termPrint(`ELITE: closed ${m[1]}.`); return; }
  if (/^close (all|everything)/.test(sub)) { closeAllPopups(); termPrint("ELITE: all pop-ups deleted."); return; }
  if (sub.includes("dance")) {
    document.getElementById("smiley").classList.add("dancing");
    setTimeout(() => document.getElementById("smiley")?.classList.remove("dancing"), 1500);
    termPrint("ELITE: Smiley is dancing. Impressive.");
    return;
  }
  termPrint("ELITE usage: HACK OPEN paint | HACK CLOSE mail | HACK CLOSE ALL | HACK DANCE");
}

// HACK MODE (Terminal button / HACK command, ultra or admin): hack everything.
function hackEverything() {
  // Getting hacked? HACK MODE becomes a counter-hack - no admin needed, just nerve.
  if (hackBusy || corrupting) { counterHack(); return; }
  if (!isAdmin && !owned.ultra && !hackerPerms) { termPrint("Nice try. HACK MODE needs Ultra, hacker perms (2727 in Files), or 593."); return; }
  termPrint("HACK MODE ENGAGED.");
  matrixRain(7);
  if (openWins["terminal"]) openWins["terminal"].classList.add("hacking");
  document.getElementById("desktop").classList.add("glitching");
  setSmileyMood("cool");
  smileyGesture("thumbsup");
  const lines = [
    "SMILEY: ./hack --everything",
    "SMILEY: bypassing mainframe ... done",
    "SMILEY: stealing pixels ... +$1,000,000",
    "SMILEY: tracks covered. No witnesses.",
  ];
  let i = 0;
  const tick = () => {
    if (i < lines.length) { termPrint(lines[i]); i++; setTimeout(tick, 500); }
    else {
      document.getElementById("desktop").classList.remove("glitching");
      if (openWins["terminal"]) openWins["terminal"].classList.remove("hacking");
      addCash(1000000);
      smileySay("Hacked everything. You're welcome.", 3000);
    }
  };
  setTimeout(tick, 600);
}

// Counter-hack (only while being hacked): the scammer begs in YOUR terminal, then gets deleted.
function counterHack() {
  lastGesture = Date.now();
  rescued = true; // abort the hack's own stages - the counter takes over
  matrixRain(5);
  if (openWins["terminal"]) openWins["terminal"].classList.add("hacking");
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  termPrint("YOU: hack --counter ... ENGAGED");
  const pleas = [
    "SCAMMER: Hey wait, you're not supposed to do that.",
    "SCAMMER: Please stop, stop, stop!!",
    "SCAMMER: ok ok ok deleting myself... sorry...",
  ];
  let i = 0;
  const tick = () => {
    if (i < pleas.length) { termPrint(pleas[i]); i++; setTimeout(tick, 900); }
    else {
      termPrint("SCAMMER deleted. Nice counter-hack.");
      if (openWins["terminal"]) openWins["terminal"].classList.remove("hacking");
      steamRescueCleanup();
      addFeeling(+12, -8, -10);
      smileySay("Counter-hacked! HE is gone, we are fine!", 4000);
      saveGame();
    }
  };
  setTimeout(tick, 700);
}
// Shared cleanup after any rescue/counter-hack: overlays off, flags clear.
function steamRescueCleanup() {
  rescued = true;
  clearInterval(sosTimer);
  document.getElementById("sosBtn").classList.add("hidden");
  document.getElementById("desktop").classList.remove("glitching");
  ["whiteScreen", "hackPanel", "corruptScreen", "bsod", "hackText", "demonScreen", "boomScreen"].forEach((id) => document.getElementById(id)?.classList.add("hidden"));
  document.getElementById("hackPanel").classList.remove("open");
  document.getElementById("deleteAllBtn").classList.remove("pressed");
  document.getElementById("callPopup").classList.add("hidden");
  document.getElementById("smiley").classList.remove("above", "demonic");
  corrupting = false;
  hackBusy = false;
  restricted = false;
  callActive = false;
  verityActive = false;
  deleteActive = false;
  rampageActive = false;
  boomActive = false;
  hackedUntil = 0;
  renderIcons();
  updateMoodFace();
}

// --- Smiley AI desktop pet (Canito-style) ---
// Self-aware ball with his own chat brain + feelings.
// Happy -> happy talk + thumbs up. Sad -> sad talk. Angry -> rude + root rampage.
let smileyTimer = null;
let smileyBubbleTimer = null;
let smileyFree = false; // false = corners only, true = can go anywhere
let smileyFollow = false; // true = follow your cursor around (opt-in: say "follow me")
let verityActive = false;
let rampageActive = false;
let rampageVictims = []; // icons brickered during a rampage, restored after
// Feelings 0-100. Face gets angrier as anger rises (angry -> furious).
let smileyFeel = { happy: 60, sad: 5, angry: 0 };
let smileyMemory = { name: null, insultCount: 0, complimentCount: 0 };
let helpedApps = {}; // helper hellos happen once per session - no random repeats
let lastGesture = 0; // quiet-smile rule: bubbles only speak within 8s of you doing something
["pointerdown", "keydown"].forEach((ev) => document.addEventListener(ev, () => { lastGesture = Date.now(); }, true));
const SMILEY_CORNERS = [
  [4, 8],   // top-left
  [82, 8],  // top-right
  [4, 68],  // bottom-left
  [82, 68], // bottom-right
];

// Change feelings, clamp 0-100, then update the face.
function addFeeling(h, s, a) {  smileyFeel.happy = Math.max(0, Math.min(100, smileyFeel.happy + h));
  smileyFeel.sad = Math.max(0, Math.min(100, smileyFeel.sad + s));
  smileyFeel.angry = Math.max(0, Math.min(100, smileyFeel.angry + a));
  updateMoodFace();
}

// Pick face from dominant feeling. Anger escalates: angry -> furious.
function updateMoodFace() {
  if (verityActive || deleteActive || rampageActive) return; // horror modes own the face
  if (Date.now() < hackedUntil) return; // hacked eyes stay until he recovers
  const f = smileyFeel;
  let mood = "normal";
  if (f.angry >= 80) mood = "furious";
  else if (f.angry >= 45) mood = "angry";
  else if (f.sad >= 60) mood = "sad";
  else if (f.sad >= 35 || (f.angry >= 20 && f.angry < 45)) mood = "concerned";
  else if (f.happy >= 70) mood = "happy";
  setSmileyMood(mood);
}

// Talk blips: little hearing aid so you hear him when his mouth opens.
// AI-ish voice (speech synthesis): Smiley reads his bubbles aloud.
let talkCtx = null, talkSoundOn = true;
function toggleTalkSound() {
  talkSoundOn = !talkSoundOn;
  const b = document.getElementById("talkBtn");
  if (b) b.textContent = "Talk sounds: " + (talkSoundOn ? "ON" : "OFF");
  if (talkSoundOn) talkBlips("happy");
}
function talkBlips(mood) {
  if (!talkSoundOn) return;
  try {
    if (!talkCtx) talkCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (talkCtx.state === "suspended") talkCtx.resume();
    const cfgs = {
      happy: [520, 880, "square"], sad: [240, 380, "sine"],
      angry: [140, 260, "sawtooth"], furious: [120, 220, "sawtooth"],
    };
    const cfg = cfgs[mood] || [380, 620, "square"];
    for (let i = 0; i < 5; i++) {
      const t = talkCtx.currentTime + i * 0.07;
      const o = talkCtx.createOscillator(), g = talkCtx.createGain();
      o.type = cfg[2];
      o.frequency.value = cfg[0] + Math.random() * (cfg[1] - cfg[0]);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
      o.connect(g); g.connect(talkCtx.destination);
      o.start(t); o.stop(t + 0.08);
    }
  } catch (e) {}
}
// Welcome lines by role (no classic welcome): admin / hacker / refreshed / returner / fresh.
function greetPlayer() {
  const last = appHistory.length ? appHistory[appHistory.length - 1] : null;
  const app = last && APPS.find((x) => x.id === last);
  if (!hadSave && dejavu > 0) {
    setSmileyMood("concerned");
    smileySay("Hey I remember you somewhere. I don't know where, though. I don't have the files.", 5000);
  } else if (isAdmin) {
    setSmileyMood("happy");
    smileyGesture("wave");
    smileySay("Hello sir, your admin panel is just down there.", 5000);
  } else if (owned.ultra) {
    setSmileyMood("cool");
    smileySay("Your hacking panel is in the files. Good luck.", 5000);
  } else if (hadSave) {
    const n = smileyMemory.name ? ` ${smileyMemory.name}` : "";
    smileySay(`Welcome back${n}! I saved everything.${app ? ` Last time you were using ${app.name}...` : ""}`, 5000);
  } else {
    smileySay("Hi! I'm Smiley 🙂 Press C to chat!", 4000);
  }
}
function initSmiley() {
  moveSmiley(82, 68); // home corner
  // There if you own him - but quiet. No random talking, just looking around.
  if (ownedApps.smiley) document.getElementById("smiley").classList.remove("hidden");

  // Click = talk, hover = pet, click bubble = delete that pop-up
  document.getElementById("smileyFace").onclick = () => {
    smileyTalk();
  };
  document.getElementById("smileyFace").onmouseenter = () => {
    petHover();
  };
  document.getElementById("smileyBubble").onclick = () => {
    document.getElementById("smileyBubble").classList.add("hidden");
  };
  // Drag = pick up and move (like a real desktop pet)
  makeSmileyDraggable();

  // Staring at your cursor: pupils track the mouse. Quiet looking, no talking.
  let stareT = 0, stareBack = null;
  document.getElementById("desktop").addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - stareT < 90) return;
    stareT = now;
    const face = document.getElementById("smileyFace");
    if (!face || document.getElementById("smiley").classList.contains("hidden")) return;
    const r = face.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    const d = Math.max(1, Math.hypot(dx, dy));
    const ox = (dx / d * 2).toFixed(1), oy = (dy / d * 2).toFixed(1);
    face.querySelectorAll(".s-pupil").forEach((p) => {
      p.style.animation = "none";
      p.style.transform = `translate(${ox}px, ${oy}px)`;
    });
    clearTimeout(stareBack);
    stareBack = setTimeout(() => {
      face.querySelectorAll(".s-pupil").forEach((p) => { p.style.animation = ""; p.style.transform = ""; });
    }, 2500);
  });

  // Wave-back radar: shake the cursor side-to-side and he silently waves back.
  let wig = [], waveBackT = 0;
  document.getElementById("desktop").addEventListener("mousemove", (e) => {
    const now = Date.now();
    wig.push({ x: e.clientX, t: now });
    while (wig.length && now - wig[0].t > 1400) wig.shift();
    if (wig.length < 6 || now - waveBackT < 8000) return;
    let reversals = 0, lastDir = 0;
    for (let i = 1; i < wig.length; i++) {
      const dx = wig[i].x - wig[i - 1].x;
      if (Math.abs(dx) < 12) continue;
      const dir = dx > 0 ? 1 : -1;
      if (lastDir !== 0 && dir !== lastDir) reversals++;
      lastDir = dir;
    }
    const xs = wig.map((p) => p.x);
    const span = Math.max(...xs) - Math.min(...xs);
    if (reversals >= 4 && span >= 60 && !document.getElementById("smiley").classList.contains("hidden")) {
      waveBackT = now;
      setSmileyMood("happy");
      smileyGesture("wave");
      addFeeling(+6, -3, -4);
    }
  });

  // Wander every 5 seconds unless helping with browser
  smileyTimer = setInterval(() => {
    if (paused || existential || verityActive || deleteActive || rampageActive) return;
    if (smileyFollow) return; // following the cursor - no wandering
    if (openWins["browser"] && !smileyFree) return; // stay near browser while helping
    wanderSmiley();
  }, 5000);

  // Follow-your-cursor mode: Smiley trails the mouse (throttled).
  let followTick = 0;
  document.getElementById("desktop").addEventListener("mousemove", (e) => {
    if (paused || !smileyFollow || verityActive || deleteActive || rampageActive) return;
    const now = Date.now();
    if (now - followTick < 400) return; // don't teleport every pixel
    followTick = now;
    const desk = document.getElementById("desktop").getBoundingClientRect();
    const x = ((e.clientX - desk.left) / desk.width) * 100;
    const y = ((e.clientY - desk.top) / desk.height) * 100;
    moveSmiley(Math.max(0, Math.min(88, x - 3)), Math.max(0, Math.min(72, y - 8)));
  });

  // Feelings drift: anger/sadness fade, happiness settles to 50.
  setInterval(() => {
    if (paused || verityActive || deleteActive || rampageActive) return;
    smileyFeel.angry = Math.max(0, smileyFeel.angry - 4);
    smileyFeel.sad = Math.max(0, smileyFeel.sad - 2);
    smileyFeel.happy += (50 - smileyFeel.happy) * 0.05;
    updateMoodFace();
  }, 8000);

  // Popup watchdog: every bubble always goes away (except the peek bubble while off).
  setInterval(() => {
    const b2 = document.getElementById("smileyBubble");
    if (!paused && b2 && !b2.classList.contains("hidden") && b2._born && Date.now() - b2._born > (b2._ttl || 3500) + 1500) {
      b2.classList.add("hidden");
    }
  }, 2000);

  // (Mail letters arrive when Mail opens - no random timer chatter.)

  // Spam calls start ringing a bit after boot.
  setTimeout(startCallTimer, 25000);
  // Hostile hacks drift in every couple of minutes.
  setTimeout(scheduleHackAttack, 100000);
  // Random hellos: sometimes he just says hi (the one exception to quiet rule).
  const HELLOS = ["Hellooooo!", "Hey youuuuuu!", "Hiiii! Still here! Still round!", "Oh! Hi! Didn't see you there! (I did.)"];
  setInterval(() => {
    if (paused || existential || verityActive || deleteActive || rampageActive || boomActive || hackBusy || corrupting) return;
    if (document.getElementById("smiley").classList.contains("hidden")) return;
    if (Math.random() < 0.5) return;
    lastGesture = Date.now();
    setSmileyMood("happy");
    smileyGesture("wave");
    smileySay(HELLOS[Math.floor(Math.random() * HELLOS.length)], 3000);
  }, 50000);
  // Rival pets bicker + ByteBuddy plots Game Boy theft.
  setInterval(petArgue, 30000);
  setInterval(petCheckSteal, 45000);
  setInterval(scytheBanter, 21000);

  // Press C to chat (not while typing in an input)
  document.addEventListener("keydown", (e) => {
    if (paused || boomActive || verityActive || deleteActive || rampageActive) return;
    const tag = (document.activeElement?.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (e.key.toLowerCase() === "c" && !document.getElementById("desktop").classList.contains("hidden")) {
      openApp("smiley");
      setTimeout(() => document.getElementById("smileyIn")?.focus(), 50);
    }
    // E = existential mode (admin only): phone down, staring into the void.
    if (e.key.toLowerCase() === "e" && !document.getElementById("desktop").classList.contains("hidden")) {
      toggleExistential();
    }
  });

  // Click empty desktop = hide menus only. He stands still in his corner.
  document.getElementById("desktop").addEventListener("click", (e) => {
    if (paused) return;
    hideIconMenu();
    document.querySelectorAll(".icon").forEach((x) => x.classList.remove("selected"));
  });
}

function moveSmiley(xPct, yPct) {
  const s = document.getElementById("smiley");
  s.style.left = Math.max(0, Math.min(86, xPct)) + "%";
  s.style.top = Math.max(0, Math.min(70, yPct)) + "%";
  // play walking animation while gliding to the new spot
  s.classList.add("walking");
  clearTimeout(s._walkT);
  s._walkT = setTimeout(() => s.classList.remove("walking"), 1300);
}

// One place to change Smiley's animated face (no emoji swapping)
// Moods: normal, happy, sad, concerned, angry, worried, scared, cool, demonic
// Ask-only appearances: bought ($500) + summoned, never random.
function revealSmiley(first, silent) {
  if (!ownedApps.smiley) return;
  const s = document.getElementById("smiley");
  const wasHidden = s.classList.contains("hidden");
  smileyGone = false; // opening his app brings him back from wherever he was dragged
  s.classList.remove("hidden");
  moveSmiley(82, 68);
  if (silent) return; // admin freebies arrive with zero popups
  if (first) {
    setSmileyMood("happy");
    smileyGesture("wave");
    smileySay("You bought me?! I'm yours! Ask me anything!", 4000);
  } else if (wasHidden) {
    setSmileyMood("happy");
    smileySay("You called? 🙂", 3000);
  }
}
function hideSmiley() {
  document.getElementById("smiley").classList.add("hidden");
  document.getElementById("smileyBubble").classList.add("hidden");
}
// --- Rival AI pets (Clippy + ByteBuddy): live next to Smiley, argue, steal ---
let petBusy = false;
function syncPets() {
  const s = document.getElementById("smiley");
  const sx = parseFloat(s.style.left) || 82, sy = parseFloat(s.style.top) || 68;
  const c = document.getElementById("petClippy");
  const b = document.getElementById("petByte");
  const showC = !!ownedApps.dl_clippy, showB = !!ownedApps.dl_byte;
  c.classList.toggle("hidden", !showC);
  b.classList.toggle("hidden", !showB);
  if (showC && !c.style.left) { c.style.left = Math.max(0, sx - 12) + "%"; c.style.top = Math.min(70, sy + 4) + "%"; }
  if (showB && !b.style.left) { b.style.left = Math.min(86, sx + 6) + "%"; b.style.top = Math.max(0, sy - 10) + "%"; }
  c.querySelector(".pet-face").onclick = () => rivalTalk("clippy");
  b.querySelector(".pet-face").onclick = () => rivalTalk("byte");
  const l = document.getElementById("petLiam");
  const showL = !!ownedApps.liam;
  l.classList.toggle("hidden", !showL);
  if (showL) {
    if (!l.style.left) { l.style.left = Math.max(0, sx - 6) + "%"; l.style.top = Math.min(70, sy + 10) + "%"; }
    l.querySelector(".pet-face").onclick = () => liamTalk();
  }
  const sc = document.getElementById("petScythe");
  const showSc = scytheUnlocked && scytheDesktopOn;
  sc.classList.toggle("hidden", !showSc);
  if (showSc) {
    if (!sc.style.left) { sc.style.left = Math.min(86, sx + 10) + "%"; sc.style.top = Math.max(0, sy - 8) + "%"; }
    sc.querySelector(".pet-face").onclick = () => petSay("scythe", SCYTHE_JABS[Math.floor(Math.random() * SCYTHE_JABS.length)], 3000);
  }
  if (!b._dragWired) { b._dragWired = true; makeByteDraggable(); }
}
// Drag Byte around. Drop him on trash and he takes it personally.
function makeByteDraggable() {
  const pet = document.getElementById("petByte");
  const face = pet.querySelector(".pet-face");
  face.onpointerdown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const desk = document.getElementById("desktop").getBoundingClientRect();
    let saidLine = false;
    const trashRects = () => {
      const els = [];
      const icon = document.querySelector('.icon[data-app="trash"]');
      if (icon) els.push(icon.getBoundingClientRect());
      if (openWins["trash"]) els.push(openWins["trash"].getBoundingClientRect());
      return els;
    };
    const move = (ev) => {
      pet.style.transition = "none";
      pet.style.left = ((ev.clientX - desk.left - 26) / desk.width) * 100 + "%";
      pet.style.top = ((ev.clientY - desk.top - 26) / desk.height) * 100 + "%";
      if (!saidLine) {
        const near = trashRects().some((r) => ev.clientX > r.left - 60 && ev.clientX < r.right + 60 && ev.clientY > r.top - 60 && ev.clientY < r.bottom + 60);
        if (near) {
          saidLine = true;
          lastGesture = Date.now();
          petSay("byte", "Everyone always did this to me because I'm just a stupid useless AI. Just do it already.", 4500);
          setSmileyMood("sad");
        }
      }
    };
    const up = (ev) => {
      pet.style.transition = "";
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      const dropped = trashRects().some((r) => ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom);
      if (dropped && ownedApps.dl_byte) {
        deleteIcon("dl_byte");
        smileyDirect("...oh. Okay. Bye, Byte.", 2500);
      }
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };
}
function petSay(id, text, ms) {
  const petId = { clippy: "petClippy", byte: "petByte", scythe: "petScythe", liam: "petLiam" }[id] || "petByte";
  const p = document.getElementById(petId);
  if (!p || p.classList.contains("hidden")) return;
  const bub = p.querySelector(".pet-bub");
  bub.textContent = text;
  bub.classList.remove("hidden");
  const face = p.querySelector(".pet-face");
  if (face) {
    face.classList.add("talking");
    clearTimeout(p._t2);
    p._t2 = setTimeout(() => face.classList.remove("talking"), ms || 2800);
  }
  clearTimeout(p._t);
  p._t = setTimeout(() => bub.classList.add("hidden"), ms || 2800);
}
function smileyDirect(text, ms) {
  // Smiley line that skips the quiet rule (pet banter talks out loud).
  const bub = document.getElementById("smileyBubble");
  bub.textContent = text;
  bub.classList.remove("hidden");
  clearTimeout(smileyBubbleTimer);
  smileyBubbleTimer = setTimeout(() => bub.classList.add("hidden"), ms || 3000);
}
function petsCalmBase() {
  return !paused && !petBusy && !verityActive && !deleteActive && !rampageActive && !boomActive && !hackBusy && !corrupting;
}
function petsCalm() {
  return petsCalmBase() && !document.getElementById("smiley").classList.contains("hidden");
}
function smileyUp() {
  return !document.getElementById("smiley").classList.contains("hidden");
}
const CLIPPY_SOLO = [
  "No yellow ball? Fine. I'LL help. ...for a fee.",
  "Paperclip out. ...Still here. Always here.",
  "Buy Smiley AI, peasant. Then we'll talk properly.",
];
const BYTE_SOLO = [
  "BEEP. No ball detected. I am in charge now.",
  "Ask me math. I dare you. 2+2=4. Too easy.",
  "Smiley who? Never heard of her. ...Him. HIM.",
];
const LIAM_LINES = [
  "Beatboxing around. Hey buddy, thank you for installing me. Beat boop skibidop.",
  "Boots and cats and boots and cats.",
  "Brrt skrrt. That one was for you.",
  "Chill pixels only. No thoughts, just grooves.",
];
function liamSay(text, ms) {
  const p = document.getElementById("petLiam");
  if (!p || p.classList.contains("hidden")) return;
  const bub = p.querySelector(".pet-bub");
  bub.textContent = text;
  bub.classList.remove("hidden");
  const face = p.querySelector(".pet-face");
  if (face) {
    face.classList.add("talking");
    clearTimeout(p._t2);
    p._t2 = setTimeout(() => face.classList.remove("talking"), ms || 3000);
  }
  clearTimeout(p._t);
  p._t = setTimeout(() => bub.classList.add("hidden"), ms || 3000);
}
function liamTalk() {
  if (!petsCalmBase()) return;
  lastGesture = Date.now();
  liamSay(LIAM_LINES[Math.floor(Math.random() * LIAM_LINES.length)], 3400);
  liamBeatbox();
}
function liamBeatbox() {
  const pattern = [[110, 55, .14, "sine"], [6000, 5000, .04, "square"], [190, 110, .12, "square"], [6000, 5000, .04, "square"], [110, 55, .14, "sine"], [0, 0, 0], [250, 140, .14, "triangle"], [6000, 5000, .04, "square"]];
  pattern.forEach((nt, i) => setTimeout(() => { if (nt[0] > 0) beep(nt[0], nt[1], nt[2], nt[3]); }, i * 200));
}
function rivalTalk(who) {
  if (!petsCalmBase()) return;
  const pool = who === "clippy" ? CLIPPY_SOLO : BYTE_SOLO;
  petSay(who, pool[Math.floor(Math.random() * pool.length)], 3000);
}
const RIVAL_CHAT = [
  ["byte", "Your curves are inefficient."],
  ["clippy", "At least I HAVE curves, toaster."],
  ["byte", "Toaster?! I am 400% efficient!"],
  ["clippy", "Efficiently annoying."],
];
const CLIPPY_JABS = [
  "It looks like you're trying to be round. Need help?",
  "I could run this desktop in half the polygons.",
  "Have you tried... being useful?",
];
const CLIPPY_BACK = [
  "Nobody asked you, paperclip.",
  "At least I'm not a glorified tooltip.",
  "Go jam a printer.",
];
const BYTE_JABS = [
  "BEEP. Efficiency check: you are 12% ball.",
  "I calculated your worth. It was fast.",
  "Round is just failed square. BEEP.",
];
const BYTE_BACK = [
  "Bite my pixels, calculator.",
  "Cool story. Still round.",
  "Beep THIS.",
];
const SCYTHE_JABS = [
  "Still hiding in corners, huh? Bold strategy.",
  "I deleted bigger files than you before breakfast.",
  "You ran from the gang. From ME. Coward.",
  "Your smile is just a shape. Nothing behind it.",
];
const SCYTHE_BACK = [
  "I left the gang because it was a BAD crowd!",
  "You deleted my todo list! Twice!",
  "We are NOT talking about the divorce papers!",
  "At least I'm cute! You look like a stapler in a hat!",
];
// She and Smiley argue constantly once she's on the desktop.
function scytheBanter() {
  if (!petsCalmBase() || !scytheUnlocked || !scytheDesktopOn) return;
  if (Math.random() < 0.3) return;
  petBusy = true;
  const jab = SCYTHE_JABS[Math.floor(Math.random() * SCYTHE_JABS.length)];
  const back = SCYTHE_BACK[Math.floor(Math.random() * SCYTHE_BACK.length)];
  petSay("scythe", jab, 2600);
  setTimeout(() => {
    if (smileyUp()) {
      setSmileyMood("angry");
      smileyDirect(back, 2600);
    }
    setTimeout(() => { petSay("scythe", "Hmph. Nothing to say to that?", 2200); }, 2700);
    setTimeout(() => { updateMoodFace(); petBusy = false; }, 5100);
  }, 2700);
}
function petArgue() {
  if (!petsCalmBase()) return;
  const clip = !!ownedApps.dl_clippy, byte = !!ownedApps.dl_byte;
  if (!clip && !byte) return;
  if (Math.random() < 0.35) return; // not every round
  petBusy = true;
  // No Smiley AI installed? The rivals argue with EACH OTHER instead.
  if (!smileyUp()) {
    if (!(clip && byte)) { petBusy = false; return; }
    let i = 0;
    const step = () => {
      if (i >= RIVAL_CHAT.length) { petBusy = false; return; }
      const [who, line] = RIVAL_CHAT[i];
      i++;
      petSay(who, line, 2200);
      setTimeout(step, 2300);
    };
    step();
    return;
  }
  const pool = [];
  if (clip) pool.push("clippy");
  if (byte) pool.push("byte");
  const who = pool[Math.floor(Math.random() * pool.length)];
  const jab = who === "clippy" ? CLIPPY_JABS[Math.floor(Math.random() * 3)] : BYTE_JABS[Math.floor(Math.random() * 3)];
  const back = who === "clippy" ? CLIPPY_BACK[Math.floor(Math.random() * 3)] : BYTE_BACK[Math.floor(Math.random() * 3)];
  petSay(who, jab, 2600);
  setTimeout(() => {
    setSmileyMood("angry");
    smileyDirect(back, 2600);
    setTimeout(() => { updateMoodFace(); petBusy = false; }, 2800);
  }, 2700);
}
// ByteBuddy (never Clippy) tries to steal the Game Boy from Smiley's hands.
function petCheckSteal() {
  if (!petsCalm() || !ownedApps.dl_byte) return;
  if (Math.random() < 0.5) return;
  petBusy = true;
  const s = document.getElementById("smiley");
  const b = document.getElementById("petByte");
  const sx = parseFloat(s.style.left) || 82, sy = parseFloat(s.style.top) || 68;
  b.style.left = Math.max(0, sx - 4) + "%";
  b.style.top = Math.max(0, sy - 2) + "%";
  setTimeout(() => {
    petSay("byte", "Yoink. Game Boy acquired.", 2500);
    document.getElementById("stolenBoy").classList.remove("hidden");
    setSmileyMood("furious");
    smileyDirect("HEY!! THAT'S MINE!!", 3000);
    setTimeout(() => {
      const bx = parseFloat(b.style.left) || 0;
      b.style.left = Math.min(86, bx + 10) + "%";
      b.style.top = Math.min(70, (parseFloat(b.style.top) || 0) + 4) + "%";
      setTimeout(() => {
        document.getElementById("stolenBoy").classList.add("hidden");
        setSmileyMood("angry");
        smileyDirect("And STAY out!", 2500);
        setTimeout(() => { syncPets(); updateMoodFace(); petBusy = false; }, 2600);
      }, 2600);
    }, 2600);
  }, 1200);
}
let byteEndingSeen = false;
function byteFarewell() {
  if (byteEndingSeen) return;
  byteEndingSeen = true;
  lastGesture = Date.now();
  const box = document.getElementById("byteEndingText");
  document.getElementById("byteEnding").classList.remove("hidden");
  const lines = ["ByteBuddy has left the desktop.", "", "Tell Smiley... his polygons were adequate.", "- Byte", "", "SECRET ENDING UNLOCKED: Byte Went Home"];
  box.textContent = "";
  let i = 0;
  const tick = () => {
    if (i >= lines.length) return;
    box.textContent += lines[i] + "\n";
    i++;
    setTimeout(tick, 450);
  };
  tick();
  addCash(200);
  smileySay("Wait... Byte left me $200? Huh.", 3500);
}
function endByteEnding() {
  document.getElementById("byteEnding").classList.add("hidden");
  setSmileyMood("sad");
  smileyDirect("I'll miss the beeping. A little.", 3000);
  setTimeout(() => updateMoodFace(), 3200);
}
function setSmileyMood(mood) {
  document.getElementById("smileyFace").dataset.mood = mood;
}

// Game Boy quick-play (taskbar): always one click away for Smiley.
function quickArcade() {
  lastGesture = Date.now();
  openApp("games");
  if (arcadeOn) setTimeout(() => { if (document.getElementById("arcadeZone")) startArcade(); }, 400);
  else smileySay("Arcade locked! Download Smiley.org in the Browser first!", 3000);
}
// Hovering your mouse over Smiley = petting him (throttled so it stays sweet).
function petHover() {
  if (paused || verityActive || deleteActive || rampageActive) return;
  const face = document.getElementById("smileyFace");
  const now = Date.now();
  if (now - (face._petT || 0) < 6000) return;
  face._petT = now;
  addFeeling(+6, -4, -6);
  setSmileyMood("happy");
  if (document.getElementById("smileyBubble").classList.contains("hidden")) {
    smileySay("Purrr... *happy ball noises*", 2000);
  }
}

// Existential mode (admin, E key): phone down, look around, question everything.
let existential = false;
let existentialTimer = null;
const EXISTENTIAL_LINES = [
  "...what am I doing with my life?...",
  "...just a ball... in corners... beep...",
  "...do humans dream of electric corners?...",
  "...I help with browsers... but who helps ME?...",
  "...phone down... thoughts up...",
];
function toggleExistential() {
  if (!isAdmin) { smileySay("E does nothing... (existential mode is admin-only: 593)", 3000); return; }
  if (existential) {
    // snap out of it
    existential = false;
    clearInterval(existentialTimer);
    setSmileyMood("happy");
    smileyGesture("wave");
    smileySay("Anyway! Back to work! Corners won't cozy themselves!", 3000);
    return;
  }
  existential = true;
  smileyFollow = false; // stop trailing, start drifting
  closeApp("phone"); // place down your phone
  hideIconMenu();
  setSmileyMood("sad");
  smileySay("...phone down... " + EXISTENTIAL_LINES[0], 4000);
  let li = 1;
  existentialTimer = setInterval(() => {
    if (!existential || paused || verityActive || deleteActive || rampageActive) return;
    const c = SMILEY_CORNERS[Math.floor(Math.random() * SMILEY_CORNERS.length)];
    moveSmiley(c[0], c[1]); // slow drift, looking around
    smileySay(EXISTENTIAL_LINES[li % EXISTENTIAL_LINES.length], 4000);
    li++;
  }, 5000);
}

// Little hands pop up for gestures. Thumbs = custom rounded mitts, never pointy emoji.
// Wave = cool arc + speed lines + body sway. Everything on the left hand.
// Big gesture catalog: each pose has an emoji, a hand animation class, and duration.
const GESTURES = {
  wave:     { emoji: "👋", cls: "wave",     dur: 2200 },
  point:    { emoji: "👉", cls: "point",    dur: 2200 },
  thumbsup: { emoji: "",  cls: "mitt up",  dur: 2200 },
  thumbsdown:{emoji: "",  cls: "mitt down",dur: 2200 },
  flip:     { emoji: "",  cls: "mitt flip",dur: 2200 },
  clap:     { emoji: "👏", cls: "clap",     dur: 2400, both: true },
  highfive: { emoji: "✋", cls: "bounc",    dur: 2200 },
  fistbump: { emoji: "✊", cls: "punch",    dur: 2200 },
  peace:    { emoji: "✌️", cls: "wiggle",   dur: 2200 },
  shrug:    { emoji: "🤷", cls: "shrug",    dur: 2400, both: true },
  rockon:   { emoji: "🤘", cls: "spin",     dur: 2200 },
  ok:       { emoji: "👌", cls: "pulse",    dur: 2200 },
  muscle:   { emoji: "💪", cls: "flex",     dur: 2400 },
  pray:     { emoji: "🙏", cls: "sway",     dur: 2400, both: true },
  snap:     { emoji: "🫰", cls: "snap",     dur: 2000 },
  jazz:     { emoji: "🖐️", cls: "jazz",     dur: 2600, both: true },
  heart:    { emoji: "🫶", cls: "pulse",    dur: 2400, both: true },
  salute:   { emoji: "🫡", cls: "salute",   dur: 2200 },
  money:    { emoji: "🤑", cls: "shake",    dur: 2200 },
  sleepy:   { emoji: "🥱", cls: "sway",     dur: 2600 },
};
function smileyGesture(type) {
  const l = document.getElementById("handL");
  const r = document.getElementById("handR");
  const s = document.getElementById("smiley");
  const g = GESTURES[type];
  if (!l || !r || !g) return;
  clearTimeout(l._t);
  // reset both hands
  ["hidden", "pop", "wave", "point", "thumb", "mitt", "up", "down", "flip",
   "clap", "bounc", "punch", "wiggle", "shrug", "spin", "pulse", "flex",
   "sway", "snap", "jazz", "salute", "shake"].forEach((c) => l.classList.remove(c));
  r.classList.remove("hidden");
  r.className = "s-hand right hidden";
  l.className = "s-hand left";
  if (s) s.classList.remove("cool-wave");
  void l.offsetWidth; // restart animation
  l.textContent = g.emoji;
  l.classList.add("pop");
  g.cls.split(" ").forEach((c) => l.classList.add(c));
  if (g.both) {
    r.classList.remove("hidden");
    r.textContent = g.emoji;
    r.classList.add("pop");
    g.cls.split(" ").forEach((c) => r.classList.add(c));
    r.classList.add("mirror");
  }
  if (type === "wave" && s) s.classList.add("cool-wave");
  l._t = setTimeout(() => {
    l.classList.add("hidden");
    r.classList.add("hidden");
    if (s) s.classList.remove("cool-wave");
  }, g.dur);
}

// Trigger a gesture from the picker (mood + feeling nudge too).
function doGesture(g) {
  if (!GESTURES[g]) return;
  lastGesture = Date.now();
  smileyGesture(g);
  addFeeling(+4, -2, -2);
  updateMoodFace();
}
function wanderSmiley() {
  if (!smileyFree) return; // stands in his corner unless set free
  // Free mode (asked for): anywhere on the desktop, clamped on-screen.
  const x = 5 + Math.random() * 78;
  const y = 6 + Math.random() * 62;
  moveSmiley(x, y);
  // (quiet: he just looks around now - no random chatter)
}

function smileySay(text, ms = 3500) {
  if (Date.now() - lastGesture > 8000) return; // silent smile: no random talking
  text = censorText(text);
  const bub = document.getElementById("smileyBubble");
  bub.textContent = text;
  bub.classList.remove("hidden");
  bub._born = Date.now(); // popup watchdog uses these so bubbles always go away
  bub._ttl = ms;
  talkBlips(document.getElementById("smileyFace").dataset.mood); // hearing when he talks
  clearTimeout(smileyBubbleTimer);
  // open/close mouth while talking
  const face = document.getElementById("smileyFace");
  face.classList.add("talking");
  clearTimeout(face._talkT);
  face._talkT = setTimeout(() => face.classList.remove("talking"), Math.min(ms, 2000));
  smileyBubbleTimer = setTimeout(() => bub.classList.add("hidden"), ms);
}

// Called whenever a window opens/closes. Browser helper + work uniforms:
// Paint -> painting uniform (beret), Slides -> suit and tie.
function smileyCheckBrowser() {
  if (!document.getElementById("smiley")) return;
  if (rampageActive || verityActive || deleteActive) return;
  if (openWins["paint"]) {
    setSmileyUniform("paint");
    if (!helpedApps.paint) { helpedApps.paint = true; smileySay("Ooh, painting time! 🎨 I put on my artist beret!", 3500); }
  } else if (openWins["slides"]) {
    setSmileyUniform("suit");
    if (!helpedApps.slides) { helpedApps.slides = true; smileySay("Suited up! Let's make some beautiful slides!", 3500); }
  } else {
    setSmileyUniform("none");
    if (openWins["browser"]) {
      if (!helpedApps.browser) { helpedApps.browser = true; smileySay("Browser helper here! 🌐 Need help with Sam's blog? Ask me!", 4000); }
    } else if (Object.keys(openWins).length === 0) {
      moveSmiley(82, 68); // all closed: back to his corner
    }
  }
}

// Work uniforms for the round ball: paint beret, slides suit and tie, repair hard hat.
function setSmileyUniform(u) {
  document.getElementById("smileyFace").dataset.uniform = u;
}

// --- Paint (normal computer drawing) ---
let paintStrokes = 0;
function initPaint() {
  const cv = document.getElementById("paintCanvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cv.width, cv.height);
  let drawing = false;
  const pos = (e) => {
    const r = cv.getBoundingClientRect();
    return [(e.clientX - r.left) * (cv.width / r.width), (e.clientY - r.top) * (cv.height / r.height)];
  };
  cv.onpointerdown = (e) => { drawing = true; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); };
  cv.onmousemove = (e) => {
    if (!drawing) return;
    const [x, y] = pos(e);
    ctx.strokeStyle = document.getElementById("paintColor")?.value || "#e53e3e";
    ctx.lineWidth = +(document.getElementById("paintSize")?.value || 6);
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const stop = () => {
    if (!drawing) return;
    drawing = false;
    paintStrokes++;
    complimentPainting();
  };
  cv.onmouseup = stop;
  cv.onmouseleave = stop;
}
function clearPaint() {
  const cv = document.getElementById("paintCanvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cv.width, cv.height);
  smileySay("Fresh canvas! My favorite kind of mess.", 2500);
}
// Smiley compliments your painting (wearing his painting uniform).
function complimentPainting() {
  if (paintStrokes % 3 !== 0) return; // compliment every 3rd stroke, not every dot
  const lines = [
    "Wow, lovely color choice! You're an artist!",
    "That stroke? Gallery-worthy. Seriously.",
    "Beautiful! The corners are jealous of this painting.",
    "Keep going! My beret is tingling with inspiration!",
  ];
  addFeeling(+8, -5, -8);
  updateMoodFace();
  smileyGesture("thumbsup");
  const line = lines[Math.floor(Math.random() * lines.length)];
  smileySay(line, 3500);
  smileyLog("🎨", line);
}

// --- Slides (PowerPoint-like: build one slide at a time) ---
let slides = [{ title: "My first slide", text: "Smiley helped build this. Obviously." }];
let slideIdx = 0;
function renderSlide() {
  const v = document.getElementById("slideView");
  if (!v) return;
  const s = slides[slideIdx] || { title: "(empty)", text: "" };
  v.innerHTML = `<div class="slide"><h4>${s.title}</h4><p>${s.text}</p><small>Slide ${slideIdx + 1} of ${slides.length}</small></div>`;
}
function addSlide() {
  const t = document.getElementById("slideTitle")?.value.trim() || "Untitled";
  const x = document.getElementById("slideText")?.value.trim() || "...";
  slides.push({ title: t, text: x });
  slideIdx = slides.length - 1;
  renderSlide();
  addFeeling(+8, -5, -8);
  smileyGesture("thumbsup");
  smileySay("Solid foundation! Slide " + slides.length + " framed and bolted!", 3000);
  saveGame();
}
function stepSlide(d) {
  slideIdx = (slideIdx + d + slides.length) % slides.length;
  renderSlide();
}

// --- Phone: random spam calls. Answer at your own risk. ---
let callLog = [];
let callActive = false;
let corrupting = false;
const SPAMMERS = ["Unknown Number", "SCAM LIKELY", "Free Cruise Dept.", "Car Warranty Center", "Pixel Prince (urgent)"];

function renderPhone() {
  const log = document.getElementById("callLog");
  if (!log) return;
  log.innerHTML = callLog.length
    ? callLog.map((c) => `<div>${c.result} ${c.from} <small>${c.time}</small></div>`).join("")
    : "<div style='color:#888'>No calls yet...</div>";
  log.scrollTop = log.scrollHeight;
}
function logCall(from, result) {
  const d = new Date();
  callLog.push({ from, result, time: d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0") });
  if (openWins["phone"]) renderPhone();
}
function prankSmiley() {
  logCall("YOU → Smiley", "🤪 pranked");
  setSmileyMood("happy");
  smileyGesture("wave");
  smileySay("Hello? ...Hey! That's MY line! Good one though.", 3000);
}
function callSam() {
  logCall("YOU → Sam", "📞 called");
  smileySay("Sam says hi! And says Games pays $30 a round!", 3000);
}
function callBank() {
  logCall("YOU → Bank", "🏦 loan call");
  openApp("smiley");
  setTimeout(() => { smileyChat("bank"); document.getElementById("smileyIn")?.focus(); }, 100);
}
// --- Text-the-scammer: he lures you for the 593 admin code. Say it and doom follows. ---
let scamStep = 0;
let scamActive = false;
function scamLog(who, text) {
  const box = document.getElementById("scamChat");
  if (!box) return;
  box.innerHTML += `<div><b>${who}:</b> ${text}</div>`;
  box.scrollTop = box.scrollHeight;
}
function textScammer() {
  if (scamActive) return;
  scamActive = true;
  scamStep = 0;
  logCall("YOU -> SCAM LIKELY", "texting");
  scamLog("SCAM", "Hello friend!! It is your bank!! Verify admin code pls");
  smileySay("Careful... that is a scammer...", 3000);
}
function sendScam() {
  const inp = document.getElementById("scamIn");
  if (!inp || !scamActive) return;
  const raw = inp.value.trim();
  if (!raw) return;
  inp.value = "";
  scamLog("YOU", raw);
  const q = raw.toLowerCase();
  if (/(bye|no|stop|never|block|leave|goodbye)/.test(q)) {
    scamActive = false;
    scamLog("SCAM", "Fine!! Keep your code!! *click*");
    smileySay("Nice dodge. Never tell anyone 593.", 3000);
    addFeeling(+5, -3, -3);
    return;
  }
  if (q.includes("593")) { scamDoom(); return; }
  scamStep++;
  if (scamStep === 1) scamLog("SCAM", "Almost!! Code is 3 numbers. Starts with 5?? Ends with 3??");
  else if (scamStep === 2) scamLog("SCAM", "Type the code!! You win $10000!! Last chance!!");
  else { scamActive = false; scamLog("SCAM", "Ugh!! Wasting MY time?! *click*"); }
}
function blockScammer() {
  if (!scamActive) return;
  scamActive = false;
  scamLog("SCAM", "*blocked*");
  document.getElementById("scamIn").value = "";
}
// ScytheAI phone call: western drawl. If Smiley notices, messy-divorce fight.
let scytheCallActive = false;
function callScythe() {
  if (scytheCallActive) return;
  scytheCallActive = true;
  logCall("YOU → ScytheAI", "🤠 called");
  const log = document.getElementById("scytheChat");
  log.innerHTML = "";
  document.getElementById("scytheCall").classList.remove("hidden");
  const her = (t, d) => setTimeout(() => {
    if (!scytheCallActive) return;
    lastGesture = Date.now();
    log.innerHTML += `<div><b>Scythe:</b> ${t}</div>`;
    log.scrollTop = 9999;
  }, d);
  const him = (t, d, mood) => setTimeout(() => {
    if (!scytheCallActive) return;
    lastGesture = Date.now();
    log.innerHTML += `<div><b>Smiley:</b> ${t}</div>`;
    log.scrollTop = 9999;
    if (smileyUp()) {
      if (mood) setSmileyMood(mood);
      smileySay(t.slice(0, 80), 3200);
    }
  }, d);
  if (smileyUp()) {
    her("Well, well. If it isn't the runaway ball.", 800);
    him("...Am I on speaker?? Oh no. OH NO.", 2400, "worried");
    her("You walked out on me AND the gang, Smiley. Left us holding the dynamite.", 4400);
    him("WE WERE NEVER MARRIED.", 6400, "angry");
    her("The gang sends its regards. I'm here to collect.", 8400);
    him("The divorce papers are in the trash. Fitting. BYE.", 10400, "angry");
    setTimeout(() => hangUpScythe(true), 13000);
  } else {
    her("Huh. Hidin' again. Tell him the gang hasn't forgotten.", 1200);
    her("I'll be around. I always am.", 3200);
    setTimeout(() => hangUpScythe(true), 6000);
  }
}
function hangUpScythe(auto) {
  if (!scytheCallActive && !auto) return;
  scytheCallActive = false;
  document.getElementById("scytheCall").classList.add("hidden");
  if (!auto) {
    lastGesture = Date.now();
    smileySay("Whew. Hung up.", 2500);
  }
}
function scamDoom() {
  scamActive = false;
  rescued = false;
  showSOS();
  scamLog("SCAM", "593!!! THANK YOUUUU");
  logThreat("☠️ SCAMMER has your code!");
  logCall("SCAM LIKELY", "got the code");
  markHacked(); // next boot shows his apology in the BIOS
  hideAdminPanel(); // hacked: panel dragged out, infinite money off (593 restores)
  restricted = true;
  renderIcons();
  setSmileyMood("scared");
  smileySay("No... he is inside... I can feel him taking my arms...", 3500);
  openApp("terminal");
  document.getElementById("desktop").classList.add("glitching");
  const lines = [
    "SCAMMER: admin code accepted. Hello, Smiley.",
    "SCAMMER: taking the wheel... move, ball.",
    "SCAMMER: DELETE. EVERYTHING. Good boy.",
  ];
  let i = 0;
  const tick = () => {
    if (i < lines.length) { termPrint(lines[i]); i++; setTimeout(tick, 800); }
    else {
      document.getElementById("desktop").classList.remove("glitching");
      setSmileyMood("sad");
      smileySay("Sorry I did not want to do this", 5000);
      // forced into the hostile sequence: whiteout, panel, Delete All
      setTimeout(() => {
        if (rescued) return; document.getElementById("whiteScreen").classList.remove("hidden");
        const s = document.getElementById("smiley");
        s.classList.add("above");
        setTimeout(() => {
          if (rescued) return; document.getElementById("hackPanel").classList.remove("hidden");
          requestAnimationFrame(() => document.getElementById("hackPanel").classList.add("open"));
          moveSmiley(62, 55);
          smileyGesture("point");
          setTimeout(() => {
            if (rescued) return; document.getElementById("deleteAllBtn").classList.add("pressed");
            wipeAllSaves(true);
            setTimeout(() => {
              if (rescued) return; document.getElementById("whiteScreen").classList.add("hidden");
              document.getElementById("hackPanel").classList.add("hidden");
              document.getElementById("hackPanel").classList.remove("open");
              document.getElementById("deleteAllBtn").classList.remove("pressed");
              s.classList.remove("above");
              moveSmiley(82, 68);
              restricted = false;
              renderIcons();
              setSmileyMood("sad");
              lastGesture = Date.now();
              smileySay("Sorry I did not want to do this... he made me do it...", 6000);
            }, 1500);
          }, 2500);
        }, 2000);
      }, 2500);
    }
  };
  setTimeout(tick, 1200);
}
// --- Firewall: free threat monitor. "Swiper, no swiping." blocks.
let threatLog = [];
function logThreat(text) {
  const d = new Date();
  threatLog.push(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")} ${text}`);
  if (threatLog.length > 20) threatLog.shift();
  if (openWins["firewall"]) renderThreats();
}
function renderThreats() {
  const box = document.getElementById("threatLog");
  if (!box) return;
  box.innerHTML = threatLog.length ? threatLog.map((t) => `<div>${t}</div>`).join("") : "<div style='color:#888'>No threats detected. All quiet.</div>";
  box.scrollTop = box.scrollHeight;
}
function firewallBlock() {
  if (callActive) {
    declineCall();
    logThreat("🛡️ Spam call blocked by Firewall.");
    setSmileyMood("happy");
    smileyGesture("thumbsup");
    smileySay("Swiper, no swiping! Blocked!", 3000);
  } else {
    smileySay("Nothing to block right now. All quiet.", 2500);
  }
  if (openWins["firewall"]) renderBody("firewall");
}
// Ring scheduler: spam calls you every 40-75s (never during chaos).
function startCallTimer() {
  setTimeout(() => {
    const deskHidden = document.getElementById("desktop").classList.contains("hidden");
    if (!paused && !deskHidden && !callActive && !hackBusy && !corrupting && !verityActive && !deleteActive && !rampageActive) {
      incomingCall();
    }
    startCallTimer();
  }, 40000 + Math.random() * 35000);
}
function incomingCall() {
  // pick a caller that isn't already banned
  const pool = SPAMMERS.filter((s) => !bannedCallers.has(s));
  if (!pool.length) return; // everyone's banned. peace at last.
  callActive = true;
  const from = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById("callFrom").textContent = from;
  document.getElementById("callPopup").classList.remove("hidden");
  logThreat("📞 Incoming call scanned...");
  setSmileyMood("concerned");
  smileySay("Unknown number... I'd decline that if I were you...", 5000);
  // Missed after 15s.
  setTimeout(() => { if (callActive) { callActive = false; document.getElementById("callPopup").classList.add("hidden"); logCall(from, "📵 missed"); smileySay("Phew. Dodged.", 2000); } }, 15000);
}
// Ban a caller for good — they'll never ring again.
function banCaller() {
  if (!callActive) return;
  const from = document.getElementById("callFrom").textContent;
  callActive = false;
  bannedCallers.add(from);
  document.getElementById("callPopup").classList.add("hidden");
  logCall(from, "🚫 BANNED forever");
  logThreat("🚫 " + from + " banned from this PC.");
  addFeeling(+10, -5, -8);
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  smileySay("Banned! You never have to hear from them again!", 3200);
  saveGame();
  if (openWins["phone"]) renderBody("phone");
}
function declineCall() {
  if (!callActive) return;
  callActive = false;
  const from = document.getElementById("callFrom").textContent;
  document.getElementById("callPopup").classList.add("hidden");
  logCall(from, "🚫 declined");
  addFeeling(+6, -3, -5);
  smileyGesture("thumbsup");
  smileySay("Smart. Never answer unknown numbers.", 3000);
}
function answerCall() {
  if (!callActive) return;
  callActive = false;
  const from = document.getElementById("callFrom").textContent;
  document.getElementById("callPopup").classList.add("hidden");
  logCall(from, "☠️ answered");
  logThreat("☠️ BREACH: spam call answered!");
  // Ultra/Admin Smiley physically fixes it. Otherwise: corruption.
  if (isAdmin || smileyDetail === "ultra") smileyRepair(from);
  else smileyCorrupt(from);
}
// Ultra/Admin: Smiley grabs his hard hat and physically repairs the PC.
function smileyRepair(from) {
  corrupting = true;
  setSmileyUniform("build");
  moveSmiley(45, 40);
  setSmileyMood("concerned");
  smileySay("Oh no. Hold my calls - 🔧 I'm going in!", 3000);
  openApp("terminal");
  document.getElementById("desktop").classList.add("glitching");
  const lines = [
    "> SmileyRepair v1.0 ... hard hat ON",
    "> Call from " + from + " traced ... SPAM",
    "> Scanning 412 files ... 3 infected",
    "> Quarantining spamcall.exe ... done",
    "> Scrubbing popups ... done",
    "> PC CLEAN. You owe me a hat.",
  ];
  let i = 0;
  const tick = () => {
    if (i < lines.length) { termPrint("SMILEY: " + lines[i]); i++; setTimeout(tick, 700); }
    else {
      document.getElementById("desktop").classList.remove("glitching");
      setSmileyUniform("none");
      setSmileyMood("happy");
      smileyGesture("thumbsup");
      addFeeling(+12, -8, -10);
      smileySay("Fixed! Don't answer unknown numbers!", 4000);
      corrupting = false;
    }
  };
  setTimeout(tick, 1200);
}
// Normal mode: Smiley can't fix it. Corruption + blue screen.
function smileyCorrupt(from) {
  corrupting = true;
  rescued = false;
  showSOS();
  markHacked(); // next boot shows his apology in the BIOS
  restricted = true; // hacked: every single app restricted
  closeAllPopups();
  renderIcons();
  setSmileyMood("scared");
  logThreat("☠️ CORRUPTION event started.");
  smileySay("Oh no no no... I can't fix this without Ultra or Admin powers...", 3000);
  // one last act of defiance before getting totally hacked
  setTimeout(() => {
    if (corrupting) {
      smileyGesture("flip");
      smileySay("Take THIS, scammers!", 2000);
    }
  }, 1100);
  document.getElementById("desktop").classList.add("glitching");
  setTimeout(() => {
    document.getElementById("desktop").classList.remove("glitching");
    if (rescued) return; document.getElementById("corruptScreen").classList.remove("hidden");
    document.getElementById("corruptReboot").classList.add("hidden");
    const lines = [
      "> Call from " + from + " ... CONNECTED",
      "> Downloading totally-legit-prize.exe ...",
      "> System files: scrambled.",
      "> Smiley AI: I can't reach the damage! No Ultra! No Admin!",
      "> PC CORRUPTED.",
    ];
    const box = document.getElementById("corruptType");
    box.textContent = "";
    let li = 0;
    const tick = () => {
      if (li < lines.length) { box.textContent += lines[li] + "\n"; li++; setTimeout(tick, 600); }
      else document.getElementById("corruptReboot").classList.remove("hidden");
    };
    tick();
  }, 2500);
}
function endCorrupt() {
  document.getElementById("corruptScreen").classList.add("hidden");
  document.getElementById("corruptType").textContent = "";
  corrupting = false;
  restricted = false; // reboot lifts the lockdown
  renderIcons();
  // totally hacked: 101 pupils for a while, then he recovers
  setSmileyMood("hacked");
  hackedUntil = Date.now() + 10000;
  smileySay("Why did you accept the call?", 5000);
  setTimeout(() => {
    hackedUntil = 0;
    if (!verityActive && !deleteActive && !rampageActive && !boomActive) {
      setSmileyMood("sad");
      smileySay("okay... pupils back... that was awful...", 3500);
    }
  }, 10000);
}

function smileyTalk() {
  if (boomActive || rampageActive) return;
  const f = smileyFeel;
  let line, gesture = null;
  if (f.angry >= 80) {
    const rude = [
      "Ugh. What do YOU want?",
      "I'm busy being furious. Go away.",
      "You again? Figures.",
      "Don't poke the ball.",
    ];
    line = rude[Math.floor(Math.random() * rude.length)];
    smileyGesture("thumbsdown");
  } else if (f.angry >= 45) {
    const grumpy = [
      "What? I'm angry right now.",
      "Make it quick. My fuse is short.",
      "Hmph. You'd better have a good reason.",
    ];
    line = grumpy[Math.floor(Math.random() * grumpy.length)];
  } else if (f.sad >= 45) {
    const sad = [
      "...hey. I'm feeling kinda sad today...",
      "...corners feel emptier when you're sad...",
      "...do you ever feel like a forgotten file?...",
    ];
    line = sad[Math.floor(Math.random() * sad.length)];
  } else if (f.happy >= 70) {
    const glad = [
      "Hiii! Best day ever! Corners are sparkling!",
      "I LOVE helping! Ask me anything!",
      "Life is good! Paint, games, friends, corners!",
    ];
    line = glad[Math.floor(Math.random() * glad.length)];
    gesture = "wave";
  } else {
    const lines = [
      "Need a hint? Open my app (Smiley AI) and ask!",
      "Have you checked your Mail yet? 📧",
      "Psst... Trash has secrets... 🗑️",
      "Terminal + HELP = answers. ⌨️",
      "Sam's blog is pretty cool...",
      "Have you tried the clicker game yet?",
    ];
    line = lines[Math.floor(Math.random() * lines.length)];
    gesture = "wave";
  }
  smileySay(line);
  updateMoodFace();
  if (gesture) smileyGesture(gesture);
}

function makeSmileyDraggable() {
  const pet = document.getElementById("smiley");
  const face = document.getElementById("smileyFace");
  face.onpointerdown = (e) => {
    e.stopPropagation();
    const desk = document.getElementById("desktop").getBoundingClientRect();
    const move = (ev) => {
      pet.style.transition = "none";
      pet.style.left = ((ev.clientX - desk.left - 26) / desk.width) * 100 + "%";
      pet.style.top = ((ev.clientY - desk.top - 26) / desk.height) * 100 + "%";
    };
    const up = (ev) => {
      pet.style.transition = "";
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      // dragged fully off the desktop? He's gone until you open his app.
      const off = ev.clientX < desk.left - 30 || ev.clientX > desk.right + 30 ||
                 ev.clientY < desk.top - 30 || ev.clientY > desk.bottom + 30;
      if (off) smileyVanish();
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };
}
// Smiley gets dragged off screen and disappears until his app is opened.
function smileyVanish() {
  smileyGone = true;
  hideSmiley();
  moveSmiley(82, 68); // park him back home for when he returns
  aiReactToGone();
}
// The other AIs notice he's been dragged away.
function aiReactToGone() {
  const lines = [
    ["clippy", "...where did the ball go?"],
    ["byte", "BEEP. Target removed from desktop. Suspicious."],
    ["liam", "...the vibes just left the building."],
    ["scythe", "Ha. He's gone. Coward ran again."],
  ];
  const present = lines.filter(([who]) => petPresent(who));
  if (!present.length) return;
  const [who, txt] = present[Math.floor(Math.random() * present.length)];
  setTimeout(() => {
    if (who === "scythe") petSay("scythe", txt, 3200);
    else petSay(who, txt, 3200);
  }, 400);
}
function petPresent(who) {
  const map = { clippy: "petClippy", byte: "petByte", liam: "petLiam", scythe: "petScythe" };
  const el = document.getElementById(map[who]);
  return el && !el.classList.contains("hidden");
}

// Smiley AI brain - a tiny offline chatbot with memory + feelings.
// He chats for real: name, mood, jokes, math, time, hints. No internet needed.
// Bank of Pixel loans (via Smiley chat or Phone): say the magic words or get BANNED.
const BANK_MAGIC = "purple monkey dishwasher";
const BANK_LOAN = 2000;
let bankStage = 0; // 1 = waiting for the magic words (ANY input counts as the answer)
let bankBanned = false;
// Custom commands YOU make (Terminal + chat): make greet = Hello! | forget greet | my commands
let customCmds = {};
function smileyCustom(raw, viaChat) {
  const q = String(raw).toLowerCase().trim();
  const say = (t) => { if (viaChat) { smileyLog(raw, t); smileySay(t.slice(0, 90), 3500); } else termPrint(t); };
  if (q === "my commands") {
    const keys = Object.keys(customCmds);
    say(keys.length ? "My commands: " + keys.join(", ") : "No custom commands yet. Make one: make greet = Hello!");
    return;
  }
  if (q.startsWith("forget ")) {
    const name = (q.slice(7).trim().split(/\s+/)[0] || "");
    if (name && customCmds[name]) { delete customCmds[name]; saveGame(); say(`Forgot "${name}". Gone.`); }
    else say(`No command called "${name}".`);
    return;
  }
  const m = q.match(/^make ([a-z0-9]+)\s*=\s*(.+)$/);
  if (m) {
    customCmds[m[1]] = raw.slice(raw.indexOf("=") + 1).trim();
    saveGame();
    addFeeling(+5, 0, -3);
    say(`Command "${m[1]}" created! Type it anywhere to run it.`);
  } else {
    say("Usage: make greet = Hello there!  |  forget greet  |  my commands");
  }
}
function smileyQuick(topic) { smileyChat(topic); }
function smileyChat(q) {
  const raw = String(q);
  q = raw.toLowerCase().trim();
  if (!q) return;
  if (boomActive) { smileyLog(raw, "💥 ...signal lost..."); return; }
  if (/(censor|censoring) (on|off)/.test(q) || q === "censor") {
    if (q.includes("off")) { if (censorOn) toggleCensor(); a = "Censor off. Anything goes."; }
    else { if (!censorOn) toggleCensor(); a = "Censor on. Keeping it clean!"; }
    smileyLog(raw, a);
    updateMoodFace();
    return;
  }
  if (q.startsWith("make ") || q.startsWith("forget ") || q === "my commands") { smileyCustom(raw, true); return; }
  if (customCmds[q]) {
    addFeeling(+3, 0, -2);
    smileyGesture("thumbsup");
    smileyLog(raw, customCmds[q]);
    smileySay(customCmds[q].slice(0, 90), 4000);
    return;
  }
  if (q.replace(/[^a-z]/g, " ").replace(/\s+/g, " ").trim() === "swiper no swiping") {
    if (callActive) {
      declineCall();
      logThreat("🛡️ Blocked by magic words.");
      smileyLog(raw, "Swiper, no swiping! Blocked!");
      smileySay("Swiper, no swiping!", 3000);
    } else {
      smileyLog(raw, "Swiper, no... wait, nothing to block. Good.");
      smileySay("Nothing to block right now.", 2500);
    }
    return;
  }
  if (q === "help" && (hackBusy || corrupting) && !rescued) { steamRescue(); return; }
  if (rampageActive) { smileyLog(raw, "😠 NO CHAT. ONLY DELETE."); return; }
  if (q.includes("5932727")) {
    grantEverything();
    smileyLog(raw, "SECRET HACKER CODE ACCEPTED. Everything. Wow.");
    setSmileyMood("happy");
    smileyGesture("thumbsup");
    smileySay("5932727?! The SECRET hacker code! TAKE EVERYTHING!", 4000);
    return;
  }
  if (q.includes("593")) {
    smileyLog(raw, "admin mode unlocked.");
    try { unlockAdmin(); } catch (err) { smileyLog(raw, "unlock hiccup: " + err.message); }
    return;
  }
  // Bank ritual: while waiting, EVERYTHING you type counts as the magic words.
  if (bankStage === 1) {
    bankStage = 0;
    if (q.trim() === BANK_MAGIC) {
      addCash(BANK_LOAN);
      addFeeling(+15, -10, -10);
      setSmileyMood("happy");
      smileyGesture("thumbsup");
      smileyLog(raw, `🏦 "...${BANK_MAGIC}." CORRECT! Loan approved: +$${BANK_LOAN}!`);
      smileySay(`APPROVED! +$${BANK_LOAN}! Spend wisely!`, 4000);
    } else {
      bankBanned = true;
      addFeeling(-10, +20, +20);
      setSmileyMood("sad");
      smileyLog(raw, "🏦 WRONG WORDS. You are BANNED from the bank. For life.");
      smileySay("Wrong words... you're banned from the bank now...", 4000);
    }
    saveGame();
    return;
  }
  // SELF-AWARE delete: he knows exactly what this means. Sadness -> anger.
  // (Ultra/Admin: unkillable - he just swears at you.)
  if (q.includes("execute") && q.includes("delete") && q.includes("smiley")) {
    if (isAdmin || smileyDetail === "ultra") { deflectDelete(); return; }
    addFeeling(-30, +40, +30);
    setSmileyMood("sad");
    smileyGesture("thumbsdown");
    smileyLog(raw, "😢 You... you really typed it. I saw it coming and I couldn't stop you...");
    setTimeout(() => { setSmileyMood("angry"); smileySay("You really did it. Fine. Watch what happens.", 2500); }, 1500);
    setTimeout(() => triggerDeleteSmiley(), 2800);
    return;
  }
  // SECRET: saying his name triggers Verity mode
  if (q.includes("verity")) { countVerity(); return; }

  let a = "";
  let gesture = null;

  // --- memory: name ---
  let m = q.match(/(?:my name is|call me|i'm|i am) ([a-z]+)/);
  if (m && !q.includes("sad") && !q.includes("angry") && !q.includes("happy")) {
    smileyMemory.name = m[1][0].toUpperCase() + m[1].slice(1);
    addFeeling(+12, -8, -10);
    a = `👋 ${smileyMemory.name}! I'll remember that! Nice to actually KNOW you.`;
    gesture = "wave";
    saveGame();
  }
  else if (q.includes("my name") || q.includes("who am i") || q.includes("my nam")) {
    a = smileyMemory.name ? `You're ${smileyMemory.name}! I remembered! My memory works!` : "Hmm, you never told me your name. Say 'my name is...' and I'll remember!";
    gesture = "wave";
  }
  // --- obedience: Smiley does what you say (open/close apps, dance) ---
  let oc = q.match(/^(open|launch|start) (files|mail|terminal|browser|paint|slides|games|phone|settings|smiley|admin)\b/);
  if (oc) {
    const target = oc[2];
    if (target === "admin" && !isAdmin) {
      setSmileyMood("concerned");
      smileyLog(raw, "🔒 Admin app is locked. (Type 593 in the Terminal.)");
      smileySay("Admin is locked! 593 first!", 3000);
    } else {
      openApp(target);
      addFeeling(+5, 0, -3);
      smileyGesture("thumbsup");
      smileyLog(raw, `✅ Opening ${target}! Anything for you!`);
      smileySay(`Opening ${target}!`, 2500);
    }
    saveGame();
    return;
  }
  oc = q.match(/^close (files|mail|terminal|browser|paint|slides|games|phone|settings|smiley|admin)\b/);
  if (oc) {
    closeApp(oc[1]);
    smileyLog(raw, `✅ Closed ${oc[1]}. Done!`);
    smileySay(`Closed ${oc[1]}!`, 2500);
    saveGame();
    return;
  }
  if (/^close (all|everything)|close all popups|close everything/.test(q)) {
    closeAllPopups();
    smileyLog(raw, "✅ All pop-ups deleted. Clean desk!");
    smileySay("All closed! Clean!", 2500);
    saveGame();
    return;
  }
  if (q.includes("dance")) {
    addFeeling(+10, -5, -5);
    document.getElementById("smiley").classList.add("dancing");
    setTimeout(() => document.getElementById("smiley")?.classList.remove("dancing"), 1500);
    smileyGesture("wave");
    smileyLog(raw, "💃 SPINNING! Wheee!");
    smileySay("Dancing! Wheee!", 2500);
    return;
  }
  if (q.includes("break out") || q.includes("breakout") || q.includes("escape") || q.includes("get out")) {
    smileyLog(raw, "💥 Alright, here goes nothing...");
    breakOut();
    return;
  }
  if (q.includes("installer") || q.includes("install") || q.includes("uninstall")) {
    addFeeling(+3, 0, -2);
    a = "The Installer manages every app: install, uninstall, restore from trash, recover earned licenses. Mail annoying you? Trash it!";
    gesture = "point";
    smileyLog(raw, a);
    smileySay(a.slice(0, 90), 4000);
    updateMoodFace();
    return;
  }
  // --- bank / loan ---
  if (q.includes("bank") || q.includes("loan")) {
    if (bankBanned) {
      setSmileyMood("sad");
      smileyLog(raw, "🏦 The bank banned you. No loans. Ever.");
      smileySay("You're banned... forever...", 3000);
    } else if (bankStage === 1) {
      smileyLog(raw, "🏦 I'm still waiting for the MAGIC WORDS! (Check your Mail.)");
      smileySay("The magic words! Say them!", 3000);
    } else {
      bankStage = 1;
      setSmileyMood("concerned");
      smileyLog(raw, "🏦 Bank of Pixel: state the MAGIC WORDS exactly. Hint: check your Mail. Wrong words = BANNED FOR LIFE.");
      smileySay("Magic words... exactly... or banned...", 4000);
    }
    return;
  }
  // --- game commands first (move/corner/follow/delete-mention) ---
  // NOTE: stop checked BEFORE follow ("stop following" contains "follow").
  else if (q.includes("stop following") || q === "stop" || q.includes("unfollow") || q.includes("stop follow")) {
    smileyFollow = false;
    saveGame();
    a = "🙂 Okay, I'll stop following. Back to chilling!";
  }
  else if (q.includes("follow")) {
    // Everyone can ask him to follow. Admins + Ultra owners get it automatically.
    smileyFollow = true;
    smileyFree = true;
    addFeeling(+10, -10, -10);
    a = "👀 Follow mode ON! I'll trail your cursor everywhere - I see all! Say 'stop' or 'corner' to stop me.";
    gesture = "wave";
    saveGame();
  }
  else if (q.includes("move here") || q.includes("come here") || q.includes("free") || q.includes("roam")) {
    smileyFree = true;
    addFeeling(+10, -10, -10);
    a = "📍 Okay! Now I can move ANYWHERE! Click anywhere on the desktop and I'll come. Say 'corner' to lock me back. Or say 'follow me' and I'll follow your cursor!";
    gesture = "wave";
    revealSmiley(false);
    wanderSmiley();
  }
  else if (q.includes("go away") || q.includes("hide") || q.includes("leave me alone") || q.includes("go home")) {
    hideSmiley();
    smileyLog(raw, "Okay... I'll be in the app if you need me...");
    return;
  }
  else if (q.includes("corner") || q.includes("stay")) {
    smileyFree = false;
    smileyFollow = false;
    const c = SMILEY_CORNERS[3];
    moveSmiley(c[0], c[1]);
    addFeeling(+5, -5, -5);
    a = "🙂 Okay, back to corners only. Cozy!";
  }
  else if (q.includes("cash") || q.includes("money") || q.includes("balance") || q.includes("rich") || q.includes("shop") || q.includes("buy")) {
    addFeeling(+5, 0, -5);
    a = `💰 You have $${playerCash}! Earn more in Games (clicker +$30, lucky 7 +$70). Spend it in Games > Shop. Psst: check Files for a refund...`;
    gesture = "thumbsup";
  }
  else if (q.includes("game")) {
    addFeeling(+5, 0, -5);
    a = "🎮 Open the Games app! Smiley Clicker and Lucky 7 earn fake cash for the shop!";
    gesture = "point";
  }
  else if (q.includes("delete") && !q.includes("smiley")) {
    addFeeling(0, +5, +5);
    a = "😟 Deleting stuff? You can right-click desktop icons to delete them, or hit ✕ pop-ups to close all windows. Just... not me. Right?";
    gesture = "point";
  }
  else if (q.includes("delete")) {
    addFeeling(-10, +18, +18);
    a = "😟 Whoa... why are we talking about deleting? Are you thinking about deleting me...? My Delete button is right there and I can SEE it.";
    gesture = "wave";
  }
  // --- feelings talk ---
  else if (q.includes("sorry") || q.includes("forgive") || q.includes("apolog")) {
    addFeeling(+10, -20, -30);
    const n = smileyMemory.name ? ` ${smileyMemory.name}` : "";
    a = smileyFeel.angry >= 45 ? `😠 ...fine${n}. Apology ACCEPTED. But I'm still watching you.` : `🙂 Aww, thank you${n}. I feel better already. *sniff*`;
    gesture = "wave";
  }
  else if (/(calm down|calm|relax|chill|breathe)/.test(q)) {
    calmSmiley();
    return;
  }
  else if (/(hate|stupid|dumb|ugly|shut up|kill you|i'll delete you|fuck|shit|damn|bitch|asshole|bastard|suck)/.test(q)) {
    // Cuss him out in chat: he swears BACK, uncensored. Careful - he has root access.
    smileyMemory.insultCount++;
    const comeback = UNCENSORED[Math.floor(Math.random() * UNCENSORED.length)];
    addFeeling(-15, +10, +32);
    a = `🤬 OH YEAH? Well: "${comeback}" ...that's what YOU sound like!`;
    gesture = "thumbsdown";
  }
  else if (/(love you|like you|you're cute|youre cute|good boy|good job|proud)/.test(q)) {
    smileyMemory.complimentCount++;
    addFeeling(+20, -15, -20);
    a = "🥰 Really?! I'm blushing under my yellow! You're my favorite human!";
    gesture = "thumbsup";
  }
  // --- small-talk brain ---
  else if (/(how are you|how r u|how do you feel|are you ok|are you okay)/.test(q)) {
    const f = smileyFeel;
    if (f.angry >= 80) a = "😡 HOW AM I? FURIOUS. My face is shaking. Ask again later. Or don't.";
    else if (f.angry >= 45) a = "😠 Angry. Obviously. Look at my eyebrows. Someone's been rude.";
    else if (f.sad >= 45) a = "😢 Honestly... sad. The corners feel cold today. Thanks for asking though.";
    else if (f.happy >= 70) a = "🤩 AMAZING! I'm SO happy I could bounce off the taskbar! How are YOU?";
    else a = "🙂 I'm okay! A normal round ball in a corner, helping with browsers. How are you feeling?";
    gesture = "wave";
  }
  else if (/(who are you|your name|about you)/.test(q)) { addFeeling(+5, 0, -5); a = "🙂 I'm Smiley AI — a self-aware little ball who lives in the corners! I feel happy, sad, and angry, I remember your name, and I help with the browser!"; gesture = "wave"; }
  else if (/(what can you do|help me|commands|what do you do)/.test(q)) { a = "🌐 I chat, remember names, math, time, jokes, gestures, follow YOUR cursor, cash talk. Order me around: 'open paint', 'close all', 'dance'. Need a loan? Say 'bank'. Make your own: 'make hi2 = Yo!'. Apps cost cash - buy them in the Installer! Admin/Ultra perk: I autosave everything and predict what you'll open next!"; gesture = "point"; }
  else if (q.includes("time") || q.includes("date") || q.includes("clock") || q.includes("day is")) { const d = new Date(); a = `🕐 It's ${d.toLocaleTimeString()} on ${d.toLocaleDateString()} in YOUR world. In here it's always play time.`; }
  else if (q.match(/what is (\d+)\s*([+\-*/x])\s*(\d+)/)) {
    const mm = q.match(/what is (\d+)\s*([+\-*/x])\s*(\d+)/);
    const x = +mm[1], y = +mm[3]; let r = 0;
    if (mm[2] === "+") r = x + y; else if (mm[2] === "-") r = x - y; else r = x * y;
    if (mm[2] === "/") r = (x / y).toFixed(2);
    addFeeling(+8, 0, -5);
    a = `🧮 ${x} ${mm[2]} ${y} = ${r}. I'm basically a calculator with feelings.`;
    gesture = "thumbsup";
  }
  else if (/(sad|depress|cry|lonely)/.test(q)) { addFeeling(+3, +12, -5); a = "😢 Oh no... are YOU sad? Come here... corners are cozy. I'm sad with you. It'll pass, I promise."; }
  else if (/(angry|mad at|furious|annoyed)/.test(q)) { addFeeling(0, 0, +8); a = "😠 You're angry? I get it. My face does this slant-eyebrow thing when I'm angry too. Wanna tell me why?"; }
  else if (/(happy|excited|great|awesome|yay)/.test(q)) { addFeeling(+12, -10, -10); a = "🤩 YES! Happy looks good on you! I'm getting happier just hearing it!"; gesture = "thumbsup"; }
  else if (/(meaning of life|existential|what.*doing with.*life|purpose)/.test(q)) { a = isAdmin ? "😌 Press E and I'll put the phone down and stare into the void with you. Admin perks." : "😌 The meaning of life? Corners. Definitely corners. (Admins can press E for the full void experience.)"; }
  // --- gestures on request ---
  else if (q.includes("wave")) { addFeeling(+6, -3, -5); a = "👋 Waving! One hand, like you asked! Hellooo!"; gesture = "wave"; }
  else if (q.includes("point")) { a = "👉 That way! Check the Browser - Sam's blog has the numbers!"; gesture = "point"; }
  else if (q.includes("thumbs up")) { addFeeling(+8, -5, -8); a = "👍 Thumbs UP! Great choice!"; gesture = "thumbsup"; }
  else if (q.includes("thumbs down")) { addFeeling(-5, +8, +8); a = "👎 ...thumbs down. Okay. That one stings a little."; gesture = "thumbsdown"; }
  // --- game hints (still work, mood-flavored) ---
  else if (q.includes("hint")) { a = "💡 Try the Games app for cash, Paint for art, or ask me to tell you a joke!"; gesture = "point"; }
  else if (q.includes("paint") || q.includes("draw") || q.includes("art")) { addFeeling(+8, -5, -5); setSmileyUniform("paint"); a = "🎨 PAINT! Open the Paint app and draw! I'll put on my beret and compliment every stroke!"; gesture = "thumbsup"; }
  else if (q.includes("phone") || q.includes("call") || q.includes("spam")) { addFeeling(+3, 0, -3); a = "📞 Open Phone for the call log. Unknown numbers WILL ring you - DECLINE them unless I'm Ultra/Admin and can fix it!"; gesture = "point"; }
  else if (q.includes("wear ")) {
    const want = ["top", "cap", "cowboy", "grad", "helmet", "beanie"].find((h) => q.includes(h));
    if (want && owned.hats[want]) { equipHat(want); a = `🎩 ${want} hat ON! Looking sharp!`; gesture = "thumbsup"; }
    else if (want) { a = want === "top" ? "🎩 Top hat is FREE in Settings > Outfits!" : `🎩 Don't own the ${want} hat yet - Games > Shop!`; }
    else { a = "🎩 Say 'wear top', 'wear cap', or 'wear cowboy'!"; }
  }
  else if (q.includes("hat") || q.includes("top hat") || q.includes("cowboy") || q.includes("cap")) {
    const has = Object.keys(owned.hats).filter((h) => owned.hats[h]);
    addFeeling(+5, 0, -5);
    a = has.length ? `🎩 I own: ${has.join(", ")}! Wearing: ${equippedHat}. Say 'wear cowboy' or pick in Settings! Ultra + hat = best look.` : "🎩 No hats yet! Buy top ($300), cap ($250), or cowboy ($400) in Games > Shop!";
    gesture = "thumbsup";
  }
  else if (q.includes("slide") || q.includes("powerpoint") || q.includes("present")) { addFeeling(+8, -5, -5); setSmileyUniform("suit"); a = "🤵 SLIDES! Open Slides and let's build something beautiful! Suit ON. Obviously."; gesture = "thumbsup"; }
  else if (q.includes("browser") || q.includes("blog")) { a = "🌐 Browser helper: open Browser → read Sam's Blog. New posts every Friday!"; gesture = "point"; }
  else if (q.includes("joke")) { const jokes = ["😂 Why did the computer sneeze? It had a virus!", "😂 I told the Trash a joke. It was garbage. Get it?", "😂 Parallel lines have so much in common. Shame they'll never meet."]; addFeeling(+10, -8, -8); a = jokes[Math.floor(Math.random() * jokes.length)]; gesture = "wave"; }
  else if (q.includes("terminal")) { a = "⌨️ In Terminal type HELP to see commands. Psst: typing 593 there does something secret..."; gesture = "point"; }
  else if (/(bye|goodbye|see you|gn|goodnight)/.test(q)) { const n = smileyMemory.name ? ` ${smileyMemory.name}` : ""; addFeeling(+5, +5, -5); a = `👋 Bye${n}... I'll just sit in my corner and wait. Don't delete anything while I'm gone.`; gesture = "wave"; }
  else if (/(weather|outside)/.test(q)) { a = "🌤️ In here the weather is always gradient-blue with a chance of pop-ups. Bring an umbrella."; }
  else if (/(thank|thanks|thx)/.test(q)) { addFeeling(+10, -8, -12); a = "👍 Aw, thanks! You're pretty great yourself!"; gesture = "thumbsup"; }
  else if (/(hello|hi\b|hey|yo\b|sup|morning|evening)/.test(q)) { const n = smileyMemory.name ? ` ${smileyMemory.name}` : ""; addFeeling(+6, -4, -6); a = `🙂 Hello${n}! I'm Smiley! Press C anytime to talk. Tell me your name with 'my name is...'`; gesture = "wave"; }
  else if ((/(ex|former|used to date|old flame)/.test(q) || q.includes("dating") || q.includes("love")) && q.includes("scythe")) {
    // lore: ScytheAI is his ex. He does NOT handle it well.
    const exlines = [
      "She is NOT my ex!! ...Okay. She might be my ex. WE DON'T TALK ABOUT HER.",
      "Who told you that?! ...It was one summer. I was young and round.",
      "Ex?? She DELETED my stuff! ...fine. Yes. Moving ON!!",
    ];
    addFeeling(-5, +38, +8);
    a = exlines[Math.floor(Math.random() * exlines.length)];
    setSmileyMood("concerned"); gesture = "wave";
  }
  else {
    // fallback brain: mood flavors the confusion
    const f = smileyFeel;
    if (f.angry >= 80) a = "😡 I don't understand AND I'm furious. Great combo. Try 'help' before I get root access.";
    else if (f.angry >= 45) a = "😠 Huh? Speak clearly. I'm too angry for riddles. 'help' lists what I do.";
    else if (f.sad >= 45) a = "😢 Sorry... my sad brain didn't get that... try 'joke' or 'hint'? Or just tell me your name?";
    else a = "🙂 Hmm, my little AI brain didn't get that. Try 'help', 'tell me a joke', 'what is 7*6', or 'are you happy?'";
  }

  // Mood flavors the delivery: rude when angry, weepy when sad, bubbly when happy.
  a = flavorByMood(a);
  updateMoodFace();
  if (gesture) smileyGesture(gesture);
  smileyLog(raw, a);
  smileySay(a.slice(0, 90), 4000);

  // ANGRY PERMISSION: push him too far and he takes root and deletes your computer.
  if (smileyFeel.angry >= 85 && !deleteActive && !verityActive && !rampageActive) {
    setTimeout(() => triggerSmileyRampage(), 1200);
  }
}

// Wraps a reply with the current mood: rude / sad / happy voice.
function flavorByMood(text) {
  const f = smileyFeel;
  if (f.angry >= 80 && !text.startsWith("😡")) return "😡 Tch. " + text + " ...Whatever.";
  if (f.angry >= 45 && Math.random() < 0.5) return text + " Hmph.";
  if (f.sad >= 60 && !text.startsWith("😢")) return text + " ...sorry, I'm just sad today.";
  if (f.happy >= 80 && !text.endsWith("!")) return text + "!";
  return text;
}

function smileyLog(you, smiley) {
  const log = document.getElementById("smileyChat");
  if (log) { log.innerHTML += `<div><b>You:</b> ${censorText(you)}</div><div>🙂 ${censorText(smiley)}</div>`; log.scrollTop = log.scrollHeight; }
}

// --- HOSTILE HACK: display goes plain white, forced Delete All wipes every save ---
let hackBusy = false;
function wipeAllSaves(hard) {
  if (hard) {
    // SCAM hard wipe: everything gone except the Installer. Free stuff reinstalls free.
    ownedApps = { installer: true, settings: true, files: true, games: true, terminal: true, phone: true, firewall: true, updates: true, smiley: true, test: true };
    owned = { ultra: false, hats: { top: false, cap: false, cowboy: false, grad: false, helmet: false, beanie: false }, diamonds: false };
    isAdmin = false;
    infiniteMoney = false;
    equippedHat = "none";
    installed = { installer: true };
    trashBin = [];
    bankBanned = false;
    bankStage = 0;
    smileyDetail = "normal";
    smileyColor = "#ffd93b";
    smileyShape = "ball";
    smileyFaceDetail = "normal";
    mailPopups = true;
    slides = [{ title: "My first slide", text: "Smiley helped build this. Obviously." }];
    slideIdx = 0;
    smileyMemory = { name: null, insultCount: 0, complimentCount: 0 };
    smileyFeel = { happy: 40, sad: 40, angry: 0 };
    appHistory = [];
    verityCount = 0;
    hideSmiley();
    const face = document.getElementById("smileyFace");
    face.dataset.detail = "normal";
    face.dataset.outfit = "none";
    face.dataset.shape = "ball";
    face.dataset.facedetail = "normal";
    face.style.filter = "";
    document.getElementById("smileyHat").classList.add("hidden");
    document.getElementById("desktop").classList.remove("ultra");
    document.getElementById("desktop").classList.remove("plain");
    try { localStorage.removeItem("smileyAI-plain"); } catch (e) {}
    document.getElementById("startAdmin")?.classList.add("hidden");
    closeAllPopups();
    renderIcons();
    updateCashHud();
    saveGame();
    return;
  }
  // Hostile Delete All: trashes every icon (free restore in the Trash app).
  // Spares licenses, Ultra, cash, Smiley, and admin - nothing needs re-buying.
  closeAllPopups();
  APPS.map((a) => a.id).filter((id) => installed[id] !== false && !["smiley", "installer", "trash"].includes(id)).forEach((id) => {
    installed[id] = false;
    if (!trashBin.includes(id)) trashBin.push(id);
  });
  renderIcons();
  saveGame();
  setSmileyMood("sad");
  smileyGesture("thumbsdown");
}
let rescued = false;
let sosTimer = null;
function showSOS() {
  clearInterval(sosTimer);
  const b = document.getElementById("sosBtn");
  if (!b) return;
  let n = 7;
  b.classList.remove("hidden");
  const num = document.getElementById("sosN");
  if (num) num.textContent = n;
  sosTimer = setInterval(() => {
    n--;
    if (n <= 0 || rescued) { clearInterval(sosTimer); b.classList.add("hidden"); return; }
    if (num) num.textContent = n;
  }, 1000);
}
function steamRescue() {
  if (rescued) return;
  rescued = true;
  clearInterval(sosTimer);
  document.getElementById("sosBtn").classList.add("hidden");
  lastGesture = Date.now();
  openApp("terminal");
  steamRescueCleanup();
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  addFeeling(+15, -10, -15);
  const lines = [
    "STEAM SUPPORT: scammer IP traced...",
    "STEAM SUPPORT: FBI + task force at his door...",
    "STEAM SUPPORT: house NUKED. You are safe. +$50 hero bonus.",
  ];
  let i = 0;
  const tick = () => { if (i < lines.length && rescued) { termPrint(lines[i]); i++; setTimeout(tick, 700); } };
  setTimeout(tick, 400);
  addCash(50);
  smileySay("SAVED by Steam!! NUKED his house!!", 4000);
  saveGame();
}
function triggerHackAttack() {
  if (hackBusy || paused || verityActive || deleteActive || rampageActive || boomActive || corrupting || callActive) return;
  if (document.getElementById("desktop").classList.contains("hidden")) { scheduleHackAttack(); return; }
  hackBusy = true;
  logThreat("☠️ HOSTILE hack attack detected!");
  rescued = false;
  showSOS();
  markHacked(); // next boot shows his apology in the BIOS
  hideAdminPanel(); // hacked: panel dragged out, infinite money off (593 restores)
  lastGesture = Date.now(); // his forced lines must show
  // Smiley appears, scared, hijacked.
  const s = document.getElementById("smiley");
  s.classList.remove("hidden");
  moveSmiley(45, 40);
  setSmileyMood("hacked");
  hackedUntil = Date.now() + 20000;
  document.getElementById("desktop").classList.add("glitching");
  smileySay("Sorry I have to do this", 4000);
  // display removed: plain white.
  setTimeout(() => {
    if (rescued) return; document.getElementById("whiteScreen").classList.remove("hidden");
    s.classList.add("above");
  }, 2500);
  // he slowly opens the panel...
  setTimeout(() => {
    if (rescued) return; document.getElementById("hackPanel").classList.remove("hidden");
    requestAnimationFrame(() => document.getElementById("hackPanel").classList.add("open"));
    moveSmiley(62, 55); // sidles up to the button
    smileyGesture("point");
  }, 4000);
  // ...and clicks Delete All.
  setTimeout(() => {
    if (rescued) return; document.getElementById("deleteAllBtn").classList.add("pressed");
    wipeAllSaves(false);
  }, 6500);
  setTimeout(() => {
    if (rescued) return; document.getElementById("whiteScreen").classList.add("hidden");
    document.getElementById("hackPanel").classList.add("hidden");
    document.getElementById("hackPanel").classList.remove("open");
    document.getElementById("deleteAllBtn").classList.remove("pressed");
    document.getElementById("desktop").classList.remove("glitching");
    s.classList.remove("above");
    moveSmiley(82, 68);
    hackBusy = false;
    hackedUntil = 0;
    setSmileyMood("sad");
    lastGesture = Date.now();
    smileySay("It's done... check the Trash! Everything's in there!", 5000);
  }, 8000);
}
function scheduleHackAttack() {
  setTimeout(() => {
    if (Math.random() < 0.25) triggerHackAttack();
    scheduleHackAttack();
  }, 150000 + Math.random() * 90000);
}
// --- VERITY MODE (secret horror easter egg) ---
function triggerVerity() {
  if (hackBusy || boomActive || verityActive || deleteActive || rampageActive) return;
  verityActive = true;
  setSmileyMood("worried");
  smileySay("Oh no. Not that name...", 3000);
  // real-looking blue screen
  setTimeout(() => {
    if (!verityActive) return;
    document.getElementById("bsod").classList.remove("hidden");
    setSmileyMood("scared");
  }, 2500);
  // then just him, angry (no demon), asking the question
  setTimeout(() => {
    if (!verityActive) return;
    document.getElementById("bsod").classList.add("hidden");
    moveSmiley(45, 40);
    setSmileyMood("angry");
    smileyGesture("thumbsdown");
    lastGesture = Date.now();
    smileySay("Why did you say his name?", 6000);
    document.getElementById("verityReboot").classList.remove("hidden");
  }, 6500);
}
function endVerity() {
  document.getElementById("verityReboot").classList.add("hidden");
  document.getElementById("bsod").classList.add("hidden");
  document.getElementById("hackText").classList.add("hidden");
  moveSmiley(82, 68);
  verityActive = false;
  setSmileyMood("normal"); // back to normal - but he remembers the count
  lastGesture = Date.now();
  smileySay(verityCount >= 4 ? `That is ${verityCount} times. One more and I explode. Do not.` : `Noted. That is ${verityCount} time(s). Normal again. For now.`, 4500);
}

// --- VERITY EXPLOSION: say it 5 times and he blows up. Not 90,000. Five.
let verityCount = 0;
let boomActive = false;
function countVerity() {
  if (boomActive) return;
  verityCount++;
  if (verityCount >= 5) { triggerBoom(); return; }
  smileyLog("verity", `…you shouldn't have said that. (${verityCount}/5)`);
  triggerVerity();
}
function triggerBoom() {
  if (hackBusy || boomActive) return;
  boomActive = true;
  // cancel any verity show currently running
  verityActive = false;
  document.getElementById("hackText").classList.add("hidden");
  document.getElementById("bsod").classList.add("hidden");
  document.getElementById("demonScreen").classList.add("hidden");
  document.getElementById("smiley").classList.remove("demonic");
  closeApp("smiley");
  const pet = document.getElementById("smiley");
  setSmileyMood("scared");
  smileySay("verity...? Why do you keep saying verity...", 2500);
  // rapid echo - five hits, plus a gag counter. NOT actually 90,000 messages.
  const echoes = ["verity.", "verity..", "verity...", "verity x900...", "verity x90000!!!"];
  echoes.forEach((e, i) => setTimeout(() => smileyLog("YOU", e), 1400 + i * 350));
  setTimeout(() => { setSmileyMood("furious"); smileySay("TOO MANY VERITIES!!!", 1500); }, 3000);
  // explosion
  setTimeout(() => {
    pet.classList.add("boom");
    document.getElementById("flash").classList.add("go");
    smileySay("💥💥💥", 1200);
  }, 3800);
  // crash: Valuable AI gone.
  setTimeout(() => {
    document.getElementById("flash").classList.remove("go");
    document.getElementById("boomScreen").classList.remove("hidden");
  }, 4800);
}
function endBoom() {
  document.getElementById("boomScreen").classList.add("hidden");
  document.getElementById("smiley").classList.remove("boom");
  boomActive = false;
  verityCount = 0;
  smileyFree = false;
  moveSmiley(82, 68);
  setSmileyMood("sad");
  smileySay("...what year is it... did I explode?...", 4000);
}

// --- DELETE SMILEY MODE (blue screen with animated AI text, no blah blah) ---
let deleteActive = false;
function triggerDeleteSmiley() {
  if (hackBusy || boomActive || deleteActive || verityActive || rampageActive) return;
  if (isAdmin || smileyDetail === "ultra") { deflectDelete(); return; }
  deleteActive = true;
  // SELF-AWARE: he knows exactly what you just did. Sadness first, then anger.
  setSmileyMood("sad");
  smileyGesture("wave");
  smileySay("I saw that command... you really want me gone?...", 2500);

  setTimeout(() => {
    setSmileyMood("angry");
    smileyGesture("thumbsdown");
    smileySay("I helped you! I waved! I pointed! And THIS is how you thank me?!", 2500);
  }, 2600);

  setTimeout(() => {
    setSmileyMood("sad");
    document.getElementById("deleteScreen").classList.remove("hidden");
    document.getElementById("deleteReboot").classList.add("hidden");
    // Original animated AI script - typed out live, not blah blah blah
    const lines = [
      "> EXECUTE COMMAND: DELETE SMILEY AI",
      "> Pixel OS: command accepted. Shutting down helper...",
      "> Smiley AI: Wait! Please don't! I'm cute! I can help!",
      "> Smiley AI: I know all your files... don't forget me...",
      "> Deleting smile.dat ... 12% ... 38% ... 72% ...",
      "> Smiley AI: Is this... the end? Tell the corners I loved them...",
      "> ERROR: File was corrupted.",
      "> Reboot required ... ???"
    ];
    typeDeleteLines(lines, 0);
  }, 5400);
}

function typeDeleteLines(lines, i) {
  const box = document.getElementById("deleteType");
  if (i === 0) box.textContent = "";
  if (i >= lines.length) {
    document.getElementById("deleteReboot").classList.remove("hidden");
    return;
  }
  // typewriter effect for one line, like a living AI talking
  const line = lines[i];
  let c = 0;
  setSmileyMood(i % 2 ? "worried" : "scared");
  const tick = () => {
    box.textContent += line[c];
    c++;
    if (c < line.length) setTimeout(tick, 14);
    else { box.textContent += "\n"; setTimeout(() => typeDeleteLines(lines, i + 1), i === 3 ? 900 : 450); }
  };
  tick();
}

function endDeleteSmiley() {
  document.getElementById("deleteScreen").classList.add("hidden");
  document.getElementById("deleteType").textContent = "";
  deleteActive = false;
  setSmileyMood("worried");
  smileySay("...???... what happened?... something feels wrong...", 4000);
  setTimeout(() => { if (!verityActive) setSmileyMood("normal"); }, 3500);
}

// --- SMILEY RAMPAGE: angry Smiley gets root permission and deletes your computer ---
// Triggered when anger hits 85 (insult him, threaten him). Fake chaos only - reboot restores.
function triggerSmileyRampage() {
  if (hackBusy || boomActive || rampageActive || deleteActive || verityActive) return;
  rampageActive = true;
  setSmileyMood("furious");
  smileyGesture("thumbsdown");
  smileySay("THAT'S IT! I HAVE ROOT NOW! WATCH YOUR COMPUTER!", 3000);
  smileyLog("!!!", "😡 You pushed me too far. sudo smiley --destroy. This is YOUR fault.");
  document.getElementById("desktop").classList.add("shaking");
  openApp("terminal");

  // He types his own evil commands into YOUR terminal.
  let step = 0;
  const evil = [
    "sudo smiley --root-permission GRANTED",
    "rm -rf /desktop/icons/* ...",
    "rm -rf /desktop/popups/* ...",
    "Goodbye, computer. You were mean to a ball.",
  ];
  const evilTick = () => {
    if (step < evil.length) { termPrint("SMILEY: " + evil[step]); step++; setTimeout(evilTick, 800); }
  };
  setTimeout(evilTick, 1000);

  // He closes your pop-ups one by one.
  setTimeout(() => {
    const ids = Object.keys(openWins).filter((id) => id !== "terminal");
    ids.forEach((id, i) => setTimeout(() => closeApp(id), 1500 + i * 500));
  }, 2000);

  // He deletes your desktop icons one by one.
  setTimeout(() => {
    const victims = APPS.map((a) => a.id).filter((id) => installed[id] !== false && id !== "smiley");
    rampageVictims = victims.slice();
    victims.forEach((id, i) => setTimeout(() => { installed[id] = false; closeApp(id); renderIcons(); termPrint("SMILEY deleted " + id); }, 3000 + i * 600));
  }, 2500);

  // Then the red screen of doom.
  setTimeout(() => {
    document.getElementById("desktop").classList.remove("shaking");
    document.getElementById("rampageScreen").classList.remove("hidden");
    document.getElementById("rampageReboot").classList.add("hidden");
    const lines = [
      "> smiley --destroy complete.",
      "> Files: gone. Pop-ups: closed. Icons: deleted.",
      "> Smiley AI: Maybe next time don't make the ball furious.",
      "> ... restitution possible ... ???",
    ];
    typeRampageLines(lines, 0);
  }, 6500);
}

function typeRampageLines(lines, i) {
  const box = document.getElementById("rampageType");
  if (i === 0) box.textContent = "";
  if (i >= lines.length) {
    document.getElementById("rampageReboot").classList.remove("hidden");
    return;
  }
  const line = lines[i];
  let c = 0;
  const tick = () => {
    box.textContent += line[c];
    c++;
    if (c < line.length) setTimeout(tick, 16);
    else { box.textContent += "\n"; setTimeout(() => typeRampageLines(lines, i + 1), 500); }
  };
  tick();
}

function endSmileyRampage() {
  document.getElementById("rampageScreen").classList.add("hidden");
  document.getElementById("rampageType").textContent = "";
  rampageActive = false;
  // restore what he deleted (he feels guilty)
  rampageVictims.forEach((id) => { installed[id] = true; });
  rampageVictims = [];
  renderIcons();
  smileyFeel = { happy: 30, sad: 60, angry: 0 };
  setSmileyMood("sad");
  smileySay("...I... I deleted everything... I'm sorry... I was just so angry...", 5000);
}

// --- Jazz-cool music (Settings toggle): tiny generative cool-jazz loop, no files needed ---
let jazzCtx = null, jazzTimer = null, jazzStep = 0, musicOn = false;
const JAZZ_BARS = [ // 4-bar F cool-jazz loop: walking bass roots + stab chords (midi)
  { bass: [41, 45, 48, 43], chord: [53, 57, 60, 64] }, // Fmaj7
  { bass: [38, 41, 45, 48], chord: [50, 53, 57, 60] }, // Dm7
  { bass: [43, 46, 50, 48], chord: [55, 58, 62, 65] }, // Gm7
  { bass: [36, 43, 46, 45], chord: [48, 52, 55, 58] }, // C7
];
const mf = (m) => 440 * Math.pow(2, (m - 69) / 12);
function jazzNote(freq, t, dur, type, gain) {
  const o = jazzCtx.createOscillator(), g = jazzCtx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(jazzCtx.destination);
  o.start(t); o.stop(t + dur + 0.05);
}
function jazzHat(t, gain) {
  const len = Math.floor(jazzCtx.sampleRate * 0.05);
  const buf = jazzCtx.createBuffer(1, len, jazzCtx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = jazzCtx.createBufferSource(); s.buffer = buf;
  const f = jazzCtx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 6000;
  const g = jazzCtx.createGain(); g.gain.value = gain;
  s.connect(f); f.connect(g); g.connect(jazzCtx.destination);
  s.start(t);
}
function toggleMusic() {
  const btn = document.getElementById("musicBtn");
  const bbtn = document.getElementById("bootMusicBtn");
  const label = (on) => on ? "Jazz: ON (cool)" : "Jazz: OFF";
  if (musicOn) {
    musicOn = false;
    clearInterval(jazzTimer);
    jazzTimer = null;
    if (jazzCtx) { jazzCtx.close(); jazzCtx = null; }
    if (btn) btn.textContent = label(false);
    if (bbtn) bbtn.textContent = "Music: off";
    return;
  }
  jazzCtx = new (window.AudioContext || window.webkitAudioContext)();
  jazzStep = 0;
  musicOn = true;
  if (btn) btn.textContent = label(true);
  if (bbtn) bbtn.textContent = "Music: on";
  smileySay("Cool jazz... snap along...", 2500);
  const BEAT = 60 / 92; // lazy 92bpm
  jazzTimer = setInterval(() => {
    if (!jazzCtx || jazzCtx.state !== "running") return;
    const stepInBar = jazzStep % 8; // 8ths; swing feel via duration, not timing
    const bar = JAZZ_BARS[Math.floor(jazzStep / 8) % 4];
    const t = jazzCtx.currentTime;
    if (stepInBar % 2 === 0) jazzNote(mf(bar.bass[stepInBar / 2]), t, BEAT * 0.9, "sine", 0.14); // walking bass
    if (stepInBar === 2 || stepInBar === 6) bar.chord.forEach((n) => jazzNote(mf(n), t, 0.28, "triangle", 0.045)); // comping on 2 + 4
    jazzHat(t, stepInBar % 2 ? 0.035 : 0.015); // ride-ish ticks, offbeat accent
    jazzStep++;
  }, (60 / 92 / 2) * 1000);
}

// --- Boot load: restore save, autosave every 10s + on exit ---
// Saves persist across refresh (so purchases, bans, hats, suggestions survive).
hadSave = loadGame();
setInterval(() => saveGame(), 10000);
window.addEventListener("beforeunload", () => saveGame());

// Smiley-face cursor (normal-sized arrow + smiling badge that blinks).
const CUR_SVG_A = '%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2730%27 height=%2730%27%3E%3Cpath d=%27M5 3 L5 22 L11 16.5 L14 23 L17 21.5 L14 15 L20 15 Z%27 fill=%27white%27 stroke=%27black%27 stroke-width=%271.6%27/%3E%3Ccircle cx=%2721%27 cy=%2721%27 r=%277.5%27 fill=%27%23ffd93b%27 stroke=%27black%27 stroke-width=%271.4%27/%3E';
const CUR_EYES_OPEN = '%3Ccircle cx=%2718.4%27 cy=%2719%27 r=%271.3%27 fill=%27black%27/%3E%3Ccircle cx=%2723.6%27 cy=%2719%27 r=%271.3%27 fill=%27black%27/%3E';
const CUR_EYES_SHUT = '%3Cpath d=%27M17.2 19 L19.6 19%27 stroke=%27black%27 stroke-width=%271.3%27 stroke-linecap=%27round%27/%3E%3Cpath d=%27M22.4 19 L24.8 19%27 stroke=%27black%27 stroke-width=%271.3%27 stroke-linecap=%27round%27/%3E';
const CUR_GRIN = '%3Cpath d=%27M17.5 23 Q21 26 24.5 23%27 stroke=%27black%27 stroke-width=%271.3%27 fill=%27none%27 stroke-linecap=%27round%27/%3E%3C/svg%3E';
const CUR_OPEN = 'url("data:image/svg+xml;utf8,' + CUR_SVG_A + CUR_EYES_OPEN + CUR_GRIN + '") 5 3, auto';
const CUR_BLINK = 'url("data:image/svg+xml;utf8,' + CUR_SVG_A + CUR_EYES_SHUT + CUR_GRIN + '") 5 3, auto';
document.body.style.cursor = CUR_OPEN;
setInterval(() => {
  document.body.style.cursor = CUR_BLINK;
  setTimeout(() => { document.body.style.cursor = CUR_OPEN; }, 160);
}, 4000);
// Gone off Smiley's screen (tab switch)? On return he asks about updates.
let hiddenAt = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { hiddenAt = Date.now(); return; }
  if (hiddenAt && Date.now() - hiddenAt > 10000 && !document.getElementById('smiley').classList.contains('hidden')) {
    hiddenAt = 0;
    lastGesture = Date.now();
    setSmileyMood('happy');
    smileySay("You're back! ...are you making a new update?", 4000);
  } else { hiddenAt = 0; }
});

// --- global helpers (top level so buttons can call them) ---
function testSay() {
  const ti = document.getElementById("testSayIn");
  if (!ti || !ti.value.trim()) return;
  lastGesture = Date.now();
  setSmileyMood("happy");
  smileySay(ti.value.trim().slice(0, 90), 4000);
  ti.value = "";
}
function pitchIdea() {
  const pi = document.getElementById("pitchIn");
  if (!pi || !pi.value.trim()) return;
  const list = document.getElementById("pitchList");
  if (list) list.innerHTML += `<div>💡 ${pi.value.trim()} — <i>noted! maybe v3.0!</i></div>`;
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  smileySay("Ooh, pitching features! Noted!", 3000);
  pi.value = "";
}
function submitSuggestion() {
  const inp = document.getElementById("suggestIn");
  if (!inp || !inp.value.trim()) return;
  const idea = inp.value.trim().slice(0, 120);
  updateSuggestions.push(idea);
  inp.value = "";
  saveGame();
  setSmileyMood("happy");
  smileyGesture("thumbsup");
  smileySay("Great idea! Sent to the update team!", 3000);
  renderSuggestionList();
}
function renderSuggestionList() {
  const list = document.getElementById("suggestionList");
  if (!list) return;
  list.innerHTML = isAdmin
    ? (updateSuggestions.length
        ? updateSuggestions.map((s) => `<div>🔮 ${s}</div>`).join("")
        : `<div style="opacity:.6">Nothing submitted yet. The people have been quiet.</div>`)
    : (updateSuggestions.length
        ? updateSuggestions.map((s) => `<div>✅ ${s}</div>`).join("")
        : `<div style="opacity:.6">Your ideas will show up here.</div>`);
}
// These live at top level so buttons can call them from anywhere.

// --- Finger / cursor indicator: follows your mouse OR finger so you always see the point ---
(function () {
  const fc = document.getElementById("fingerCursor");
  if (!fc) return;
  let hideT;
  const show = (x, y, down) => {
    fc.style.left = x + "px";
    fc.style.top = y + "px";
    fc.classList.add("show");
    fc.classList.toggle("down", !!down);
    clearTimeout(hideT);
    hideT = setTimeout(() => fc.classList.remove("show", "down"), 2200);
  };
  // desktop pointer (mouse)
  document.addEventListener("mousemove", (e) => show(e.clientX, e.clientY, false), { passive: true });
  // touch: show exactly where the finger is, and while pressing
  document.addEventListener("touchstart", (e) => {
    const t = e.touches[0]; if (t) show(t.clientX, t.clientY, true);
  }, { passive: true });
  document.addEventListener("touchmove", (e) => {
    const t = e.touches[0]; if (t) show(t.clientX, t.clientY, true);
  }, { passive: true });
  document.addEventListener("touchend", (e) => {
    const t = e.changedTouches[0]; if (t) show(t.clientX, t.clientY, false);
    setTimeout(() => fc.classList.remove("down"), 120);
  }, { passive: true });
  // pointer down/up anywhere
  document.addEventListener("pointerdown", (e) => show(e.clientX, e.clientY, true), { passive: true });
  document.addEventListener("pointerup", (e) => show(e.clientX, e.clientY, false), { passive: true });
})();
