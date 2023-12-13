# BACKEND55655

# Gestor de Productos y Usuarios

Este proyecto implementa las clases `GestorProductos` y `GestorUsuarios` para gestionar conjuntos de productos y usuarios.

## Clases

### `GestorProductos`

#### Métodos

- `crear(data)`: Agrega un producto al arreglo inicial. Todos los campos son obligatorios excepto el `id`, que se agrega automáticamente como autoincrementable.
- `leer()`: Devuelve el arreglo con todos los productos.
- `leerUno(id)`: Devuelve el objeto producto buscado por su `id`.

### `GestorUsuarios`

#### Métodos

- `crear(data)`: Agrega un usuario al arreglo inicial. Todos los campos son obligatorios excepto el `id`, que se agrega automáticamente como autoincrementable.
- `leer()`: Devuelve el arreglo con todos los usuarios.
- `leerUno(id)`: Devuelve el objeto usuario buscado por su `id`.
