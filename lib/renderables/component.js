'use strict';

var React = require('react');
var clone = require('lodash.clone');
var alias = require('../util/alias');

module.exports = function(config, mixins) {
  var vu = alias(clone(config));
  if (Array.isArray(mixins)) {
    vu.mixins = vu.mixins.concat(mixins);
  }

  return React.createFactory(React.createClass(vu));
};