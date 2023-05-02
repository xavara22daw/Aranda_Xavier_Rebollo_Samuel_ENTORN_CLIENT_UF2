// Declaramos varias variables para tener un control sobre el audio y el botón que lo controla cogiendo los elementos del DOM
let estadoAudio = false;
let audioButton = document.getElementById("audioButton");
let audioImage = document.getElementById("audioImage");
let audio = document.getElementById("audio");

// Declaramos la función con la que vamos a controlar el audio y el botón de play/pause
function controladorAudio() {
  if (estadoAudio) {
    // Cambiamos la imagen y pausamos el audio
    audioImage.src = "assets/images/play.png";
    audio.pause();
    estadoAudio = false;
  } else {
    // Cambiamos la imagen y reanudamos el audio
    audioImage.src = "assets/images/pause.png";
    audio.play();
    estadoAudio = true;
  }
}

// Exportamos la función "controladorAudio", y también las variables "audio" y "audioButton"
export { controladorAudio, audio, audioButton };
