import Product from '../models/product.model.js';
import CustomError from '../../src/utils/errors/customError.js';

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw CustomError.new('notFound');
    }
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Crear nuevo producto
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar producto
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      throw CustomError.new('notFound');
    }
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw CustomError.new('notFound');
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
