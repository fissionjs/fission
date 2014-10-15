'use strict';

module.exports = function(config) {

  var aliases = {
    init: 'getInitialState',
    mounting: 'componentWillMount',
    mounted: 'componentDidMount',
    unmounting: 'componentWillUnmount'
  };
  for (var k in aliases) {
    var v = aliases[k];
    if (config[k] != null) {
      if (config[v] == null) {
        config[v] = config[k];
      }
    }
  }
  if (config.mixins == null) {
    config.mixins = [];
  }
  return config;
};
