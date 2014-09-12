(function() {
  var BackboneEvents, Collection, SyncAdapter, arrayMethods, classExtend, extend, isArray, slice, sync;

  BackboneEvents = require("backbone-events-standalone");

  SyncAdapter = require('./syncAdapter');

  classExtend = require("ampersand-class-extend");

  isArray = require("is-array");

  extend = require("extend-object");

  slice = [].slice;

  Collection = function(models, options) {
    var idAttribute;
    options || (options = {});
    if (options.model) {
      this.model = options.model;
    }
    if (options.comparator) {
      this.comparator = options.comparator;
    }
    if (options.parent) {
      this.parent = options.parent;
    }
    if (!this.mainIndex) {
      idAttribute = this.model && this.model.prototype && this.model.prototype.idAttribute;
      this.mainIndex = idAttribute || "id";
    }
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) {
      this.reset(models, extend({
        silent: true
      }, options));
    }
  };

  sync = function() {
    return console.log('sync strategy');
  };

  extend(Collection.prototype, BackboneEvents, SyncAdapter.bind(null, sync), {
    initialize: function() {},
    indexes: [],
    isModel: function(model) {
      return this.model && model instanceof this.model;
    },
    add: function(models, options) {
      return this.set(models, extend({
        merge: false,
        add: true,
        remove: false
      }, options));
    },
    parse: function(res, options) {
      return res;
    },
    serialize: function() {
      return this.map(function(model) {
        var out;
        if (model.serialize) {
          return model.serialize();
        } else {
          out = {};
          extend(out, model);
          delete out.collection;
          return out;
        }
      });
    },
    toJSON: function() {
      return this.serialize();
    },
    set: function(models, options) {
      var add, at, attrs, existing, i, id, length, merge, model, modelMap, order, orderedModels, remove, singular, sort, sortAttr, sortable, targetProto, toAdd, toRemove;
      options = extend({
        add: true,
        remove: true,
        merge: true
      }, options);
      if (options.parse) {
        models = this.parse(models, options);
      }
      singular = !isArray(models);
      models = (singular ? (models ? [models] : []) : models.slice());
      id = void 0;
      model = void 0;
      attrs = void 0;
      existing = void 0;
      sort = void 0;
      i = void 0;
      length = void 0;
      at = options.at;
      sortable = this.comparator && (!(at != null)) && options.sort !== false;
      sortAttr = ("string" === typeof this.comparator ? this.comparator : null);
      toAdd = [];
      toRemove = [];
      modelMap = {};
      add = options.add;
      merge = options.merge;
      remove = options.remove;
      order = (!sortable && add && remove ? [] : false);
      targetProto = this.model && this.model.prototype.or(Object.prototype);
      i = 0;
      length = models.length;
      while (i < length) {
        attrs = models[i] || {};
        if (this.isModel(attrs)) {
          id = model = attrs;
        } else if (targetProto.generateId) {
          id = targetProto.generateId(attrs);
        } else {
          id = attrs[targetProto.idAttribute || "id"];
        }
        if (existing = this.get(id)) {
          if (remove) {
            modelMap[existing.cid || existing[this.mainIndex]] = true;
          }
          if (merge) {
            attrs = (attrs === model ? model.attributes : attrs);
            if (options.parse) {
              attrs = existing.parse(attrs, options);
            }
            if (existing.set) {
              existing.set(attrs, options);
              if (sortable && !sort && existing.hasChanged(sortAttr)) {
                sort = true;
              }
            } else {
              extend(existing, attrs);
            }
          }
          models[i] = existing;
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) {
            continue;
          }
          toAdd.push(model);
          this._addReference(model, options);
        }
        model = existing || model;
        if (!model) {
          continue;
        }
        if (order && ((model.isNew && model.isNew() || !model[this.mainIndex]) || !modelMap[model.cid || model[this.mainIndex]])) {
          order.push(model);
        }
        modelMap[model[this.mainIndex]] = true;
        i++;
      }
      if (remove) {
        i = 0;
        length = this.length;
        while (i < length) {
          model = this.models[i];
          if (!modelMap[model.cid || model[this.mainIndex]]) {
            toRemove.push(model);
          }
          i++;
        }
        if (toRemove.length) {
          this.remove(toRemove, options);
        }
      }
      if (toAdd.length || (order && order.length)) {
        if (sortable) {
          sort = true;
        }
        if (at != null) {
          i = 0;
          length = toAdd.length;
          while (i < length) {
            this.models.splice(at + i, 0, toAdd[i]);
            i++;
          }
        } else {
          orderedModels = order || toAdd;
          i = 0;
          length = orderedModels.length;
          while (i < length) {
            this.models.push(orderedModels[i]);
            i++;
          }
        }
      }
      if (sort) {
        this.sort({
          silent: true
        });
      }
      if (!options.silent) {
        i = 0;
        length = toAdd.length;
        while (i < length) {
          model = toAdd[i];
          if (model.trigger) {
            model.trigger("add", model, this, options);
          } else {
            this.trigger("add", model, this, options);
          }
          i++;
        }
        if (sort || (order && order.length)) {
          this.trigger("sort", this, options);
        }
      }
      if (singular) {
        return models[0];
      } else {
        return models;
      }
    },
    get: function(query, indexName) {
      var index;
      if (!query) {
        return;
      }
      index = this._indexes[indexName || this.mainIndex];
      return index[query] || index[query[this.mainIndex]] || this._indexes.cid[query.cid];
    },
    at: function(index) {
      return this.models[index];
    },
    remove: function(models, options) {
      var i, index, length, model, singular;
      singular = !isArray(models);
      i = void 0;
      length = void 0;
      model = void 0;
      index = void 0;
      models = (singular ? [models] : slice.call(models));
      options || (options = {});
      i = 0;
      length = models.length;
      while (i < length) {
        model = models[i] = this.get(models[i]);
        if (!model) {
          continue;
        }
        this._deIndex(model);
        index = this.models.indexOf(model);
        this.models.splice(index, 1);
        if (!options.silent) {
          options.index = index;
          if (model.trigger) {
            model.trigger("remove", model, this, options);
          } else {
            this.trigger("remove", model, this, options);
          }
        }
        this._removeReference(model, options);
        i++;
      }
      if (singular) {
        return models[0];
      } else {
        return models;
      }
    },
    reset: function(models, options) {
      var i, length;
      options || (options = {});
      i = 0;
      length = this.models.length;
      while (i < length) {
        this._removeReference(this.models[i], options);
        i++;
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, extend({
        silent: true
      }, options));
      if (!options.silent) {
        this.trigger("reset", this, options);
      }
      return models;
    },
    sort: function(options) {
      var self;
      self = this;
      if (!this.comparator) {
        throw new Error("Cannot sort a set without a comparator");
      }
      options || (options = {});
      if (typeof this.comparator === "string") {
        this.models.sort(function(left, right) {
          if (left.get) {
            left = left.get(self.comparator);
            right = right.get(self.comparator);
          } else {
            left = left[self.comparator];
            right = right[self.comparator];
          }
          if (left > right || left === void 0) {
            return 1;
          }
          if (left < right || right === void 0) {
            return -1;
          }
          return 0;
        });
      } else if (this.comparator.length === 1) {
        this.models.sort(function(left, right) {
          left = self.comparator(left);
          right = self.comparator(right);
          if (left > right || left === void 0) {
            return 1;
          }
          if (left < right || right === void 0) {
            return -1;
          }
          return 0;
        });
      } else {
        this.models.sort(this.comparator.bind(this));
      }
      if (!options.silent) {
        this.trigger("sort", this, options);
      }
      return this;
    },
    _reset: function() {
      var i, l, list;
      list = this.indexes || [];
      i = 0;
      list.push(this.mainIndex);
      list.push("cid");
      l = list.length;
      this.models = [];
      this._indexes = {};
      while (i < l) {
        this._indexes[list[i]] = {};
        i++;
      }
    },
    _prepareModel: function(attrs, options) {
      if (!this.model) {
        return attrs;
      }
      if (this.isModel(attrs)) {
        return attrs;
      } else {
        options = (options ? extend({}, options) : {});
        options.collection = this;
        return new this.model(attrs, options);
      }
    },
    _deIndex: function(model) {
      var name;
      for (name in this._indexes) {
        delete this._indexes[name][model[name] || (model.get && model.get(name))];
      }
    },
    _index: function(model) {
      var indexVal, name;
      for (name in this._indexes) {
        indexVal = model[name] || (model.get && model.get(name));
        if (indexVal) {
          this._indexes[name][indexVal] = model;
        }
      }
    },
    _addReference: function(model, options) {
      this._index(model);
      if (!model.collection) {
        model.collection = this;
      }
      if (model.on) {
        model.on("all", this._onModelEvent, this);
      }
    },
    _removeReference: function(model, options) {
      if (this === model.collection) {
        delete model.collection;
      }
      this._deIndex(model);
      if (model.off) {
        model.off("all", this._onModelEvent, this);
      }
    },
    _onModelEvent: function(event, model, collection, options) {
      if ((event === "add" || event === "remove") && collection !== this) {
        return;
      }
      if (event === "destroy") {
        this.remove(model, options);
      }
      if (model && event === "change:" + this.mainIndex) {
        this._deIndex(model);
        this._index(model);
      }
      this.trigger.apply(this, arguments);
    }
  });

  Object.defineProperties(Collection.prototype, {
    length: {
      get: function() {
        return this.models.length;
      }
    },
    isCollection: {
      value: true
    }
  });

  arrayMethods = ["indexOf", "lastIndexOf", "every", "some", "forEach", "map", "filter", "reduce", "reduceRight"];

  arrayMethods.forEach(function(method) {
    Collection.prototype[method] = function() {
      return this.models[method].apply(this.models, arguments);
    };
  });

  Collection.prototype.each = Collection.prototype.forEach;

  Collection.extend = classExtend;

  module.exports = Collection;

}).call(this);
