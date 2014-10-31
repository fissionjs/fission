'use strict';

var clone = require('lodash.clone');

function Fission(opts) {
  this.opts = opts ? clone(opts) : {};
}

Fission.prototype.router = require('./lib/router');
Fission.prototype.model = require('./lib/model');
Fission.prototype.view = require('./lib/view');
Fission.prototype.modelView = require('./lib/modelView');
Fission.prototype.collectionView = require('./lib/collectionView');
Fission.prototype.createCollection = require('./lib/createCollection');
Fission.prototype.getSync = require('./lib/getSync');
Fission.prototype.alias = require('./lib/alias');
Fission.prototype.middleware = {
  auth: require('./lib/middleware/auth'),
  clearFB: require('./lib/middleware/clearFB'),
  log: require('./lib/middleware/log')
};
Fission.prototype.mixins = {
  Listener: require('./lib/ListenerMixin')
};
Fission.prototype.React = require('react');

module.exports = Fission;
