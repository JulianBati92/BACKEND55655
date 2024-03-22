import { productModel } from "../models/productModel.js";

export const getAllProducts = async () => {
    return await productModel.find({});
};

export const getProductById = async (productId) => {
    return await productModel.findById(productId);
};

export const createProduct = async (productData) => {
    return await productModel.create(productData);
};

export const updateProduct = async (productId, updateData) => {
    return await productModel.findByIdAndUpdate(productId, updateData, { new: true });
};

export const deleteProduct = async (productId) => {
    return await productModel.findByIdAndDelete(productId);
};
