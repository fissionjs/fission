'use strict';

var should = require('should');
var router = require('fission-router');
var view = require('../../lib/renderables/view');

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

  it('should be renderable by a router', function(done){
    var routerInst;
    var View = view({
      mounted: function(){
        routerInst.stop();
        done();
      },
      render: function(){
        return null;
      }
    });

    routerInst = router({
      app: {
        path: '/test',
        view: View
      }
    });
    routerInst.replaceWith('/test');
    routerInst.start(this.container);
  });

  it('should have router state mixin sugar', function(done){
    var routerInst;
    var View = view({
      mounted: function(){
        this.getPath().should.equal('/test/456?p=123');
        this.getPathname().should.equal('/test/456');
        this.getParams().should.eql({
          testId: '456'
        });
        this.getQuery().should.eql({
          p: '123'
        });
        this.isActive('app').should.equal(true);
        this.isActive('app', {
          testId: '456'
        }).should.equal(true);
        this.isActive('app', {
          testId: '456'
        }, {
          p: '123'
        }).should.equal(true);
        routerInst.stop();
        done();
      },
      render: function(){
        return null;
      }
    });

    routerInst = router({
      app: {
        path: '/test/:testId',
        view: View
      }
    });
    routerInst.replaceWith('/test/456?p=123');
    routerInst.start(this.container);
  });

  it('should have navigation state mixin sugar', function(done){
    var routerInst;
    var View = view({
      mounted: function(){
        should.exist(this.goBack);
        should.exist(this.transitionTo);
        should.exist(this.replaceWith);
        should.exist(this.makePath);
        should.exist(this.makeHref);
        routerInst.stop();
        done();
      },
      render: function(){
        return null;
      }
    });

    routerInst = router({
      app: {
        path: '/test/:testId',
        view: View
      }
    });
    routerInst.replaceWith('/test/456?p=123');
    routerInst.start(this.container);
  });
});