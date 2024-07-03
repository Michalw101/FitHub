const model = require('../model/traineesModel');

async function getAllTrainees() {
    try {

        return model.getAllTrainees();
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

async function deleteTrainee(id) {
    try {
        return model.deleteTrainee(id);
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
module.exports = { getApprovedTrainees, getAllTrainees, deleteTrainee, updateTrainee, getWaitingTrainees, checkIfApproved, addApprovedTrainees, deleteWaitingTrainees }