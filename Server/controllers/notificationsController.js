const model = require('../model/notificationsModel');

async function createNotification(body) {
    try {
        return model.createNotification(body);
    }
    catch (err) {
        throw err;
    }
};

module.exports ={createNotification}