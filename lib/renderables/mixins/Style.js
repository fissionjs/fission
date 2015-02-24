'use strict';

var insertCSS = require('insert-css');
var inserted = {};

module.exports = {
  componentWillMount: function() {
    if (!this.css || inserted[this.css]) {
      return;
    }
    insertCSS(this.css);
    inserted[this.css] = true;
  }
};