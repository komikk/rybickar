let logs = [];
let errors = [];
let availableSlots = [];

function logMessage(type, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}`;

    logs.push(logEntry);
    if (logs.length > 100) logs.shift();

    if (type === 'error') {
        errors.push(logEntry);
        if (errors.length > 50) errors.shift();
    }

    if (type === 'error') console.error(logEntry);
    else console.info(logEntry);
}

function logAvailableSlot(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [AVAILABLE SLOT] ${message}`;

    availableSlots.push(logEntry);
    if (availableSlots.length > 100) availableSlots.shift();

    console.info(logEntry);
}

module.exports = { logMessage, logAvailableSlot, logs, errors, availableSlots };
