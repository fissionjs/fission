'use strict';

var fission = require('../');
var should = require('should');

describe('fission', function(){
  it('should expose the fission features', function(){
    should.exist(fission);
    should.exist(fission.router);
    should.exist(fission.component);
    should.exist(fission.view);
    should.exist(fission.modelView);
    should.exist(fission.collectionView);
    should.exist(fission.model);
    should.exist(fission.collection);
    should.exist(fission.classes);
  });

  it('should expose the fission router features', function(){
    should.exist(fission.ChildView);
    should.exist(fission.Link);
  });

  it('should expose underlying React features', function(){
    should.exist(fission.React);
    should.exist(fission.DOM);
    should.exist(fission.render);
    should.exist(fission.renderToString);
    should.exist(fission.createElement);
    should.exist(fission.createFactory);
    should.exist(fission.PropTypes);
    should.exist(fission.render);
  });
});