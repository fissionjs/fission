{model} = require '../src'
Backbone = require 'backbone'
should = require 'should'


describe "#model should produce a model", ->
  it " should produce a model", (done) ->
    m = model
      url: '/v1/foo'
      name: 'foo'

    inst = new m

    inst.should.be.instanceOf Backbone.Model
    m.prototype.getType().should.equal 'model'
    m.modelType.should.equal 'foo'
    console.log @
    done()
