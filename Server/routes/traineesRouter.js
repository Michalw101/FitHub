const express = require("express");
const router = express.Router();
const controller = require('../controllers/traineesController');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const authorizeTrainer= require('../middleware/authorizeTrainer')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", authorizeAdmin, async (req, res) => {
    try {
        res.send(await controller.getAllTrainees());
    } catch (err) {
        console.error("Error in GET /:", err);
        res.status(500).send({ ok: false });
    }
});

router.get("/trainer/:id", async (req, res) => {
    const id = req.params.id;
    try {
        res.send(await controller.getTraineesByTrainer(id));
    } catch (err) {
        console.error("Error in GET /:", err);
        res.status(500).send({ ok: false });
    }
});


router.get("/waiting", async (req, res) => {
    try {
        res.send(await controller.getWaitingTrainees(req.query));
    } catch (err) {
        console.error("Error in GET /:", err);
        res.status(500).send({ ok: false });
    }
});

router.delete("/waiting", authorizeTrainer, async (req, res) => {
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

router.delete("/approved", authorizeTrainer, async (req, res) => {
    try {
        res.send(await controller.deleteTraineeFromClass(req.query));
    } catch (err) {
        console.error("Error in DELETE /:", err);
        res.status(500).send({ ok: false });
    }
});


router.delete("/:id", authorizeAdmin, async (req, res) => {
    const id = req.params.id;
    const sendMail = req.body.sendMail;
    try {
        res.send(await controller.deleteTrainee(id, sendMail));
    } catch (err) {
        console.error("Error in DELETE /:", err);
        res.status(500).send({ ok: false });
    }
});


router.get("/approved", async (req, res) => {
    try {
        if (req.query.user_id && req.query.class_id) {
            res.send(await controller.checkIfApproved(req.query));
        } else {
            res.send(await controller.getApprovedTrainees(req.query));
        }
    } catch (err) {
        console.error("Error in GET /approved:", err);
        res.status(404).send({ ok: false });
    }
});


router.post("/approved", authorizeTrainer, async (req, res) => {
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
        res.send(await controller.updateTrainee(req.body, id));
    } catch (err) {
        console.error("Error in PUT /:", err);
        res.status(500).send({ ok: false });
    }
})

router.post('/waiting', async (req, res) => {
    try {
        res.send(await controller.createWaitingTrainee(req.body));
    } catch (err) {
        res.status(500).send({ ok: false, error: err.message });
    }
})


module.exports = router