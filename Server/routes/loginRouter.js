const express = require("express");
const router = express.Router();
const controller = require('../controllers/loginController.js');

router.post("/", async (req, res) => {
    try {
        const result = await controller.postLogin(req.body);

        if (result.success) {
            // res.cookie('accessToken', result.token, { httpOnly: true, path: '/' });
            res.status(200).send({ message: 'Logged in', user: result.user });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        console.log("router req:", req.body);
        res.send(await controller.getSalt(id));
    } catch (err) {
        res.status(404).send({ ok: false });
    }
});



module.exports = router;
