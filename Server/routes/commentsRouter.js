const express = require("express");
const router = express.Router();
const controller = require('../controllers/commentsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        console.log('comment router');
        res.send(await controller.getCommentById(id));
    } catch (err) {
        res.status(404).send({ ok: false });
    }
});


router.post("/", async (req, res) => {
    try {
        res.send(await controller.createComment(JSON.stringify(req.body)));
    }
    catch (err) {
        res.status(404).send({ ok: false });
    }
});

router.delete("/:id", async (req, res) => {
     const id = req.params.id;
    try {
        await controller.deleteComment(id);
        res.send();
    } catch (err) {
        res.status(404).send({ ok: false });
    }
});


router.put("/:id", async (req, res) => {
    try {
        res.send(await controller.updateComment(JSON.stringify(req.body)));
    }
    catch (err) {
        res.status(404).send({ ok: false });
    }
});


module.exports = router