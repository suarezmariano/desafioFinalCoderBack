const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');
const manager = new ProductsController();

router.get('/', (req, res) => {
  manager
    .getAll()
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send({ error: 0, message: err }));
});

router.get('/:id', (req, res) => {
  res.send({ status: 200, message: `GET productos con id ${req.params.id}` });
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
