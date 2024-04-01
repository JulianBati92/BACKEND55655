import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stockQuantity: Number,
  imageUrl: String,
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
