fission = require '../../vendor/fission'
Todo = require '../../models/Todo'
React = fission.React
{div, h1, h3, a, button, br, span, input, img} = fission.React.DOM


itemView = fission.modelView
  model: Todo
  remove: ->
    @model.destroy()
  getInitialState: ->
    isDone: false
  toggle: ->
    @model.set 'done', !@model.get('done')
    @model.save()
    @setState isDone: !@state.isDone
  check: ->
    if @state.isDone
      return 'done'
    'notDone'
  checked: ->
    if @model.get('done')
      return 'checked'
    return ''
  render: ->
    div {className: 'item'},
      input {type: 'checkbox', className: 'checkbox', onClick: @toggle, checked: @checked()}
      span {className: @check()}, @model.get 'text'
      a {href: '#', onClick: @remove, className: 'remove'}, ' x'

module.exports =
  fission.collectionView
    model: Todo
    itemView: itemView
    addTodo: (e) ->
      if e.which is 13
        @collection.create text: e.target.value, done: false
        e.target.value = ''
    done: ->
      @collection.filter (todo) -> todo.get('done')
    clearAll: ->
      @collection.each (m) ->
        m.set 'done', false

    render: ->
      console.log @collection.filter (todo) -> todo.get 'done'


      div {className: 'content'},
        h1 {}, 'todos'
        input {onKeyDown: @addTodo, className: "title #{@props.isDone}", type: 'text', placeholder: 'What needs to be done?'}
        div {className: 'items'},
          @items.map (item) ->
            item

        div {}, "#{@items.length-@done().length} items left"
        div {className: 'clear-all', onClick: @clearAll}, "clear completed (#{@done().length})"
