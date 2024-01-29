import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },

  },
  { timestamps: true }
);

const Product = model("Product", productSchema);
export default Product;
