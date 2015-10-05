'use strict';

var clone = require('lodash.clone');

var aliases = {
  handleProps: 'componentWillReceiveProps',
  handleMounting: 'componentWillMount',
  handleMounted: 'componentDidMount',
  handleUnmounting: 'componentWillUnmount',
  handleUpdate: 'componentWillUpdate',
  handleUpdated: 'componentDidUpdate',
  props: 'propTypes',
  name: 'displayName'
};
var aliasKeys = Object.keys(aliases);

// TODO: one iteration on the input object to clone
// and mutate is probably faster than one on alias keys and one on input
function alias(config) {
  var out = clone(config);

  aliasKeys.forEach(function(k){
    var v = aliases[k];
    // if config has the alias and no normal react name
    if (out[k] != null && out[v] == null) {
      out[v] = out[k];
      delete out[k];
    }
  });

  // always add a mixins array and alias them
  out.mixins = (out.mixins || []).map(alias);
  return out;
}

module.exports = alias;
