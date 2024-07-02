import express from 'express';
import productService from '../services/productService.js';
import stripe from '../utils/stripe.js'; 
import authPolicy from '../middlewares/authPolicy.js';

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
  const productsAll = await productService.getAll();
  const simplifiedProducts = productsAll.map((product) => JSON.parse(JSON.stringify(product)));
  res.render('home', { title: 'Home', products: simplifiedProducts });
});

viewsRouter.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

viewsRouter.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

viewsRouter.get('/real', (req, res) => {
  const cart = req.session.cart || [];
  res.render('real', { title: 'Carrito', cart: cart });
});

viewsRouter.get('/dashboard', authPolicy, (req, res) => {
  res.render('dashboard', { user: req.user });
});

viewsRouter.post('/add-to-cart/:id', async (req, res) => {
  const productId = req.params.id;
  
  try {
    const product = await productService.getById(productId);

    if (product && product.stock > 0) {
      product.stock -= 1;
      await productService.update(productId, { stock: product.stock });

      const productInCart = {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
      };

      req.session.cart = req.session.cart || [];
      req.session.cart.push(productInCart);
      res.redirect('/real');
    } else {
      res.status(400).send('Product out of stock');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding product to cart');
  }
});

viewsRouter.get('/checkout', (req, res) => {
  const cart = req.session.cart || [];
  res.render('checkout', { title: 'Checkout', cart: cart, stripePublicKey: process.env.STRIPE_PUBLIC_KEY });
});

viewsRouter.post('/create-checkout-session', async (req, res) => {
  const cart = req.session.cart || [];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/real`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing payment');
  }
});

viewsRouter.get('/confirmation', async (req, res) => {
  const session_id = req.query.session_id;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const cart = req.session.cart || [];
    req.session.cart = [];

    res.render('confirmation', { title: 'Confirmation', session, cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving checkout session');
  }
});

viewsRouter.post('/remove-from-cart/:id', (req, res) => {
  const productId = req.params.id;
  req.session.cart = req.session.cart.filter(item => item.id !== productId);
  res.redirect('/real');
});

export default viewsRouter;
