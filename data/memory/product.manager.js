class ProductManager {
    constructor() {
      this.products = [];
    }
  
    create(data) {
      const product = { id: this.products.length + 1, ...data };
      this.products.push(product);
      return product;
    }
  
    read() {
      return this.products.length
        ? { success: true, response: this.products }
        : { success: false, message: 'No encontrado!' };
    }
  
    readOne(id) {
        const product = this.products.find((p) => p.id === id);
        console.log(`Resultado:`, product);
        return product
          ? { success: true, response: product }
          : { success: false, message: 'No encontrado!' };
    }
  
    destroy(id) {
      this.products = this.products.filter((p) => p.id !== id);
    }
  }
  
  module.exports = ProductManager;
  