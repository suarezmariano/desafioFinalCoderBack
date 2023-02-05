const express = require('express');
const app = express();

const productsRouter = require('./src/router/productsRouter');
const cartsRouter = require('./src/router/cartsRouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('json spaces', 2);

//SERVER
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log('Server running on port: ' + port);
});

server.on('error', (error) => console.log(`hubo un error ${error}`));

//ROUTES

app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);

app.use((req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `Ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`,
  });
});
