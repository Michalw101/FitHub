const model = require('../model/trainersModel');

async function createTrainer(body) {
    try {
        console.log('Controller received data:', body);

        return model.createTrainer(body);
    }
    catch (err) {
        console.error("Error in createTrainer:", err);
        throw err;
    }
};

async function getAllTrainers() {
    try {
        return model.getAllTrainers();
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

async function deleteTrainer(id) {
    try {
        console.log('delete todo controller');
        return model.deleteTrainer(id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { createTrainer, getAllTrainers, getTrainerById, updateTrainer, deleteTrainer}