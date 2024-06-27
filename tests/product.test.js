import supertest from 'supertest'; 
import { describe, it } from 'mocha';
import { expect } from 'chai';
import server from '../server.js';

const api = supertest('http://localhost:8080');

describe('Product API Tests', function () {
  it('should return 200 OK and a list of products', function (done) {
    api
      .get('/api/products')
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.be.an('array');
        done(err);
      });
  });

  it('should return 401 Unauthorized if user is not logged in', function (done) {
    api
      .post('/api/products')
      .send({ name: 'Test Product', price: 10000 })
      .expect(401)
      .end(function (err, res) {
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});