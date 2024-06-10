const express = require("express");
const router = express.Router();
const controller = require('../controllers/signupController.js');

router.post("/", async (req, res) => {
    console.log("req:", req.body);
    try {
        res.send(await controller.postSignup(req.body));
    } catch (err) {
        console.log(`router error ${err} `);
        res.status(500).send({ ok: false,  error: err });
    }
});


router.put("/", async (req, res) => {
    console.log("req:", req.body);
    try {
        res.send(await controller.putSignup(req.body));
    } catch (err) {
        console.log(`router error ${err} `);
        res.status(500).send({ ok: false,  error: err });
    }

});

module.exports = router;
