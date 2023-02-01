const fs = require('fs');

class productsController {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    if (fs.existsSync(this.path)) {
      return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    }
    return { error: -3, descripcion: 'El archivo de productos no existe' };
  }
  catch(e) {
    return { error: -4, descripcion: 'Error al leer el archivo de productos' };
  }

  async getById(id) {
    try {
      const products = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );
      const product = products.find((p) => p.id === id);
      if (product) {
        return product;
      }
      throw new Error(`No existe el producto de id ${id}`);
    } catch (e) {
      if (e.message.startsWith('No existe el producto de id')) {
        return { error: -5, descripcion: e.message };
      }
      return { error: -3, descripcion: 'El archivo de productos no existe' };
    }
  }

  async createProduct(p) {
    let products = [];
    let newProduct;

    try {
      if (fs.existsSync(this.path)) {
        products = await this.getAll();
        newProduct = {
          id: products[products.length - 1].id + 1,
          timestamp: Date.now(),
          ...p,
        };
      } else {
        newProduct = { id: 1, timestamp: Date.now(), ...p };
      }

      await fs.promises.writeFile(
        this.path,
        JSON.stringify([...products, newProduct], null, 2)
      );
      return newProduct;
    } catch (e) {
      return { error: -6, message: 'No se pudo crear el producto nuevo' };
    }
  }
}

module.exports = productsController;
