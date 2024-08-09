function playCries(pokemonIndex) {
  if (cyle == 1) {
    let selectedPokemon = singlePokemonsInfo[pokemonIndex];
    audioURL = selectedPokemon.cries.legacy;
    const audio = new Audio(audioURL);
    audio.play();
  } else if (cyle == 2) {
    let selectedPokemon = fullPokedex[pokemonIndex];
    audioURL = selectedPokemon.cries.legacy;
    const audio = new Audio(audioURL);
    audio.play();
  }
}
