const authenticateSession = require('./authenticateSession'); // Ensure this path is correct

const authorizeAdmin = (req, res, next) => {
    authenticateSession(req, res, () => {
        const user = req.user; // Assuming authenticateSession sets req.user
        if (user && user.role_id === 1) {
            next(); // User is an admin, proceed to the next middleware or route handler
        } else {
            res.sendStatus(403); // Forbidden
        }
    });
};

module.exports = authorizeAdmin;
