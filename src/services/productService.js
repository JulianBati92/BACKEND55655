import Product from '../data/models/Product';

class ProductService {
  // Crea un nuevo producto en la base de datos
  async create(productData) {
    try {
      const product = await Product.create(productData);
      return product;
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
  }

  // Actualiza un producto existente en la base de datos
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

  // Elimina un producto existente de la base de datos
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

  // Obtiene un producto por su ID de la base de datos
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

  // Obtiene todos los productos de la base de datos
  async getAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error('Error al obtener todos los productos');
    }
  }

  // Obtiene productos paginados de la base de datos
  async getProductsPaginated(pageNumber, pageSize) {
    try {
      const skip = (pageNumber - 1) * pageSize;
      const products = await Product.find().skip(skip).limit(pageSize);
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos paginados');
    }
  }

  // Obtiene el número total de productos en la base de datos
  async getProductCount() {
    try {
      const count = await Product.countDocuments();
      return count;
    } catch (error) {
      throw new Error('Error al obtener el conteo de productos');
    }
  }

  // Obtiene productos ordenados por precio en la base de datos
  async sortByPrice(order) {
    try {
      const sortOrder = order === 'asc' ? 1 : -1;
      const products = await Product.find().sort({ price: sortOrder });
      return products;
    } catch (error) {
      throw new Error('Error al ordenar los productos por precio');
    }
  }

  // Busca productos por categoría en la base de datos
  async searchByCategory(category) {
    try {
      const products = await Product.find({ category });
      return products;
    } catch (error) {
      throw new Error('Error al buscar productos por categoría');
    }
  }

  // Busca productos por etiqueta en la base de datos
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
