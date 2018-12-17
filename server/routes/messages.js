const express = require('express');
const router = express.Router();
const Message = require('../models/messages');

// get conversations from db
router.get('*', (req, res) => {
    // use roomId to find all messages
    const roomId = req.query.ID;

    Message.find({ "roomId": roomId })
        .then(data => res.json(data))
});


module.exports = router;