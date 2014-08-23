(function() {
  define(function(require) {
    var Fission, routes;
    Fission = require('vendor/fission');
    console.log(Fission);
    routes = require('./routes');
    console.log("start");
    return Fission.start({
      routes: routes
    });
  });

}).call(this);
