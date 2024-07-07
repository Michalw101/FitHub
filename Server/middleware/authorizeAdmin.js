const authenticateSession = require('./authenticateSession'); 

const authorizeAdmin = (req, res, next) => {
    console.log('in authorizeAdmin');
    authenticateSession(req, res, () => {
        const user = req.user; 
        console.log('admin user', user)
        if (user && user.role_id === 1) {
            next(); 
        } else {
            res.status(403).send({ ok: false , massage: `user ${user.user_id} role ${user.role_id} tried to do actions without permissions`, res: "You dont have the permission what are you doing here 😈"}); 
        }
    });
};

module.exports = authorizeAdmin;
