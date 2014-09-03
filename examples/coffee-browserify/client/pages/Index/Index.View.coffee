fission = require '../../app'
Todo = require '../../models/Todo'
{div, h1, h3, a, button, br, span, input, img} = fission.React.DOM

itemView = fission.modelView
  model: Todo
  remove: -> @model.destroy()
  toggle: ->
    @model.set 'done', !@model.get('done')
    @model.save()
  check: ->
    if @model.get 'done'
      return 'done'
    return 'notdone'
  render: ->
    div {className: 'item'},
      input {className: 'checkbox', type: 'checkbox', onClick: @toggle, defaultChecked: @model.get('done')}
      span {className: @check()}, @model.get 'text'
      a {className: 'remove', href: '#', onClick: @remove}, ' x'

module.exports =

  fission.collectionView
    model: Todo
    itemView: itemView
    addTodo: (e) ->
      if e.which is 13
        @collection.create text: e.target.value, done: false
        e.target.value = ''

    render: ->

      done = @collection.filter (todo) -> todo.get('done')

      div {className: 'content'},
        h1 {}, 'todos'
        input {className: 'add-item', onKeyDown: @addTodo, type: 'text', placeholder: 'What needs to be done?'}
        div {className: 'items'},
          @items.map (item) ->
            item

        div {}, "#{@items.length-done.length} items left"
        div {}, "clear completed (#{done.length})"
