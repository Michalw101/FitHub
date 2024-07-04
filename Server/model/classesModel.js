const pool = require('../DB.js');


async function getAllClasses() {
    try {
        const sql = `SELECT * FROM classes NATURAL JOIN limits_in_class NATURAL JOIN trainers JOIN users where user_id = trainer_id`;
        const result = await pool.query(sql);

        if (result.length > 0) {
            return { success: true, message: "Classes successful", classes: result[0] };
        }
        else {
            console.log("Classes not found");
            throw new Error("Classes not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message)
    }
};

async function getClassesByQuery(query) {
    console.log(query);
    try {
        let user_id;
        if (typeof query === 'object' && query.user_id) {
            user_id = query.user_id;
        } else {
            throw new Error('Invalid query format. Expected { user_id: ... }');
        }
        const sql = `SELECT
    c.class_id,
    c.trainer_id,
    c.date,
    c.hour,
    c.description,
    c.price,
    c.link,
    c.class_type,
    u.first_name AS trainer_first_name,
    u.last_name AS trainer_last_name,
    u.email AS trainer_email,
    u.phone AS trainer_phone,
    trainer.instegram_link,
    trainer.facebook_link,
    trainer.twitter_link
FROM classes c
JOIN limits_in_class l ON c.limits_id = l.limits_id
JOIN trainees t ON t.trainee_id = ?
JOIN information i ON t.information_id = i.information_id
JOIN users u ON c.trainer_id = u.user_id
JOIN trainers trainer ON c.trainer_id = trainer.trainer_id
WHERE (l.gender_limit = 'both' OR l.gender_limit = u.gender)
AND (l.heart_disease = FALSE OR i.heart_disease = FALSE)
AND (l.chest_pain = FALSE OR (i.chest_pain_at_rest = FALSE AND i.chest_pain_daily_activity = FALSE AND i.chest_pain_exercise = FALSE))
AND (l.fainted_or_dizziness = FALSE OR (i.dizziness_balance_loss = FALSE AND i.fainting = FALSE))
AND (l.asthma = FALSE OR (i.asthma_medication = FALSE AND i.asthma_symptoms = FALSE))
AND (l.family_heart_disease_or_sudden_death = FALSE OR (i.family_heart_disease = FALSE AND i.family_sudden_death = FALSE))
AND (l.exercise_supervision = FALSE OR i.exercise_supervision = FALSE)
AND (l.chronic_disease = FALSE OR i.chronic_disease = FALSE)
AND (l.pregnancy_risk = FALSE OR i.pregnancy_risk = FALSE);
`;
        const result = await pool.query(sql, user_id);

        console.log('result class', result[0]);

        if (result.length > 0) {
            return { success: true, message: "Classes successful", classes: result[0] };
        }
        else {
            console.log("Classes not found");
            throw new Error("Classes not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message)
    }
};


async function getTrainerClasses(query) {
    try {
        const sql = `SELECT * FROM classes NATURAL JOIN limits_in_class where ?`;
        const result = await pool.query(sql, query);

        if (result.length > 0) {
            return { success: true, message: "My Classes successful", classes: result[0] };
        }
        else {
            console.log("Classes not found");
            throw new Error("Classes not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message)
    }
};

async function getTraineeRegisteredClasses(query) {
    try {
        const sql =
            `SELECT
        classes.*,
            trainees_waiting_list.*,
            limits_in_class.*,
            users.first_name AS trainer_first_name,
                users.last_name AS trainer_last_name
            FROM classes
        NATURAL JOIN
        trainees_waiting_list
        NATURAL JOIN
        limits_in_class
        JOIN 
        users ON classes.trainer_id = users.user_id
        WHERE
            ?`;
        const result = await pool.query(sql, query);

        if (result.length > 0) {
            return { success: true, message: "My Classes successful", classes: result[0] };
        }
        else {
            console.log("Classes not found");
            throw new Error("Classes not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message)
    }
};

async function getTraineeApprovedClasses(query) {
    try {
        const sql = `SELECT
        classes.*,
            trainees_in_class.*,
            limits_in_class.*,
            users.first_name AS trainer_first_name,
                users.last_name AS trainer_last_name
            FROM classes
        NATURAL JOIN
        trainees_in_class
        NATURAL JOIN
        limits_in_class
        JOIN 
        users ON classes.trainer_id = users.user_id
        WHERE
            ?`;
        const result = await pool.query(sql, query);

        if (result.length > 0) {
            return { success: true, message: "My Classes successful", classes: result[0] };
        }
        else {
            console.log("Classes not found");
            throw new Error("Classes not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message)
    }
};

async function createClass(body) {
    try {
        const { trainer_id, date, hour, description, price, link, class_type, gender_limit, heart_disease, chest_pain, fainted_or_dizziness, asthma, family_heart_disease_or_sudden_death, exercise_supervision, chronic_disease, pregnancy_risk } = body;

        const limitsSql = `
            INSERT INTO limits_in_class (trainer_id, gender_limit, heart_disease, chest_pain, fainted_or_dizziness, asthma, family_heart_disease_or_sudden_death, exercise_supervision, chronic_disease, pregnancy_risk)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [limitsResult] = await pool.query(limitsSql, [trainer_id, gender_limit, heart_disease, chest_pain, fainted_or_dizziness, asthma, family_heart_disease_or_sudden_death, exercise_supervision, chronic_disease, pregnancy_risk]);

        console.log(limitsResult.insertId);

        const classSql = `
            INSERT INTO classes (trainer_id, date, hour, description, price, link, limits_id, class_type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [classResult] = await pool.query(classSql, [trainer_id, date, hour, description, price, link, limitsResult.insertId, class_type]);

        console.log(classResult.insertId);

        const sqlSelect = `
            SELECT classes.*, trainers.*, users.*, limits_in_class.*
            FROM classes
            JOIN trainers ON classes.trainer_id = trainers.trainer_id
            JOIN users ON trainers.trainer_id = users.user_id
            JOIN limits_in_class ON limits_in_class.limits_id = classes.limits_id
            WHERE classes.class_id = ?
        `;
        const [response] = await pool.query(sqlSelect, [classResult.insertId]);

        console.log(response[0]);

        if (response.length > 0) {
            return { success: true, message: "Class created successfully", class: response[0] };
        } else {
            console.log("Error creating class");
            throw new Error("Error creating class");
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message);
    }
}


async function deleteClass(id) {
    try {
        console.log('delete class model');

        const limitSql = `select limits_id from classes where class_id = ?`;
        const limitResult = await pool.query(limitSql, [id]);
        const limit_id = limitResult[0][0].limits_id;
        console.log(limit_id)
        const classSql = `DELETE FROM classes WHERE class_id = ?`;
        await pool.query(classSql, [id]);

        const classLimitsSql = `DELETE FROM limits_in_class WHERE limits_id = ?`;
        await pool.query(classLimitsSql, [limit_id]);

        const traineeSql = `DELETE FROM trainees_in_class WHERE class_id = ?`;
        await pool.query(traineeSql, [id]);

        const waitingTraineeSql = `DELETE FROM trainees_waiting_list WHERE class_id = ?`;
        await pool.query(waitingTraineeSql, [id]);

        return { success: true, message: "delete successfuly" };
    }
    catch (err) {
        console.error('Error deleting class:', err);
        throw new Error(err.message)
    }
};

async function updateClass(body, id) {
    try {
        const class_id = id;
        const { limits_id, description, price, class_type, gender_limit, heart_disease,
            chest_pain,
            fainted_or_dizziness,
            asthma,
            family_heart_disease_or_sudden_death,
            exercise_supervision,
            chronic_disease,
            pregnancy_risk } = body;

        const classSql = `UPDATE classes SET description = ?, price = ?, class_type = ?  WHERE class_id = ?`;
        await pool.query(classSql, [description, price, class_type, class_id]);

        const limitsSql = `UPDATE limits_in_class SET gender_limit = ?, heart_disease = ?, chest_pain = ?, fainted_or_dizziness = ?, asthma = ?, family_heart_disease_or_sudden_death = ?, exercise_supervision = ?, chronic_disease = ?, pregnancy_risk = ? WHERE limits_id = ?`;
        await pool.query(limitsSql, [gender_limit, heart_disease, chest_pain, fainted_or_dizziness, asthma, family_heart_disease_or_sudden_death, exercise_supervision, chronic_disease, pregnancy_risk, limits_id]);

        return { success: true, message: "Class updated successfully", myClass: { ...body, class_id: class_id } };

    } catch (error) {
        console.error("Error updating class:", error);
        throw new Error(err.message)
    }

};

module.exports = { createClass, getTraineeApprovedClasses, updateClass, getAllClasses, getClassesByQuery, getTrainerClasses, getTraineeRegisteredClasses, deleteClass }