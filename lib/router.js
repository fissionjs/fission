'use strict';

var React = require('react');
var page = require('page');

var app = {};

var renderView = function(opt, cb) {
  if (!opt) {
    opt = {};
  }
  if (typeof opt.view === 'function') {
    opt.view = opt.view(opt.args);
    return renderView(opt, cb);
  } else {
    React.renderComponent(opt.view, opt.el);
    return cb();
  }
};

app.createRouteHandler = function(opt) {
  if (typeof opt === 'string') {
    return function(ctx, next) {
      return require([opt], function(fn) {
        return fn(ctx, next);
      });
    };
  } else {
    return app.createRenderHandler(opt);
  }
};

app.createRenderHandler = function(opt) {

  if (!opt) {
    opt = {};
  }
  if (opt['continue'] == null) {
    opt['continue'] = true;
  }
  if (typeof opt.el === 'string') {
    opt.el = document.getElementById(opt.el);
  }
  var handler = function(ctx, next) {
    var nopt = {
      el: opt.el,
      view: opt.view,
      args: ctx
    };
    return renderView(nopt, function() {
      if (opt.title != null) {
        document.title = opt.title;
      }
      if (opt['continue']) {
        return next();
      }
    });
  };
  return handler;
};

var slice = [].slice;
app.route = function() {
  var route = arguments[0];
  var handlers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  handlers = handlers.map(app.createRouteHandler);
  page.apply(null, [route].concat(slice.call(handlers)));
  return app;
};

app.router = page;
app.use = app.route.bind(null, '*');
app.start = page.start;

module.exports = app;
