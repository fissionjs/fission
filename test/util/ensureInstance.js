'use strict';

var should = require('should');
var ensureInstance = require('../../lib/util/ensureInstance');
var model = require('../../lib/data/model');
var collection = require('../../lib/data/model');

var userConfig = {
  url: '/api/users',
  props: {
    name: 'string'
  },
  test: function() {
    return 123;
  }
};
var User = model(userConfig);
var UserWithCustomId = model({
  idAttribute: '_id',
  url: '/api/users',
  props: {
    _id: 'number',
    name: 'string'
  },
  test: function() {
    return 123;
  }
});

describe('util/ensureInstance.model()', function(){
  it('should work with constructor config', function(){
    var inst = ensureInstance.model(userConfig);
    should.exist(inst);
    inst.test().should.equal(123);
    inst._needsInitialFetch.should.equal(true);
  });
  it('should work with a constructor', function(){
    var inst = ensureInstance.model(User);
    should.exist(inst);
    inst.test().should.equal(123);
    inst._needsInitialFetch.should.equal(true);
  });
  it('should explode on unknown fn', function(){
    try {
      ensureInstance.model(function(){});
    } catch (err) {
      should.exist(err);
    }
  });
  it('should work with a constructor and id', function(){
    var inst = ensureInstance.model(UserWithCustomId, {id: 123});
    should.exist(inst);
    inst._id.should.equal(123);
    inst.test().should.equal(123);
    inst._needsInitialFetch.should.equal(true);
  });
  it('should work with a constructor and idAttribute', function(){
    var inst = ensureInstance.model(User, {id: 123});
    should.exist(inst);
    inst.id.should.equal(123);
    inst.test().should.equal(123);
    inst._needsInitialFetch.should.equal(true);
  });
  it('should work with a constructor and data', function(){
    var inst = ensureInstance.model(User, {
      data: {
        name: 'Todd'
      }
    });
    should.exist(inst);
    inst.name.should.equal('Todd');
    inst.test().should.equal(123);
    inst._needsInitialFetch.should.equal(false);
  });
  it('should not override data id with option id', function(){
    var inst = ensureInstance.model(UserWithCustomId, {
      id: 456,
      data: {
        _id: 123,
        name: 'Todd'
      }
    });
    should.exist(inst);
    inst._id.should.equal(123);
    inst.name.should.equal('Todd');
    inst.test().should.equal(123);
    inst._needsInitialFetch.should.equal(false);
  });
  it('should work with a constructor and query', function(){
    var inst = ensureInstance.model(User, {
      id: 123,
      query: {
        q: 456
      }
    });
    should.exist(inst);
    inst.url().should.equal('/api/users/123?q=456');
  });
});

describe('util/ensureInstance.collection()', function(){
});