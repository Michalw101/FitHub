const express = require("express");
const router = express.Router();
const controller = require('../controllers/trainersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const authorizeAdmin = require("../middleware/authorizeAdmin")
const authorizeTrainer = require("../middleware/authorizeTrainer")



router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAllTrainers());
    } catch (err) {
        console.error("Error in POST /:", err); 

        res.status(404).send({ ok: false });
    }
});

router.post("/",authorizeAdmin, async (req, res) => {
    try {
        res.send(await controller.createTrainer(req.body));
    }
    catch (err) {
        res.status(500).send({ ok: false });
    }
});

router.post("/waiting", async (req, res) => {
    try {
        res.send(await controller.postSignup(req.body));
    } catch (err) {
        console.log(`router error ${err} `);
        res.status(500).send({ ok: false,  error: err });
    }
});


router.put('/:id',authorizeTrainer,  async (req, res) => {
    try {
        const id = req.params.id;
        console.log('trainers router');
        res.send(await controller.updateTrainer(req.body, id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})

router.delete("/:id",authorizeAdmin, async (req, res) => {
    const id= req.params.id;
    try {
        res.send(await controller.deleteTrainer(id));
    } catch (err) {
        console.error("Error in DELETE /:", err); 
        res.status(500).send({ ok: false });
    }
});

module.exports = router