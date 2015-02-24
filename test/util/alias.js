'use strict';

var alias = require('../../lib/util/alias');
var noop = function(){};

describe('util/alias()', function(){
  it('should add a mixin array', function(){
    alias({}).should.eql({mixins: []});
  });
  it('should keep existing mixin array', function(){
    alias({mixins:[123]}).should.eql({mixins:[123]});
  });
  it('should alias mixins', function(){
    alias({
      mixins:[
        {
          init: function(){}
        }
      ]
    }).should.eql({
      mixins:[
        {
          mixins: [],
          getInitialState: function(){}
        }
      ]
    });
  });
  it('should recursively alias mixins', function(){
    alias({
      mixins:[
        {
          mixins: [
            {
              init: function(){}
            }
          ],
          init: function(){}
        }
      ]
    }).should.eql({
      mixins:[
        {
          mixins: [
            {
              mixins: [],
              getInitialState: function(){}
            }
          ],
          getInitialState: function(){}
        }
      ]
    });
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