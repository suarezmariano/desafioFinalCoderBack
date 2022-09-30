const fs = require('fs');

const file = './data/products.json';

const productController = {
  getAll: () => {
    try {
      let data = fs.readFileSync(file);
      return JSON.parse(data);
    } catch (error) {
      return { error: 0, descripcion: 'No existe el archivo' };
    }
  },
};

module.exports = productController;
