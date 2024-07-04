import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { getAllProducts, getProductById } from '../controllers/productController.js';
import { getUserDetails, signoutUser } from '../controllers/authController.js';
import { createOrder, getUserOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/products', getAllProducts);
router.get('/products/:pid', getProductById);
router.post('/sessions', getUserDetails);
router.post('/sessions/signout', signoutUser);
router.post('/orders', createOrder);
router.get('/orders', getUserOrders);
router.get('/orders/:oid', getOrderById);
router.put('/orders/:oid', updateOrder);
router.delete('/orders/:oid', deleteOrder);

export default router;
