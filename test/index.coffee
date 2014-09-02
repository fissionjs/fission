Fission = require '../src/index'
should = require 'should'

describe "fission", ->

  it "should have expected api", (done) ->

    fission = new Fission(sync: -> console.log 'sync')

    fission.should.have.property 'router'
    fission.should.have.property 'middleware'
    fission.should.have.property 'mixins'

    fission.should.have.property 'view'
    fission.should.have.property 'modelView'
    fission.should.have.property 'collectionView'
    fission.should.have.property 'alias'
    fission.should.have.property 'createCollection'
    fission.should.have.property 'model'

    fission.opts.should.be.instanceof Object
    fission.opts.sync.should.be.instanceof Function

    done()
