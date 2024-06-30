const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateSession = (req, res, next) => {
    console.log('in authenticateSession');
    console.log(req.cookies);
    const token = req.cookies.token;
    console.log('JWT in session:', token);
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.sendStatus(403); 
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateSession;
