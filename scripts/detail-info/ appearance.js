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
    let pokemon = singlePokemonsInfo[pokemonIndex].sprites;

    displayDefaultImg(pokemon);
    displayShinyImg(pokemon);
  } else if (filterActive) {
    let pokemon = fullPokedex[pokemonIndex].sprites;

    displayDefaultImg(pokemon);
    displayShinyImg(pokemon);
  }
}

function displayDefaultImg(pokemon) {
  const elements = [
    { id: "front_default", src: pokemon.front_default },
    { id: "back_default", src: pokemon.back_default },
    { id: "homeDefault", src: pokemon.other.home.front_default },
    { id: "showdownFrontDefault", src: pokemon.other.showdown.front_default },
    { id: "showdownBackDefault", src: pokemon.other.showdown.back_default },
  ];

  elements.forEach(({ id, src }) => {
    const imgElement = document.getElementById(id);
    if (src) {
      imgElement.src = src;
      imgElement.classList.remove("d-none");
    } else {
      imgElement.classList.add("d-none");
    }
  });
}

function displayShinyImg(pokemon) {
  const elements = [
    { id: "front_shiny", src: pokemon.front_shiny },
    { id: "back_shiny", src: pokemon.back_shiny },
    { id: "homeShiny", src: pokemon.other.home.front_shiny },
    { id: "showdownFrontShiny", src: pokemon.other.showdown.front_shiny },
    { id: "showdownBackShiny", src: pokemon.other.showdown.back_shiny },
  ];

  elements.forEach(({ id, src }) => {
    const imgElement = document.getElementById(id);
    if (src) {
      imgElement.src = src;
      imgElement.classList.remove("d-none");
    } else {
      imgElement.classList.add("d-none");
    }
  });
}
