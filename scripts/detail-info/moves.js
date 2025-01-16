/**
 * Displays the moves of a Pokémon based on its ID.
 *
 * @function showMoves
 * @param {number} id - The ID of the Pokémon whose moves should be displayed.
 * @description Clears the container, creates a new move container,
 * and fetches the moves of the Pokémon using its ID.
 */ function showMoves(id) {
    clearContainer();
    createMoveContainer();
    getMove(id);
}

/**
 * Creates and renders the move container.
 *
 * @function createMoveContainer
 * @description Sets the inner HTML of the container element to the rendered move container template.
 */
function createMoveContainer() {
    const containerRef = document.getElementById("container");
    containerRef.innerHTML = moveContainerTemplate();
}

/**
 * Displays the moves of a Pokémon based on its ID.
 *
 * @function getMove
 * @param {number} id - The ID of the Pokémon whose moves should be displayed.
 * @description Iterates through the Pokémon's moves and appends each move name
 * to the moves container using a predefined move template.
 */
function getMove(id) {
    fullPokedex[id].moves.forEach((move) => {
        let moveName = move.move.name.toUpperCase();
        let container = document.getElementById("moves-container");
        container.innerHTML += moveTemplate(moveName);
    });
}
