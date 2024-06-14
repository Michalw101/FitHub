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

                if (!roleResult[0][0].role_id) {
                    const setRole = `UPDATE users SET role_id = ? where user_id =?`
                    await pool.query(setRole, [3, user_id]);
                }


                const user = roleResult[0][0];
                console.log('User:', user);

                const accessToken = jwt.sign({ username: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

                console.log('Generated Access Token:', accessToken);

                return { success: true, message: "Login successful", user: user, token: accessToken };


            } else {
                console.log("Incorrect password");
                throw new Error("Incorrect password");
            }

        } else {
            throw new Error(err);
        }
    } catch (err) {
        throw err;
    }
}

async function getSalt(id) {
    try {
        const sql = "SELECT salt from passwords where user_id = ? "
        const result = await pool.query(sql, id);
        console.log(result[0][0]);

        if (result.length > 0) {

            return { success: true, salt: result[0][0].salt };
        }
        else {
            console.log("No Salt");
            throw new Error("No Salt");

        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err);

    }
}

module.exports = { postLogin, getSalt }  
