'use strict';

var ampSync = require('ampersand-sync');

// TODO: dont rely on `this` anymore
// bind in the options
module.exports = function(model, opt) {
  if (model.sync) {
    return model.sync;
  }

  if (opt.sync == null) {
    return ampSync;
  }

  if (typeof opt.sync === 'function') {
    return opt.sync;
  }

  if (opt.sync.plugin != null) {
    return opt.sync.plugin;
  }

  throw new Error('Invalid sync option');
};
