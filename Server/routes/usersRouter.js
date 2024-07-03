const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController');

const currentUser = require("../middleware/currentUser");


router.get("/current-user", currentUser, async (req, res) => {
    console.log('current user router');
   
    try {
        res.send(await controller.getUser(req.query));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        res.send(await controller.updateAdmin(req.body, id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})


module.exports = router;