'use strict';

var React = require('react');
var Router = require('fission-router');

module.exports = {
  router: Router,
  component: require('./lib/renderables/component'),
  view: require('./lib/renderables/view'),
  modelView: require('./lib/renderables/modelView'),
  collectionView: require('./lib/renderables/collectionView'),

  // data stuff
  model: require('./lib/data/model'),
  collection: require('./lib/data/collection'),

  // expose underlying react stuff
  React: React,
  DOM: React.DOM,
  createElement: React.createElement,
  createFactory: React.createFactory,
  PropTypes: React.PropTypes,
  render: React.render
};