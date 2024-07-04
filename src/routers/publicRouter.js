import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController.js';
import { registerUser, loginUser, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:pid', getProductById);
router.post('/sessions/register', registerUser);
router.post('/sessions/login', loginUser);
router.post('/sessions/password', resetPassword);

export default router;

