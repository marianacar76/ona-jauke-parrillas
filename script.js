let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorProductos = document.getElementById("productos");
 
fetch("productos.json")
  .then((response) => response.json())
  .then((productos) => {
    productos.forEach((producto) => {
      const articulo = document.createElement("article");
 
      const imagen = document.createElement("img");
      imagen.src = producto.imagen;
      imagen.alt = producto.nombre;
      articulo.appendChild(imagen);
 
      const titulo = document.createElement("h3");
      titulo.textContent = producto.nombre;
      articulo.appendChild(titulo);
 
      const descripcion = document.createElement("p");
      descripcion.textContent = producto.descripcion;
      articulo.appendChild(descripcion);
 
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
 
      boton.addEventListener("click", () => {
        let valorGuardado = localStorage.getItem("clics-" + producto.nombre);
        let contador;
 
        if (valorGuardado === null) {
          contador = 0;
        } else {
          contador = parseInt(valorGuardado);
        }
 
        contador++;
        localStorage.setItem("clics-" + producto.nombre, contador.toString());
        console.log("Clics para " + producto.nombre + ": " + contador);
      });
 
      contenedorProductos.appendChild(articulo);
    });
  })
  .catch((error) => console.error("Error al cargar productos:", error));
 
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

    const botonSumar = document.createElement("button");
    botonSumar.textContent = "+1";
    botonSumar.addEventListener("click", () => {
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
      renderizarCarrito();
    });

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
      renderizarCarrito();
    });

    item.appendChild(botonSumar);
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
 
document.getElementById("finalizar-compra").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agregá productos antes de finalizar la compra.");
    return;
  }

  const total = document.getElementById("carrito-total").textContent;
  alert("¡Gracias por tu compra! Total abonado: $" + total);

  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  renderizarCarrito();
});


document.getElementById("formulario-contacto").addEventListener("submit", (evento) => {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (nombre === "" || email === "" || mensaje === "") {
    evento.preventDefault();
    alert("Por favor completá todos los campos antes de enviar.");
    return;
  }

  const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmailValido.test(email)) {
    evento.preventDefault();
    alert("Por favor ingresá un email válido.");
    return;
  }
});