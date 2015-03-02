'use strict';

var should = require('should');
var fission = require('../../');
var DOM = fission.DOM;
var component = fission.component;

describe('renderables/component()', function(){
  beforeEach(function(){
    this.container = document.createElement('div');
  });

  it('should return a renderable component function', function(){
    // this test makes sure we dont support jsx
    var Component = component({
      render: function(){
        return null;
      }
    });
    var virtualNode = Component();
    should.exist(virtualNode);
    should.exist(virtualNode.type);
    virtualNode.type.should.equal(Component.type);
  });

  it('should return a pure component', function(){
    var called = 0;
    var Component = component({
      init: function() {
        return {
          a: 123
        };
      },
      trigger: function() {
        this.setState({a: 123});
      },
      render: function(){
        ++called;
        return DOM.div(null, this.state.a);
      }
    });
    var inst = fission.render(Component(), this.container);
    inst.trigger();
    called.should.equal(1);
  });

  it('should return a impure component when asked', function(){
    var called = 0;
    var Component = component({
      impure: true,
      init: function() {
        return {
          a: 123
        };
      },
      trigger: function() {
        this.setState({a: 123});
      },
      render: function(){
        ++called;
        return DOM.div(null, this.state.a);
      }
    });
    var inst = fission.render(Component(), this.container);
    inst.trigger();
    called.should.equal(2);
  });

  it('should return a pure component with immutability helpers', function(){
    var called = 0;
    var Component = component({
      init: function() {
        return {
          a: {
            b: 123
          }
        };
      },
      trigger: function() {
        this.updateState({
          a: {
            b: {
              $set: 456
            }
          }
        });
      },
      render: function(){
        ++called;
        return DOM.div(null, this.state.a.b);
      }
    });
    var inst = fission.render(Component(), this.container);
    inst.trigger();
    called.should.equal(2);
  });

  it('should alias input config', function(done){
    var Component = component({
      init: function(){
        done();
        return {};
      },
      render: function(){
        return null;
      }
    });
    fission.render(Component(), this.container);
  });

  it('should alias mixins provided in config', function(done){
    var initMixin = {
      init: function(){
        done();
        return {};
      }
    };
    var Component = component({
      mixins: [initMixin],
      render: function(){
        return null;
      }
    });
    fission.render(Component(), this.container);
  });

  it('should alias mixins provided in arguments', function(done){
    var initMixin = {
      init: function(){
        done();
        return {};
      }
    };
    var Component = component({
      render: function(){
        return null;
      }
    }, [initMixin]);
    fission.render(Component(), this.container);
  });

  it('should alias mixins provided in both', function(done){
    // argument mixins should take precedence
    // so the arg mixin init should get called first
    var firstCalled = false;
    var initMixin = {
      init: function(){
        firstCalled.should.equal(true);
        done();
        return {};
      }
    };
    var initMixin2 = {
      init: function(){
        firstCalled.should.equal(false);
        firstCalled = true;
        return {};
      }
    };
    var Component = component({
      mixins: [initMixin],
      render: function(){
        return null;
      }
    }, [initMixin2]);
    fission.render(Component(), this.container);
  });
});