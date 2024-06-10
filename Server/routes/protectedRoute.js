const express = require("express");
const router = express.Router();

router.get("/protected", (req, res) => {
    if (req.session.user) {
        res.json({ message: "This is protected data", user: req.session.user });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

module.exports = router;
