'use strict';

var React = require('react');
var Router = require('react-router');
var assign = require('object-assign');
var transformRoutes = require('./transformRoutes');
var renderRoute = require('./renderRoute');

module.exports = function(routeObj, opt){
  var options = assign({
    location: Router.HistoryLocation
  }, opt);

  var router = Router.create({
    routes: transformRoutes(routeObj),
    location: options.location
  });

  // dont confuse people with a start and run, only expose start
  var originalRun = router.run;
  delete router.run;

  router.start = function(renderTarget) {
    return originalRun(renderRoute.bind(null, renderTarget));
  };

  return router;
};

module.exports.Link = React.createFactory(Router.Link);
module.exports.ChildView = React.createFactory(Router.RouteHandler);
module.exports.mixins = {
  State: Router.State,
  Navigation: Router.Navigation
};
module.exports.locations = {
  History: Router.HistoryLocation,
  Hash: Router.HashLocation,
  Refresh: Router.RefreshLocation
};