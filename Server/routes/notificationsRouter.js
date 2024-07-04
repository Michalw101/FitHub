const express = require("express");
const router = express.Router();
const controller = require('../controllers/notificationsController');


router.post('/', async (req, res) => {
    try {
        res.send(await controller.createNote(req.body));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})

module.exports = router;
