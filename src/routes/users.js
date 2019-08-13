const express = require('express');
const router = express.Router();
const User = require('../models/User');
const password = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/login', password.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    successFlash: true,
    failureFlash: true
}));

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/store', async (req, res) => {
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
    }else{
        const userEmail = await User.findOne({email: email});
        if(userEmail) {
            req.flash('errorMsg','Email is already in use!');
            res.redirect('/users/signup')
        }
        const newUser = new User({
            name,
            email,
            password
        });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('successMsg', 'User Registered!');
        res.redirect('/users/signin');
    }
});



module.exports = router;