const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/notes/create', (req, res) => {
    res.render('notes/create');
});

router.post('/notes/store', async (req, res) => {
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
        await newNote.save();
        res.redirect('/notes');
    }
});

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/index', { notes });
});

router.get('/notes/edit')

module.exports = router;