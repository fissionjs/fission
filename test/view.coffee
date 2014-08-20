{view} = require '../src'
should = require 'should'

describe "View", ->

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
