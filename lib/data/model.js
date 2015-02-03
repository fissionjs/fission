'use strict';

var Model = require('ampersand-model');
var clone = require('lodash.clone');
var sync = require('ampersand-sync');
var ExtendedURLMixin = require('./mixins/ExtendedURLMixin');

module.exports = function(config) {
  var model = clone(config);

  // TODO: explain why this is being done
  if (model.url == null) {
    model.url = '/';
  }
  if (model.sync == null) {
    model.sync = sync;
  }
  model.urlRoot = model.url;
  delete model.url;

  return Model.extend(ExtendedURLMixin, model);
};
