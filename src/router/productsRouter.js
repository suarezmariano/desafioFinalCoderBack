const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');
const manager = new ProductsController('src/data/products.json');

router.get('/', async (req, res) => {
  const products = await manager.getAll();
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await manager.getById(parseInt(req.params.id));
  res.send(product);
});

router.post('/', async (req, res) => {
  const newProduct = await manager.createProduct(req.body);
  res.send(newProduct);
});

router.put('/:id', async (req, res) => {
  const product = await manager.updateProduct(
    parseInt(req.params.id),
    req.body
  );
  res.send(product);
});

router.delete('/:id', (req, res) => {
  res.send({
    status: 200,
    message: `DELETE productos con id ${req.params.id}`,
  });
});

module.exports = router;
