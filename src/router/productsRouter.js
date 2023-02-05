const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/productsController');
const manager = new ProductsController('src/data/products.json');

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

  if (!body.descripcion) {
    req.descripcion = '';
    return;
  }

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
  next();
};

router.get('/', async (req, res) => {
  const products = await manager.getAll();
  res.send(products);
});

router.get('/:id', IdCheck, async (req, res) => {
  const product = await manager.getById(req.id);
  res.send(product);
});

router.post('/', productCheck, async (req, res) => {
  const newProduct = await manager.createProduct(req.body);
  res.send(newProduct);
});

router.put('/:id', IdCheck, productCheck, async (req, res) => {
  const product = await manager.updateProduct(
    parseInt(req.params.id),
    req.body
  );
  res.send(product);
});

router.delete('/:id', IdCheck, async (req, res) => {
  const product = await manager.deleteProduct(parseInt(req.params.id));
  res.send(product);
});

module.exports = router;
