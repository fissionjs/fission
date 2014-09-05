'use strict';

module.exports = {
  listenTo: function(ee, event, listener) {
    ee.on(event, listener);
    return this;
  },
  removeListener: function(ee, event, listener) {
    if (ee.off) {
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
    var ref = this.listeners;
    for (var i = 0, len = ref.length; i < len; i++) {
      var l = ref[i];
      this.removeListener(l.ee, l.event, l.listener);
    }
  }
};
