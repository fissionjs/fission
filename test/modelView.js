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
  it('should be correct type', function(done) {
    v.should.be.type('function');
    return done();
  });

  it('should throw an error unless config', function(done) {
    try {
      var View = fission.modelView();
    }
    catch (e) {
      should.exist(e);
      e.message.should.eql('config parameter is required');
      done();
    }
  });

  it('should throw an error unless config.model', function(done) {
    try {
      var View = fission.modelView({});
    }
    catch (e) {
      should.exist(e);
      e.message.should.eql('model attribute is required');
      done();
    }
  });
});
