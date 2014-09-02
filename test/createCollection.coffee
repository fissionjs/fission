fission = require './fixtures/fissionInstance'
should = require 'should'

describe "#createCollection", ->

  it "should return a collection", (done) ->

    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'

    col = fission.createCollection m
    inst = new col

    inst.isCollection.should.equal true

    done()
