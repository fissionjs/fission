should = require 'should'
createCollection = require '../src/createCollection'
model = require '../src/model'

describe "#createCollection", ->

  it "should return a collection", (done) ->

    m = model
      props:
        firstName: 'string'
        lastName: 'string'

    col = createCollection m
    inst = new col

    inst.isCollection.should.equal true

    done()
