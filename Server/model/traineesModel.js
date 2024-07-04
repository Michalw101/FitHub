const pool = require('../DB.js');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function getAllTrainees() {
    try {
        const sql = `select * from trainees join users natural join information where trainees.trainee_id = users.user_id`;
        const result = await pool.query(sql);

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
        console.log("query", query);
        const sql = `SELECT * FROM trainees_in_class join users where users.user_id = trainees_in_class.trainee_id and ? `;
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


async function deleteTraineeFromClass(query) {
    try {
        const { trainee_id, class_id } = query;
        const sql = `DELETE FROM trainees_in_class WHERE trainee_id = ? AND class_id = ?`;
        await pool.query(sql, [trainee_id, class_id]);
        return { success: false, message: "Deleted successful" };
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message, err);
    }
}



async function deleteWaitingTrainees(query) {
    try {
        const {trainee_id ,  class_id} = query;
        const sql = `delete from trainees_waiting_list where trainee_id = ? and class_id = ?`;
        await pool.query(sql, [trainee_id ,  class_id]);
        return { success: true, message: "trainees successful" };
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message, err);
    }
}

async function deleteTrainee(id, sendMail) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const infoIdSql = `select information_id from trainees where trainee_id= ?`;
        const [infoIdResult] = await connection.query(infoIdSql, [id]);
        if (infoIdResult.length === 0) {
            throw new Error('Trainee not found');
        }
        const info_id = infoIdResult[0].information_id;

        const userSql = `select email, first_name from users where user_id = ?`;
        const [userResult] = await connection.query(userSql, [id]);
        if (userResult.length === 0) {
            throw new Error('User not found');
        }
        const user = userResult[0];

        const traineeInClassSql = `delete from trainees_in_class where trainee_id = ?`;
        await connection.query(traineeInClassSql, [id]);

        const traineeWaitingSql = `delete from trainees_waiting_list where trainee_id = ?`;
        await connection.query(traineeWaitingSql, [id]);

        const passSql = `delete from passwords where user_id = ?`;
        await connection.query(passSql, [id]);

        const infoSql = `delete from information where information_id = ?`;
        await connection.query(infoSql, [info_id]);

        const traineeSql = `delete from trainees where trainee_id = ?`;
        await connection.query(traineeSql, [id]);

        const deleteUserSql = `delete from users where user_id = ?`;
        await connection.query(deleteUserSql, [id]);

        await connection.commit();

        if (sendMail) sendEmailToUser(user);

        return { success: true, message: "Trainee deleted successfully" };
    } catch (err) {
        await connection.rollback();
        console.error("Error:", err);
        throw new Error(err.message);
    } finally {
        connection.release();
    }
}



const { SENDER_EMAIL, APP_PASSWORD } = process.env

const sendMail = async (transporter, mailOptions) => {

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    }
    catch (error) {
        console.error(error);
    }
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: SENDER_EMAIL,
        pass: APP_PASSWORD,
    },
});

const sendEmailToUser = (user) => {
    const mailOptions = {
        from: SENDER_EMAIL,
        to: user.email,
        subject: `Hi ${user.first_name}`,
        text: `Due to unusual behavior that does not comply with the regulations of the Fithub website, we are forced to delete your account. Your account has been deleted. FitHub`
    }
    sendMail(transporter, mailOptions)
}




async function updateTrainee(body, id) {
    try {
        const user_id = id;
        const { first_name, last_name, email, phone, heart_disease, chest_pain_at_rest, chest_pain_daily_activity, chest_pain_exercise,
            dizziness_balance_loss, fainting, asthma_medication, asthma_symptoms, family_heart_disease, family_sudden_death,
            exercise_supervision, chronic_disease, pregnancy_risk } = body;

        const userSql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE user_id = ?`;
        await pool.query(userSql, [first_name, last_name, email, phone, user_id]);

        const getInfoIdSql = 'select information_id from trainees where trainee_id =?';
        const infoIdResult = await pool.query(getInfoIdSql, user_id);
        const info_id = infoIdResult[0][0].information_id;
        console.log("info_id", info_id);

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



async function checkIfApproved(query) {
    try {

        const { user_id, class_id } = query;
        console.log('user_id', user_id);
        console.log('class_id', class_id);
        const sql = `select * from trainees_in_class where trainee_id =? and class_id =?`;
        const result = await pool.query(sql, [user_id, class_id]);
        console.log(result);
        if (result[0].length > 0)
            return { success: true, message: "trainees successful", isApproved: true };
        else
            return { success: true, message: "trainees successful", isApproved: false };

    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message, err);
    }
}



module.exports = { getAllTrainees, deleteTrainee, deleteTraineeFromClass, getApprovedTrainees, getWaitingTrainees, checkIfApproved, addApprovedTrainees, deleteWaitingTrainees, updateTrainee }