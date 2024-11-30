function toogleDetailInfo(event) {
  let headertRef = document.getElementById("header");
  let contentRef = document.getElementById("content");
  let overlayerRef = document.getElementById("overlayer");
  let buttonRef = document.getElementById("load-more-btn");
  let bodyRef = document.getElementById("body");

  overlayerRef.classList.toggle("d-none");
  headertRef.classList.toggle("d-none");
  contentRef.classList.toggle("mt-2");
  buttonRef.classList.toggle("d-none");
  bodyRef.classList.toggle("overflow-hidden");
  event.stopPropagation();
}

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
  let pokemon = array[pokemonIndex];
  let id = pokemon.id;

  overlayerRef.innerHTML = detailInfoTemplate(pokemonIndex, id);
  getPkmInfos(pokemon, id);
}

// Function to fetch and display Pokémon information
function getPkmInfos(pokemon, id) {
  let img =
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.other.home.front_default ||
    pokemon.sprites.other.showdown.front_default;

  showStats(id); // Display the Pokémon's stats
  renderInfosInOvererlay(pokemon, img); // Render the basic info in the overlay
  showFlavourText(pokemon); // Fetch and display the flavor text
}

// Function to render Pokémon information in the overlay
function renderInfosInOvererlay(pokemon, img) {
  document.getElementById("pokemon-name-id").innerHTML = "#" + pokemon.id + " " + pokemon.name.toUpperCase();
  document.getElementById("pokemon-img").src = img;
  document.getElementById("weight").innerHTML = "Weight: " + pokemon.weight;
  document.getElementById("height").innerHTML = "Height: " + pokemon.height;
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
async function showFlavourText(pokemon) {
  let container = document.getElementById("flavour-container"); // Reference to the flavor text container
  let text = await getFlavourText(pokemon); // Fetch the flavor text
  container.innerHTML = `${text}`; // Display the flavor text in the container
}

// Function to fetch flavor text from the Pokémon species URL
async function getFlavourText(pokemon) {
  let url = pokemon.species.url; // Get the species URL for the Pokémon
  let species = await fetchData(url); // Fetch the species data
  let text = species.flavor_text_entries[1].flavor_text; // Get the second flavor text entry
  return text; // Return the flavor text
}

function playCries(pokemonIndex) {
  let audioURL;
  let selectedPokemon = chunkedPokedex[pokemonIndex] || fullPokedex[pokemonIndex];
  audioURL = selectedPokemon.cries.legacy;
  let audio = new Audio(audioURL);
  audio.play();
}
