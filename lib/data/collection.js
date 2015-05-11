'use strict';

var Collection = require('ampersand-collection');
var lodashMixin = require('ampersand-collection-lodash-mixin');
var restMixin = require('ampersand-collection-rest-mixin');
var sync = require('ampersand-sync');

module.exports = function(conf) {
  if (conf.model == null) {
    throw new Error('Missing model');
  }
  if (conf.model.spec == null) {
    throw new Error('Model is missing a spec');
  }
  if (conf.sync == null) {
    conf.sync = conf.model.spec.sync || sync;
  }
  if (conf.url == null) {
    conf.url = conf.model.spec.urlRoot;
  }
  var ctor = Collection.extend(
    lodashMixin, restMixin, conf
  );
  if (ctor.spec == null) {
    ctor.spec = conf;
  }
  return ctor;
};

module.exports.extend = function() {
  return module.exports(Collection.extend.apply(null, arguments));
};
