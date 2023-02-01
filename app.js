import express from 'express';
import productsRouter from './src/router/productsRouter';
import cartsRouter from './src/router/cartsRouter';
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
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);
app.use((req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `Ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`,
  });
});
