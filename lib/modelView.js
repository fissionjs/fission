'use strict';

var ListenerMixin = require('./ListenerMixin');

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }
  if (config.model == null) {
    throw new Error('model attribute is required');
  }

  var ModelViewMixin = {
    mixins: [ListenerMixin],
    componentWillMount: function() {
      if (this.props.model != null) {
        this.model = this.props.model;
      } else if (this.props.params && this.props.params.id != null) {
        this.model = new config.model();
        this.model.id = this.props.params.id;
        this.model.fetch();
      }

      this.listenTo(this.model, 'change', this.forceUpdate);
      return this.model;
    }
  };

  return this.view(config, [ModelViewMixin]);
};
