const model = require('../model/signupModel');
const crypto = require('crypto');


async function postSignup(body) {
    try {
        console.log("controller body", body);

        const { password } = body;
        // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        // console.log(hashedPassword);

        // return await model.postSignup({ ...body, password: hashedPassword });

        const salt = crypto.randomBytes(16).toString('hex');

        const saltedPassword = password + salt;
        const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');
        console.log(hashedPassword);

        return await model.postSignup({ ...body, password: hashedPassword, salt: salt });
  
    }
    catch (err) {
        throw err;
    }
};


async function putSignup(body) {
    try {
        return model.putSignup(body);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { postSignup, putSignup }
