'use strict';

var should = require('should');
var merge = require('lodash.merge');
var fission = require('../../');
var modelView = fission.modelView;
var model = fission.model;

var UserSchema = {
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
};

var User = model(UserSchema);

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

  it('should return a renderable component function when props', function(){
    var modelInst = this.model;

    var View = modelView({
      render: function(){
        should.exist(this.model.firstName);
        this.model.firstName.should.equal(modelInst).firstName;
        return this.model.firstName;
      }
    });
    var virtualNode = View({model: this.model});
    should.exist(virtualNode);
    should.exist(virtualNode.type);
    virtualNode.type.should.equal(View.type);
  });

  it('should return a renderable component function when config', function(){
    var modelInst = this.model;

    var View = modelView({
      model: this.model,
      render: function(){
        should.exist(this.model.firstName);
        this.model.firstName.should.equal(modelInst).firstName;
        return this.model.firstName;
      }
    });
    var virtualNode = View();
    should.exist(virtualNode);
    should.exist(virtualNode.type);
    virtualNode.type.should.equal(View.type);
  });

  it('should return a renderable component function when config schema', function(){
    var modelInst = this.model;
    var modelConfig = merge({
      data: {
        firstName: 'Donny',
        lastName: 'Seinfeld'
      }
    }, UserSchema);
    var View = modelView({
      model: UserSchema,
      render: function(){
        should.exist(this.model.firstName);
        this.model.firstName.should.equal(modelInst).firstName;
        return this.model.firstName;
      }
    });
    var virtualNode = View();
    should.exist(virtualNode);
    should.exist(virtualNode.type);
    virtualNode.type.should.equal(View.type);
  });
});