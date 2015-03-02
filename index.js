'use strict';

var React = require('react');
var Router = require('fission-router');

module.exports = {
  router: Router,

  // renderables
  component: require('./lib/renderables/component'),
  view: require('./lib/renderables/view'),
  modelView: require('./lib/renderables/modelView'),
  collectionView: require('./lib/renderables/collectionView'),
  DOM: React.DOM,

  // data stuff
  model: require('./lib/data/model'),
  collection: require('./lib/data/collection'),

  // move some react-router stuff up
  ChildView: Router.ChildView,
  Link: Router.Link,

  // some utils
  classes: require('classnames'),

  // expose underlying react stuff
  React: React,
  createElement: React.createElement,
  createFactory: React.createFactory,
  PropTypes: React.PropTypes,
  render: React.render,
  renderToString: React.renderToStaticMarkup,
  withContext: React.withContext
};