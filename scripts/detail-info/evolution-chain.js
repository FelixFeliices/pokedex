// Hauptfunktion, um die Evolution-Kette anzuzeigen

let possibleFirstEvoltions = [];
let possibleSecondEvoltions = [];

async function showEvolutionChain(pokemonId) {
  const speciesData = await fetchPokemonSpecies(pokemonId);
  const evolutionChainData = await fetchEvolutionChain(speciesData.evolution_chain.url);
  clearArrays();
  clearContainer();
  await createEvolutionContainer(pokemonId);
  await getData(evolutionChainData);
}

function clearArrays() {
  possibleFirstEvoltions = [];
  possibleSecondEvoltions = [];
}

async function getData(evolutionChainData) {
  const baseEvolutionOverview = getBaseEvolutionData(evolutionChainData);
  const URL_FOR_IMG = baseEvolutionOverview.species.url;
  const img = await getEvolutionImg(URL_FOR_IMG);
  const name = baseEvolutionOverview.species.name.toUpperCase();
  let evolvesTo = baseEvolutionOverview.evolves_to;

  displayBaseEvo(img, name);

  for (let index = 0; index < evolvesTo.length; index++) {
    possibleEvoltion = evolvesTo[index];
    possibleFirstEvoltions.push(possibleEvoltion);
  }
  if (possibleFirstEvoltions.length > 0) {
    await getFirstEvolutionData();

    if (possibleSecondEvoltions.length > 0) {
      await getSecondEvolutionData();
    }
  }
}

function getBaseEvolutionData(evolutionChainData) {
  let baseOverwiev = evolutionChainData.chain;
  return baseOverwiev;
}

async function getFirstEvolutionData() {
  for (let index = 0; index < possibleFirstEvoltions.length; index++) {
    const overview = possibleFirstEvoltions[index];
    const name = overview.species.name.toUpperCase();
    const evolutionTrigger = overview.evolution_details[0].trigger;
    const evolutionTriggerName = evolutionTrigger.name;
    const evolutionTriggerUrl = evolutionTrigger.url;
    const evolves_to = overview.evolves_to;
    const URL_FOR_IMG = overview.species.url;
    const img = await getEvolutionImg(URL_FOR_IMG);
    let levelUpRequerment = displayLevelUpRequirement(overview);

    for (let index = 0; index < evolves_to.length; index++) {
      let possibleEvoltion = evolves_to[index];
      possibleSecondEvoltions.push(possibleEvoltion);
    }
    displayFirstEvo(img, name);
    displayArrow("first-arrow", evolutionTriggerName, levelUpRequerment);
  }
}

async function getSecondEvolutionData() {
  for (let index = 0; index < possibleSecondEvoltions.length; index++) {
    const overview = possibleSecondEvoltions[index];
    const name = overview.species.name.toUpperCase();
    const evolutionTrigger = overview.evolution_details[0].trigger;
    const evolutionTriggerName = evolutionTrigger.name;
    const evolutionTriggerUrl = evolutionTrigger.url;
    const URL_FOR_IMG = overview.species.url;
    const img = await getEvolutionImg(URL_FOR_IMG);
    let levelUpRequerment = displayLevelUpRequirement(overview);

    displaySecondEvo(img, name);
    displayArrow("second-arrow", evolutionTriggerName, levelUpRequerment);
  }
}

function displayLevelUpRequirement(overview) {
  let levelUpInfoOverview = overview.evolution_details[0];

  if (levelUpInfoOverview.min_level !== null && levelUpInfoOverview.min_level !== undefined) {
    let levelUpLevel = levelUpInfoOverview.min_level;
    return levelUpLevel;
  } else if (levelUpInfoOverview.item && levelUpInfoOverview.item.name) {
    let levelUpItem = levelUpInfoOverview.item.name;
    return levelUpItem;
  } else {
    return "n/A";
  }
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

async function getEvolutionImg(speciesUrl) {
  const speciesResponse = await fetch(speciesUrl);
  const speciesData = await speciesResponse.json();

  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`);
  const pokemonData = await pokemonResponse.json();
  const imageUrl = pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.other.home.front_default;
  return imageUrl;
}

async function createEvolutionContainer() {
  const containerRef = document.getElementById("container");
  containerRef.innerHTML = `
<div class="d-flex align-items-center">
  <div class="d-flex align-items-start gap-3 w-100">
  <div  class="d-flex align-items-center">
    <div id="evo-container-base" class="d-flex align-items-center"></div>
<div id="first-arrow" class="d-flex column align-items-center"></div>
</div>
  <div class="d-flex align-items-center">
    <div id="evo-container-first-evo" class="d-flex align-items-center justify-center"></div>
<div id="second-arrow" class="d-flex column align-items-center"></div>
</div>
    <div id="evo-container-second-evo" class="d-flex align-items-center justify-center"></div>
  </div>
</div>
  `;
}

function displayBaseEvo(img, name) {
  const container = document.getElementById("evo-container-base");
  container.innerHTML = `  
<div class="d-flex align-items-center column pointer">
  <img class="chain" src="${img}" alt="Image of${name}" />
  <span>${name}</span>
</div>
`;
}

function displayFirstEvo(img, name) {
  const container = document.getElementById("evo-container-first-evo");
  container.innerHTML += `
   <div class="d-flex align-items-center column">
  <img class="chain" src="${img}" alt="Image of ${name}" />
  <span>${name}</span>
</div>
`;
}

function displaySecondEvo(img, name) {
  const container = document.getElementById("evo-container-second-evo");
  container.innerHTML += `
<div class="d-flex align-items-center column">
  <img class="chain" src="${img}" alt="Image of${name}" />
  <span>${name}</span>
</div>

       `;
}

function displayArrow(id, evolutionTriggerName, levelUpRequerment) {
  document.getElementById(`${id}`).innerHTML = ``;
  document.getElementById(`${id}`).innerHTML = `<img class="arrow" src="./img/icon/right-arrow.png" alt="arrow" />
<span>${evolutionTriggerName}</span>
<span>${levelUpRequerment}</span>`;
}
