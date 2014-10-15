'use strict';

module.exports = {
  listenTo: function(ee, event, listener) {
    ee.on(event, listener);
    return this;
  },
  removeListener: function(ee, event, listener) {
    if (ee.off != null) {
      ee.off(event, listener);
    } else if (ee.removeListener) {
      ee.removeListener(event, listener);
    }
    return this;
  },
  componentWillMount: function() {
    this.listeners = [];
  },
  componentWillUnmount: function() {
    var l, _i, _len, _ref;
    _ref = this.listeners;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      l = _ref[_i];
      this.removeListener(l.ee, l.event, l.listener);
    }
  }
};
