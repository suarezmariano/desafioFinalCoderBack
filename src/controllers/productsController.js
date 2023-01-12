const fs = require('fs');

const file = './data/products.json';

class productsController {
  getAll = async () => {
    if (!fs.existsSync(file)) {
      return { error: 0, descripcion: 'No existe el archivo' };
    } else {
      let data = await fs.promises.readFile(file, 'utf-8');
      return JSON.parse(data);
    }
  };
}

module.exports = productsController;
