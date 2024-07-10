const model = require('../model/newTrainersModel');
const userModel = require('../model/usersModel')
const nodemailer = require('nodemailer');
require('dotenv').config();

const { SENDER_EMAIL, APP_PASSWORD } = process.env;

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

async function getAllNewTrainers() {
    try {
        return model.getAllNewTrainers();
    }
    catch (err) {
        throw err;
    }
}

async function deleteTrainer(id, sendMail) {
    try {
        const userResult = await model.getWaitingTrainer(id);
        const  {trainer}  = userResult;
        const result = await model.deleteTrainer(id);
        console.log('userResult', userResult);
        console.log('user', trainer);
        console.log('result', result);


        if (sendMail && trainer) {
            sendEmailToUser(trainer);
        }

        return result;
    } catch (err) {
        throw err;
    }
}

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error(error);
    }
}

const sendEmailToUser = (user) => {
    const mailOptions = {
        from: SENDER_EMAIL,
        to: user.email,
        subject: `Hi ${user.first_name} 🤗`,
        text: `Sorry but you didn't receive the Trainer job... See you again! FitHub`
    }
    sendMail(transporter, mailOptions);
}

module.exports = { getAllNewTrainers, deleteTrainer };
