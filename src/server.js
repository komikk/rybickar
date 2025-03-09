const express = require('express');
const { checkUrls } = require('./checker');
const routes = require('./routes');
const { port, checkTime } = require('./config');
const { logMessage } = require('./logger');
const { sendEmail } = require('./mailer');

const mail = {
    subject: `Rybickar`,
    text: 'Server nastartoval. Udice nahodene'
};

const app = express();

app.use('/', routes);

setInterval(checkUrls, checkTime);

app.listen(port, () => {
    logMessage('info', `Server is running on http://localhost:${port}`);
    sendEmail(mail.subject, mail.text)
});