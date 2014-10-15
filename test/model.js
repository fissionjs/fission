'use strict';

var should = require('should');
var Model = require('ampersand-model');
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
  it('should return an error if error', function(done) {

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
  it('should have default URL if not provided', function(done) {

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
    inst.urlRoot.should.equal('/');
    return done();
  });
  it('should map model.url to model.urlRoot', function(done) {

    var m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      },
      url: '/api/v2/users'
    });
    var inst = new m({
      firstName: 'Larry',
      lastName: 'Page'
    });
    inst.urlRoot.should.exist;
    inst.urlRoot.should.equal('/api/v2/users');
    return done();
  });
  it('should set model.url to function', function(done) {

    var m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      },
      url: '/api/v2/users'
    });
    var inst = new m({
      firstName: 'Larry',
      lastName: 'Page'
    });
    inst.url.should.exist;
    inst.url.should.be.type('function');
    return done();
  });
  it('should save new data with proxies', function(done) {

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
    inst.on('change', function(data) {
      data.firstName.should.equal('Ellen');
      inst.firstName.should.equal('Ellen');
      return done();
    });
    inst.firstName = 'Ellen';
    return inst.save();
  });
  it('should not save props not set in model.props', function(done) {

    var m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      }
    });
    var inst = new m({
      firstName: 'Larry',
      lastName: 'Page',
      age: '23'
    });
    inst.firstName.should.equal('Larry');
    should.not.exist(inst.age);
    return done();
  });
  return it('should not save props proxies not set in model.props', function(done) {

    var m = fission.model({
      props: {
        firstName: 'string',
        lastName: 'string'
      }
    });
    m.age = '23';
    var inst = new m({
      firstName: 'Larry',
      lastName: 'Page',
      age: '29'
    });
    inst.firstName.should.equal('Larry');
    inst.on('change', function(data) {
      should.not.exist(inst.age);
      return done();
    });
    inst.firstName = 'Ellen';
    return inst.save();
  });
});
