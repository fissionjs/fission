(function() {
  var Collection, adapter, underscoreMixin;

  Collection = require('ampersand-collection');

  underscoreMixin = require('ampersand-collection-underscore-mixin');

  adapter = require('ampersand-sync-adapter');

  module.exports = function(model) {
    var col, conf, inst;
    if (model.isCollection) {
      col = Collection.extend(model);
    } else {
      conf = {
        model: model
      };
      inst = new model();
      conf.url = inst.url();
      col = Collection.extend(underscoreMixin, adapter, conf);
    }
    return col;
  };

}).call(this);
