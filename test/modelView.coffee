fission = require './fixtures/fissionInstance'
should = require 'should'

describe "#modelView", ->

  m = fission.model
    url: '/v1/foo'
    name: 'foo'
    fetch: ->
      set
        foo: 'bar'

  v = fission.modelView
    model: m
    render: -> console.log "RENDER"

  it "should produce a React view", (done) ->

    v.should.have.property 'componentConstructor'
    v.should.have.property 'originalSpec'
    done()
