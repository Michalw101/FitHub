const pool = require('../DB.js');


async function createNotification(body) {
    try {
        const { users, massege } = body;
        const sql = `insert into notifications( user_id, note)
        values(?,?);`;

        for (let userId of users)
            await pool.query(sql, [userId, message]);


        return { success: true, message: "notes successful", notes: body };



    } catch (err) {
        console.error("Error:", err);
        throw err
    }
}

module.exports = { createNotification }