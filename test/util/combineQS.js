'use strict';

var combineQS = require('../../lib/util/combineQS');

describe('combineQS()', function(){
  it('should work with an empty object', function(){
    combineQS('http://example.com/yo', {})
      .should.equal('http://example.com/yo');
  });
  it('should work with a null query', function(){
    combineQS('http://example.com/yo', null)
      .should.equal('http://example.com/yo');
  });
  it('should work with a query object', function(){
    combineQS('http://example.com/yo', {
      q: 123,
      d: 456
    }).should.equal('http://example.com/yo?q=123&d=456');
  });
  it('should work with a url that already has params', function(){
    combineQS('http://example.com/yo?z=789', {
      q: 123,
      d: 456
    }).should.equal('http://example.com/yo?z=789&q=123&d=456');
  });
});