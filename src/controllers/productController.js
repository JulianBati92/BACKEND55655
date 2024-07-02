import Product from '../models/product.model.js';
import CustomError from '../utils/errors/CustomError.js';

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

// Obtener productos del usuario premium
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ owner_id: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear producto del usuario premium
const createMyProduct = async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body, owner_id: req.user._id });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar producto del usuario premium
const updateMyProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, owner_id: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      throw CustomError.new('notFound');
    }
    res.json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Eliminar producto del usuario premium
const deleteMyProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      owner_id: req.user._id,
    });
    if (!product) {
      throw CustomError.new('notFound');
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getMyProducts, createMyProduct, updateMyProduct, deleteMyProduct };
