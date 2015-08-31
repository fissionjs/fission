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
    var currentPath = this.getPath ? this.getPath() : null;
    var routeChanged = this._lastPath !== currentPath;

    var contextChanged = !equal(this.context, nextContext);
    var stateChanged = !equal(this.state, nextState);
    var propsChanged = !equal(this.props, nextProps);

    this._lastPath = currentPath;

    return this.impure || routeChanged
      || propsChanged || stateChanged
      || contextChanged;
  },

  updateState: function(t, cb) {
    return this.setState(function(state){
      update(state, t);
    }, cb);
  }
};
