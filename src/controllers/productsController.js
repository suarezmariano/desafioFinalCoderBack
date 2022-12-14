const fs = require('fs');

const file = '.src/data/products.json';

class productsController {
  getAll = async () => {
    if (!fs.existsSync(file))
      return { error: 0, message: 'No existe el archivo' };
    let data = await fs.promises.readFile(file, 'utf-8');
    return JSON.parse(data);
  };
}

module.exports = productsController;
