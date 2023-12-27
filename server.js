const express = require('express');
const ProductsManager = require('./data/fs/files/products.fs');
const UsersManager = require('./data/fs/files/users.fs');

const app = express();
const port = 8080;

const productsManager = new ProductsManager();
const usersManager = new UsersManager();

app.use(express.json());

// Endpoints de productos
app.get('/api/products', (req, res) => {
  const result = productsManager.read();
  if (result.length > 0) {
    return res.json({ success: true, response: result });
  } else {
    return res.status(404).json({ success: false, message: 'not found!' });
  }
});

app.get('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const result = productsManager.readOne(pid);
  if (result) {
    return res.json({ success: true, response: result });
  } else {
    return res.status(404).json({ success: false, message: 'not found!' });
  }
});

// Endpoints de usuarios
app.get('/api/users', (req, res) => {
  const result = usersManager.read();
  if (result.length > 0) {
    return res.json({ success: true, response: result });
  } else {
    return res.status(404).json({ success: false, message: 'not found!' });
  }
});

app.get('/api/users/:uid', (req, res) => {
  const { uid } = req.params;
  const result = usersManager.readOne(uid);
  if (result) {
    return res.json({ success: true, response: result });
  } else {
    return res.status(404).json({ success: false, message: 'not found!' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
