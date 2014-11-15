'use strict';

var Fission = require('../../');

module.exports = Fission({
  sync: function(method, model, f) {
    return model;
  }
});
