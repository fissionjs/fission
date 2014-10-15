'use strict';

var should = require('should');
var router = require('./fixtures/fissionInstance').router;

describe('#router', function() {
  return it('should have the correct properties', function(done) {
    router.should.have.property('start');
    router.should.have.property('use');
    router.should.have.property('route');
    router.should.have.property('router');
    return done();
  });
});
