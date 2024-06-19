const pool = require('../DB.js');


async function getAllClasses() {
    try {
        const sql = `SELECT * FROM classes NATURAL JOIN trainers JOIN users where user_id = trainer_id`;
        const result = await pool.query(sql);
        
        console.log('result class',result[0]);

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

async function createClass(body) {
    const {trainer_id, date, hour, description, price, link}= body;
    try {
        const sql = `insert into classes(trainer_id, date, hour, description, price, link)
        values(?,?,?,?,?,?)`;
        const result = await pool.query(sql, [trainer_id, date, hour, description, price, link]);
        
        console.log('result class',result[0][0]);

        if (result.length > 0) {
            return { success: true, message: "Classes successful", class: result[0][0] };
        }
        else {
            console.log("error creating class");
            return { success: false, message: "error creating class" };
        }
    } catch (err) {
        console.error("Error:", err);
        return { success: false, message: "An error occurred" };
    }

    
};

async function deleteClass(id) {
    
};

async function updateClass(body) {
    
};

module.exports = { createClass, updateClass, getAllClasses, deleteClass, getClass}