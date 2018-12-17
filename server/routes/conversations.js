const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversations');
const User = require('../models/user');
const Message = require('../models/messages');

// get conversations from db
router.get('/', (req, res) => {
    // Use user Id to find that user and then their conversations array is used to pull the conversations
    const searchUser = req.query.ID;
    User.find({ githubId: searchUser })
        .then(res => {
            return res[0].conversations
        })
        .then(convo => {
            Conversation.find({ "roomId": convo })
                .sort({ createdAt: 1 })
                .then(conversation => res.json(conversation))
                .catch(console.log('error fetching conversations'))
        })
        .catch(console.log('error fetching user'))


});



// add a new conversation to database
router.post('/', (req, res) => {

    // create message in message collection
    const newMessage = new Message({
        roomId: req.body.roomId,
        message: {
            user: req.body.message[0].user,
            message: req.body.message[0].message
        }
    });
    newMessage.save()
        .then(message => res.json(message))
        // create conversation collection 
        .then(() => {
            const users = [req.body.message[0].user];
            const roomId = req.body.roomId;
            
            const newConversation = new Conversation({
            roomId: roomId,
            users: users
        })
        newConversation.save()
            .then(conversation => res.json(conversation))
            .catch(console.log('error posting conversation'))
    })
    
});

// delete conversation route
router.delete('/:id', (req, res) => {
    Conversation.findOneAndRemove({ id: req.params.id }, function (err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Conversation Deleted!' });
    });
});

module.exports = router;