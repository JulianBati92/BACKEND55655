import express from 'express';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { getUserDetails, signoutUser } from '../controllers/authController.js';

const router = express.Router();

router.use(isAuthenticated);
router.use(isAdmin);

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:pid', getProductById);
router.put('/products/:pid', updateProduct);
router.delete('/products/:pid', deleteProduct);
router.post('/sessions', getUserDetails);
router.post('/sessions/signout', signoutUser);

export default router;
