'use strict';

var  Fission = require('../../lib/index');

module.exports = new Fission({
  sync: function() {
    return console.log('sync');
  }
});
