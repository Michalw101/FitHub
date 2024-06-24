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


module.exports = router;
