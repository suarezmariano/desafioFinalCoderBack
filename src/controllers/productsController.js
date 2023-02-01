const fs = require('fs');

const file = '.src/data/products.json';

class productsController {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    } catch (e) {
      return { error: -3, descripcion: 'El archivo de productos no existe' };
    }
  }
}

module.exports = productsController;
