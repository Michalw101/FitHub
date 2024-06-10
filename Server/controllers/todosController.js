const model = require('../model/todosModel');

async function createTodo(body) {
    try {
        console.log("controller body" + body);

        return model.createTodo(body);
    }
    catch (err) {
        throw err;
    }
};

async function getAllTodos() {
    try {
        return model.getTodos();
    }
    catch (err) {
        throw err;
    }
};

async function getTodosById(id) {
    try {
        console.log('b');
        return model.getTodos(id);
    }
    catch (err) {
        throw err;
    }
};

async function getTodoByQuery(query) {
    // try {
    //     return model.getTodoByQuery(query);
    // }
    // catch (err) {
    //     throw err;
    // }
};

async function updateTodo(body) {
    try {
        return model.updateTodo(body);
    }
    catch (err) {
        throw err;
    }
};

async function deleteTodo(id) {
    try {
        console.log('delete todo controller');
        return model.deleteTodo(id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { createTodo, getAllTodos, getTodosById, updateTodo, deleteTodo, getTodoByQuery}