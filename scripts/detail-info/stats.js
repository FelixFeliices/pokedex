function getStat(selectedPokemon) {
  let stats = selectedPokemon.stats;

  for (const stat of stats) {
    displayStatsTable(stat);
    displayStatsDiagram(stats);
  }
}

function displayStatsTable(stat) {
  let statsTableRef = document.getElementById("stats-table");
  let statName = stat.stat.name.toUpperCase();
  let statValue = stat.base_stat;

  statsTableRef.innerHTML += renderTable(statName, statValue);
}

function displayStatsDiagram(stats) {
  const maxValue = 140;
  const points = calculatePoints(stats, maxValue);
  const polygon = document.getElementById("data-polygon");
  polygon.setAttribute("points", points);
}

function calculatePoints(stats, maxValue) {
  const angle = (2 * Math.PI) / 6; // 360° / 6 = 60° pro Abschnitt
  const points = [];
  const dimensions = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
  for (let i = 0; i < dimensions.length; i++) {
    const stat = stats.find((s) => s.stat.name === dimensions[i]);
    const value = stat ? stat.base_stat : 0;
    const x = (value / maxValue) * 100 * Math.cos(angle * i);
    const y = (value / maxValue) * 100 * Math.sin(angle * i);
    points.push(`${x},${y}`);
  }
  return points.join(" ");
}

function updateColorSpiderChart(typeForChart) {
  let dataPolygonRef = document.getElementById("data-polygon");

  dataPolygonRef.classList.add(typeForChart);
}

function toggleStatsView() {
  const statsTable = document.getElementById("stats-table");
  const spiderChart = document.getElementById("spider-chart");
  const checkbox = document.getElementById("flexSwitchCheckDefault");

  checkboxStatus = checkbox.checked;

  if (checkbox.checked) {
    statsTable.classList.remove("d-none");
    spiderChart.classList.add("d-none");
  } else {
    statsTable.classList.add("d-none");
    spiderChart.classList.remove("d-none");
  }
}

function restoreCheckboxStatus() {
  const checkbox = document.getElementById("flexSwitchCheckDefault");
  const statsTable = document.getElementById("stats-table");
  const spiderChart = document.getElementById("spider-chart");

  checkbox.checked = checkboxStatus;

  if (checkboxStatus) {
    statsTable.classList.remove("d-none");
    spiderChart.classList.add("d-none");
  } else {
    statsTable.classList.add("d-none");
    spiderChart.classList.remove("d-none");
  }
}
