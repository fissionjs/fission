'use strict';

module.exports = function(config) {
  var aliases = {
    init: 'getInitialState',
    mounted: 'componentDidMount',
    mounting: 'componentWillMount',
    unmounting: 'componentWillUnmount'
  };
  for (var k in aliases) {
    var v = aliases[k];
    if (config[k]) {
      if (!config[v]) {
        config[v] = config[k];
      }
    }
  }
  if (!config.mixins) {
    config.mixins = [];
  }
  return config;
};
