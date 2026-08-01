const API_BASE = "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/en";
const STORAGE_KEY = "gymtracker_lastday";
const CHECK_KEY = "gymtracker_checks";

function getNextDay() {
  const last = localStorage.getItem(STORAGE_KEY);
  if (!last) return PLAN[0];
  const idx = PLAN.findIndex(d => d.id === last);
  return PLAN[(idx + 1) % PLAN.length];
}

function getChecks() {
  return JSON.parse(localStorage.getItem(CHECK_KEY) || "{}");
}
function setChecks(obj) {
  localStorage.setItem(CHECK_KEY, JSON.stringify(obj));
}

const startScreen = document.getElementById("start-screen");
const workoutScreen = document.getElementById("workout-screen");
const nextDayLabel = document.getElementById("next-day-label");
const dayTitle = document.getElementById("day-title");
const mainList = document.getElementById("main-list");
const extraList = document.getElementById("extra-list");
const finishBtn = document.getElementById("finish-btn");

let currentDay = null;

nextDayLabel.textContent = "روز بعدی: " + getNextDay().label;

document.getElementById("start-btn").onclick = () => {
  currentDay = getNextDay();
  startScreen.style.display = "none";
  workoutScreen.style.display = "block";
  dayTitle.textContent = currentDay.label;
  renderList(mainList, currentDay.main, true);
  renderList(extraList, currentDay.extra, false);
  setChecks({});
  updateFinishBtn();
};

function renderList(container, exercises, isMain) {
  container.innerHTML = "";
  exercises.forEach((ex, i) => {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.innerHTML = `
      <input type="checkbox" data-key="${isMain ? 'm' : 'e'}${i}">
      <div class="info" data-name="${ex.name}" data-muscle="${ex.muscle}" data-sets="${ex.sets}">
        <b>${ex.name}</b>
        <span class="sets">${ex.sets} sets</span>
      </div>
    `;
    const checkbox = card.querySelector("input");
    checkbox.onchange = () => {
      card.classList.toggle("done", checkbox.checked);
      const checks = getChecks();
      checks[checkbox.dataset.key] = checkbox.checked;
      setChecks(checks);
      updateFinishBtn();
    };
    card.querySelector(".info").onclick = () => openModal(ex);
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

const modal = document.getElementById("modal");
const modalName = document.getElementById("modal-name");
const modalGif = document.getElementById("modal-gif");
const modalSets = document.getElementById("modal-sets");
const modalInstructions = document.getElementById("modal-instructions");

async function openModal(ex) {
  modal.style.display = "flex";
  modalName.textContent = ex.name;
  modalSets.textContent = ex.sets + " sets";
  modalGif.src = "";
  modalInstructions.innerHTML = "در حال بارگذاری...";
  try {
    const res = await fetch(`${API_BASE}/muscles/${ex.muscle}.json`);
    const data = await res.json();
    const match = data.exercises.find(e =>
      e.name.toLowerCase().includes(ex.name.toLowerCase()) ||
      ex.name.toLowerCase().includes(e.name.toLowerCase())
    );
    if (match) {
      modalGif.src = match.gifUrl;
      modalInstructions.innerHTML = match.instructions.map(s => `<li>${s}</li>`).join("");
    } else {
      modalInstructions.innerHTML = "<li>تمرین در دیتابیس پیدا نشد، جستجو در API انجام دهید.</li>";
    }
  } catch (e) {
    modalInstructions.innerHTML = "<li>خطا در بارگذاری اطلاعات.</li>";
  }
}

document.getElementById("modal-close").onclick = () => modal.style.display = "none";
