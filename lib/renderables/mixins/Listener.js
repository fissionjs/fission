'use strict';

module.exports = {
  componentWillMount: function() {
    this.listeners = [];
  },
  componentWillUnmount: function() {
    this.listeners.forEach(function(l){
      this.removeListener(l.ee, l.event, l.listener);
    });
    this.listeners = [];
  },

  listenTo: function(ee, event, listener) {
    // wrap to avoid binding
    var newListener = function(){
      listener();
    };
    this.listeners.push({
      ee: ee,
      event: event,
      listener: newListener
    });
    ee.on(event, newListener);
    return this;
  },
  removeListener: function(ee, event, listener) {
    // TODO: remove from listeners if it exists
    // to prevent infinite buildup
    if (typeof ee.off === 'function') {
      ee.off(event, listener);
    } else if (typeof ee.removeListener === 'function') {
      ee.removeListener(event, listener);
    }
    return this;
  }
};
