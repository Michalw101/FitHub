const express = require("express");
const router = express.Router();
const currentUser = require("../middleware/currentUser");
const controller = require('../controllers/usersController');

router.get("/current-user", currentUser, async (req, res) => {
    console.log('current user router');
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        res.send(await controller.getUser(id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

router.get("/email/:id", async (req, res) => {
    const id = req.params.id;
    try {
        res.send(await controller.getEmailById(id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});


router.put('/password/:id', async (req, res) => {
    try {
        console.log('router body', req.body);
        const id = req.params.id;
        console.log('router id', id);
        res.send(await controller.updatePassword(req.body, id));
    } catch (err) {
        res.status(500).send({ ok: false, err: err.message });
    }
});

router.put('/forgot-password', async (req, res) => {
    try {
        console.log('Forgot password for email:', req.body.email);
        res.send(await controller.forgotPassword(req.body));
    } catch (err) {
        res.status(500).send({ ok: false, err: err.message });
    }
});

module.exports = router;
