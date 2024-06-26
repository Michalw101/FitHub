const model = require('../model/traineesModel');

async function getApprovedTrainees(query) {
    console.log('Controller received data:', query);
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

module.exports = { getApprovedTrainees, getWaitingTrainees}