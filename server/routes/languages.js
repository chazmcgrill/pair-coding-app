const express = require('express');
const router = express.Router();
const Languages = require('../models/languages');

router.get('/', (req, res) => {
    Languages.find().then(data => res.json(data));
});

router.post('/', (req, res) => {
    const { label, icon } = req.body;
    const newLanguage = new Languages({
        label,
        icon,
    });
    newLanguage.save().then(subject => res.json(subject));
});

module.exports = router;