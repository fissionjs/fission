'use strict';

var Model = require('ampersand-model');
var should = require('should');
var fission = require('./fixtures/fissionInstance');

describe('#model', function() {
  it('should produce a model', function(done) {
    var m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      }
    });
    m.should.be.type('function');
    m.__super__.save.should.be.type('function');
    m.__super__.fetch.should.be.type('function');
    m.__super__.destroy.should.be.type('function');
    m.__super__.sync.should.be.type('function');
    var inst = new m({
      firstName: 'Steve',
      lastName: 'Jobz'
    });
    inst.should.be.instanceOf(Model);
    inst.firstName.should.equal('Steve');
    inst.lastName.should.equal('Jobz');
    inst.url = '/api/';
    inst.on('change', function(data) {
      inst.save();
      return inst.lastName.should.equal('Nash');
    });
    inst.set({
      lastName: 'Nash'
    });
    return done();
  });
  it('should not contain elements if not defined in model.props', function(done) {
    var m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      }
    });
    var inst = new m({
      firstName: 'Larry',
      lastName: 'Page',
      age: '50'
    });
    inst.firstName.should.equal('Larry');
    inst.lastName.should.equal('Page');
    should.not.exist(inst.age);
    return done();
  });
  return it('should return an error if error', function(done) {
    var m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      }
    });
    var inst = new m({
      firstName: 'Larry',
      lastName: 'Page'
    });
    inst.on('error', function(err) {
      return err.should.not.be['null'];
    });
    inst.sync = function(method, model, options) {
      return options.error();
    };
    inst.save();
    inst.fetch();
    return done();
  });
});
