/*globals document*/

'use strict';

var page = require('page');
var React = require('react');
var clone = require('lodash.clone');
var router = {};

var renderView = function(opt, cb) {
  if (opt == null) {
    opt = {};
  }

  if (typeof opt !== 'object') {
    throw new Error('options must be an object');
  }

  // deref since we modify stuff
  opt = clone(opt);

  // opt.view is a function
  if (typeof opt.view === 'function') {
    opt.view = opt.view(opt.args);
    return renderView(opt, cb);
  }

  // opt.view is already a view
  React.renderComponent(opt.view, opt.el);
  cb();
};

router.createRouteHandler = function(opt) {
  // require in a module
  if (typeof opt === 'string') {
    return function(ctx, next) {
      require([opt], function(fn) {
        fn(ctx, next);
      });
    };
  }

  // use the options
  return router.createRenderHandler(opt);
};

router.createRenderHandler = function(opt) {
  if (opt == null) {
    opt = {};
  }
  opt = clone(opt);
  if (opt.continue == null) {
    opt.continue = false;
  }
  // opt is a dom selector
  if (typeof opt.el === 'string') {
    opt.el = document.getElementById(opt.el);
  }

  var handler = function(ctx, next) {
    var nopt = {
      el: opt.el,
      view: opt.view,
      args: ctx
    };
    renderView(nopt, function() {
      if (opt.title != null) {
        document.title = opt.title;
      }
      if (opt.continue) {
        next();
      }
    });
  };
  return handler;
};

router.route = function() {
  var args = Array.prototype.slice(arguments);
  var route = args.shift();
  var handlers = args.map(router.createRouteHandler);
  page.apply(null, [route].concat(handlers));
  return router;
};

router.router = page;
router.use = router.route.bind(null, '*');
router.start = page.start;

module.exports = router;
