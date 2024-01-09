const express = require('express');
const ProductsManager = require('../data/fs/files/products.manager');

const router = express.Router();
const productsManager = new ProductsManager();

router.post('/', (req, res) => {
  const result = productsManager.create(req.body);
  return res.status(result.statusCode).json(result.response);
});

router.get('/', (req, res) => {
  const result = productsManager.read();
  return res.status(result.statusCode).json(result.response);
});

router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const result = productsManager.readOne(pid);
  return res.status(result.statusCode).json(result.response);
});

router.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const result = productsManager.update(pid, req.body);
  return res.status(result.statusCode).json(result.response);
});

router.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  const result = productsManager.destroy(pid);
  return res.status(result.statusCode).json(result.response);
});

module.exports = router;
