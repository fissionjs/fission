'use strict';

var React = require('react');
var Router = require('fission-router');
var update = require('react/lib/update');
var component = require('./lib/renderables/component');
var view = require('./lib/renderables/view');
var modelView = require('./lib/renderables/modelView');
var collectionView = require('./lib/renderables/collectionView');
var model = require('./lib/data/model');
var collection = require('./lib/data/collection');
var classNames = require('classnames');

var ReactUpdates = require('react/lib/ReactUpdates');
var RAFBatch = require('./lib/util/RAFBatching');
ReactUpdates.injection.injectBatchingStrategy(RAFBatch);

module.exports = {
  router: Router,

  // renderables
  component: component,
  view: view,
  modelView: modelView,
  collectionView: collectionView,
  DOM: React.DOM,

  // data stuff
  model: model,
  collection: collection,

  // move some react-router stuff up
  ChildView: Router.ChildView,
  Link: Router.Link,

  // some utils
  classes: classNames,
  update: update,

  // expose underlying react stuff
  React: React,
  createElement: React.createElement,
  createFactory: React.createFactory,
  PropTypes: React.PropTypes,
  render: React.render,
  renderToString: React.renderToStaticMarkup,
  withContext: React.withContext
};