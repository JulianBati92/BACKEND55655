import express from 'express';
import productService from '../services/productService.js';
import stripe from '../utils/stripe.js';

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

checkoutRouter.post('/checkout', async (req, res) => {
    const cart = req.session.cart || [];
    const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, 
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        const clientSecret = paymentIntent.client_secret;
        res.render('checkout', { title: 'Checkout', clientSecret: clientSecret, cart: cart });
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).json({ error: 'Error creating PaymentIntent' });
    }
});

checkoutRouter.get('/confirmation', (req, res) => {
    const purchaseId = Math.floor(Math.random() * 1000000); 
    res.render('confirmation', { title: 'Confirmación de Compra', purchaseId: purchaseId });
});

export default checkoutRouter;
