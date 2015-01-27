'use strict';

var React = require('react');
var should = require('should');
var view = require('../../lib/renderables/view');
var noop = function(){};

describe('renderables/view()', function(){
  beforeEach(function(){
    this.container = document.createElement('div');
  });

  it('should return a renderable component function', function(){
    // this test makes sure we dont support jsx
    var View = view({
      render: function(){
        return null;
      }
    });
    var virtualNode = View();
    should.exist(virtualNode);
    should.exist(virtualNode.type);
    virtualNode.type.should.equal(View.type);
  });

});