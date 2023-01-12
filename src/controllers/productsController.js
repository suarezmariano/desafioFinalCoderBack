const fs = require('fs');

const file = '.src/data/products.json';

class productsController {
  getAll = async () => {
    if (!fs.existsSync(file)) {
      return { error: 0, message: 'No existe el archivo' };
    } else {
      let data = await fs.promises.readFile(file, 'utf-8');
      let products = JSON.parse(data);
      return { status: 'success', message: products };
    }
  };
}

module.exports = productsController;
