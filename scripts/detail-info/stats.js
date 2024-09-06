let checkboxStatus = false;

async function showStats(id) {
    let pokemon = await fullPokedex[id];
    let stats = pokemon.stats
    resetContainer()
    displayStatsValuesInChart(stats)
    displayStatsValuesInTable(stats)
    updateColorSpiderChart(pokemon);

}

function resetContainer() {
    clearContainer()
    showToggleButton()
    createStatsContainer()
    createSpiderChart()
    restoreCheckboxStatus();

}

function showToggleButton() {
    document.getElementById("switch").classList.remove("d-none")

}

function createStatsContainer() {
    containerRef = document.getElementById("container")
    containerRef.innerHTML = renderStatsContainer()
}

function createSpiderChart() {
    let containerRef = document.getElementById("spider-chart-container")
    containerRef.innerHTML = renderSpiderCart()
}

function displayStatsValuesInTable(stats) {
    let statsTableRef = document.getElementById("stats-table");
    for (const stat of stats) {
        let statName = stat.stat.name.toUpperCase();
        let statValue = stat.base_stat;
        statsTableRef.innerHTML += renderTable(statName, statValue);
    }


}

function displayStatsValuesInChart(stats) {
    const maxValue = 250;
    const points = calculatePoints(stats, maxValue);
    const polygon = document.getElementById("data-polygon");
    polygon.setAttribute("points", points);

    // Werte unterhalb der Beschriftungen anzeigen
    const labels = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
    labels.forEach((label) => {
        const stat = stats.find((s) => s.stat.name === label);
        const value = stat ? stat.base_stat : 0;
        const textElement = document.getElementById(`${label}-label`);

        // Wert unter dem Text anzeigen (y-Position leicht nach unten verschieben)
        const originalY = parseInt(textElement.getAttribute("y"), 10);
        const newY = originalY + 12; // Verschieben um 12 Pixel nach unten
        const valueElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        valueElement.setAttribute("x", textElement.getAttribute("x"));
        valueElement.setAttribute("y", newY);
        valueElement.setAttribute("font-size", "10");
        valueElement.setAttribute("fill", "black");
        valueElement.textContent = value;
        textElement.parentNode.appendChild(valueElement);
    });
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


function updateColorSpiderChart(pokemon) {
    let typeForChart = pokemon.types[0].type.name;
    let dataPolygonRef = document.getElementById("data-polygon");
    dataPolygonRef.classList.add(typeForChart);
}

function toggleStatsView() {
    const statsTable = document.getElementById("stats-table");
    const spiderChart = document.getElementById("spider-chart-container");
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
    const statsTable = document.getElementById("stats-table");
    const spiderChart = document.getElementById("spider-chart-container");
    const checkbox = document.getElementById("flexSwitchCheckDefault");

    checkbox.checked = checkboxStatus;

    if (checkboxStatus) {
        statsTable.classList.remove("d-none");
        spiderChart.classList.add("d-none");
    } else {
        statsTable.classList.add("d-none");
        spiderChart.classList.remove("d-none");
    }
}