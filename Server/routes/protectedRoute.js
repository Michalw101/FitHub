const express = require('express');
const router = express.Router();
const authenticateSession = require('../middleware/authenticateSession');

router.get('/protected', authenticateSession, (req, res) => {
    console.log('User in protected route:', req.user);
    res.json({ message: 'You are authorized', user: req.user });
});

module.exports = router;
