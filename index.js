'use strict';

var clone = require('lodash.clone');
var React = require('react');

// TODO: most of these have nothing to do with the app, dont expose them on the app
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
Fission.prototype.getSync = require('./lib/getSync');
Fission.prototype.alias = require('./lib/alias');

// TODO: remove all but log
// TODO: ternary
Fission.prototype.middleware = {
  auth: require('./lib/middleware/auth'),
  clearFB: require('./lib/middleware/clearFB'),
  log: require('./lib/middleware/log')
};
Fission.prototype.mixins = {
  Listener: require('./lib/ListenerMixin')
};
Fission.prototype.React = React;
Fission.prototype.DOM = React.DOM;
Fission.prototype.createFactory = React.createFactory;
Fission.prototype.PropTypes = React.PropTypes;

module.exports = Fission;
