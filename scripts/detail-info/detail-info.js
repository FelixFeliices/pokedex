let audioURL = "";

function openDetailInfo(event) {
    let headertRef = document.getElementById("header");
    let contentRef = document.getElementById("content");
    let overlayerRef = document.getElementById("overlayer");
    let buttonRef = document.getElementById("load-more-btn");
    let bodyRef = document.getElementById("body")
    overlayerRef.classList.remove("d-none");
    headertRef.classList.add("d-none");
    contentRef.classList.add("mt-2");
    buttonRef.classList.add("d-none");
    bodyRef.classList.add("overflow-hidden")
    event.stopPropagation();

}

function closeDetailInfo(event) {
    let headertRef = document.getElementById("header");
    let contentRef = document.getElementById("content");
    let overlayerRef = document.getElementById("overlayer");
    let buttonRef = document.getElementById("load-more-btn");
    let bodyRef = document.getElementById("body")
    if (!event.target.closest("#detail-info") || event.target.closest("#close-button")) {
        headertRef.classList.remove("d-none");
        contentRef.classList.remove("mt-2");
        buttonRef.classList.remove("d-none");
        bodyRef.classList.remove("overflow-hidden")
        overlayerRef.classList.add("d-none");
        if (filterActive) {
            hideLoadMore()
        } else showLoadMore()
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
    let pokemon = chunkedPokedex[pokemonIndex];
    let id = pokemon.id;
    overlayerRef.innerHTML = detailInfoTemplate(pokemonIndex, id);
    getPkmInfos(pokemon);
}

function getSelectetPokemonWithFilter(pokemonIndex) {
    let overlayerRef = document.getElementById("overlayer");
    let pokemon = fullPokedex[pokemonIndex];
    let id = pokemon.id;

    overlayerRef.innerHTML = detailInfoTemplate(pokemonIndex, id);
    getPkmInfos(pokemon);
}

function getPkmInfos(pokemon) {
    let id = pokemon.id
    let img =
        pokemon.sprites.other.dream_world.front_default ||
        pokemon.sprites.other.home.front_default ||
        pokemon.sprites.other.showdown.front_default;
    showStats(id)
    renderInfosInOvererlay(pokemon, img);
    showFlavourText(pokemon);
}

function renderInfosInOvererlay(pokemon, img) {
    document.getElementById("pokemon-name-id").innerHTML = "#" + pokemon.id + " " + pokemon.name.toUpperCase();
    document.getElementById("pokemon-img").src = img;
    document.getElementById("weight").innerHTML = "Weight: " + pokemon.weight;
    document.getElementById("height").innerHTML = "Height: " + pokemon.height;
}

function nextPkm(pokemonIndex) {
    pokemonIndex++;
    displayChoosenPokemon(pokemonIndex);
}

function prevPkm(pokemonIndex) {
    if (pokemonIndex <= 0) {
        pokemonIndex = 0;
    } else {
        pokemonIndex--;
    }
    displayChoosenPokemon(pokemonIndex);
}

async function showFlavourText(pokemon) {
    let container = document.getElementById("flavour-container");
    let text = await getFlavourText(pokemon);
    container.innerHTML = `${text}`;
}

async function getFlavourText(pokemon) {
    let url = pokemon.species.url;
    let species = await fetchData(url);
    let text = species.flavor_text_entries[1].flavor_text;
    return text;
}