const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('node-uuid');


// Create Schema
const SubjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sections : [{
        id: {
            type: String, default: uuid.v4
        },
        list: {type: Array},
        name: {type: String},
        open: { type: Boolean, default: false }
    }],
    open: { type: Boolean, default: false },
    id: {type: String, default: uuid.v4}
}, {timestamps: true});

module.exports = Subject = mongoose.model('subject', SubjectSchema);

