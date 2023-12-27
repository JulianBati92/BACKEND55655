const fs = require('fs');
const path = require('path');

class ProductsManager {
  constructor() {
    this.filePath = './data/fs/files/products.json';
  }

  create(data) {
    const products = this.read();
    const newProduct = {
      id: this.generateUniqueId(),
      ...data,
    };
    products.push(newProduct);
    this.save(products);
    return newProduct;
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  readOne(id) {
    const products = this.read();
    return products.find((product) => product.id === id);
  }

  destroy(id) {
    const products = this.read();
    const updatedProducts = products.filter((product) => product.id !== id);
    this.save(updatedProducts);
  }

  save(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  generateUniqueId() {
    const timestamp = new Date().getTime().toString(16);
    const randomString = Math.random().toString(16).substring(2);
    return `${timestamp}-${randomString}`;
  }
}

module.exports = ProductsManager;
