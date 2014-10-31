'use strict';

var Model = require('ampersand-model');
var clone = require('lodash.clone');

module.exports = function(model) {
  model = clone(model);

  if (model.url == null) {
    model.url = '/';
  }
  model.urlRoot = model.url;
  delete model.url;
  model.sync = this.getSync(model);
  return Model.extend(model);
};
