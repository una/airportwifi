var request = require('supertest');
var app = require('./app');

//test db
var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Requests to the root path', function () {
    it('Returns a 200 status code', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    });

    it('Returns an HTML format', function (done) {
      request(app)
        .get('/')
        .expect('Content-type', /html/, done);
    });

    it('Returns an index file with airports', function (done) {
      request(app)
        .get('/')
        .expect(/airports/i, done);
    });
});

describe('Listing Airports', function () {
  it('Returns 200 status code', function(done) {
    request(app)
      .get('/airports')
      .expect(200, done);
  });

  it('JSON data returned', function (done) {
    request(app)
      .get('/airports')
      .expect('Content-Type', /json/, done);
    });

  it('Returns initial airports', function(done) {
    request(app)
      .get('/airports')
      .expect(JSON.stringify([]), done);
  });
});

describe('Adding new airports', function () {
  it('Returns a 201 status code', function (done) {
      request(app)
        .post('/airports')
        .send('name=Name&description=this+is+the+description')
        .expect(201, done);
  });

  it('Returns the airport name', function (done) {
      request(app)
        .post('/airports')
        .send('name=Name&description=this+is+the+description')
        .expect(/name/i, done);
  });
});