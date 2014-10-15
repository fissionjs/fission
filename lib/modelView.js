'use strict';

var ListenerMixin = require('./ListenerMixin');

module.exports = function(config) {

  var ModelViewMixin = {
    mixins: [ListenerMixin],
    componentWillMount: function() {
      var _ref;
      if (this.props.model != null) {
        this.model = this.props.model;
        return this.model;
      } else if (((_ref = this.props.params) != null ? _ref.id : void 0) != null) {
        this.model = new config.model();
        this.model.id = this.props.params.id;
        this.listenTo(this.model, 'change', (function(_this) {
          return function() {
            return _this.forceUpdate();
          };
        })(this));
        return this.model.fetch();
      }
    }
  };
  if (config.model == null) {
    throw new Error('Missing model attribute');
  }
  if (config.mixins == null) {
    config.mixins = [];
  }
  config.mixins.push(ModelViewMixin);
  return this.view(config);
};
