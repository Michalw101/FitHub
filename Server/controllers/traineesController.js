const model = require('../model/traineesModel');

async function getAllTrainees() {
    try {

        return model.getAllTrainees();
    }
    catch (err) {
        throw err;
    }
};

async function getTraineesByTrainer(id) {
    try {

        return model.getTraineesByTrainer(id);
    }
    catch (err) {
        throw err;
    }
};

async function getApprovedTrainees(query) {
    try {

        return model.getApprovedTrainees(query);
    }
    catch (err) {
        throw err;
    }
};

async function getWaitingTrainees(query) {
    try {
        return model.getWaitingTrainees(query);
    }
    catch (err) {
        throw err;
    }
};
async function addApprovedTrainees(body) {
    try {

        return model.addApprovedTrainees(body);
    }
    catch (err) {
        throw err;
    }
};

async function deleteWaitingTrainees(query) {
    try {
        return model.deleteWaitingTrainees(query);
    }
    catch (err) {
        throw err;
    }
};

async function deleteTraineeFromClass(query) {
    try {
        return model.deleteTraineeFromClass(query); 
    }
    catch (err) {
        throw err;
    }
};


async function deleteTrainee(id, sendMail) {
    try {
        return model.deleteTrainee(id, sendMail);
    }
    catch (err) {
        throw err;
    }
};

async function updateTrainee(body, id) {
    try {
        return model.updateTrainee(body, id);
    }
    catch (err) {
        throw err;
    }
};

async function checkIfApproved(query) {
    try {
        return model.checkIfApproved(query);
    }
    catch (err) {
        throw err;
    }
};

async function createWaitingTrainee(body) {
    try {
        console.log("controller body" + body);
        return model.createWaitingTrainee(body);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { getApprovedTrainees, createWaitingTrainee, getTraineesByTrainer, deleteTraineeFromClass, getAllTrainees, deleteTrainee, updateTrainee, getWaitingTrainees, checkIfApproved, addApprovedTrainees, deleteWaitingTrainees }