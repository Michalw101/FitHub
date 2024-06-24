const authenticateSession = require('./authenticateSession'); 

const authorizeTrainer = (req, res, next) => {
    authenticateSession(req, res, () => {
        const user = req.user; 
        if (user && (user.role_id === 1 || user.role_id === 2) ) {
            next(); 
        } else {
            console.log('user try to add a class')
            res.status(403).send({ ok: false , massage: 'A trainee tried to add a class'}); 
        }
    });
};

module.exports = authorizeTrainer;
