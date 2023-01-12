const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');
const manager = new ProductsController();

router.get('/', (req, res) => {
  let products = manager.getAll();
  res.send(products);
});

router.get('/:id', (req, res) => {
  res.send({ status: 200, message: 'Hello GET By Id' });
});

router.post('/', (req, res) => {
  res.send({ status: 200, message: 'Hello POST' });
});

router.put('/:id', (req, res) => {
  res.send({ status: 200, message: 'Hello PUT' });
});

router.delete('/:id', (req, res) => {
  res.send({ status: 200, message: 'Hello DELETE' });
});

module.exports = router;
