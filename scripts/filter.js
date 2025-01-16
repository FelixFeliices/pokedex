/**
 * Filters Pokémon by name based on user input.
 *
 * @function filterPkmName
 * @description This function retrieves the input value, filters Pokémon by name,
 * activates a filter flag, and handles input scenarios such as empty or specific lengths.
 */

function filterPkmName() {
    let inputRef = getInputValue();
    let filteredPokemons = filterPokemonsByName(inputRef);
    isFilterActive = true;

    handleInputLength(inputRef, filteredPokemons);
    handleEmptyInput(inputRef);
}

/**
 * Retrieves and formats the value of the input field.
 *
 * @function getInputValue
 * @returns {string} The lowercase value from the input field with the ID "input".
 */
function getInputValue() {
    return document.getElementById("input").value.toLowerCase();
}

/**
 * Filters the full Pokémon list based on the input string.
 *
 * @function filterPokemonsByName
 * @param {string} input - The search string to filter Pokémon names.
 * @returns {Array} A filtered array of Pokémon whose names include the input string.
 */
function filterPokemonsByName(input) {
    return fullPokedex.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(input)
    );
}

/**
 * Handles UI and logic based on the length of the input and filtered Pokémon list.
 *
 * @function handleInputLength
 * @param {string} inputRef - The input value entered by the user.
 * @param {Array} filteredPokemons - The filtered array of Pokémon.
 * @description Prepares and displays filtered Pokémon if the input length is 3 or more.
 * Otherwise, it resets the view to its default state.
 */
function handleInputLength(inputRef, filteredPokemons) {
    if (inputRef.length >= 3) {
        prepareFilteredPokemons(filteredPokemons);
        $(".dropdown-menu").removeClass("show");
        hideText();
        disableLoadBtn();
    } else {
        resetView();
    }
}

/**
 * Resets the application view to its default state.
 *
 * @function resetView
 * @description Displays default text, reinitializes the application,
 * and enables the load button.
 */
function resetView() {
    showText();
    init();
    enableLoadBtn();
}

/**
 * Handles the scenario where the input field is empty.
 *
 * @function handleEmptyInput
 * @param {string} inputRef - The input value entered by the user.
 * @description Hides text and enables the load button if the input is empty.
 */ function handleEmptyInput(inputRef) {
    if (checkLengthEqualZero(inputRef)) {
        hideText();
        enableLoadBtn();
    }
}

/**
 * Checks if the length of the given parameter is zero.
 *
 * @function checkLengthEqualZero
 * @param {string} param - The string to check.
 * @returns {boolean} True if the length is zero, otherwise false.
 */
function checkLengthEqualZero(param) {
    return param.length === 0;
}

/**
 * Filters Pokémon by a given name and updates the UI accordingly.
 *
 * @function filterExamplePkmName
 * @param {string} name - The name or partial name to filter Pokémon by.
 * @description Converts the input to lowercase, filters Pokémon by name,
 * activates the filter flag, prepares the filtered Pokémon,
 * and hides the dropdown menu.
 */
function filterExamplePkmName(name) {
    let inputRef = name.toLowerCase();
    let filteredPokemons = fullPokedex.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(inputRef)
    ); // Filter Pokémon by name
    isFilterActive = true;

    prepareFilteredPokemons(filteredPokemons);
    document.getElementById(".dropdown-menu").removeClass("show");
}

/**
 * Filters Pokémon by type and updates the UI.
 *
 * @function filterPkmType
 * @param {string} parameter - The type or partial type to filter Pokémon by.
 * @description Converts the input to lowercase, filters Pokémon by type,
 * activates the filter flag, closes the dropdown menu, and prepares the filtered Pokémon.
 */
function filterPkmType(parameter) {
    let typeRef = parameter.toLowerCase();
    let filteredPokemons = fullPokedex.filter((pokemon) => {
        isFilterActive = true;

        for (let i = 0; i < pokemon.types.length; i++) {
            if (pokemon.types[i].type.name.toLowerCase().includes(typeRef)) {
                return true;
            }
        }
        return false;
    });
    closeDropDown();
    prepareFilteredPokemons(filteredPokemons);
}

/**
 * Prepares and displays the filtered Pokémon list.
 *
 * @function prepareFilteredPokemons
 * @param {Array} pokemons - The array of filtered Pokémon.
 * @description Clears the content area. If no Pokémon are found, displays a
 * "Pokemon not found" message; otherwise, displays the filtered Pokémon.
 */
function prepareFilteredPokemons(pokemons) {
    document.getElementById("content").innerHTML = "";
    if (checkLenghtEqualZero(pokemons))
        document.getElementById("content").innerHTML = "Pokemon not found";
    else showFiltredPokemon(pokemons);
}

/**
 * Displays the filtered Pokémon by creating cards and showing their details.
 *
 * @function showFiltredPokemon
 * @param {Array} pokemons - The array of filtered Pokémon.
 * @description Iterates over the filtered Pokémon, creates their cards,
 * displays details, and hides the "Load More" button.
 */
function showFiltredPokemon(pokemons) {
    for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        let pokemonIndex = fullPokedex.indexOf(pokemon);
        createPokemonCard(pokemonIndex);
        displayPokemonDetails(pokemonIndex, pokemon);
        hideLoadMore();
    }
}

/**
 * Closes the dropdown menus and updates their states.
 *
 * @function closeDropDown
 * @description Toggles the visibility of the dropdown menus, sets their
 * "aria-expanded" attribute to false, and enables the load button.
 */
function closeDropDown() {
    $("#drop-down-1").dropdown("toggle");
    document.getElementById("drop-down-1").setAttribute("aria-expanded", false);
    $("#drop-down-2").dropdown("toggle");
    document.getElementById("drop-down-2").setAttribute("aria-expanded", false);
    enableLoadBtn();
}

/**
 * Hides the "Load More" button.
 *
 * @function hideLoadMore
 * @description Adds the "d-none" class to the "Load More" button, making it hidden.
 */
function hideLoadMore() {
    let buttonRef = document.getElementById("load-more-btn");
    buttonRef.classList.add("d-none");
}

/**
 * Shows the "Load More" button.
 *
 * @function showLoadMore
 * @description Removes the "d-none" class from the "Load More" button, making it visible.
 */
function showLoadMore() {
    let buttonRef = document.getElementById("load-more-btn");
    buttonRef.classList.remove("d-none");
}

/**
 * Displays the text message by making it visible.
 *
 * @function showText
 * @description Removes the "transparent" class from the text element,
 * making the message visible.
 */ function showText() {
    let inputTextRef = document.getElementById("input-message");
    inputTextRef.classList.remove("transparent");
}

/**
 * Hides the text message by making it transparent.
 *
 * @function hideText
 * @description Adds the "transparent" class to the text element,
 * making the message invisible.
 */
function hideText() {
    let inputTextRef = document.getElementById("input-message");
    inputTextRef.classList.add("transparent");
}

/**
 * Checks if the length of the given parameter is zero.
 *
 * @function checkLenghtEqualZero
 * @param {Array|string} param - The array or string to check.
 * @returns {boolean} True if the length is zero, otherwise false.
 */
function checkLenghtEqualZero(param) {
    return param.length === 0;
}

/**
 * Resets the input field to an empty state.
 *
 * @function resetInput
 * @description Clears the value of the input field with the ID "input".
 */ function resetInput() {
    document.getElementById("input").value = "";
}
