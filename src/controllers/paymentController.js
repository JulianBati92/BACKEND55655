import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutPayment = async (req, res) => {
  try {
    const { items } = req.body;

    // Verificar que todos los elementos tengan los campos requeridos
    const missingFields = items.some(item => !item.title || !item.price || !item.quantity);
    if (missingFields) {
      return res.status(400).json({ message: 'Some items in the cart are missing required fields.' });
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
