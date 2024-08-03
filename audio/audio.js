async function playCries(pokemonIndex) {
  setAudioUrl(pokemonIndex);

  if (audioURL) {
    try {
      let audioObj = await getAudioFromUrl(audioURL);
      audioObj.play();
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error(error);
  }
}

function setAudioUrl(pokemonIndex) {
  let selectedPokemon = singlePokemonsInfo[pokemonIndex];
  audioURL = selectedPokemon.cries.legacy;
}

async function getAudioFromUrl(url) {
  let response = await fetch(url);
  let data = await response.blob();
  let audio = new Audio();
  audio.src = URL.createObjectURL(data);
  return audio;
}
