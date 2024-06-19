const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const credentials = require('./credentials.json'); // Replace with your credentials path
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const express = require("express");
const router = express.Router();
const controller = require('../controllers/classesController');



router.get("/", async (req, res) => {
    try {
        res.send(await controller.getAllClasses());
    } catch (err) {
        res.status(404).send({ ok: false });
    }
});

router.post('/', async (req, res) => {
    // Initialize the OAuth2 client
    const auth = new OAuth2Client(credentials.client_id, credentials.client_secret, credentials.redirect_uris);

    // Function to create a Google Meet link
    async function createGoogleMeetLink() {
        try {
            // Set up the OAuth2 client
            const tokens = {
                access_token: '946178a58173d6d84842080c2c8eb0f72baecee5',
                refresh_token: '175267d38cce9957bc61e2cf13d6106efdea4b057e7ebb319148780bfaf4d3fdd2aa30abe0224eff7fb894761e9ea9dd6e1482aafb3e82fddbe9dad4bd8bf831',
                scope: 'https://www.googleapis.com/auth/calendar',
                token_type: 'Bearer',
                expiry_date: '11/11/2050',
            };
            auth.setCredentials(tokens);

            // Create a new event with a Google Meet link
            const calendar = google.calendar({ version: 'v3', auth });
            const event = {
                summary: 'Meeting with Google Meet Link',
                start: {
                    dateTime: '2024-06-19T10:00:00', // Adjust as needed
                    timeZone: 'Asia/Jerusalem',
                },
                end: {
                    dateTime: '2024-06-19T11:00:00', // Adjust as needed
                    timeZone: 'Asia/Jerusalem',
                },
                conferenceData: {
                    createRequest: {
                        requestId: 'random_id',
                        conferenceSolutionKey: {
                            type: 'hangoutsMeet',
                        },
                    },
                },
            };

            const calendarResponse = await calendar.events.insert({
                calendarId: 'primary', // Replace with your calendar ID
                resource: event,
                conferenceDataVersion: 1,
            });

            const htmlLink = calendarResponse.data.htmlLink;
            const meetLink = htmlLink.replace('/calendar/event?', '/calendar/meet?');
            console.log('Google Meet Link:', meetLink);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    }

    // Call the function to create the Google Meet link
    createGoogleMeetLink();
})


module.exports = router;
