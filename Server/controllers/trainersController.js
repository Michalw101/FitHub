const model = require('../model/trainersModel');

async function createTrainer(body) {
    try {
        console.log('Controller received data:', body);
        return await model.createTrainer(body);
    } catch (err) {
        console.error("Error in createTrainer:", err);
        throw err;
    }
}

async function getAllTrainers() {
    try {
        return await model.getAllTrainers();
    } catch (err) {
        throw err;
    }
}

async function getTrainerById(id) {
    try {
        return await model.getTrainer(id);
    } catch (err) {
        throw err;
    }
}

async function updateTrainer(body, id) {
    try {
        return await model.updateTrainer(body, id);
    } catch (err) {
        throw err;
    }
}

async function deleteTrainer(id) {
    try {
        return await model.deleteTrainer(id);
    } catch (err) {
        throw err;
    }
}

async function postSignup(body) {
    try {
        console.log("Controller received data:", body);
        return await model.postSignup(body);
    } catch (err) {
        throw err;
    }
}

module.exports = { createTrainer, getAllTrainers, getTrainerById, updateTrainer, deleteTrainer, postSignup };
