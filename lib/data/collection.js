'use strict';

var Collection = require('ampersand-collection');
var underscoreMixin = require('ampersand-collection-underscore-mixin');
var ExtendedURLMixin = require('./mixins/ExtendedURLMixin');

module.exports = function(model) {
  // TODO: wtf is this for?
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
  return Collection.extend(underscoreMixin, ExtendedURLMixin, conf);
};
