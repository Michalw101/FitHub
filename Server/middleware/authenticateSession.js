const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateSession = (req, res, next) => {
    console.log('in authenticateSession');

    const token = req.headers['authorization'];
    const expirationTime = req.headers['expiration-time'];

    console.log('JWT in session:', token);

    if (token && expirationTime) {
        const currentTime = new Date().getTime();
        
        if (currentTime > expirationTime) {
            console.log('JWT token has expired');
            return res.sendStatus(403); 
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log('JWT verification error:', err);
                return res.sendStatus(403); 
            }
            req.user = user;
            next();
        });
    } else {
        console.log('No token provided');
        return res.send({ ok: false, message: 'No token provided' });
    }
};

module.exports = authenticateSession;
