import express from 'express'
import router from express.Router()

import ProductsController from '../controllers/productsController'
import manager from new ProductsController();

router.get('/', (req, res) => {
  manager
    .getAll()
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send({ error: 0, message: err }));
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

exports = router;
