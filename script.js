let promError = false;
let startPokemon = 0;
let cyle = 0;
let filterActive = false;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${startPokemon}&limit=20`;
const FULL_POKEDEX_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`;
let singlePokemonsInfo = []; //mit allen Infos
let fullPokedex = []; // alle pokemos mit infos für filter funktion

function init() {
  clearContent();
  filterActive = false;
  if (singlePokemonsInfo.length === 0) {
    usePromise(BASE_URL);
    usePromise(FULL_POKEDEX_URL);
  } else {
    displayAllPokemons(singlePokemonsInfo);
  }
}

function clearContent() {
  let contentRef = document.getElementById("content");
  let buttonRef = document.getElementById("load-more-btn");

  contentRef.innerHTML = "";
  buttonRef.classList.remove("d-none");
}

function getPromise(URL) {
  return new Promise((resolve, reject) => {
    displayLoadScreen();
    setTimeout(() => {
      if (promError) {
        reject();
      } else {
        resolve(fetchPokemons(URL));
      }
    }, 2000);
  });
}

async function usePromise(URL) {
  try {
    await getPromise(URL);
  } catch (error) {
    console.log("error", error);
  } finally {
    disableDisplayLoadScreen();
  }
}

async function fetchPokemons(url) {
  let response = await fetch(url);
  let pokemonAsJson = await response.json();

  if (cyle == 0) {
    let allPokemonsArray = pokemonAsJson.results;
    cyle++;
    getAllPokemons(allPokemonsArray);
  } else if (cyle == 1) {
    let fullPokedexArray = pokemonAsJson.results;
    cyle++;
    getAllPokemons(fullPokedexArray);
  }
}

function getAllPokemons(array) {
  for (let pokemonIndex = 0; pokemonIndex < array.length; pokemonIndex++) {
    const pokemon = array[pokemonIndex];
    if (cyle == 1) {
      let pokemonSingelInformationURL = pokemon.url;
      createPokemonCard(startPokemon + pokemonIndex);
      fetchSinglePokemon(pokemonSingelInformationURL, startPokemon + pokemonIndex);
    } else if (cyle == 2) {
      allPokemonInformationURl = pokemon.url;

      // createPokemonCard(startPokemon + pokemonIndex);
      fetchSinglePokemon(allPokemonInformationURl, startPokemon + pokemonIndex);
    }
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
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${startPokemon}&limit=150`;
  usePromise(BASE_URL);
}

async function fetchSinglePokemon(urlToFetch, pokemonIndex) {
  if (cyle == 1) {
    let responseSinglePokemon = await fetch(urlToFetch);
    let pokemonSingleInformation = await responseSinglePokemon.json();

    singlePokemonsInfo[pokemonIndex] = pokemonSingleInformation;

    displayPokemonSingleInformations(pokemonIndex, pokemonSingleInformation);
    showLoadMore();
  } else if (cyle === 2) {
    let responseSinglePokemon = await fetch(urlToFetch);
    let fullPokedexInfos = await responseSinglePokemon.json();

    fullPokedex[pokemonIndex] = fullPokedexInfos;
  }
}

function displayPokemonSingleInformations(pokemonIndex, choosenArray) {
  displayNameAndId(pokemonIndex, choosenArray);
  displayImg(pokemonIndex, choosenArray);
  displayType(pokemonIndex, choosenArray);
  updateBgColor(pokemonIndex, choosenArray);
}

function displayNameAndId(pokemonIndex, choosenArray) {
  let id_nameRef = document.getElementById(`id_name${pokemonIndex}`);
  let id = choosenArray.id;
  let name = choosenArray.name;

  id_nameRef.innerHTML = `#${id} ${name.toUpperCase()}`;
}

function displayImg(pokemonIndex, choosenArray) {
  let pokemonImgRef = document.getElementById(`pokemon-img${pokemonIndex}`);
  let img;
  try {
    img = choosenArray.sprites.other.dream_world.front_default;
    if (!img) {
      throw new Error("404");
    }
    pokemonImgRef.src = img;
  } catch (error) {
    try {
      img = choosenArray.sprites.other.home.front_default;
      if (!img) {
        throw new Error("404");
      }
      pokemonImgRef.src = img;
    } catch (error) {
      pokemonImgRef.src = choosenArray.sprites.other.showdown.front_default;
    }
  }
}

function displayType(pokemonIndex, choosenArray) {
  for (let typeIndex = 0; typeIndex < choosenArray.types.length; typeIndex++) {
    const pokemonTypes = choosenArray.types[typeIndex].type.name;

    if (typeIndex === 0) {
      renderFirstTypeImg(pokemonIndex, pokemonTypes);
    } else if (typeIndex === 1) {
      renderSecondTypeImg(pokemonIndex, pokemonTypes);
    }
  }

  if (checkSecondTypeAvailable(choosenArray)) {
    hideEmptyType(pokemonIndex);
  }
}

function checkType(pokemonTypes) {
  return pokemonTypes === `${pokemonTypes}`;
}

function checkSecondTypeAvailable(choosenArray) {
  return choosenArray.types.length <= 1;
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

function updateBgColor(pokemonIndex, choosenArray) {
  let cardRef = document.getElementById(`pokemon-card-${pokemonIndex}`);
  let typeForBg = choosenArray.types[0].type.name;
  cardRef.classList.add(`${typeForBg}`);
}
