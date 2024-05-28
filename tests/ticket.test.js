import supertest from 'supertest'; 
import { describe, it } from 'mocha';
import { expect } from 'chai';

const api = supertest('http://localhost:8080');

describe('Ticket API Tests', function () {
  it('should return 200 OK and a list of tickets', function (done) {
    api
      .get('/api/tickets')
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.be.an('array');
        done(err);
      });
  });

  it('should return 401 Unauthorized if user is not logged in', function (done) {
    api
      .post('/api/tickets')
      .send({ userId: 'testUserId', amount: 100 })
      .expect(401)
      .end(function (err, res) {
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});
