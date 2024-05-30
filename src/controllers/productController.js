import productService from '../services/productService.js';
import errors from '../utils/errors/errors.js';

async function createProduct(req, res) {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(errors.internalServerError.statusCode).json({ message: errors.internalServerError.message });
  }
}

async function updateProduct(req, res) {
  try {
    const updatedProduct = await productService.update(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(errors.internalServerError.statusCode).json({ message: errors.internalServerError.message });
  }
}

async function deleteProduct(req, res) {
  try {
    await productService.delete(req.params.id);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(errors.internalServerError.statusCode).json({ message: errors.internalServerError.message });
  }
}

async function getProduct(req, res) {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) {
      return res.status(errors.notFound.statusCode).json({ message: errors.notFound.message });
    }
    res.json(product);
  } catch (error) {
    res.status(errors.internalServerError.statusCode).json({ message: errors.internalServerError.message });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    res.status(errors.internalServerError.statusCode).json({ message: errors.internalServerError.message });
  }
}

export { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts };
