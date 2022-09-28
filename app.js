const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SERVER
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log('Server running on port: ' + port);
});

server.on('error', (error) => console.log(`hubo un error ${error}`));

//ROUTES
const productsRouter = require('./routes/productsRouter');
const cartRouter = require('./routes/cartsRouter');

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.use('/', (req, res) => {
  res.redirect('/api/products');
});

app.use((req, res, next) => {
  res.status(404).render('not-found');
});
