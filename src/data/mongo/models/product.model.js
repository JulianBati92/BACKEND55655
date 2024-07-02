import mongoose from 'mongoose';
const { model, Schema, models } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = models.Product || model('Product', productSchema);
export default Product;
