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

  async getCartProducts(id) {
    const carts = await this.getAll();

    const cart = carts.find((c) => c.id === id);
    if (cart) {
      return cart.productos;
    }

    throw { error: -5, descripcion: `No existe el carrito con ID ${id}` };
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

  async addProductToCart(id, p) {
    const carts = await this.getAll();
    const index = carts.findIndex((c) => c.id === id);
    const newProd = p;

    if (index === -1) {
      throw { error: -5, descripcion: `No existe el carrito con ID ${id}` };
    }

    const cartProducts = carts[index].productos;
    const cartProdLength = cartProducts.length;

    if (cartProdLength > 0) {
      newProd.id = cartProducts[cartProdLength - 1].id + 1;
    } else {
      newProd.id = 1;
    }
    newProd.timestamp = Date.now();

    cartProducts.push(newProd);

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return newProd;
    } catch {
      throw {
        error: -7,
        descripcion: 'No se pudo modificar el carrito de productos',
      };
    }
  }

  async deleteProductFromCart(cartId, prodId) {
    const carts = await this.getAll();
    const index = carts.findIndex((c) => c.id === cartId);

    if (index === -1) {
      throw { error: -5, descripcion: `No existe el carrito de id ${cartId}` };
    }

    const cartProducts = carts[index].productos;
    const prod = cartProducts.find((p) => p.id === prodId);

    if (!prod) {
      throw { error: -5, descripcion: `No existe el producto de id ${prodId}` };
    }

    carts[index].productos = cartProducts.filter((p) => p.id !== prodId);

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return prod;
    } catch {
      throw {
        error: -7,
        descripcion: 'No se pudo modificar el carrito de productos',
      };
    }
  }
}

module.exports = cartsController;
