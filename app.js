const IMG_BASE = "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises";
const STORAGE_KEY = "gymtracker_lastday";
const CHECK_KEY = "gymtracker_checks";

let activeAnimInterval = null;

function getNextDay() {
  const last = localStorage.getItem(STORAGE_KEY);
  if (!last) return PLAN[0];
  const idx = PLAN.findIndex(d => d.id === last);
  return PLAN[(idx + 1) % PLAN.length];
}
function getChecks() { return JSON.parse(localStorage.getItem(CHECK_KEY) || "{}"); }
function setChecks(obj) { localStorage.setItem(CHECK_KEY, JSON.stringify(obj)); }
function imgUrl(ex, frame) { return `${IMG_BASE}/${ex.exId}/${frame}.jpg`; }

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

function openAnimation(ex) {
  clearInterval(activeAnimInterval);
  activeAnimInterval = null;
  modalOverlay.style.display = "flex";
  let frame = 0;
  modalGif.src = imgUrl(ex, 0);
  activeAnimInterval = setInterval(() => {
    frame = frame === 0 ? 1 : 0;
    modalGif.src = imgUrl(ex, frame);
  }, 700);
}

function closeAnimation() {
  modalOverlay.style.display = "none";
  clearInterval(activeAnimInterval);
  activeAnimInterval = null;
}

function renderList(container, exercises, prefix) {
  container.innerHTML = "";
  exercises.forEach((ex, i) => {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.innerHTML = `
      <input type="checkbox" data-key="${prefix}${i}">
      <img class="thumb" src="${imgUrl(ex, 0)}" alt="${ex.name}" onerror="this.style.opacity=0.2">
      <div class="info">
        <b>${ex.name}</b>
        <span class="sets">${ex.sets} sets</span>
      </div>
    `;
    const checkbox = card.querySelector("input");
    const thumb = card.querySelector(".thumb");

    checkbox.onchange = () => {
      card.classList.toggle("done", checkbox.checked);
      const checks = getChecks();
      checks[checkbox.dataset.key] = checkbox.checked;
      setChecks(checks);
      updateFinishBtn();
    };

    thumb.onclick = () => openAnimation(ex);

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
