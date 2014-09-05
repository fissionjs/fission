'use strict';

var fission = require('./fixtures/fissionInstance');
var should = require('should');

describe('#view', function() {
  return it('should produce the right output', function(done) {
    var v;
    v = fission.view({
      init: function() {},
      mounting: function() {},
      mounted: function() {},
      unmounting: function() {},
      render: function() {}
    });
    v.should.be['instanceof'](Function);
    v.should.have.property('originalSpec');
    return done();
  });
});
