const fs = require('fs');

class GestorProductos {
  constructor() {
    this.rutaArchivo = './data/productos.json';
  }

  crear(datosProducto) {
    const productos = this.leer();
    const nuevoProducto = {
      id: productos.length + 1, // Auto-incremental
      ...datosProducto,
    };
    productos.push(nuevoProducto);
    this.guardar(productos);
    return nuevoProducto;
  }

  leer() {
    try {
      const data = fs.readFileSync(this.rutaArchivo, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  leerUno(id) {
    const productos = this.leer();
    return productos.find((producto) => producto.id === id);
  }

  guardar(data) {
    fs.writeFileSync(this.rutaArchivo, JSON.stringify(data, null, 2), 'utf8');
  }
}

module.exports = GestorProductos;
