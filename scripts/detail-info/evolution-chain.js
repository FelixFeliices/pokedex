async function showEvolutionChain(pokemonId) {
  clearContainer();
  const speciesData = await fetchPokemonSpecies(pokemonId);
  const evolutionChainData = await fetchEvolutionChain(speciesData.evolution_chain.url);
  createEvolutionContainer();
  displayEvolutionChain(evolutionChainData);
}

function clearContainer() {
  document.getElementById("container").innerHTML = "";
  document.getElementById("switch").classList.add("d-none");
}

async function fetchPokemonSpecies(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  return await response.json();
}

async function fetchEvolutionChain(evoChainURL) {
  const response = await fetch(evoChainURL);
  return await response.json();
}

function createEvolutionContainer() {
  const containerRef = document.getElementById("container");
  containerRef.innerHTML = `
<div>
  <div>
    <img class="chain"id="evolution1" src="" alt="1" />
    <span id="name-evo1"></span>
  </div>
  <div>
    <img class="chain"  id="evolution2" src="" alt="2" />
    <span id="name-evo2"></span>
  </div>
  <div>
    <img class="chain"  id="evolution3" src="" alt="3" />
    <span id="name-evo3"></span>
  </div>
</div>

  `;
}

function displayEvolutionChain(evoChain) {
  let nameRef1 = document.getElementById("name-evo1");
  let nameRef2 = document.getElementById("name-evo2");
  let nameRef3 = document.getElementById("name-evo3");

  imgURL = evoChain.chain.species.url;
  nameRef1.innerHTML = evoChain.chain.species.name;

  getEvolutionImg(imgURL, 1);
  for (const firstEvolution of evoChain.chain.evolves_to) {
    nameRef2.innerHTML = firstEvolution.species.name;
    imgURL = firstEvolution.species.url;
    getEvolutionImg(imgURL, 2);

    for (const secondEvolution of firstEvolution.evolves_to) {
      nameRef3.innerHTML = secondEvolution.species.name;
      imgURL = secondEvolution.species.url;
      getEvolutionImg(imgURL, 3);
    }
  }
}

async function getEvolutionImg(speciesUrl, i) {
  const speciesResponse = await fetch(speciesUrl);
  const speciesData = await speciesResponse.json();

  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`);
  const pokemonData = await pokemonResponse.json();

  const imageUrl = pokemonData.sprites.other.dream_world.front_default;

  document.getElementById(`evolution${i}`).src = imageUrl;
}
