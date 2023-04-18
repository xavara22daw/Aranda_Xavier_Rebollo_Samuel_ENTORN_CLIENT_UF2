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
console.log(barcos);

const addBarcosOrdenador = (barco) => {
  // Se puede probar a hacer Set
  const celdasTablero = document.querySelectorAll("#ordenador div");
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = randomBoolean;
  let randomIndiceInicial = Math.floor(Math.random() * width * width);
  console.log(randomIndiceInicial);

  // Se puede probar a hacer Set
  bloquesBarcos = [];

  for (let i = 0; i < barco.celdas; i++) {
    if (isHorizontal) {
      bloquesBarcos.push(celdasTablero[Number(randomIndiceInicial) + i]);
    }else {
      bloquesBarcos.push(celdasTablero[Number(randomIndiceInicial) + i * width]);
    }
  }

  bloquesBarcos.forEach(bloqueBarco => {
    bloqueBarco.classList.add(barco.nombre);
    bloqueBarco.classList.add('taken');
  })
};

addBarcosOrdenador(destroyer1);

