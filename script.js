const grid = document.getElementById("grid");
const trapsText = document.getElementById("traps");
const playBtn = document.getElementById("play");
const scoreText = document.getElementById("score");

let trapsCount = 9;
let traps = [];
let openedStars = 0;
let gameOver = false;

/* ---------------- GAME INIT ---------------- */

function initGame() {
  grid.innerHTML = "";
  traps = [];
  openedStars = 0;
  gameOver = false;

  scoreText.textContent = "0";

  // generate bombs
  while (traps.length < trapsCount) {
    const r = Math.floor(Math.random() * 25);
    if (!traps.includes(r)) traps.push(r);
  }

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.onclick = () => {
      if (gameOver) return;
      if (cell.classList.contains("open")) return;

      openCell(cell, i);
    };

    grid.appendChild(cell);
  }

  trapsText.textContent = trapsCount + " traps";
}

/* ---------------- CELL LOGIC ---------------- */

function openCell(cell, index) {
  cell.classList.add("open");
  const span = document.createElement("span");

  if (traps.includes(index)) {
    // 💣 BOMB
    span.textContent = "💣";
    cell.classList.add("trap");
    cell.appendChild(span);

    gameOver = true;
    disableGrid();
    showAllBombs();

    setTimeout(() => alert("💥 BOOM! You lose"), 100);
  } else {
    // ⭐ STAR
    span.textContent = "⭐";
    cell.classList.add("star");
    cell.appendChild(span);

    openedStars++;
    scoreText.textContent = openedStars;

    if (openedStars === 25 - trapsCount) {
      gameOver = true;
      disableGrid();
      setTimeout(() => alert("🎉 YOU WIN!"), 100);
    }
  }
}

/* ---------------- HELPERS ---------------- */

function disableGrid() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.onclick = null;
  });
}

function showAllBombs() {
  document.querySelectorAll(".cell").forEach((cell, index) => {
    if (traps.includes(index) && !cell.classList.contains("open")) {
      cell.classList.add("open", "trap");
      cell.innerHTML = "<span>💣</span>";
    }
  });
}

/* ---------------- CONTROLS ---------------- */

document.getElementById("plus").onclick = () => {
  if (trapsCount < 24) trapsCount++;
  trapsText.textContent = trapsCount + " traps";
};

document.getElementById("minus").onclick = () => {
  if (trapsCount > 1) trapsCount--;
  trapsText.textContent = trapsCount + " traps";
};

playBtn.onclick = initGame;

/* ---------------- START ---------------- */

initGame();
