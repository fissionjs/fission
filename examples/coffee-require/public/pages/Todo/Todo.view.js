(function() {
  define(function(require) {
    var Todo, a, br, button, div, fission, h1, h3, img, input, itemView, span, _ref;
    fission = require('vendor/fission');
    Todo = require('models/Todo');
    _ref = fission.React.DOM, div = _ref.div, h1 = _ref.h1, h3 = _ref.h3, a = _ref.a, button = _ref.button, br = _ref.br, span = _ref.span, input = _ref.input, img = _ref.img;
    itemView = fission.modelView({
      model: Todo,
      remove: function() {
        return this.model.destroy();
      },
      toggle: function() {
        this.model.set('done', !this.model.get('done'));
        return this.model.save();
      },
      render: function() {
        var style;
        return div({}, input({
          type: 'checkbox',
          onClick: this.toggle,
          defaultChecked: this.model.get('done')
        }), style = {}, this.model.get('done') ? style = {
          textDecoration: 'line-through'
        } : void 0, span({
          style: style
        }, this.model.get('text')), a({
          href: '#',
          onClick: this.remove
        }, ' x'));
      }
    });
    return fission.collectionView({
      model: Todo,
      itemView: itemView,
      addTodo: function(e) {
        if (e.which === 13) {
          this.collection.create({
            text: e.target.value,
            done: false
          });
          return e.target.value = '';
        }
      },
      render: function() {
        var done;
        console.log(this.collection);
        console.log(this.items);
        done = this.collection.filter(function(todo) {
          return todo.get('done');
        });
        return div({}, h1({}, 'todos'), input({
          onKeyDown: this.addTodo,
          type: 'text',
          placeholder: 'What needs to be done?'
        }), this.items.map(function(item) {
          return div({}, item);
        }), div({}, "" + (this.items.length - done.length) + " items left"), div({}, "clear completed (" + done.length + ")"));
      }
    });
  });

}).call(this);
