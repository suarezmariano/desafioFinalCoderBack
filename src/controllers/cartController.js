const fs = require('fs');

class cartsController {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    if (fs.existsSync(this.path)) {
      return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
    }
    return { error: -3, descripcion: 'El archivo de carritos no existe' };
  }
  catch(e) {
    return { error: -4, descripcion: 'Error al leer el archivo de carritos' };
  }

  async getById(id) {
    try {
      const carts = await this.getAll();
      const cart = carts.find((p) => p.id === id);
      if (cart) {
        return cart;
      }
      return {
        error: -5,
        descripcion: `No existe el carrito con ID nro ${id}`,
      };
    } catch (e) {
      if (!e.message.startsWith('No existe el carrito de id')) {
        return { error: -3, descripcion: 'El archivo de carritos no existe' };
      }
    }
  }
}
