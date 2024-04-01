import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  status: { type: String, enum: ['pending', 'completed', 'cancelled'] },
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
