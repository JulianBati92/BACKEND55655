import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  photo: String,
  updatedAt: { type: Date, default: Date.now },
});

const ProductModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default ProductModel;
