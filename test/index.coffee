fission = require '../src/index'
should = require 'should'

module.exports = 

  "fission should have expected api": ->

    fission.should.have.property 'router'
    fission.should.have.property 'middleware'
    fission.should.have.property 'mixins'

    fission.should.have.property 'view'
    fission.should.have.property 'modelView'
    fission.should.have.property 'collectionView'
    fission.should.have.property 'alias'
    fission.should.have.property 'createCollection'
    fission.should.have.property 'model'
