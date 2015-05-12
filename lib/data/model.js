'use strict';

var Model = require('ampersand-model');
var clone = require('lodash.clone');
var sync = require('ampersand-sync');
var cacheMixin = require('ampersand-local-cache-mixin');
var ms = require('milliseconds');

var defaultCaching = {
  ttl: ms.weeks(1),
  storageKey: function(){
    return [this.getType(), this.getId()].join('-');
  },
  initialize: function(){
    if (this.getId() != null) {
      this.initStorage();
      this.on('change', this.writeToStorage, this);
    }
  }
};

module.exports = function(config) {
  var model = clone(config);

  if (model.sync == null) {
    model.sync = sync;
  }
  if (model.spec == null) {
    model.spec = config;
  }
  var ctor = Model.extend(cacheMixin, defaultCaching, model);
  ctor.spec = model;
  return ctor;
};

module.exports.extend = function() {
  return module.exports(Model.extend.apply(null, arguments));
};
