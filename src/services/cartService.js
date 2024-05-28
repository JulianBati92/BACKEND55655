import { CartModel } from "../models/cartModel.js";

class CartService {
  async createCart(userId) {
    const cart = await CartModel.create({ user: userId, products: [] });
    return cart;
  }

  async getCartProducts(userId) {
    const cart = await CartModel.findOne({ user: userId }).populate("products");
    return cart.products;
  }

  async updateCartItem(userId, productId, updateData) {
    const cart = await CartModel.findOne({ user: userId });
    const productIndex = cart.products.findIndex(product => product._id === productId);
    if (productIndex === -1) {
      throw new CustomError("Product not found in cart", 404);
    }
    cart.products[productIndex] = { ...cart.products[productIndex], ...updateData };
    await cart.save();
    return cart.products[productIndex];
  }

  async deleteCartItem(userId, productId) {
    const cart = await CartModel.findOne({ user: userId });
    cart.products = cart.products.filter(product => product._id !== productId);
    await cart.save();
  }
}

export { CartService };
