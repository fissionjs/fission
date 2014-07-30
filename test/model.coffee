model = require '../src/model'
Backbone = require 'backbone'

module.exports = 
  "#model should produce a model": ->

    m = model 
      url: '/v1/foo'
      name: 'foo'

    inst = new m
    
    inst.should.be.instanceOf Backbone.Model
    m.prototype.getType().should.equal 'model'
    m.modelType.should.equal 'foo'