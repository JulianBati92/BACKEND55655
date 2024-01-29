import UserModel from './mongo/models/user.model.js';
import OrderModel from './mongo/models/order.model.js';
import ProductModel from './mongo/models/product.model.js';

class MongoManager {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const newItem = await this.model.create(data);
            return newItem;
        } catch (error) {
            throw error;
        }
    }

    async read(options = {}) {
        try {
            const result = await this.model.find(options.filter).sort(options.sort);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async readOne(itemId) {
        try {
            const item = await this.model.findById(itemId);
            return item;
        } catch (error) {
            throw error;
        }
    }

    async update(itemId, data) {
        try {
            const updatedItem = await this.model.findByIdAndUpdate(itemId, data, { new: true });
            return updatedItem;
        } catch (error) {
            throw error;
        }
    }

    async destroy(itemId) {
        try {
            const deletedItem = await this.model.findByIdAndDelete(itemId);
            return deletedItem;
        } catch (error) {
            throw error;
        }
    }

    async readByEmail(email) {
        try {
            const item = await this.model.findOne({ email });
            return item;
        } catch (error) {
            throw error;
        }
    }
}

export const UserManager = new MongoManager(UserModel);
export const OrderManager = new MongoManager(OrderModel);
export const ProductManager = new MongoManager(ProductModel);
