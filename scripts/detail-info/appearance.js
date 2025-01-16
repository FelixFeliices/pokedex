// Function to display Pokémon appearance images
function showAppearance(pokemonIndex) {
    clearContainer();
    createAppearanceContainer();
    getImages(pokemonIndex);
}

// Function to create the appearance container and insert it into the DOM
function createAppearanceContainer() {
    let containerRef = document.getElementById("container");
    containerRef.innerHTML = appearanceContainerTemplate();
}

// Function to get the appropriate images for the selected Pokémon
function getImages(pokemonIndex) {
    if (!isFilterActive) {
        let pokemon = chunkedPokedex[pokemonIndex].sprites;

        displayDefaultImg(pokemon);
        displayShinyImg(pokemon);
    } else if (isFilterActive) {
        let pokemon = fullPokedex[pokemonIndex].sprites;

        displayDefaultImg(pokemon);
        displayShinyImg(pokemon);
    }
}

// Function to display the default (normal) Pokémon sprites
function displayDefaultImg(pokemon) {
    let front_default = pokemon.front_default;
    let back_default = pokemon.back_default;
    let homeDefault = pokemon.other.home.front_default;
    let showdownFrontDefault = pokemon.other.showdown.front_default;
    let showdownBackDefault = pokemon.other.showdown.back_default;

    document.getElementById("front_default").src = front_default;
    document.getElementById("back_default").src = back_default;
    document.getElementById("homeDefault").src = homeDefault;
    document.getElementById("showdownFrontDefault").src = showdownFrontDefault;
    document.getElementById("showdownBackDefault").src = showdownBackDefault;
}

// Function to display the shiny version of the Pokémon sprites
function displayShinyImg(pokemon) {
    let front_shiny = pokemon.front_shiny;
    let back_shiny = pokemon.back_shiny;
    let homeShiny = pokemon.other.home.front_shiny;
    let showdownFrontShiny = pokemon.other.showdown.front_shiny;
    let showdownBackShiny = pokemon.other.showdown.back_shiny;

    document.getElementById("fron_shiny").src = front_shiny;
    document.getElementById("back_shiny").src = back_shiny;
    document.getElementById("homeShiny").src = homeShiny;
    document.getElementById("showdownFrontShiny").src = showdownFrontShiny;
    document.getElementById("showdownBackShiny").src = showdownBackShiny;
}
