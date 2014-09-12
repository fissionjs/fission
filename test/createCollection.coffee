fission = require './fixtures/fissionInstance'
Collection = require 'ampersand-collection'
should = require 'should'

describe '#createCollection', ->

  it 'should return a collection', (done) ->

    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'

    col = fission.createCollection m
    inst = new col

    inst.should.be.instanceOf Collection
    inst.isCollection.should.equal true

    done()

  it 'should extend the model url', (done) ->
    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'
      url: '/api/v1/users'

    col = fission.createCollection m
    inst = new col
    inst.url.should.exist
    inst.url.should.equal '/api/v1/users'

    done()
