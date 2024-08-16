function filterPkmName() {
  let inputRef = document.getElementById("input").value.toLowerCase();
  let filteredPokemons = fullPokedex.filter((pokemon) => pokemon.name.toLowerCase().includes(inputRef));
  filterActive = true;
  if (inputRef.length >= 3) {
    displayFilteredPokemons(filteredPokemons);
    $(".dropdown-menu").removeClass("show");
  } else {
    init();
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

  displayFilteredPokemons(filteredPokemons);
  closeDropDown();
}

function displayFilteredPokemons(pokemons) {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  if (pokemons.length === 0) {
    contentRef.innerHTML = "Pokemon nicht gefunden";
  } else {
    for (let i = 0; i < pokemons.length; i++) {
      let pokemon = pokemons[i];
      let pokemonIndex = fullPokedex.indexOf(pokemon);
      createPokemonCard(pokemonIndex);
      displayPokemonDetails(pokemonIndex, pokemon);
      hideLoadMore();
    }
  }
}

function closeDropDown() {
  $("#drop-down-1").dropdown("toggle");
  document.getElementById("drop-down-1").setAttribute("aria-expanded", false);
  $("#drop-down-2").dropdown("toggle");
  document.getElementById("drop-down-2").setAttribute("aria-expanded", false);
}

function hideLoadMore() {
  let buttonRef = document.getElementById("load-more-btn");
  buttonRef.classList.add("d-none");
}

function showLoadMore() {
  let buttonRef = document.getElementById("load-more-btn");
  buttonRef.classList.remove("d-none");
}
