const farm = document.getElementById("farm");
const coinsEl = document.getElementById("coins");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");

let coins = 0;
let selectedPlant = null;

const plants = {
  wheat: { time: 10000, icon: "🌾", reward: 1 },
  corn: { time: 30000, icon: "🌽", reward: 3 }
};

const plots = [];

/* INIT */
for (let i = 0; i < 16; i++) {
  const plot = document.createElement("div");
  plot.className = "plot";
  plot.textContent = "🟫";

  plot.onclick = () => onPlotClick(i);

  plots.push({
    el: plot,
    plant: null,
    readyAt: null
  });

  farm.appendChild(plot);
}

/* GAME */
function plant(type) {
  selectedPlant = type;
}

function onPlotClick(index) {
  const plot = plots[index];

  if (!plot.plant && selectedPlant) {
    plot.plant = selectedPlant;
    plot.readyAt = Date.now() + plants[selectedPlant].time;
    plot.el.textContent = plants[selectedPlant].icon;
    plot.el.classList.add("growing");
    selectedPlant = null;
  } 
  else if (plot.plant && Date.now() >= plot.readyAt) {
    harvest(plot);
  }
}

function harvest(plot) {
  coins += plants[plot.plant].reward;
  coinsEl.textContent = coins;

  plot.plant = null;
  plot.readyAt = null;
  plot.el.textContent = "🟫";
  plot.el.className = "plot";
}

/* TIMER */
setInterval(() => {
  plots.forEach(plot => {
    if (plot.plant && Date.now() >= plot.readyAt) {
      plot.el.classList.remove("growing");
      plot.el.classList.add("ready");
    }
  });
}, 1000);

/* OVERLAY */
function showOverlay(text) {
  overlayTitle.textContent = text;
  overlay.classList.remove("hidden");
}

function closeOverlay() {
  overlay.classList.add("hidden");
}
