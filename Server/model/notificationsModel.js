const pool = require('../DB.js');

async function createNotification(body) {
    try {
        const { users, message } = body;
        const now = new Date();
        const israelTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jerusalem" }));

        const localDate = israelTime.toISOString().slice(0, 10);
        const localTime = israelTime.toTimeString().slice(0, 8);

        const sql = `INSERT INTO notifications(user_id, note, is_read, date, hour) VALUES(?, ?, FALSE, ?, ?);`;

        for (let userId of users) {
            await pool.query(sql, [userId, message, localDate, localTime]);
        }

        return { success: true, message: "Notifications successful", notes: body };

    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

async function getNotifications(query) {
    try {
        const sql = `SELECT * FROM notifications WHERE user_id = ?`;
        const result = await pool.query(sql, [query]);
        if (result[0].length > 0) {
            return { success: true, message: "Notifications successful", notifications: result[0] };
        } else {
            return { success: true, message: "No notifications found" };
        }
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

async function putNotifications(user_id) {
    try {
        const sql = `UPDATE notifications SET is_read = TRUE WHERE user_id = ?`;
        await pool.query(sql, [user_id]);
        return { success: true, message: "Notifications read successful" };
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

module.exports = { createNotification, getNotifications, putNotifications };
