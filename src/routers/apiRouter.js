const express = require('express');
const apiRouter = express.Router();
const productController = require('../controllers/productController');
const { ensureAuthenticated, isAdminOrPremium } = require('../middlewares/authMiddleware');

// Endpoints para productos
apiRouter.post('/', ensureAuthenticated, isAdminOrPremium, productController.createProduct);
apiRouter.get('/', productController.getAllProducts);
apiRouter.put('/:id', ensureAuthenticated, isAdminOrPremium, productController.updateProduct);
apiRouter.delete('/:id', ensureAuthenticated, isAdminOrPremium, productController.deleteProduct);

module.exports = apiRouter;
