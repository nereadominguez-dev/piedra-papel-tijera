
const $ = (sel) => document.querySelector(sel);

const scoreYouEl = $("#scoreYou");
const scoreCpuEl = $("#scoreCpu");
const roundEl = $("#round");

const subtitleEl = $("#subtitle");
const whoYouEl = $("#whoYou");

const startScreen = $("#startScreen");
const gamePanel = $("#gamePanel");
const choicesPanel = $("#choices");
const endScreen = $("#endScreen");

const nameInput = $("#nameInput");
const startBtn = $("#startBtn");

const pickYouEl = $("#pickYou");
const pickCpuEl = $("#pickCpu");
const msgEl = $("#message");

const resetRoundBtn = $("#resetRound");
const resetAllBtn = $("#resetAll");
const exitBtn = $("#exitBtn");

const endMsg = $("#endMsg");
const playAgainBtn = $("#playAgainBtn");

const moves = ["piedra", "papel", "tijera"];

let nombre = "";
let scoreYou = 0;
let scoreCpu = 0;
let round = 1;
let locked = false;

const labels = {
  piedra: "Piedra",
  papel: "Papel",
  tijera: "Tijera",
};

function maquinaElige() {
  return moves[Math.floor(Math.random() * moves.length)];
}

// Igual que tu Java
function resultado(jugador, maquina) {
  if (jugador === maquina) return "empate";
  if (
    (jugador === "piedra" && maquina === "tijera") ||
    (jugador === "papel" && maquina === "piedra") ||
    (jugador === "tijera" && maquina === "papel")
  ) return "gana";
  return "pierde";
}

function emoji(move) {
  if (move === "piedra") return "🪨";
  if (move === "papel") return "📄";
  return "✂️";
}

function renderPick(el, move) {
  el.innerHTML = `
    <div class="miniMove">
      <span class="badge">${labels[move]}</span>
      <span>${emoji(move)}</span>
    </div>
  `;
}

function clearStates() {
  pickYouEl.classList.remove("win", "lose", "draw");
  pickCpuEl.classList.remove("win", "lose", "draw");
}

function setStates(res) {
  clearStates();
  if (res === "gana") {
    pickYouEl.classList.add("win");
    pickCpuEl.classList.add("lose");
  } else if (res === "pierde") {
    pickYouEl.classList.add("lose");
    pickCpuEl.classList.add("win");
  } else {
    pickYouEl.classList.add("draw");
    pickCpuEl.classList.add("draw");
  }
}

function updateScore() {
  scoreYouEl.textContent = String(scoreYou);
  scoreCpuEl.textContent = String(scoreCpu);
  roundEl.textContent = String(round);
}

function setView(view) {
  // view: "start" | "game" | "end"
  startScreen.hidden = view !== "start";
  gamePanel.hidden = view !== "game";
  choicesPanel.hidden = view !== "game";
  endScreen.hidden = view !== "end";
}

function startGame() {
  const value = nameInput.value.trim();
  if (!value) {
    nameInput.focus();
    subtitleEl.textContent = "Introduce tu nombre y apellidos para empezar.";
    return;
  }

  nombre = value;

  // Mensajes fieles a tu Java
  subtitleEl.textContent = `¡Bienvenid@ al juego de Piedra, Papel o Tijera, ${nombre}!`;
  msgEl.textContent = "Elige piedra, papel o tijera:";
  whoYouEl.textContent = nombre;

  // reset estado
  scoreYou = 0;
  scoreCpu = 0;
  round = 1;
  locked = false;
  updateScore();

  pickYouEl.innerHTML = `<span class="ghost">Elige abajo</span>`;
  pickCpuEl.innerHTML = `<span class="ghost">—</span>`;
  clearStates();

  setView("game");
}

function jugar(jugador) {
  if (locked) return;
  locked = true;

  const maquina = maquinaElige();
  const res = resultado(jugador, maquina);

  // como tu Java: mostramos lo que eligió la máquina
  renderPick(pickYouEl, jugador);
  renderPick(pickCpuEl, maquina);
  setStates(res);


msgEl.classList.remove("win","lose","draw");

if (res === "empate") {
  msgEl.classList.add("draw");
  msgEl.textContent = "¡Es un empate!";
} else if (res === "gana") {
  scoreYou++;
  msgEl.classList.add("win");
  msgEl.textContent = "Ganaste";
} else {
  scoreCpu++;
  msgEl.classList.add("lose");
  msgEl.textContent = "¡Perdiste!";
}

  updateScore();
}

function siguienteRonda() {
  locked = false;
  round++;

  clearStates();
  pickYouEl.innerHTML = `<span class="ghost">Elige abajo</span>`;
  pickCpuEl.innerHTML = `<span class="ghost">—</span>`;

  msgEl.textContent = "Elige piedra, papel o tijera:";
  updateScore();
}

function reiniciarMarcador() {
  locked = false;
  scoreYou = 0;
  scoreCpu = 0;
  round = 1;

  clearStates();
  pickYouEl.innerHTML = `<span class="ghost">Elige abajo</span>`;
  pickCpuEl.innerHTML = `<span class="ghost">—</span>`;

  msgEl.textContent = "Elige piedra, papel o tijera:";
  updateScore();
}

function salir() {
  endMsg.textContent = "¡Gracias por jugar!";
  setView("end");
}

function volverAJugar() {
  nameInput.value = nombre || "";
  setView("start");
  subtitleEl.textContent = "Introduce tu nombre para empezar.";
}

// Eventos
startBtn.addEventListener("click", startGame);
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") startGame();
});

document.querySelectorAll(".choice").forEach((btn) => {
  btn.addEventListener("click", () => jugar(btn.dataset.move));
});

resetRoundBtn.addEventListener("click", siguienteRonda);
resetAllBtn.addEventListener("click", reiniciarMarcador);
exitBtn.addEventListener("click", salir);
playAgainBtn.addEventListener("click", volverAJugar);

// Vista inicial
setView("start");
updateScore();
// Año automático en el footer
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
