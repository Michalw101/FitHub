const authenticateSession = require('./authenticateSession');

const currentUser = (req, res, next) => {
    console.log('current user middleware');
    console.log(req);
    console.log('go to session');
    authenticateSession(req, res, () => {
        const user = req.user;
        if (user) {
            next();
        } else {
            console.log('no current user')
            res.status(403).send({ ok: false, massage: 'A trainee tried to delete a new trainer' });
        }
    });
};

module.exports = currentUser;
