const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

// get subjects from db
router.get('/', (req, res) => {
    Subject.find()
        .sort({ createdAt: 1 })
        .then(subject => res.json(subject))
});

// add a new subject to database
router.post('/', (req, res) => {
	const newSubject = new Subject({
		title: req.body.title,
		sections: req.body.sections
    });
    newSubject.save().then(subject => res.json(subject));
});

// delete subject route
router.delete('/:id', (req, res) => {
    Subject.findOneAndRemove({ id: req.params.id },  function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Subject Deleted!'});
    });
});

module.exports = router;