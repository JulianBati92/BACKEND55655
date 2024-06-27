const express = require('express');
const proxyRouter = express.Router();

// Middleware para el proxy
proxyRouter.use((req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next();
});

// Ruta de productos
proxyRouter.use('/products', require('./productRouter'));

// Ruta de usuarios
proxyRouter.use('/users', require('./userRouter'));

// Ruta de carritos
proxyRouter.use('/carts', require('./cartRouter'));

module.exports = proxyRouter;
