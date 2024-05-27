import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MongoManager } from '../src/data/mongo/manager.mongo.js';

let mongoServer;

// Configuración inicial: conectarse a la base de datos en memoria antes de ejecutar las pruebas
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Finalización: desconectarse y detener la base de datos en memoria después de ejecutar las pruebas
after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Limpiar la base de datos antes de cada prueba para asegurar que las pruebas sean independientes
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('MongoManager', function () {

  // Prueba para la creación de un nuevo usuario
  it('should create a new user', async function () {
    const userData = { googleId: '123', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    const user = await MongoManager.create(userData);
    // Verifica que el usuario tenga una propiedad '_id' generada por MongoDB
    expect(user).to.have.property('_id');
    // Verifica que los datos del usuario creado coincidan con los datos proporcionados
    expect(user.googleId).to.equal(userData.googleId);
    expect(user.firstName).to.equal(userData.firstName);
    expect(user.lastName).to.equal(userData.lastName);
    expect(user.email).to.equal(userData.email);
  });

  // Prueba para buscar un usuario que no existe
  it('should return null for a non-existing user', async function () {
    const user = await MongoManager.readOne({ googleId: 'nonexistent' });
    // Verifica que el usuario no existe
    expect(user).to.be.null;
  });

  // Prueba para encontrar un usuario existente
  it('should find an existing user', async function () {
    const userData = { googleId: '123', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    await MongoManager.create(userData);
    const user = await MongoManager.readOne({ googleId: '123' });
    // Verifica que el usuario encontrado no sea nulo y que los datos coincidan
    expect(user).to.not.be.null;
    expect(user.googleId).to.equal(userData.googleId);
    expect(user.firstName).to.equal(userData.firstName);
    expect(user.lastName).to.equal(userData.lastName);
    expect(user.email).to.equal(userData.email);
  });

  // Prueba para actualizar un usuario existente
  it('should update an existing user', async function () {
    const userData = { googleId: '123', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    await MongoManager.create(userData);
    const updatedData = { firstName: 'Jane' };
    const updatedUser = await MongoManager.update({ googleId: '123' }, updatedData);
    // Verifica que el usuario actualizado no sea nulo y que el campo actualizado coincida
    expect(updatedUser).to.not.be.null;
    expect(updatedUser.firstName).to.equal(updatedData.firstName);
    expect(updatedUser.lastName).to.equal(userData.lastName);
    expect(updatedUser.email).to.equal(userData.email);
  });

  // Prueba para eliminar un usuario existente
  it('should delete an existing user', async function () {
    const userData = { googleId: '123', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
    await MongoManager.create(userData);
    await MongoManager.delete({ googleId: '123' });
    const user = await MongoManager.readOne({ googleId: '123' });
    // Verifica que el usuario haya sido eliminado
    expect(user).to.be.null;
  });

  // Prueba para retornar todos los usuarios
  it('should return all users', async function () {
    const usersData = [
      { googleId: '123', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { googleId: '124', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' }
    ];
    await MongoManager.create(usersData[0]);
    await MongoManager.create(usersData[1]);
    const users = await MongoManager.readAll({});
    // Verifica que el número de usuarios retornados sea el esperado
    expect(users).to.have.lengthOf(2);
    // Verifica que los datos de los usuarios coincidan con los datos proporcionados
    expect(users[0].googleId).to.equal(usersData[0].googleId);
    expect(users[1].googleId).to.equal(usersData[1].googleId);
  });

  // Prueba para manejar errores durante la creación de usuarios
  it('should handle errors gracefully', async function () {
    try {
      await MongoManager.create({ invalidField: 'value' });
      // Si no se lanza una excepción, la prueba falla
      expect.fail('Expected an error but none was thrown');
    } catch (error) {
      // Verifica que se haya lanzado una excepción
      expect(error).to.exist;
    }
  });

  // Prueba para manejar la actualización y eliminación de usuarios no existentes
  it('should handle updating and deleting non-existing users', async function () {
    // Intentar actualizar un usuario que no existe
    const updatedUser = await MongoManager.update({ googleId: 'nonexistent' }, { firstName: 'Updated' });
    // Verifica que el usuario actualizado sea nulo
    expect(updatedUser).to.be.null;

    // Intentar eliminar un usuario que no existe
    const deletedUser = await MongoManager.delete({ googleId: 'nonexistent' });
    // Verifica que el usuario eliminado sea nulo
    expect(deletedUser).to.be.null;
  });
});
