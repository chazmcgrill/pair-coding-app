const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationsSchema = new Schema({
    roomId: {
        type: Number,
        required: true
    },
    users: {
        type: Array 
    },
    lastMessage: {
        type: String
    },
    unread: {
        type: Boolean,
        default: true
    }
},
{ timestamps: true });

module.exports = Conversations = mongoose.model('conversation', ConversationsSchema);