const model = require('../model/traineesModel');
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

async function getAllTrainees() {
    try {
        return model.getAllTrainees();
    }
    catch (err) {
        throw err;
    }
}

async function getTraineesByTrainer(id) {
    try {
        return model.getTraineesByTrainer(id);
    }
    catch (err) {
        throw err;
    }
}

async function getWaitingTrainees(query) {
    try {
        return model.getWaitingTrainees(query);
    }
    catch (err) {
        throw err;
    }
}

async function getApprovedTrainees(query) {
    try {
        return model.getApprovedTrainees(query);
    }
    catch (err) {
        throw err;
    }
};
async function addApprovedTrainees(body) {
    try {
        return model.addApprovedTrainees(body);
    } catch (err) {
        throw err;
    }
}

async function deleteTraineeFromClass(query) {
    try {
        return model.deleteTraineeFromClass(query);
    } catch (err) {
        throw err;
    }
}

async function deleteWaitingTrainees(query) {
    try {
        return model.deleteWaitingTrainees(query);
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

async function deleteTrainee(id) {
    try {
        const userResult = await userModel.getUser(id);
        const result = await model.deleteTrainee(id);
        const { success } = result;
        const { user } = userResult;
        if (success && user) {
            const mailOptions = {
                from: SENDER_EMAIL,
                to: user.email,
                subject: 'Trainee Account Deletion',
                html: `
                    <h1>Hi ${user.first_name}</h1>
                    <p>We're sorry to see you go. Your trainee account has been successfully deleted.</p>
                `,
            };

            await transporter.sendMail(mailOptions);
            return result;
        } else {
            throw new Error("Failed to delete trainee");
        }
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

async function updateTrainee(body, id) {
    try {
        return model.updateTrainee(body, id);
    }
    catch (err) {
        throw err;
    }
};

async function createWaitingTrainee(body) {
    try {
        return model.createWaitingTrainee(body);
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

module.exports = {
    getAllTrainees, getTraineesByTrainer, getWaitingTrainees, getApprovedTrainees, addApprovedTrainees,
    deleteTraineeFromClass, deleteWaitingTrainees, deleteTrainee, updateTrainee, createWaitingTrainee
};
