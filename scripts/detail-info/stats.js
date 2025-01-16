/**
 * Displays the stats of the current Pokémon.
 *
 * @function showStats
 * @description Resets the container, displays the stats in both a chart and a table,
 * and updates the background color based on the current Pokémon's data.
 */

function showStats() {
    resetContainer();
    displayStatsValuesInChart(currentPokemon.stats);
    displayStatsValuesInTable(currentPokemon.stats);
    updateBgColor(currentPokemon, "data-polygon");
}

/**
 * Resets the container to its initial state.
 *
 * @function resetContainer
 * @description Clears the current content, shows the toggle button,
 * and reinitializes elements like the stats container, spider chart,
 * and checkbox status.
 */

function resetContainer() {
    clearContainer();
    showToggleButton();
    createStatsContainer();
    createSpiderChart();
    restoreCheckboxStatus();
}

/**
 * Displays the toggle button.
 *
 * @function showToggleButton
 * @description Removes the "d-none" class from the toggle button element, making it visible.
 */ function showToggleButton() {
    document.getElementById("switch").classList.remove("d-none");
}

/**
 * Creates and renders the stats container.
 *
 * @function createStatsContainer
 * @description Sets the inner HTML of the container element to the rendered stats container.
 */ function createStatsContainer() {
    let containerRef = document.getElementById("container");
    containerRef.innerHTML = renderStatsContainer();
}

/**
 * Creates and renders the spider chart.
 *
 * @function createSpiderChart
 * @description Sets the inner HTML of the spider chart container element to the rendered spider chart.
 */ function createSpiderChart() {
    let containerRef = document.getElementById("spider-chart-container");
    containerRef.innerHTML = renderSpiderCart();
}

/**
 * Displays Pokémon stats in a table format.
 *
 * @function displayStatsValuesInTable
 * @param {Array} stats - An array of stats objects, each containing a name and base value.
 * @description Iterates over the stats array, rendering each stat's name and value in a table format.
 */ function displayStatsValuesInTable(stats) {
    let statsTableRef = document.getElementById("stats-table");
    for (let stat of stats) {
        let statName = stat.stat.name.toUpperCase();
        let statValue = stat.base_stat;
        statsTableRef.innerHTML += renderTable(statName, statValue);
    }
}

/**
 * Displays Pokémon stats in a chart format.
 *
 * @function displayStatsValuesInChart
 * @param {Array} stats - An array of stats objects, each containing a name and base value.
 * @description Calculates the chart points based on the stats, updates the polygon data,
 * and updates the chart labels.
 */ function displayStatsValuesInChart(stats) {
    let maxValue = 250;
    let points = calculatePoints(stats, maxValue);
    document.getElementById("data-polygon").setAttribute("points", points);
    updateChartLabels(stats);
}

/**
 * Updates the labels on the chart with the corresponding stat values.
 *
 * @function updateChartLabels
 * @param {Array} stats - An array of stats objects, each containing a name and base value.
 * @description Loops through predefined stat labels and updates the corresponding label elements
 * with the stat values, using the `appendValueToLabel` function to display the values.
 */
function updateChartLabels(stats) {
    let labels = [
        "hp",
        "attack",
        "defense",
        "special-attack",
        "special-defense",
        "speed",
    ];
    labels.forEach((label) => {
        let stat = stats.find((s) => s.stat.name === label);
        let value = stat ? stat.base_stat : 0;
        let textElement = document.getElementById(`${label}-label`);
        appendValueToLabel(textElement, value);
    });
}

/**
 * Appends a value to a given label element in the chart.
 *
 * @function appendValueToLabel
 * @param {SVGElement} textElement - The SVG text element to append the value to.
 * @param {number} value - The value to display next to the label.
 * @description Creates a new SVG text element, sets its position based on the given label,
 * and appends the value to it. The value is displayed slightly below the label.
 */
function appendValueToLabel(textElement, value) {
    let valueElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );
    valueElement.setAttribute("x", textElement.getAttribute("x"));
    valueElement.setAttribute(
        "y",
        parseInt(textElement.getAttribute("y")) + 12
    );
    valueElement.setAttribute("font-size", "10");
    valueElement.setAttribute("fill", "black");
    valueElement.textContent = value;
    textElement.parentNode.appendChild(valueElement);
}

/**
 * Calculates the points for the chart polygon based on the Pokémon stats.
 *
 * @function calculatePoints
 * @param {Array} stats - An array of stats objects, each containing a name and base value.
 * @param {number} maxValue - The maximum value for the stats to normalize the points.
 * @returns {string} A string representing the calculated points for the chart polygon.
 * @description Iterates over the dimensions (stats) and calculates the corresponding
 * (x, y) coordinates for the chart, then returns a string of points to be used in the chart's polygon.
 */
function calculatePoints(stats, maxValue) {
    let angle = (2 * Math.PI) / 6;
    let points = [];
    let dimensions = [
        "hp",
        "attack",
        "defense",
        "special-attack",
        "special-defense",
        "speed",
    ];
    for (let i = 0; i < dimensions.length; i++) {
        let stat = stats.find((s) => s.stat.name === dimensions[i]);
        let value = stat ? stat.base_stat : 0;
        let x = (value / maxValue) * 100 * Math.cos(angle * i);
        let y = (value / maxValue) * 100 * Math.sin(angle * i);
        points.push(`${x},${y}`);
    }
    return points.join(" ");
}

/**
 * Toggles between the stats table and the spider chart view based on the checkbox status.
 *
 * @function toggleStatsView
 * @description Checks the state of the checkbox and displays either the stats table
 * or the spider chart, hiding the other. Updates the `checkboxStatus` based on the checkbox state.
 */
function toggleStatsView() {
    let statsTable = document.getElementById("stats-table");
    let spiderChart = document.getElementById("spider-chart-container");
    let checkbox = document.getElementById("flexSwitchCheckDefault");

    checkboxStatus = checkbox.checked;

    if (checkbox.checked) {
        statsTable.classList.remove("d-none");
        spiderChart.classList.add("d-none");
    } else {
        statsTable.classList.add("d-none");
        spiderChart.classList.remove("d-none");
    }
}

/**
 * Restores the checkbox status and displays the appropriate stats view.
 *
 * @function restoreCheckboxStatus
 * @description Sets the checkbox status to the previously stored value (`checkboxStatus`),
 * and displays either the stats table or the spider chart based on that status.
 */ function restoreCheckboxStatus() {
    let statsTable = document.getElementById("stats-table");
    let spiderChart = document.getElementById("spider-chart-container");
    let checkbox = document.getElementById("flexSwitchCheckDefault");

    checkbox.checked = checkboxStatus;

    if (checkboxStatus) {
        statsTable.classList.remove("d-none");
        spiderChart.classList.add("d-none");
    } else {
        statsTable.classList.add("d-none");
        spiderChart.classList.remove("d-none");
    }
}
