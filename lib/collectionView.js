'use strict';

var ListenerMixin = require('./ListenerMixin');

module.exports = function(config) {
  if (config == null) {
    throw new Error('config parameter is required');
  }
  if (config.model == null) {
    throw new Error('model attribute is required');
  }

  var sync = this.getSync(config.model);
  var ctor = this.createCollection(config.model);
  var CollectionViewMixin = {
    mixins: [ListenerMixin],
    renderItems: function() {
      if (this.itemView != null) {
        this.items = this.collection.map((function(_this) {
          return function(m) {
            return _this.itemView({
              model: m,
              key: m.cid
            });
          };
        })(this));
      }
      return this.forceUpdate();
    },
    componentWillMount: function() {
      if (this.items == null) {
        this.items = [];
      }
      if (this.collection == null) {
        this.collection = new ctor();
        this.collection.sync = sync;
        return this.collection.fetch({
          success: this.renderItems,
          error: function(err) {
            return console.log('fetch error ', err);
          }
        }, this.listenTo(this.collection, 'add change remove', this.renderItems));
      } else {
        return this.renderItems();
      }
    }
  };

  return this.view(config, [CollectionViewMixin]);
};
