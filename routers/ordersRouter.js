const express = require('express');
const OrdersManager = require('../data/fs/files/orders.manager');

const router = express.Router();
const ordersManager = new OrdersManager();

router.post('/', (req, res) => {
  const result = ordersManager.create(req.body);
  return res.status(result.statusCode).json(result.response);
});

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  const result = ordersManager.readOne(uid);
  return res.status(result.statusCode).json(result.response);
});

router.delete('/:oid', (req, res) => {
  const { oid } = req.params;
  const result = ordersManager.destroy(oid);
  return res.status(result.statusCode).json(result.response);
});

router.put('/:oid', (req, res) => {
  const { oid } = req.params;
  const { quantity, state } = req.body;
  const result = ordersManager.update(oid, quantity, state);
  return res.status(result.statusCode).json(result.response);
});

module.exports = router;
