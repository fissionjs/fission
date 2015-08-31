'use strict';

var update = require('react/lib/update');
var shallowEqual = require('react/lib/shallowEqual');

function equal(a, b) {
  if (a == null && b == null) {
    return true;
  }
  return shallowEqual(a, b);
}

module.exports = {
  shouldComponentUpdate: function(nextProps, nextState, nextContext) {
    var path = !this._lastPath || this._lastPath !== this.getPath();
    var ctx = !equal(this.context, nextContext);
    var state = !equal(this.state, nextState);
    var props = !equal(this.props, nextProps);

    if (this.getPath) {
      this._lastPath = this.getPath();
    }

    return this.impure || path || props || state || ctx;
  },

  updateState: function(t, cb) {
    return this.replaceState(update(this.state, t), cb);
  }
};
