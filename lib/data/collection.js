'use strict';

var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-underscore-mixin');
var restMixin = require('ampersand-collection-rest-mixin');
var sync = require('ampersand-sync');
var ExtendedURLMixin = require('./mixins/ExtendedURLMixin');

module.exports = function(conf) {
  var inst = new conf.model();
  conf.sync = inst.sync || sync;
  inst.spec = conf;
  var ctor = Collection.extend(
    underscoreMixin, restMixin,
    ExtendedURLMixin, conf
  );
  ctor.spec = conf;
  return ctor;
};

module.exports.extend = function() {
  return module.exports(Collection.extend.apply(null, arguments));
};
