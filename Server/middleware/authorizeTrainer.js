const authenticateSession = require('./authenticateSession'); 

const authorizeTrainer = (req, res, next) => {
    console.log('in authorizeTrainer');
    authenticateSession(req, res, () => {
        const user = req.user; 
        console.log('user', user)
        if (user && (user.role_id === 1 || user.role_id === 2) ) {
            next(); 
        } else {
            console.log('1');
            res.status(403).send({ ok: false , massage: `user ${user.user_id} role ${user.role_id} tried to do actions without permissions`, res: "You dont have the permission what are you doing here 😈"}); 
        }
    });
};

module.exports = authorizeTrainer;
