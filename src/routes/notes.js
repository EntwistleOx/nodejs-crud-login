const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    res.send('Notes ok');
});

module.exports = router;