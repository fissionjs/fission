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
  });

  it('should expose underlying React features', function(){
    should.exist(fission.React);
    should.exist(fission.DOM);
    should.exist(fission.createElement);
    should.exist(fission.createFactory);
    should.exist(fission.PropTypes);
    should.exist(fission.render);
  });
});