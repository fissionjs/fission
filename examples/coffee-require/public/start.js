(function() {
  define(function(require) {
    var Fission, fission, routes;
    Fission = require('vendor/fission');
    routes = require('./routes');
    console.log("start");
    console.log(Fission);
    fission = Fission({
      routes: routes
    });
    return fission.start();
  });

}).call(this);
