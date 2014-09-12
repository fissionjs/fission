(function() {
  var extend, wrapError;

  extend = require('extend-object');

  wrapError = function(model, options) {
    var error;
    error = options.error;
    options.error = function(resp) {
      if (error) {
        error(model, resp, options);
      }
      model.trigger("error", model, resp, options);
    };
  };

  module.exports = function(sync) {
    console.log('sync: ' + sync);
    console.log(this.sync);
    if (sync == null) {
      sync = require('ampersand-sync');
    }
    return {
      fetch: function(options) {
        var collection, success;
        options = (options ? extend({}, options) : {});
        if (options.parse === void 0) {
          options.parse = true;
        }
        success = options.success;
        collection = this;
        options.success = function(resp) {
          var method;
          method = (options.reset ? "reset" : "set");
          collection[method](resp, options);
          if (success) {
            success(collection, resp, options);
          }
          collection.trigger("sync", collection, resp, options);
        };
        wrapError(this, options);
        return sync('read', this, options);
      },
      create: function(model, options) {
        var collection, success;
        options = (options ? extend({}, options) : {});
        if (!(model = this._prepareModel(model, options))) {
          return false;
        }
        if (!options.wait) {
          this.add(model, options);
        }
        collection = this;
        success = options.success;
        options.success = function(model, resp) {
          if (options.wait) {
            collection.add(model, options);
          }
          if (success) {
            success(model, resp, options);
          }
        };
        model.save(null, options);
        return model;
      },
      sync: function() {
        return sync.apply(this, arguments);
      },
      getOrFetch: function(id, options, cb) {
        var done, model, self;
        done = function() {
          var model;
          model = self.get(id);
          if (model) {
            if (cb) {
              cb(null, model);
            }
          } else {
            cb(new Error("not found"));
          }
        };
        if (arguments.length !== 3) {
          cb = options;
          options = {};
        }
        self = this;
        model = this.get(id);
        if (model) {
          return cb(null, model);
        }
        if (options.all) {
          this.fetch({
            success: done,
            error: done
          });
        } else {
          this.fetchById(id, cb);
        }
      },
      fetchById: function(id, cb) {
        var idObj, model, self;
        self = this;
        idObj = {};
        idObj[this.model.prototype.idAttribute] = id;
        model = new this.model(idObj, {
          collection: this
        });
        model.fetch({
          success: function() {
            self.add(model);
            if (cb) {
              cb(null, model);
            }
          },
          error: function() {
            delete model.collection;
            if (cb) {
              cb(Error("not found"));
            }
          }
        });
      }
    };
  };

}).call(this);
