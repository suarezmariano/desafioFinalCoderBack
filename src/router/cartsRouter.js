const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cartController');
const manager = new CartController('src/data/carts.json');

const cartIdCheck = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.send({ error: -9, descripcion: 'El ID debe ser numérico' });
  } else if (id < 0) {
    res.send({ error: -10, descripcion: 'El ID debe ser un numero positivo' });
  } else {
    req.cartId = id;
    next();
  }
};

const prodIdCheck = (req, res, next) => {
  const id = parseInt(req.params.id_prod);
  if (isNaN(id)) {
    res.send({ error: 20, descripcion: 'El id debe ser numerico' });
  } else if (id < 0) {
    res.send({ error: 21, descripcion: 'El id debe ser un numero natural' });
  } else {
    req.prodId = id;
    next();
  }
};

const prodDataCheck = (req, res, next) => {
  const { body } = req;

  if (!body.nombre || body.nombre === '') {
    res.send({
      error: -11,
      descripcion: 'Debe ingresar nombre de producto',
    });
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

router.get('/:id/productos', cartIdCheck, async (req, res) => {
  res.send(await manager.getCartProducts(req.cartId));
});

router.post('/', async (req, res) => {
  res.send(await manager.createCart());
});

router.delete('/:id', cartIdCheck, async (req, res) => {
  res.send(await manager.deleteCart(req.cartId));
});

router.post('/:id/productos', cartIdCheck, prodDataCheck, async (req, res) => {
  res.send(await manager.addProductToCart(req.cartId, req.body));
});

router.delete(
  '/:id/productos/:id_prod',
  cartIdCheck,
  prodIdCheck,
  async (req, res) => {
    res.send(await manager.deleteProductFromCart(req.cartId, req.prodId));
  }
);

module.exports = router;
