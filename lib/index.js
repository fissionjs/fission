'use strict';

var Fission = (function() {
  function Fission(opts) {
    this.opts = opts;
  }

  Fission.prototype.router = require('./router');
  Fission.prototype.model = require('./model');
  Fission.prototype.view = require('./view');
  Fission.prototype.modelView = require('./modelView');
  Fission.prototype.collectionView = require('./collectionView');
  Fission.prototype.createCollection = require('./createCollection');
  Fission.prototype.getSync = require('./getSync');
  Fission.prototype.alias = require('./alias');
  Fission.prototype.middleware = {
    auth: require('./middleware/auth'),
    clearFB: require('./middleware/clearFB'),
    log: require('./middleware/log')
  };
  Fission.prototype.mixins = {
    Listener: require('./ListenerMixin')
  };
  Fission.prototype.React = require('react');

  return Fission;

})();

module.exports = Fission;
