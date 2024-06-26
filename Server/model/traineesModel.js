const pool = require('../DB.js');

async function getWaitingTrainees(query) {
    try {
        const sql = `SELECT * FROM trainees_waiting_list join users where ?  and users.user_id = trainees_waiting_list.trainee_id`;
        const result = await pool.query(sql, query);

        console.log(result[0]);

        if (result.length > 0) {
            return { success: true, message: "trainees successful", trainees: result[0] };
        }
        else {
            console.log("trainees not found");
            throw new Error("trainees not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message, err)
    }
};

async function getApprovedTrainees(query) {
    try {
        const sql = `SELECT * FROM trainees_in_class join users where ?  and users.user_id = trainees_in_class.trainee_id`;
        const result = await pool.query(sql, query);
        console.log(result[0]);


        if (result.length > 0) {
            return { success: true, message: "trainees successful", trainees: result[0] };
        }
        else {
            console.log("trainees not found");
            throw new Error("trainees not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message, err)
    }
};

async function addApprovedTrainees(body) {
    try {
        const { trainee_id, class_id } = body;
        const sql = `insert into trainees_in_class(trainee_id, class_id) values (?, ?) `;
        await pool.query(sql, [trainee_id, class_id]);
        return { success: true, message: "trainees successful", trainees: body };

    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message, err)
    }
};


async function deleteWaitingTrainees(query) {
    try {
        const { trainee_id, class_id } = query;
        const sql = `delete from trainees_waiting_list where trainee_id = ? and class_id = ?`;
        await pool.query(sql, [trainee_id, class_id]);
        return { success: true, message: "trainees successful" };
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message, err);
    }
}

module.exports = { getApprovedTrainees, getWaitingTrainees, addApprovedTrainees, deleteWaitingTrainees }