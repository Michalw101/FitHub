const model = require('../model/adminModel');


async function updateAdmin(body, id) {
    try {
        return model.updateAdmin(body, id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { updateAdmin }