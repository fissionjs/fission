(function() {
  define(function(require) {
    var fission;
    fission = require('vendor/fission');
    return fission.model({
      name: 'Todo',
      url: '/v1/todo'
    });
  });

}).call(this);
