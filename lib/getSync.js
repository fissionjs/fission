'use strict';

var ampSync = require('ampersand-sync');

// TODO: dont rely on `this` anymore
// bind in the options
module.exports = function(model) {
  if (model.sync) {
    return model.sync;
  }

  if (this.options.sync == null) {
    return ampSync;
  }

  if (typeof this.options.sync === 'function') {
    return this.options.sync;
  }

  if (this.options.sync.plugin != null) {
    return this.options.sync.plugin;
  }

  throw new Error('Invalid sync option');
};
