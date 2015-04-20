'use strict';

var Model = require('ampersand-model');
var clone = require('lodash.clone');
var sync = require('ampersand-sync');

module.exports = function(config) {
  var model = clone(config);

  model.sync = model.sync || sync;
  model.urlRoot = model.url;
  model.spec = model;
  delete model.url;

  var ctor = Model.extend(model);
  ctor.spec = model;
  return ctor;
};

module.exports.extend = function() {
  return module.exports(Model.extend.apply(null, arguments));
};
