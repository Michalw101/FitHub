const express = require("express");
const router = express.Router();
const controller = require('../controllers/trainersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
    try {
        console.log('Request received:', req.body); 

        res.send(await controller.getAllTrainers());
    } catch (err) {
        console.error("Error in POST /:", err); 

        res.status(404).send({ ok: false });
    }
});

router.post("/", async (req, res) => {
    try {
        res.send(await controller.createTrainer(req.body));
    }
    catch (err) {
        res.status(500).send({ ok: false });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('trainers router');
        res.send(await controller.updateTrainer(req.body, id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})

module.exports = router