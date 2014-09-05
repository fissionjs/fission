'use strict';

var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-underscore-mixin');

module.exports = function(model) {
  var col;
  if (model.sync == null) {
    model.sync = require('ampersand-collection-rest-mixin');
  }
  if (model.isCollection) {
    col = Collection.extend(model);
  } else {
    var conf = {
      model: model
    };
    var inst = new model();
    conf.url = inst.url();
    col = Collection.extend(underscoreMixin, model.sync, conf);
  }
  return col;
};
