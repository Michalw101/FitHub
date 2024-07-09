const model = require('../model/usersModel');
const crypto = require('crypto');
const e = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function getUser(id) {
    try {
        return model.getUser(id);
    } catch (err) {
        throw err;
    }
};

async function getEmailById(id) {
    try {
        return model.getEmailById(id);
    } catch (err) {
        throw err;
    }
};


async function updatePassword(body, id) {
    try {
        console.log('controller id', id);
        const { password } = body;
        const salt = crypto.randomBytes(16).toString('hex');

        const saltedPassword = password + salt;
        const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');
        return model.updatePassword({ ...body, password: hashedPassword, salt: salt }, id);
    } catch (err) {
        throw err;
    }
};

async function forgotPassword(body) {
    try {
        const result = await model.getUserByEmail(body.email);
        const user= result.user;
        console.log('user', user);

        if (!user) {
            return { success: false, message: "User not found" };
        }
        const newPassword = generateRandomPassword(8);
        const salt = crypto.randomBytes(16).toString('hex');
        const saltedPassword = newPassword + salt;
        const hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');

        await model.updatePassword({ password: hashedPassword, salt: salt }, user.user_id);
        await sendEmailToUser(user, newPassword);

        return { success: true, message: "Password reset successfully, new password sent to email" };
    } catch (err) {
        throw err;
    }
};

const generateRandomPassword = (length) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}

const sendEmailToUser = async (user, password) => {
    console.log('user', user);

    const { SENDER_EMAIL, APP_PASSWORD } = process.env;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SENDER_EMAIL,
            pass: APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: SENDER_EMAIL,
        to: user.email,
        subject: `Password Reset`,
        text: `Hello ${user.first_name},

Your password has been reset. Your new password is: ${password}

Please change it after logging in.

FitHub Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to user');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { getUser, getEmailById, updatePassword, forgotPassword }
