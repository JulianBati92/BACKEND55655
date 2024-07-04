import express from 'express';
import passport from 'passport';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getMyProducts, } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:pid', getProductById);
router.post('/', passport.authenticate('jwt', { session: false }), createProduct);
router.put('/:pid', passport.authenticate('jwt', { session: false }), updateProduct);
router.delete('/:pid', passport.authenticate('jwt', { session: false }), deleteProduct);
router.get('/me', passport.authenticate('jwt', { session: false }), getMyProducts);

export default router;
