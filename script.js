let promError = false;
let isFilterActive = false;
let isLoadMoreActive = false;
let checkboxStatus = false;

let startPokemon = 0;
let limit = 20;
let loadedPokemons = 0;
let fullPokedexLimit = 1025;
let totalLoadedPokemons = 0;
let progress = 0;
let pokedexFillCycle = 0;
let currentPokemon = 0;

let speciesArray = [];
let chunkedPokedex = [];
let fullPokedex = [];
let possibleFirstEvoltions = [];
let possibleSecondEvoltions = [];

let BASE_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=${startPokemon}&limit=${limit}`;
const FULL_POKEDEX_URL = `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=${fullPokedexLimit}`;

/**
 * Initializes the Pokémon data display process by clearing content and setting up necessary states.
 *
 * @function init
 * @returns {Promise<void>} A promise that resolves when the Pokémon data is either loaded or already available.
 * @description This function clears the existing content, disables the load button, and sets the initial states. It then checks if the `chunkedPokedex` is empty. If so, it triggers the loading of Pokémon data; otherwise, it directly displays the existing Pokémon.
 */
function init() {
    clearContent();
    disableLoadBtn();

    isFilterActive = false;
    isLoadMoreActive = false;

    if (chunkedPokedex.length === 0) {
        displayLoadScreen();
        usePromise(BASE_URL);
    } else displayAllPokemons(chunkedPokedex);
}

/**
 * Returns a promise that resolves with the result of `getPokemon` or rejects if an error occurs.
 *
 * @param {string} URL The URL to fetch Pokémon data from.
 * @returns {Promise<void>} A promise that resolves with the result of `getPokemon` or rejects on failure.
 * @throws {Error} If `getPokemon` fails, the promise will reject with an error.
 * @description This function wraps the `getPokemon` call inside a promise. If the `getPokemon` operation succeeds, the promise resolves; if it fails, the promise is rejected with the corresponding error.
 */
async function usePromise(URL) {
    return new Promise((resolve, reject) => {
        try {
            resolve(getPokemon(URL));
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Fetches Pokémon data and determines how to populate the Pokedex.
 *
 * @async
 * @function getPokemon
 * @param {string} url - The API URL to fetch Pokémon data from.
 * @description Fetches Pokémon data from the provided URL and increments the `pokedexFillCycle`. Passes the fetched Pokémon results to `getPokemonOverwiew` for further processing.
 */
async function getPokemon(url) {
    let response = await fetchData(url);
    pokedexFillCycle++;
    getPokemonOverwiew(response.results);
}

/**
 * Determines which Pokedex filling function to execute based on the current cycle.
 *
 * @function getPokemonOverwiew
 * @param {Array} array - An array containing Pokémon species data.
 * @description Executes either `fillChunckedPokedex` or `fillFullPokedex` depending on the value of `pokedexFillCycle`. If the cycle is 1, it fills the chunked Pokedex. If the cycle is 2, it fills the full Pokedex.
 */
function getPokemonOverwiew(array) {
    if (pokedexFillCycle === 1) {
        fillChunckedPokedex(array);
    } else if (pokedexFillCycle === 2) {
        fillFullPokedex(array);
    }
}

/**
 * Asynchronously fills the `chunkedPokedex` array with Pokémon data and updates the UI.
 *
 * @async
 * @function fillChunckedPokedex
 * @param {Array} array - An array containing Pokémon species data to fetch.
 * @description Iterates through the given Pokémon species array, fetching and storing detailed Pokémon data in `chunkedPokedex`. Updates the UI by creating Pokémon cards, displaying details, and updating the progress bar. Enables the "Load More" button and disables the loading screen when completed.
 */
async function fillChunckedPokedex(array) {
    loadedPokemons = 0;
    for (const species of array) {
        let speciesOverwiew = await fetchData(species.url);
        let pokemon = await fetchData(speciesOverwiew.varieties[0].pokemon.url);
        chunkedPokedex[pokemon.id] = pokemon;
        loadedPokemons++;
        createPokemonCard(pokemon);
        displayPokemonDetails(pokemon);
        calcProgress(loadedPokemons, limit);
        showProgress();
    }
    showLoadMore();
    enableLoadBtn();
    disableDisplayLoadScreen();
    await usePromise(FULL_POKEDEX_URL);
}

/**
 * Hides the progress bar when the progress reaches 100%.
 *
 * @function hideProgressbar
 * @description Checks the progress percentage using `calcProgress` and hides the progress bar container if the progress equals 100%.
 */
async function fillFullPokedex(array) {
    for (const species of array) {
        let speciesOverwiew = await fetchData(species.url);
        let pokemonURl = speciesOverwiew.varieties[0].pokemon.url;
        let pokemon = await fetchData(pokemonURl);
        fullPokedex[pokemon.id] = pokemon;

        updateProgressbar();
        hideProgressbar();
    }
}
function updateProgressbar() {
    totalLoadedPokemons = fullPokedex.length;
    document.getElementById("full-progress-bar").style.width =
        calcProgress(totalLoadedPokemons, fullPokedexLimit) + "%";
}

function hideProgressbar() {
    if (calcProgress(totalLoadedPokemons, fullPokedexLimit) == 100) {
        document
            .getElementById("progress-bar-container")
            .classList.add("d-none");
    }
}

/**
 * Fetches JSON data from the provided URL.
 *
 * @async
 * @function fetchData
 * @param {string} url - The URL from which to fetch data.
 * @returns {Promise<Object>} The JSON response from the fetched URL.
 */
async function fetchData(url) {
    let response = await fetch(url);
    return response.json();
}

/**
 * Displays all Pokémon by rendering their cards and details.
 *
 * @function displayAllPokemons
 * @param {Array} pokemons - The list of Pokémon to display.
 * @description Clears the content container, iterates through the given Pokémon array,
 * creates a card for each Pokémon, and displays its details.
 */
function displayAllPokemons(pokemons) {
    clearContent();
    pokemons.forEach((pokemon) => {
        let pokemonIndex = chunkedPokedex.indexOf(pokemon);
        createPokemonCard(pokemonIndex);
        displayPokemonDetails(pokemonIndex, chunkedPokedex[pokemonIndex]);
    });
}

/**
 * Creates and appends a Pokémon card to the content container.
 *
 * @function createPokemonCard
 * @param {number} pokemonIndex - The index of the Pokémon to render.
 * @description This function fetches the content container by its ID and appends a
 * Pokémon card by calling the `renderPkmCard` function with the given Pokémon index.
 */
function createPokemonCard(pokemon) {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML += renderPkmCard(pokemon.id);
}

/**
 * Initializes the loading process for Pokémon data.
 *
 * @function loadPokemons
 * @description This function resets the necessary variables and starts the process of loading
 * additional Pokémon data. It calculates the progress, sets a loading limit, disables the load button,
 * and displays the loading screen. The function fetches Pokémon species data from the API and processes it.
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
 * Displays detailed information about a Pokémon.
 *
 * @function displayPokemonDetails
 * @param {Object} pokemon - The Pokémon object containing all necessary details.
 * @description This function updates the Pokémon card's background color based on its primary type,
 * displays its name and ID, renders its image, and shows its type(s). It also handles cases where
 * a Pokémon has only one type by hiding the secondary type image.
 */
function displayPokemonDetails(pokemon) {
    updateBgColor(pokemon, `pokemon-card-${pokemon.id}`);
    displayNameAndId(pokemon);
    displayImg(pokemon);
    displayType(pokemon.id, pokemon);
}

/**
 * Displays the image of a Pokémon.
 *
 * @function displayImg
 * @param {Object} pokemon - The Pokémon object containing its sprite information.
 * @description This function selects the appropriate sprite image from the Pokémon's `sprites` object.
 * It sets the `src` attribute of an image element corresponding to the Pokémon's ID (`pokemon-img${pokemon.id}`)
 * with the URL of the first available sprite (either `dream_world`, `home`, or `showdown`).
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
 * Displays the types of a Pokémon.
 *
 * @function displayType
 * @param {number} pokemonIndex - The index of the Pokémon in the list.
 * @param {Object} pokemon - The Pokémon object that contains its types.
 * @description This function iterates over the types of a Pokémon. It renders the first and second type
 * images using `renderFirstTypeImg` and `renderSecondTypeImg`. If the Pokémon has only one type, it hides
 * the image for the second type by calling `hideEmptyType`.
 */
function displayType(pokemonIndex, pokemon) {
    pokemon.types.forEach((type, index) => {
        if (index === 0) renderFirstTypeImg(pokemonIndex, type.type.name);
        else if (index === 1) renderSecondTypeImg(pokemonIndex, type.type.name);
    });
    if (checkSecondTypeAvailable(pokemon)) hideEmptyType(pokemonIndex);
}

/**
 * Checks if the Pokémon has a second type.
 *
 * @function checkSecondTypeAvailable
 * @param {Object} pokemon - The Pokémon object to check.
 * @returns {boolean} Returns `true` if the Pokémon has only one type, `false` otherwise.
 * @description This function checks the number of types a Pokémon has. If the Pokémon has more than
 * one type, it returns `false`, indicating that the second type is available. Otherwise, it returns `true`.
 */
function checkSecondTypeAvailable(pokemon) {
    return pokemon.types.length <= 1;
}

/**
 * Renders the image for the first Pokémon type.
 *
 * @function renderFirstTypeImg
 * @param {number} pokemonIndex - The index of the Pokémon in the dataset.
 * @param {string} pokemonTypes - The type of the Pokémon, used to select the corresponding image.
 * @description This function updates the `src` attribute of the first type image element based on
 * the given Pokémon type. The image is expected to be in the `./img/icon/icon-types/` directory.
 */
function renderFirstTypeImg(pokemonIndex, pokemonTypes) {
    let pokemonFirstImgTypeRef = document.getElementById(
        `pokemon-first-type-img${pokemonIndex}`
    );
    pokemonFirstImgTypeRef.src = `./img/icon/icon-types/${pokemonTypes}.svg`;
}

/**
 * Renders the image for the second Pokémon type.
 *
 * @function renderSecondTypeImg
 * @param {number} pokemonIndex - The index of the Pokémon in the dataset.
 * @param {string} pokemonTypes - The type of the Pokémon, used to select the corresponding image.
 * @description This function updates the `src` attribute of the second type image element based on
 * the given Pokémon type. The image is expected to be in the `./img/icon/icon-types/` directory.
 */
function renderSecondTypeImg(pokemonIndex, pokemonTypes) {
    let pokemonSecondImgTypeRef = document.getElementById(
        `pokemon-second-type-img${pokemonIndex}`
    );
    pokemonSecondImgTypeRef.src = `./img/icon/icon-types/${pokemonTypes}.svg`;
}

/**
 * Hides the element representing the second Pokémon type if it's empty.
 *
 * @function hideEmptyType
 * @param {number} pokemonIndex - The index of the Pokémon in the dataset.
 * @description This function hides the second type image of a Pokémon by adding the 'd-none' class
 * to the corresponding element, typically when the Pokémon only has one type.
 */
function hideEmptyType(pokemonIndex) {
    document
        .getElementById(`pokemon-second-type-img${pokemonIndex}`)
        .classList.add("d-none");
}

/**
 * Updates the background color of a specified element based on the Pokémon's type.
 *
 * @function updateBgColor
 * @param {Object} pokemon - The Pokémon object containing the type information.
 * @param {string} ref - The ID of the element whose background color will be updated.
 * @description This function adds a class to the specified element based on the first type of the Pokémon,
 * which typically changes the background color to visually represent that type.
 */
function updateBgColor(pokemon, ref) {
    let cardRef = document.getElementById(ref);
    let typeForBg = pokemon.types[0].type.name;
    cardRef.classList.add(`${typeForBg}`);
}

/**
 * Clears the content area and ensures the "Load More" button is visible.
 *
 * @function clearContent
 * @description This function clears the inner HTML of the content section and ensures the "Load More" button
 * is displayed by removing the "d-none" class.
 */
function clearContent() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("load-more-btn").classList.remove("d-none");
}

/**
 * Disables the "Load More" button by setting its disabled property to true.
 *
 * @function disableLoadBtn
 * @description This function disables the "Load More" button, preventing the user from interacting with it.
 */
function disableLoadBtn() {
    let buttonRef = document.getElementById("load-more-btn");
    buttonRef.disabled = true;
}

/**
 * Enables the "Load More" button by setting its disabled property to false.
 *
 * @function enableLoadBtn
 * @description This function enables the "Load More" button by removing the disabled state, allowing
 * the user to interact with it.
 */

function enableLoadBtn() {
    let buttonRef = document.getElementById("load-more-btn");
    buttonRef.disabled = false;
}
