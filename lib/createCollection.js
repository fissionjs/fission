'use strict';

var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-underscore-mixin');
var adapter = require('ampersand-sync-adapter');

module.exports = function(model) {
  if (model.isCollection) {
    return Collection.extend(model);
  }

  var inst = new model();
  var conf = {
    model: model,
    // TODO: is this right? url is bound to an instance
    // shouldnt we just pass this straight through?
    url: inst.url()
  };
  return Collection.extend(underscoreMixin, adapter, conf);
};
