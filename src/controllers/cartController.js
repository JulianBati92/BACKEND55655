import { CartService } from "../services/cartService.js";
import CustomError from "../utils/errors/CustomError.js";

const cartService = new CartService();

class CartController {
  async createCart(req, res) {
    try {
      const userId = req.user._id;
      const cart = await cartService.createCart(userId);
      res.status(201).json(cart);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async getCartProducts(req, res) {
    try {
      const userId = req.user._id;
      const cartProducts = await cartService.getCartProducts(userId);
      res.status(200).json(cartProducts);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async updateCartItem(req, res) {
    try {
      const userId = req.user._id;
      const { id: productId } = req.params;
      const updateData = req.body;
      const updatedItem = await cartService.updateCartItem(userId, productId, updateData);
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  async deleteCartItem(req, res) {
    try {
      const userId = req.user._id;
      const { id: productId } = req.params;
      await cartService.deleteCartItem(userId, productId);
      res.status(204).send();
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

export { CartController };
