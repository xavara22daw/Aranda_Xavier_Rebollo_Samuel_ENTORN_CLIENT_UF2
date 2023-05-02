// Realizamos una importación de la función que vamos a utilizar para controlar el audio y de varias variables
import { controladorAudio, audio, audioButton } from "./controladorAudio.js";

// Bajamos el volumen del audio que va a sonar de fondo en la página principal
audio.volume = "0.2";

// Al hacer clic sobre el botón, llamamos a la función 'controlarAudio()'
audioButton.onclick = function () {
  controladorAudio();
};
