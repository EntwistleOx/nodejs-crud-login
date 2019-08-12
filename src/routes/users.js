const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/store', (req, res) => {
    const {name, email, password, confirm_password} = req.body;
    const errors = [];
    if(!name) {
        errors.push({text: 'Please write your email!'});
    }
    if(!email) {
        errors.push({text: 'Please write your name!'});
    }
    if(password != confirm_password) {
        errors.push({text: 'Passwords no dot match =('});
    }
    if(password.length < 4) {
        errors.push({text: 'Passwords must be at least 4 chatacters ;)'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        });
    }
    res.send('ok');
})

module.exports = router;