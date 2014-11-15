'use strict';

var should = require('should');
var fission = require('./fixtures/fissionInstance');

describe('#view', function() {
  it('should produce the right output', function(done) {
    var v = fission.view({
      init: function() {},
      mounting: function() {},
      mounted: function() {},
      unmounting: function() {},
      render: function() {}
    });
    v.should.be['instanceof'](Function);
    done();
  });
});

