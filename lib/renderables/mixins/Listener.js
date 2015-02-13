'use strict';

module.exports = {
  componentWillMount: function() {
    this._initializeListeners();
  },
  componentWillUnmount: function() {
    this.removeListeners();
  },

  _initializeListeners: function() {
    if (this.listeners) {
      return;
    }
    this.listeners = [];
  },

  listenTo: function(ee, event, listener) {
    this._initializeListeners();

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
  removeListeners: function() {
    if (!this.listeners) {
      return;
    }
    this.listeners.forEach(function(l){
      this.removeListener(l.ee, l.event, l.listener);
    }, this);
    this.listeners = null;
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
