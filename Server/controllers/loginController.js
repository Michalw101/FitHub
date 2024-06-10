const model = require('../model/loginModel');
const crypto = require('crypto');

async function postLogin(body) {
    console.log("controller body:", body);
    try {
        const { password, salt } = body;       
        const saltedPassword = password + salt;
        const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');
       
        return model.postLogin({ ...body, password: hashedPassword });

    } catch (err) {
        throw err;
    }
}

async function getSalt(id) {
    try {
        return model.getSalt(id);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { postLogin, getSalt };

