'use strict';

var React = require('react');
var clone = require('lodash.clone');
var alias = require('./alias');

module.exports = function(config) {
  return React.createClass(alias(clone(config)));
};