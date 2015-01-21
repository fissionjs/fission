'use strict';

var clone = require('lodash.clone');
var React = require('react');

function Fission(opts) {
  if (!(this instanceof Fission)) {
    return new Fission(opts);
  }
  this.options = opts ? clone(opts) : {};
}

Fission.prototype.router = require('./lib/router');
Fission.prototype.model = require('./lib/model');
Fission.prototype.view = require('./lib/view');
Fission.prototype.modelView = require('./lib/modelView');
Fission.prototype.collectionView = require('./lib/collectionView');
Fission.prototype.createCollection = require('./lib/createCollection');

Fission.prototype.mixins = {
  Listener: require('./lib/mixins/Listener'),
  Sugar: require('./lib/mixins/Sugar')
};

Fission.prototype.React = React;
Fission.prototype.DOM = React.DOM;
Fission.prototype.createFactory = React.createFactory;
Fission.prototype.PropTypes = React.PropTypes;
Fission.prototype.render = React.render;

module.exports = Fission;
