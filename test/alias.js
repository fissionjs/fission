'use strict';

var fission = require('./fixtures/fissionInstance');

describe('#Fission.alias', function() {
  return it('should alias correctly', function(done) {

    var view = {
      init: function() {},
      mounting: function() {},
      mounted: function() {},
      unmounting: function() {}
    };
    var config = fission.alias(view);
    config.should.have.property('getInitialState');
    config.should.have.property('componentWillMount');
    config.should.have.property('componentDidMount');
    config.should.have.property('componentWillUnmount');
    config.should.have.property('mixins');
    return done();
  });
});
