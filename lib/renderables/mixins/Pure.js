'use strict';

var update = require('react/lib/update');
var shallowEqual = require('react/lib/shallowEqual');
var lastPath;

module.exports = {
  shouldComponentUpdate: function(nextProps, nextState) {
    var routeChanged = this.getPath && didPathChange(this.getPath());
    return this.impure || routeChanged ||
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  },

  updateState: function(t, cb) {
    return this.setState(update(this.state, t), cb);
  }
};

function didPathChange(currPath) {
  var pathChanged = lastPath !== currPath;
  lastPath = currPath;
  return pathChanged;
}