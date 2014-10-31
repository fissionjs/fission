'use strict';

var ampSync = require('ampersand-sync');

module.exports = function(model) {
  if (model.sync) {
    return model.sync;
  }

  if (this.opts.sync == null) {
    return ampSync;
  }

  if (typeof this.opts.sync === 'function') {
    return this.opts.sync;
  }

  if (this.opts.sync.plugin != null) {
    return this.opts.sync.plugin;
  }

  throw new Error('Invalid sync option');
};
