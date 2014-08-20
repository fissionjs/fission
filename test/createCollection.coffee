createCollection = require '../src/createCollection'
model = require '../src/model'
Backbone = require 'backbone'

describe "#createCollection", ->

  it "should return a collection", (done) ->

    m = model
      urlRoot: '/v1/foo'
      modelType: 'foo'

    col = createCollection m
    inst = new col

    inst.should.be.instanceOf Backbone.Collection
    done()
