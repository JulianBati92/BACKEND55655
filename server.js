const express = require('express');
const morgan = require('morgan');
const pathNotFoundHandler = require('./src/middlewares/pathNotFoundHandler');
const errorHandler = require('./src/middlewares/errorHandler');
const productsRouter = require('./src/routers/productsRouter');
const usersRouter = require('./src/routers/usersRouter');
const ordersRouter = require('./src/routers/ordersRouter');

const app = express();
const port = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

// Middlewares para manejar rutas no encontradas y errores
app.use(pathNotFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
