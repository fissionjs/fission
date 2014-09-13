Fission = require '../../src/index'

module.exports = new Fission
  sync: (method, model, f) -> return model
