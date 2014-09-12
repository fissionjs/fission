{router} = require './fixtures/fissionInstance'
should = require 'should'

describe '#router', ->

  it 'should have the correct properties', (done) ->

    router.should.have.property 'start'
    router.should.have.property 'use'
    router.should.have.property 'route'
    router.should.have.property 'router'

    done()
