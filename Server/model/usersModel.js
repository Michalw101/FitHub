const pool = require('../DB.js');

async function getUser(id) {
    try {
        const roleSql = `SELECT * FROM users where user_id =?`
        const roleResult = await pool.query(roleSql, id);
        let fullUserSql;
        let fullUserResult;

        if (roleResult[0].length === 0) {
            return { success: true, message: "User not found", user: null };
        }

        if (!roleResult[0][0].role_id) {
            const setRole = `UPDATE users SET role_id = ? where user_id =?`
            await pool.query(setRole, [3, id]);
        }
        switch (roleResult[0][0].role_id) {
            case 1:
                fullUserResult = roleResult;
                break;
            case 2:
                fullUserSql = `SELECT * FROM users NATURAL JOIN trainers where users.user_id = trainers.trainer_id and users.user_id = ?`
                fullUserResult = await pool.query(fullUserSql, id);
                break;
            case 3:
                fullUserSql = `SELECT * FROM users NATURAL JOIN trainees NATURAL JOIN information where users.user_id = trainees.trainee_id and trainees.information_id = information.information_id and users.user_id = ? ;`
                fullUserResult = await pool.query(fullUserSql, id);
                break;
        }
        const user = fullUserResult[0][0];
        return { success: true, message: "Successful", user: user };

    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

async function getEmailById(id) {
    try {
        const userSql = `SELECT email FROM users WHERE user_id = ?`;
        const result = await pool.query(userSql, [id]);
        if (result[0].length === 0) {
            return { success: true, message: "Incorect ID"};
        }
        return { success: true, message: "Successful", email: result[0][0].email };
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}


async function getUserByEmail(email) {
    try {
        const userSql = `SELECT * FROM users WHERE email = ?`;
        const result = await pool.query(userSql, [email]);
        if (result[0].length === 0) {
            return { success: true, message: "Incorrect email"};
        }
        return { success: true, message: "Successful", user: result[0][0] };
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

async function updatePassword(body, id) {
    try {
        const { password, salt, user } = body;
        const updatePasswordSql = `UPDATE passwords SET user_password = ?, salt = ? WHERE user_id = ?`;
        await pool.query(updatePasswordSql, [password, salt, id]);

        return { success: true, message: "Password updated successfully" };
    } catch (err) {
        console.error("Error:", err);
        return { success: false, message: "An error occurred", error: err };
    }
}

module.exports = { getUser,getEmailById, updatePassword, getUserByEmail }
