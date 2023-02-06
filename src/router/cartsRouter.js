const express = require('express');
const router = express.Router();

const CartsController = require('../controllers/cartsController');
const manager = new CartsController('src/data/carts.json');

router.get('/', async (req, res) => {
  res.send(await manager.getAll());
});

router.delete('/:id', async (req, res) => {
  res.send(await manager.deleteCart(req.id));
});

route.get('/:id/productos', async (req, res) => {
  res.send(await manager.getCartProducts(req.cartId));
});

module.exports = router;
