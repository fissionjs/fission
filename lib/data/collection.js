'use strict';

var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-underscore-mixin');
var restMixin = require('ampersand-collection-rest-mixin');
var sync = require('ampersand-sync');
var ExtendedURLMixin = require('./mixins/ExtendedURLMixin');

module.exports = function(model) {
  var inst = new model();
  var conf = {
    model: model,
    sync: (inst.sync || sync),
    url: inst.url()
  };
  return Collection.extend(
    underscoreMixin, restMixin,
    ExtendedURLMixin, conf
  );
};

module.exports.extend = function() {
  return module.exports(Collection.extend.apply(null, arguments));
};
