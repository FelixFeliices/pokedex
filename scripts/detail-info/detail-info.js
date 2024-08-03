let checkboxStatus = false;
let audioURL = "";

function openDetailInfo(event) {
  let headertRef = document.getElementById("header");
  let contentRef = document.getElementById("content");
  let footerRef = document.getElementById("footer");
  let overlayerRef = document.getElementById("overlayer");

  headertRef.classList.add("d-none");
  footerRef.classList.add("d-none");
  contentRef.classList.add("bg-info-card");
  overlayerRef.classList.remove("d-none");
  event.stopPropagation();
}

function closeDetailInfo(event) {
  let headertRef = document.getElementById("header");
  let contentRef = document.getElementById("content");
  let footerRef = document.getElementById("footer");
  let overlayerRef = document.getElementById("overlayer");

  if (!event.target.closest("#detail-info")) {
    headertRef.classList.remove("d-none");
    footerRef.classList.remove("d-none");
    contentRef.classList.remove("bg-info-card");
    overlayerRef.classList.add("d-none");
  }
}

function displayChoosenPokemon(pokemonIndex) {
  let overlayerRef = document.getElementById("overlayer");
  let selectedPokemon = singlePokemonsInfo[pokemonIndex];
  let id = selectedPokemon.id;

  overlayerRef.innerHTML = detailInfoTemplate(pokemonIndex, id);
  getPkmInfos(selectedPokemon);
}

function getPkmInfos(selectedPokemon) {
  let name = selectedPokemon.name.toUpperCase();
  let id = selectedPokemon.id;
  let type = selectedPokemon.types;
  let typeForChart = type[0].type.name;
  let img = selectedPokemon.sprites.other.dream_world.front_default;
  let weight = selectedPokemon.weight;
  let height = selectedPokemon.height;

  getStat(selectedPokemon);
  updateColorSpiderChart(typeForChart);
  renderInfosInOvererlay(name, id, img, weight, height);
}

function renderInfosInOvererlay(name, id, img, weight, height) {
  document.getElementById("pokemon-name-id").innerHTML = "#" + id + " " + name;
  document.getElementById("pokemon-img").src = img;
  document.getElementById("weight").innerHTML = "Gewicht:" + weight + " Kg";
  document.getElementById("height").innerHTML = "Größe: " + height + " Meter";
}

function nextPkm(pokemonIndex) {
  if (pokemonIndex >= singlePokemonsInfo.length) {
    pokemonIndex = singlePokemonsInfo.length;
  } else {
    pokemonIndex++;
  }
  displayChoosenPokemon(pokemonIndex);
  restoreCheckboxStatus();
}

function prevPkm(pokemonIndex) {
  if (pokemonIndex <= 0) {
    pokemonIndex = 0;
  } else {
    pokemonIndex--;
  }
  displayChoosenPokemon(pokemonIndex);
  restoreCheckboxStatus();
}
