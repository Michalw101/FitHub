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

router.put('/markAsRead', async (req, res) => {

    try {
        const user_id = req.query.user_id;
        res.send(await controller.putNotifications(user_id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
    
});

module.exports = router;
