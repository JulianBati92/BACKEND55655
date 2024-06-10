import Product from '../data/mongo/models/product.model.js';

class ProductService {
  async create(productData) {
    try {
      const product = await Product.create(productData);
      return product;
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
  }

  async update(productId, productData) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
      if (!updatedProduct) {
        throw new Error('Producto no encontrado');
      }
      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async delete(productId) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new Error('Producto no encontrado');
      }
      return deletedProduct;
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }

  async getById(productId) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto por ID');
    }
  }

  async getAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error('Error al obtener todos los productos');
    }
  }

  async getProductsPaginated(pageNumber, pageSize) {
    try {
      const skip = (pageNumber - 1) * pageSize;
      const products = await Product.find().skip(skip).limit(pageSize);
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos paginados');
    }
  }

  async getProductCount() {
    try {
      const count = await Product.countDocuments();
      return count;
    } catch (error) {
      throw new Error('Error al obtener el conteo de productos');
    }
  }

  async sortByPrice(order) {
    try {
      const sortOrder = order === 'asc' ? 1 : -1;
      const products = await Product.find().sort({ price: sortOrder });
      return products;
    } catch (error) {
      throw new Error('Error al ordenar los productos por precio');
    }
  }

  async searchByCategory(category) {
    try {
      const products = await Product.find({ category });
      return products;
    } catch (error) {
      throw new Error('Error al buscar productos por categoría');
    }
  }

  async searchByTag(tag) {
    try {
      const products = await Product.find({ tags: tag });
      return products;
    } catch (error) {
      throw new Error('Error al buscar productos por etiqueta');
    }
  }
}

export default new ProductService();
