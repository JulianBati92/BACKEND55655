const fs = require('fs');
const path = require('path');

class GestorProductos {
  #productos = [];
  #rutaArchivo = path.join(__dirname, 'data', 'json', 'productos.json');

  constructor() {
    this.#cargarDatos();
  }

  #cargarDatos() {
    try {
      const data = fs.readFileSync(this.#rutaArchivo, 'utf8');
      this.#productos = JSON.parse(data) || [];
    } catch (error) {
      this.#productos = [];
    }
  }

  #guardarDatos() {
    fs.writeFileSync(this.#rutaArchivo, JSON.stringify(this.#productos, null, 2), 'utf8');
  }

  crear(data) {
    const id = this.#productos.length + 1;
    const producto = { id, ...data };
    this.#productos.push(producto);
    this.#guardarDatos();
    return producto;
  }

  leer() {
    return this.#productos;
  }

  leerUno(id) {
    return this.#productos.find(producto => producto.id === id);
  }
}

class GestorUsuarios {
  #usuarios = [];
  #rutaArchivo = path.join(__dirname, 'data', 'json', 'usuarios.json');

  constructor() {
    this.#cargarDatos();
  }

  #cargarDatos() {
    try {
      const data = fs.readFileSync(this.#rutaArchivo, 'utf8');
      this.#usuarios = JSON.parse(data) || [];
    } catch (error) {
      this.#usuarios = [];
    }
  }

  #guardarDatos() {
    fs.writeFileSync(this.#rutaArchivo, JSON.stringify(this.#usuarios, null, 2), 'utf8');
  }

  crear(data) {
    const id = this.#usuarios.length + 1;
    const usuario = { id, ...data };
    this.#usuarios.push(usuario);
    this.#guardarDatos();
    return usuario;
  }

  leer() {
    return this.#usuarios;
  }

  leerUno(id) {
    return this.#usuarios.find(usuario => usuario.id === id);
  }
}

// Ejemplo de uso
const gestorProductos = new GestorProductos();
const gestorUsuarios = new GestorUsuarios();

// Crear productos y usuarios
const producto1 = gestorProductos.crear({
  titulo: 'Producto 1',
  foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmiL7zJRF9lGntZMwqfF0A0RuPYQLdL23CBA&usqp=CAU',
  precio: 20000,
  stock: 50
});
console.log('Producto creado:', producto1);

const usuario1 = gestorUsuarios.crear({
  nombre: 'Usuario 1',
  foto: 'https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_1280.png',
  correo: 'usuario1@example.com'
});
console.log('Usuario creado:', usuario1);

// Obtener todos los productos y usuarios
const todosLosProductos = gestorProductos.leer();
const todosLosUsuarios = gestorUsuarios.leer();
console.log('Todos los productos:', todosLosProductos);
console.log('Todos los usuarios:', todosLosUsuarios);

// Obtener un producto y un usuario por ID
const productoPorId = gestorProductos.leerUno(1);
const usuarioPorId = gestorUsuarios.leerUno(1);
console.log('Producto por ID (1):', productoPorId);
console.log('Usuario por ID (1):', usuarioPorId);
