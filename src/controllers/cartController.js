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
      if (!e.message.startsWith('No existe el carrito con ID')) {
        return { error: -3, descripcion: 'El archivo de carritos no existe' };
      }
    }
  }

  async createCart(cart) {
    let carts = [];
    let newCart;

    try {
      if (fs.existsSync(this.path)) {
        carts = await this.getAll();
        newCart = {
          id: carts[carts.length - 1].id + 1,
          timestamp: Date.now(),
          ...cart,
        };
      } else {
        newCart = { id: 1, timestamp: Date.now(), ...cart };
      }

      await fs.promises.writeFile(
        this.path,
        JSON.stringify([...carts, newCart], null, 2)
      );
      return { newCartId: newCart.id };
    } catch (e) {
      return { error: -6, message: 'No se pudo crear el carrito nuevo' };
    }
  }

  async deleteCart(id) {
    try {
      const carts = await this.getAll();
      if (carts.error) {
        return { ...carts };
      }

      const index = carts.findIndex((p) => p.id === id);
      if (index !== -1) {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(
            carts.filter((p) => p.id !== id),
            null,
            2
          )
        );
        return carts[index];
      } else {
        return { error: -5, descripcion: `No existe el carrito con ID ${id}` };
      }
    } catch (e) {
      return { error: -8, descripcion: 'No se pudo borrar el carrito' };
    }
  }
}

module.exports = cartsController;
