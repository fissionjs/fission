'use strict';

var AmpersandCollection = require('ampersand-collection');
var AmpersandModel = require('ampersand-model');
var combineQS = require('../util/combineQS');
var model = require('../data/model');
var collection = require('../data/collection');

function construct(opt) {
  // already an instance, just return
  if (opt.input instanceof opt.lookingFor) {
    return opt.input;
  }

  var ctor;

  if (typeof opt.input === 'object') {
    ctor = opt.createConstructor(opt.input);
  } else {
    ctor = opt.input;
  }

  if (typeof ctor !== 'function') {
    throw new Error('Field must be an object, instance, or constructor');
  }

  var inst = new ctor(opt.options.data, opt.options);
  if (!opt.options.data) {
    inst._needsInitialFetch = true;
  }
  // set id attrib to id - needed for fetching
  // TODO: use opt.data.id or opt.options.id?
  // TODO: is this even needed?
  inst.id = opt.options.id;
  if (inst.idAttribute !== undefined) {
    inst[inst.idAttribute] = opt.options.id;
  }

  // TODO: move to a model/collection mixin
  if (opt.options.query) {
    inst.url = combineQS(inst.url, opt.options.query);
  }
  return inst;
}

// Model = either a Model constructor,
// a Model instance, or an object to create a Model constructor
// options = construction options
function constructModel(Model, options) {
  return construct({
    input: Model,
    lookingFor: AmpersandModel,
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
    lookingFor: AmpersandCollection,
    createConstructor: collection,
    options: options
  });
}

module.exports = {
  model: constructModel,
  collection: constructCollection
};