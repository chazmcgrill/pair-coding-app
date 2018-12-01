const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sections : [{
        list: {type: Array},
        name: {type: String},
        open: {type: Boolean, default: false}
    }],
    open: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = Subject = mongoose.model('subject', SubjectSchema);