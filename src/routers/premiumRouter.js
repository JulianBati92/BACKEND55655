import express from 'express';
import { isAuthenticated, isPremium } from '../middlewares/authMiddleware.js';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { getUserDetails, signoutUser } from '../controllers/authController.js';
import { createOrder, getUserOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController.js';
import { checkoutPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.use(isAuthenticated);
router.use(isPremium);

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/me', getAllProducts);
router.get('/products/:pid', getProductById);
router.put('/products/:pid', updateProduct);
router.delete('/products/:pid', deleteProduct);
router.post('/sessions', getUserDetails);
router.post('/sessions/signout', signoutUser);
router.post('/orders', createOrder);
router.get('/orders', getUserOrders);
router.get('/orders/:oid', getOrderById);
router.put('/orders/:oid', updateOrder);
router.delete('/orders/:oid', deleteOrder);
router.post('/payments/checkout', checkoutPayment);

export default router;
