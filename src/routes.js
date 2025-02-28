const express = require('express');
const { logs, errors, availableSlots } = require('./logger');

const router = express.Router();

router.get('/logs', (req, res) => {
    res.json({ logs });
});

router.get('/errors', (req, res) => {
    res.json({ errors });
});

router.get('/available-slots', (req, res) => {
    res.json({ availableSlots });
});

module.exports = router;
