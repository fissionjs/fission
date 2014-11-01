'use strict';

var React = require('react');
var clone = require('lodash.clone');
var alias = require('./alias');

module.exports = function(config, mixins) {
  var vu = alias(clone(config));
  vu.mixins = vu.mixins.concat(mixins);
  return React.createClass(vu);
};