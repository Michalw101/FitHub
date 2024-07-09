const express = require("express");
const router = express.Router();
const controller = require('../controllers/notificationsController');


router.post('/', async (req, res) => {
    try {
        res.send(await controller.createNotification(req.body));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})

router.get('/', async (req, res) => {
    try {
        res.send(await controller.getNotifications(req.query));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})

router.put('/', async (req, res) => {
    try {
        res.send(await controller.putNotifications(req.body));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
    
});

module.exports = router;
