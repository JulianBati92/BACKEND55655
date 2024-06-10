import cartService from "../services/cartService.js"; 

class CartController {
  async createCart(req, res) {
    const userId = req.user._id;
    try {
      const cart = await cartService.createCart(userId);
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCartProducts(req, res) {
    const userId = req.user._id;
    try {
      const cart = await cartService.getCartByUserId(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCartItem(req, res) {
    const userId = req.user._id;
    const productId = req.params.id;
    const { quantity } = req.body;
    try {
      await cartService.updateCartItem(userId, productId, quantity);
      res.status(200).send("Cart item updated");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCartItem(req, res) {
    const userId = req.user._id;
    const productId = req.params.id;
    try {
      await cartService.removeCartItem(userId, productId);
      res.status(200).send("Cart item removed");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export { CartController };
