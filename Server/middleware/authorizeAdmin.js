const authenticateSession = require('./authenticateSession'); 

const authorizeAdmin = (req, res, next) => {
    console.log('Admin aothruzation שגיאת כתיב לא אכפת לי');
    authenticateSession(req, res, () => {
        const user = req.user; 
        console.log('admin user', user)
        if (user && user.role_id === 1) {
            next(); 
        } else {
            console.log('user try to delete')
            res.status(403).send({ ok: false , massage: 'A trainee tried to delete a new trainer'}); 
        }
    });
};

module.exports = authorizeAdmin;
