Model = require 'ampersand-model'
should = require 'should'
fission = require './fixtures/fissionInstance'

describe '#model', ->

  it 'should produce a model', (done) ->

    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'

    m.should.be.type 'function'
    m.__super__.save.should.be.type 'function'
    m.__super__.fetch.should.be.type 'function'
    m.__super__.destroy.should.be.type 'function'
    m.__super__.sync.should.be.type 'function'

    inst = new m
      firstName: 'Steve'
      lastName: 'Jobz'

    inst.should.be.instanceOf Model
    inst.firstName.should.equal 'Steve'
    inst.lastName.should.equal 'Jobz'

    inst.url = '/api/'
    inst.on 'change', (data) ->
      inst.save()
      inst.lastName.should.equal 'Nash'

    inst.set lastName: 'Nash'

    done()

  it 'should not contain elements if not defined in model.props', (done) ->

    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'
    inst = new m
      firstName: 'Larry'
      lastName: 'Page'
      age: '50'
    inst.firstName.should.equal 'Larry'
    inst.lastName.should.equal 'Page'
    should.not.exist inst.age

    done()

  it 'should return an error if error', (done) ->
    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'
    inst = new m
      firstName: 'Larry'
      lastName: 'Page'
    inst.on 'error', (err) ->
      err.should.not.be.null

    inst.sync = (method, model, options) ->
      options.error()

    inst.save()
    inst.fetch()

    done()

  it 'should have default URL if not provided', (done) ->
    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'
    inst = new m
      firstName: 'Larry'
      lastName: 'Page'

    inst.urlRoot.should.equal '/'

    done()

  it 'should map model.url to model.urlRoot', (done) ->
    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'
      url: '/api/v2/users'
    inst = new m
      firstName: 'Larry'
      lastName: 'Page'
    inst.urlRoot.should.exist
    inst.urlRoot.should.equal '/api/v2/users'

    done()

  it 'should set model.url to function', (done) ->
    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'
      url: '/api/v2/users'
    inst = new m
      firstName: 'Larry'
      lastName: 'Page'
    inst.url.should.exist
    inst.url.should.be.type 'function'

    done()

  it 'should save new data with proxies', (done) ->
    m = fission.model
      props:
        firstName: 'string'
        lastName: 'string'
      url: '/api/v2/users'
    inst = new m
      firstName: 'Larry'
      lastName: 'Page'
    inst.on 'change', (data) ->
      data.firstName.should.equal 'Ellen'
      inst.firstName.should.equal 'Ellen'
      done()

    inst.firstName = 'Ellen'
    inst.save()
