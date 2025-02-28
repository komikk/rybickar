module.exports = {
    port: process.env.PORT || 3000,
    checkTime: process.env.CHECK_TIME ? parseInt(process.env.CHECK_TIME) : 120000,
    flagTimeout: process.env.FLAG_TIMEOUT ? parseInt(process.env.FLAG_TIMEOUT) : 900000,
    authUser: process.env.AUTH_USER,
    authPass: process.env.AUTH_PASS,
    urlsToCheck: process.env.URLS_TO_CHECK ? process.env.URLS_TO_CHECK.split(',') : []
};
