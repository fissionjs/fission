'use strict';

var shallowEqual = require('react/lib/shallowEqual');
var lastPath;

module.exports = {
  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.impure === true) {
      return true;
    }

    // component is route-able
    var routeChanged = this.getPath && didPathChange(this.getPath());
    return routeChanged ||
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }
};

function didPathChange(currPath) {
  var pathChanged = lastPath !== currPath;
  lastPath = currPath;
  return pathChanged;
}