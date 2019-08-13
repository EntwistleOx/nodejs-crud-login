const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/create', isAuthenticated, (req, res) => {
    res.render('notes/create');
});

router.post('/notes/store', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Please write a title'});
    }
    if(!description) {
        errors.push({text: 'Please write a description'});
    }

    if(errors.length > 0) {
        res.render('notes/create', {
            errors,
            title,
            description
        });
    }else {
        const newNote = new Note({title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('successMsg', 'Note Added Successfully!');
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
    res.render('notes/index', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit', {note});
});

router.patch('/notes/update/:id', isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('successMsg', 'Note Updated Successfully!');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('successMsg', 'Note Deleted Successfully!');
    res.redirect('/notes');
});

module.exports = router;