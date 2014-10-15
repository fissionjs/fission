'use strict';

var Fission = require('../../lib/index');

module.exports = new Fission({
  sync: function(method, model, f) {
    return model;
  }
});
