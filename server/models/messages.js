const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    roomId: {
        type: Number,
        required: true
    },
    message: [{
        userId: String,
        username: String,
        avatar: String,
        message: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }]
},
{ timestamps: true });

module.exports = Messages = mongoose.model('message', MessagesSchema);