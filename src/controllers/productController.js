const productService = require('../services/productService');

class ProductController {
  async createProduct(req, res) {
    try {
      // Lógica para crear un nuevo producto
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      // Lógica para actualizar un producto existente
      const updatedProduct = await productService.update(req.params.id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      // Lógica para eliminar un producto existente
      await productService.delete(req.params.id);
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProduct(req, res) {
    try {
      // Lógica para obtener un producto por su ID
      const product = await productService.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      // Lógica para obtener todos los productos
      const products = await productService.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProductController();
