// URL base de tu API desplegada en Render (o localhost si pruebas local)
const API_BASE_URL = 'https://api-tienda-daw.onrender.com/api';

let listaProductos = [];
let listaCategorias = [];
let carrito = [];

// Elementos del DOM
const catalogoContainer = document.getElementById('catalogo');
const loadingIndicator = document.getElementById('loading');
const errorMsg = document.getElementById('error-msg');
const selectCategoria = document.getElementById('select-categoria');
const inputBusqueda = document.getElementById('input-busqueda');
const cartCount = document.getElementById('cart-count');
const modalDetalle = document.getElementById('modal-detalle');
const modalCarrito = document.getElementById('modal-carrito');
const detalleInfo = document.getElementById('detalle-info');

// 1. Cargar datos de la API (Productos y Categorías)
async function inicializarApp() {
  try {
    loadingIndicator.classList.remove('hidden');
    errorMsg.classList.add('hidden');

    // Consumo concurrente de dos recursos de la API
    const [resProductos, resCategorias] = await Promise.all([
      fetch(`${API_BASE_URL}/productos`),
      fetch(`${API_BASE_URL}/categorias`)
    ]);

    if (!resProductos.ok || !resCategorias.ok) {
      throw new Error('Error al conectar con la API');
    }

    listaProductos = await resProductos.json();
    listaCategorias = await resCategorias.json();

    loadingIndicator.classList.add('hidden');
    poblarFiltroCategorias();
    renderizarProductos(listaProductos);

  } catch (err) {
    loadingIndicator.classList.add('hidden');
    errorMsg.classList.remove('hidden');
    console.error('Error cargando API:', err);
  }
}

// 2. Poblar opciones del select de categorías dinámicamente
function poblarFiltroCategorias() {
  listaCategorias.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.nombre;
    selectCategoria.appendChild(option);
  });
}

// 3. Renderizar las tarjetas de productos en el catálogo
function renderizarProductos(productos) {
  catalogoContainer.innerHTML = '';

  if (productos.length === 0) {
    catalogoContainer.innerHTML = '<p class="status-msg">No se encontraron productos que coincidan con la búsqueda.</p>';
    return;
  }

  productos.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px; margin-bottom: 0.8rem;">
      <div>
        <small style="color: #718096; text-transform: uppercase; font-weight: bold;">${prod.marca || 'Genérico'}</small>
        <h3 style="font-size: 1.1rem; margin-top: 0.2rem;">${prod.nombre}</h3>
        <p class="price">S/ ${prod.precio.toFixed(2)}</p>
      </div>
      <div class="card-buttons">
        <button class="btn-detail" onclick="verDetalle(${prod.id})">Detalle</button>
        <button class="btn-add" onclick="agregarAlCarrito(${prod.id})">Agregar</button>
      </div>
    `;
    catalogoContainer.appendChild(card);
  });
}

inputBusqueda.addEventListener('input', aplicarFiltros);
selectCategoria.addEventListener('change', aplicarFiltros);

// 5. Modal de Detalle
window.verDetalle = function(id) {
  const prod = listaProductos.find(p => p.id === id);
  if (!prod) return;

  const categoria = listaCategorias.find(c => c.id === prod.categoriaId);
  const nombreCat = categoria ? categoria.nombre : 'Sin categoría';

  detalleInfo.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 100%; max-height: 220px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
    <h2>${prod.nombre}</h2>
    <p style="color: #4a5568; margin: 0.5rem 0;">${prod.descripcion}</p>
    <p><strong>Marca:</strong> ${prod.marca}</p>
    <p><strong>Categoría:</strong> ${nombreCat}</p>
    <p><strong>Stock disponible:</strong> ${prod.stock} unidades</p>
    <p class="price" style="font-size: 1.4rem; margin-top: 0.5rem;">S/ ${prod.precio.toFixed(2)}</p>
  `;
  modalDetalle.classList.remove('hidden');
};
// 6. Carrito de Compras
window.agregarAlCarrito = function(id) {
  const prod = listaProductos.find(p => p.id === id);
  if (prod) {
    carrito.push(prod);
    actualizarCarrito();
  }
};

function actualizarCarrito() {
  cartCount.textContent = carrito.length;
  const listaCont = document.getElementById('lista-carrito');
  listaCont.innerHTML = '';

  let total = 0;
  carrito.forEach((item, index) => {
    total += item.precio;
    const itemRow = document.createElement('div');
    itemRow.classList.add('cart-item');
    itemRow.innerHTML = `
      <span>${item.nombre}</span>
      <span>S/ ${item.precio.toFixed(2)}</span>
      <button onclick="eliminarDelCarrito(${index})" style="color:red; background:none; border:none; cursor:pointer;">✕</button>
    `;
    listaCont.appendChild(itemRow);
  });

  document.getElementById('cart-total').textContent = total.toFixed(2);
}

window.eliminarDelCarrito = function(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
};

document.getElementById('btn-ver-carrito').onclick = () => modalCarrito.classList.remove('hidden');
document.getElementById('close-carrito').onclick = () => modalCarrito.classList.add('hidden');
document.getElementById('btn-vaciar').onclick = () => {
  carrito = [];
  actualizarCarrito();
};
document.getElementById('btn-comprar').onclick = () => {
  if (carrito.length === 0) {
    alert('El carrito está vacío.');
    return;
  }
  alert('¡Pedido registrado con éxito!');
  carrito = [];
  actualizarCarrito();
  modalCarrito.classList.add('hidden');
};

// Iniciar al cargar la página
window.onload = inicializarApp;