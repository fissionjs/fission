'use strict';

var Model = require('ampersand-model');
var clone = require('lodash.clone');
var getSync = require('./util/getSync');

module.exports = function(config) {
  var model = clone(config);

  if (model.url == null) {
    model.url = '/';
  }
  model.urlRoot = model.url;
  delete model.url;
  model.sync = getSync(model, this.options);
  return Model.extend(model);
};
