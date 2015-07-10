'use strict';

var React = require('react');
var Router = require('../../lib/router');
var ChildView = Router.ChildView;

var emptyReactComponent = function(name){
  return React.createClass({
    displayName: 'DummyComponent-' + name,
    mixins: [Router.mixins.State],

    render: function(){
      return React.DOM.div(null, 'Test', ChildView());
    }
  });
};

module.exports = {
  splash: {
    path: '/',
    view: emptyReactComponent('splash')
  },
  login: {
    path: 'login',
    view: emptyReactComponent('login')
  },
  logout: emptyReactComponent('logout'),
  home: {
    path: 'home',
    view: emptyReactComponent('home'),
    default: {
      view: emptyReactComponent('dashboard')
    },
    children: {
      stats: {
        path: 'analytics',
        view: emptyReactComponent('stats')
      },
      job: {
        path: 'job/:jobId',
        view: emptyReactComponent('job')
      }
    }
  }
};