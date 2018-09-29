const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = Subject = mongoose.model('subject', SubjectSchema);