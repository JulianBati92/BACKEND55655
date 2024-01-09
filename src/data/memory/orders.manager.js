const fs = require('fs');
const path = require('path');

class OrdersManager {
  constructor() {
    this.filePath = './src/data/fs/files/orders.json';
    this.orders = [];
  }

  create(data) {
    const newOrder = {
      id: this.generateUniqueId(),
      pid: data.pid,
      uid: data.uid,
      quantity: data.quantity,
      state: 'pending',
    };
    this.orders.push(newOrder);
    this.save();
    return { statusCode: 201, response: newOrder };
  }

  read() {
    return { statusCode: 200, response: this.orders };
  }

  readOne(uid) {
    const userOrders = this.orders.filter((order) => order.uid === uid);
    return { statusCode: 200, response: userOrders };
  }

  update(oid, quantity, state) {
    const order = this.orders.find((o) => o.id === oid);
    if (!order) {
      return { statusCode: 404, response: 'Order not found' };
    }

    order.quantity = quantity || order.quantity;
    order.state = state || order.state;
    this.save();
    return { statusCode: 200, response: order };
  }

  destroy(oid) {
    const index = this.orders.findIndex((order) => order.id === oid);
    if (index === -1) {
      return { statusCode: 404, response: 'Order not found' };
    }

    const deletedOrder = this.orders.splice(index, 1);
    this.save();
    return { statusCode: 200, response: deletedOrder[0] };
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.orders, null, 2), 'utf8');
  }

  generateUniqueId() {
    return crypto.randomBytes(8).toString('hex');
  }
}

module.exports = OrdersManager;
