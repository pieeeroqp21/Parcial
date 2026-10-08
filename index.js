const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// 1. RECURSO: CATEGORÍAS (Id y Nombre)
// ==========================================
const categorias = [
  { id: 1, nombre: 'Laptops y Computadoras' },
  { id: 2, nombre: 'Smartphones y Tablets' },
  { id: 3, nombre: 'Accesorios y Periféricos' },
  { id: 4, nombre: 'Audio y Sonido' },
  { id: 5, nombre: 'Consolas y Gaming' }
];

// ==========================================
// 2. RECURSO: PRODUCTOS (Catálogo Extenso)
// ==========================================
const productos = [
  // --- Laptops y Computadoras (Categoría 1) ---
  {
    id: 1,
    nombre: 'Laptop Gamer ASUS ROG Strix G16',
    marca: 'ASUS',
    precio: 4899.00,
    categoriaId: 1,
    stock: 8,
    descripcion: 'Intel Core i7 13va Gen, RTX 4060, 16GB RAM DDR5, 1TB SSD NVMe.',
    imagen: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    nombre: 'MacBook Air M2 13 pulgadas',
    marca: 'Apple',
    precio: 5199.00,
    categoriaId: 1,
    stock: 12,
    descripcion: 'Chip M2 ultraeficiente, pantalla Liquid Retina de 13.6", 8GB RAM unificada, 256GB SSD.',
    imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    nombre: 'Laptop Lenovo Legion 5 Pro',
    marca: 'Lenovo',
    precio: 4350.00,
    categoriaId: 1,
    stock: 6,
    descripcion: 'AMD Ryzen 7 7745HX, RTX 4070 8GB, 16GB RAM, pantalla QHD+ 165Hz.',
    imagen: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    nombre: 'Dell XPS 13 Plus Ultrabook',
    marca: 'Dell',
    precio: 5799.00,
    categoriaId: 1,
    stock: 5,
    descripcion: 'Diseño minimalista ultraportátil, Intel Evo i7, 16GB RAM, 512GB SSD, pantalla táctil 4K.',
    imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    nombre: 'PC Gamer MSI Codex R',
    marca: 'MSI',
    precio: 3890.00,
    categoriaId: 1,
    stock: 4,
    descripcion: 'Intel Core i5 13400F, RTX 3060 12GB, 16GB RAM, enfriamiento RGB.',
    imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80'
  },

  // --- Smartphones y Tablets (Categoría 2) ---
  {
    id: 6,
    nombre: 'Samsung Galaxy S24 Ultra 256GB',
    marca: 'Samsung',
    precio: 4999.00,
    categoriaId: 2,
    stock: 14,
    descripcion: 'Pantalla Dynamic AMOLED 2X, cámara cuádruple de 200MP, S-Pen integrado, Galaxy AI.',
    imagen: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    nombre: 'iPhone 15 Pro Max 256GB Titanio',
    marca: 'Apple',
    precio: 5899.00,
    categoriaId: 2,
    stock: 10,
    descripcion: 'Diseño de titanio aeroespacial, chip A17 Pro, botón de acción, cámara telefoto 5x.',
    imagen: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    nombre: 'iPad Pro 11" Chip M4',
    marca: 'Apple',
    precio: 4299.00,
    categoriaId: 2,
    stock: 7,
    descripcion: 'Pantalla Ultra Retina XDR Tandem OLED, rendimiento M4 de última generación.',
    imagen: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 9,
    nombre: 'Xiaomi 14 Ultra 512GB',
    marca: 'Xiaomi',
    precio: 3950.00,
    categoriaId: 2,
    stock: 9,
    descripcion: 'Óptica Leica con sensor de 1 pulgada, Snapdragon 8 Gen 3, carga rápida 90W.',
    imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 10,
    nombre: 'Samsung Galaxy Tab S9 FE',
    marca: 'Samsung',
    precio: 1899.00,
    categoriaId: 2,
    stock: 15,
    descripcion: 'Pantalla de 10.9" a 90Hz, resistencia al agua IP68, incluye S-Pen en la caja.',
    imagen: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=600&q=80'
  },

  // --- Accesorios y Periféricos (Categoría 3) ---
  {
    id: 11,
    nombre: 'Mouse Inalámbrico Logitech MX Master 3S',
    marca: 'Logitech',
    precio: 399.00,
    categoriaId: 3,
    stock: 25,
    descripcion: 'Sensor de 8000 DPI con seguimiento en cristal, clics silenciosos, rueda MagSpeed.',
    imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 12,
    nombre: 'Teclado Mecánico Redragon Kumara K552 RGB',
    marca: 'Redragon',
    precio: 189.00,
    categoriaId: 3,
    stock: 40,
    descripcion: 'Switches mecánicos Outemu Blue, formato compacto TKL, retroiluminación RGB completa.',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 13,
    nombre: 'Monitor Gamer Samsung Odyssey G5 27" 165Hz',
    marca: 'Samsung',
    precio: 1150.00,
    categoriaId: 3,
    stock: 11,
    descripcion: 'Resolución QHD (2560 x 1440), curvatura 1000R inmersiva, 1ms de tiempo de respuesta.',
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 14,
    nombre: 'Webcam Logitech C920 HD Pro',
    marca: 'Logitech',
    precio: 299.00,
    categoriaId: 3,
    stock: 20,
    descripcion: 'Resolución Full HD 1080p a 30fps, enfoque automático, audio estéreo con micrófono dual.',
    imagen: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 15,
    nombre: 'Micrófono HyperX QuadCast S RGB',
    marca: 'HyperX',
    precio: 549.00,
    categoriaId: 3,
    stock: 13,
    descripcion: 'Montura antivibraciones, sensor táctil para silenciar, cuatro patrones polares seleccionables.',
    imagen: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'
  },

  // --- Audio y Sonido (Categoría 4) ---
  {
    id: 16,
    nombre: 'Auriculares Sony WH-1000XM5 con ANC',
    marca: 'Sony',
    precio: 1499.00,
    categoriaId: 4,
    stock: 12,
    descripcion: 'Cancelación activa de ruido líder del sector, hasta 30 horas de batería, sonido Hi-Res.',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 17,
    nombre: 'AirPods Pro 2da Generación USB-C',
    marca: 'Apple',
    precio: 1050.00,
    categoriaId: 4,
    stock: 18,
    descripcion: 'Chip H2, audio espacial personalizado, estuche MagSafe con bocina y rastreo de precisión.',
    imagen: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 18,
    nombre: 'Parlante Portátil JBL Charge 5',
    marca: 'JBL',
    precio: 620.00,
    categoriaId: 4,
    stock: 16,
    descripcion: 'Resistente al agua y al polvo IP67, 20 horas de autonomía, función de batería externa.',
    imagen: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 19,
    nombre: 'Barra de Sonido Bose Smart Soundbar 600',
    marca: 'Bose',
    precio: 2199.00,
    categoriaId: 4,
    stock: 7,
    descripcion: 'Soporte Dolby Atmos con tecnología Bose TrueSpace, conectividad Wi-Fi, AirPlay y Bluetooth.',
    imagen: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80'
  },

  // --- Consolas y Gaming (Categoría 5) ---
  {
    id: 20,
    nombre: 'Consola PlayStation 5 Slim 1TB',
    marca: 'Sony',
    precio: 2599.00,
    categoriaId: 5,
    stock: 15,
    descripcion: 'Chasis más ligero y compacto, SSD de 1TB ultra rápido, retroalimentación háptica en DualSense.',
    imagen: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 21,
    nombre: 'Consola Nintendo Switch OLED Edition',
    marca: 'Nintendo',
    precio: 1650.00,
    categoriaId: 5,
    stock: 20,
    descripcion: 'Pantalla OLED de 7 pulgadas con colores intensos, soporte ajustable y 64GB de memoria interna.',
    imagen: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 22,
    nombre: 'Silla Gamer Corsair T3 Rush',
    marca: 'Corsair',
    precio: 1190.00,
    categoriaId: 5,
    stock: 8,
    descripcion: 'Tejido exterior de tela transpirable suave, reposabrazos 4D ajustables y cojines viscoelásticos.',
    imagen: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80'
  }
];

// ==========================================
// 3. RECURSO: CLIENTES
// ==========================================
const clientes = [
  { id: 1, nombre: 'Ana Gómez Torres', email: 'ana.gomez@gmail.com', telefono: '+51 987654321', ciudad: 'Lima' },
  { id: 2, nombre: 'Carlos Ramos Quispe', email: 'carlos.ramos@hotmail.com', telefono: '+51 912345678', ciudad: 'Huancayo' },
  { id: 3, nombre: 'Lucía Mendoza Chávez', email: 'lucia.mendoza@gmail.com', telefono: '+51 998877665', ciudad: 'Arequipa' },
  { id: 4, nombre: 'Diego Morales Silva', email: 'diego.morales@outlook.com', telefono: '+51 922334455', ciudad: 'Cusco' }
];

// ==========================================
// 4. RECURSO: PEDIDOS
// ==========================================
const pedidos = [
  { id: 101, clienteId: 1, fecha: '2026-10-01', total: 4899.00, estado: 'Entregado', metodoPago: 'Tarjeta de Crédito' },
  { id: 102, clienteId: 2, fecha: '2026-10-04', total: 189.00, estado: 'En tránsito', metodoPago: 'Yape / Plin' },
  { id: 103, clienteId: 3, fecha: '2026-10-07', total: 5899.00, estado: 'Pendiente de pago', metodoPago: 'Transferencia bancaria' }
];

// ==========================================
// 5. RECURSO: PROMOCIONES (Extra para enriquecer la API)
// ==========================================
const promociones = [
  { id: 1, codigo: 'DESCUENTO10', descuento: '10%', descripcion: 'Aplica para la categoría de Audio y Sonido' },
  { id: 2, codigo: 'GAMERWEEK', descuento: '15%', descripcion: 'Descuento especial en accesorios y consolas seleccionadas' },
  { id: 3, codigo: 'ENVIOGRATIS', descuento: '100% de envío', descripcion: 'Por compras superiores a S/ 500 en todo el país' }
];

// ==========================================
// ENDPOINTS DE LA API
// ==========================================
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Bienvenido a la API REST de TechStore DAW',
    version: '2.0.0',
    autor: 'Evaluación Parcial DAW',
    endpointsDisponibles: [
      '/api/productos',
      '/api/categorias',
      '/api/clientes',
      '/api/pedidos',
      '/api/promociones'
    ]
  });
});

app.get('/api/productos', (req, res) => {
  res.json(productos);
});

app.get('/api/categorias', (req, res) => {
  res.json(categorias);
});

app.get('/api/clientes', (req, res) => {
  res.json(clientes);
});

app.get('/api/pedidos', (req, res) => {
  res.json(pedidos);
});

app.get('/api/promociones', (req, res) => {
  res.json(promociones);
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de TechStore corriendo activamente en el puerto ${PORT}`);
});