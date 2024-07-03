const model = require('../model/usersModel');


async function updateAdmin(body, id) {
    try {
        return model.updateAdmin(body, id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { updateAdmin }