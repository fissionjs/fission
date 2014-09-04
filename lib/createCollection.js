(function() {
  var Collection, underscoreMixin;

  Collection = require('ampersand-collection');

  underscoreMixin = require('ampersand-collection-underscore-mixin');

  module.exports = function(model) {
    var col, conf, inst;
    if (model.sync == null) {
      model.sync = require('ampersand-collection-rest-mixin');
    }
    if (model.isCollection) {
      col = Collection.extend(model);
    } else {
      conf = {
        model: model
      };
      inst = new model();
      conf.url = inst.url();
      col = Collection.extend(underscoreMixin, model.sync, conf);
    }
    return col;
  };

}).call(this);
