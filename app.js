// Asignamos a variables los elementos del DOM de la página HTML con los que vamos a trabajar
const contenedorTableros = document.querySelector("#contenedor-tableros");
const contenedorBarcos = document.querySelector(".contenedor-barcos");
const rotarButton = document.querySelector("#rotar-btn");
const startButton = document.querySelector("#start-btn");
const infoDisplay = document.querySelector("#info");
const turnDisplay = document.querySelector("#turn-display");
const contadorTurnosDisplay = document.querySelector("#contador-turnos");
const contenedorShips = document.querySelector(".contenedor-contenedor-ships");
const mensajeBarcosDisp = document.querySelector("#mensaje-disponibilidad");
const tituloJuego = document.querySelector("#titulo")

// Asignamos a variables los audios que vamos a utilizar en la página de juego (Efectos de sonido y música de fondo)
let estadoAudio = true;
const audioButton = document.getElementById("audioButton");
const audioImage = document.getElementById("audioImage");
const audioTheme = document.getElementById("audio-theme");
audioTheme.volume = "0.2";
const audioImpactado = document.getElementById("audio-impactado");
audioImpactado.volume = "0.6";
const audioDestruido = document.getElementById("audio-destruido");
const audioFallado = document.getElementById("audio-fallado");
const audioVictoria = document.getElementById("audio-victoria");
audioVictoria.volume = "0.4";

// ***** Expresión regular -> Sustituimos el texto de un elemento del DOM
let expressio = /(Hundir la flota|Batalla de barcos)/g;
let cadena = tituloJuego.innerHTML;
let cadenaRegExp = cadena.replace(expressio, "BATTLESHIP");
tituloJuego.innerHTML = `${cadenaRegExp}`;

// Función para poder controlar el audio de fondo de la página, y controlar los botones de "pause" y "play"
function controladorAudio() {
  if (estadoAudio) {
    // Cambiamos la imagen y pausamos el audio
    audioImage.src = "assets/images/play.png";
    audioTheme.pause();
    estadoAudio = false;
  } else {
    // Cambiamos la imagen y reanudamos el audio
    audioImage.src = "assets/images/pause.png";
    audioTheme.play();
    estadoAudio = true;
  }
}

// Al hacer clic sobre el botón, llamamos a la función 'controlarAudio()'
audioButton.onclick = function () {
  controladorAudio();
};

// Array de turnos que vamos a utilizar para controlar los turnos que se realizan en el juego con un "REDUCE"
let turnos = [1];

// Array que contiene un array con los nombres de los barcos que el usuario tiene que colocar. Se mostrará sorteado en la pantalla de juego
let textoBarcosDisp = [
  "Submarino x2",
  "Destructor x2",
  "Crucero",
  "Acorazado",
  "Portaaviones",
];

// ***** Sort implementado -> Ordenamos el array "textoBarcosDisp" con sort en orden alfabético
textoBarcosDisp.sort();

// Bucle para mostrar en la pantalla de juego mediante texto todos los barcos disponibles en el array "textoBarcosDisp"
for (let i = 0; i < textoBarcosDisp.length; i++) {
  if (i < textoBarcosDisp.length - 1) {
    mensajeBarcosDisp.innerHTML += `${textoBarcosDisp[i]}, `;
  } else {
    mensajeBarcosDisp.innerHTML += `${textoBarcosDisp[i]}`;
  }
}

// Mensajes informativos en la página de juego previos al comienzo de la partida
turnDisplay.textContent = "Posiciona los barcos en el tablero.";
infoDisplay.textContent =
  "Coloca todos los barcos en el tablero para poder comenzar la partida.";

// Función para rotar los barcos para colocarlos en el tablero
let rotacion = 0;
function rotar() {
  const barcos = Array.from(contenedorBarcos.children);
  rotacion = rotacion === 0 ? 90 : 0;
  barcos.forEach((barco) => (barco.style.transform = `rotate(${rotacion}deg)`));
}

// Cuando presionamos el botón para rotar los barcos, estos hacen una rotación
rotarButton.addEventListener("click", rotar);

// ***** Arrow function -> Función que crea los tableros del jugador y el ordenador y le proporciona estilo
const width = 10;
const crearTablero = (usuario) => {
  const contenedorTablero = document.createElement("div");
  contenedorTablero.classList.add("tablero");
  contenedorTablero.style.backgroundColor = "#00AAFF";
  contenedorTablero.id = usuario;

  for (let i = 0; i < width * width; i++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    celda.id = i;
    contenedorTablero.append(celda);
  }

  contenedorTableros.append(contenedorTablero);
};

// Llamamos a la funciones para crear los tableros del jugador y el ordenador
crearTablero("user");
crearTablero("ordenador");

// ***** Clases amb atributs i mètodes, herència i polimorfisme -> Clases que nos servirán para crear los objetos de los barcos
class barco {
  constructor(id, nombre, celdas, posiciones, destruido) {
    this.id = id;
    this.nombre = nombre;
    this.celdas = celdas;
    this.posiciones = posiciones;
    this.destruido = destruido;
  }
}

// ***** Herencia -> Herencia de la clase "Barco"
class submarine extends barco {
  constructor(profundidad) {
    super(0, "submarine", 1, [], false);
    this.profundidad = profundidad;
  }

  // ***** Método con polimorfismo
  mensajeDestruccion() {
    console.log("El submarino ha sido destruido");
    const infoDisplay = document.querySelector("#info");
    infoDisplay.textContent = "El submarino ha sido destruido";
  }
}

class destroyer extends barco {
  constructor(cañones) {
    super(0, "destroyer", 2, [], false);
    this.cañones = cañones;
  }

  mensajeDestruccion() {
    console.log("El destructor ha sido destruido");
    infoDisplay.textContent = "El destructor ha sido destruido";
  }
}

class cruiser extends barco {
  constructor(velocidad) {
    super(0, "cruiser", 3, [], false);
    this.velocidad = velocidad;
  }

  mensajeDestruccion() {
    console.log("El crucero ha sido destruido");
    infoDisplay.textContent = "El crucero ha sido destruido";
  }
}

class battleship extends barco {
  constructor(resistencia) {
    super(0, "battleship", 4, [], false);
    this.resistencia = resistencia;
  }

  mensajeDestruccion() {
    console.log("El acorazado ha sido destruido");
    infoDisplay.textContent = "El acorazado ha sido destruido";
  }
}

class carrier extends barco {
  constructor(capacidadAviones) {
    super(0, "carrier", 5, [], false);
    this.capacidadAviones = capacidadAviones;
  }

  mensajeDestruccion() {
    console.log("El portaaviones ha sido destruido");
    infoDisplay.textContent = "El portaaviones ha sido destruido";
  }
}

// Creamos objetos utilizando las clases. Estos serán los barcos del ordenador
const submarineOrdenador1 = new submarine(30);
const submarineOrdenador2 = new submarine(20);
const destroyerOrdenador1 = new destroyer(2);
const destroyerOrdenador2 = new destroyer(3);
const cruiserOrdenador1 = new cruiser(13);
const battleshipOrdenador1 = new battleship(6);
const carrierOrdenador1 = new carrier(7);

// Añadimos todos los barcos del ordenador a un array
const barcosOrdenador = [
  submarineOrdenador1,
  submarineOrdenador2,
  destroyerOrdenador1,
  destroyerOrdenador2,
  cruiserOrdenador1,
  battleshipOrdenador1,
  carrierOrdenador1,
];

// Creamos objetos utilizando las clases. Estos serán los barcos del user
const submarineUser1 = new submarine(33);
const submarineUser2 = new submarine(18);
const destroyerUser1 = new destroyer(3);
const destroyerUser2 = new destroyer(3);
const cruiserUser1 = new cruiser(15);
const battleshipUser1 = new battleship(5);
const carrierUser1 = new carrier(6);

// Añadimos todos los barcos del usuario a un array
const barcosUser = [
  submarineUser1,
  submarineUser2,
  destroyerUser1,
  destroyerUser2,
  cruiserUser1,
  battleshipUser1,
  carrierUser1,
];

// ***** Prototipaje -> Creamos un prototipo de mensaje destrucción para la clase barco
barco.prototype.mensajeDestruccion = function () {
  console.log("El barco ha sido destruido");
  infoDisplay.textContent = "El barco ha sido destruido";
};

// ***** MAP implementado -> Creamos un Map para guardar los nombres de los barcos disponibles en el juego
let nombresBarcos = new Map();

// ***** Colección map implementada -> Utilizamos la colección map para añadir elementos al array "nombresBarcos"
nombresBarcos = barcosOrdenador.map((ship, index) => {
  return [
    "Barco_" + parseInt(index + 1),
    { nombre: ship.nombre, celdas: ship.celdas },
  ];
});

// ***** IndexedDB -> Guardamos en IndexedDB los nombres de todos los ordenadores disponibles en el juego
/***************************************************************************************************** */
const dbName = "BattleshipDB";
const storeName = "Barcos";

// Abrimos la base de datos
const request = indexedDB.open(dbName, 1);

// Manejamos errores en caso de que no se pueda abrir la base de datos
request.onerror = (event) => {
  console.log("Error al abrir la base de datos", event.target.errorCode);
};

// Si la DB se abre correctamente, almacenamos los datos en la base de datos
request.onsuccess = (event) => {
  const db = event.target.result;

  // Iniciar una transacción de escritura
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);

  // Asumimos que los arrays tienen una propiedad "id" única
  objectStore.add({ id: "barcosDisponibles", data: nombresBarcos });

  // Cerramos la operación y la base de datos
  transaction.oncomplete = () => {
    db.close();
  };
};

// Creamos la estructura de la base de datos si es necesario
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Creamos la tabla si no existe
  if (!db.objectStoreNames.contains(storeName)) {
    const objectStore = db.createObjectStore(storeName, { keyPath: "id" });
  }
};
/***************************************************************************************************** */

// ***** WeStorage/LocalStorage -> Guardamos en localstorage los nombres de todos los ordenadores disponibles en el juego
/***************************************************************************************************** */
localStorage.setItem("barcosDisponibles", JSON.stringify(nombresBarcos));
// Consulta desde web storage
let queryWebStorage = localStorage.getItem("barcosDisponibles");
queryWebStorage = JSON.parse(queryWebStorage);
let dadesWebStorage = Object.fromEntries(queryWebStorage);

// ***** Colección for-in implementada -> Utilizamos esta colección para recorrer el array y mostrar por consola los nombres de todos los barcos disponibles
for (const key in dadesWebStorage) {
  console.log(
    "Datos consultados desde web storage y mostrados con un for-in:",
    `${key}: nombre -> ${dadesWebStorage[key].nombre}, celdas -> ${dadesWebStorage[key].celdas}`
  );
}
/***************************************************************************************************** */

// Creamos varios Arrays para guardar los barcos que han sido destruidos
const barcosOrdenadorDestruidos = [];
const barcosUserDestruidos = [];

// ***** Colección for-of implementada -> Utilizamos esta colección para asignar un id al array "barcosUser"
let i = 0;
for (barcoUser of barcosUser) {
  barcoUser.id = i;
  i++;
}

// Variable que utilizaremos para comprobar si hemos arrastrado un barco con D&D
let notDropped;

// Función para comprobar si la posición en la que se coloca el barco con D&D es correcta o no
function getValidity(celdasTablero, isHorizontal, startIndex, barco) {
  let validStart = isHorizontal
    ? startIndex <= width * width - barco.celdas
      ? startIndex
      : width * width - barco.celdas
    : // Controlador en caso de que el barco esté en posición vertical
    startIndex <= width * width - width * barco.celdas
    ? startIndex
    : startIndex - barco.celdas * width + width;

  // Este array guarda las posiciones que tendrá cada barco
  bloquesBarco = [];

  for (let i = 0; i < barco.celdas; i++) {
    if (isHorizontal) {
      bloquesBarco.push(celdasTablero[Number(validStart) + i]);
    } else {
      bloquesBarco.push(celdasTablero[Number(validStart) + i * width]);
    }
  }

  let valid;

  // Pequeño controlador que utilizamos para controlar y colocar los barcos dependiendo de su orientzación (vertical/horizontal)
  if (isHorizontal) {
    bloquesBarco.every(
      (_bloqueBarco, index) =>
        (valid =
          bloquesBarco[0].id % width !==
          width - (bloquesBarco.length - (index + 1)))
    );
  } else {
    bloquesBarco.every(
      (_bloqueBarco, index) =>
        (valid = bloquesBarco[0].id < 90 + (width * index + 1))
    );
  }

  const notTaken = bloquesBarco.every(
    (bloqueBarco) => !bloqueBarco.classList.contains("taken")
  );

  return { bloquesBarco, valid, notTaken };
}

// ***** Set implementado -> Implementamos un Set donde vamos a guardar las posiciones de los barcos
posicionesBarcos = new Set();

let cmpt = 0;

// Función para colocar los barcos en los tableros (tanto para el ordenador como para el usuario)
const addBarcos = (user, barco, startId) => {
  const celdasTablero = document.querySelectorAll(`#${user} div`);
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = user === "user" ? rotacion === 0 : randomBoolean;
  let randomStartIndex = Math.floor(Math.random() * width * width);

  let startIndex = startId ? startId : randomStartIndex;

  const { bloquesBarco, valid, notTaken } = getValidity(
    celdasTablero,
    isHorizontal,
    startIndex,
    barco
  );

  // Si las posiciones donde se va a colocar un barco son validas y no están cogidas, el barco puede ser añadido a esas posiciones
  if (valid && notTaken) {
    // Para colocar los barcos del ordenador
    if (user === "ordenador") {
      posicionesBarcos.add(bloquesBarco);
      bloquesBarco.forEach((bloqueBarco) => {
        bloqueBarco.classList.add(barco.nombre+"Ord");
        bloqueBarco.classList.add("taken");

        barco.posiciones = bloquesBarco;
      });
    // Para colocar los barcos del usuario
    } else if (user === "user") {
      posicionesBarcos.add(bloquesBarco);
      bloquesBarco.forEach((bloqueBarco) => {
        bloqueBarco.classList.add(barco.nombre);
        bloqueBarco.classList.add("taken");

        barco.posiciones = bloquesBarco;
      });
    }

    // Actualizamos la posición del barco que se coloca con D&D del array "barcoUser"
    if (user === "user") {
      barcosUser[barco.id].posiciones = barco.posiciones;
    }
  } else {
    if (user === "ordenador") addBarcos("ordenador", barco, startId);
    if (user === "user") notDropped = true;
  }
};

// ***** foreach implementado -> Bucle foreach utilizado para iterar por el array "barcosOrdenador"
barcosOrdenador.forEach((barco) => addBarcos("ordenador", barco));

// ***** Drag And Drop implementado -> D&D para mover los barcos del jugador
let draggedShip;
const optionShips = Array.from(contenedorBarcos.children);

// ***** Función dinámica implementa -> Función creada a través del constructor
var dragStart = new Function(
  "e",
  "notDropped = false; draggedShip = e.target;"
);

// Función que controla cuando estamos arrastrando un barco por el tablero del usuario (proporciona el hover)
const dragOver = (e) => {
  e.preventDefault();
  const barco = barcosUser[draggedShip.id];
  highlightArea(e.target.id, barco);
};

// Función que controla cuando soltamos un barco el el trablero del usuario
const dropShip = (e) => {
  const startId = e.target.id;
  const ship = barcosUser[draggedShip.id];
  console.log("Barco dropeado:", ship);
  addBarcos("user", ship, startId);
  celdasTableroJugador.forEach((celda) => celda.classList.remove("hover"));

  if (!notDropped) {
    draggedShip.remove();
  }
};

optionShips.forEach((optionShip) =>
  optionShip.addEventListener("dragstart", dragStart)
);

// A cada celda del tablero del usuario añadimos las funciones del D&D que nos permitirán colocar nuestros barcos en el tablero
const celdasTableroJugador = document.querySelectorAll("#user div");
celdasTableroJugador.forEach((celda) => {
  celda.addEventListener("dragover", dragOver);
  celda.addEventListener("drop", dropShip);
});

// Función que nos permitirá realizar el efecto hover al arrastrar el barco por el tablero del usuario
function highlightArea(startIndex, ship) {
  const celdasTableroJugador = document.querySelectorAll("#user div");
  let isHorizontal = rotacion === 0;

  const { bloquesBarco, valid, notTaken } = getValidity(
    celdasTableroJugador,
    isHorizontal,
    startIndex,
    ship
  );

  if (valid && notTaken) {
    //Recorre todas las celdas y si la celda corresponde al barco la pinta
    celdasTableroJugador.forEach((celda) => {
      if (bloquesBarco.includes(celda)) {
        celda.classList.add("hover");
      } else {
        celda.classList.remove("hover");
      }
    });
  } else {
    celdasTableroJugador.forEach((celda) => celda.classList.remove("hover"));
  }
}

// Funciones de control sobre el juego
let gameOver;
let playerTurn;

// Función para comenzar el juego en el momento en el que se presione el botón de comenzar partida
const startButtonPresionado = () => {
  if (contenedorBarcos.children.length === 0) {
    startButton.remove();
    rotarButton.remove();
    contenedorShips.remove();
    const botonesContainer = document.querySelector(".botones-container");
    const nuevoDiv = document.createElement("div");
    nuevoDiv.textContent = "Reiniciar partida";
    nuevoDiv.classList.add("reiniciar-btn");
    botonesContainer.appendChild(nuevoDiv);
    nuevoDiv.addEventListener("click", function () {
      location.reload();
    });
    startGame();
  }
};

// Si presionamos el botón para comenzar partida, se ejecuta la función "startButtonPresionado"
startButton.addEventListener("click", startButtonPresionado);

// Función para comenzar el juego
function startGame() {
  if (contenedorBarcos.children.length != 0) {
    infoDisplay.textContent = "Debes colocar todos los barcos para empezar.";
  } else {
    console.log("Barcos del usuario:", barcosUser);
    console.log("Barcos del ordenador:", barcosOrdenador);
    contadorTurnosDisplay.textContent = "1";
    turnDisplay.textContent = "Jugador";
    infoDisplay.textContent = "Toca una celda para disparar.";
    const celdasTableroOrdenador = document.querySelectorAll("#ordenador div");
    celdasTableroOrdenador.forEach((celda) =>
      celda.addEventListener("click", handleClick)
    );
  }
}

// Declaramos varios arrays de control sobre el juego
let ordenadorTocados = [];
let jugadoresDerribados = [];
const computerSunkShips = [];

// Función para controlar los disparos del usuario sobre el tablero del ordenador
function handleClick(e) {
  if (!gameOver) {
    // En caso de impactar a una celda donde hay un barco
    if (e.target.classList.contains("taken")) {
      e.target.classList.add("boom");
      infoDisplay.textContent = "¡Has tocado un barco!";
      audioImpactado.play();
      let classes = Array.from(e.target.classList);
      // Filtramos para quitar los nombres de las clases y que solo quede el tipo de barco que es
      // Filtramos quitando celda
      classes = classes.filter((className) => className !== "celda");
      // Filtramos quitando taken
      classes = classes.filter((className) => className !== "taken");
      // Filtramos quitando boom
      classes = classes.filter((className) => className !== "boom");
      ordenadorTocados.push(...classes);
      ordenadorTocados.push(parseInt(e.target.id));
      console.log("ordenadorTocados:", ordenadorTocados);
      checkScore("ordenador", ordenadorTocados, );
    }
    if (!e.target.classList.contains("taken")) {
      // En caso de impactar a una celda donde NO hay un barco
      infoDisplay.textContent = "No has tocado ningún barco.";
      audioFallado.play();
      e.target.classList.add("empty");
    }
    playerTurn = false;
    const celdasTableroOrdenador = document.querySelectorAll("#ordenador div");
    celdasTableroOrdenador.forEach((celda) =>
      celda.replaceWith(celda.cloneNode(true))
    );
    setTimeout(computerTurn, 2000);
  } else if (gameOver) {
    // En caso de que gameOver sea true, el ordenador habrá ganado la partida y se indica por pantalla
    infoDisplay.textContent = "Has perdido, el ordenador ha ganado la partida.";
    turnDisplay.textContent = "La partida ha finalizado.";
    audioTheme.pause();
    audioVictoria.play();
  }
}

// Función para controlar los disparos y los turnos del ordenador
function computerTurn() {
  if (!gameOver) {
    turnDisplay.textContent = "Ordenador";
    infoDisplay.textContent = "El ordenador está disparando...";

    // timeOut para controlar el tiempo entre disparos del ordenador
    setTimeout(() => {
      // Generamos un número aleatorio donde el ordenador disparará al tablero de los usuarios 
      let randomIndex = Math.floor(Math.random() * width * width);
      const celdasTableroJugador = document.querySelectorAll("#user div");

      // Si la la celda ya es un barco tocado, vuelve a disparar.
      if (
        (celdasTableroJugador[randomIndex].classList.contains("taken") &&
          celdasTableroJugador[randomIndex].classList.contains("boom")) ||
        celdasTableroJugador[randomIndex].classList.contains("empty")
      ) {
        computerTurn();
        return;
      } // Si la celda es un barco y no está tocada controlamos el impacto.
      else if (
        celdasTableroJugador[randomIndex].classList.contains("taken") &&
        !celdasTableroJugador[randomIndex].classList.contains("boom")
      ) {
        celdasTableroJugador[randomIndex].classList.add("boom");
        infoDisplay.textContent = "El ordenador ha tocado un barco!";
        audioImpactado.play();
        let classes = Array.from(celdasTableroJugador[randomIndex].classList);
        // Filtramos quitando celda
        classes = classes.filter((className) => className !== "celda");
        // Filtramos quitando taken
        classes = classes.filter((className) => className !== "taken");
        // Filtramos quitando boom
        classes = classes.filter((className) => className !== "boom");
        jugadoresDerribados.push(...classes);
        jugadoresDerribados.push(
          parseInt(celdasTableroJugador[randomIndex].id)
        );
        // Checkeamos el score y los barcos.
        checkScore("user", jugadoresDerribados);
      } else {
        infoDisplay.textContent = "El ordenador no ha tocado ningún barco.";
        audioFallado.play();
        celdasTableroJugador[randomIndex].classList.add("empty");
      }
    }, 2000);

    setTimeout(() => {
      playerTurn = true;
      turnos.push(1);
      //***** Reduce implementado -> Reduce que utilizamos para aumentar los turnos del usuario
      const turnosTotales = turnos.reduce((acumulador, valorActual) => {
        return acumulador + valorActual;
      });
      contadorTurnosDisplay.textContent = turnosTotales;
      turnDisplay.textContent = "Jugador";
      infoDisplay.textContent = "Toca una celda para disparar.";
      const celdasTableroOrdenador =
        document.querySelectorAll("#ordenador div");
      celdasTableroOrdenador.forEach((celda) =>
        celda.addEventListener("click", handleClick)
      );
    }, 4000);
  } else if (gameOver) {
    // En caso de que gameOver sea true, el jugador habrá destruido todos los barcos y habrá ganado la partida
    infoDisplay.textContent = "Has ganado la partida, ¡Enhorabuena!.";
    turnDisplay.textContent = "La partida ha finalizado.";
    audioTheme.pause();
    audioVictoria.play();
  }
}

// Función para comprobar las puntuaciones (barcos impactados/destruidos)
function checkScore(user, arrayDerribados) {
  // Comprobamos si el barco ha sido destruido posición a posición.
  function checkShip(barco, arrayDerribados) {
    barco.posiciones.forEach((posicion) => {
      for (let i = 0; i < arrayDerribados.length; i++) {
        if (arrayDerribados[i] == posicion.id) {
          posicion.id = "tocado";
        }
      }
    });

    let compt = 0;
    for (let y = 0; y < barco.posiciones.length; y++) {
      if (barco.posiciones[y].id == "tocado") {
        compt++;
      }
    }

    if (compt == barco.posiciones.length) {
      barco.destruido = true;
      console.log("Barco destruido!")
      // Sonido de barco destruido
      audioDestruido.play();
    }
  }

  if (user === "ordenador") {
    // Comprobación de todos los barcos del ordenador
    barcosOrdenador.forEach((barco) => checkShip(barco, arrayDerribados));

    // Comprobación de todos los barcos destruidos después de haber comprobado anteriormente todos los barcos
    barcosOrdenador.forEach((barquilloOrd) => {
      if (barquilloOrd.destruido) {
        // Si el barco está destruido, indicamos un mensaje de destrucción implementado el método de las clases
        barquilloOrd.mensajeDestruccion();
        const index = barcosOrdenador.indexOf(barquilloOrd);
        barcosOrdenadorDestruidos.push(barquilloOrd);
        // ***** Splice implementado -> Eliminamos la posición del array del barco que ha sido destruido
        barcosOrdenador.splice(index, 1);
        console.log("BarcosOrdenadorDestruidos:", barcosOrdenadorDestruidos);
        console.log("BarcosOrdenador:", barcosOrdenador);
      }
    });
  }
  if (user === "user") {
    // Comprobación de todos los barcos del usuario.
    barcosUser.forEach((barquilloUser) =>
      checkShip(barquilloUser, arrayDerribados)
    );

    // Comprobación de todos los barcos del usuarios post check.
    barcosUser.forEach((barquilloUser) => {
      if (barquilloUser.destruido) {
        // Si el barco está destruido, indicamos un mensaje de destrucción implementado el método de las clases
        barquilloUser.mensajeDestruccion();
        const index = barcosUser.indexOf(barquilloUser);
        barcosUserDestruidos.push(barquilloUser);
        // ***** Splice implementado -> Eliminamos la posición del array del barco que ha sido destruido
        barcosUser.splice(index, 1);
        console.log("BarcosUserDestruidos:", barcosUserDestruidos);
        console.log("BarcosUser:", barcosUser);
      }
    });
  }
  // Si "barcosOrdenadorDestruidos" === 7, gameOver es true y el jugador ha gando la partida
  if (barcosOrdenadorDestruidos.length == 7) {
    gameOver = true;
  }
  // Si "barcosUserDestruidos" === 7, gameOver es true y el ordenador ha gando la partida
  if (barcosUserDestruidos == 7) {
    gameOver = true;
  }
}
