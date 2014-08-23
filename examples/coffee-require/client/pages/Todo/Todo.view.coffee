define (require) ->

  fission = require 'vendor/fission'
  Todo = require 'models/Todo'
  {div, h1, h3, a, button, br, span, input, img} = fission.React.DOM

  itemView = fission.modelView
    model: Todo
    remove: -> @model.destroy()
    toggle: -> 
      @model.set 'done', !@model.get('done')
      @model.save()
    render: ->
      div {},
        input {type: 'checkbox', onClick: @toggle, defaultChecked: @model.get('done')}
        style = {}
        if @model.get 'done'
          style = {textDecoration: 'line-through'}
        span {style: style}, @model.get 'text'  
        a {href: '#', onClick: @remove}, ' x'

  fission.collectionView
    model: Todo
    itemView: itemView 
    addTodo: (e) ->
      if e.which is 13
        @collection.create text: e.target.value, done: false
        e.target.value = ''

    render: -> 

      console.log @collection
      console.log @items

      done = @collection.filter (todo) -> todo.get('done')

      div {},
        h1 {}, 'todos'
        input {onKeyDown: @addTodo, type: 'text', placeholder: 'What needs to be done?'}
        
        @items.map (item) ->
          div {}, item

        div {}, "#{@items.length-done.length} items left"
        div {}, "clear completed (#{done.length})"