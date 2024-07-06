const express = require("express");
const router = express.Router();
const controller = require('../controllers/adminController');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.put('/:id', authorizeAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        res.send(await controller.updateAdmin(req.body, id));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})


module.exports = router;