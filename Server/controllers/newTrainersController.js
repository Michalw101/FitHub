const model = require('../model/newTrainersModel');

async function createTrainer(body) {

    //
    try {
        console.log("controller body" + body);

        return model.createTrainer(body);
    }
    catch (err) {
        throw err;
    }
};

async function getAllNewTrainers() {
    //check sessions
    try {
        return model.getAllNewTrainers();
    }
    catch (err) {
        throw err;
    }
};

async function getTrainerById(id) {
    try {
        return model.getTrainer(id);
    }
    catch (err) {
        throw err;
    }
};



async function updateTrainer(body) {
    try {
        return model.updateTrainer(body);
    }
    catch (err) {
        throw err;
    }
};

async function deleteTrainer(id, sendMail) {
    try {
        console.log('delete trainer controller');
        return model.deleteTrainer(id, sendMail);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { createTrainer, getAllNewTrainers, getTrainerById, updateTrainer, deleteTrainer}