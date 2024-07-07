const authenticateSession = require('./authenticateSession');

const currentUser = (req, res, next) => {
    console.log('current user middleware');
    authenticateSession(req, res, () => {
        const user = req.user;
        if (user) {
            res.status(200).send({ ok: true, user: user }); 
        } else {
            console.log('no current user');
            res.status(403).send({ ok: false, message: 'No current user' });
        }
    });
};

module.exports = currentUser;
