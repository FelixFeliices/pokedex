let text = [
    "Like a Pokéball – Sometimes it takes several attempts to achieve the goal.",
    "Even a Magikarp can become a powerful Gyarados – Never give up.",
    "The path to Pokémon mastery begins with the first step.",
    "Sometimes you need to be like an Eevee – ready to evolve in any direction.",
    "Even intense training has an end – hang in there.",
    "Friendship is the true secret of a strong team.",
    "Patience is like the Exp. Share – it pays off, even if you don't see it immediately.",
    "Every battle is an opportunity to grow, just like a Pokémon after each level up.",
    "Believe in yourself, just like Ash believes in Pikachu.",
    "Like a Pokémon journey – the journey is just as important as the destination.",
];

/**
 * Displays the loading screen with a progress indicator.
 *
 * @function displayLoadScreen
 * @description Toggles the fix container, shows the loading spinner,
 * calculates and displays the loading progress, and displays the load text.
 */
function displayLoadScreen() {
    toggleFixContainer();
    displayLoadSpinner();
    calcProgress(loadedPokemons, limit);
    showProgress();
    displayLoadText();
}

/**
 * Updates and displays the progress of the loading process.
 *
 * @function showProgress
 * @description Adjusts the visibility and clipping of the spinner
 * based on the progress percentage, and updates the progress bar width
 * and displayed text with the current progress.
 */

function showProgress() {
    let spinner = document.getElementById("load-spinner");
    let progressBar = document.getElementById("progress-bar");
    let clipValue = `circle(${progress}% at 50% 50%)`;

    spinner.style.opacity = progress / 100;
    spinner.style.clipPath = clipValue;

    progressBar.style.width = progress + "%";
    progressBar.innerHTML = progress + "%";
}

/**
 * Calculates the loading progress as a percentage.
 *
 * @function calcProgress
 * @param {number} status - The current progress status.
 * @param {number} limit - The total limit or maximum value.
 * @returns {number} The calculated progress percentage.
 */

function calcProgress(status, limit) {
    progress = Math.round((status / limit) * 100);
    return progress;
}

/**
 * Toggles the "overflow-hidden" class on the body element.
 *
 * @function toggleFixContainer
 * @description Adds or removes the "overflow-hidden" class to the body element,
 * preventing or allowing scrolling.
 */
function toggleFixContainer() {
    document.getElementById("body").classList.toggle("overflow-hidden");
}

/**
 * Displays the loading spinner on the screen.
 *
 * @function displayLoadSpinner
 * @description Removes the "d-none" class from the load screen,
 * and injects the loading spinner HTML into the load screen element.
 */
function displayLoadSpinner() {
    let loadScreenRef = document.getElementById("load-screen");
    loadScreenRef.classList.remove("d-none");
    loadScreenRef.innerHTML = loadSpinner();
}

/**
 * Displays random loading text.
 *
 * @function displayLoadText
 * @description Sets the inner HTML of the load text element to a random text
 * from the predefined `text` array, selected using a random index.
 */
function displayLoadText() {
    let loadTextRef = document.getElementById("text");
    loadTextRef.innerHTML = `${text[randomNumber()]}`;
}

/**
 * Generates a random number between 0 and 9.
 *
 * @function randomNumber
 * @returns {number} A random integer between 0 and 9.
 */
function randomNumber() {
    return Math.floor(Math.random() * 10);
}

/**
 * Disables the display of the loading screen.
 *
 * @function disableDisplayLoadScreen
 * @description Adds the "d-none" class to the load screen element to hide it,
 * and toggles the "overflow-hidden" class on the body element.
 */ function disableDisplayLoadScreen() {
    document.getElementById("load-screen").classList.add("d-none");
    toggleFixContainer();
}
