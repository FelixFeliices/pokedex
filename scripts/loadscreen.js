// Array of motivational texts in English
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

// Function to display the loading screen with spinner and text
function displayLoadScreen() {
    toggleFixContainer();
    displayLoadSpinner();
    calcProgress(loadedPokemons, limit);
    showProgress();
    displayLoadText();
}

function showProgress() {
    let spinner = document.getElementById("load-spinner");
    let progressBar = document.getElementById("progress-bar");
    let clipValue = `circle(${progress}% at 50% 50%)`;

    spinner.style.opacity = progress / 100;
    spinner.style.clipPath = clipValue;

    progressBar.style.width = progress + "%";
    progressBar.innerHTML = progress + "%";
}

function calcProgress(status, limit) {
    progress = Math.round((status / limit) * 100);
    return progress;
}

function toggleFixContainer() {
    document.getElementById("body").classList.toggle("overflow-hidden");
}

// Function to display the loading spinner
function displayLoadSpinner() {
    let loadScreenRef = document.getElementById("load-screen");
    loadScreenRef.classList.remove("d-none");
    loadScreenRef.innerHTML = loadSpinner();
}

// Function to display a random motivational text
function displayLoadText() {
    let loadTextRef = document.getElementById("text");
    loadTextRef.innerHTML = `${text[randomNumber()]}`;
}

// Function to generate a random number between 0 and 9
function randomNumber() {
    return Math.floor(Math.random() * 10);
}

// Function to hide the loading screen
function disableDisplayLoadScreen() {
    document.getElementById("load-screen").classList.add("d-none");
    toggleFixContainer();
}
