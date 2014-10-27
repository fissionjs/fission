'use strict';

var should = require('should');
var Collection = require('ampersand-collection');
var fission = require('./fixtures/fissionInstance');

describe('#createCollection', function() {
  it('should return a collection', function(done) {

    var m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      }
    });
    var col = fission.createCollection(m);
    var inst = new col();
    inst.should.be.instanceOf(Collection);
    inst.isCollection.should.equal(true);
    return done();
  });

  it('should extend the model url', function(done) {

    var m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      },
      url: '/api/v1/users'
    });
    var col = fission.createCollection(m);
    var inst = new col();
    inst.url.should.exist;
    inst.url.should.equal('/api/v1/users');
    return done();
  });
});

