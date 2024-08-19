function filterPkmName() {
  let inputRef = document.getElementById("input").value.toLowerCase();
  let filteredPokemons = fullPokedex.filter((pokemon) => pokemon.name.toLowerCase().includes(inputRef));
  filterActive = true;
  if (inputRef.length >= 3) {
    prepareFilteredPokemons(filteredPokemons);
    $(".dropdown-menu").removeClass("show");
    hideText();
  }
  if (inputRef.length <= 2) {
    showText();
    init();
  }
  if (checkLenghtEqualZero(inputRef)) {
    hideText();
  }
}

function filterPkmType(parameter) {
  let typeRef = parameter.toLowerCase();
  let filteredPokemons = fullPokedex.filter((pokemon) => {
    filterActive = true;
    for (let i = 0; i < pokemon.types.length; i++) {
      if (pokemon.types[i].type.name.toLowerCase().includes(typeRef)) {
        return true;
      }
    }
    return false;
  });

  prepareFilteredPokemons(filteredPokemons);
  closeDropDown();
}

function prepareFilteredPokemons(pokemons) {
  document.getElementById("content").innerHTML = "";

  if (checkLenghtEqualZero(pokemons)) {
    document.getElementById("content").innerHTML = "Pokemon not found";
  } else {
    showFiltredPokemon(pokemons);
  }
}

function showFiltredPokemon(pokemons) {
  for (let i = 0; i < pokemons.length; i++) {
    let pokemon = pokemons[i];
    let pokemonIndex = fullPokedex.indexOf(pokemon);
    createPokemonCard(pokemonIndex);
    displayPokemonDetails(pokemonIndex, pokemon);
    hideLoadMore();
  }
}

function closeDropDown() {
  $("#drop-down-1").dropdown("toggle");
  document.getElementById("drop-down-1").setAttribute("aria-expanded", false);
  $("#drop-down-2").dropdown("toggle");
  document.getElementById("drop-down-2").setAttribute("aria-expanded", false);
  enableLoadBtn();
}

function hideLoadMore() {
  let buttonRef = document.getElementById("load-more-btn");
  buttonRef.classList.add("d-none");
}

function showLoadMore() {
  let buttonRef = document.getElementById("load-more-btn");
  buttonRef.classList.remove("d-none");
}

function showText() {
  let inputTextRef = document.getElementById("input-message");
  inputTextRef.classList.remove("d-none");
}
function hideText() {
  let inputTextRef = document.getElementById("input-message");
  inputTextRef.classList.add("d-none");
}

function checkLenghtEqualZero(param) {
  return param.length === 0;
}
