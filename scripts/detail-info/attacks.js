function showAttacks(id) {
  clearContainer();
  createAttacksContainer();
  getAttacks(id);
}

function createAttacksContainer() {
  const containerRef = document.getElementById("container");
  containerRef.innerHTML = ` <div class="d-flex justify-content-center flex-wrap overflow-auto" id="attacks-container"></div>`;
}

async function getAttacks(id) {
  let moves = fullPokedex[id].moves;

  for (const move of moves) {
    let moveName = move.move.name;
    let container = document.getElementById("attacks-container");
    container.innerHTML += `<div class="w-25">${moveName}</div>`;
  }
}
