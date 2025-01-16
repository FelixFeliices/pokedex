/**
 * Toggles the visibility of the Pokémon details overlay and adjusts the layout accordingly.
 *
 * @function toogleDetailInfo
 * @param {Event} event - The event object representing the user's interaction with the page.
 * @description This function toggles the visibility of various elements related to the Pokémon details.
 * It hides or shows the header, content, overlayer, and load more button, and also toggles the body's
 * overflow-hidden class. The `event.stopPropagation()` prevents the event from propagating further.
 */
function toogleDetailInfo(event) {
    document.getElementById("header").classList.toggle("d-none");
    document.getElementById("content").classList.toggle("mt-2");
    document.getElementById("overlayer").classList.toggle("d-none");
    document.getElementById("load-more-btn").classList.toggle("d-none");
    document.getElementById("body").classList.toggle("overflow-hidden");
    event.stopPropagation();
}

/**
 * Displays the chosen Pokémon based on the provided index, considering the active filter.
 *
 * @function displayChoosenPokemon
 * @param {number} pokemonIndex - The index of the chosen Pokémon in the appropriate array.
 * @description This function checks whether a filter is active. If no filter is active, it fetches and displays
 * the Pokémon from the `chunkedPokedex` array. If a filter is active, it fetches and displays the Pokémon
 * from the `fullPokedex` array using the `getSelectetPokemon` function.
 */
function displayChoosenPokemon(pokemonIndex) {
    if (!isFilterActive) {
        getSelectetPokemon(chunkedPokedex, pokemonIndex);
    } else if (isFilterActive) {
        getSelectetPokemon(fullPokedex, pokemonIndex);
    }
}

/**
 * Retrieves the selected Pokémon from the array and updates the overlay with its details.
 *
 * @function getSelectetPokemon
 * @param {Array} array - The array containing all the Pokémon data.
 * @param {number} pokemonIndex - The index of the selected Pokémon in the array.
 * @description This function sets the `currentPokemon` to the Pokémon at the specified index,
 * updates the overlay with the details of the selected Pokémon using `detailInfoTemplate`,
 * updates the background color using `updateBgColor`, and then fetches and displays additional Pokémon info using `getPkmInfos`.
 */
function getSelectetPokemon(array, pokemonIndex) {
    let overlayerRef = document.getElementById("overlayer");
    currentPokemon = array[pokemonIndex];
    overlayerRef.innerHTML = detailInfoTemplate();
    updateBgColor(currentPokemon, "detail-info");
    getPkmInfos();
}

/**
 * Retrieves and displays the information of the current Pokémon.
 *
 * @function getPkmInfos
 * @description This function calls multiple functions to display the current Pokémon's details.
 * It first displays the Pokémon's stats using `showStats`, renders the basic info in the overlay
 * using `renderInfosInOvererlay`, and then fetches and displays the flavor text using `showFlavourText`.
 * @async
 */
async function getPkmInfos() {
    showStats();
    renderInfosInOvererlay();
    await showFlavourText();
}

/**
 * Renders the Pokémon image in the overlay.
 *
 * @function renderInfosInOvererlay
 * @description This function sets the source (`src`) of the image element with the ID "pokemon-img"
 * to the first available image of the current Pokémon. The image is selected from the `dream_world`,
 * `home`, or `showdown` sprite sets of the current Pokémon, prioritizing the first available one.
 */ function renderInfosInOvererlay() {
    let img =
        currentPokemon.sprites.other.dream_world.front_default ||
        currentPokemon.sprites.other.home.front_default ||
        currentPokemon.sprites.other.showdown.front_default;
    document.getElementById("pokemon-img").src = img;
}

/**
 * Displays the next Pokémon in the list based on the given index.
 *
 * @function nextPkm
 * @param {number} pokemonIndex - The current Pokémon's index.
 * @description This function checks if the current Pokémon index is the last in the list. If so, it
 * ensures the index stays at the last Pokémon. Otherwise, it increases the index by 1 to show the next Pokémon.
 * The chosen Pokémon is then displayed using the `displayChoosenPokemon` function.
 */
function nextPkm(pokemonIndex) {
    if (pokemonIndex + 1 === chunkedPokedex.length)
        pokemonIndex = chunkedPokedex.length - 1;
    else pokemonIndex++;
    displayChoosenPokemon(pokemonIndex);
}

/**
 * Displays the previous Pokémon in the list based on the given index.
 *
 * @function prevPkm
 * @param {number} pokemonIndex - The current Pokémon's index.
 * @description This function checks if the current Pokémon index is greater than 1. If so, it
 * decreases the index by 1 to show the previous Pokémon. If the index is 1 or less, it ensures
 * the index stays at 1. The chosen Pokémon is then displayed using the `displayChoosenPokemon` function.
 */
function prevPkm(pokemonIndex) {
    if (pokemonIndex <= 1) {
        pokemonIndex = 1;
    } else {
        pokemonIndex--;
    }
    displayChoosenPokemon(pokemonIndex);
}

/**
 * Displays the flavor text of the current Pokémon.
 *
 * @function showFlavourText
 * @description This function retrieves the flavor text of the current Pokémon using
 * the `getFlavourText` function and displays it inside the container with the ID "flavour-container".
 * The flavor text is displayed as inner HTML of the container.
 * @async
 */
async function showFlavourText() {
    let container = document.getElementById("flavour-container");
    let text = await getFlavourText();
    container.innerHTML = `${text}`;
}

/**
 * Fetches the flavor text of the current Pokémon from its species data.
 *
 * @function getFlavourText
 * @returns {Promise<string>} A promise that resolves to the flavor text of the Pokémon.
 * @description This function fetches the species data for the current Pokémon and retrieves
 * the flavor text from the second entry in the `flavor_text_entries` array.
 * @async
 */
async function getFlavourText() {
    let species = await fetchData(currentPokemon.species.url);
    let text = species.flavor_text_entries[1].flavor_text;
    return text;
}

/**
 * Plays the Pokémon's cry sound.
 *
 * @function playCries
 * @description This function creates a new `Audio` object using the legacy cry URL of the
 * current Pokémon (`currentPokemon.cries.legacy`) and plays the sound.
 */
function playCries() {
    let audio = new Audio(currentPokemon.cries.legacy);
    audio.play();
}
