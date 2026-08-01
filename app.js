const API_BASE = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/en";
const STORAGE_KEY = "gymtracker_lastday";
const CHECK_KEY = "gymtracker_checks";
const gifCache = {};

function getNextDay() {
  const last = localStorage.getItem(STORAGE_KEY);
  if (!last) return PLAN[0];
  const idx = PLAN.findIndex(d => d.id === last);
  return PLAN[(idx + 1) % PLAN.length];
}
function getChecks() { return JSON.parse(localStorage.getItem(CHECK_KEY) || "{}"); }
function setChecks(obj) { localStorage.setItem(CHECK_KEY, JSON.stringify(obj)); }

const startScreen = document.getElementById("start-screen");
const workoutScreen = document.getElementById("workout-screen");
const nextDayLabel = document.getElementById("next-day-label");
const dayTitle = document.getElementById("day-title");
const mainList = document.getElementById("main-list");
const extraList = document.getElementById("extra-list");
const finishBtn = document.getElementById("finish-btn");
const modalOverlay = document.getElementById("modal-overlay");
const modalGif = document.getElementById("modal-gif");

let currentDay = null;
nextDayLabel.textContent = "Next day: " + getNextDay().label;

document.getElementById("start-btn").onclick = () => {
  currentDay = getNextDay();
  startScreen.style.display = "none";
  workoutScreen.style.display = "block";
  dayTitle.textContent = currentDay.label;
  setChecks({});
  renderList(mainList, currentDay.main, "m");
  renderList(extraList, currentDay.extra, "e");
  updateFinishBtn();
};

async function preloadGif(ex, imgEl) {
  const cacheKey = ex.muscle + ":" + ex.name;
  if (gifCache[cacheKey]) { imgEl.src = gifCache[cacheKey]; return; }
  try {
    const res = await fetch(`${API_BASE}/muscles/${ex.muscle}.json`);
    const data = await res.json();
    const match = data.exercises.find(e =>
      e.name.toLowerCase().includes(ex.name.toLowerCase()) ||
      ex.name.toLowerCase().includes(e.name.toLowerCase())
    );
    if (match) {
      gifCache[cacheKey] = match.gifUrl;
      imgEl.src = match.gifUrl;
    }
  } catch (e) { /* thumb just stays blank, no crash */ }
}

function renderList(container, exercises, prefix) {
  container.innerHTML = "";
  exercises.forEach((ex, i) => {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.innerHTML = `
      <input type="checkbox" data-key="${prefix}${i}">
      <img class="thumb" alt="${ex.name}">
      <div class="info">
        <b>${ex.name}</b>
        <span class="sets">${ex.sets} sets</span>
      </div>
    `;
    const checkbox = card.querySelector("input");
    const thumb = card.querySelector(".thumb");
    preloadGif(ex, thumb);

    checkbox.onchange = () => {
      card.classList.toggle("done", checkbox.checked);
      const checks = getChecks();
      checks[checkbox.dataset.key] = checkbox.checked;
      setChecks(checks);
      updateFinishBtn();
    };

    thumb.onclick = () => {
      if (!thumb.src) return;
      modalGif.src = thumb.src;
      modalOverlay.style.display = "flex";
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

modalOverlay.onclick = () => { modalOverlay.style.display = "none"; };
