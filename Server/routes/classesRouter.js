const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const credentials = require('./credentials.json'); // Replace with your credentials path
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const express = require("express");
const router = express.Router();
const controller = require('../controllers/classesController');
const authorizeTrainer = require('../middleware/authorizeTrainer');




router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAllClasses());
    } catch (err) {
        res.status(500).send({ ok: false });
    }
});

router.post('/', authorizeTrainer, async (req, res) => {
    try {
        console.log('class router');
        res.send(await controller.createClass(req.body));
    } catch (err) {
        res.status(500).send({ ok: false });
    }
})


module.exports = router;
