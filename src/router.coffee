page = require 'page'
React = require 'react'
fission = require './fission'

app = {}
renderView = (opt={}, cb) ->
  if typeof opt.view is 'function'
    opt.view = opt.view opt.args
    return renderView opt, cb
  else
    React.renderComponent opt.view.bind(null, fission), opt.el
    return cb()

app.createRouteHandler = (opt) ->
  if typeof opt is 'string'
    return (ctx, next) ->
      require [opt], (fn) ->
        return fn ctx, next
  else
    return app.createRenderHandler opt

app.createRenderHandler = (opt={}) ->
  opt.continue ?= true
  if typeof opt.el is 'string'
    opt.el = document.getElementById opt.el
  handler = (ctx, next) ->
    nopt =
      el: opt.el
      view: opt.view
      args: ctx
    renderView nopt, ->
      if opt.title?
        document.title = opt.title
      next() if opt.continue
  return handler

app.route = (route, handlers...) ->
  handlers = handlers.map app.createRouteHandler
  page route, handlers...
  return app

app.router = page
app.use = app.route.bind null, '*'
app.start = page.start

module.exports = app
