'use strict';

var clone = require('lodash.clone');

var aliases = {
  init: 'getInitialState',
  mounting: 'componentWillMount',
  mounted: 'componentDidMount',
  unmounting: 'componentWillUnmount'
};
var aliasKeys = Object.keys(aliases);

// TODO: one iteration on the input object to clone
// and mutate is probably faster than one on alias keys and one on input
module.exports = function(config) {
  var out = clone(config);

  aliasKeys.forEach(function(k){
    var v = aliases[k];
    // if config has the alias and no normal react name
    if (out[k] != null && out[v] == null) {
      out[v] = out[k];
    }
  });
  // always add a mixins array
  if (out.mixins == null) {
    out.mixins = [];
  }
  return out;
};
