'use strict';

var React = require('react');
var should = require('should');
var component = require('../../lib/renderables/component');
var noop = function(){};

describe('component()', function(){
  beforeEach(function(){
    this.container = document.createElement('div');
  });

  it('should return a renderable component function', function(){
    // this test makes sure we dont support jsx
    var Component = component({
      init: function(){
        done();
        return {};
      },
      render: function(){
        return null;
      }
    });
    var virtualNode = Component();
    should.exist(virtualNode);
    should.exist(virtualNode.type);
    virtualNode.type.should.equal(Component.type);
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
    React.render(Component(), this.container);
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
    React.render(Component(), this.container);
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
    React.render(Component(), this.container);
  });

  it('should alias mixins provided in arguments and config in order', function(done){
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
    React.render(Component(), this.container);
  });
});