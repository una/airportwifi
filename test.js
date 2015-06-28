var request = require('supertest');
var app = require('./app');

describe('Resuests to the root path', function () {
    it('Returns a 200 status code', function(done) {
      request(app)
        .get('/')
        .expect(200)
        .end(function(err) {
          if(err) throw err;
          done();
        });
    });
});
