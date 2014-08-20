aliasLifecycle = require '../src/alias'

describe "#Fission.alias", ->

  it "should alias correctly", (done) ->

    view =
      init: ->
      mounting: ->
      mounted: ->
      unmounting: ->

    config = aliasLifecycle view

    config.should.have.property 'getInitialState'
    config.should.have.property 'componentWillMount'
    config.should.have.property 'componentDidMount'
    config.should.have.property 'componentWillUnmount'
    config.should.have.property 'mixins'
    done()
