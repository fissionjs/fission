'use strict';

var Model = require('ampersand-model');
var clone = require('lodash.clone');
var ExtendedURLMixin = require('./mixins/ExtendedURLMixin');

module.exports = function(config) {
  var model = clone(config);

  // TODO: explain why this is being done
  if (model.url == null) {
    model.url = '/';
  }
  model.urlRoot = model.url;
  delete model.url;

  return Model.extend(ExtendedURLMixin, model);
};
