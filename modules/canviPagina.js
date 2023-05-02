// Declaramos una variable llamada "button" la cual hemos igualado a un elemento del DOM que tiene el id 'change-page'
const button = document.getElementById("change-page");

// Declaramos la función "redireccionar" la cual nos servirá para redireccionar la app a otra página
function redireccionar(url) {
  window.location.href = url;
}

// Exportamos la función "redireccionar", y también la variable "button"
export { redireccionar, button };
