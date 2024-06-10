const express = require("express");
const router = express.Router();
const controller = require('../controllers/trainersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAllTrainers());
    } catch (err) {
        res.status(404).send({ ok: false });
    }
});

// router.get("/:id", async (req, res) => {
//     const id = req.params.id;
//     try {
//         res.send(await controller.getTodosById(id));
//     } catch (err) {
//         res.status(404).send({ ok: false });
//     }
// });

// router.post("/", async (req, res) => {
//     try {
//         console.log("router todo req" + JSON.stringify(req.body));
//         res.send(await controller.createTodo(JSON.stringify(req.body)));
//     }
//     catch (err) {
//         res.status(404).send({ ok: false });
//     }
// });

// router.delete("/:id", async (req, res) => {
//      const id = req.params.id;
//      console.log('delete todo router');
//     try {
//         await controller.deleteTodo(id);
//         res.send();
//     } catch (err) {
//         res.status(404).send({ ok: false });
//     }
// });


// router.put("/:id", async (req, res) => {
//     try {
//         res.send(await controller.updateTodo(JSON.stringify(req.body)));
//     }
//     catch (err) {
//         res.status(404).send({ ok: false });
//     }
// });


module.exports = router