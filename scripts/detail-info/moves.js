// Main function to display all moves of a Pokémon based on its ID
function showMoves(id) {
    clearContainer();
    createMoveContainer();
    getMove(id);
}

// Creates the container for moves display
function createMoveContainer() {
    const containerRef = document.getElementById("container");
    containerRef.innerHTML = moveContainerTemplate();
}

// Fetches and displays all moves for the Pokémon by its ID
async function getMove(id) {
    fullPokedex[id].moves.forEach((move) => {
        let moveName = move.move.name.toUpperCase();
        let container = document.getElementById("moves-container");
        container.innerHTML += moveTemplate(moveName);
    });
}
