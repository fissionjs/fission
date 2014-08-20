start = require '../src/start'
should = require 'should'

module.exports = 

  "start should work and start router": ->

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

    start 
      routes: routes



