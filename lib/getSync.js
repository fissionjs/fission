'use strict';

module.exports = function(model) {
  var sync, _ref;
  if (model.sync) {
    sync = model.sync;
  } else if (((_ref = this.opts) != null ? _ref.sync : void 0) != null) {
    if (typeof this.opts.sync === 'function') {
      sync = this.opts.sync;
    } else if (typeof this.opts.sync === 'object') {
      if (this.opts.sync.plugin != null) {
        sync = this.opts.sync.plugin;
      } else {
        throw new Error('Invalid sync adapter');
      }
    }
  } else {
    sync = require('ampersand-sync');
  }
  return sync;
};
