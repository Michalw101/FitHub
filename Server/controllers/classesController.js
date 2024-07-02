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

async function getClassesByQuery(query) {
    try {
        return model.getClassesByQuery(query);
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


async function getTrainerClasses(query) {
    try {
        return model.getTrainerClasses(query);
    }
    catch (err) {
        throw err;
    }
};

async function getTraineeRegisteredClasses(query) {
    try {
        return model.getTraineeRegisteredClasses(query);
    }
    catch (err) {
        throw err;
    }
};

async function getTraineeApprovedClasses(query) {
    try {
        return model.getTraineeApprovedClasses(query);
    }
    catch (err) {
        throw err;
    }
};


async function updateClass(body, id) {
    try {
        return model.updateClass(body, id);
    }
    catch (err) {
        throw err;
    }
};

async function deleteClass(id) {
    try {
        console.log('delete class controller');
        return model.deleteClass(id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { createClass, getAllClasses,getClassesByQuery, getClassById,getTrainerClasses, getTraineeApprovedClasses,getTraineeRegisteredClasses, updateClass, deleteClass}