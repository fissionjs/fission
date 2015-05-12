'use strict';

var clone = require('lodash.clone');
var Collection = require('ampersand-collection');
var lodashMixin = require('ampersand-collection-lodash-mixin');
var restMixin = require('ampersand-collection-rest-mixin');
var sync = require('ampersand-sync');

module.exports = function(config) {
  var col = clone(config);

  if (col.model == null) {
    throw new Error('Missing model');
  }
  if (col.model.spec == null) {
    throw new Error('Model is missing a spec');
  }
  if (col.sync == null) {
    col.sync = col.model.spec.sync || sync;
  }
  if (col.url == null) {
    col.url = col.model.spec.urlRoot;
  }
  if (col.spec == null) {
    col.spec = config;
  }
  var ctor = Collection.extend(
    lodashMixin, restMixin, col
  );
  return ctor;
};

module.exports.extend = function() {
  return module.exports(Collection.extend.apply(null, arguments));
};
