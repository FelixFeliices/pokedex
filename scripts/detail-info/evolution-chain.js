async function showEvolutionChain(pokemonId) {
  const speciesData = await fetchPokemonSpecies(pokemonId);
  const evolutionChainData = await fetchEvolutionChain(speciesData.evolution_chain.url);
  console.log("chain");
  clearContainer();
  createEvolutionContainer(pokemonId);
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

function createEvolutionContainer(pokemonId) {
  const containerRef = document.getElementById("container");
  containerRef.innerHTML = `
<div class="d-flex align-items-center">
  <div class="d-flex align-items-end gap-3 w-100">
    <div onclick="displayChoosenPokemon(${pokemonId})" class="d-flex align-items-center column pointer">
      <img class="chain" id="evolution1" src="" alt="1" />
      <span id="name-evo1"></span>
    </div>
    <div class="d-flex column justify-center">
      <img class="arrow" src="./img/icon/right-arrow.png" alt="arrow" />
      <span id="first-level-up"></span>
    </div>
    <div onclick="displayChoosenPokemon(${pokemonId})" class="d-flex align-items-center column pointer">
      <img class="chain" id="evolution2" src="" alt="2" />
      <span id="name-evo2"></span>
    </div>
    <div class="d-flex column justify-center">
      <img class="arrow" src="./img/icon/right-arrow.png" alt="arrow" />
      <span id="second-level-up"></span>
    </div>
    <div onclick="displayChoosenPokemon(${pokemonId})" class="d-flex align-items-center column pointer">
      <img class="chain" id="evolution3" src="" alt="3" />
      <span id="name-evo3"></span>
    </div>
  </div>
</div>
  `;
}

function displayEvolutionChain(evoChain) {
  let nameRef3 = document.getElementById("name-evo3");
  imgURL = evoChain.chain.species.url;
  displayBaseEvolution(evoChain);
  getEvolutionImg(imgURL, 1);

  for (const firstEvolution of evoChain.chain.evolves_to) {
    dispalayFirstEvolution(firstEvolution);
    getEvolutionImg(imgURL, 2);

    for (const secondEvolution of firstEvolution.evolves_to) {
      displaySecondEvolution(secondEvolution, nameRef3);
      getEvolutionImg(imgURL, 3);
    }
  }
}

function displayBaseEvolution(evoChain) {
  let firstLevelUp = evoChain.chain.evolves_to[0].evolution_details[0].min_level;
  let nameRef1 = document.getElementById("name-evo1");
  let firstLevelUpRef = document.getElementById("first-level-up");

  nameRef1.innerHTML = evoChain.chain.species.name.toUpperCase();
  firstLevelUpRef.innerHTML = "Lvl:" + firstLevelUp;
}

function dispalayFirstEvolution(firstEvolution) {
  let nameRef2 = document.getElementById("name-evo2");
  let secondLevelUpRef = document.getElementById("second-level-up");
  let secondLevelUp = firstEvolution.evolves_to[0].evolution_details[0].min_level;

  nameRef2.innerHTML = firstEvolution.species.name.toUpperCase();
  imgURL = firstEvolution.species.url;
  secondLevelUpRef.innerHTML = "Lvl:" + secondLevelUp;
}

function displaySecondEvolution(secondEvolution, nameRef3) {
  nameRef3.innerHTML = secondEvolution.species.name.toUpperCase();
  imgURL = secondEvolution.species.url;
}

async function getEvolutionImg(speciesUrl, i) {
  const speciesResponse = await fetch(speciesUrl);
  const speciesData = await speciesResponse.json();

  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`);
  const pokemonData = await pokemonResponse.json();

  const imageUrl = pokemonData.sprites.other.dream_world.front_default;

  diplayEvolutionImg(imageUrl, i);
}

function diplayEvolutionImg(imageUrl, i) {
  document.getElementById(`evolution${i}`).src = imageUrl;
}
