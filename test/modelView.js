'use strict';

var should = require('should');
var fission = require('./fixtures/fissionInstance');

describe('#modelView', function() {

  var m = fission.model({
    url: '/v1/foo',
    name: 'foo',
    fetch: function() {
      return set({
        foo: 'bar'
      });
    }
  });
  var v = fission.modelView({
    model: m,
    render: function() {
      return console.log('RENDER');
    }
  });
  it('should produce a React view', function(done) {
    v.should.have.property('componentConstructor');
    v.should.have.property('originalSpec');
    return done();
  });
  return it('should be correct type', function(done) {
    v.should.be.type('function');
    return done();
  });
});
