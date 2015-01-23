'use strict';

var clone = require('lodash.clone');
var React = require('react');
var Router = require('fission-router');

function Fission() {
  this.options = {};
}

Fission.prototype.setOptions = function(opts) {
  this.options = opts ? clone(opts) : {};
};

Fission.prototype.router = Router;
Fission.prototype.component = require('./lib/renderables/component');
Fission.prototype.view = require('./lib/renderables/view');
Fission.prototype.modelView = require('./lib/renderables/modelView');
Fission.prototype.collectionView = require('./lib/renderables/collectionView');

Fission.prototype.model = require('./lib/data/model');
Fission.prototype.createCollection = require('./lib/data/createCollection');

Fission.prototype.mixins = {
  Listener: require('./lib/mixins/Listener'),
  Sugar: require('./lib/mixins/Sugar'),
  State: Router.mixins.State,
  Navigation: Router.mixins.Navigation
};

// expose some react stuff
Fission.prototype.React = React;
Fission.prototype.DOM = React.DOM;
Fission.prototype.createElement = React.createElement;
Fission.prototype.createFactory = React.createFactory;
Fission.prototype.PropTypes = React.PropTypes;
Fission.prototype.render = React.render;

module.exports = new Fission();
