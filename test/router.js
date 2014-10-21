'use strict';

var should = require('should');
var router = require('./fixtures/fissionInstance').router;

describe('#router', function() {
  it('should have the correct properties', function(done) {
    router.should.have.property('start');
    router.should.have.property('use');
    router.should.have.property('route');
    router.should.have.property('router');
    return done();
  });

  it('should have the correct core API', function(done) {
    router.should.have.property('createRouteHandler');
    router.should.have.property('createRenderHandler');
    router.router.should.have.property('base');
    router.router.should.have.property('start');
    router.router.should.have.property('stop');
    router.router.should.have.property('show');
    router.router.should.have.property('replace');
    router.router.should.have.property('dispatch');
    router.router.should.have.property('Context');
    router.router.should.have.property('Route');
    return done();
  });
});
