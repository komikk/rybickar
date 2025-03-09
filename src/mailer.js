const nodemailer = require('nodemailer');
const { logMessage } = require('./logger');
const { authUser, authPass, flagTimeout } = require('./config');

const transporter = nodemailer.createTransport({
    host: 'smtp.euronet.sk',
    port: 587,
    secure: false,
    auth: {
        user: authUser,
        pass: authPass
    }
});

function sendEmail(subject, text) {
    const mailOptions = {
        from: 'majtan.juraj@hkmanin.sk',
        to: 'komikk123@gmail.com;majtan.juraj@hkmanin.sk;m.cickanova@gmail.com',
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logMessage('error', `Error sending email: ${error}`);
        } else {
            logMessage('info', `Check for ${name} was suspended. Email sent: ${info.response}`);
        }
    });
}

module.exports = { sendEmail };
