const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 

class ProductsManager {
  constructor() {
    this.filePath = './src/data/fs/products.json'; 
  }

  create(data) {
    const products = this.read();
    const newProduct = {
      id: uuidv4(), 
      ...data,
    };
    products.push(newProduct);
    this.save(products);
    return { statusCode: 201, response: newProduct };
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
    const product = products.find((p) => p.id === id);
    return product ? { statusCode: 200, response: product } : { statusCode: 404, response: 'Not Found' };
  }

  update(id, data) {
    const products = this.read();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      this.save(products);
      return { statusCode: 200, response: products[index] };
    } else {
      return { statusCode: 404, response: 'Not Found' };
    }
  }

  destroy(id) {
    const products = this.read();
    const updatedProducts = products.filter((p) => p.id !== id);
    this.save(updatedProducts);
    return { statusCode: 200, response: 'Deleted successfully' };
  }

  save(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}

module.exports = ProductsManager;

