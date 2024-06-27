const pool = require('../DB.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function postLogin(body) {
    try {
        const { user_id, password } = body;

        const loginSql = `SELECT * FROM passwords where user_id =?`
        const loginResult = await pool.query(loginSql, user_id);

        const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;
        console.log('JWT_SECRET:', JWT_SECRET);

        if (loginResult[0][0]) {
            if (password === loginResult[0][0].user_password) {
                console.log("passwords equal");

                const roleSql = `SELECT * FROM users where user_id =?`
                const roleResult = await pool.query(roleSql, user_id);
                let fullUserSql;
                let fullUserResult;

                if (!roleResult[0][0].role_id) {
                    const setRole = `UPDATE users SET role_id = ? where user_id =?`
                    await pool.query(setRole, [3, user_id]);
                }
                switch (roleResult[0][0].role_id) {
                    case 1:
                        fullUserResult = roleResult;
                        break;
                    case 2:
                        fullUserSql = `SELECT * FROM users NATURAL JOIN trainers where users.user_id = trainers.trainer_id and users.user_id = ?`
                        fullUserResult = await pool.query(fullUserSql, user_id);
                        break;
                    case 3:
                        fullUserSql = `SELECT * FROM users NATURAL JOIN trainees  NATURAL JOIN information where users.user_id = trainees.trainee_id and trainees.information_id=information.information_id and users.user_id=? ;`
                        fullUserResult = await pool.query(fullUserSql, user_id);
                        break;
                }

                const user = fullUserResult[0][0];
                console.log('User:', user);

                const accessToken = jwt.sign({ user_id: user.user_id, role_id: user.role_id }, JWT_SECRET, { expiresIn: '1h' });

                console.log('Generated Access Token:', accessToken);

                return { success: true, message: "Login successful", user: user, token: accessToken };


            } else {
                console.log("Incorrect password");
                throw new Error("Incorrect password");
            }

        } else {
            throw new Error("No Response From DB");
        }
    } catch (err) {
        throw err;
    }
}

async function getSalt(id) {
    try {
        console.log('salt model');
        const sql = "SELECT salt from passwords where user_id = ? "
        const result = await pool.query(sql, id);
        console.log(result[0]);

        if (result[0].length > 0) {
            return { success: true, salt: result[0][0].salt };
        }
        else {
            console.log("No Salt");
            throw new Error("No Salt");
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { postLogin, getSalt }  
