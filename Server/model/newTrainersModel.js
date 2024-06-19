const pool = require('../DB.js');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function getAllNewTrainers() {
    try {
        const sql = `SELECT * FROM trainers_waiting_list`;
        const result = await pool.query(sql);

        console.log(result);

        if (result.length > 0) {
            return { success: true, message: "Trainers successful", trainers: result[0] };
        }
        else {
            console.log("Trainers not found");
            return { success: false, message: "Trainers not found" };
        }
    } catch (err) {
        console.error("Error:", err);
        return { success: false, message: "An error occurred" };
    }
};

async function deleteTrainer(id, sendMail) {
    try {
        console.log('delete trainer model');
        const getSql = `SELECT * FROM trainers_waiting_list where user_id = ?`;
        const user = await pool.query(getSql, id);

        const sql = `DELETE FROM trainers_waiting_list WHERE user_id = ?`;
        await pool.query(sql, [id]);

        if (sendMail) sendEmailToUser(user[0][0]);

        return { success: true, message: "delete successfuly" };
    }
    catch (err) {
        console.error('Error deleting trainer:', err);
        return { success: false, message: "An error occurred" };
    }
};

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
        subject: `Hi ${user.first_name} 🤗`, 
        text: `Sorry but you didnt recieved the Trainer job... See you again! FitHub`
    }
    sendMail(transporter, mailOptions)
}

async function updateTrainer(body) {
   
};

module.exports = { updateTrainer, deleteTrainer, getAllNewTrainers }