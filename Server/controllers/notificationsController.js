const model = require('../model/notificationsModel');

async function createNotification(body) {
    try {
        return model.createNotification(body);
    }
    catch (err) {
        throw err;
    }
};

async function getNotifications(query) {
    try {
        return model.getNotifications(query);
    }
    catch (err) {
        throw err;
    }
};

async function putNotifications(user_id) {
    try {
        return model.putNotifications(user_id);
    }
    catch (err) {
        throw err;
    }
};


module.exports ={createNotification, getNotifications, putNotifications}