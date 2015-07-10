'use strict';

var React = require('react');
var Router = require('react-router');
var clone = require('lodash.clone');
var Route = React.createFactory(Router.Route);
var DefaultRoute = React.createFactory(Router.DefaultRoute);
var NotFoundRoute = React.createFactory(Router.NotFoundRoute);

/*
TODO: prerender/caching of views
*/

function getView(view) {
  return view._class || view;
}

function transformRoutes(routes) {
  if (typeof routes !== 'object') {
    throw new Error('Invalid route config');
  }
  var config = clone(routes);

  return Object.keys(config).map(function(name){
    var opt = config[name];
    // sugar for specifying fn
    if (typeof opt === 'function') {
      opt = {
        view: opt
      };
    } else if (typeof opt !== 'object') {
      throw new Error('Invalid route config for ' + name);
    }

    var defaultRoute = opt.defaultChild ? DefaultRoute({
      key: (opt.defaultChild.key || name + 'Default'),
      name: (opt.defaultChild.name || name + 'Default'),
      handler: getView(opt.defaultChild.view)
    }) : null;

    var notFoundRoute = opt.childNotFound ? NotFoundRoute({
      key: (opt.childNotFound.key || name + 'NotFound'),
      name: (opt.childNotFound.name || name + 'NotFound'),
      handler: getView(opt.childNotFound.view)
    }) : null;

    var children = (opt.children ? transformRoutes(opt.children) : []);
    if (defaultRoute) {
      children.push(defaultRoute);
    }
    if (notFoundRoute) {
      children.push(notFoundRoute);
    }
    return Route({
      key: name,
      name: name,
      path: opt.path,
      handler: getView(opt.view)
    }, children);
  });
}

module.exports = transformRoutes;