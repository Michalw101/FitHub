const express = require("express");
const router = express.Router();
const controller = require('../controllers/traineesController');
const { query } = require("../DB");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAllTrainees());
    } catch (err) {
        console.error("Error in GET /:", err);
        res.status(500).send({ ok: false });
    }
});


router.get("/waiting", async (req, res) => {
    console.log('waiting received:', req.query);
    try {
        res.send(await controller.getWaitingTrainees(req.query));
    } catch (err) {
        console.error("Error in GET /:", err);
        res.status(500).send({ ok: false });
    }
});

router.delete("/waiting", async (req, res) => {
    console.log('delete waiting received:', req.query);
    try {
        res.send(await controller.deleteWaitingTrainees(req.query));
    } catch (err) {
        console.error("Error in DELETE /:", err);
        res.status(500).send({ ok: false });
    }
});

router.delete("/cancel", async (req, res) => {
    try {
        res.send(await controller.deleteTraineeFromClass(req.query));
    } catch (err) {
        console.error("Error in DELETE /:", err);
        res.status(500).send({ ok: false });
    }
});

router.delete("/approved", async (req, res) => {
    try {
        res.send(await controller.deleteTraineeFromClass(req.query));
    } catch (err) {
        console.error("Error in DELETE /:", err);
        res.status(500).send({ ok: false });
    }
});


router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const sendMail = req.body.sendMail;
    console.log('delete trainee received:');
    try {
        res.send(await controller.deleteTrainee(id, sendMail));
    } catch (err) {
        console.error("Error in DELETE /:", err);
        res.status(500).send({ ok: false });
    }
});


router.get("/approved", async (req, res) => {
    console.log('approved received:', req.query);
    try {
        if (req.query.user_id && req.query.class_id) {
            console.log('1');
            res.send(await controller.checkIfApproved(req.query));
        } else {
            console.log('2');
            res.send(await controller.getApprovedTrainees(req.query));
        }
    } catch (err) {
        console.error("Error in GET /approved:", err);
        res.status(404).send({ ok: false });
    }
});


router.post("/approved", async (req, res) => {
    console.log('approved received:', req.query);
    try {
        res.send(await controller.addApprovedTrainees(req.body));
    } catch (err) {
        console.error("Error in POST /:", err);
        res.status(404).send({ ok: false });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('trainees router');
        res.send(await controller.updateTrainee(req.body, id));
    } catch (err) {
        console.error("Error in PUT /:", err);
        res.status(500).send({ ok: false });
    }
})


module.exports = router