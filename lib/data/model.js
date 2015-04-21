'use strict';

var Model = require('ampersand-model');
var clone = require('lodash.clone');
var sync = require('ampersand-sync');

module.exports = function(config) {
  var model = clone(config);

  if (model.sync == null) {
    model.sync = sync;
  }
  model.spec = model;

  var ctor = Model.extend(model);
  ctor.spec = model;
  return ctor;
};

module.exports.extend = function() {
  return module.exports(Model.extend.apply(null, arguments));
};
