'use strict';

var alias = require('../../lib/util/alias');
var noop = function(){};

describe('util/alias()', function(){
  it('should add a mixin array', function(){
    alias({}).should.eql({mixins: []});
  });

  it('should correctly alias init', function(){
    alias({
      init: noop
    }).should.eql({
      getInitialState: noop,
      mixins: []
    });
  });
  it('should correctly alias mounting', function(){
    alias({
      mounting: noop
    }).should.eql({
      componentWillMount: noop,
      mixins: []
    });
  });
  it('should correctly alias mounted', function(){
    alias({
      mounted: noop
    }).should.eql({
      componentDidMount: noop,
      mixins: []
    });
  });
  it('should correctly alias unmounting', function(){
    alias({
      unmounting: noop
    }).should.eql({
      componentWillUnmount: noop,
      mixins: []
    });
  });
});