const pool = require('../DB.js');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function postSignup(body) {

    try {
        const { user_id, first_name, last_name, email, phone, birth_date, gender, degree_link, experience, last_work_place,
            specialization, diploma, instegram_link, facebook_link, twitter_link } = body;

        const userInsertQuery = `INSERT INTO trainers_waiting_list (user_id ,first_name, last_name, email, phone, birth_date, gender, 
             degree_link, experience, specialization, last_work_place, place_of_study, instegram_link, facebook_link, twitter_link)
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        await pool.query(userInsertQuery, [user_id, first_name, last_name, email, phone, birth_date, gender, degree_link,
            experience, specialization, last_work_place, diploma, instegram_link, facebook_link, twitter_link]);


        sendEmailToAdmin(body);
        sendEmailToUser(body);

        console.log("User created successfully");
        return { user: body, ok: true };

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
    secure: false,
    auth: {
        user: SENDER_EMAIL,
        pass: APP_PASSWORD
    }
});

const sendEmailToAdmin = (user) => {

    const mailOptions = {
        from: SENDER_EMAIL,
        to: [SENDER_EMAIL, ADMIN_1_EMAIL, ADMIN_2_EMAIL],
        subject: `New trainer registration (${user.email})`,
        text: `New trainer want to join your team!
        ${user.first_name} ${user.last_name} (${user.gender})
        with ${user.experience} years of experience of ${user.specialization},
        Degree link to your Google Drive ${user.degree_link} (degree from ${user.diploma})
        Email to connect ${user.first_name} ${user.last_name} :  ${user.email}
        Or by phone call : ${user.phone} `,

    }
    sendMail(transporter, mailOptions)

}
const sendEmailToUser = (user) => {
    const mailOptions = {
        from: SENDER_EMAIL,
        to: user.email,
        subject: `Thank you for your registration ${user.first_name} 🤗`,
        text: `We have received your request to apply as a trainer in our application, 
        we are handling your request and will answer you as soon as possible! 
        Thank you!
        FitHub.`
    }
    sendMail(transporter, mailOptions)
}



module.exports = { postSignup }  
