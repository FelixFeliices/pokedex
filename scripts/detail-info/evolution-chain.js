/**
 * Displays the evolution chain of the current Pokémon.
 *
 * @function showEvolutionChain
 * @description Fetches the species and evolution chain data of the current Pokémon,
 * clears the existing arrays and container, and creates the evolution container
 * while populating it with the evolution chain data.
 * @async
 * @returns {Promise<void>} Resolves when the evolution chain data is successfully fetched and displayed.
 */
async function showEvolutionChain() {
    let speciesData = await fetchData(currentPokemon.species.url);
    let evolutionChainData = await fetchData(speciesData.evolution_chain.url);
    clearArrays();
    clearContainer();
    await createEvolutionContainer(currentPokemon.id);
    await getData(evolutionChainData);
}

/**
 * Clears the arrays holding evolution stages.
 *
 * @function clearArrays
 * @description Resets the arrays `possibleFirstEvoltions` and `possibleSecondEvoltions`
 * to empty, clearing any previously stored evolution stages.
 */ function clearArrays() {
    possibleFirstEvoltions = [];
    possibleSecondEvoltions = [];
}

/**
 * Processes and displays the evolution chain data.
 *
 * @function getData
 * @param {Object} evolutionChainData - The evolution chain data containing the evolutionary stages.
 * @description Extracts evolution data from the provided chain, fetches images for the evolutions,
 * and displays them accordingly. It also populates the arrays for possible evolutions and calls
 * additional functions to fetch and display subsequent evolution stages.
 * @async
 * @returns {Promise<void>} Resolves when the evolution data has been fully processed and displayed.
 */

async function getData(evolutionChainData) {
    let baseEvolutionOverview = evolutionChainData.chain;
    let img = await getEvolutionImg(baseEvolutionOverview.species.url);
    let name = baseEvolutionOverview.species.name.toUpperCase();
    baseEvolutionOverview.evolves_to.forEach((evolution) => {
        possibleFirstEvoltions.push(evolution);
    });

    displayEvo(img, name, "base");
    if (possibleFirstEvoltions.length > 0) await getEvolutionData("first");
    if (possibleSecondEvoltions.length > 0) await getEvolutionData("second");
}

/**
 * Processes and displays evolution stage data (first or second).
 *
 * @function getEvolutionData
 * @param {string} stage - The evolution stage to process ("first" or "second").
 * @description Fetches image data, evolution triggers, and level-up requirements for the specified
 * evolution stage. It also adds possible subsequent evolutions to the appropriate array.
 * Displays evolution details and triggers.
 * @async
 * @returns {Promise<void>} Resolves when the evolution stage data has been processed and displayed.
 */
async function getEvolutionData(stage) {
    let evolutions =
        stage === "first" ? possibleFirstEvoltions : possibleSecondEvoltions;
    for (let index = 0; index < evolutions.length; index++) {
        let overview = evolutions[index];
        let evolutionTriggerName = overview.evolution_details[0].trigger.name;
        let levelUpRequerment = displayLevelUpRequirement(overview);
        if (stage !== "second") {
            overview.evolves_to.forEach((possibleEvoltion) => {
                possibleSecondEvoltions.push(possibleEvoltion);
            });
        }
        displayArrow(stage + "-arrow", evolutionTriggerName, levelUpRequerment);
        displayEvo(
            await getEvolutionImg(overview.species.url),
            overview.species.name.toUpperCase(),
            stage + "-evo"
        );
    }
}

/**
 * Determines and returns the level-up requirement for an evolution.
 *
 * @function displayLevelUpRequirement
 * @param {Object} overview - The evolution overview object containing evolution details.
 * @returns {string|number} The level-up requirement, which can either be a level number, an item name, or "n/A" if not applicable.
 * @description This function checks the evolution details for the required level or item needed for an evolution.
 * It first checks for a `min_level`, then an `item.name`, and returns "n/A" if neither is found.
 */ function displayLevelUpRequirement(overview) {
    let levelUpInfoOverview = overview.evolution_details[0];
    if (
        levelUpInfoOverview.min_level !== null &&
        levelUpInfoOverview.min_level !== undefined
    )
        return levelUpInfoOverview.min_level;
    else if (levelUpInfoOverview.item && levelUpInfoOverview.item.name)
        return levelUpInfoOverview.item.name;
    else return "n/A";
}

/**
 * Fetches the evolution image of a Pokémon from the species URL.
 *
 * @function getEvolutionImg
 * @param {string} speciesUrl - The URL of the Pokémon species to fetch evolution data.
 * @returns {Promise<string>} A promise that resolves to the URL of the Pokémon's evolution image.
 * @description This function fetches species data and then retrieves the Pokémon's image URL
 * from the available sprites. If the dream world sprite is available, it is used; otherwise,
 * the home sprite is used. If neither is available, it returns undefined.
 * @async
 */
async function getEvolutionImg(speciesUrl) {
    let speciesData = await fetchData(speciesUrl);
    let pokemonData = await fetchData(
        `https://pokeapi.co/api/v2/pokemon/${speciesData.id}/`
    );
    let imageUrl =
        pokemonData.sprites.other.dream_world.front_default ||
        pokemonData.sprites.other.home.front_default;
    return imageUrl;
}

/**
 * Displays an evolution image and name in the specified container.
 *
 * @function displayEvo
 * @param {string} img - The URL of the Pokémon's evolution image.
 * @param {string} name - The name of the evolved Pokémon.
 * @param {string} ref - A reference string used to target the appropriate container.
 * @description This function adds an evolution image and the corresponding Pokémon's name
 * into the container identified by the given reference (`ref`). The content is rendered
 * using the `evoTemplate` function.
 */
function displayEvo(img, name, ref) {
    let container = document.getElementById(`evo-container-${ref}`);
    container.innerHTML += evoTemplate(img, name);
}

/**
 * Displays an evolution arrow with the corresponding trigger and level-up requirement.
 *
 * @function displayArrow
 * @param {string} id - The ID of the container where the arrow should be displayed.
 * @param {string} evolutionTriggerName - The name of the evolution trigger (e.g., "level-up").
 * @param {string|number} levelUpRequerment - The level or item required for the evolution.
 * @description This function updates the inner HTML of the container identified by the given `id`
 * with an evolution arrow, using the provided `evolutionTriggerName` and `levelUpRequerment`.
 * The content is generated using the `arrowTemplate` function.
 */
function displayArrow(id, evolutionTriggerName, levelUpRequerment) {
    document.getElementById(`${id}`).innerHTML = "";
    document.getElementById(`${id}`).innerHTML = arrowTemplate(
        evolutionTriggerName,
        levelUpRequerment
    );
}

/**
 * Creates and renders the evolution chain container.
 *
 * @function createEvolutionContainer
 * @description This function sets the inner HTML of the container with the ID "container"
 * to display the evolution chain. The content is generated using the `evolutionChainContainerTemplate` function.
 * It is used to initialize the layout for showing the evolution details of a Pokémon.
 * @async
 */ async function createEvolutionContainer() {
    let containerRef = document.getElementById("container");
    containerRef.innerHTML = evolutionChainContainerTemplate();
}

/**
 * Clears the content of the container and hides the toggle switch.
 *
 * @function clearContainer
 * @description This function clears the inner HTML of the container with the ID "container"
 * and hides the toggle switch by adding the `d-none` class to the element with the ID "switch".
 */
function clearContainer() {
    document.getElementById("container").innerHTML = "";
    document.getElementById("switch").classList.add("d-none");
}
