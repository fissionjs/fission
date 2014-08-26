{start} = require '../src'
should = require 'should'

describe '#start', ->
  it 'should start the router', (done) ->

    routes =
      config:
        click: true
        dispatch: true
        popstate: true

      routes:
        '/':
          title: 'Welcome'
          view: -> console.log 'view'
          el: 'content'
          continue: false

    routes.should.be.type 'object'

    done()
