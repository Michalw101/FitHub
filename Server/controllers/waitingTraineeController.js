const model = require('../model/waitingTraineeModel');

async function createWaitingTrainee(body) {
    try {
        console.log("controller body" + body);
        return model.createWaitingTrainee(body);
    }
    catch (err) {
        throw err;
    }
};

module.exports = {createWaitingTrainee}