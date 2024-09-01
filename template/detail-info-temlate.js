function detailInfoTemplate(pokemonIndex, id) {
    return `<div id="detail-info" class="card detail-info" onclick="event.stopPropagation()">
    <div class="card-body align-middle">
    <div onclick="closeDetailInfo(event)" id="close-button"class="position-absolute pointer">X</div>
        <div id="pokemon-name-id" class="row justify-content-center mb-2"></div>
        <div class="d-flex justify-content-center align-items-center w-100 gap-3">
            <div onclick="prevPkm(${pokemonIndex})" class="btn" id="prev">Prev</div>
            <img id="pokemon-img" src="" alt="Pokemon Bild" />
            <div onclick="nextPkm(${pokemonIndex})" class="btn" id="next">Next</div>
        </div>

        <div class="d-flex justify-content-between align-items-center w-100">
            <span id="weight"></span><span id="height"></span>
            <button class="btn font-14 " onclick="playCries(${pokemonIndex})">Sound Abspielen</button>
            <audio id="audio1" style="display: none"></audio>
        </div>

        <div id="flavour-container" class="d-flex justify-content-between align-items-center w-100 text-wrap"></div>

        <div class="d-flex column justify-content-center w-100">
            <div class="btn-group">
                <a onclick="showStats(${id})" href="#" class="btn btn-secondary font-14 " aria-current="page">Stats</a
          >
          <a onclick="showEvolutionChain(${id})" href="#" class="btn btn-secondary font-14">Evolution Chain</a>
                <a onclick="showAppearance(${id})" href="#" class="btn btn-secondary font-14">Erscheinungen</a>
                <a onclick="showMoves(${id})" href="#" class="btn btn-secondary font-14">Moves</a>
            </div>
            <div id="switch" class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onchange="toggleStatsView()" />
                <label class="form-check-label" for="flexSwitchCheckDefault">Werte anzeigen</label>
            </div>
        </div>

        <div id="container" class="d-flex justify-content-center">
        </div>

    </div>
</div>
`;
}