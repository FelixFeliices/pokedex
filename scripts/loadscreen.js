let text = [
    "Wie ein Pokéball – Manchmal braucht es mehrere Versuche, um das Ziel zu erreichen.",
    "Selbst ein Magikarp kann zu einem mächtigen Garados werden – Gib niemals auf.",
    "Der Weg zur Pokémon-Meisterschaft beginnt mit dem ersten Schritt.",
    "Manchmal muss man wie ein Evoli sein – bereit, sich in jede Richtung zu entwickeln.",
    "Auch ein hartes Training hat einmal ein Ende – halte durch.",
    "Freundschaft ist das wahre Geheimnis eines starken Teams.",
    "Geduld ist wie der EP-Teiler – es zahlt sich aus, auch wenn du es nicht sofort siehst.",
    "Jeder Kampf ist eine Chance zu wachsen, wie ein Pokémon nach jedem Levelaufstieg.",
    "Glaube an dich selbst, wie Ash an Pikachu glaubt.",
    "Wie bei einer Pokémon-Reise – der Weg ist ebenso wichtig wie das Ziel.",
];

function displayLoadScreen() {
    displayLoadSpinner();
    displayLoadText();
}

function displayLoadSpinner() {
    let loadScreenRef = document.getElementById("load-screen");
    loadScreenRef.classList.remove("d-none");
    loadScreenRef.innerHTML = loadSpinner();
}

function displayLoadText() {
    let loadTextRef = document.getElementById("text");
    loadTextRef.innerHTML = `${text[randomNumber()]}`;
}

function randomNumber() {
    return Math.floor(Math.random() * 10);
}

function disableDisplayLoadScreen() {
    let loadScreenRef = document.getElementById("load-screen");
    loadScreenRef.classList.add("d-none");
}