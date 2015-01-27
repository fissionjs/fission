'use strict';

var React = require('react');
var isArray = require('is-array');
var alias = require('../util/alias');

// a view is a react component + some aliases
module.exports = function(config, mixins) {
  var vu = alias(config);
  if (isArray(mixins)) {
    vu.mixins = vu.mixins.concat(mixins);
  }

  return React.createFactory(React.createClass(vu));
};