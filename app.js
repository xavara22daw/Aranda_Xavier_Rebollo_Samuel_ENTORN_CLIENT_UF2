//import { submarine, destroyer, cruiser, battleship, carrier } from "./barcos";

//bloqueBarco cada bloque de barco especifico
//bloquesBarco bloques de barco especifico

const contenedorTableros = document.querySelector("#contenedor-tableros");
const contenedorBarcos = document.querySelector(".contenedor-barcos");
const rotarButton = document.querySelector("#rotar-btn");
const startButton = document.querySelector("#start-btn");
const infoDisplay = document.querySelector("#info");
const turnDisplay = document.querySelector("#turn-display");

turnDisplay.textContent = "Posicionar barcos"
infoDisplay.textContent = "Coloque los barcos en su tablero para empezar la partida!"

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
  constructor() {
    super(0, "submarine", 1, [], false);
  }
}

class destroyer extends barco {
  constructor() {
    super(0, "destroyer", 2, [], false);
  }
}

class cruiser extends barco {
  constructor() {
    super(0, "cruiser", 3, [], false);
  }
}

class battleship extends barco {
  constructor() {
    super(0, "battleship", 4, [], false);
  }
}

class carrier extends barco {
  constructor() {
    super(0, "carrier", 5, [], false);
  }
}

// Crear barcosOrdenador
const submarineOrdenador1 = new submarine();
const submarineOrdenador2 = new submarine();
const destroyerOrdenador1 = new destroyer();
const destroyerOrdenador2 = new destroyer();
const cruiserOrdenador1 = new cruiser();
const battleshipOrdenador1 = new battleship();
const carrierOrdenador1 = new carrier();

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
const submarineUser1 = new submarine();
const submarineUser2 = new submarine();
const destroyerUser1 = new destroyer();
const destroyerUser2 = new destroyer();
const cruiserUser1 = new cruiser();
const battleshipUser1 = new battleship();
const carrierUser1 = new carrier();

const barcosUser = [
  submarineUser1,
  submarineUser2,
  destroyerUser1,
  destroyerUser2,
  cruiserUser1,
  battleshipUser1,
  carrierUser1,
];
// Asignar id con for of
let i = 0;
for (barcoUser of barcosUser) {
  barcoUser.id = i;
  i++;
}

console.log("COMPROBAR ID BARCOS USER", barcosUser);

//Poner en indexedDB

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

  return { bloquesBarco, valid, notTaken };
}

posicionesBarcos = [];

let cmpt = 0;

const addBarcos = (user, barco, startId) => {
  // Se puede probar a hacer Set
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

  if (valid && notTaken) {
    posicionesBarcos.push(bloquesBarco);
    bloquesBarco.forEach((bloqueBarco) => {
      bloqueBarco.classList.add(barco.nombre);
      bloqueBarco.classList.add("taken");

      barco.posiciones = bloquesBarco;
    });
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

const dragStart = (e) => {
  notDropped = false;
  draggedShip = e.target;
  console.log(draggedShip);
};
//HACER DINAMICA
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

  const { bloquesBarco, valid, notTaken } = getValidity(
    celdasTableroJugador,
    isHorizontal,
    startIndex,
    ship
  );
  if (valid && notTaken) {
    //Recorre todas las celdas y si la celda corresponde al barco la pinta.
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

let gameOver = false;
let playerTurn;

startButton.addEventListener("click", startGame);
//Start Game
function startGame() {
  if (contenedorBarcos.children.length != 0) {
    infoDisplay.textContent = "Debes colocar todos los barcos para empezar.";
  } else {
    console.log("BARCOSUSERBIEN:", barcosUser);
    console.log("BARCOSORDENADORBIEN:", barcosOrdenador);
    turnDisplay.textContent = "Tu turno";
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
      infoDisplay.textContent = "Has tocado un barco!";
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
      infoDisplay.textContent = "No has tocado ningún barco.";
      e.target.classList.add("empty");
    }
    playerTurn = false;
    const celdasTableroOrdenador = document.querySelectorAll("#ordenador div");
    celdasTableroOrdenador.forEach((celda) =>
      celda.replaceWith(celda.cloneNode(true))
    );
    setTimeout(computerTurn, 2000);
  }
}

// Turno del ordenador
function computerTurn() {
  if (!gameOver) {
    turnDisplay.textContent = "Turno del ordenador";
    infoDisplay.textContent = "El ordenador está disparando...";

    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * width * width);
      const celdasTableroJugador = document.querySelectorAll("#user div");

      // Si la la celda ya es un barco tocado, vuelve a disparar.
      if (
        celdasTableroJugador[randomIndex].classList.contains("taken") &&
        celdasTableroJugador[randomIndex].classList.contains("boom") || celdasTableroJugador[randomIndex].classList.contains("empty")
      ) {
        computerTurn();
        return;
      } else if (
        celdasTableroJugador[randomIndex].classList.contains("taken") &&
        !celdasTableroJugador[randomIndex].classList.contains("boom")
      ) {
        celdasTableroJugador[randomIndex].classList.add("boom");
        infoDisplay.textContent = "El ordenador ha tocado un barco!";
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
        celdasTableroJugador[randomIndex].classList.add("empty");
      }
    }, 2000);

    setTimeout(() => {
      playerTurn = true;
      turnDisplay.textContent = "Tu turno";
      infoDisplay.textContent = "Toca una celda para disparar.";
      const celdasTableroOrdenador =
        document.querySelectorAll("#ordenador div");
      celdasTableroOrdenador.forEach((celda) =>
        celda.addEventListener("click", handleClick)
      );
    }, 4000);
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
    }
  }

  let cmptDestruidos = 0;
  if (user === "ordenador") {
    barcosOrdenador.forEach((barco) => checkShip(barco, arrayDerribados));
    barcosOrdenador.forEach((barquilloOrd) => {
      if (barquilloOrd.destruido) cmptDestruidos++;
    });
  }
  if (user === "user") {
    barcosUser.forEach((barco) => checkShip(barco, arrayDerribados));
    barcosUser.forEach((barquilloUser) => {
      if (barquilloUser.destruido) cmptDestruidos++;
    });
  }
  if (cmptDestruidos == 7) {
    console.log("SE HAN DESTRUIDO ABSOLUTAMENTE TODOS LOS BARCOS");
  }
}
