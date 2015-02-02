'use strict';

var should = require('should');
var fission = require('../../');
//var router = fission.router;
var modelView = fission.modelView;
var model = fission.model;
//var ChildView = fission.ChildView;

var User = model({
  props: {
    firstName: 'string',
    lastName: 'string'
  },
  derived: {
    fullName: {
      deps: ['firstName', 'lastName'],
      fn: function () {
        return this.firstName + ' ' + this.lastName;
      }
    }
  }
});

describe('renderables/modelView()', function(){
  beforeEach(function(){
    this.container = document.createElement('div');
    this.model = new User({
      firstName: 'Donny',
      lastName: 'Seinfeld'
    });
  });

  it('should throw an error on missing model', function(){
    var View = modelView({
      render: function(){
        return this.model.firstName;
      }
    });
    try {
      View();
    } catch (err) {
      should.exist(err);
      err.message.should.equal('modelView never got a model');
    }
  });

  it('should return a renderable component function', function(){
    // this test makes sure we dont support jsx
    var View = modelView({
      render: function(){
        return this.model.firstName;
      }
    });
    var virtualNode = View({model: this.model});
    should.exist(virtualNode);
    should.exist(virtualNode.type);
    virtualNode.type.should.equal(View.type);
  });

  it('should return a renderable component function', function(){
    // this test makes sure we dont support jsx
    var View = modelView({
      model: this.model,
      render: function(){
        return this.model.firstName;
      }
    });
    var virtualNode = View();
    should.exist(virtualNode);
    should.exist(virtualNode.type);
    virtualNode.type.should.equal(View.type);
  });

});