const express = require("express");
const router = express.Router();
const controller = require('../controllers/infoController.js');

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        console.log("router req:", req.body);
        res.send(await controller.getInfo(id));
    } catch (err) {
        res.status(404).send({ ok: false });
    }
});



module.exports = router;
