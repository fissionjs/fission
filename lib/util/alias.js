'use strict';

var aliases = {
  init: 'getInitialState',
  mounting: 'componentWillMount',
  mounted: 'componentDidMount',
  unmounting: 'componentWillUnmount'
};
var aliasKeys = Object.keys(aliases);

// warning: mutates input
module.exports = function(config) {
  aliasKeys.forEach(function(k){
    var v = aliases[k];
    // if config has the alias and no normal react name
    if (config[k] != null && config[v] == null) {
      config[v] = config[k];
    }
  });
  // always add a mixins array
  if (config.mixins == null) {
    config.mixins = [];
  }
  return config;
};
