const model = require('../model/usersModel');
const crypto = require('crypto');

async function getUser(id) {
    try {
        return model.getUser(id);
    }
    catch (err) {
        throw err;
    }
};


async function updatePassword(body, id) {
    try {
        console.log('controller id', id);
        const { password } = body;
        const salt = crypto.randomBytes(16).toString('hex');

        const saltedPassword = password + salt;
        const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');
        return model.updatePassword({ ...body, password: hashedPassword, salt: salt }, id);
    }
    catch (err) {
        throw err;
    }
};



module.exports = { getUser, updatePassword }