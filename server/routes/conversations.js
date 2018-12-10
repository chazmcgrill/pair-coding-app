const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversations');

// get conversations from db
router.get('/', (req, res) => {
    Conversation.find()
        .sort({ createdAt: 1 })
        .then(conversation => res.json(conversation))
});

// add a new conversation to database
router.post('/', (req, res) => {
	const newConversation = new Conversation({
		roomId: req.body.roomId,
		users: req.body.users
    });
    newConversation.save().then(subject => res.json(subject));
});

// delete conversation route
router.delete('/:id', (req, res) => {
    Conversation.findOneAndRemove({ id: req.params.id },  function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Conversation Deleted!'});
    });
});

module.exports = router;