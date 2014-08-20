{view} = require '../src'
should = require 'should'

describe "#view", ->

  it "should produce the right output", (done) ->

    v = view
      init: ->
      mounting: ->
      mounted: ->
      unmounting: ->
      render: ->

    v.should.be.instanceof Function
    v.should.have.property 'originalSpec'
    done()
