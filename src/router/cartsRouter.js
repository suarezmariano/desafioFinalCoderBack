const express = require('express');
const router = express.Router();

const CartsController = require('../controllers/cartsController');
const manager = new CartsController('src/data/carts.json');

router.get('/', async (req, res) => {
  res.send(await manager.getAll());
});

module.exports = router;
