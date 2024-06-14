const express = require("express");
const router = express.Router();
const controller = require('../controllers/newTrainersController')
const authorizeAdmin = require('../middleware/authorizeAdmin');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// router.get('/', authorizeAdmin, async (req, res) => {
//     try {
//         const trainers = await controller.getAllNewTrainers();
//         res.json(trainers);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


router.get("/", async (req, res) => {
    console.log(req.session)
    try {
        res.send(await controller.getAllNewTrainers());
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

// async function getAllNewTrainers(req, res) {
//     try {
//         const trainers = await controller.getAllNewTrainers();
//         res.json(trainers);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

// router.get('/', authorizeAdmin, getAllNewTrainers);




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

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const sendMail = req.body.sendMail;
    console.log('delete trainer router');
    try {
        res.send(await controller.deleteTrainer(id, sendMail));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});


// router.put("/:id", async (req, res) => {
//     try {
//         res.send(await controller.updateTodo(JSON.stringify(req.body)));
//     }
//     catch (err) {
//         res.status(404).send({ ok: false });
//     }
// });


module.exports = router