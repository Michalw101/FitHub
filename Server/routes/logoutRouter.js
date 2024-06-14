const express = require("express");
const router = express.Router();

router.post('/',async (req, res) => {

    console.log("in router logout")
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
         // The default cookie name for sessions in Express

        res.status(200).send({ message: 'Logged out successfully' });
    });
});


module.exports = router;
