const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

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
    } finally {
      await this.close();
    }
  }

  async read({ filter, sortAndPaginate }) {
    try {
      await this.connect();
      const query = {};
      if (filter) query.filter = filter;
      const cursor = this.collection.find(query).sort(sortAndPaginate).limit(sortAndPaginate.limit).skip(sortAndPaginate.skip);
      return cursor.toArray();
    } finally {
      await this.close();
    }
  }

  async readOne(id) {
    try {
      await this.connect();
      const result = await this.collection.findOne({ _id: new ObjectId(id) });
      return result;
    } finally {
      await this.close();
    }
  }

  async update(id, data) {
    try {
      await this.connect();
      await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    } finally {
      await this.close();
    }
  }

  async destroy(id) {
    try {
      await this.connect();
      await this.collection.deleteOne({ _id: new ObjectId(id) });
    } finally {
      await this.close();
    }
  }

  async report(uid) {
    try {
      await this.connect();
      const userOrders = await this.collection.find({ userId: uid }).toArray();

      const totalToPay = userOrders.reduce((total, order) => total + order.total, 0);

      return totalToPay;
    } finally {
      await this.close();
    }
  }
}

export { MongoManager };