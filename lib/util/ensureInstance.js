'use strict';

var clone = require('lodash.clone');
var AmpersandCollection = require('ampersand-collection');
var AmpersandModel = require('ampersand-model');
var combineQS = require('../util/combineQS');
var model = require('../data/model');
var collection = require('../data/collection');

function construct(opt) {
  opt = opt || {};
  // already an instance, just return
  if (opt.input instanceof opt.expected) {
    opt.input._needsInitialFetch = false;
    return opt.input;
  }

  opt.options = clone(opt.options) || {};
  var providedData = !!opt.options.data;
  opt.options.data = opt.options.data || {};
  var ctor;

  if (typeof opt.input === 'object') {
    ctor = opt.createConstructor(opt.input);
  } else {
    ctor = opt.input;
  }

  if (typeof ctor !== 'function') {
    throw new Error('Field must be an object, instance, or constructor');
  }

  if (opt.options.id &&
    !opt.options.data[ctor.prototype.idAttribute]) {
    opt.options.data[ctor.prototype.idAttribute] = opt.options.id;
  }
  var inst = new ctor(opt.options.data, opt.options);
  inst._needsInitialFetch = !providedData;

  // set id attrib to id - needed for fetching
  // only set if not already done in data option
  if (!inst[inst.idAttribute] && opt.options.id) {
    inst[inst.idAttribute] = opt.options.id;
  }

  // TODO: move to a model/collection mixin
  if (opt.options.query) {
    var origFn = (typeof inst.url === 'function' ? inst.url.bind(inst) : function(){return inst.url;});
    inst.url = function() {
      return combineQS(origFn(), opt.options.query);
    };
  }
  return inst;
}

// Model = either a Model constructor,
// a Model instance, or an object to create a Model constructor
// options = construction options
function constructModel(Model, options) {
  return construct({
    input: Model,
    expected: AmpersandModel,
    createConstructor: model,
    options: options
  });
}

// Collection = either a Collection constructor,
// a Collection instance, or an object to create a Collection constructor
// options = construction options
function constructCollection(Collection, options) {
  return construct({
    input: Collection,
    expected: AmpersandCollection,
    createConstructor: collection,
    options: options
  });
}

module.exports = {
  model: constructModel,
  collection: constructCollection
};