const express = require('express');
const UsersManager = require('../data/fs/files/users.manager');

const router = express.Router();
const usersManager = new UsersManager();

router.post('/', (req, res) => {
  const result = usersManager.create(req.body);
  return res.status(result.statusCode).json(result.response);
});

router.get('/', (req, res) => {
  const result = usersManager.read();
  return res.status(result.statusCode).json(result.response);
});

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  const result = usersManager.readOne(uid);
  return res.status(result.statusCode).json(result.response);
});

module.exports = router;
