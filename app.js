// Asignamos a variables los elementos del DOM de la página HTML con los que vamos a trabajar
const contenedorTableros = document.querySelector("#contenedor-tableros");
const contenedorBarcos = document.querySelector(".contenedor-barcos");
const rotarButton = document.querySelector("#rotar-btn");
const startButton = document.querySelector("#start-btn");
const infoDisplay = document.querySelector("#info");
const turnDisplay = document.querySelector("#turn-display");
const contadorTurnosDisplay = document.querySelector("#contador-turnos");
const contenedorShips = document.querySelector(".contenedor-contenedor-ships");

// Asignamos a variables los audios que vamos a utilizar en la página de juego (Efectos de sonido y música de fondo)
let estadoAudio = true;
let audioButton = document.getElementById("audioButton");
let audioImage = document.getElementById("audioImage");
let audioTheme = document.getElementById("audio-theme");
audioTheme.volume = "0.2";
let audioImpactado = document.getElementById("audio-impactado");
audioImpactado.volume = "0.6";
let audioDestruido = document.getElementById("audio-destruido");
let audioFallado = document.getElementById("audio-fallado");

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

/* Array de turnos que vamos a utilizar para controlar los turnos que se realizan en el juego con un "REDUCE" */
let turnos = [1];

turnDisplay.textContent = "Posiciona los barcos en el tablero.";
infoDisplay.textContent =
  "Coloca todos los barcos en el tablero para poder comenzar la partida.";

// Rotar barcos para colocarlos en el tablero
let rotacion = 0;
function rotar() {
  const barcos = Array.from(contenedorBarcos.children);
  rotacion = rotacion === 0 ? 90 : 0;
  barcos.forEach((barco) => (barco.style.transform = `rotate(${rotacion}deg)`));
}

rotarButton.addEventListener("click", rotar);

// Crear tablero
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

crearTablero("user");
crearTablero("ordenador");

//Crear barcos
class barco {
  constructor(id, nombre, celdas, posiciones, destruido) {
    this.id = id;
    this.nombre = nombre;
    this.celdas = celdas;
    this.posiciones = posiciones;
    this.destruido = destruido;
  }
}

class submarine extends barco {
  constructor(profundidad) {
    super(0, "submarine", 1, [], false);
    this.profundidad = profundidad;
  }

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

// Crear barcosOrdenador
const submarineOrdenador1 = new submarine(30);
const submarineOrdenador2 = new submarine(20);
const destroyerOrdenador1 = new destroyer(2);
const destroyerOrdenador2 = new destroyer(3);
const cruiserOrdenador1 = new cruiser(13);
const battleshipOrdenador1 = new battleship(6);
const carrierOrdenador1 = new carrier(7);

const barcosOrdenador = [
  submarineOrdenador1,
  submarineOrdenador2,
  destroyerOrdenador1,
  destroyerOrdenador2,
  cruiserOrdenador1,
  battleshipOrdenador1,
  carrierOrdenador1,
];

// Crear barcosUser
const submarineUser1 = new submarine(33);
const submarineUser2 = new submarine(18);
const destroyerUser1 = new destroyer(3);
const destroyerUser2 = new destroyer(3);
const cruiserUser1 = new cruiser(15);
const battleshipUser1 = new battleship(5);
const carrierUser1 = new carrier(6);

const barcosUser = [
  submarineUser1,
  submarineUser2,
  destroyerUser1,
  destroyerUser2,
  cruiserUser1,
  battleshipUser1,
  carrierUser1,
];

// Prototipo mensaje destruccion
barco.prototype.mensajeDestruccion = function () {
  console.log("El barco ha sido destruido");
  infoDisplay.textContent = "El barco ha sido destruido";
};

const nombresBarcos = barcosOrdenador.map((ship) => {
  return { nombre: ship.nombre, celdas: ship.celdas };
});

nombresBarcos.sort((a, b) => {
  if (a.nombre < b.nombre) {
    return -1;
  } else if (a.nombre > b.nombre) {
    return 1;
  } else {
    return 0;
  }
});

console.log("sorteao", nombresBarcos);

/***************************************************** */
const dbName = "BattleshipDB";
const storeName = "Barcos";

// Abrir la base de datos
const request = indexedDB.open(dbName, 1);

// Manejar errores en caso de que no se pueda abrir la base de datos
request.onerror = (event) => {
  console.log("Error al abrir la base de datos", event.target.errorCode);
};

// Si se abre correctamente, almacenar los datos en la base de datos
request.onsuccess = (event) => {
  const db = event.target.result;

  // Iniciar una transacción de escritura
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);

  // Asumiendo que los arrays tienen una propiedad "id" única
  objectStore.add({ id: "barcosDisponibles", data: nombresBarcos });

  // Manejar errores en caso de que no se puedan almacenar los datos
  transaction.onerror = (event) => {
    console.log("Error al almacenar los datos", event.target.errorCode);
  };

  // Cerrar la transacción y la base de datos
  transaction.oncomplete = () => {
    db.close();
  };
};

// Crear la estructura de la base de datos si es necesario
request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Crear la tabla si no existe
  if (!db.objectStoreNames.contains(storeName)) {
    const objectStore = db.createObjectStore(storeName, { keyPath: "id" });
  }
};
/************************************************* */

/************************************************* */
localStorage.setItem("barcosDisponibles", JSON.stringify(nombresBarcos));
// Consulta desde web storage
let dadesWebStorage = localStorage.getItem("barcosDisponibles");
console.log(
  "Barcos disponibles en el juego desde web storage --> ",
  JSON.parse(dadesWebStorage)
);
/************************************************* */

const barcosOrdenadorDestruidos = [];
const barcosUserDestruidos = [];

// Asignar id con for of
let i = 0;
for (barcoUser of barcosUser) {
  barcoUser.id = i;
  i++;
}

console.log("COMPROBAR ID BARCOS USER", barcosUser);

let notDropped;

function getValidity(celdasTablero, isHorizontal, startIndex, barco) {
  let validStart = isHorizontal
    ? startIndex <= width * width - barco.celdas
      ? startIndex
      : width * width - barco.celdas
    : // Handle vertical
    startIndex <= width * width - width * barco.celdas
    ? startIndex
    : startIndex - barco.celdas * width + width;

  // Se puede probar a hacer Set
  bloquesBarco = [];

  for (let i = 0; i < barco.celdas; i++) {
    if (isHorizontal) {
      bloquesBarco.push(celdasTablero[Number(validStart) + i]);
    } else {
      bloquesBarco.push(celdasTablero[Number(validStart) + i * width]);
    }
  }

  let valid;
  //Horizontal else vertical
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

  setBloquesBarco = new Set(bloquesBarco);

  return { setBloquesBarco, valid, notTaken };
}

posicionesBarcos = [];

let cmpt = 0;

const addBarcos = (user, barco, startId) => {
  const celdasTablero = document.querySelectorAll(`#${user} div`);
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = user === "user" ? rotacion === 0 : randomBoolean;
  let randomStartIndex = Math.floor(Math.random() * width * width);

  let startIndex = startId ? startId : randomStartIndex;

  const { setBloquesBarco, valid, notTaken } = getValidity(
    celdasTablero,
    isHorizontal,
    startIndex,
    barco
  );

  if (valid && notTaken) {
    if (user === "ordenador") {
      posicionesBarcos.push(setBloquesBarco);
      setBloquesBarco.forEach((bloqueBarco) => {
        bloqueBarco.classList.add(barco.nombre);
        bloqueBarco.classList.add("taken");

        barco.posiciones = setBloquesBarco;
      });
    } else if (user === "user") {
      posicionesBarcos.push(setBloquesBarco);
      setBloquesBarco.forEach((bloqueBarco) => {
        bloqueBarco.classList.add(barco.nombre);
        bloqueBarco.classList.add("taken");

        barco.posiciones = bloquesBarco;
      });
    }

    if (user === "user") {
      barcosUser[barco.id].posiciones = barco.posiciones;
    }
  } else {
    if (user === "ordenador") addBarcos("ordenador", barco, startId);
    if (user === "user") notDropped = true;
  }
};

barcosOrdenador.forEach((barco) => addBarcos("ordenador", barco));
console.log("BARCOS ORDENADOR:", barcosOrdenador);

// drag and drop mover barcos jugador
let draggedShip;
const optionShips = Array.from(contenedorBarcos.children);

// ***** Función dinámica creada a través del constructor
var dragStart = new Function(
  "e",
  "notDropped = false; draggedShip = e.target; console.log(draggedShip);"
);

const dragOver = (e) => {
  e.preventDefault();
  const barco = barcosUser[draggedShip.id];
  highlightArea(e.target.id, barco);
};

const dropShip = (e) => {
  const startId = e.target.id;
  const ship = barcosUser[draggedShip.id];
  console.log("barco player:", ship);
  addBarcos("user", ship, startId);
  celdasTableroJugador.forEach((celda) => celda.classList.remove("hover"));

  if (!notDropped) {
    draggedShip.remove();
  }
};

optionShips.forEach((optionShip) =>
  optionShip.addEventListener("dragstart", dragStart)
);

const celdasTableroJugador = document.querySelectorAll("#user div");
celdasTableroJugador.forEach((celda) => {
  celda.addEventListener("dragover", dragOver);
  celda.addEventListener("drop", dropShip);
});

// Highlight
function highlightArea(startIndex, ship) {
  const celdasTableroJugador = document.querySelectorAll("#user div");
  let isHorizontal = rotacion === 0;
  console.log("startID:", startIndex);
  console.log("ship:", ship);

  const { setBloquesBarco, valid, notTaken } = getValidity(
    celdasTableroJugador,
    isHorizontal,
    startIndex,
    ship
  );
  if (valid && notTaken) {
    console.log("Setbloquesbarcohover:", setBloquesBarco);
    //Recorre todas las celdas y si la celda corresponde al barco la pinta.
    celdasTableroJugador.forEach((celda) => {
      if (setBloquesBarco.has(celda)) {
        celda.classList.add("hover");
      } else {
        celda.classList.remove("hover");
      }
    });
  } else {
    celdasTableroJugador.forEach((celda) => celda.classList.remove("hover"));
  }
}

let gameOver;
let playerTurn;

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

startButton.addEventListener("click", startButtonPresionado);

//Start Game
function startGame() {
  if (contenedorBarcos.children.length != 0) {
    infoDisplay.textContent = "Debes colocar todos los barcos para empezar.";
  } else {
    console.log("BARCOSUSERBIEN:", barcosUser);
    console.log("BARCOSORDENADORBIEN:", barcosOrdenador);
    contadorTurnosDisplay.textContent = "1";
    turnDisplay.textContent = "Jugador";
    infoDisplay.textContent = "Toca una celda para disparar.";
    const celdasTableroOrdenador = document.querySelectorAll("#ordenador div");
    celdasTableroOrdenador.forEach((celda) =>
      celda.addEventListener("click", handleClick)
    );
  }
}

let ordenadorDerribados = [];
let jugadoresDerribados = [];
const playerSunkShips = [];
const computerSunkShips = [];

function handleClick(e) {
  if (!gameOver) {
    if (e.target.classList.contains("taken")) {
      e.target.classList.add("boom");
      infoDisplay.textContent = "¡Has tocado un barco!";
      // BARCO TOCADO SONIDO
      audioImpactado.play();
      let classes = Array.from(e.target.classList);
      console.log(classes);
      // Filtramos quitando celda
      classes = classes.filter((className) => className !== "celda");
      // Filtramos quitando taken
      classes = classes.filter((className) => className !== "taken");
      // Filtramos quitando boom
      classes = classes.filter((className) => className !== "boom");
      ordenadorDerribados.push(...classes);
      ordenadorDerribados.push(parseInt(e.target.id));
      console.log("ordenadorDerribados:", ordenadorDerribados);
      checkScore("ordenador", ordenadorDerribados, playerSunkShips);
    }
    if (!e.target.classList.contains("taken")) {
      //Aqui
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
    turnDisplay.textContent = "Juego finalizado";
    infoDisplay.textContent = "El juego ha terminado.";
  }
}

// Turno del ordenador
function computerTurn() {
  if (!gameOver) {
    turnDisplay.textContent = "Ordenador";
    infoDisplay.textContent = "El ordenador está disparando...";

    setTimeout(() => {
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
      } else if (
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
        checkScore("user", jugadoresDerribados, computerSunkShips);
      } else {
        infoDisplay.textContent = "El ordenador no ha tocado ningún barco.";
        audioFallado.play();
        celdasTableroJugador[randomIndex].classList.add("empty");
      }
    }, 2000);

    setTimeout(() => {
      playerTurn = true;
      turnos.push(1);
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
    turnDisplay.textContent = "Juego finalizado";
    infoDisplay.textContent = "El juego ha terminado.";
  }
}

function checkScore(user, arrayDerribados, userSunkShips) {
  function checkShip(barco, arrayDerribados) {
    barco.posiciones.forEach((prueba) => {
      for (let i = 0; i < arrayDerribados.length; i++) {
        if (arrayDerribados[i] == prueba.id) {
          prueba.id = "tocado";
          console.log(barco);
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
      //BARCO DESTRUIDO SONIDO
      audioDestruido.play();
    }
  }

  if (user === "ordenador") {
    // CHECK DE TODOS LOS BARCOS
    barcosOrdenador.forEach((barco) => checkShip(barco, arrayDerribados));

    // CHECKEO DE BARCOS DESTRUIDOS POST CHECK
    barcosOrdenador.forEach((barquilloOrd) => {
      if (barquilloOrd.destruido) {
        barquilloOrd.mensajeDestruccion();
        const index = barcosOrdenador.indexOf(barquilloOrd);
        barcosOrdenadorDestruidos.push(barquilloOrd);
        barcosOrdenador.splice(index, 1);
        console.log("BarcosOrdenadorDestruidos:", barcosOrdenadorDestruidos);
        console.log("BarcosOrdenador:", barcosOrdenador);
      }
    });
  }
  if (user === "user") {
    // CHECK DE TODOS LOS BARCOS
    barcosUser.forEach((barquilloUser) =>
      checkShip(barquilloUser, arrayDerribados)
    );

    // CHECKEO DE BARCOS DESTRUIDOS POST CHECK
    barcosUser.forEach((barquilloUser) => {
      if (barquilloUser.destruido) {
        barquilloUser.mensajeDestruccion();
        const index = barcosUser.indexOf(barquilloUser);
        barcosUserDestruidos.push(barquilloUser);
        barcosUser.splice(index, 1);
        console.log("BarcosUserDestruidos:", barcosUserDestruidos);
        console.log("BarcosUser:", barcosUser);
      }
    });
  }
  console.log("CELDAAAAAAAAAAAAAAAA");
  if (barcosOrdenadorDestruidos.length == 7) {
    gameOver = true;
  }
  if (barcosUserDestruidos == 7) {
    gameOver = true;
  }
}
