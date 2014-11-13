'use strict';

module.exports = {
  listenTo: function(ee, event, listener) {
    ee.on(event, function(){
      listener();
    });
    // TODO: push to listeners
    return this;
  },
  removeListener: function(ee, event, listener) {
    // TODO: remove from listeners if it exists
    // TODO: take an object too
    if (typeof ee.off === 'function') {
      ee.off(event, listener);
    } else if (typeof ee.removeListener === 'function') {
      ee.removeListener(event, listener);
    }
    return this;
  },
  componentWillMount: function() {
    this.listeners = [];
  },
  componentWillUnmount: function() {
    this.listeners.forEach(function(l){
      this.removeListener(l.ee, l.event, l.listener);
    });
  }
};
