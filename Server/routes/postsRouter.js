const express = require("express");
const router = express.Router();
const controller = require('../controllers/postsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        console.log('post router');
        res.send(await controller.getPostsById(id));
    } catch (err) {
        res.status(404).send({ ok: false });
    }
});

router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAllPosts());
    } catch (err) {
        res.status(404).send({ ok: false });
    }
});


router.post("/", async (req, res) => {
    try {
        res.send(await controller.createPost(JSON.stringify(req.body)));
    }
    catch (err) {
        res.status(404).send({ ok: false });
    }
});

router.delete("/:id", async (req, res) => {
     const id = req.params.id;
    try {
        await controller.deletePost(id);
        res.send();
    } catch (err) {
        res.status(404).send({ ok: false });
    }
});


router.put("/:id", async (req, res) => {
    try {
        res.send(await controller.updatePost(JSON.stringify(req.body)));
    }
    catch (err) {
        res.status(404).send({ ok: false });
    }
});


module.exports = router