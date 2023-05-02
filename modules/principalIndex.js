// Realizamos una importación del archivo "controladorAudio.js" de la función que vamos a utilizar para controlar el audio y de varias variables 
import { controladorAudio, audio, audioButton } from "./controladorAudio.js";
// Realizamos una importación del archivo "canviPagina.js" de la función para redireccionar la página
import { redireccionar, button } from "./canviPagina.js";

// Bajamos el volumen del audio que va a sonar de fondo en la página principal
audio.volume = "0.2";

// Al hacer clic sobre el botón "audioButton", llamamos a la función 'controlarAudio()'
audioButton.onclick = function () {
  controladorAudio();
};

// Al hacer clic sobre el botón "button", llamamos a la función 'redireccionar()' para redireccionar la app
button.onclick = function () {
  redireccionar("battleship.html");
};
