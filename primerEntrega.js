class GestorProductos {
  #productos = [];

  crear(data) {
    const id = this.#productos.length + 1;
    const producto = { id, ...data };
    this.#productos.push(producto);
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

  crear(data) {
    const id = this.#usuarios.length + 1;
    const usuario = { id, ...data };
    this.#usuarios.push(usuario);
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
  foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmiL7zJRF9lGntZMwqfF0A0RuPYQLdL23CBA&usqp=CAU",
  precio: 20000,
  stock: 50
});
console.log("Producto creado:", producto1);

const usuario1 = gestorUsuarios.crear({
  nombre: 'Usuario 1',
  foto: "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_1280.png",
  correo: 'usuario1@example.com'
});
console.log("Usuario creado:", usuario1);

// Obtener todos los productos y usuarios
const todosLosProductos = gestorProductos.leer();
const todosLosUsuarios = gestorUsuarios.leer();
console.log("Todos los productos:", todosLosProductos);
console.log("Todos los usuarios:", todosLosUsuarios);

// Obtener un producto y un usuario por ID
const productoPorId = gestorProductos.leerUno(1);
const usuarioPorId = gestorUsuarios.leerUno(1);
console.log("Producto por ID (1):", productoPorId);
console.log("Usuario por ID (1):", usuarioPorId);
