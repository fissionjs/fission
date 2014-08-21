{model} = require '../src'
should = require 'should'

describe "#model should produce a model", ->
  it " should produce a model", (done) ->
    m = model
      props:
        firstName: 'string'
        lastName: 'string'

    inst = new m
      firstName: 'Steve'
      lastName: 'Jobz'

    inst.firstName.should.equal 'Steve'
    inst.lastName.should.equal 'Jobz'

    done()
