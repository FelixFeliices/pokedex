// Global variables

let promError = false;

let startPokemon = 0;
let limit = 20;
let loadedPokemons = 0;
let fullPokedexLimit = 1025;
let totalLoadedPokemons = 0;
let progress = 0;
let pokedexFillCycle = 0;
let isFilterActive = false;
let isLoadMoreActive = false;
let speciesArray = [];
let chunkedPokedex = [];
let fullPokedex = [];

let BASE_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=${startPokemon}&limit=${limit}`;
const FULL_POKEDEX_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=${fullPokedexLimit}`;

/**
 * This function initializes the Pokédex by clearing content, disabling the load button,
 * resetting filter and load states, and either fetching data from the API
 * or displaying the already fetched chunked Pokédex.
 */
async function init() {
    clearContent();
    disableLoadBtn();

    isFilterActive = false;
    isLoadMoreActive = false;

    if (chunkedPokedex.length === 0) {
        displayLoadScreen();
        await usePromise(BASE_URL);
    } else {
        displayAllPokemons(chunkedPokedex);
    }
}

/**
 * This function fetches data from the given URL using a promise.
 *
 * @param {string} URL - The URL from which to fetch Pokémon data.
 * @returns {Promise<void>} Resolves when data is fetched and processed.
 */
async function usePromise(URL) {
    try {
        await getPromise(URL);
    } catch (error) {
        console.log("error", error);
    }
}
/**
 * Diese Funktion erstellt ein Promise, das Pokémon-Daten abruft und basierend auf `promError` auflöst oder ablehnt.
 *
 * @param {string} URL - Die URL, von der Pokémon-Daten abgerufen werden.
 * @returns {Promise} Ein Promise, das mit Pokémon-Daten aufgelöst oder abgelehnt wird, falls ein Fehler auftritt.
 */
function getPromise(URL) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (promError) {
                reject();
            } else {
                resolve(getPokemon(URL));
            }
        }, 1000);
    });
}

/**
 * Diese Funktion ruft Pokémon-Spezies-Daten von der angegebenen URL ab und verarbeitet die Ergebnisse.
 *
 * @param {string} url - Die URL, von der Pokémon-Spezies-Daten abgerufen werden.
 * @returns {Promise<void>} Wird aufgelöst, nachdem Pokémon-Daten verarbeitet wurden.
 */
async function getPokemon(url) {
    let object = await fetchData(url);
    speciesArray = object.results;
    pokedexFillCycle++;
    getPokemonOverwiew(speciesArray);
}

/**
 * This function processes an array of Pokémon species and decides whether to fill the chunked
 * or the full Pokédex depending on the current cycle.
 *
 * @param {Array} array - The array of Pokémon species data.
 */
function getPokemonOverwiew(array) {
    if (pokedexFillCycle === 1) {
        fillChunckedPokedex(array);
    } else if (pokedexFillCycle === 2) {
        fillFullPokedex(array);
    }
}

/**
 * This function fills the chunked Pokédex Array with a limited set of Pokémon data and displays them.
 *
 * @param {Array} array - An array of Pokémon species data to be processed.
 */
async function fillChunckedPokedex(array) {
    loadedPokemons = 0;
    for (const species of array) {
        let speciesURL = species.url;
        let speciesOverwiew = await fetchData(speciesURL);
        let pokemonURl = speciesOverwiew.varieties[0].pokemon.url;
        let pokemon = await fetchData(pokemonURl);
        let id = pokemon.id;
        chunkedPokedex[id] = pokemon;
        loadedPokemons++;
        createPokemonCard(id);
        displayPokemonDetails(id, pokemon);
        calcProgress(loadedPokemons, limit);
        showProgress();
    }

    showLoadMore();
    enableLoadBtn();
    await usePromise(FULL_POKEDEX_URL);
    disableDisplayLoadScreen();
}

/**
 * This function fills the full Pokédex Array with Pokémon data.
 *
 * @param {Array} array - An array of Pokémon species data to be processed.
 */
async function fillFullPokedex(array) {
    for (const species of array) {
        let speciesURL = species.url;
        let speciesOverwiew = await fetchData(speciesURL);
        let pokemonURl = speciesOverwiew.varieties[0].pokemon.url;
        let pokemon = await fetchData(pokemonURl);
        let id = pokemon.id;
        fullPokedex[id] = pokemon;
        totalLoadedPokemons = fullPokedex.length;
        document.getElementById("full-progress-bar").style.width =
            calcProgress(totalLoadedPokemons, fullPokedexLimit) + "%";

        if (calcProgress(totalLoadedPokemons, fullPokedexLimit) == 100) {
            document
                .getElementById("progress-bar-container")
                .classList.add("d-none");
        }
    }
}

/**
 * This function fetches data from a given URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} The data fetched from the given URL.
 */
async function fetchData(url) {
    let response = await fetch(url);
    return await response.json();
}

/**
 * This function displays all Pokémon from the given array by creating cards and displaying details.
 *
 * @param {Array} pokemons - An array of Pokémon to be displayed.
 */
function displayAllPokemons(pokemons) {
    clearContent();

    for (let i = 1; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let pokemonIndex = chunkedPokedex.indexOf(pokemon);

        createPokemonCard(pokemonIndex);
        displayPokemonDetails(pokemonIndex, chunkedPokedex[pokemonIndex]);
    }
}

/**
 * This function creates a Pokémon card and appends it to the content area.
 *
 * @param {number} pokemonIndex - The index of the Pokémon to create a card for.
 */
function createPokemonCard(pokemonIndex) {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML += renderPkmCard(pokemonIndex);
}

/**
 * This function loads more Pokémon data when the "load more" button is clicked.
 */
function loadPokemons() {
    loadedPokemons = 0;
    progress = 0;
    pokedexFillCycle = 0;
    startPokemon = chunkedPokedex.length - 1;
    limit = 40;
    isLoadMoreActive = true;
    console.log(calcProgress(limit));
    let LOAD_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=${startPokemon}&limit=${limit}`;
    disableLoadBtn();
    displayLoadScreen();
    usePromise(LOAD_URL);
}

/**
 * This function displays details of the given Pokémon, such as name, image, and type and update the backgroundcolor dependent on the color of the type.
 *
 * @param {number} pokemonIndex - The index of the Pokémon in the array.
 * @param {Object} pokemon - The Pokémon object containing its details.
 */
function displayPokemonDetails(pokemonIndex, pokemon) {
    updateBgColor(pokemon, `pokemon-card-${pokemon.id}`);
    displayNameAndId(pokemon);
    displayImg(pokemon);
    displayType(pokemonIndex, pokemon);
}

/**
 * This function displays the name and ID of the Pokémon.
 *
 * @param {number} pokemonIndex - The index of the Pokémon in the array.
 * @param {Object} pokemon - The Pokémon object containing its name and ID.
 */
function displayNameAndId(pokemon) {
    let id_nameRef = document.getElementById(`id_name${pokemon.id}`);
    id_nameRef.innerHTML = `#${pokemon.id} ${pokemon.name.toUpperCase()}`;
}

/**
 * This function displays the image of the Pokémon.
 *
 * @param {number} pokemonIndex - The index of the Pokémon in the array.
 * @param {Object} pokemon - The Pokémon object containing its sprite data.
 */
function displayImg(pokemon) {
    let pokemonImgRef = document.getElementById(`pokemon-img${pokemon.id}`);
    let img =
        pokemon.sprites.other.dream_world.front_default ||
        pokemon.sprites.other.home.front_default ||
        pokemon.sprites.other.showdown.front_default;

    pokemonImgRef.src = img;
}

/**
 * This function displays the type(s) of the Pokémon.
 *
 * @param {number} pokemonIndex - The index of the Pokémon in the array.
 * @param {Object} pokemon - The Pokémon object containing its type data.
 */
function displayType(pokemonIndex, pokemon) {
    pokemon.types.forEach((type, index) => {
        if (index === 0) {
            renderFirstTypeImg(pokemonIndex, type.type.name);
        } else if (index === 1) {
            renderSecondTypeImg(pokemonIndex, type.type.name);
        }
    });

    if (checkSecondTypeAvailable(pokemon)) {
        hideEmptyType(pokemonIndex);
    }
}

/**
 * This function checks if the second type is available for the Pokémon.
 *
 * @param {Object} pokemon - The Pokémon object containing its types.
 * @returns {boolean} Returns true if only one type exists, otherwise false.
 */
function checkSecondTypeAvailable(pokemon) {
    return pokemon.types.length <= 1;
}

/**
 * This function renders the first type image of the Pokémon.
 *
 * @param {number} pokemonIndex - The index of the Pokémon in the array.
 * @param {string} pokemonTypes - The name of the Pokémon's first type.
 */
function renderFirstTypeImg(pokemonIndex, pokemonTypes) {
    let pokemonFirstImgTypeRef = document.getElementById(
        `pokemon-first-type-img${pokemonIndex}`
    );
    pokemonFirstImgTypeRef.src = `./img/icon/icon-types/${pokemonTypes}.svg`;
}

/**
 * This function renders the second type image of the Pokémon.
 *
 * @param {number} pokemonIndex - The index of the Pokémon in the array.
 * @param {string} pokemonTypes - The name of the Pokémon's second type.
 */
function renderSecondTypeImg(pokemonIndex, pokemonTypes) {
    let pokemonSecondImgTypeRef = document.getElementById(
        `pokemon-second-type-img${pokemonIndex}`
    );
    pokemonSecondImgTypeRef.src = `./img/icon/icon-types/${pokemonTypes}.svg`;
}

/**
 * This function hides the second type image if the Pokémon has only one type.
 *
 * @param {number} pokemonIndex - The index of the Pokémon in the array.
 */
function hideEmptyType(pokemonIndex) {
    document
        .getElementById(`pokemon-second-type-img${pokemonIndex}`)
        .classList.add("d-none");
}

/**
 * This function updates the background color of the Pokémon card based on its primary type.
 *
 * @param {number} pokemonIndex - The index of the Pokémon in the array.
 * @param {Object} pokemon - The Pokémon object containing its type data.
 */
function updateBgColor(pokemon, ref) {
    let cardRef = document.getElementById(ref);
    let typeForBg = pokemon.types[0].type.name;
    cardRef.classList.add(`${typeForBg}`);
}

/**
 * This function clears the content area and ensures that the "load more" button is visible.
 */
function clearContent() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("load-more-btn").classList.remove("d-none");
}

/**
 * This function disables the "Load More" button to prevent multiple clicks.
 */
function disableLoadBtn() {
    let buttonRef = document.getElementById("load-more-btn");
    buttonRef.disabled = true;
}

/**
 * This function enables the "Load More" button after a delay.
 */
function enableLoadBtn() {
    let buttonRef = document.getElementById("load-more-btn");
    buttonRef.disabled = false;
}
