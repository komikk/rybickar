const https = require('https');
const { sendEmail } = require('./mailer');
const { logMessage, logAvailableSlot } = require('./logger');
const { urlsToCheck, flagTimeout } = require('./config');

let flaggedUrls = new Set();

function getName(index) {
    return index === 0 ? 'Samuel' : 'Matej';
}

const mail = {
    subject: `Volný termín na náhradu pre `,
    text: 'Objavil sa nový termín na náhradu plávania'
};

function checkUrls() {
    logMessage('info', `Checking URLs`);
    urlsToCheck.forEach((url, index) => {
        if (!flaggedUrls.has(index)) {
            logMessage('info', `${getName(index)} does not have an available slot`);
            https.get(url, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    if (data.includes("Rezervova")) {
                        logAvailableSlot(`${getName(index)} has an available slot!`);
                        sendEmail(mail.subject + getName(index), mail.text);

                        flaggedUrls.add(index);
                        setTimeout(() => {
                            flaggedUrls.delete(index);
                            logMessage('info', `Check for ${getName(index)} was restored after ${flagTimeout} ms`);
                        }, flagTimeout);
                    }
                });
            }).on("error", (error) => {
                logMessage('error', `Error fetching URL ${url}: ${error}`);
            });
        } else {
            logMessage('info', `Check for ${getName(index)} is suspended.`);
        }
    });
}

module.exports = { checkUrls };
