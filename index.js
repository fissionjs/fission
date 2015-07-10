'use strict';

var React = require('react/addons');
var motion = require('react-motion');
var classes = require('classnames');

var component = require('./lib/renderables/component');
var view = require('./lib/renderables/view');
var router = require('./lib/router');

var ReactUpdates = require('react/lib/ReactUpdates');
var RAFBatch = require('./lib/util/RAFBatching');
ReactUpdates.injection.injectBatchingStrategy(RAFBatch);

module.exports = {
  // renderables
  component: component,
  view: view,

  // router stuff
  router: router,
  ChildView: router.ChildView,
  Link: router.Link,

  // bundled utils
  classes: classes,
  Spring: motion,
  TransitionSpring: motion.TransitionSpring,

  // expose underlying react stuff
  React: React,
  DOM: React.DOM,
  createElement: React.createElement,
  createFactory: React.createFactory,
  PropTypes: React.PropTypes,
  render: React.render,
  renderToString: React.renderToStaticMarkup,
  withContext: React.withContext
};