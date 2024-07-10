const pool = require('../DB.js');
require('dotenv').config();

async function getAllNewTrainers() {
    try {
        const sql = `SELECT * FROM trainers_waiting_list`;
        const result = await pool.query(sql);

        if (result.length > 0) {
            return { success: true, message: "Trainers successful", trainers: result[0] };
        }
        else {
            console.log("Trainers not found");
            throw new Error("Trainers not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message)
    }
};

async function getWaitingTrainer(id) {
    try {
        const sql = `SELECT * FROM trainers_waiting_list where user_id =?`;
        const result = await pool.query(sql, id);

        if (result.length > 0) {
            return { success: true, message: "Trainers successful", trainer: result[0][0] };
        }
        else {
            console.log("Waiting Trainer not found");
            throw new Error("Waiting Trainer not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err.message)
    }
};

async function deleteTrainer(id) {
    try {
        const getSql = `SELECT * FROM trainers_waiting_list where user_id = ?`;
        const user = await pool.query(getSql, id);

        const sql = `DELETE FROM trainers_waiting_list WHERE user_id = ?`;
        await pool.query(sql, [id]);

        return { success: true, message: "delete successfuly" };
    }
    catch (err) {
        console.error('Error deleting trainer:', err);
        throw new Error(err.message)
    }
};


module.exports = { deleteTrainer, getAllNewTrainers, getWaitingTrainer }