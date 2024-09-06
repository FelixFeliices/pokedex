function showMoves(id) {
    clearContainer();
    createMoveContainer();
    getMove(id);
}

function createMoveContainer() {
    const containerRef = document.getElementById("container");
    containerRef.innerHTML = moveContainerTemplate();
}

async function getMove(id) {
    let moves = fullPokedex[id].moves;

    for (const move of moves) {
        let moveName = move.move.name.toUpperCase();
        let container = document.getElementById("moves-container");
        container.innerHTML += moveTemplate(moveName);
    }
}