(function() {
  var ListenerMixin;

  ListenerMixin = require('./ListenerMixin');

  module.exports = function(config) {
    var CollectionViewMixin, ctor, sync;
    if (config.model.sync) {
      sync = config.model.sync;
    } else if (this.opts.sync != null) {
      if (typeof this.opts.sync === 'function') {
        sync = this.opts.sync;
      } else if (typeof this.opts.sync === 'object') {
        if (this.opts.sync.plugin != null) {
          sync = this.opts.sync.plugin;
        } else {
          throw new Error('Invalid sync adapter');
        }
      }
    } else {
      sync = require('ampersand-sync');
    }
    ctor = this.createCollection(config.model);
    CollectionViewMixin = {
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
          this.collection = new ctor;
          this.collection.sync = sync;
          return this.collection.fetch({
            success: (function(_this) {
              return function(data) {
                return _this.renderItems();
              };
            })(this),
            error: function(err) {
              return console.log('fetch error ', err);
            }
          }, this.listenTo(this.collection, 'add change remove', (function(_this) {
            return function(e) {
              return _this.renderItems();
            };
          })(this)));
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

}).call(this);
