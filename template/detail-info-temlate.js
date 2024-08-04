function detailInfoTemplate(pokemonIndex, id) {
  return `<div id="detail-info" class="card detail-info" onclick="event.stopPropagation()">
  <div class="card-body align-middle">
    <div class="prev-next">
      <div onclick="prevPkm(${pokemonIndex})" class="btn" id="prev">Prev</div>
      <div onclick="nextPkm(${pokemonIndex})" class="btn">Next</div>
    </div>
    <div class="up">
      <div id="pokemon-name-id" class="row"></div>
      <img id="pokemon-img" src="" alt="Pokemon Bild" />
    </div>
    <div class="d-flex justify-content-between align-items-center w-100">
      <span id="weight"></span><span id="height"></span
      ><button class="btn" onclick="playCries(${pokemonIndex})">Sound Abspielen</button>
      <audio id="audio1" style="display: none"></audio>
    </div>
    <div class="down">
      <div class="btn-group">
        <a
          onclick="displayChoosenPokemon(${pokemonIndex})"
          href="#"
          class="btn btn-secondary active"
          aria-current="page"
          >Stats</a
        >
        <a onclick="showEvolutionChain(${id})" href="#" class="btn btn-secondary">Evolution Chain</a>
        <a onclick=" showAppearance(${pokemonIndex})"href="#" class="btn btn-secondary">Erscheinungen</a>
        <a href="#" class="btn btn-secondary">Attacks</a>
      </div>
      <div id="switch" class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onchange="toggleStatsView()"
        />
        <label class="form-check-label" for="flexSwitchCheckDefault">Werte anzeigen</label>
      </div>
      <div id="container">
        <div id="stats-table" class="d-none"></div>
        <svg id="spider-chart" viewBox="-180 -120 300 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Maximalwert Rahmen -->
          <polygon
            points="100,0 50,86.6 -50,86.6 -100,0 -50,-86.6 50,-86.6"
            fill="none"
            stroke="gray"
            stroke-width="1"
          />

          <!-- Radiale Linien -->
          <line x1="0" y1="0" x2="100" y2="0" stroke="gray" />
          <line x1="0" y1="0" x2="50" y2="86.6" stroke="gray" />
          <line x1="0" y1="0" x2="-50" y2="86.6" stroke="gray" />
          <line x1="0" y1="0" x2="-100" y2="0" stroke="gray" />
          <line x1="0" y1="0" x2="-50" y2="-86.6" stroke="gray" />
          <line x1="0" y1="0" x2="50" y2="-86.6" stroke="gray" />
          <polygon id="data-polygon" class="default" fill="" stroke="gray" stroke-width="1" />

          <!-- Beschriftungen -->
          <text x="105" y="0" font-size="10" fill="black">HP</text>
          <text x="55" y="95" font-size="10" fill="black">Attack</text>
          <text x="-65" y="95" font-size="10" fill="black">Defense</text>
          <text x="-175" y="0" font-size="10" fill="black">Special Attack</text>
          <text x="-65" y="-95" font-size="10" fill="black">Special Defense</text>
          <text x="55" y="-95" font-size="10" fill="black">Speed</text>
        </svg>
      </div>
    </div>
  </div>
</div>

`;
}
