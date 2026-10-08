const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Arrays simulando tablas de base de datos
const productos = [{ id: 1, nombre: 'Laptop Gamer', precio: 1200, categoriaId: 1 }];
const categorias = [{ id: 1, nombre: 'Tecnología' }];
const clientes = [{ id: 1, nombre: 'Ana Gómez', email: 'ana@email.com' }];
const pedidos = [{ id: 1, clienteId: 1, productoId: 1, total: 1200 }];

// Endpoints principales
app.get('/', (req, res) => res.send('API del proyecto DAW funcionando'));

app.get('/api/productos', (req, res) => res.json(productos));
app.get('/api/categorias', (req, res) => res.json(categorias));
app.get('/api/clientes', (req, res) => res.json(clientes));
app.get('/api/pedidos', (req, res) => res.json(pedidos));

// Render inyectará su propio puerto en process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});