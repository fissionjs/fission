'use strict';

var ListenerMixin = require('./ListenerMixin');

module.exports = function(config) {
  var ctor = this.createCollection(config.model);
  var CollectionViewMixin = {
    mixins: [ListenerMixin],
    renderItems: function() {
      var self = this;
      if (this.itemView != null) {
        this.items = this.collection.map(function() {
          return function(m) {
            return self.itemView({
              model: m,
              key: m.cid
            });
          };
        });
      }
      return this.forceUpdate();
    },
    componentWillMount: function() {
      var self = this;
      if (this.items == null) {
        this.items = [];
      }
      if (this.collection == null) {
        this.collection = new ctor();
        return this.collection.fetch({
          success: function() {
            return function(data) {
              return self.renderItems();
            };
          },
          error: function(err) {
            return console.log('fetch error ', err);
          }
        }, this.listenTo(this.collection, 'add change remove', function() {
          return function() {
            return self.renderItems();
          };
        }));
      } else {
        return this.renderItems();
      }
    }
  };
  if (!((this.collection != null) || (this.model != null))) {
    throw new Error('Requires either collection or model attribute');
  }
  if (config.mixins == null) {
    config.mixins = [];
  }
  config.mixins.push(CollectionViewMixin);
  return this.view(config);
};
