const pool = require('../DB.js');
const crypto = require('crypto');

async function getAllTrainers() {
    try {
        const sql = `SELECT * FROM trainers NATURAL JOIN users WHERE trainers.trainer_id = users.user_id`;
        const [result] = await pool.query(sql);

        if (result.length > 0) {
            return { success: true, message: "Trainers fetched successfully", trainers: result };
        } else {
            console.log("Trainers not found");
            throw new Error("Trainers not found");
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message);
    }
}

async function createTrainer(body, hashedPassword, salt) {
    try {
        console.log('Model received data:', body);
        const { user_id, first_name, last_name, email, phone, birth_date, gender, degree_link, specialization, experience, instegram_link, facebook_link, twitter_link } = body;

        const formattedBirthDate = new Date(birth_date).toISOString().split('T')[0];

        const userInsertQuery = `INSERT INTO users (user_id, first_name, last_name, email, phone, birth_date, gender, role_id) VALUES (?,?,?,?,?,?,?,?)`;
        await pool.query(userInsertQuery, [user_id, first_name, last_name, email, phone, formattedBirthDate, gender, 2]);

        const trainerInsertQuery = `INSERT INTO trainers (trainer_id, degree_link, specialization, experience, instegram_link, facebook_link, twitter_link) VALUES (?,?,?,?,?,?,?)`;
        await pool.query(trainerInsertQuery, [user_id, degree_link, specialization, experience, instegram_link, facebook_link, twitter_link]);

        const passwordInsertQuery = `INSERT INTO passwords (user_id, user_password, salt) VALUES (?, ?, ?)`;
        await pool.query(passwordInsertQuery, [user_id, hashedPassword, salt]);

        return { user: body, ok: true };

    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

async function postSignup(body) {
    try {
        const { user_id, first_name, last_name, email, phone, birth_date, gender, degree_link, experience, last_work_place, specialization, diploma, instegram_link, facebook_link, twitter_link } = body;

        const userInsertQuery = `INSERT INTO trainers_waiting_list (user_id, first_name, last_name, email, phone, birth_date, gender, degree_link, experience, specialization, last_work_place, place_of_study, instegram_link, facebook_link, twitter_link) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        await pool.query(userInsertQuery, [user_id, first_name, last_name, email, phone, birth_date, gender, degree_link, experience, specialization, last_work_place, diploma, instegram_link, facebook_link, twitter_link]);

        return { user: body, ok: true };

    } catch (error) {
        console.log("Error creating user:", error);
        throw error;
    }
}

async function updateTrainer(body, id) {
    try {
        const user_id = id;
        const { first_name, last_name, email, phone, specialization, experience, twitter_link, facebook_link, instegram_link } = body;

        const userSql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE user_id = ?`;
        await pool.query(userSql, [first_name, last_name, email, phone, user_id]);

        const trainerSql = `UPDATE trainers SET specialization = ?, experience = ?, twitter_link = ?, facebook_link = ?, instegram_link = ? WHERE trainer_id = ?`;
        await pool.query(trainerSql, [specialization, experience, twitter_link, facebook_link, instegram_link, user_id]);

        return { success: true, message: "Trainer updated successfully", trainer: body };

    } catch (error) {
        console.error("Error updating trainer:", error);
        throw error;
    }
}

async function deleteTrainer(id) {
    try {
        const traineesInClassSql = `DELETE tic FROM trainees_in_class tic
                                    JOIN classes c ON tic.class_id = c.class_id
                                    WHERE c.trainer_id = ?`;
        await pool.query(traineesInClassSql, id);

        const traineesWaitingSql = `DELETE twl FROM trainees_waiting_list twl
                                    JOIN classes c ON twl.class_id = c.class_id
                                    WHERE c.trainer_id = ?`;
        await pool.query(traineesWaitingSql, id);

        const classesSql = `DELETE FROM classes
                            WHERE trainer_id = ?`;
        await pool.query(classesSql, id);

        const limitsInClassesSql = `DELETE FROM limits_in_class
                                    WHERE trainer_id = ?`;
        await pool.query(limitsInClassesSql, id);

        const trainerSql = `DELETE FROM trainers
                            WHERE trainer_id = ?`;
        await pool.query(trainerSql, id);

        const userSql = `DELETE FROM users
                           WHERE user_id = ?`;
        await pool.query(userSql, id);

        return { success: true, message: "Trainer delete successfully" };

    } catch (error) {
        console.error("Error delete trainer:", error);
        throw error;
    }
}

module.exports = { createTrainer, postSignup, deleteTrainer, getAllTrainers, updateTrainer };
