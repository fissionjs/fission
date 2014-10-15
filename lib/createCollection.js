'use strict';

var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-underscore-mixin');
var adapter = require('ampersand-sync-adapter');

module.exports = function(model) {
  var col;
  if (model.isCollection) {
    col = Collection.extend(model);
  } else {
    var inst = new model();
    var conf = {
      model: model,
      url: inst.url()
    };
    col = Collection.extend(underscoreMixin, adapter, conf);
  }
  return col;
};
