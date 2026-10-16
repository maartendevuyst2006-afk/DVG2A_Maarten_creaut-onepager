// Creative Automation – v2: "de automatiseringsmachine"
// Motion volgens design-motion-principles: enkel transform/opacity/filter,
// alles heeft een reduced-motion-pad, en content is zichtbaar zonder script.
// Het script voegt geen zichtbare tekst toe: alle tekst staat in de HTML (uit content.md).

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Achtergrond-hover: hoogtelijnen + gloed die de muis volgt ----------
   Geïnspireerd op looveuroopa.ee, maar met een eigen patroon: de lijnen worden
   hier in code berekend (ruisveld + marching squares), als vormen van klei. */
const bgEffect = document.querySelector(".bg-effect");
const bgCanvas = document.querySelector(".bg-lines");
const glow = document.querySelector(".bg-glow");

// Kleine, voorspelbare ruisfunctie (zelfde patroon bij elk bezoek)
function makeNoise(seed) {
  const rand = (x, y) => {
    const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const smooth = (t) => t * t * (3 - 2 * t);
  const value = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = smooth(x - xi), yf = smooth(y - yi);
    const a = rand(xi, yi), b = rand(xi + 1, yi), c = rand(xi, yi + 1), d = rand(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
  return (x, y) => value(x, y) * 0.6 + value(x * 2.1, y * 2.1) * 0.28 + value(x * 4.3, y * 4.3) * 0.12;
}
const noise = makeNoise(7);

function drawContours() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth, h = window.innerHeight;
  bgCanvas.width = Math.round(w * dpr);
  bgCanvas.height = Math.round(h * dpr);
  const ctx = bgCanvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const cell = 10; // px per rastercel
  const cols = Math.ceil(w / cell) + 1, rows = Math.ceil(h / cell) + 1;
  const scale = 1 / 260; // grootte van de "heuvels"
  const field = new Float32Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) field[y * cols + x] = noise(x * cell * scale, y * cell * scale);
  }

  ctx.strokeStyle = "rgba(18, 17, 15, 0.6)"; // net donkerder dan de achtergrond
  ctx.lineWidth = 1.3;
  ctx.lineCap = "round";
  ctx.beginPath();
  const levels = 18;
  for (let l = 1; l < levels; l++) {
    const t = l / levels;
    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const a = field[y * cols + x], b = field[y * cols + x + 1];
        const c = field[(y + 1) * cols + x + 1], d = field[(y + 1) * cols + x];
        const idx = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (d > t ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        const px = x * cell, py = y * cell;
        const lerp = (v1, v2) => (t - v1) / (v2 - v1);
        const top = [px + cell * lerp(a, b), py];
        const right = [px + cell, py + cell * lerp(b, c)];
        const bottom = [px + cell * lerp(d, c), py + cell];
        const left = [px, py + cell * lerp(a, d)];
        const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
        switch (idx) {
          case 1: case 14: seg(left, bottom); break;
          case 2: case 13: seg(bottom, right); break;
          case 3: case 12: seg(left, right); break;
          case 4: case 11: seg(top, right); break;
          case 6: case 9: seg(top, bottom); break;
          case 7: case 8: seg(left, top); break;
          case 5: seg(left, top); seg(bottom, right); break;
          case 10: seg(top, right); seg(left, bottom); break;
        }
      }
    }
  }
  ctx.stroke();
}

drawContours();
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(drawContours, 150);
});

// Gloed: volgt de muis met vertraging (lerp), zoals op de referentiesite
const canFollow = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion;
// Startpositie: rechts in de hero, bij het klei-beeld
const glowPos = { x: window.innerWidth * 0.72, y: Math.min(window.innerHeight * 0.45, 520) };
const glowTarget = { ...glowPos };

function placeGlow() {
  glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0)`;
}
placeGlow();
bgEffect.classList.add("is-ready");

if (canFollow) {
  let rafId = null;
  const follow = () => {
    glowPos.x += (glowTarget.x - glowPos.x) * 0.08;
    glowPos.y += (glowTarget.y - glowPos.y) * 0.08;
    placeGlow();
    const moving = Math.abs(glowTarget.x - glowPos.x) + Math.abs(glowTarget.y - glowPos.y) > 0.5;
    rafId = moving ? requestAnimationFrame(follow) : null; // stopt als de gloed stilstaat
  };
  window.addEventListener(
    "pointermove",
    (event) => {
      glowTarget.x = event.clientX;
      glowTarget.y = event.clientY;
      if (!rafId) rafId = requestAnimationFrame(follow);
    },
    { passive: true }
  );
}

/* ---------- Mobiel menu ---------- */
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("site-nav");

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
}

toggle.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
  }
});

/* ---------- Scrollvoortgang + actieve sectie ---------- */
const progress = document.querySelector(".progress");
let ticking = false;

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? window.scrollY / max : 0;
  progress.style.setProperty("--progress", value.toFixed(4));
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  },
  { passive: true }
);
updateProgress();

const navLinks = [...document.querySelectorAll(".site-nav ul a")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const current = link.getAttribute("href") === `#${entry.target.id}`;
        if (current) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

/* ---------- Gestaffelde entrances per sectie ---------- */
document.querySelectorAll("main section").forEach((section) => {
  section.querySelectorAll("[data-reveal]").forEach((el, i) => {
    el.style.setProperty("--i", i);
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
);
document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

/* Run een functie één keer zodra een element in beeld komt */
function onceVisible(el, fn, threshold = 0.35) {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        io.disconnect();
        fn();
      }
    },
    { threshold }
  );
  io.observe(el);
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------- Beeldbewerking: de batch-machine (signature move) ---------- */
const grid = document.querySelector(".batch-grid");
const actionItems = [...document.querySelectorAll(".actions li")];
const tones = ["#5A4A40", "#4A4F4A", "#5E4444", "#4A4A55", "#55513A", "#5A4652"];
const PHOTOS = 12;

for (let i = 0; i < PHOTOS; i++) {
  const photo = document.createElement("div");
  photo.className = "photo";
  photo.style.setProperty("--tone", tones[i % tones.length]);
  photo.innerHTML = '<div class="canvas"></div><div class="product"></div><span class="logo">logo</span>';
  grid.appendChild(photo);
}
const photos = [...grid.children];

function setAction(index) {
  actionItems.forEach((li, i) => li.classList.toggle("is-active", i === index));
}

async function runBatch() {
  if (reduceMotion) {
    photos.forEach((p) => p.classList.add("is-done"));
    return;
  }
  // Eén actie, toegepast op de hele map: elke foto doorloopt de vier stappen
  for (const photo of photos) {
    for (let step = 0; step < actionItems.length; step++) {
      setAction(step);
      await wait(70);
    }
    photo.classList.add("is-done");
  }
  setAction(-1);
}

if (reduceMotion) runBatch();
else onceVisible(document.querySelector(".batch-machine"), runBatch, 0.45);

/* ---------- Social media: de live bulk-create-demo ---------- */
const form = document.querySelector(".demo-input");
const inputs = {
  title: document.getElementById("f-title"),
  tagline: document.getElementById("f-tagline"),
  cta: document.getElementById("f-cta"),
};
const output = document.querySelector(".demo-output");

// Typen = hoge frequentie: de voorbeelden passen meteen aan, zonder animatie
form.addEventListener("input", (event) => {
  const key = event.target.name;
  if (!inputs[key]) return;
  output.querySelectorAll(`[data-bind="${key}"]`).forEach((el) => {
    el.textContent = inputs[key].value;
  });
});

/* ---------- Vibe coding: de tekst zelf wordt als prompt getypt ---------- */
const terminalText = document.getElementById("terminal-text");
const terminal = terminalText.closest(".terminal");

async function typeTerminal() {
  const full = terminalText.textContent;
  // Hoogte vasthouden zodat de pagina niet verspringt tijdens het typen
  terminalText.style.minHeight = `${terminalText.offsetHeight}px`;
  // Schermlezers krijgen meteen de volledige tekst; de getypte weergave is visueel
  const sr = document.createElement("span");
  sr.className = "sr-only";
  sr.textContent = full;
  const typed = document.createElement("span");
  typed.setAttribute("aria-hidden", "true");
  const caret = document.createElement("span");
  caret.className = "caret";
  caret.setAttribute("aria-hidden", "true");
  terminalText.textContent = "";
  terminalText.append(sr, typed, caret);

  for (const char of full) {
    typed.textContent += char;
    await wait(char === "." ? 220 : 14);
  }
}

if (!reduceMotion) {
  onceVisible(terminal, typeTerminal, 0.3);
}

/* ---------- E-mailmarketing: de flow licht stap voor stap op ---------- */
const flowSteps = [...document.querySelectorAll(".flow li")];

if (reduceMotion) {
  // Geen beweging gevraagd: toon meteen de eindstand
  flowSteps.forEach((step) => step.classList.add("is-on"));
} else {
  onceVisible(
    document.querySelector(".flow"),
    async () => {
      for (const step of flowSteps) {
        step.classList.add("is-on");
        await wait(420);
      }
    },
    0.4
  );
}
