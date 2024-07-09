const authenticateSession = require('./authenticateSession');

const authorizeAdmin = (req, res, next) => {
    console.log('in authorizeAdmin');

    authenticateSession(req, res, () => {
        const user = req.user;
        console.log('admin user', user);

        if (user && user.role_id === 1) {
            next();
        } else {
            res.status(403).send({
                ok: false,
                message: `User ${user.user_id} with role ${user.role_id} tried to perform actions without permissions in an Admin page.`,
                res: "You don't have the permission. What are you doing here 😈"
            });
        }
    });
};

module.exports = authorizeAdmin;
