//import { submarine, destroyer, cruiser, battleship, carrier } from "./barcos";

//bloqueBarco cada bloque de barco especifico
//bloquesBarco bloques de barco especifico

const contenedorTableros = document.querySelector("#contenedor-tableros");
const contenedorBarcos = document.querySelector(".contenedor-barcos");
const rotarButton = document.querySelector("#rotar-btn");
const startButton = document.querySelector("#start-btn");
const infoDisplay = document.querySelector("#info");
const turnDisplay = document.querySelector("#turn-display");

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

const crearTablero = (color, usuario) => {
  const contenedorTablero = document.createElement("div");
  contenedorTablero.classList.add("tablero");
  contenedorTablero.style.backgroundColor = color;
  contenedorTablero.id = usuario;

  for (let i = 0; i < width * width; i++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    celda.id = i;
    contenedorTablero.append(celda);
  }

  contenedorTableros.append(contenedorTablero);
};

crearTablero("cyan", "user");
crearTablero("pink", "ordenador");

//Crear barcos
class barco {
  constructor(nombre, celdas, posiciones ,destruido) {
    this.nombre = nombre;
    this.celdas = celdas;
    this.posiciones = posiciones;
    this.destruido = destruido;
    

  }
}

class submarine extends barco {
  constructor() {
    super("submarine", 1, [], false);
  }
}

class destroyer extends barco {
  constructor() {
    super("destroyer", 2, [], false);
  }
}

class cruiser extends barco {
  constructor() {
    super("cruiser", 3, [], false);
  }
}

class battleship extends barco {
  constructor() {
    super("battleship", 4, [], false);
  }
}

class carrier extends barco {
  constructor() {
    super("carrier", 5, [], false);
  }
}

const submarine1 = new submarine();
const submarine2 = new submarine();
const destroyer1 = new destroyer();
const destroyer2 = new destroyer();
const cruiser1 = new cruiser();
const battleship1 = new battleship();
const carrier1 = new carrier();

//Poner en indexedDB
const barcos = [
  submarine1,
  submarine2,
  destroyer1,
  destroyer2,
  cruiser1,
  battleship1,
  carrier1,
];

barcosOrdenador = [];
barcosUser = [];

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
    if (user === "user") barcosUser.push(barco);
  } else {
    if (user === "ordenador") addBarcos("ordenador", barco, startId);
    if (user === "user") notDropped = true;
  }
};

barcos.forEach((barco) => addBarcos("ordenador", barco));
console.log("posicionesBarcos", posicionesBarcos);

console.log("BARCOOOOOS:",barcos);
barcosOrdenador = barcos;
console.log("ORDENADOR BARCAZOOOOOOS: ",barcosOrdenador)
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
  const barco = barcos[draggedShip.id];
  highlightArea(e.target.id, barco);
};

const dropShip = (e) => {
  const startId = e.target.id;
  const ship = barcos[draggedShip.id];
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
    console.log("barcosOrdenador:", barcosOrdenador);
    console.log("barcosUser:", barcosUser);
    const celdasTableroOrdenador = document.querySelectorAll("#ordenador div");
    celdasTableroOrdenador.forEach((celda) =>
      celda.addEventListener("click", handleClick)
    );
  }
}

let playerHits = [];
let computerHits = [];
const playerSunkShips = []
const computerSunkShips = []

function handleClick(e) {
  if (!gameOver) {
    if (e.target.classList.contains("taken")) {
      e.target.classList.add("boom");
      infoDisplay.textContent = "Has tocado un barco!";
      let classes = Array.from(e.classList);
      // Filtramos quitando celda
      classes = classes.filter((className) => className !== "celda");
      // Filtramos quitando taken
      classes = classes.filter((className) => className !== "taken");
      // Filtramos quitando boom
      classes = classes.filter((className) => className !== "boom");
      playerHits.push(...classes);
      checkScore('player', playerHits, playerSunkShips)
    }
    if (!e.target.classList.contain("taken")) {
      infoDisplay.textContent = "No has tocado ningún barco.";
      e.target.classList.add("empty");
    }
    playerTurn = false;
    const celdasTableroOrdenador = document.querySelectorAll("#ordenador div");
    celdasTableroOrdenador.forEach((celda) =>
      celda.replaceWith(celda.cloneNode(true))
    );
    setTimeout(computerTurn, 1000);
  }
}

// Turno del ordenador
function computerTurn() {
  if (!gameOver) {
    turnDisplay.textContent = "Turno del ordenador...";

    setTimeout(() => {
      let randomIndex = math.floor(math.random() * width * width);
      const celdasTableroJugador = document.querySelectorAll("#user div");

      // Si la la celda ya está tocada y es un barco, vuelve a tirar
      if (
        celdasTableroJugador[randomIndex].classList.contains("taken") &&
        celdasTableroJugador[randomIndex].classList.contains("boom")
      ) {
        computerTurn();
        return;
      } else if (
        celdasTableroJugador[randomIndex].classList.contains("taken") &&
        !celdasTableroJugador[randomIndex].classList.contains("boom")
      ) {
        celdasTableroJugador[randomIndex].classList.add("boom");
        infoDisplay.textContent = "El ordenador ha tocado un barco!";
        let classes = Array.from(e.classList);
        // Filtramos quitando celda
        classes = classes.filter((className) => className !== "celda");
        // Filtramos quitando taken
        classes = classes.filter((className) => className !== "taken");
        // Filtramos quitando boom
        classes = classes.filter((className) => className !== "boom");
        computerHits.push(...classes);
        checkScore('computer', computerHits, computerSunkShips);
      }else {
        infoDisplay.textContent = "El ordenador no ha tocado ningún barco.";
        celdasTableroJugador[randomIndex].classList.add('empty')
      }
    }, 3000);

    setTimeout(() => {
      playerTurn = true;
      turnDisplay.textContent = "Tu turno";
      infoDisplay.textContent = "Toca una celda para disparar.";
      const celdasTableroOrdenador = document.querySelectorAll("#computer div");
      celdasTableroOrdenador.forEach((celda) => celda.addEventListener('click', handleClick))
    },6000)
  }
}

function checkScore(user, userHits, userSunkShips) {

  function checkShip(ship) {

  }

}