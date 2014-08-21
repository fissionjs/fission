(function() {
  define(function(require) {
    var Fission, routes;
    Fission = require('vendor/fission');
    routes = require('./routes');
    console.log("start");
    return console.log(Fission);
  });

}).call(this);
