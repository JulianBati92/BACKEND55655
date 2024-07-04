import express from 'express';
import passport from 'passport';
import { createOrder, getOrderById, updateOrder, deleteOrder, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), createOrder);
router.get('/:id', passport.authenticate('jwt', { session: false }), getOrderById);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateOrder);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteOrder);
router.get('/', passport.authenticate('jwt', { session: false }), getAllOrders);

export default router;
