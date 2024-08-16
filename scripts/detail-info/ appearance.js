function showAppearance(pokemonIndex) {
  clearContainer();
  createAppearanceContainer();
  getImages(pokemonIndex);
}

function createAppearanceContainer() {
  const containerRef = document.getElementById("container");
  containerRef.innerHTML = `<div class="d-flex wrap">
  <div class="d-flex">
    <div><img class="appearance" id="front_default" src="" alt="Normal" /></div>
    <div><img class="appearance" id="back_default" src="" alt="Shiny" /></div>
  </div>
  <div class="d-flex">
    <div><img class="appearance" id="fron_shiny" src="" alt="1" /></div>
    <div><img class="appearance" id="back_shiny" src="" alt="2" /></div>
  </div>
  <div class="d-flex">
    <div><img class="appearance" id="homeDefault" src="" alt="1" /></div>
    <div><img class="appearance" id="homeShiny" src="" alt="2" /></div>
  </div> 
  <div class="d-flex">
    <div><img class="appearance" id="showdownFrontDefault" src="" alt="1" /></div>
    <div><img class="appearance" id="showdownBackDefault" src="" alt="2" /></div>
  </div> 
  <div class="d-flex">
    <div><img class="appearance" id="showdownFrontShiny" src="" alt="1" /></div>
    <div><img class="appearance" id="showdownBackShiny" src="" alt="2" /></div>
  </div>
</div>`;
}

function getImages(pokemonIndex) {
  if (!filterActive) {
    let pokemon = chunkedPokedex[pokemonIndex].sprites;

    displayDefaultImg(pokemon);
    displayShinyImg(pokemon);
  } else if (filterActive) {
    let pokemon = fullPokedex[pokemonIndex].sprites;

    displayDefaultImg(pokemon);
    displayShinyImg(pokemon);
  }
}

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

function displayShinyImg(pokemon) {
  let fron_shiny = pokemon.front_shiny;
  let back_shiny = pokemon.back_shiny;
  let homeShiny = pokemon.other.home.front_shiny;
  let showdownFrontShiny = pokemon.other.showdown.front_shiny;
  let showdownBackShiny = pokemon.other.showdown.back_shiny;

  document.getElementById("fron_shiny").src = fron_shiny;
  document.getElementById("back_shiny").src = back_shiny;
  document.getElementById("homeShiny").src = homeShiny;
  document.getElementById("showdownFrontShiny").src = showdownFrontShiny;
  document.getElementById("showdownBackShiny").src = showdownBackShiny;
}
