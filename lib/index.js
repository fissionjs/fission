'use strict';

var Fission;

module.exports = Fission = function() {
  function Fission(opts) {
    this.opts = opts;
  }
  Fission.prototype = {
    view: require('./view'),
    alias: require('./alias'),
    model: require('./model'),
    router: require('./router'),
    modelView: require('./modelView'),
    collectionView: require('./collectionView'),
    createCollection: require('./createCollection'),
    middleware: {
      auth: require('./middleware/auth'),
      clearFB: require('./middleware/clearFB'),
      log: require('./middleware/log')
    },
    mixins: {
      Listener: require('./ListenerMixin')
    },
    React: require('react')
  };

  return Fission;

}();
