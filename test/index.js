'use strict';

var should = require('should');
var fission = require('./fixtures/fissionInstance');

describe('fission', function() {
  it('should have expected api', function(done) {
    should.exist(fission);
    fission.should.have.property('router');
    fission.should.have.property('mixins');
    fission.should.have.property('view');
    fission.should.have.property('modelView');
    fission.should.have.property('collectionView');
    fission.should.have.property('createCollection');
    fission.should.have.property('model');
    should.exist(fission.options);
    fission.options.should.be['instanceof'](Object);
    fission.options.sync.should.be['instanceof'](Object);
    done();
  });
});
