const pool = require('../DB.js');


async function putSignup(body) {

    try {
        const { user_id, first_name, last_name, email, phone, birth_date, gender, heart_disease, chest_pain_at_rest, chest_pain_daily_activity,
            chest_pain_exercise, dizziness_balance_loss, fainting, asthma_medication, asthma_symptoms, family_heart_disease, family_sudden_death,
            exercise_supervision, chronic_disease, pregnancy_risk } = body;

        const userSql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, birth_date = ?,gender = ?, role_id =3  WHERE user_id = ?`;
        await pool.query(userSql, [first_name, last_name, email, phone, birth_date, gender, user_id]);

        const infoSql = `insert into information (heart_disease, chest_pain_at_rest, chest_pain_daily_activity, chest_pain_exercise, dizziness_balance_loss,
                fainting, asthma_medication, asthma_symptoms, family_heart_disease, family_sudden_death, exercise_supervision, chronic_disease,
                pregnancy_risk) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        const [infoResult] = await pool.query(infoSql, [heart_disease, chest_pain_at_rest, chest_pain_daily_activity, chest_pain_exercise,
            dizziness_balance_loss, fainting, asthma_medication, asthma_symptoms, family_heart_disease, family_sudden_death,
            exercise_supervision, chronic_disease, pregnancy_risk]);

        const lastInsertedId = infoResult.insertId;

        const traineeInsertQuery = `INSERT INTO trainees (trainee_id, information_id) VALUES (?, ?)`;
        await pool.query(traineeInsertQuery, [user_id, lastInsertedId]);

        const getUserQuery = `SELECT * FROM users WHERE user_id = ?`;
        const userResult = await pool.query(getUserQuery, user_id);
        const currentUser = userResult[0][0];

        console.log("User created successfully");
        return { user: currentUser, success: true };

    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}


async function postSignup(body) {

    try {
        const { user_id, password, salt } = body;

        const idSql = `SELECT * FROM users WHERE user_id = ?`;
        const result = await pool.query(idSql, user_id);
        console.log(result[0][0]);

        if (result[0][0]) {
            console.log("User already exist");
            throw new Error("User already exist");
        }


        const userInsertQuery = `INSERT INTO users (user_id) VALUES (?)`;
        await pool.query(userInsertQuery, user_id);

        const passwordInsertQuery = `INSERT INTO passwords (user_id, user_password, salt) VALUES (?, ?, ?)`;
        await pool.query(passwordInsertQuery, [user_id, password, salt]);

        console.log("User created successfully");
        return { user: body, success: true };

    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}


module.exports = { postSignup, putSignup }  
