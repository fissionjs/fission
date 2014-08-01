page = require 'page'

app = {}

renderView = (opt={}, cb) ->
  if typeof opt.view is 'function'
    opt.view = opt.view opt.args
    return renderView opt, cb
  else if typeof opt.view is 'string'
    return require [opt.view], (vu) ->
      opt.view = vu
      renderView opt, cb
  else
    #console.log 'rendering', opt.view, 'into', opt.el
    React.renderComponent opt.view, opt.el
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