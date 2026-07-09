
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productos = [
  {
    nombre: "Parrilla enrrollable",
    descripcion: "Parrilla enrollable, económica, ideal para camping o motoviajeros",
    detalles: "Medidas: 40x40 cm. Material: hierro. Peso: 2kg, ideal para transportar.",
    precio: "$43.000",
    imagen: "img/enrollable.jpg"
  },
 
  {
    nombre: "Parrilla Chulengo",
    descripcion: "Parrilla chulengo, trasportable a cualquier sector del jardín, ideal para 10 personas",
    detalles: "Medidas: 100x50 cm. Material: acero inoxidable. Peso: 5kg, ideal para uso en el jardín.",
    precio: "$270.000",
    imagen: "img/chulengo.jpg"
  },
  {
    nombre: "Parrilla 3 en 1",
    descripcion: "Parrilla 3 en 1, ideal para familias con poco espacio en el hogar. Va bien en el balcón",
    detalles: "Medidas: 60x60 cm. Material: acero inoxidable. Peso: 4kg, ideal para uso en el balcón.",
    precio: "$82.000",
    imagen: "img/3en1.png"
  }
  
];

const contenedorProductos = document.getElementById("productos");

productos.forEach((producto) => {
  const articulo = document.createElement("article");

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  articulo.appendChild(imagen);

  // acá te toca a vos: crear el <h3> con el nombre, y agregarlo al articulo
  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;
  articulo.appendChild(titulo);

  // acá también: crear el <p> con la descripción, y agregarlo
  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcion;
  articulo.appendChild(descripcion);

   // y acá: crear el <p> con el precio, y agregarlo
    const precio = document.createElement("p");
    precio.textContent = producto.precio;
    articulo.appendChild(precio);


const boton = document.createElement("button");
  boton.textContent = "Ver más";
  articulo.appendChild(boton);

const botonCarrito = document.createElement("button");
botonCarrito.textContent = "Añadir al carrito";
botonCarrito.addEventListener("click", () => {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  renderizarCarrito();
  alert(producto.nombre + " fue agregado al carrito");
});
articulo.appendChild(botonCarrito);


let detallesVisibles = false;
let parrafoDetalles;

boton.addEventListener("click", () => {
  if (!detallesVisibles) {
    parrafoDetalles = document.createElement("p");
    parrafoDetalles.textContent = producto.detalles;
    articulo.appendChild(parrafoDetalles);
    detallesVisibles = true;
  } else {
    parrafoDetalles.remove();
    detallesVisibles = false;
  }
});

  contenedorProductos.appendChild(articulo);

boton.addEventListener("click", () => {
  let valorGuardado = localStorage.getItem("clics-" + producto.nombre);
  let contador;

  if (valorGuardado === null) {
    contador = 0;
  } else {
    contador = parseInt(valorGuardado);
  }

  //sumarle 1 a contador
contador++;
  // guardá de nuevo en localStorage con setItem
localStorage.setItem("clics-" + producto.nombre, contador.toString());
  //  mostralo por consola con console.log, para verificar
  console.log("Clics para " + producto.nombre + ": " + contador);
});
});


fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error al obtener datos:', error));

function actualizarContador() {
  const contadores = document.querySelectorAll("#contador-carrito");
  contadores.forEach((contador) => {
    contador.textContent = carrito.length;
  });
}

function convertirPrecioANumero(precioTexto) {
  return parseInt(precioTexto.replace("$", "").replace(".", ""));
}

function renderizarCarrito() {
  const listaCarrito = document.getElementById("carrito-lista");
  listaCarrito.innerHTML = "";

  let total = 0;

  carrito.forEach((producto, index) => {
    total += convertirPrecioANumero(producto.precio);

    const item = document.createElement("div");
    item.textContent = producto.nombre + " - " + producto.precio + " ";

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
      renderizarCarrito();
    });

    item.appendChild(botonEliminar);
    listaCarrito.appendChild(item);
  });

  document.getElementById("carrito-total").textContent = total;
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  renderizarCarrito();
});

actualizarContador();
renderizarCarrito();


actualizarContador(); 