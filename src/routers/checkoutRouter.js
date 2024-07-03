import express from 'express';
import productService from '../services/productService.js';
import stripe from '../utils/stripe.js';

const checkoutRouter = express.Router();

checkoutRouter.post('/add-to-cart/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.getById(productId);
        if (product && product.stock > 0) {
            product.stock -= 1;
            await productService.update(productId, { stock: product.stock });
            req.session.cart = req.session.cart || [];
            req.session.cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                photo: product.photo,
                quantity: 1,
            });
            console.log("Product added to cart:", product);
            res.redirect('/real');
        } else {
            res.status(400).send("Product out of stock");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding product to cart');
    }
});

checkoutRouter.post('/create-checkout-session', async (req, res) => {
    const cart = req.session.cart || [];
    
    console.log("Cart:", cart);

    const invalidItems = cart.filter(item => !item.title || !item.price || !item.photo);
    if (invalidItems.length > 0) {
        return res.status(400).send('Some items in the cart are missing required fields.');
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cart.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.title,
                        description: item.description || 'No description available',
                        images: [item.photo],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.protocol}://${req.get('host')}/real`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing payment');
    }
});

checkoutRouter.get('/confirmation', (req, res) => {
    const purchaseId = Math.floor(Math.random() * 1000000);
    res.render('confirmation', { title: 'Confirmación de Compra', purchaseId: purchaseId });
});

export default checkoutRouter;
