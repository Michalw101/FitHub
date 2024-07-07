const model = require('../model/usersModel');

async function getUser(id) {
    try {
        return model.getUser(id);
    }
    catch (err) {
        throw err;
    }
};


module.exports ={getUser}