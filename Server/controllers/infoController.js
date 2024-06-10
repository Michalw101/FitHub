const model = require('../model/infoModel');


async function getInfo(id) {
    try {
        return model.getInfo(id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { getInfo }
