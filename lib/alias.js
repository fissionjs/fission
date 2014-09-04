(function() {
  module.exports = function(config) {
    var aliases, k, v;
    aliases = {
      init: 'getInitialState',
      mounting: 'componentWillMount',
      mounted: 'componentDidMount',
      unmounting: 'componentWillUnmount'
    };
    for (k in aliases) {
      v = aliases[k];
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

}).call(this);
