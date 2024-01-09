const fs = require('fs');
const path = require('path');

class ProductsManager {
  constructor() {
    this.filePath = './src/data/fs/files/products.json';
  }

  create(data) {
    const products = this.read();
    const newProduct = {
      id: this.generateUniqueId(),
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
      return { statusCode: 500, response: 'Internal Server Error' };
    }
  }

  readOne(id) {
    const products = this.read();
    const product = products.find((p) => p.id === id);
    if (product) {
      return { statusCode: 200, response: product };
    } else {
      return { statusCode: 404, response: 'Product not found' };
    }
  }

  update(id, data) {
    const products = this.read();
    const index = products.findIndex((p) => p.id === id);

    if (index !== -1) {
      products[index] = { ...products[index], ...data };
      this.save(products);
      return { statusCode: 200, response: products[index] };
    } else {
      return { statusCode: 404, response: 'Product not found' };
    }
  }

  destroy(id) {
    const products = this.read();
    const filteredProducts = products.filter((p) => p.id !== id);

    if (filteredProducts.length < products.length) {
      this.save(filteredProducts);
      return { statusCode: 200, response: 'Product deleted successfully' };
    } else {
      return { statusCode: 404, response: 'Product not found' };
    }
  }

  save(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  generateUniqueId() {
    return crypto.randomBytes(8).toString('hex');
  }
}

module.exports = ProductsManager;
