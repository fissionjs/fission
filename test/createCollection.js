'use strict';

var fission = require('./fixtures/fissionInstance');
var should = require('should');

describe('#createCollection', function() {
  return it('should return a collection', function(done) {
    var col, inst, m;
    m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      }
    });
    col = fission.createCollection(m);
    inst = new col();
    inst.isCollection.should.equal(true);
    return done();
  });
});
