// Hauptfunktion, um die Evolution-Kette anzuzeigen
async function showEvolutionChain(pokemonId) {
  // Hole die Daten über die Pokémon-Spezies
  const speciesData = await fetchPokemonSpecies(pokemonId);
  // Hole die Evolution-Ketten-Daten
  const evolutionChainData = await fetchEvolutionChain(speciesData.evolution_chain.url);
  // Leere den Container und erstelle einen neuen
  clearContainer();
  createEvolutionContainer(pokemonId);
  // Zeige die Evolution-Kette an
  await displayEvolutionChain(evolutionChainData);
}

// Funktion zum Leeren des Containers
function clearContainer() {
  document.getElementById("container").innerHTML = "";
  document.getElementById("switch").classList.add("d-none");
}

// Hole die Pokémon-Spezies-Daten
async function fetchPokemonSpecies(pokemonId) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
  return await response.json();
}

// Hole die Evolution-Kette-Daten
async function fetchEvolutionChain(evoChainURL) {
  const response = await fetch(evoChainURL);
  return await response.json();
}

// Erstelle den Container für die Evolution-Kette
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
    <div id="first-evo-container" onclick="displayChoosenPokemon(${pokemonId})" class="d-flex align-items-center column pointer">
      
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

// Zeige die Evolution-Kette an
async function displayEvolutionChain(evoChain) {
  // Hole den Namen und das Bild für die Basis-Evolution
  let BASE_EVO_URL = evoChain.chain.species.url;
  await getEvolutionImg(BASE_EVO_URL, 1);
  displayBaseEvolution(evoChain);

  // Hole den Namen und das Bild für die erste Evolution
  for (const firstEvolution of evoChain.chain.evolves_to) {
    let FIRST_EVO_URL = firstEvolution.species.url;
    await getEvolutionImg(FIRST_EVO_URL, 2);
    displayFirstEvolution(firstEvolution);

    // Hole den Namen und das Bild für die zweite Evolution
    for (const secondEvolution of firstEvolution.evolves_to) {
      let SECOND_EVO_URL = secondEvolution.species.url;
      await getEvolutionImg(SECOND_EVO_URL, 3);
      displaySecondEvolution(secondEvolution);
    }
  }
}

// Zeige die Basis-Evolution an
function displayBaseEvolution(evoChain) {
  // let evoContainerRef = document.getElementById("first-evo-container");

  let firstLevelUp = evoChain.chain.evolves_to[0]?.evolution_details[0]?.min_level;
  let nameRef1 = document.getElementById("name-evo1");
  let firstLevelUpRef = document.getElementById("first-level-up");
  // evoContainerRef.innerHTML += `<img class="chain" id="evolution1" src="" alt="2" />
  //     <span id="name-evo2"></span>`;
  nameRef1.innerHTML = evoChain.chain.species.name.toUpperCase();
  firstLevelUpRef.innerHTML = "Lvl:" + (firstLevelUp || "");
}

// Zeige die erste Evolution an
function displayFirstEvolution(firstEvolution) {
  let nameRef2 = document.getElementById("name-evo2");
  let secondLevelUpRef = document.getElementById("second-level-up");
  let secondLevelUp = firstEvolution.evolves_to[0]?.evolution_details[0]?.min_level;

  nameRef2.innerHTML = firstEvolution.species.name.toUpperCase();
  secondLevelUpRef.innerHTML = "Lvl:" + (secondLevelUp || "");
}

// Zeige die zweite Evolution an
function displaySecondEvolution(secondEvolution) {
  let nameRef3 = document.getElementById("name-evo3");
  nameRef3.innerHTML = secondEvolution.species.name.toUpperCase();
}

// Hole die Bild-URL der Evolution und zeige das Bild an
async function getEvolutionImg(speciesUrl, i) {
  const speciesResponse = await fetch(speciesUrl);
  const speciesData = await speciesResponse.json();

  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`);
  const pokemonData = await pokemonResponse.json();

  const imageUrl = pokemonData.sprites.other.dream_world.front_default;

  displayEvolutionImg(imageUrl, i);
}

// Setze die Bild-URL für die Evolution auf das Bild-Element
function displayEvolutionImg(imageUrl, i) {
  // Wenn das Bild nicht geladen werden kann, kann dies zu Problemen führen
  const imgElement = document.getElementById(`evolution${i}`);
  imgElement.src = imageUrl;
}
