fission = require './fixtures/fissionInstance'
should = require 'should'

describe "#view", ->

  it "should produce the right output", (done) ->

    v = fission.view
      init: ->
      mounting: ->
      mounted: ->
      unmounting: ->
      render: ->

    v.should.be.instanceof Function
    v.should.have.property 'originalSpec'
    done()
