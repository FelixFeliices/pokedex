let startPokemon = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${startPokemon}&limit=50`;

let singlePokemonsInfo = [];
let allPokemonsArray = [];

function init() {
  let contentRef = document.getElementById("content");
  let buttonRef = document.getElementById("load-more-btn");

  contentRef.innerHTML = "";
  buttonRef.classList.remove("d-none");

  if (singlePokemonsInfo.length === 0) {
    usePromise();
  } else {
    displayAllPokemons(singlePokemonsInfo);
  }
}

let promError = false;

function getPromise() {
  return new Promise((resolve, reject) => {
    displayLoadScreen();
    setTimeout(() => {
      if (promError) {
        reject();
      } else {
        resolve(fetchPokemons(BASE_URL));
      }
    }, 2000);
  });
}

async function usePromise() {
  try {
    await getPromise();
  } catch (error) {
    console.log("error", error);
  } finally {
    disableDisplayLoadScreen();
  }
}

async function fetchPokemons(url) {
  let response = await fetch(url);
  let pokemonAsJson = await response.json();
  allPokemonsArray = pokemonAsJson.results;

  getAllPokemons(allPokemonsArray);
}

function getAllPokemons(allPokemonsArray) {
  for (let pokemonIndex = 0; pokemonIndex < allPokemonsArray.length; pokemonIndex++) {
    const pokemon = allPokemonsArray[pokemonIndex];
    let pokemonSingelInformationURL = pokemon.url;

    createPokemonCard(startPokemon + pokemonIndex);
    fetchSinglePokemon(pokemonSingelInformationURL, startPokemon + pokemonIndex);
  }
}

function displayAllPokemons(pokemons) {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    let pokemonIndex = singlePokemonsInfo.indexOf(pokemon);
    createPokemonCard(pokemonIndex);
    displayPokemonSingleInformations(pokemonIndex, pokemon);
  }
}

function createPokemonCard(pokemonIndex) {
  let contentRef = document.getElementById("content");

  contentRef.innerHTML += renderPkmCard(pokemonIndex);
}

function loadPokemons() {
  startPokemon = singlePokemonsInfo.length;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${startPokemon}&limit=50`;
  usePromise();
}

async function fetchSinglePokemon(pokemonSingelInformationURL, pokemonIndex) {
  let responseSinglePokemon = await fetch(pokemonSingelInformationURL);
  let pokemonSingleInformation = await responseSinglePokemon.json();
  singlePokemonsInfo[pokemonIndex] = pokemonSingleInformation;
  displayPokemonSingleInformations(pokemonIndex, pokemonSingleInformation);
  showLoadMore();
}

function displayPokemonSingleInformations(pokemonIndex, pokemonSingleInformation) {
  displayNameAndId(pokemonIndex, pokemonSingleInformation);
  displayImg(pokemonIndex, pokemonSingleInformation);
  displayType(pokemonIndex, pokemonSingleInformation);
  updateBgColor(pokemonIndex, pokemonSingleInformation);
}

function displayNameAndId(pokemonIndex, pokemonSingleInformation) {
  let id_nameRef = document.getElementById(`id_name${pokemonIndex}`);
  let id = pokemonSingleInformation.id;
  let name = pokemonSingleInformation.name;

  id_nameRef.innerHTML = `#${id} ${name.toUpperCase()}`;
}

function displayImg(pokemonIndex, pokemonSingleInformation) {
  let pokemonImgRef = document.getElementById(`pokemon-img${pokemonIndex}`);
  pokemonImgRef.src = pokemonSingleInformation.sprites.other.dream_world.front_default;
}

function displayType(pokemonIndex, pokemonSingleInformation) {
  for (let typeIndex = 0; typeIndex < pokemonSingleInformation.types.length; typeIndex++) {
    const pokemonTypes = pokemonSingleInformation.types[typeIndex].type.name;

    if (typeIndex === 0) {
      renderFirstTypeImg(pokemonIndex, pokemonTypes);
    } else if (typeIndex === 1) {
      renderSecondTypeImg(pokemonIndex, pokemonTypes);
    }
  }

  if (checkSecondTypeAvailable(pokemonSingleInformation)) {
    hideEmptyType(pokemonIndex);
  }
}

function checkType(pokemonTypes) {
  return pokemonTypes === `${pokemonTypes}`;
}

function checkSecondTypeAvailable(pokemonSingleInformation) {
  return pokemonSingleInformation.types.length <= 1;
}

function renderFirstTypeImg(pokemonIndex, pokemonTypes) {
  let pokemonFirstImgTypeRef = document.getElementById(`pokemon-first-type-img${pokemonIndex}`);

  pokemonFirstImgTypeRef.src = "";
  pokemonFirstImgTypeRef.src = `./img/icon/icon-types/${pokemonTypes}.svg`;
}

function renderSecondTypeImg(pokemonIndex, pokemonTypes) {
  let pokemonSecondImgTypeRef = document.getElementById(`pokemon-second-type-img${pokemonIndex}`);

  pokemonSecondImgTypeRef.src = "";
  pokemonSecondImgTypeRef.src = `./img/icon/icon-types/${pokemonTypes}.svg`;
}

function hideEmptyType(pokemonIndex) {
  let pokemonSecondImgTypeRef = document.getElementById(`pokemon-second-type-img${pokemonIndex}`);
  pokemonSecondImgTypeRef.classList.add("d-none");
}

function updateBgColor(pokemonIndex, pokemonSingleInformation) {
  let cardRef = document.getElementById(`pokemon-card-${pokemonIndex}`);
  let typeForBg = pokemonSingleInformation.types[0].type.name;
  cardRef.classList.add(`${typeForBg}`);
}
