const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const SubjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sections: {
        type: Array,
        required: true
    }
});

module.exports = Subject = mongoose.model('subject', SubjectSchema);