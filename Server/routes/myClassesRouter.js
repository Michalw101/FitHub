const express = require("express");
const router = express.Router();
const controller = require('../controllers/classesController');
const authorizeTrainer = require('../middleware/authorizeTrainer')


router.get("/",authorizeTrainer, async (req, res) => {
    console.log("query", req.query);
    try {
        res.send(await controller.getTrainerClasses(req.query));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

router.get("/trainee/registered", async (req, res) => {
    console.log("query", req.query);
    try {
        res.send(await controller.getTraineeRegisteredClasses(req.query));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

router.get("/trainee/approved", async (req, res) => {
    console.log("query", req.query);
    try {
        res.send(await controller.getTraineeApprovedClasses(req.query));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

module.exports = router;
