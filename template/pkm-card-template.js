function renderPkmCard(pokemonIndex) {
  return `<div id="pokemon-card-${pokemonIndex}" onclick="openDetailInfo(event), displayChoosenPokemon(${pokemonIndex})" class="card shadow mb-5 rounded">
                <div class="card-body">
                  <span class="name" id="id_name${pokemonIndex}"></span>
                  <img class="pokemonImg" id="pokemon-img${pokemonIndex}" src="" alt="Bild" />
                  <div class="pokemon-types-container">
                  <img id="pokemon-first-type-img${pokemonIndex}" class="icon" src="" alt="Bild" />
                   <img id="pokemon-second-type-img${pokemonIndex}" class="icon" src="" alt="Bild" />
                   </div>
                </div>
                  
            </div>`;
}
