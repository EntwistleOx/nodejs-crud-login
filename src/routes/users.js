const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.send('SignIn ok');
});

router.get('/users/signup', (req, res) => {
    res.send('SignUp ok');
});

module.exports = router;