'use strict';

var shallowEqual = require('react/lib/shallowEqual');

module.exports = {
  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.impure === true) {
      return true;
    }
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState);
  }
};
