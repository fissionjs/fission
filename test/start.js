'use strict';

var fission = require('./fixtures/fissionInstance');
var should = require('should');

describe('#start', function() {
  return it('should start the router', function(done) {
    var routes;
    routes = {
      config: {
        click: true,
        dispatch: true,
        popstate: true
      },
      routes: {
        '/': {
          title: 'Welcome',
          view: function() {
            return console.log('view');
          },
          el: 'content',
          'continue': false
        }
      }
    };
    routes.should.be.type('object');
    return done();
  });
});
