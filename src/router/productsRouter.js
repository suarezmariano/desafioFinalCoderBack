const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');
const manager = new ProductsController('src/data/products.json');

const ADMIN = true;

const isAdmin = (req, res, next) => {
  if (ADMIN) {
    next();
  } else {
    res.send({
      error: -1,
      descripcion: `Ruta ${req.baseUrl}${req.url} metodo ${req.method} no autorizada`,
    });
  }
};

const IdCheck = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.send({ error: -9, descripcion: 'El ID debe ser numérico' });
  } else if (id < 0) {
    res.send({ error: -10, descripcion: 'El ID debe ser un numero positivo' });
  } else {
    req.id = id;
    next();
  }
};

const productCheck = (req, res, next) => {
  const { body } = req;

  if (!body.nombre || body.nombre === '') {
    res.send({ error: -11, descripcion: 'Debe ingresar nombre de producto' });
    return;
  }
  /*
  if (!body.descripcion) {
    req.descripcion = '';
    return;
  }*/

  if (!body.url || body.url === '') {
    res.send({
      error: -11,
      descripcion: 'Debe ingresar URL de imagen de producto',
    });
    return;
  }

  if (!body.codigo || !Number.isInteger(body.codigo)) {
    res.send({
      error: -11,
      descripcion: 'Debe ingresar código de producto y ser numérico',
    });
    return;
  }

  if (!body.stock || !Number.isInteger(body.stock) || body.stock < 0) {
    res.send({
      error: -11,
      descripcion:
        'Debe ingresar la cantidad de stock y que esta sea una cantidad positiva.',
    });
    return;
  }

  if (!body.precio || body.precio < 0) {
    res.send({
      error: -11,
      descripcion: 'Debe ingresar el precio y que este sea positivo.',
    });
    return;
  }
  console.log(req.body), next();
};

router.get('/', async (req, res) => {
  res.send(await manager.getAll());
});

router.get('/:id', IdCheck, async (req, res) => {
  res.send(await manager.getById(req.id));
});

router.post('/', isAdmin, productCheck, async (req, res) => {
  res.send(await manager.createProduct(req.body));
});

router.put('/:id', isAdmin, IdCheck, productCheck, async (req, res) => {
  res.send(await manager.updateProduct(req.id, req.body));
});

router.delete('/:id', isAdmin, IdCheck, async (req, res) => {
  res.send(await manager.deleteProduct(req.id));
});

module.exports = router;
