/* global document, describe, it */
'use strict';

var should = require('should');
var fission = require('./fixtures/fissionInstance');

describe('#collectionView', function() {
  it('should throw an error unless config', function(done) {
    try {
      var View = fission.collectionView();
    }
    catch (e) {
      should.exist(e);
      e.message.should.eql('config parameter is required');
      done();
    }
  });

  it('should throw an error unless config.model', function(done) {
    try {
      var View = fission.collectionView({});
    }
    catch (e) {
      should.exist(e);
      e.message.should.eql('model attribute is required');
      done();
    }
  });
});
