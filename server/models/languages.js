const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true,
    },
});

module.exports = Language = mongoose.model('language', LanguageSchema);