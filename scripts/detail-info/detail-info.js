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
  if (!filterActive) {
    getSelectetPokemonWithoutFilter(pokemonIndex);
  } else if (filterActive) {
    getSelectetPokemonWithFilter(pokemonIndex);
  }
}
function getSelectetPokemonWithoutFilter(pokemonIndex) {
  let overlayerRef = document.getElementById("overlayer");
  let selectedPokemon = chunkedPokedex[pokemonIndex];
  let id = selectedPokemon.id;
  overlayerRef.innerHTML = detailInfoTemplate(pokemonIndex, id);
  getPkmInfos(selectedPokemon);
}

function getSelectetPokemonWithFilter(pokemonIndex) {
  let overlayerRef = document.getElementById("overlayer");
  let selectedPokemon = fullPokedex[pokemonIndex];
  let id = selectedPokemon.id;

  overlayerRef.innerHTML = detailInfoTemplate(pokemonIndex, id);
  getPkmInfos(selectedPokemon);
}

function getPkmInfos(selectedPokemon) {
  let name = selectedPokemon.name.toUpperCase();
  let id = selectedPokemon.id;
  let type = selectedPokemon.types;
  let typeForChart = type[0].type.name;
  let img;
  try {
    img = selectedPokemon.sprites.other.dream_world.front_default;
    if (!img) {
      throw new Error("404");
    }
  } catch (error) {
    try {
      img = selectedPokemon.sprites.other.home.front_default;
      if (!img) {
        throw new Error("404");
      }
    } catch (error) {
      img = selectedPokemon.sprites.other.showdown.front_default;
    }
  }

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
  pokemonIndex++;
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
