// Gym Tracker — App Logic
// Real animated GIFs from ExerciseGymGifsDB, loaded once, cached, matched locally (no per-click fetch = no hangs).

const GIF_INDEX_URL = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/en/exercises.json";
const GIF_BASE = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0";
const STORAGE_KEY = "gymtracker_lastday_v2";
const CHECK_KEY = "gymtracker_checks_v2";
const INDEX_CACHE_KEY = "gymtracker_gifindex_v1";
const INDEX_CACHE_TIME_KEY = "gymtracker_gifindex_time_v1";
const INDEX_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 1 week

let activeAnimTimer = null;
let gifIndex = null;
let currentDay = null;

// ---------- storage helpers ----------
function getNextDay() {
  const last = localStorage.getItem(STORAGE_KEY);
  if (!last) return PLAN[0];
  const idx = PLAN.findIndex(d => d.id === last);
  return PLAN[(idx + 1) % PLAN.length];
}
function getChecks() { return JSON.parse(localStorage.getItem(CHECK_KEY) || "{}"); }
function setChecks(obj) { localStorage.setItem(CHECK_KEY, JSON.stringify(obj)); }

// ---------- gif index (fetched once, cached a week) ----------
async function loadGifIndex() {
  if (gifIndex) return gifIndex;
  const cached = localStorage.getItem(INDEX_CACHE_KEY);
  const cachedAt = localStorage.getItem(INDEX_CACHE_TIME_KEY);
  if (cached && cachedAt && Date.now() - Number(cachedAt) < INDEX_MAX_AGE) {
    try { gifIndex = JSON.parse(cached); return gifIndex; } catch (e) { /* fall through to refetch */ }
  }
  try {
    const res = await fetch(GIF_INDEX_URL);
    const data = await res.json();
    gifIndex = Array.isArray(data) ? data : (data.exercises || []);
    localStorage.setItem(INDEX_CACHE_KEY, JSON.stringify(gifIndex));
    localStorage.setItem(INDEX_CACHE_TIME_KEY, String(Date.now()));
  } catch (e) {
    gifIndex = (cached ? JSON.parse(cached) : []); // stale cache better than nothing
  }
  return gifIndex;
}

function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(" ").filter(Boolean);
}

function findGifEntry(name, index) {
  const target = normalize(name);
  let best = null, bestScore = 0;
  for (const ex of index) {
    const label = ex.name || ex.title || "";
    if (!label) continue;
    const words = normalize(label);
    const overlap = target.filter(w => words.includes(w)).length;
    const score = overlap / Math.max(target.length, words.length);
    if (score > bestScore) { bestScore = score; best = ex; }
  }
  return bestScore >= 0.45 ? best : null;
}

function resolveGifUrl(entry) {
  if (!entry) return null;
  if (entry.gifUrl) return entry.gifUrl.startsWith("http") ? entry.gifUrl : `${GIF_BASE}/${entry.gifUrl}`;
  const muscle = entry.muscle || entry.muscleGroup || entry.category;
  const slug = entry.slug || entry.id;
  if (muscle && slug) return `${GIF_BASE}/${muscle}/${slug}.gif`;
  return null;
}

function youtubeSearchUrl(name) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise form")}`;
}

// ---------- DOM refs ----------
const startScreen = document.getElementById("start-screen");
const workoutScreen = document.getElementById("workout-screen");
const nextDayLabel = document.getElementById("next-day-label");
const dayTitle = document.getElementById("day-title");
const dayNote = document.getElementById("day-note");
const mainList = document.getElementById("main-list");
const extraList = document.getElementById("extra-list");
const finishBtn = document.getElementById("finish-btn");
const modalOverlay = document.getElementById("modal-overlay");
const modalGif = document.getElementById("modal-gif");
const modalTitle = document.getElementById("modal-title");

nextDayLabel.textContent = "Next: " + getNextDay().label;

document.getElementById("start-btn").onclick = async () => {
  currentDay = getNextDay();
  startScreen.style.display = "none";
  workoutScreen.style.display = "block";
  dayTitle.textContent = currentDay.label;
  dayNote.textContent = currentDay.note || "";
  setChecks({});
  await loadGifIndex();
  renderList(mainList, currentDay.main, "m");
  renderList(extraList, currentDay.extra, "e");
  updateFinishBtn();
};

function openAnimation(ex) {
  clearTimeout(activeAnimTimer);
  modalOverlay.style.display = "flex";
  modalTitle.textContent = ex.nameEn;
  modalGif.style.display = "block";
  modalGif.src = "";
  const entry = findGifEntry(ex.nameEn, gifIndex || []);
  const url = resolveGifUrl(entry);
  if (url) {
    modalGif.src = url;
  } else {
    modalGif.style.display = "none";
    modalTitle.innerHTML = `${ex.nameEn}<br><a href="${youtubeSearchUrl(ex.nameEn)}" target="_blank" rel="noopener">🔍 Search video on YouTube</a>`;
  }
}
function closeAnimation() {
  modalOverlay.style.display = "none";
  modalGif.src = "";
}

function renderList(container, exercises, prefix) {
  container.innerHTML = "";
  exercises.forEach((ex, i) => {
    const state = { swapped: false, current: ex };
    const card = document.createElement("div");
    card.className = "exercise-card";

    const thumb = document.createElement("img");
    thumb.className = "thumb";
    thumb.alt = ex.nameEn;
    thumb.onerror = () => { thumb.style.display = "none"; };

    function paintThumb(exercise) {
      const entry = findGifEntry(exercise.nameEn, gifIndex || []);
      const url = resolveGifUrl(entry);
      if (url) { thumb.style.display = "block"; thumb.src = url; }
      else { thumb.style.display = "none"; }
    }

    card.innerHTML = `
      <input type="checkbox" data-key="${prefix}${i}">
      <div class="thumb-wrap"></div>
      <div class="info">
        <b class="name-en"></b>
        <span class="name-fa" dir="rtl"></span>
        <span class="sets"></span>
        <button class="alt-btn" type="button">↔ Alt</button>
      </div>
    `;
    card.querySelector(".thumb-wrap").appendChild(thumb);

    const nameEnEl = card.querySelector(".name-en");
    const nameFaEl = card.querySelector(".name-fa");
    const setsEl = card.querySelector(".sets");
    const altBtn = card.querySelector(".alt-btn");
    const checkbox = card.querySelector("input");

    function render() {
      const e = state.current;
      nameEnEl.textContent = e.nameEn;
      nameFaEl.textContent = e.nameFa || "";
      setsEl.textContent = `${e.sets} × ${e.reps}`;
      altBtn.textContent = state.swapped ? "↔ Original" : `↔ Alt: ${e.alt}`;
      paintThumb(e);
    }
    render();

    checkbox.onchange = () => {
      card.classList.toggle("done", checkbox.checked);
      const checks = getChecks();
      checks[checkbox.dataset.key] = checkbox.checked;
      setChecks(checks);
      updateFinishBtn();
    };

    altBtn.onclick = (evt) => {
      evt.stopPropagation();
      if (!state.swapped) {
        state.current = { nameEn: ex.alt, nameFa: "", sets: ex.sets, reps: ex.reps, alt: ex.nameEn };
      } else {
        state.current = ex;
      }
      state.swapped = !state.swapped;
      render();
    };

    thumb.onclick = () => openAnimation(state.current);
    card.querySelector(".info").onclick = (evt) => {
      if (evt.target === altBtn) return;
      openAnimation(state.current);
    };

    container.appendChild(card);
  });
}

function updateFinishBtn() {
  const checks = getChecks();
  const mainDone = currentDay.main.every((_, i) => checks["m" + i]);
  finishBtn.disabled = !mainDone;
}
finishBtn.onclick = () => {
  localStorage.setItem(STORAGE_KEY, currentDay.id);
  location.reload();
};

modalOverlay.onclick = closeAnimation;
