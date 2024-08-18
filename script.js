let promError = false;
let startPokemon = 0;
let cyle = 0;
let filterActive = false;
let chunkedPokedex = []; //mit allen Infos
let fullPokedex = []; // alle pokemos mit infos für filter funktion

let BASE_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=${startPokemon}&limit=20`;
const FULL_POKEDEX_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=1025`;

function init() {
  clearContent();
  filterActive = false;
  if (chunkedPokedex.length === 0) {
    usePromise(BASE_URL);
  } else {
    displayAllPokemons(chunkedPokedex);
  }
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
function getPromise(URL) {
  return new Promise((resolve, reject) => {
    displayLoadScreen();
    setTimeout(() => {
      if (promError) {
        reject();
      } else {
        resolve(getPokemon(URL));
      }
    }, 2000);
  });
}

async function getPokemon(url) {
  if (cyle == 0) {
    let object = await fetchData(url);
    let speciesArray = object.results;
    cyle++;
    await getPokemonOverwiew(speciesArray);
  } else if (cyle == 1) {
    let species = await fetchData(url);
    let fullSpeciesArray = species.results;
    cyle++;
    await getPokemonOverwiew(fullSpeciesArray);
  }
}

async function getPokemonOverwiew(array) {
  if (cyle == 1) {
    await fillChunckedPokedex(array);
  } else if (cyle == 2) {
    await fillFullPokedex(array);
  }
}

async function fillChunckedPokedex(array) {
  for (const species of array) {
    let speciesURL = species.url;
    let speciesOverwiew = await fetchData(speciesURL);
    let pokemonURl = speciesOverwiew.varieties[0].pokemon.url;
    let pokemon = await fetchData(pokemonURl);
    let id = pokemon.id;
    chunkedPokedex[id] = pokemon;

    createPokemonCard(id);
    displayPokemonDetails(id, pokemon);
    showLoadMore();
    usePromise(FULL_POKEDEX_URL);
  }
}

async function fillFullPokedex(array) {
  for (const species of array) {
    let speciesURL = species.url;
    let speciesOverwiew = await fetchData(speciesURL);
    let pokemonURl = speciesOverwiew.varieties[0].pokemon.url;
    let pokemon = await fetchData(pokemonURl);
    let id = pokemon.id;
    fullPokedex[id] = pokemon;
  }
}

async function fetchData(url) {
  let response = await fetch(url);
  let responseAsJson = await response.json();

  return responseAsJson;
}

function displayAllPokemons(pokemons) {
  clearContent();

  for (let i = 1; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    let pokemonIndex = chunkedPokedex.indexOf(pokemon);

    createPokemonCard(pokemonIndex);
    displayPokemonDetails(pokemonIndex, chunkedPokedex[pokemonIndex]);
  }
}

function createPokemonCard(pokemonIndex) {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML += renderPkmCard(pokemonIndex);
}

function loadPokemons() {
  cyle = 0;
  startPokemon = chunkedPokedex.length - 1;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=${startPokemon}&limit=50`;
  usePromise(BASE_URL);
}

function displayPokemonDetails(pokemonIndex, choosenArray) {
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

function clearContent() {
  let contentRef = document.getElementById("content");
  let buttonRef = document.getElementById("load-more-btn");

  contentRef.innerHTML = "";
  buttonRef.classList.remove("d-none");
}
