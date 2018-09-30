const express = require('express');
const router = express.Router();

// Item Model
const Subject = require('../models/subject');

// Get request
router.get('/', (req, res) => {
    Subject.find()
        .sort({ date: -1 })
        .then(subject => res.json(subject))
});

// CREATE - Add new subject to database
router.post('/', (req, res) => {
	const newSubject = new Subject({
		title: req.body.title,
		sections: req.body.sections
    });
    newSubject.save().then(subject => res.json(subject));
});

// Delete request
router.delete('/:id', (req, res) => {
    Subject.findOneAndRemove({ id: req.params.id },  function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Subject Deleted!'});
    });
});
module.exports = router;