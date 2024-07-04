import express from 'express';
import { checkoutPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/checkout', checkoutPayment);

export default router;

