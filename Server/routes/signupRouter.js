const express = require("express");
const router = express.Router();
const controller = require('../controllers/signupController.js');


router.post("/", async (req, res) => {
    console.log("req:", req.body);
    try {
        res.send(await controller.postSignup(req.body));

    } catch (err) {
        console.log(`router error ${err} `);
        res.status(500).send({ ok: false, error: err });
    }
});


router.put("/", async (req, res) => {
    console.log("req:", req.body);
    try {
        const result = await controller.putSignup(req.body);
        console.log('result', result);
        if (result.success) {
            req.session.jwt = result.token;
            req.session.user = result.user;
            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    res.status(500).send({ message: 'Internal server error' });
                } else {
                    console.log('Session after login:', req.session);
                    res.status(200).send({ message: 'Logged in', user: result.user, token: result.token });
                }
            });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.log(`router error ${err} `);
        res.status(500).send({ ok: false, error: err });
    }

});

module.exports = router;
