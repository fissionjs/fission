'use strict';

module.exports = {
  tryUpdate: function(cb){
    // prevent useless binds on fns with args (like EE)
    if (typeof cb !== 'function') {
      cb = undefined;
    }

    if (this.isMounted()) {
      this.forceUpdate(cb);
    }
  }
};
