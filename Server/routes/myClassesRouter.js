const express = require("express");
const router = express.Router();
const controller = require('../controllers/classesController');


router.get("/", async (req, res) => {
    console.log("query", req.query);
    try {
        res.send(await controller.getMyClasses(req.query));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

module.exports = router;
