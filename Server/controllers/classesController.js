const model = require('../model/classesModel');

async function createClass(body) {
    try {
        console.log("controller body" + body);
        return model.createClass(body);
    }
    catch (err) {
        throw err;
    }
};

async function getAllClasses() {
    try {
        return model.getAllClasses();
    }
    catch (err) {
        throw err;
    }
};

async function getClassById(id) {
    try {
        return model.getClass(id);
    }
    catch (err) {
        throw err;
    }
};

async function updateClass(body) {
    try {
        return model.updateClass(body);
    }
    catch (err) {
        throw err;
    }
};

async function deleteClass(id) {
    try {
        console.log('delete todo controller');
        return model.deleteClass(id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { createClass, getAllClasses, getClassById, updateClass, deleteClass}