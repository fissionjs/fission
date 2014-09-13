(function() {
  var Model;

  Model = require('ampersand-model');

  module.exports = function(model) {
    var m;
    if (model.url == null) {
      model.url = '/';
    }
    model.urlRoot = model.url;
    delete model.url;
    model.sync = this.getSync(model);
    m = Model.extend(model);
    return m;
  };

}).call(this);
