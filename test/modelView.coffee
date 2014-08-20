modelView = require '../src/modelView'
model = require '../src/model'
should = require 'should'

React = null
utils = null

describe "#modelView", ->

  m = model
    url: '/v1/foo'
    name: 'foo'
    fetch: ->
      set
        foo: 'bar'

  v = modelView
    model: m
    render: -> console.log "RENDER"

  it "should produce a React view", (done) ->

    v.should.have.property 'componentConstructor'
    v.should.have.property 'originalSpec'
    done()
