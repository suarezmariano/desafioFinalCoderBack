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
      const products = await this.getAll();
      const product = products.find((p) => p.id === id);
      if (product) {
        return product;
      }
      return {
        error: -5,
        descripcion: `No existe el producto con ID nro ${id}`,
      };
    } catch (e) {
      if (!e.message.startsWith('No existe el producto con ID')) {
        return { error: -3, descripcion: 'El archivo de productos no existe' };
      }
    }
  }

  async createProduct(prod) {
    let products = [];
    let newProduct;

    try {
      if (fs.existsSync(this.path)) {
        products = await this.getAll();
        newProduct = {
          id: products[products.length - 1].id + 1,
          timestamp: Date.now(),
          ...prod,
        };
      } else {
        newProduct = { id: 1, timestamp: Date.now(), ...prod };
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

  async updateProduct(id, prod) {
    try {
      const products = await this.getAll();

      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...prod };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify([...products], null, 2)
        );
        return products[index];
      } else {
        return { error: -5, descripcion: `No existe el producto con ID ${id}` };
      }
    } catch (e) {
      return { error: -7, message: 'No se pudo modificar el producto' };
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getAll();
      if (products.error) {
        return { ...products };
      }

      const index = products.findIndex((p) => p.id === id);
      if (index !== -1) {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(
            products.filter((p) => p.id !== id),
            null,
            2
          )
        );
        return products[index];
      } else {
        return { error: -5, descripcion: `No existe el producto con ID ${id}` };
      }
    } catch (e) {
      return { error: -8, descripcion: 'No se pudo borrar el producto' };
    }
  }
}

module.exports = productsController;
