/*globals document*/

'use strict';

var Router = require('react-router');
var React = require('react');
var clone = require('lodash.clone');

var Route = React.createFactory(Router.Route);
var DefaultRoute = React.createFactory(Router.DefaultRoute);

/*
TODO: onError?
TODO: redirect handler
TODO: notfoundroute
TODO: prerender/caching of views
TODO: conditional route mapping?
TODO: loader?
TODO: detect model and collection views or views with async load
*/

function transformRoutes(routes) {
  var config = clone(routes);

  return Object.keys(config).map(function(name){
    var opt = config[name];
    // sugar for specifying fn
    if (typeof opt === 'function') {
      opt = {
        handler: opt
      };
    } else if (typeof opt !== 'object') {
      throw new Error('Invalid route config for ' + name);
    }

    var isDefault = !!opt.default;
    var ctor = (isDefault ? DefaultRoute : Route);
    var children = (opt.children ? transformRoutes(opt.children) : null)

    return ctor({
      key: name,
      name: name,
      path: opt.path,
      handler: opt.handler
    }, children);
  });
}

function renderRoute(renderTarget, Component, state){
  return React.render(Component(), renderTarget);
}

module.exports = function(cfg){
  var routes = transformRoutes(cfg);

  // TODO: ability to configure this
  var router = Router.create({
    routes: routes,
    location: Router.HistoryLocation
  });

  router.start = function(renderTarget) {
    renderTarget = (renderTarget || document.body);
    return Router.run(renderRoute.bind(null, renderTarget));
  };

  return router;
};

module.exports.Link = Router.Link;
