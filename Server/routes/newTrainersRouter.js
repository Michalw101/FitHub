const express = require("express");
const router = express.Router();
const controller = require('../controllers/newTrainersController')
const authorizeAdmin = require('../middleware/authorizeAdmin');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", authorizeAdmin, async (req, res) => {
    try {
        res.send(await controller.getAllNewTrainers());
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

router.delete("/:id", authorizeAdmin, async (req, res) => {
    const id = req.params.id;
    const sendMail = req.body.sendMail;
    try {
        res.send(await controller.deleteTrainer(id, sendMail));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

module.exports = router