// Validación de formulario
const form = document.getElementById('form-contacto');
const mensajeEnvio = document.getElementById('mensaje-envio');

form.addEventListener('submit', function (e) {
  if (!form.checkValidity()) {
    e.preventDefault();
    mensajeEnvio.textContent = 'Por favor, completá todos los campos correctamente.';
    mensajeEnvio.style.color = 'red';
  }
});

// Fetch a productos desde una API ficticia
fetch('https://fakestoreapi.com/products?limit=6')
  .then(res => res.json())
  .then(data => mostrarProductos(data));

function mostrarProductos(productos) {
  const contenedor = document.getElementById('productos-container');
  productos.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.title}" width="100">
      <h3>${prod.title}</h3>
      <p>$${prod.price}</p>
      <button onclick="agregarAlCarrito(${prod.id}, '${prod.title}', ${prod.price})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// Carrito dinámico
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
actualizarCarrito();

function agregarAlCarrito(id, titulo, precio) {
  const producto = carrito.find(p => p.id === id);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ id, titulo, precio, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  const contenedor = document.getElementById('carrito-items');
  const total = document.getElementById('carrito-total');
  contenedor.innerHTML = '';
  let totalPrecio = 0;

  carrito.forEach(prod => {
    totalPrecio += prod.precio * prod.cantidad;
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${prod.titulo} x ${prod.cantidad} - $${(prod.precio * prod.cantidad).toFixed(2)}</p>
      <button onclick="quitarDelCarrito(${prod.id})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
  total.textContent = totalPrecio.toFixed(2);
}

function quitarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}
