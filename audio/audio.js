function playCries(pokemonIndex) {
  let selectedPokemon = singlePokemonsInfo[pokemonIndex];
  audioURL = selectedPokemon.cries.legacy;
  const audio = new Audio(audioURL);
  audio.play();
}
