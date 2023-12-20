const fs = require('fs');

class GestorUsuarios {
  constructor() {
    this.rutaArchivo = './data/usuarios.json';
  }

  crear(datosUsuario) {
    const usuarios = this.leer();
    const nuevoUsuario = {
      id: usuarios.length + 1, // Auto-incremental
      ...datosUsuario,
    };
    usuarios.push(nuevoUsuario);
    this.guardar(usuarios);
    return nuevoUsuario;
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
    const usuarios = this.leer();
    return usuarios.find((usuario) => usuario.id === id);
  }

  guardar(data) {
    fs.writeFileSync(this.rutaArchivo, JSON.stringify(data, null, 2), 'utf8');
  }
}

module.exports = GestorUsuarios;
