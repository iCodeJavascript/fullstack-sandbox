var loki = require('lokijs');
var db = new loki('sandbox.db');
var todoLists = db.addCollection('todos');

//create an id field,
todoLists.on('insert', function (input) {
    input.id = input.$loki - 1;
});

//insert base data
todoLists.insert({title: 'cool list', todos: [{name: 'First todo of first list!', completed: false}]});
todoLists.insert({title: 'a', todos: [{name: 'First todo of first list!', completed: false}]});

class TodoListsService {

    updateTodoList(listId, todoList) {
        try {
            var dbTodoList = todoLists.findOne({'id': parseInt(listId)});
            const update = {
                ...dbTodoList,
                ...todoList
            };
            todoLists.update(update);
            return todoLists.data
        }
        catch (e) {
            throw new Error(e);
        }
    }

    getTodoLists() {
        try {
            return todoLists.data
        }
        catch (e) {
            throw new Error(e);
        }
    }

}

const todoListsService = new TodoListsService();
module.exports = todoListsService;

