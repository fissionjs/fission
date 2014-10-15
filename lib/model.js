'use strict';

var Model = require('ampersand-model');

module.exports = function(model) {

  if (model.url == null) {
    model.url = '/';
  }
  model.urlRoot = model.url;
  delete model.url;
  model.sync = this.getSync(model);
  var m = Model.extend(model);
  return m;
};
