const pool = require('../DB.js');

async function getWaitingTrainees(query) {
    try {
        const sql = `SELECT * FROM trainees_waiting_list join users where ?  and users.user_id = trainees_waiting_list.trainee_id`;
        const result = await pool.query(sql, query);

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

async function updateTrainee(body, id) {
    try {
        const user_id = id;
        const { firstName, lastName, email, phone, heart_disease, chest_pain_at_rest, chest_pain_daily_activity, chest_pain_exercise,
            dizziness_balance_loss, fainting, asthma_medication, asthma_symptoms, family_heart_disease, family_sudden_death,
            exercise_supervision, chronic_disease, pregnancy_risk } = body;

        const userSql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE user_id = ?`;
        await pool.query(userSql, [firstName, lastName, email, phone, user_id]);

        const getInfoIdSql = 'select information_id from trainees where trainee_id =?';
        const infoIdResult = await pool.query(getInfoIdSql, user_id);
        const info_id = infoIdResult.information_id;

        const infoSql = `update information set heart_disease=?, chest_pain_at_rest=?, chest_pain_daily_activity=?, chest_pain_exercise=?,
            dizziness_balance_loss=?, fainting=?, asthma_medication=?, asthma_symptoms=?, family_heart_disease=?, family_sudden_death=?, 
            exercise_supervision=?, chronic_disease=?, pregnancy_risk=? where information_id =?`;
        await pool.query(infoSql, [heart_disease, chest_pain_at_rest, chest_pain_daily_activity, chest_pain_exercise,
            dizziness_balance_loss, fainting, asthma_medication, asthma_symptoms, family_heart_disease, family_sudden_death,
            exercise_supervision, chronic_disease, pregnancy_risk, info_id]);

        return { success: true, message: "Trainer updated successfully", trainee: body };

    } catch (error) {
        console.error("Error updating trainer:", error);
        throw error;
    }
};

module.exports = { getApprovedTrainees, getWaitingTrainees, addApprovedTrainees, deleteWaitingTrainees, updateTrainee }