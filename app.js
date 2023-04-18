//import { submarine, destroyer, cruiser, battleship, carrier } from "./barcos";

const contenedorTableros = document.querySelector("#contenedor-tableros");
const contenedorBarcos = document.querySelector(".contenedor-barcos");
const rotarButton = document.querySelector("#rotar-btn");

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
  constructor(nombre, celdas) {
    this.nombre = nombre;
    this.celdas = celdas;
  }
}

class submarine extends barco {
  constructor() {
    super("submarine", 1);
  }
}

class destroyer extends barco {
  constructor() {
    super("destroyer", 2);
  }
}

class cruiser extends barco {
  constructor() {
    super("cruiser", 3);
  }
}

class battleship extends barco {
  constructor() {
    super("battleship", 4);
  }
}

class carrier extends barco {
  constructor() {
    super("carrier", 5);
  }
}

const submarine1 = new submarine();
const submarine2 = new submarine();
const destroyer1 = new destroyer();
const destroyer2 = new destroyer();
const cruiser1 = new cruiser();
const battleship1 = new battleship();
const carrier1 = new carrier();

const barcos = [
  submarine1,
  submarine2,
  destroyer1,
  destroyer2,
  cruiser1,
  battleship1,
  carrier1,
];
let notDropped;

console.log(barcos);

posicionesBarcos =[];

const addBarcos = (user, barco, startId) => {
  // Se puede probar a hacer Set
  const celdasTablero = document.querySelectorAll(`#${user} div`);
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = user === 'user' ? rotacion === 0 : randomBoolean;
  let randomStartIndex = Math.floor(Math.random() * width * width);

  let startIndex = startId ? startId : randomStartIndex;
  console.log(startIndex);

  // Validar posicion inicial
  let validStart = isHorizontal
    ? startIndex <= width * width - barco.celdas
      ? startIndex
      : width * width - barco.celdas
    : // Handle vertical
    startIndex <= width * width - width * barco.celdas
    ? startIndex
    : startIndex - barco.celdas * width + width;

  // Se puede probar a hacer Set
  bloquesBarcos = [];

  for (let i = 0; i < barco.celdas; i++) {
    if (isHorizontal) {
      bloquesBarcos.push(celdasTablero[Number(validStart) + i]);
    } else {
      bloquesBarcos.push(celdasTablero[Number(validStart) + i * width]);
    }
  }

  let posicionValida;
  //Horizontal else vertical
  if (isHorizontal) {
    bloquesBarcos.every(
      (_bloqueBarco, index) =>
        (posicionValida =
          bloquesBarcos[0].id % width !==
          width - (bloquesBarcos.length - (index + 1)))
    );
  } else {
    bloquesBarcos.every(
      (_bloqueBarco, index) =>
        (posicionValida = bloquesBarcos[0].id < 90 + (width * index + 1))
    );
  }

  const espacioLibre = bloquesBarcos.every(
    (bloqueBarco) => !bloqueBarco.classList.contains("taken")
  );

  if (posicionValida && espacioLibre) {
    console.log("Bloques barcos:",bloquesBarcos);
    posicionesBarcos.push(bloquesBarcos);
    bloquesBarcos.forEach((bloqueBarco) => {
      bloqueBarco.classList.add(barco.nombre);
      console.log("Barco.nombre:",barco.nombre);
      bloqueBarco.classList.add("taken");
    });
  } else {
    if (user === 'ordenador') addBarcos('ordenador',barco);
    if (user === 'user') notDropped = true;
  }
};

barcos.forEach((barco) => addBarcos('ordenador', barco));
console.log("posicionesBarcos",posicionesBarcos);

// drag and drop mover barcos jugador
let draggedShip
const optionShips = Array.from(contenedorBarcos.children)

const dragStart = (e) => {
  notDropped = false;
  draggedShip = e.target;
}
const dragOver = (e) => e.preventDefault();

const dropShip = (e) => {
  const startId = e.target.id;
  const ship = barcos[draggedShip.id];
  addBarcos("user", ship, startId)
  if (!notDropped){
    draggedShip.remove()
  }
}

optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart))

const celdasTableroJugador = document.querySelectorAll('#user div');
celdasTableroJugador.forEach(celda => {
  celda.addEventListener('dragover', dragOver)
  celda.addEventListener('drop', dropShip)
})


