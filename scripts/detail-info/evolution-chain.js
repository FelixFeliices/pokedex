// Hauptfunktion, um die Evolution-Kette anzuzeigen

let possibleFirstEvoltions = []
let possibleSecondEvoltions = []

async function showEvolutionChain(pokemonId) {
    const speciesData = await fetchPokemonSpecies(pokemonId);
    const evolutionChainData = await fetchEvolutionChain(speciesData.evolution_chain.url);

    clearContainer();
    await createEvolutionContainer(pokemonId);
    await getData(evolutionChainData)

}

async function getData(evolutionChainData) {
    let baseEvolutionOverview = getBaseEvolutionData(evolutionChainData);
    let URL_FOR_IMG = baseEvolutionOverview.species.url
    let img = await getEvolutionImg(URL_FOR_IMG)
    console.log(img);
    let name = baseEvolutionOverview.species.name;
    let evolvesTo = baseEvolutionOverview.evolves_to
    for (let index = 0; index < evolvesTo.length; index++) {
        let possibleEvoltion = evolvesTo[index];
        possibleFirstEvoltions.push(possibleEvoltion)
    }
    await getFirstEvolutionData()
    await getSecondEvolutionData()
    await displayImg(img)

}


function getBaseEvolutionData(evolutionChainData) {
    let baseOverwiev = evolutionChainData.chain
    return baseOverwiev
}

async function getFirstEvolutionData() {
    for (let index = 0; index < possibleFirstEvoltions.length; index++) {
        const overview = possibleFirstEvoltions[index]
        const firstEvolutionName = overview.species.name;
        let evolutionTrigger = overview.evolution_details[0].trigger
        let evolutionTriggerName = evolutionTrigger.name
        let evolutionTriggerUrl = evolutionTrigger.url
        let evolves_to = overview.evolves_to
        let URL_FOR_IMG = overview.species.url
        let img = await getEvolutionImg(URL_FOR_IMG)
        console.log(img);



        for (let index = 0; index < evolves_to.length; index++) {
            let possibleEvoltion = evolves_to[index];
            possibleSecondEvoltions.push(possibleEvoltion)

        }
    }

}

async function getSecondEvolutionData() {
    for (let index = 0; index < possibleSecondEvoltions.length; index++) {
        const overview = possibleSecondEvoltions[index]
        const secondEvolutionName = overview.species.name;
        let evolutionTrigger = overview.evolution_details[0].trigger
        let evolutionTriggerName = evolutionTrigger.name
        let evolutionTriggerUrl = evolutionTrigger.url
        let URL_FOR_IMG = overview.species.url
        let img = await getEvolutionImg(URL_FOR_IMG)
        console.log(img);



    }
}

function clearContainer() {
    document.getElementById("container").innerHTML = "";
    document.getElementById("switch").classList.add("d-none");
}

// // Hole die Pokémon-Spezies-Daten
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
async function createEvolutionContainer(pokemonId) {
    const containerRef = document.getElementById("container");
    containerRef.innerHTML = `
<div class="d-flex align-items-center">
    <div class="d-flex align-items-end gap-3 w-100">
        <div id="img-container-base" onclick="displayChoosenPokemon(${pokemonId})" class="d-flex align-items-center column pointer">

        </div>
        <div class="d-flex column justify-center">
            <img class="arrow" src="./img/icon/right-arrow.png" alt="arrow" />
            <span id="first-level-up"></span>
        </div>
        <div id="first-evo-container" onclick="displayChoosenPokemon(${pokemonId})" class="d-flex align-items-center column pointer">
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

async function getEvolutionImg(speciesUrl) {
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();

    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`);
    const pokemonData = await pokemonResponse.json();

    const imageUrl = pokemonData.sprites.other.dream_world.front_default;
    return imageUrl
}

async function displayImg(img) {
    let imgContainerRef = document.getElementById("img-container-base")
    imgContainerRef.innerHTML = `<img class="chain" id="evolution1" src="${img}" alt="1" />
<span id="name-evo1"></span>`
}