'use strict';

var Collection = require('ampersand-collection');
var lodashMixin = require('ampersand-collection-lodash-mixin');
var restMixin = require('ampersand-collection-rest-mixin');
var sync = require('ampersand-sync');

module.exports = function(conf) {
  var inst = new conf.model();
  conf.sync = inst.sync || sync;
  conf.url = inst.urlRoot;
  inst.spec = conf;
  var ctor = Collection.extend(
    conf, lodashMixin, restMixin
  );
  ctor.spec = conf;
  return ctor;
};

module.exports.extend = function() {
  return module.exports(Collection.extend.apply(null, arguments));
};
