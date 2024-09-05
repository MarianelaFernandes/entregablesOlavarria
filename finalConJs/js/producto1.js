"use strict";
const productosOfertas = [
  {
    nombre: "Yogurt Yogurisimo Cremix",
    precio: 1800,
    img: "../img/yogur.png",
    stock: 5,
    descuento: 0.3,
  },
  {
    nombre: "Cerveza Corona",
    precio: 2500,
    img: "../img/ofertaCerveza.png",
    stock: 8,
    promo: true,
  },
];
const productos = [
  { nombre: "Arandanos", precio: 1200, img: "../img/arandano.png", stock: 2 },
  { nombre: "Atún", precio: 2500, img: "../img/atun.png", stock: 3 },
  { nombre: "Choclo", precio: 1900, img: "../img/choclo.png", stock: 2 },
  { nombre: "Cereales", precio: 900, img: "../img/chocoCrunch.png", stock: 3 },
  { nombre: "Chocolate", precio: 1200, img: "../img/crunch.png", stock: 2 },
  { nombre: "Jugo de Fresas", precio: 1850, img: "../img/jugo.png", stock: 3 },
  { nombre: "Jugo de soja", precio: 1600, img: "../img/jugoAdes.png", stock: 2 },
  { nombre: "Jugo de uva", precio: 1950, img: "../img/jugoUva.png", stock: 3 },
  { nombre: "Arroz Largo fino", precio: 1900, img: "../img/arroz.jpeg", stock: 2 },
  { nombre: "Fideos Tirabuzón", precio: 2000, img: "../img/fideo.jpeg", stock: 3 },
  { nombre: "Mix Frutos Secos", precio: 3000, img: "../img/Granola.png", stock: 2 },
  { nombre: "Pañales Pampers", precio: 5000, img: "../img/pañal.png", stock: 3 },
];
let totalAcumulado = 0;

const seccionProductos = document.querySelector(".almacen.productos");
productos.forEach((producto) => {
  const productoElemento = document.createElement("div");
  productoElemento.classList.add("productos");
  productoElemento.innerHTML = `
        <img id="foto" src="${producto.img}" alt="${producto.nombre}" />
        <p>${producto.nombre} $${producto.precio}</p>
        <input type="number" class="cantidad" min="0" value="0" required />
        <p class="stock"> Stock: ${producto.stock}</p>
        <button type="button">comprar</button>
    `;
  seccionProductos.appendChild(productoElemento);           //appendChild: mueve los elementos a la pagina html
});
function cargarProductos() {
  const seccionOfertas = document.querySelector(".almacen.ofertas");
  productosOfertas.forEach((producto) => {
    const productoElemento = document.createElement("div");       //crea un div donde incluye la lista de oferta
    productoElemento.classList.add("productos");
    productoElemento.innerHTML = `
            <img id="ofertas" src="${producto.img}" alt="${producto.nombre}" />
            <p>${producto.nombre} $${producto.precio}</p>
            <input type="number" class="cantidad" min="0" value="0" required />
            <p>Stock: <span class="stock">${producto.stock}</span></p>
            <button type="button">comprar</button>
        `;
    seccionOfertas.appendChild(productoElemento);               //apenChild: mueve los elementos a la pagina html
  });
}
cargarProductos();

// Asociamos event listeners a los productos regulares
document.querySelectorAll(".almacen.productos .productos").forEach((productoElemento, index) => {
  let button = productoElemento.querySelector("button");
  button.addEventListener("click", () => {
    let cantidad = productoElemento.querySelector(".cantidad").value;
    cantidad = parseInt(cantidad);                                 //quitamos el number y agregamos parseInt
    if (cantidad > 0 && productos[index].stock - cantidad >= 0) {
      comprar(cantidad, index); // Llamamos a la función comprar para productos regulares
      productos[index].stock -= cantidad; // Actualizar el stock
      productoElemento.querySelector(".stock").innerText = productos[index].stock; // Actualizar la visualización del stock
      alert("SU COMPRA FUE EXITOSA");
    } else {
      alert(
        "¡¡NO HAY SUFICIENTE STOCK!! Ingrese una cantidad menor o ingrese mayor a cero."
      );
    }
  });
});

// Asociamos event listeners a los productos en oferta
document.querySelectorAll(".almacen.ofertas .productos").forEach((productoElemento, index) => {
  let button = productoElemento.querySelector("button");
  button.addEventListener("click", () => {
    let cantidad = productoElemento.querySelector(".cantidad").value;
    cantidad = parseInt(cantidad);                                    //quitamos el number y agregamos parseInt
    if (cantidad > 0 && productosOfertas[index].stock - cantidad >= 0) {
      if (productosOfertas[index].nombre === "Yogurt Yogurisimo Cremix") {
        comprarConDescuento(cantidad, index); // Llamamos a la función comprarConDescuento para el yogurt
      } else if (productosOfertas[index].nombre === "Cerveza Corona") {
        comprarCerveza(cantidad, index); // Llamamos a la función comprarCerveza para la cerveza
      }
      productosOfertas[index].stock -= cantidad; // Actualizar el stock
      productoElemento.querySelector(".stock").innerText = productosOfertas[index].stock; // Actualizar la visualización del stock
      alert("SU COMPRA FUE EXITOSA");
    } else {
      alert(
        "¡¡NO HAY SUFICIENTE STOCK!! Ingrese una cantidad menor o ingrese mayor a cero."
      );
    }
  });
});

function comprar(cantidad, index) {
  let totalProducto = cantidad * productos[index].precio; // Calcular el total del producto actual
  totalAcumulado += totalProducto; // Agregar el total del producto actual al total acumulado
  document.getElementById("total").innerText = totalAcumulado;
}
function comprarConDescuento(cantidad, index) {
  let totalDescuento = cantidad * productosOfertas[index].precio * (1 - productosOfertas[index].descuento);
  totalAcumulado += totalDescuento;
  document.getElementById("total").innerText = totalAcumulado;
}
function comprarCerveza(cantidad, index) {
  let totalPromo = Math.floor(cantidad / 2) * productosOfertas[index].precio;
  let totalAPagar = totalPromo + (cantidad % 2 === 1 ? productosOfertas[index].precio : 0);
  totalAcumulado += totalAPagar;
  document.getElementById("total").innerText = totalAcumulado;
}