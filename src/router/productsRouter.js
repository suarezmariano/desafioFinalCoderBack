const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');
const manager = new ProductsController();

router.get('/', async (req, res) => {
  const products = await manager.getAll();
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await manager.getById();
  res.send(product);
});

router.post('/', (req, res) => {
  res.send({ status: 200, message: `POST productos con id ${req.params.id}` });
});

router.put('/:id', (req, res) => {
  res.send({ status: 200, message: `PUT productos con id ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.send({
    status: 200,
    message: `DELETE productos con id ${req.params.id}`,
  });
});

module.exports = router;
