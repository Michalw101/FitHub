const authenticateSession = require('./authenticateSession'); 

const authorizeTrainer = (req, res, next) => {
    console.log('in authorizeTrainer');
    authenticateSession(req, res, () => {
        const user = req.user; 
        if (user && (user.role_id === 1 || user.role_id === 2) ) {
            next(); 
        } else {
            res.status(403).send({ ok: false , message: `User ${user.user_id} role ${user.role_id} tried to do actions without permissions in a Trainer page.`, res: "You dont have the permission what are you doing here 😈"}); 
        }
    });
};

module.exports = authorizeTrainer;
