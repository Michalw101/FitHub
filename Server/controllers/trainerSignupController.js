const model = require('../model/trainerSignupModel.js');


async function postSignup(body) {
    try {
        console.log("controller body", body);
        return await model.postSignup(body);
    }
    catch (err) {
        throw err;
    }
};

module.exports = { postSignup }
