function showEvolutionChain(id) {
  let containerRef = document.getElementById("container");
  let switchRef = document.getElementById("switch");

  containerRef.innerHTML = "";
  switchRef.classList.add("d-none");
  evoChainUrl = `https://pokeapi.co/api/v2/evolution-chain/${id}/`;

  fetchEvoChain(evoChainUrl, id);
}

async function fetchEvoChain(evoChainUrl, id) {
  // Korrigiere die Zuweisung von id
  if (id === 0) {
    id = 0; // id bleibt
    let responseEvoChainUrl = await fetch(evoChainUrl);
    const evoChain = await responseEvoChainUrl.json();

    // Verarbeite die erhaltenen Evolutionsdaten
    getEvoChain(evoChain);

    // Gebe die Daten und id in der Konsole aus
    console.log(evoChain);
    console.log(id);
    0;
  } else {
    id = id - 2;
    let responseEvoChainUrl = await fetch(evoChainUrl);
    const evoChain = await responseEvoChainUrl.json();

    // Verarbeite die erhaltenen Evolutionsdaten
    getEvoChain(evoChain);

    // Gebe die Daten und id in der Konsole aus
    console.log(evoChain);
    console.log(id); // id wird um 2 reduziert
  }

  // Führe den Fetch-Request aus
}

function getEvoChain(evoChain) {
  for (let index = 0; index < evoChain.chain.evolves_to.length; index++) {
    let firstEvolution = evoChain.chain.evolves_to[index];
    console.log(firstEvolution.species.name);

    for (let j = 0; j < firstEvolution.evolves_to.length; j++) {
      let secondEvolution = firstEvolution.evolves_to[j];
      console.log(secondEvolution.species.name);
    }
  }
}
