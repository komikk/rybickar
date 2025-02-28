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

function sendEmail(index, name) {
    const mailOptions = {
        from: authUser,
        to: 'komikk123@gmail.com;majtan.juraj@hkmanin.sk;m.cickanova@gmail.com',
        subject: `Volný termín na náhradu pre ${name}`,
        text: 'Objavil sa nový termín na náhradu plávania'
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
