'use strict';

var fission = require('./fixtures/fissionInstance');
var should = require('should');

describe('fission', function() {
  return it('should have expected api', function(done) {
    fission.should.have.property('view');
    fission.should.have.property('model');
    fission.should.have.property('alias');
    fission.should.have.property('mixins');
    fission.should.have.property('router');
    fission.should.have.property('modelView');
    fission.should.have.property('middleware');
    fission.should.have.property('collectionView');
    fission.should.have.property('createCollection');
    fission.opts.should.be['instanceof'](Object);
    fission.opts.sync.should.be['instanceof'](Function);
    return done();
  });
});
