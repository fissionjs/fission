fission = require '../src/index'
should = require 'should'

describe "fission", ->

  it "should have expected api", (done) ->

    fission.should.have.property 'router'
    fission.should.have.property 'middleware'
    fission.should.have.property 'mixins'

    fission.should.have.property 'view'
    fission.should.have.property 'modelView'
    fission.should.have.property 'collectionView'
    fission.should.have.property 'alias'
    fission.should.have.property 'createCollection'
    fission.should.have.property 'model'
    done()
