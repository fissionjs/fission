'use strict';

var should = require('should');
var merge = require('lodash.merge');
var fission = require('../../');
var modelView = fission.modelView;
var model = fission.model;
var render = fission.render;
var React = fission.React;
var router = fission.router;
var view = fission.view;

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
  beforeEach(createRouterContext);
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

  it('should return a renderable function', function(){
    var View = modelView({
      render: function(){}
    });
    var virtualNode = View({model: this.model});
    should.exist(virtualNode);
    should.exist(virtualNode.type);
    virtualNode.type.should.equal(View.type);
  });

  it('should return a component function when props', function(done){
    var modelInst = this.model;

    var View = modelView({
      render: function(){
        should.exist(this.model);
        should.exist(this.model.firstName);
        this.model.firstName.should.equal(modelInst.firstName);
        done();
        return null;
      }
    });
    render(View({model: this.model}), this.container);
  });

  it('should return a component function when config', function(done){
    var modelInst = this.model;

    var View = modelView({
      model: this.model,
      render: function(){
        should.exist(this.model);
        should.exist(this.model.firstName);
        this.model.firstName.should.equal(modelInst.firstName);
        done();
        return null;
      }
    });
    render(View(), this.container);
  });

  it('should return a component function when config schema', function(done){
    var modelInst = this.model;
    var modelConfig = merge({
      data: {
        firstName: 'Donny',
        lastName: 'Seinfeld'
      }
    }, UserSchema);
    var View = modelView({
      model: modelConfig,
      render: function(){
        should.exist(this.model);
        should.exist(this.model.firstName);
        this.model.firstName.should.equal(modelInst.firstName);
        done();
        return null;
      }
    });
    render(View(), this.container);
  });
});

function createRouterContext(cb) {
  var Dummy = view({
    mounted: function(){
      React.withContext(this.context, cb);
    },
    render: function(){
      return null;
    }
  });
  var fakeRouter = router({
    app: {
      view: Dummy,
      default: true
    }
  });
  fakeRouter.start(document.createElement('div'), {location: '/'});
}