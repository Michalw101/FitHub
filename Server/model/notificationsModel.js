const pool = require('../DB.js');


async function createNotification(body) {
    try {
        const { users, message } = body;
        const sql = `insert into notifications( user_id, note) values(?,?);`;

        for (let userId of users)
            await pool.query(sql, [userId, message]);
        return { success: true, message: "notes successful", notes: body };

    } catch (err) {
        console.error("Error:", err);
        throw err
    }
}

async function getNotifications(query) {
    try {
        const sql = `select note from notifications where ?`;
        const result = await pool.query(sql, query)
        if (result[0].length > 0)
            return { success: true, message: "notes successful", notifications: result[0] };
        else
            return { success: true, message: "no notes found" };
        
    } catch (err) {
        console.error("Error:", err);
        throw err
    }
}

module.exports = { createNotification, getNotifications }