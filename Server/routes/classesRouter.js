const express = require("express");
const router = express.Router();
const controller = require('../controllers/classesController');
const authorizeTrainer = require('../middleware/authorizeTrainer');


router.get("/", authorizeTrainer, async (req, res) => {
    try {
        res.send(await controller.getAllClasses());
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});


router.get("/by-query", async (req, res) => {
    try {
        const query= req.query; 
        res.send(await controller.getClassesByQuery(query));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});


router.post('/', authorizeTrainer, async (req, res) => {
    try {
        res.send(await controller.createClass(req.body));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})

router.put('/:id', authorizeTrainer, async (req, res) => {
    try {
        const id = req.params.id;
        res.send(await controller.updateClass(req.body, id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})

router.delete("/:id" ,authorizeTrainer,  async (req, res) => {
    const id = req.params.id;
    try {
        res.send(await controller.deleteClass(id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

module.exports = router;
