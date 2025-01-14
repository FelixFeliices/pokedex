function toogleDetailInfo(event) {
    document.getElementById("header").classList.toggle("d-none");
    document.getElementById("content").classList.toggle("mt-2");
    document.getElementById("overlayer").classList.toggle("d-none");
    document.getElementById("load-more-btn").classList.toggle("d-none");
    document.getElementById("body").classList.toggle("overflow-hidden");

    event.stopPropagation();
}

let currentPokemon = 0;

// Function to display the selected Pokémon's details based on whether a filter is active
function displayChoosenPokemon(pokemonIndex) {
    if (!isFilterActive) {
        getSelectetPokemon(chunkedPokedex, pokemonIndex);
    } else if (isFilterActive) {
        getSelectetPokemon(fullPokedex, pokemonIndex);
    }
}
function getSelectetPokemon(array, pokemonIndex) {
    let overlayerRef = document.getElementById("overlayer");

    currentPokemon = array[pokemonIndex];
    overlayerRef.innerHTML = detailInfoTemplate();
    updateBgColor(currentPokemon, "detail-info");
    getPkmInfos();
}

// Function to fetch and display Pokémon information
async function getPkmInfos() {
    showStats();
    renderInfosInOvererlay(); // Render the basic info in the overlay
    await showFlavourText(); // Fetch and display the flavor text
}

// Function to render Pokémon information in the overlay
function renderInfosInOvererlay() {
    let img =
        currentPokemon.sprites.other.dream_world.front_default ||
        currentPokemon.sprites.other.home.front_default ||
        currentPokemon.sprites.other.showdown.front_default;

    document.getElementById("pokemon-img").src = img;
}

// Function to display the next Pokémon's details
function nextPkm(pokemonIndex) {
    if (pokemonIndex + 1 === chunkedPokedex.length) {
        pokemonIndex = chunkedPokedex.length - 1;
    } else {
        pokemonIndex++;
    }
    displayChoosenPokemon(pokemonIndex);
}

// Function to display the previous Pokémon's details
function prevPkm(pokemonIndex) {
    if (pokemonIndex <= 1) {
        pokemonIndex = 1;
    } else {
        pokemonIndex--;
    }
    displayChoosenPokemon(pokemonIndex);
}

// Function to fetch and display the flavor text of a Pokémon
async function showFlavourText() {
    let container = document.getElementById("flavour-container");
    let text = await getFlavourText();
    container.innerHTML = `${text}`;
}

// Function to fetch flavor text from the Pokémon species URL
async function getFlavourText() {
    let species = await fetchData(currentPokemon.species.url);
    let text = species.flavor_text_entries[1].flavor_text;
    return text;
}

function playCries() {
    let audio = new Audio(currentPokemon.cries.legacy);
    audio.play();
}
