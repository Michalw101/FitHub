// loginRouter.js
const express = require("express");
const router = express.Router();
const controller = require('../controllers/loginController.js');

router.post("/", async (req, res) => {
    try {
        const result = await controller.postLogin(req.body);

        if (result.success) {
            req.session.jwt = result.token;
            req.session.user = result.user;
            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    res.status(500).send({ message: 'Internal server error' });
                } else {
                    console.log('Session after login:', req.session);
                    res.status(200).send({ message: 'Logged in', user: result.user });
                }
            });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await controller.getSalt(id);
        res.send(result);
    } catch (err) {
        res.status(404).send({ ok: false, error: err.message });
    }
});

module.exports = router;
