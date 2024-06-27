const pool = require('../DB.js');


async function getAllClasses() {
    try {
        const sql = `SELECT * FROM classes NATURAL JOIN trainers JOIN users where user_id = trainer_id`;
        const result = await pool.query(sql);

        console.log('result class', result[0]);

        if (result.length > 0) {
            return { success: true, message: "Classes successful", classes: result[0] };
        }
        else {
            console.log("Classes not found");
            return { success: false, message: "Classes not found" };
        }
    } catch (err) {
        console.error("Error:", err);
        return { success: false, message: "An error occurred" };
    }
};


async function getClass() {

};


async function getMyClasses(query) {
    try {
        const sql = `SELECT * FROM classes where ?`;
        const result = await pool.query(sql, query);

        if (result.length > 0) {
            return { success: true, message: "My Classes successful", classes: result[0] };
        }
        else {
            console.log("Classes not found");
            return { success: false, message: "Classes not found" };
        }
    } catch (err) {
        console.error("Error:", err);
        return { success: false, message: "An error occurred" };
    }
};

async function createClass(body) {

    try {
        const { trainer_id, date, hour, description, price, link } = body;
        const sqlInsert = `
            INSERT INTO classes (trainer_id, date, hour, description, price, link)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result = await pool.query(sqlInsert, [trainer_id, date, hour, description, price, link]);

        console.log(result[0].insertId);

        const sqlSelect = `
            SELECT classes.*, trainers.*, users.*
            FROM classes
            JOIN trainers ON classes.trainer_id = trainers.trainer_id
            JOIN users ON trainers.trainer_id = users.user_id
            WHERE classes.class_id = ?
        `;
        const response = await pool.query(sqlSelect, [result[0].insertId]);

        console.log(response[0][0]);

        if (response.length > 0) {
            return { success: true, message: "Class created successfully", class: response[0][0] };
        } else {
            console.log("Error creating class");
            return { success: false, message: "Error creating class" };
        }
    } catch (err) {
        console.error("Error:", err);
        return { success: false, message: "An error occurred" };
    }
}


async function deleteClass(id) {

};

async function updateClass(body, id) {
    try {
        const class_id = id;
        const { description, price } = body;
        console.log('cvbnm', description, price, class_id)
        const classSql = `UPDATE classes SET description = ?, price = ?  WHERE class_id = ?`;
        await pool.query(classSql, [description, price, class_id]);
        return { success: true, message: "Class updated successfully", myClass: { ...body, class_id: class_id } };

    } catch (error) {
        console.error("Error updating class:", error);
        throw error;
    }
};

module.exports = { createClass, updateClass, getAllClasses, getMyClasses, deleteClass, getClass }