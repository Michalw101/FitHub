const express = require("express");
const router = express.Router();
const controller = require('../controllers/waitingTraineeController');

router.post('/', async (req, res) => {
    console.log('waiting class router', req.body);
    try {
        res.send(await controller.createWaitingTrainee(req.body));
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
})

module.exports = router;
