const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Index ok');
});

router.get('/about', (req, res) => {
    res.send('About ok');
});

module.exports = router;
