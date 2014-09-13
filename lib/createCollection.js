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
      inst = new model();
      conf = {
        model: model,
        url: inst.url()
      };
      col = Collection.extend(underscoreMixin, adapter, conf);
    }
    return col;
  };

}).call(this);
