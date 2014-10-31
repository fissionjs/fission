'use strict';

var Fission = require('../../');

module.exports = new Fission({
  sync: function(method, model, f) {
    return model;
  }
});
