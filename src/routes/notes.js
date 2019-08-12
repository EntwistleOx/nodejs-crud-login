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
        req.flash('successMsg', 'Note Added Successfully!');
        res.redirect('/notes');
    }
});

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort({date: 'desc'});
    res.render('notes/index', { notes });
});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit', {note});
});

router.patch('/notes/update/:id', async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('successMsg', 'Note Updated Successfully!');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('successMsg', 'Note Deleted Successfully!');
    res.redirect('/notes');
});

module.exports = router;