function showMoves(id) {
  clearContainer();
  createMoveContainer();
  getMove(id);
}

function createMoveContainer() {
  const containerRef = document.getElementById("container");
  containerRef.innerHTML = ` <div class="d-flex justify-content-around flex-wrap overflow-auto gap-1 mt-2" id="moves-container"></div>`;
}

async function getMove(id) {
  let moves = fullPokedex[id].moves;

  for (const move of moves) {
    let moveName = move.move.name.toUpperCase();
    let container = document.getElementById("moves-container");
    container.innerHTML += `<div class="move w-25 text-center border border-success p-2 mb-2 border-opacity-25 rounded-pill">${moveName}</div>`;
  }
}
