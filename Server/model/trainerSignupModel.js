const pool = require('../DB.js');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function postSignup(body) {

    try {
        const { first_name, last_name, email, phone, birth_date, gender, degree_link, experience, last_work_place,
            instegram_link, facebook_link, twitter_link } = body;

        const userInsertQuery = `INSERT INTO trainers_waiting_list (first_name, last_name, email, phone, birth_date, gender, 
             degree_link, experience, last_work_place, instegram_link, facebook_link, twitter_link) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
        await pool.query(userInsertQuery, [first_name, last_name, email, phone, birth_date, gender, degree_link,
            experience, last_work_place, instegram_link, facebook_link, twitter_link]);


        const getLastInsertIdQuery = `SELECT LAST_INSERT_ID() as lastInsertId`;
        const lastInsertIdResult = await pool.query(getLastInsertIdQuery);
        const lastInsertId = lastInsertIdResult[0][0].lastInsertId;

        const getUserQuery = `SELECT * FROM trainers_waiting_list WHERE user_id = ?`;
        const userResult = await pool.query(getUserQuery, [lastInsertId]);
        const currentUser = userResult[0][0];

        // send mail
        sendEmailToAdmin(currentUser);
        sendEmailToUser(currentUser);

        console.log("User created successfully");
        return { user: currentUser, ok: true };

    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

const { SENDER_EMAIL, ADMIN_1_EMAIL, ADMIN_2_EMAIL, APP_PASSWORD } = process.env

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
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: SENDER_EMAIL,//env
        pass: APP_PASSWORD,//env
    },
});

const sendEmailToAdmin = (user) => {


    const mailOptions = {
        from: SENDER_EMAIL, // sender address
        to: [SENDER_EMAIL, ADMIN_1_EMAIL, ADMIN_2_EMAIL], // list of receivers
        subject: `New trainer registration (${user.email})`, // Subject line
        text: `trainer name: ${user.first_name} ${user.last_name}
                url: ${user.degree_link}`, // plain text body
        // html: "<b>Hello world?</b>", // html body

    }
    sendMail(transporter, mailOptions)

}
const sendEmailToUser = (user) => {
    const mailOptions = {
        from: SENDER_EMAIL, // sender address
        to: user.email, // list of receivers
        subject: `Thank you for your registration ${user.first_name} 🤗`, // Subject line
        text: `We have received your request to apply as a trainer in our application, we are handling your request and will answer you as soon as possible! Thank you! FitHub`
    }
    sendMail(transporter, mailOptions)
}



module.exports = { postSignup }  
