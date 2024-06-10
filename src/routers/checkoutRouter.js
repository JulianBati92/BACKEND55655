import express from 'express';
import productService from '../services/productService.js';

const checkoutRouter = express.Router();

checkoutRouter.post('/add-to-cart/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await productService.getById(productId); 
    if (product && product.stock > 0) {
        product.stock -= 1;
        await productService.update(productId, { stock: product.stock });
        req.session.cart = req.session.cart || [];
        req.session.cart.push(product);
        res.redirect('/real');
    } else {
        res.status(400).send("Product out of stock");
    }
});

checkoutRouter.post('/checkout', (req, res) => {
    const cart = req.session.cart || [];
    const orderId = Math.floor(Math.random() * 1000000); // Generar un ID de pedido aleatorio
    req.session.cart = []; // Vaciar el carrito después de la compra
    res.render('checkout', { title: 'Checkout', orderId: orderId, cart: cart });
});

checkoutRouter.get('/confirmation', (req, res) => {
    const purchaseId = Math.floor(Math.random() * 1000000); // Generar un ID de compra aleatorio
    res.render('confirmation', { title: 'Confirmación de Compra', purchaseId: purchaseId });
});

export default checkoutRouter;
