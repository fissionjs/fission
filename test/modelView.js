'use strict';

var fission = require('./fixtures/fissionInstance');
var should = require('should');

describe('#modelView', function() {
  var m, v;
  m = fission.model({
    url: '/v1/foo',
    name: 'foo',
    fetch: function() {
      return set({
        foo: 'bar'
      });
    }
  });
  v = fission.modelView({
    model: m,
    render: function() {
      return console.log('RENDER');
    }
  });
  return it('should produce a React view', function(done) {
    v.should.have.property('componentConstructor');
    v.should.have.property('originalSpec');
    return done();
  });
});
