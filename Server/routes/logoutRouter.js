const express = require("express");
const router = express.Router();

router.post('/',async (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({ message: 'Logout failed' });
        }
        res.clearCookie('token');
        res.status(200).send({ message: 'Logged out successfully' });
    });
});


module.exports = router;
