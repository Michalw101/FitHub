const express = require("express");
const router = express.Router();
const currentUser = require("../middleware/currentUser");
const controller = require('../controllers/usersController');


router.get("/current-user", currentUser, async (req, res) => {
    console.log('current user router');
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        res.send(await controller.getUser(id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});


module.exports = router;