(function() {
  define(function(require) {
    var fission;
    fission = require('vendor/fission');
    console.log(fission);
    return fission.model({
      props: {
        text: 'string'
      },
      url: '/v1/todos'
    });
  });

}).call(this);
