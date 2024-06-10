const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const app = express();

// const todosRouter = require("./todosRouter.js")
// app.use("/todos", todosRouter);



router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAllUsers());
    }
    catch (err) {
        console.log("error in routes");
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await controller.createUser(req.body.fullname, req.body.username, req.body.email, req.body.address_id, req.body.company_id, req.body.phone, req.body.website);
        res.send(await controller.getUserById(response.insertId));
    }
    catch (err) {
        // res.sendFile(path.join(__dirname, '../public', 'error.html'));
        console.log("error in routes");
    }
});

router.get('/:id', async (req, res) => {

    const id = req.params.id;
    const user = await controller.getUserById(id);
    res.send(user);
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.updateUser(id, req.body.fullname, req.body.username, req.body.email, req.body.address_id, req.body.company_id, req.body.phone, req.body.website);
    res.send(await controller.getUserById(id));
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.deleteUser(id);
    res.send();
});

module.exports = router