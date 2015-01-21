'use strict';

var should = require('should');
var router = require('./fixtures/fissionInstance').router;

describe('#router', function() {
  it('should be callable', function(done) {
    (typeof router).should.equal('function');
    done();
  });
  it('should have the correct properties when instantiated with object', function(done) {
    var inst = router({});
    inst.should.have.property('start');
    done();
  });
});
