import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stockQuantity: Number,
  imageUrl: String,
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
