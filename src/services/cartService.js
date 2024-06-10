import CartModel from '../models/cart.model.js';

class CartService {
  async createCart(userId) {
    const cart = new CartModel({ userId, items: [] });
    await cart.save();
    return cart;
  }

  async getCartByUserId(userId) {
    return await CartModel.findOne({ userId }).populate('items.productId');
  }

  async addItemToCart(userId, productId, quantity = 1) {
    const cart = await this.getCartByUserId(userId);
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    } else {
      const newCart = new CartModel({
        userId,
        items: [{ productId, quantity }]
      });
      await newCart.save();
    }
  }

  async updateCartItem(userId, productId, quantity) {
    const cart = await this.getCartByUserId(userId);
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
      }
    }
  }

  async removeCartItem(userId, productId) {
    const cart = await this.getCartByUserId(userId);
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
    }
  }
}

export default new CartService();
