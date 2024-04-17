import { orderModel } from "../models/orderModel.js";

export const getAllOrders = async () => {
    return await orderModel.find({});
};

export const getOrderById = async (orderId) => {
    return await orderModel.findById(orderId);
};

export const createOrder = async (orderData) => {
    return await orderModel.create(orderData);
};

export const updateOrder = async (orderId, updateData) => {
    return await orderModel.findByIdAndUpdate(orderId, updateData, { new: true });
};

export const deleteOrder = async (orderId) => {
    return await orderModel.findByIdAndDelete(orderId);
};
