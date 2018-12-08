const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    roomId: {
        type: Number,
        required: true
    },
    message: [{
        user: {
            type: String
        },
        message: {
            type: String
        },
        createdAt: 'created_at'
    }],
},
{ timestamps: true });

module.exports = Messages = mongoose.model('message', MessagesSchema);