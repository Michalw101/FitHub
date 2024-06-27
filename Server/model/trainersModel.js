const pool = require('../DB.js');
const nodemailer = require('nodemailer');
require('dotenv').config();
const crypto = require('crypto');

async function getAllTrainers() {
    try {
        const sql = `SELECT * FROM trainers NATURAL JOIN users where trainers.trainer_id = users.user_id`;
        const result = await pool.query(sql);

        console.log(result);

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

async function createTrainer(body) {
    try {
        console.log('Model received data:', body);
        const { user_id, first_name, last_name, email, phone, birth_date, gender, degree_link, specialization, experience,
            instegram_link, facebook_link, twitter_link } = body;

        const formattedBirthDate = new Date(birth_date).toISOString().split('T')[0];

        const userInsertQuery = `INSERT INTO users (user_id, first_name, last_name, email, phone, birth_date, gender, role_id) VALUES (?,?,?,?,?,?,?,?)`;
        await pool.query(userInsertQuery, [user_id, first_name, last_name, email, phone, formattedBirthDate, gender, 2]);

        const trainerInsertQuery = `INSERT INTO trainers (trainer_id, degree_link, specialization, experience, instegram_link, facebook_link, twitter_link) VALUES (?,?,?,?,?,?,?)`;
        await pool.query(trainerInsertQuery, [user_id, degree_link, specialization, experience, instegram_link, facebook_link, twitter_link]);

        const password = generateRandomPassword(8);
        const salt = crypto.randomBytes(16).toString('hex');
        const saltedPassword = password + salt;
        const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');

        const passwordInsertQuery = `INSERT INTO passwords (user_id, user_password, salt) VALUES (?, ?, ?)`;
        await pool.query(passwordInsertQuery, [user_id, hashedPassword, salt]);

        const currentUser = body;
        sendEmailToUser(currentUser, password);

        console.log("User created successfully");
        return { user: currentUser, ok: true };

    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

const generateRandomPassword = (length) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
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

const sendEmailToUser = (user, password) => {
    const mailOptions = {
        from: SENDER_EMAIL,
        to: user.email,
        subject: `Congratulations ${user.first_name} 😍`,
        text: `Dear ${user.first_name} ${user.last_name},

           I hope you're doing well.

           I'm excited to let you know that we'd love to have you join our team at FITHUB. Your skills and passion for fitness really stood out to us, and we think you'll be a great fit.

           Here is your password: 

           ${password} 
           
           Feel free to change it after your first login.

           I've attached the job offer with all the details about the role, responsibilities, and pay. Please take a look and let us know if you're in.

            If you have any questions or need more info, feel free to reach out. We're looking forward to having you with us!
            
            FitHub Teams`
    };
    sendMail(transporter, mailOptions);
}


async function updateTrainer(body, id) {
    try {
        const user_id = id; 
        const { firstName, lastName, email, phone, specialization, experience, twitterLink, facebookLink, instegramLink } = body;

        const userSql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE user_id = ?`;
        await pool.query(userSql, [firstName, lastName, email, phone, user_id]);
        
        const trainerSql = `UPDATE trainers SET specialization = ?, experience = ?, twitter_link = ?, facebook_link = ?, instegram_link = ? WHERE trainer_id = ?`;
        await pool.query(trainerSql, [specialization, experience, twitterLink, facebookLink, instegramLink, user_id]);

        return { success: true, message: "Trainer updated successfully", userDetails: { ...body, user_id: user_id } };

    } catch (error) {
        console.error("Error updating trainer:", error);
        throw error;
    }
};

module.exports = { createTrainer, getAllTrainers, updateTrainer }