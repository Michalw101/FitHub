const model = require('../model/trainersModel');
const userModel = require('../model/usersModel')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const { SENDER_EMAIL, ADMIN_1_EMAIL, ADMIN_2_EMAIL, APP_PASSWORD } = process.env;

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

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error(error);
    }
}

const sendEmailToAdmin = (user) => {
    const mailOptions = {
        from: SENDER_EMAIL,
        to: [ADMIN_1_EMAIL, ADMIN_2_EMAIL],
        subject: `New trainer registration (${user.email})`,
        text: `New trainer wants to join your team!
        ${user.first_name} ${user.last_name} (${user.gender})
        with ${user.experience} years of experience in ${user.specialization},
        Degree link to your Google Drive: ${user.degree_link} (degree from ${user.diploma})
        Email to contact ${user.first_name} ${user.last_name}: ${user.email}
        Or by phone: ${user.phone}`
    };
    sendMail(transporter, mailOptions);
}

const sendAcceptEmailToUser = (user, password) => {
    const mailOptions = {
        from: SENDER_EMAIL,
        to: user.email,
        subject: `Congratulations ${user.first_name} 😍`,
        text: `Dear ${user.first_name} ${user.last_name},

           I hope you're doing well.

           I'm excited to let you know that we'd love to have you join our team at FitHub. Your skills and passion for fitness really stood out to us, and we think you'll be a great fit.

           Here is your password: 

           ${password} 
           
           Feel free to change it after your first login.

           If you have any questions or need more info, feel free to reach out. We're looking forward to having you with us!

           FitHub Team`
    };
    sendMail(transporter, mailOptions);
}

const sendEmailToUser = (user) => {
    const mailOptions = {
        from: SENDER_EMAIL,
        to: user.email,
        subject: `Thank you for your registration ${user.first_name} 🤗`,
        text: `Dear ${user.first_name} ${user.last_name},
        We have received your request to apply as a trainer in our application,
        we are handling your request and will answer you as soon as possible!
        Thank you!
        FitHub`
    };
    sendMail(transporter, mailOptions);
}

const generateRandomPassword = (length) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}

async function createTrainer(body) {
    try {
        console.log('Controller received data:', body);

        const password = generateRandomPassword(8);
        const salt = crypto.randomBytes(16).toString('hex');
        const saltedPassword = password + salt;
        const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');

        const result = await model.createTrainer(body, hashedPassword, salt);
        if (result.ok) {
            sendAcceptEmailToUser(result.user, password);
        }
        return result;
    } catch (err) {
        console.error("Error in createTrainer:", err);
        throw err;
    }
}

async function getAllTrainers() {
    try {
        return await model.getAllTrainers();
    } catch (err) {
        throw err;
    }
}

async function getTrainerById(id) {
    try {
        return await model.getTrainer(id);
    } catch (err) {
        throw err;
    }
}

async function updateTrainer(body, id) {
    try {
        return await model.updateTrainer(body, id);
    } catch (err) {
        throw err;
    }
}

async function deleteTrainer(id) {
    try {
        const userResult = await userModel.getUser(id);
        const result = await model.deleteTrainer(id);
        const { success } = result;
        const { user } = userResult;
        if (success && user) {
            const mailOptions = {
                from: SENDER_EMAIL,
                to: user.email,
                subject: 'Trainer Account Deletion',
                html: `
                    <h1>Hi ${user.first_name}</h1>
                    <p>We're sorry to see you go. Your trainer account has been successfully deleted.</p>
                `,
            };

            await transporter.sendMail(mailOptions);
            return result;
        }
    } catch (err) {
        throw err;
    }
}

async function postSignup(body) {
    try {
        console.log("Controller received data:", body);
        const result = await model.postSignup(body);
        if (result.ok) {
            sendEmailToAdmin(result.user);
            sendEmailToUser(result.user);
        }
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = { createTrainer, getAllTrainers, getTrainerById, updateTrainer, deleteTrainer, postSignup };
