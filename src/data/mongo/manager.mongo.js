import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class MongoManager {
  constructor(collectionName) {
    this.url = process.env.MONGO_URL;
    this.dbName = process.env.MONGO_DB_NAME;
    this.collectionName = collectionName;
    this.client = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
    } catch (error) {
      console.error(`MongoDB connection error: ${error.message}`);
      throw new Error('Unable to connect to the database');
    }
  }

  async close() {
    if (this.client) {
      await this.client.close();
      console.log('MongoDB connection closed');
    }
  }

  async create(data) {
    try {
      await this.connect();
      const result = await this.collection.insertOne(data);
      return result.ops[0];  
    } catch (error) {
      console.error(`Error creating document: ${error.message}`);
      throw error;
    } finally {
      await this.close();
    }
  }

  async read(filter = {}, sort = {}, limit = 0, skip = 0) {
    try {
      await this.connect();
      const cursor = this.collection.find(filter).sort(sort).limit(limit).skip(skip);
      return await cursor.toArray();
    } catch (error) {
      console.error(`Error reading documents: ${error.message}`);
      throw error;
    } finally {
      await this.close();
    }
  }

  async readOne(id) {
    try {
      await this.connect();
      const result = await this.collection.findOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      console.error(`Error reading document: ${error.message}`);
      throw error;
    } finally {
      await this.close();
    }
  }

  async update(id, data) {
    try {
      await this.connect();
      const result = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
      return result.modifiedCount > 0;
    } catch (error) {
      console.error(`Error updating document: ${error.message}`);
      throw error;
    } finally {
      await this.close();
    }
  }

  async delete(id) {
    try {
      await this.connect();
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document: ${error.message}`);
      throw error;
    } finally {
      await this.close();
    }
  }

  async report(userId) {
    try {
      await this.connect();
      const userOrders = await this.collection.find({ userId: userId }).toArray();
      const totalToPay = userOrders.reduce((total, order) => total + order.total, 0);
      return totalToPay;
    } catch (error) {
      console.error(`Error generating report: ${error.message}`);
      throw error;
    } finally {
      await this.close();
    }
  }
}

// Definimos una clase específica para gestionar órdenes
class OrderManager extends MongoManager {
  constructor() {
    super('orders'); // Nombre de la colección de órdenes
  }

  async getOrdersByUserId(userId) {
    return this.read({ userId: new ObjectId(userId) });
  }
}

export { MongoManager, OrderManager };
