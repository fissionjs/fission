'use strict';

var ListenerMixin = require('./ListenerMixin');

module.exports = function(config) {
  var ModelViewMixin = {
    mixins: [ListenerMixin],
    componentWillMount: function() {
      var self = this;
      var ref;
      if (this.props.model != null) {
        this.model = this.props.model;
        return this.model;
      } else if (((ref = this.props.params) != null ? ref.id : void 0) != null) {
        this.model = new config.model();
        this.model.id = this.props.params.id;
        this.listenTo(this.model, 'change', function() {
          return self.forceUpdate();
        });
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
