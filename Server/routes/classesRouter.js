const express = require("express");
const router = express.Router();
const controller = require('../controllers/classesController');

router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAllClasses());
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});


router.post('/', async (req, res) => {
    try {
        console.log('class router');
        res.send(await controller.createClass(req.body));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('class router');
        res.send(await controller.updateClass(req.body, id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    console.log('delete class router');
    try {
        res.send(await controller.deleteClass(id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

module.exports = router;
