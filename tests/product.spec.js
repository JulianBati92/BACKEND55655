import supertest from 'supertest'; 
import { describe, it } from 'mocha';
import { expect } from 'chai';

const api = supertest('http://localhost:8080'); // Crea una instancia de supertest para hacer solicitudes HTTP al servidor en el puerto 8080

// Describe un conjunto de pruebas relacionadas con la API de productos
describe('Product API Tests', function () {
  
  // Prueba que verifica si se obtiene una lista de productos correctamente
  it('should return 200 OK and a list of products', function (done) {
    api
      .get('/api/products') 
      .expect(200) 
      .end(function (err, res) {
        expect(res.body).to.be.an('array'); 
        done(err); 
      });
  });

  // Prueba que verifica si se requiere autenticación para crear un producto
  it('should return 401 Unauthorized if user is not logged in', function (done) {
    api
      .post('/api/products') 
      .send({ name: 'Test Product', price: 10000 }) 
      .expect(401) 
      .end(done); 
  });
});
