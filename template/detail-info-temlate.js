function detailInfoTemplate() {
    return /*html*/ `
    <div id="detail-info" class="card overflow-x-hidden overflow-y-auto detail-info" onclick="event.stopPropagation()">
      <div id="overlay-container" class="d-flex column card-body align-middle position-relative overflow-auto">
        
        <div onclick="toogleDetailInfo(event)" id="close-button" class="position-absolute pointer hover-effect">X</div>
        <div id="pokemon-name-id" class="text-center mb-2">#${
            currentPokemon.id
        } ${currentPokemon.name.toUpperCase()}</div>
        <div class="d-flex justify-content-center align-items-center w-100 gap-3">
            <div onclick="prevPkm(${
                currentPokemon.id
            })" class="btn hover-effect" id="prev">
              <img src="./img/icon/prev-arrow.svg">
            </div>

            <img id="pokemon-img" src="" alt="Pokemon Bild" />

            <div onclick="nextPkm(${
                currentPokemon.id
            })" class="btn hover-effect" id="next">
              <img src="./img/icon/nxt-arrow.svg" >
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center text-center w-100">
            <span class="retro-font">Weight: ${currentPokemon.weight}</span>
            <span class="retro-font">Height: ${currentPokemon.height}</span>
            <button class="btn font-14 p-0 hover-effect" 
            onclick="playCries(${currentPokemon.id})">
             <img id="play-icon" src="./img/icon/play.svg" alt="Play Sound">
            </button>
        </div>

        <div id="flavour-container" class="d-flex justify-content-between align-items-center w-100 text-wrap mb-2 retro-font"></div>

        <div class="d-flex column justify-content-center w-100 mb-1">
            <div class="btn-group">
                <a onclick="showStats(${
                    currentPokemon.id
                })" href="#" class="btn btn-secondary font-14 p-responive-0">Stats</>
                <a onclick="showEvolutionChain(${
                    currentPokemon.id
                })" href="#" class="btn btn-secondary font-14 p-responive-0">Evolution Chain</a>
                <a onclick="showAppearance(${
                    currentPokemon.id
                })" href="#" class="btn btn-secondary font-14 p-responive-0">Appearance</a>
                <a onclick="showMoves(${
                    currentPokemon.id
                })" href="#" class="btn btn-secondary font-14 p-responive-0">Moves</a>
            </div>
            <div id="switch" class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onchange="toggleStatsView()" />
                <label class="form-check-label" for="flexSwitchCheckDefault">Show Values</label>
            </div>
        </div>

        <div id="container" class="d-flex flex-fill justify-content-center">
        </div>

      </div>
    </div>`;
}

function appearanceContainerTemplate() {
    return /*html*/ `
  <div class="d-flex wrap justify-content-center mt-2">
    <div class="d-flex">
        <div><img class="appearance" id="front_default" src=""/></div>
        <div><img class="appearance" id="back_default" src=""/></div>
    </div>
    <div class="d-flex">
        <div><img class="appearance" id="fron_shiny" src=""/></div>
        <div><img class="appearance" id="back_shiny" src=""/></div>
    </div>
    <div class="d-flex">
        <div><img class="appearance" id="homeDefault" src=""/></div>
        <div><img class="appearance" id="homeShiny" src=""/></div>
    </div>
    <div class="d-flex">
        <div><img class="appearance" id="showdownFrontDefault" src=""/></div>
        <div><img class="appearance" id="showdownBackDefault" src=""/></div>
    </div>
    <div class="d-flex pb-2">
        <div><img class="appearance" id="showdownFrontShiny" src=""/></div>
        <div><img class="appearance" id="showdownBackShiny" src="" /></div>
    </div>
  </div>`;
}

function evolutionChainContainerTemplate() {
    return /*html*/ `
   <div class="d-flex align-items-center">
    <div id="evo-container" class="d-flex align-items-start gap-1 w-100">
        <div class="d-flex align-items-center gap-1">
            <div id="evo-container-base" class="d-flex align-items-center"></div>
            <div id="first-arrow" class="d-flex column align-items-center text-center"></div>
        </div>
        <div class="d-flex align-items-center gap-1">
            <div id="evo-container-first-evo" class="d-flex align-items-center justify-center"></div>
            <div id="second-arrow" class="d-flex column align-items-center text-center"></div>
        </div>
        <div id="evo-container-second-evo" class="d-flex align-items-center justify-center"></div>
      </div>
    </div>`;
}

function evoTemplate(img, name) {
    return /*html*/ `  
      <div class="d-flex align-items-center column pointer">
        <img class="chain" src="${img}" alt="Image of${name}" />
        <span>${name}</span>
      </div>`;
}

function arrowTemplate(evolutionTriggerName, levelUpRequerment) {
    return /*html*/ `
    <img class="arrow" src="./img/icon/right-arrow.png" alt="arrow" />
    <span>${evolutionTriggerName}</span>
    <span>${levelUpRequerment}</span>`;
}

function moveContainerTemplate() {
    return /*html*/ `<div class="d-flex justify-content-around flex-wrap gap-1 mt-2" id="moves-container"></div>`;
}

function moveTemplate(moveName) {
    return /*html*/ `<div class="move d-flex justify-content-center align-items-center w-25 text-center border border-success p-2 mb-2 border-opacity-25 rounded-pill">${moveName}</div>`;
}
